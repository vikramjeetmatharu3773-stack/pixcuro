/**
 * Core image processing utilities — all run client-side.
 * No network. No uploads. No tracking.
 */

export type OutputFormat = 'image/png' | 'image/jpeg' | 'image/webp' | 'image/bmp';

export interface ProcessResult {
  blob: Blob;
  url: string;
  width: number;
  height: number;
  size: number;
  format: string;
  name: string;
}

export interface ImageMeta {
  width: number;
  height: number;
  type: string;
  size: number;
  name: string;
}

export const ACCEPTED_TYPES = [
  'image/png',
  'image/jpeg',
  'image/webp',
  'image/bmp',
  'image/gif',
] as const;

export const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25 MB
export const MAX_DIMENSION = 8000; // px on a side, to protect memory

const FORMAT_FROM_MIME: Record<string, OutputFormat> = {
  'image/png': 'image/png',
  'image/jpeg': 'image/jpeg',
  'image/webp': 'image/webp',
  'image/bmp': 'image/bmp',
};

/** Read a File into an HTMLImageElement, decoding fully. */
export function fileToImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Could not read file'));
    reader.onload = () => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error('Image format not supported or file is corrupted'));
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });
}

/** Validate file type and size with friendly errors. */
export function validateFile(file: File): ImageMeta {
  if (!ACCEPTED_TYPES.includes(file.type as (typeof ACCEPTED_TYPES)[number])) {
    throw new Error(
      `Unsupported file type: ${file.type || 'unknown'}. Use PNG, JPG, WebP, BMP or GIF.`,
    );
  }
  if (file.size > MAX_FILE_SIZE) {
    throw new Error(
      `File is too large (${formatBytes(file.size)}). Max ${formatBytes(MAX_FILE_SIZE)}.`,
    );
  }
  return {
    width: 0,
    height: 0,
    type: file.type,
    size: file.size,
    name: file.name,
  };
}

/** Format bytes into a human-readable string. */
export function formatBytes(n: number): string {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  if (n < 1024 * 1024 * 1024) return `${(n / (1024 * 1024)).toFixed(2)} MB`;
  return `${(n / (1024 * 1024 * 1024)).toFixed(2)} GB`;
}

/** Decode a blob URL string into an Image after validation. */
export async function urlToImage(url: string): Promise<HTMLImageElement> {
  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.decoding = 'async';
  await new Promise<void>((resolve, reject) => {
    img.onload = () => resolve();
    img.onerror = () => reject(new Error('Could not decode image'));
    img.src = url;
  });
  return img;
}

export interface ResizeOptions {
  width?: number;
  height?: number;
  keepAspect?: boolean;
  scale?: number; // 0..1 multiplier, alternative to width/height
  mode?: 'contain' | 'cover' | 'stretch';
  background?: string;
  outputType?: OutputFormat;
  quality?: number; // 0..1 for jpeg/webp
}

/** Resize an image using canvas, returning a ProcessResult. */
export async function resizeImage(
  source: HTMLImageElement | string,
  options: ResizeOptions = {},
  fileName = 'image',
): Promise<ProcessResult> {
  const img = typeof source === 'string' ? await urlToImage(source) : source;
  const originalW = img.naturalWidth;
  const originalH = img.naturalHeight;
  if (originalW > MAX_DIMENSION || originalH > MAX_DIMENSION) {
    throw new Error(
      `Image too large to process safely (${originalW}×${originalH}px). Max ${MAX_DIMENSION}px per side.`,
    );
  }

  let targetW = originalW;
  let targetH = originalH;
  const { width, height, keepAspect = true, scale, mode = 'stretch' } = options;

  if (typeof scale === 'number' && scale > 0 && scale <= 1) {
    targetW = Math.max(1, Math.round(originalW * scale));
    targetH = Math.max(1, Math.round(originalH * scale));
  } else if (width && height && keepAspect) {
    const ratio = Math.min(width / originalW, height / originalH);
    targetW = Math.max(1, Math.round(originalW * ratio));
    targetH = Math.max(1, Math.round(originalH * ratio));
  } else {
    if (width) targetW = Math.max(1, Math.round(width));
    if (height) targetH = Math.max(1, Math.round(height));
  }

  const canvas = document.createElement('canvas');
  canvas.width = targetW;
  canvas.height = targetH;
  const ctx = canvas.getContext('2d', { willReadFrequently: false });
  if (!ctx) throw new Error('Could not access 2D rendering context');

  // Fill background if requested and output type doesn't support alpha
  const outType = options.outputType ?? FORMAT_FROM_MIME[img.src.startsWith('data:image/png') ? 'image/png' : 'image/jpeg'] ?? 'image/png';
  if (options.background) {
    ctx.fillStyle = options.background;
    ctx.fillRect(0, 0, targetW, targetH);
  } else if (outType === 'image/jpeg') {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, targetW, targetH);
  }

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  if (mode === 'cover') {
    const scaleCover = Math.max(targetW / originalW, targetH / originalH);
    const sw = targetW / scaleCover;
    const sh = targetH / scaleCover;
    const sx = (originalW - sw) / 2;
    const sy = (originalH - sh) / 2;
    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, targetW, targetH);
  } else {
    ctx.drawImage(img, 0, 0, targetW, targetH);
  }

  return canvasToResult(canvas, outType, options.quality ?? 0.92, fileName);
}

