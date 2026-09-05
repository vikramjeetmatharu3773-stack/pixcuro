import { useState, useEffect, useCallback } from 'react';
import { SITE, TOOL_BY_PATH } from '../lib/site';
import { usePageMeta } from '../lib/usePageMeta';
import { ImageUploader } from '../components/ImageUploader';
import { fileToImage } from '../lib/imageOps';
import { downloadPdf } from '../lib/pdf';
import { PAPER_PRESETS, PASSPORT_DPI } from '../lib/passportPresets';

const TOOL = TOOL_BY_PATH['/photo-sheet'];

export function PhotoSheetPage() {
  usePageMeta({
    title: TOOL!.title,
    description: TOOL!.description,
    path: '/photo-sheet',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: TOOL!.title,
      url: `${SITE.url}/photo-sheet`,
      applicationCategory: 'MultimediaApplication',
      operatingSystem: 'Any',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      description: TOOL!.description,
    },
  });

  const [original, setOriginal] = useState<{ img: HTMLImageElement; url: string; size: number; name: string; type: string } | null>(null);
  const [photoWmm, setPhotoWmm] = useState(35);
  const [photoHmm, setPhotoHmm] = useState(45);
  const [paperKey, setPaperKey] = useState('a4');
  const [marginMm, setMarginMm] = useState(10);
  const [spacingMm, setSpacingMm] = useState(2);
  const [showCutMarks, setShowCutMarks] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [building, setBuilding] = useState(false);
  const [sheetUrl, setSheetUrl] = useState<string | null>(null);
  const [layout, setLayout] = useState<{ cols: number; rows: number; count: number }>({ cols: 1, rows: 1, count: 1 });

  const onSelect = useCallback(async (file: File) => {
    setError(null);
    try {
      const url = URL.createObjectURL(file);
      const img = await fileToImage(file);
      setOriginal({ img, url, size: file.size, name: file.name, type: file.type });
    } catch (e) { setError(e instanceof Error ? e.message : 'Could not load image'); }
  }, []);

  const paper = PAPER_PRESETS.find((p) => p.key === paperKey) ?? PAPER_PRESETS[0];

  useEffect(() => {
    const printableW = paper.widthMm - 2 * marginMm;
    const printableH = paper.heightMm - 2 * marginMm;
    let best = { cols: 1, rows: 1, count: 1 };
    for (let c = 1; c <= 20; c++) {
      const r = Math.max(1, Math.floor((printableH + spacingMm) / (photoHmm + spacingMm)));
      if (c * (photoWmm + spacingMm) - spacingMm > printableW) break;
      const total = c * r;
      if (total > best.count) best = { cols: c, rows: r, count: total };
    }
    setLayout(best);
  }, [paper, marginMm, spacingMm, photoWmm, photoHmm]);

  const buildSheet = async (format: 'png' | 'jpeg'): Promise<{ blob: Blob; url: string; name: string } | null> => {
    if (!original) return null;
    setBuilding(true);
    try {
      const dpi = 200;
      const out = document.createElement('canvas');
      out.width = Math.round((paper.widthMm / 25.4) * dpi);
      out.height = Math.round((paper.heightMm / 25.4) * dpi);
      const ctx = out.getContext('2d')!;
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, out.width, out.height);
      const img = original.img;
      const photoWp = (photoWmm / 25.4) * dpi;
      const photoHp = (photoHmm / 25.4) * dpi;
      const colSpacingPx = (spacingMm / 25.4) * dpi;
      const rowSpacingPx = (spacingMm / 25.4) * dpi;
      const marginPx = (marginMm / 25.4) * dpi;
      const gridWidth = layout.cols * photoWp + (layout.cols - 1) * colSpacingPx;
      const gridHeight = layout.rows * photoHp + (layout.rows - 1) * rowSpacingPx;
      const startX = marginPx + Math.max(0, (out.width - 2 * marginPx - gridWidth) / 2);
      const startY = marginPx + Math.max(0, (out.height - 2 * marginPx - gridHeight) / 2);
      for (let r = 0; r < layout.rows; r++) {
        for (let c = 0; c < layout.cols; c++) {
          const x = startX + c * (photoWp + colSpacingPx);
          const y = startY + r * (photoHp + rowSpacingPx);
          ctx.drawImage(img, x, y, photoWp, photoHp);
          if (showCutMarks) {
            ctx.strokeStyle = 'rgba(0,0,0,0.4)';
            ctx.lineWidth = 0.5;
            ctx.setLineDash([4, 4]);
            ctx.strokeRect(x, y, photoWp, photoHp);
            ctx.setLineDash([]);
          }
        }
      }
      const blob: Blob = await new Promise((resolve, reject) => out.toBlob((b) => (b ? resolve(b) : reject()), `image/${format}`, 0.92));
      const url = URL.createObjectURL(blob);
      if (sheetUrl) URL.revokeObjectURL(sheetUrl);
      setSheetUrl(url);
      return { blob, url, name: `photo-sheet-${paper.key}.${format === 'jpeg' ? 'jpg' : 'png'}` };
    } finally {
      setBuilding(false);
    }
  };

  const buildPdf = async () => {
    if (!original) return;
    setBuilding(true);
    try {
      const mm2pt = (mm: number) => mm * 2.83465;
      const pageW = mm2pt(paper.widthMm);
      const pageH = mm2pt(paper.heightMm);
      const colSpacingMm = spacingMm;
      const rowSpacingMm = spacingMm;
      const marginMmLocal = marginMm;
      const gridWidth = layout.cols * photoWmm + (layout.cols - 1) * colSpacingMm;
      const gridHeight = layout.rows * photoHmm + (layout.rows - 1) * rowSpacingMm;
      const startX = marginMmLocal + Math.max(0, (paper.widthMm - 2 * marginMmLocal - gridWidth) / 2);
      const startY = marginMmLocal + Math.max(0, (paper.heightMm - 2 * marginMmLocal - gridHeight) / 2);

      // Convert source to PNG blob
      const tmp = document.createElement('canvas');
      tmp.width = original.img.naturalWidth;
      tmp.height = original.img.naturalHeight;
      tmp.getContext('2d')!.drawImage(original.img, 0, 0);
      const blob: Blob = await new Promise((resolve, reject) => tmp.toBlob((b) => (b ? resolve(b) : reject()), 'image/png'));

      const images = [];
      for (let r = 0; r < layout.rows; r++) {
        for (let c = 0; c < layout.cols; c++) {
          const xMm = startX + c * (photoWmm + colSpacingMm);
          const yMm = startY + r * (photoHmm + rowSpacingMm);
          images.push({ blob, x: mm2pt(xMm), y: mm2pt(yMm), widthPt: mm2pt(photoWmm), heightPt: mm2pt(photoHmm) });
        }
      }
      await downloadPdf(`photo-sheet-${paper.key}.pdf`, images, { pageWidthPt: pageW, pageHeightPt: pageH });
    } finally {
      setBuilding(false);
    }
  };

  if (!original) {
    return (
      <div className="container-narrow py-10">
        <header className="max-w-2xl mb-6">
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-ink-900">{TOOL!.title}</h1>
          <p className="text-ink-700 mt-2">{TOOL!.intro}</p>
        </header>
        <ImageUploader onSelect={onSelect} onError={(m) => setError(m)} />
        {error && <p className="mt-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2" role="alert">{error}</p>}
      </div>
    );
  }

  return (
    <div className="container-wide py-8">
      <header className="max-w-2xl mb-6">
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-ink-900">{TOOL!.title}</h1>
        <p className="text-ink-700 mt-2">{TOOL!.intro}</p>
      </header>
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-5">
          {sheetUrl ? (
            <div className="card overflow-hidden p-3">
              <img src={sheetUrl} alt="Photo sheet preview" className="w-full" />
              <div className="flex flex-wrap gap-2 mt-3">
                <a className="btn-secondary" href={sheetUrl} download={`photo-sheet-${paper.key}.png`}>Download PNG</a>
              </div>
            </div>
          ) : (
            <div className="card p-8 text-center text-ink-500">Configure your sheet and click a button below to preview.</div>
          )}
          <p className="text-xs text-ink-500">Layout: <span className="font-semibold">{layout.cols} × {layout.rows}</span> = {layout.count} copies on {paper.label}.</p>
        </div>
        <div className="space-y-4">
          <div className="card p-4 space-y-3">
            <h3 className="font-display font-bold text-ink-900">Photo size</h3>
            <div className="grid grid-cols-2 gap-2">
              <label className="block">
                <span className="text-xs text-ink-700">Width (mm)</span>
                <input type="number" className="input mt-1" value={photoWmm} onChange={(e) => setPhotoWmm(parseFloat(e.target.value) || 35)} />
              </label>
              <label className="block">
                <span className="text-xs text-ink-700">Height (mm)</span>
                <input type="number" className="input mt-1" value={photoHmm} onChange={(e) => setPhotoHmm(parseFloat(e.target.value) || 45)} />
              </label>
            </div>
            <p className="text-[11px] text-ink-500">Pixels at 300 DPI: {Math.round((photoWmm / 25.4) * PASSPORT_DPI)} × {Math.round((photoHmm / 25.4) * PASSPORT_DPI)}</p>
          </div>
          <div className="card p-4 space-y-3">
            <h3 className="font-display font-bold text-ink-900">Paper</h3>
            <label className="block">
              <span className="text-xs text-ink-700">Size</span>
              <select className="select mt-1" value={paperKey} onChange={(e) => setPaperKey(e.target.value)}>
                {PAPER_PRESETS.map((p) => <option key={p.key} value={p.key}>{p.label}</option>)}
              </select>
            </label>
            <div className="grid grid-cols-2 gap-2">
              <label className="block">
                <span className="text-xs text-ink-700">Margin (mm)</span>
                <input type="number" className="input mt-1" value={marginMm} onChange={(e) => setMarginMm(parseFloat(e.target.value) || 0)} />
              </label>
              <label className="block">
                <span className="text-xs text-ink-700">Spacing (mm)</span>
                <input type="number" className="input mt-1" value={spacingMm} onChange={(e) => setSpacingMm(parseFloat(e.target.value) || 0)} />
              </label>
            </div>
            <label className="flex items-center gap-2 text-sm text-ink-800">
              <input type="checkbox" checked={showCutMarks} onChange={(e) => setShowCutMarks(e.target.checked)} />
              Show cut marks
            </label>
          </div>
          <div className="flex flex-wrap gap-2">
            <button type="button" className="btn-secondary" onClick={() => buildSheet('png')} disabled={building}>Build PNG</button>
            <button type="button" className="btn-secondary" onClick={() => buildSheet('jpeg')} disabled={building}>Build JPG</button>
            <button type="button" className="btn-primary" onClick={buildPdf} disabled={building}>Download PDF</button>
          </div>
          <button type="button" className="btn-secondary w-full" onClick={() => {
            if (original?.url) URL.revokeObjectURL(original.url);
            if (sheetUrl) URL.revokeObjectURL(sheetUrl);
            setOriginal(null); setSheetUrl(null);
          }}>Start over</button>
        </div>
      </div>
    </div>
  );
}
