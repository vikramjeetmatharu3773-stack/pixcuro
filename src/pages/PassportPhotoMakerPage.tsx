import { useCallback, useEffect, useRef, useState } from 'react';
import { SITE, TOOL_BY_PATH } from '../lib/site';
import { usePageMeta } from '../lib/usePageMeta';
import { ImageUploader } from '../components/ImageUploader';
import { BackgroundEditor } from '../components/BackgroundEditor';
import { EditorToolbar } from '../components/EditorToolbar';
import { DownloadButton } from '../components/DownloadButton';
import { ResultPanel } from '../components/ResultPanel';
import { ProgressBar } from '../components/Primitives';
import {
  buildDefaultState,
  renderEditor,
  type EditorState,
} from '../lib/editor';
import { type ProcessResult } from '../lib/imageOps';
import { removeImageBackground } from '../lib/backgroundRemoval';
import { PASSPORT_PRESETS, PAPER_PRESETS, PASSPORT_DPI, type PassportPreset } from '../lib/passportPresets';
import { downloadPdf } from '../lib/pdf';
import { useEditorSession } from '../lib/useEditorSession';

const TOOL = TOOL_BY_PATH['/passport-photo-maker'];

interface SheetConfig {
  paperKey: string;
  paperWidthMm: number;
  paperHeightMm: number;
  cols: number;
  rows: number;
  marginMm: number;
  spacingMm: number;
  showCutMarks: boolean;
}

const SHEET_PRESETS: { label: string; value: string }[] = PAPER_PRESETS.map((p) => ({ label: p.label, value: p.key }));

function computeSheetLayout(cfg: SheetConfig, photoW: number, photoH: number) {
  const printableW = cfg.paperWidthMm - 2 * cfg.marginMm;
  const printableH = cfg.paperHeightMm - 2 * cfg.marginMm;
  let bestCols = 1;
  let bestRows = 1;
  let bestCount = 1;
  for (let c = 1; c <= 12; c++) {
    const r = Math.max(1, Math.floor((printableH + cfg.spacingMm) / (photoH + cfg.spacingMm)));
    if (c * (photoW + cfg.spacingMm) - cfg.spacingMm > printableW) break;
    const total = c * r;
    if (total > bestCount) {
      bestCount = total;
      bestCols = c;
      bestRows = r;
    }
  }
  return { cols: cfg.cols || bestCols, rows: cfg.rows || bestRows, count: (cfg.cols || bestCols) * (cfg.rows || bestRows), printableW, printableH };
}