/** Convert canvas content into a downloadable result. */
export async function canvasToResult(
  canvas: HTMLCanvasElement,
  type: OutputFormat,
  quality = 0.92,
  fileName = 'image',
): Promise<ProcessResult> {
  const blob: Blob = await new Promise((resolve, reject) => {
    canvas.toBlob(
      (b) => (b ? resolve(b) : reject(new Error('Canvas conversion failed'))),
      type,
      quality,
    );
  });
  const url = URL.createObjectURL(blob);
  const ext = type.split('/')[1].replace('jpeg', 'jpg');
  const baseName = fileName.replace(/\.[^.]+$/, '');
  return {
    blob,
    url,
    width: canvas.width,
    height: canvas.height,
    size: blob.size,
    format: type,
    name: `${baseName}.${ext}`,
  };
}

export interface CompressOptions {
  quality: number; // 0..1
  outputType?: OutputFormat;
  maxWidth?: number;
  maxHeight?: number;
}

/** Compress an image by re-encoding through canvas with lower quality. */
export async function compressImage(
  source: HTMLImageElement,
  options: CompressOptions,
  fileName = 'image',
): Promise<ProcessResult> {
  let { quality } = options;
  quality = Math.min(0.99, Math.max(0.05, quality));

  const outType: OutputFormat =
    options.outputType ?? (source.src.startsWith('data:image/png') ? 'image/png' : 'image/jpeg');

  // PNG doesn't use quality; fall back to size reduction
  const useQuality = outType === 'image/jpeg' || outType === 'image/webp';

  let targetW = source.naturalWidth;
  let targetH = source.naturalHeight;
  if (options.maxWidth && targetW > options.maxWidth) {
    const ratio = options.maxWidth / targetW;
    targetW = options.maxWidth;
    targetH = Math.round(targetH * ratio);
  }
  if (options.maxHeight && targetH > options.maxHeight) {
    const ratio = options.maxHeight / targetH;
    targetH = options.maxHeight;
    targetW = Math.round(targetW * ratio);
  }

  const canvas = document.createElement('canvas');
  canvas.width = targetW;
  canvas.height = targetH;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not access 2D rendering context');

  // JPEG doesn't support alpha — flatten to white
  if (outType === 'image/jpeg') {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, targetW, targetH);
  }
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(source, 0, 0, targetW, targetH);

  let result = await canvasToResult(canvas, outType, useQuality ? quality : 0.92, fileName);

  // PNG optimization: try a few quality steps if quality provided
  if (!useQuality && options.quality < 1) {
    // For PNGs we can downscale by reducing dimensions slightly when quality is low
    const factor = Math.max(0.4, Math.min(1, options.quality * 1.2));
    if (factor < 0.99) {
      const cw = Math.max(1, Math.round(targetW * factor));
      const ch = Math.max(1, Math.round(targetH * factor));
      const tmp = document.createElement('canvas');
      tmp.width = cw;
      tmp.height = ch;
      const tctx = tmp.getContext('2d');
      if (tctx) {
        tctx.imageSmoothingEnabled = true;
        tctx.drawImage(canvas, 0, 0, cw, ch);
        const alt = await canvasToResult(tmp, outType, 0.92, fileName);
        if (alt.size < result.size) result = alt;
      }
    }
  }

  return result;
}

export interface CropRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

/** Crop an image to a rectangle. */
export async function cropImage(
  source: HTMLImageElement,
  rect: CropRect,
  outputType: OutputFormat = 'image/png',
  fileName = 'image',
): Promise<ProcessResult> {
  const canvas = document.createElement('canvas');
  canvas.width = Math.max(1, Math.round(rect.width));
  canvas.height = Math.max(1, Math.round(rect.height));
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not access 2D rendering context');
  if (outputType === 'image/jpeg') {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
  ctx.drawImage(source, rect.x, rect.y, rect.width, rect.height, 0, 0, canvas.width, canvas.height);
  return canvasToResult(canvas, outputType, 0.92, fileName);
}

/** Convert between supported formats with quality control. */
export async function convertImage(
  source: HTMLImageElement,
  outputType: OutputFormat,
  quality = 0.92,
  fileName = 'image',
): Promise<ProcessResult> {
  const canvas = document.createElement('canvas');
  canvas.width = source.naturalWidth;
  canvas.height = source.naturalHeight;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not access 2D rendering context');
  if (outputType === 'image/jpeg') {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
  ctx.drawImage(source, 0, 0);
  return canvasToResult(canvas, outputType, quality, fileName);
}

/**
 * Strip EXIF / metadata from an image by re-encoding through canvas.
 * Canvas re-encoding naturally drops metadata.
 */
export async function stripMetadata(
  source: HTMLImageElement,
  outputType: OutputFormat = 'image/png',
  fileName = 'image',
): Promise<ProcessResult> {
  return convertImage(source, outputType, 0.92, fileName);
}

/** Apply a flatten/solid background to a transparent PNG. */
export async function flattenBackground(
  source: HTMLImageElement,
  color: string,
  outputType: OutputFormat = 'image/png',
  fileName = 'image',
): Promise<ProcessResult> {
  const canvas = document.createElement('canvas');
  canvas.width = source.naturalWidth;
  canvas.height = source.naturalHeight;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not access 2D rendering context');
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(source, 0, 0);
  return canvasToResult(canvas, outputType, 0.92, fileName);
}

/** Trigger a download of a process result (or any blob). */
export function downloadResult(result: ProcessResult | Blob, name?: string) {
  const blob = 'blob' in result ? result.blob : result;
  const fileName = 'name' in result && result.name ? result.name : name ?? 'pixcuro-download';
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
