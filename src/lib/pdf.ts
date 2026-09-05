/**
 * Tiny dependency-free PDF generator for image-only PDFs.
 *
 * Produces a single-page PDF that embeds a PNG or JPEG image at a chosen
 * point with a chosen size in points (1 pt = 1/72 in).
 *
 * Supports PDF 1.4 image XObjects (DCTDecode for JPEG, FlateDecode for PNG).
 * Suitable for printable photo sheets and passport photo outputs.
 *
 * Not intended for general document layout — only raster image embedding.
 */

import { saveAs } from 'file-saver';

export interface PdfImageInput {
  blob: Blob;
  /** Width in points (1pt = 1/72in) */
  widthPt: number;
  /** Height in points */
  heightPt: number;
  /** X position (top-left) in points */
  x: number;
  /** Y position (top-left) in points (origin top-left in our API) */
  y: number;
}

export interface PdfOptions {
  /** Page width in points (default 595 ≈ A4) */
  pageWidthPt: number;
  /** Page height in points (default 842 ≈ A4) */
  pageHeightPt: number;
}

const JPEG_SOI = [0xff, 0xd8, 0xff];
const PNG_SIG = [0x89, 0x50, 0x4e, 0x47];

function detectImageFormat(blob: Blob): Promise<'jpeg' | 'png'> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const buf = new Uint8Array(reader.result as ArrayBuffer);
      if (buf.length >= 4 && buf[0] === PNG_SIG[0] && buf[1] === PNG_SIG[1] && buf[2] === PNG_SIG[2] && buf[3] === PNG_SIG[3]) {
        resolve('png');
      } else if (buf.length >= 3 && buf[0] === JPEG_SOI[0] && buf[1] === JPEG_SOI[1] && buf[2] === JPEG_SOI[2]) {
        resolve('jpeg');
      } else {
        resolve('png'); // best-effort fallback
      }
    };
    reader.onerror = () => resolve('png');
    reader.readAsArrayBuffer(blob.slice(0, 4));
  });
}

async function blobToBytes(blob: Blob): Promise<Uint8Array> {
  return new Uint8Array(await blob.arrayBuffer());
}

/** Build a minimal PDF file from one or more raster images. */
export async function buildPdf(images: PdfImageInput[], opts: PdfOptions): Promise<Blob> {
  const { pageWidthPt, pageHeightPt } = opts;
  const objects: Uint8Array[] = [];
  const offsets: number[] = [];

  // Reserve slots for each object. We'll patch offsets later.
  const header = '%PDF-1.4\n%\xC4\xE5\xF2\xE5\xEB\xA7\xF3\xA0\xD0\xC4\xC6\n';

  // Helper to register an object and return its id.
  const placeholders = (n: number) => {
    for (let i = objects.length; i < n; i++) objects.push(new Uint8Array(0));
  };

  placeholders(2); // catalog + pages
  let nextId = 3;
  // For each image we need: image XObject, content stream, then references in page resources.
  const pageObjIds: number[] = [];
  const contentIds: number[] = [];
  const xObjectIds: number[] = [];

  for (let i = 0; i < images.length; i++) {
    xObjectIds.push(nextId++); // image XObject
    contentIds.push(nextId++); // content stream
  }
  // After xObject/content, pages tree node id, then each page object id
  const pagesTreeId = nextId++;
  for (let i = 0; i < images.length; i++) {
    pageObjIds.push(nextId++);
  }

  // Now build the body. We need each object's offset within the PDF file.
  const enc = new TextEncoder();
  let bodyBytes = enc.encode(header);
  const concat = (a: Uint8Array, b: Uint8Array) => {
    const out = new Uint8Array(a.length + b.length);
    out.set(a, 0); out.set(b, a.length);
    return out;
  };

  function writeObject(id: number, payload: string | Uint8Array) {
    const body = typeof payload === 'string' ? enc.encode(payload) : payload;
    offsets[id] = bodyBytes.length;
    const headerBytes = enc.encode(`${id} 0 obj\n`);
    const endBytes = enc.encode(`\nendobj\n`);
    bodyBytes = concat(bodyBytes, concat(headerBytes, concat(body, endBytes)));
  }

  // 1. Catalog
  writeObject(1, `<< /Type /Catalog /Pages ${pagesTreeId} 0 R >>`);

  // 2. Pages tree (filled below once we know page ids)
  // Reserve; will rewrite when we know kids.
  // We'll build page object bodies first, then write pages tree.

  // 3..N: image XObjects + content streams
  for (let i = 0; i < images.length; i++) {
    const img = images[i];
    const bytes = await blobToBytes(img.blob);
    const format = await detectImageFormat(img.blob);

    // XObject
    const filterStr = format === 'jpeg' ? '/Filter /DCTDecode' : '/Filter /FlateDecode';
    const xobjHeader = `<< /Type /XObject /Subtype /Image /Width 0 /Height 0 /BitsPerComponent 8 /ColorSpace /DeviceRGB ${filterStr} /Length ${bytes.length} >>\nstream\n`;
    const xobjFooter = `\nendstream`;
    const xobj = concat(enc.encode(xobjHeader), concat(bytes, enc.encode(xobjFooter)));
    writeObject(xObjectIds[i], xobj);

    // Content stream: place the image with given size at given position (PDF origin is bottom-left)
    const pdfX = img.x;
    const pdfY = pageHeightPt - img.y - img.heightPt; // flip to PDF coords
    const w = img.widthPt;
    const h = img.heightPt;
    const stream = `q\n${w} 0 0 ${h} ${pdfX} ${pdfY} cm\n/Im${i} Do\nQ\n`;
    writeObject(contentIds[i], `<< /Length ${stream.length} >>\nstream\n${stream}endstream`);
  }

  // Pages tree
  const kidsRefs = pageObjIds.map((id) => `${id} 0 R`).join(' ');
  writeObject(pagesTreeId, `<< /Type /Pages /Count ${pageObjIds.length} /Kids [${kidsRefs}] >>`);

  // Page objects
  for (let i = 0; i < images.length; i++) {
    const pageObjId = pageObjIds[i];
    const contentId = contentIds[i];
    const xObjectId = xObjectIds[i];
    const pageBody = `<< /Type /Page /Parent ${pagesTreeId} 0 R /MediaBox [0 0 ${pageWidthPt} ${pageHeightPt}] /Resources << /XObject << /Im${i} ${xObjectId} 0 R >> >> /Contents ${contentId} 0 R >>`;
    writeObject(pageObjId, pageBody);
  }

  // Cross-reference table
  let xref = `xref\n0 ${nextId}\n0000000000 65535 f \n`;
  for (let i = 1; i < nextId; i++) {
    xref += `${String(offsets[i] ?? 0).padStart(10, '0')} 00000 n \n`;
  }
  const xrefBytes = enc.encode(xref);

  const trailer = enc.encode(`trailer\n<< /Size ${nextId} /Root 1 0 R >>\nstartxref\n${bodyBytes.length}\n%%EOF\n`);
  bodyBytes = concat(bodyBytes, concat(xrefBytes, trailer));

  return new Blob([bodyBytes], { type: 'application/pdf' });
}

/** Generate and download a PDF in one step. */
export async function downloadPdf(filename: string, images: PdfImageInput[], opts: PdfOptions) {
  const pdf = await buildPdf(images, opts);
  saveAs(pdf, filename.endsWith('.pdf') ? filename : `${filename}.pdf`);
}