export function PassportPhotoMakerPage() {
  usePageMeta({
    title: TOOL?.title,
    description: TOOL?.description,
    path: '/passport-photo-maker',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: TOOL?.title,
      url: `${SITE.url}/passport-photo-maker`,
      applicationCategory: 'MultimediaApplication',
      operatingSystem: 'Any',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      description: TOOL?.description,
    },
  });

  const [original, setOriginal] = useState<{ img: HTMLImageElement; url: string; size: number; name: string; type: string } | null>(null);
  const [fgImg, setFgImg] = useState<HTMLImageElement | null>(null);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [preset, setPreset] = useState<PassportPreset>(PASSPORT_PRESETS[0]);
  const [sheet, setSheet] = useState<SheetConfig>({ paperKey: 'a4', paperWidthMm: 210, paperHeightMm: 297, cols: 0, rows: 0, marginMm: 10, spacingMm: 2, showCutMarks: true });
  const [showSheet, setShowSheet] = useState(false);
  const [preview, setPreview] = useState<ProcessResult | null>(null);
  const editor = useEditorSession();
  const { state, update, undo, redo, reset, canUndo, canRedo } = editor;

  // Initialize the editor state when the foreground is ready
  useEffect(() => {
    if (!fgImg) return;
    editor.replace({
      ...buildDefaultState(preset.widthPx, preset.heightPx, (original?.name ?? 'passport').replace(/\.[^.]+$/, '')),
      background: {
        ...buildDefaultState(preset.widthPx, preset.heightPx, (original?.name ?? 'passport').replace(/\.[^.]+$/, '')).background,
        mode: 'solid',
        color: '#ffffff',
      },
      output: {
        ...buildDefaultState(preset.widthPx, preset.heightPx, (original?.name ?? 'passport').replace(/\.[^.]+$/, '')).output,
        width: preset.widthPx,
        height: preset.heightPx,
        format: 'image/jpeg',
        quality: 0.95,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fgImg, preset]);

  const onSelect = useCallback(async (file: File) => {
    setError(null);
    setProcessing(true);
    setProgress(0);
    try {
      const url = URL.createObjectURL(file);
      const img = new Image();
      await new Promise<void>((resolve, reject) => { img.onload = () => resolve(); img.onerror = () => reject(); img.src = url; });
      setOriginal({ img, url, size: file.size, name: file.name, type: file.type });

      const result = await removeImageBackground(file, setProgress);
      const fg = new Image();
      await new Promise<void>((resolve, reject) => { fg.onload = () => resolve(); fg.onerror = () => reject(); fg.src = result.url; });
      setFgImg(fg);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not load image');
    } finally {
      setProcessing(false);
    }
  }, []);

  if (!state || !original || !fgImg) {
    return (
      <div className="container-narrow py-10">
        <header className="max-w-2xl mb-6">
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-ink-900">{TOOL!.title}</h1>
          <p className="text-ink-700 mt-2">{TOOL!.intro}</p>
        </header>
        {processing ? (
          <div className="card p-5 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full border-2 border-brand-200 border-t-brand-600 animate-spin" />
              <p className="text-sm text-ink-800 font-medium">
                {progress < 0.2 ? 'Loading model…' : progress < 0.5 ? 'Detecting person…' : 'Finishing…'}
              </p>
            </div>
            <ProgressBar value={progress} />
          </div>
        ) : (
          <ImageUploader onSelect={onSelect} onError={(m) => setError(m)} />
        )}
        {error && <p className="mt-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2" role="alert">{error}</p>}
        <PresetGrid onPick={(p) => { setPreset(p); }} />
        <p className="mt-4 text-xs text-ink-500">
          Note: Sizes are commonly reported starting points. Always verify the exact current requirements with the issuing authority before submission.
        </p>
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
          <PreviewCanvas
            source={fgImg}
            foreground={fgImg}
            state={state}
            onRender={(_, blob) => {
              if (preview?.url) URL.revokeObjectURL(preview.url);
              const ext = state.output.format.split('/')[1].replace('jpeg', 'jpg');
              const url = URL.createObjectURL(blob);
              setPreview({ blob, url, width: state.output.width, height: state.output.height, size: blob.size, format: state.output.format, name: `${state.output.filename}.${ext}` });
            }}
          />
          <EditorToolbar canUndo={canUndo} canRedo={canRedo} onUndo={undo} onRedo={redo} onReset={reset} />

          {preview && (
            <ResultPanel
              before={original.url}
              after={preview.url}
              beforeLabel="Original"
              afterLabel="Passport photo"
              beforeStats={{ size: original.size, width: original.img.naturalWidth, height: original.img.naturalHeight, format: original.type }}
              afterStats={{ size: preview.size, width: preview.width, height: preview.height, format: preview.format }}
              actions={
                <>
                  <DownloadButton primary={preview} filename={preview.name} />
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={() => setShowSheet(true)}
                  >
                    Create photo sheet
                  </button>
                </>
              }
            />
          )}
        </div>

        <div className="space-y-4">
          <div className="card p-4 space-y-3">
            <h3 className="font-display font-bold text-ink-900">Document size</h3>
            <label className="block">
              <span className="text-xs text-ink-700">Country preset</span>
              <select className="select mt-1" value={preset.key} onChange={(e) => {
                const p = PASSPORT_PRESETS.find((x) => x.key === e.target.value);
                if (p) setPreset(p);
              }}>
                {PASSPORT_PRESETS.map((p) => (
                  <option key={p.key} value={p.key}>{p.label}</option>
                ))}
              </select>
            </label>
            <div className="grid grid-cols-2 gap-2 text-xs text-ink-700">
              <div><span className="text-ink-500">Size:</span><br />{preset.widthMm} × {preset.heightMm} mm</div>
              <div><span className="text-ink-500">Pixels:</span><br />{preset.widthPx} × {preset.heightPx} px @ {PASSPORT_DPI} DPI</div>
            </div>
            <p className="text-[11px] text-ink-500 leading-snug">{preset.notes}</p>
            <details className="text-xs">
              <summary className="cursor-pointer text-brand-700 font-medium">Custom size</summary>
              <div className="mt-2 grid grid-cols-3 gap-2">
                <label className="block col-span-1">
                  <span className="text-[11px] text-ink-700">W (mm)</span>
                  <input type="number" className="input mt-0.5" value={preset.widthMm} onChange={(e) => {
                    const wMm = parseFloat(e.target.value) || 35;
                    setPreset({ ...preset, widthMm: wMm, widthPx: Math.round((wMm / 25.4) * PASSPORT_DPI) });
                  }} />
                </label>
                <label className="block col-span-1">
                  <span className="text-[11px] text-ink-700">H (mm)</span>
                  <input type="number" className="input mt-0.5" value={preset.heightMm} onChange={(e) => {
                    const hMm = parseFloat(e.target.value) || 45;
                    setPreset({ ...preset, heightMm: hMm, heightPx: Math.round((hMm / 25.4) * PASSPORT_DPI) });
                  }} />
                </label>
                <label className="block col-span-1">
                  <span className="text-[11px] text-ink-700">DPI</span>
                  <input type="number" className="input mt-0.5" value={PASSPORT_DPI} readOnly />
                </label>
              </div>
            </details>
          </div>

          <BackgroundEditor
            state={state}
            onChange={(next) => update(next)}
            showFilters
            showTransform
            showWatermark={false}
          />

          {showSheet && preview && (
            <SheetBuilder
              sheet={sheet}
              setSheet={setSheet}
              photo={preview}
              onClose={() => setShowSheet(false)}
            />
          )}

          <button
            type="button"
            className="btn-secondary w-full"
            onClick={() => {
              if (original?.url) URL.revokeObjectURL(original.url);
              if (preview?.url) URL.revokeObjectURL(preview.url);
              setOriginal(null); setFgImg(null); setPreview(null);
              editor.clear();
            }}
          >
            Start over
          </button>
        </div>
      </div>
    </div>
  );
}

function PresetGrid({ onPick }: { onPick: (p: PassportPreset) => void }) {
  return (
    <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {PASSPORT_PRESETS.map((p) => (
        <button
          key={p.key}
          type="button"
          className="card p-4 text-left hover:border-brand-300 hover:shadow-md transition-all"
          onClick={() => onPick(p)}
        >
          <div className="font-display font-bold text-ink-900">{p.label}</div>
          <div className="text-xs text-ink-500 mt-1">{p.widthMm} × {p.heightMm} mm · {p.widthPx} × {p.heightPx}px</div>
        </button>
      ))}
    </div>
  );
}

function PreviewCanvas({ source, foreground, state, onRender }: { source: HTMLImageElement; foreground: HTMLImageElement; state: EditorState; onRender: (canvas: HTMLCanvasElement, blob: Blob) => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [rendering, setRendering] = useState(false);
  const token = useRef(0);

  useEffect(() => {
    if (!source) return;
    const t = ++token.current;
    setRendering(true);
    renderEditor(source, foreground, state)
      .then(({ canvas, blob }) => {
        if (t !== token.current) return;
        if (canvasRef.current) {
          canvasRef.current.width = canvas.width;
          canvasRef.current.height = canvas.height;
          const ctx = canvasRef.current.getContext('2d');
          if (ctx) ctx.drawImage(canvas, 0, 0);
        }
        onRender(canvas, blob);
      })
      .catch(() => {})
      .finally(() => {
        if (t === token.current) setRendering(false);
      });
  }, [source, foreground, state]);

  if (!source) return <div className="card aspect-video flex items-center justify-center text-ink-500">Upload to begin</div>;

  return (
    <div className="card relative overflow-hidden">
      <canvas ref={canvasRef} className="block w-full h-auto bg-ink-100 checker-bg" />
      {rendering && (
        <div className="absolute inset-0 bg-white/40 backdrop-blur-sm flex items-center justify-center text-sm text-ink-700 font-medium pointer-events-none">Rendering…</div>
      )}
    </div>
  );
}

function SheetBuilder({ sheet, setSheet, photo, onClose }: { sheet: SheetConfig; setSheet: (s: SheetConfig) => void; photo: ProcessResult; onClose: () => void }) {
  const [building, setBuilding] = useState(false);
  const [sheetUrl, setSheetUrl] = useState<string | null>(null);
  const [layout, setLayout] = useState<{ cols: number; rows: number; count: number } | null>(null);

  useEffect(() => {
    const l = computeSheetLayout(sheet, photo.width, photo.height);
    setLayout({ cols: l.cols, rows: l.rows, count: l.count });
  }, [sheet, photo]);

  const buildSheet = async (format: 'png' | 'jpeg') => {
    setBuilding(true);
    try {
      const l = computeSheetLayout(sheet, photo.width, photo.height);
      const photoWmm = (photo.width / PASSPORT_DPI) * 25.4;
      const photoHmm = (photo.height / PASSPORT_DPI) * 25.4;
      const out = document.createElement('canvas');
      const dpi = 200;
      out.width = Math.round((sheet.paperWidthMm / 25.4) * dpi);
      out.height = Math.round((sheet.paperHeightMm / 25.4) * dpi);
      const ctx = out.getContext('2d')!;
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, out.width, out.height);

      const img = new Image();
      await new Promise<void>((resolve, reject) => { img.onload = () => resolve(); img.onerror = () => reject(); img.src = photo.url; });

      const colSpacingPx = (sheet.spacingMm / 25.4) * dpi;
      const rowSpacingPx = (sheet.spacingMm / 25.4) * dpi;
      const marginPx = (sheet.marginMm / 25.4) * dpi;
      const photoWp = (photoWmm / 25.4) * dpi;
      const photoHp = (photoHmm / 25.4) * dpi;
      const gridWidth = l.cols * photoWp + (l.cols - 1) * colSpacingPx;
      const gridHeight = l.rows * photoHp + (l.rows - 1) * rowSpacingPx;
      const startX = marginPx + Math.max(0, (out.width - 2 * marginPx - gridWidth) / 2);
      const startY = marginPx + Math.max(0, (out.height - 2 * marginPx - gridHeight) / 2);

      for (let r = 0; r < l.rows; r++) {
        for (let c = 0; c < l.cols; c++) {
          const x = startX + c * (photoWp + colSpacingPx);
          const y = startY + r * (photoHp + rowSpacingPx);
          ctx.drawImage(img, x, y, photoWp, photoHp);
          if (sheet.showCutMarks) {
            ctx.strokeStyle = 'rgba(0,0,0,0.4)';
            ctx.lineWidth = 0.5;
            ctx.setLineDash([4, 4]);
            ctx.strokeRect(x, y, photoWp, photoHp);
            ctx.setLineDash([]);
          }
        }
      }
      const blob: Blob = await new Promise((resolve, reject) => out.toBlob((b) => (b ? resolve(b) : reject()), `image/${format}`, 0.92));
      if (sheetUrl) URL.revokeObjectURL(sheetUrl);
      setSheetUrl(URL.createObjectURL(blob));
    } finally {
      setBuilding(false);
    }
  };

  const buildPdfSheet = async () => {
    setBuilding(true);
    try {
      const l = computeSheetLayout(sheet, photo.width, photo.height);
      const photoWmm = (photo.width / PASSPORT_DPI) * 25.4;
      const photoHmm = (photo.height / PASSPORT_DPI) * 25.4;
      const colSpacingMm = sheet.spacingMm;
      const rowSpacingMm = sheet.spacingMm;
      const marginMm = sheet.marginMm;
      const gridWidth = l.cols * photoWmm + (l.cols - 1) * colSpacingMm;
      const gridHeight = l.rows * photoHmm + (l.rows - 1) * rowSpacingMm;
      const startX = marginMm + Math.max(0, (sheet.paperWidthMm - 2 * marginMm - gridWidth) / 2);
      const startY = marginMm + Math.max(0, (sheet.paperHeightMm - 2 * marginMm - gridHeight) / 2);

      const mm2pt = (mm: number) => mm * 2.83465;
      const pageW = mm2pt(sheet.paperWidthMm);
      const pageH = mm2pt(sheet.paperHeightMm);
      const images = [];
      for (let r = 0; r < l.rows; r++) {
        for (let c = 0; c < l.cols; c++) {
          const xMm = startX + c * (photoWmm + colSpacingMm);
          const yMm = startY + r * (photoHmm + rowSpacingMm);
          images.push({ blob: photo.blob, x: mm2pt(xMm), y: mm2pt(yMm), widthPt: mm2pt(photoWmm), heightPt: mm2pt(photoHmm) });
        }
      }
      await downloadPdf(`photo-sheet-${sheet.paperKey}.pdf`, images, { pageWidthPt: pageW, pageHeightPt: pageH });
    } finally {
      setBuilding(false);
    }
  };

  return (
    <div className="card p-5 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-display font-bold text-ink-900">Printable photo sheet</h3>
        <button type="button" className="btn-ghost text-xs" onClick={onClose}>Close</button>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <label className="block">
          <span className="text-xs text-ink-700">Paper</span>
          <select className="select mt-1" value={sheet.paperKey} onChange={(e) => {
            const p = PAPER_PRESETS.find((x) => x.key === e.target.value);
            if (p) setSheet({ ...sheet, paperKey: p.key, paperWidthMm: p.widthMm, paperHeightMm: p.heightMm });
          }}>
            {SHEET_PRESETS.map((p) => <option key={p.value} value={p.value}>{p.label}</option>)}
          </select>
        </label>
        <label className="block">
          <span className="text-xs text-ink-700">Copies</span>
          <input type="number" className="input mt-1" min={1} max={60} value={layout?.count || 0} readOnly />
        </label>
        <label className="block">
          <span className="text-xs text-ink-700">Margin (mm)</span>
          <input type="number" className="input mt-1" value={sheet.marginMm} onChange={(e) => setSheet({ ...sheet, marginMm: parseFloat(e.target.value) || 0 })} />
        </label>
        <label className="block">
          <span className="text-xs text-ink-700">Spacing (mm)</span>
          <input type="number" className="input mt-1" value={sheet.spacingMm} onChange={(e) => setSheet({ ...sheet, spacingMm: parseFloat(e.target.value) || 0 })} />
        </label>
      </div>
      {layout && (
        <p className="text-xs text-ink-600">Grid: {layout.cols} × {layout.rows} = {layout.count} copies on {sheet.paperKey.toUpperCase()}</p>
      )}
      <label className="flex items-center gap-2 text-sm text-ink-800">
        <input type="checkbox" checked={sheet.showCutMarks} onChange={(e) => setSheet({ ...sheet, showCutMarks: e.target.checked })} />
        Show cut marks
      </label>
      <div className="flex flex-wrap gap-2">
        <button type="button" className="btn-secondary" onClick={() => buildSheet('png')} disabled={building}>Build PNG</button>
        <button type="button" className="btn-secondary" onClick={() => buildSheet('jpeg')} disabled={building}>Build JPG</button>
        <button type="button" className="btn-primary" onClick={buildPdfSheet} disabled={building}>
          Download PDF
        </button>
      </div>
      {sheetUrl && (
        <div className="rounded-lg border border-ink-200 p-2 bg-ink-50">
          <img src={sheetUrl} alt="Sheet preview" className="w-full" />
          <a className="btn-secondary mt-2 inline-flex" href={sheetUrl} download={`photo-sheet.${sheet.paperKey}.png`}>Download sheet image</a>
        </div>
      )}
    </div>
  );
}
