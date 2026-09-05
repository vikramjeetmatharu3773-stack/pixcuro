import { useEffect, useRef, useState } from 'react';
import {
  type BackgroundDef,
  type FilterDef,
  type TransformDef,
  type WatermarkText,
  type WatermarkImage,
  type BackgroundMode,
  type BackgroundImage,
  type GradientDef,
  type EditorState,
  DEFAULT_FILTERS,
  DEFAULT_TRANSFORM,
  DEFAULT_WATERMARK_TEXT,
  buildDefaultOutput,
  hexToRgb,
  rgbToHex,
  rgbToHsl,
  hslToRgb,
} from '../lib/editor';
import { ACCEPTED_TYPES, formatBytes } from '../lib/imageOps';

interface BackgroundEditorProps {
  state: EditorState;
  onChange: (next: EditorState) => void;
  showFilters?: boolean;
  showTransform?: boolean;
  showWatermark?: boolean;
}

const PRESET_COLORS = [
  '#ffffff', '#f1f5f9', '#e0e7ff', '#bfdbfe',
  '#86efac', '#fde68a', '#fca5a5', '#f9a8d4',
  '#c4b5fd', '#94a3b8', '#0f172a', '#0ea5e9',
  '#10b981', '#ef4444', '#f59e0b', '#6366f1',
];

const POSITION_OPTIONS: { label: string; value: WatermarkText['position'] }[] = [
  { label: 'Top left', value: 'top-left' },
  { label: 'Top center', value: 'top-center' },
  { label: 'Top right', value: 'top-right' },
  { label: 'Middle left', value: 'middle-left' },
  { label: 'Center', value: 'middle-center' },
  { label: 'Middle right', value: 'middle-right' },
  { label: 'Bottom left', value: 'bottom-left' },
  { label: 'Bottom center', value: 'bottom-center' },
  { label: 'Bottom right', value: 'bottom-right' },
  { label: 'Tile (repeat)', value: 'tile' },
];

function Section({ title, children, defaultOpen = true }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <details open={open} onToggle={(e) => setOpen((e.target as HTMLDetailsElement).open)} className="border-b border-ink-100 last:border-b-0">
      <summary className="cursor-pointer list-none py-3 px-1 flex items-center justify-between text-sm font-semibold text-ink-900 select-none">
        <span>{title}</span>
        <svg className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9" /></svg>
      </summary>
      <div className="pb-4 px-1 space-y-3">{children}</div>
    </details>
  );
}

function NumberInput({ label, value, onChange, min, max, step = 1, suffix }: {
  label: string; value: number; onChange: (n: number) => void; min?: number; max?: number; step?: number; suffix?: string;
}) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-ink-700 flex justify-between">
        <span>{label}</span>
        <span className="text-ink-500">{value}{suffix ?? ''}</span>
      </span>
      <input
        type="number"
        value={Number.isFinite(value) ? value : 0}
        min={min} max={max} step={step}
        onChange={(e) => {
          const n = parseFloat(e.target.value);
          if (!Number.isNaN(n)) onChange(n);
        }}
        className="input mt-1"
      />
    </label>
  );
}

function Slider({ label, value, onChange, min, max, step = 0.01, suffix }: {
  label: string; value: number; onChange: (n: number) => void; min: number; max: number; step?: number; suffix?: string;
}) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-ink-700 flex justify-between">
        <span>{label}</span>
        <span className="text-ink-500">{typeof value === 'number' ? (Number.isInteger(value) ? value : value.toFixed(2)) : '—'}{suffix ?? ''}</span>
      </span>
      <input
        type="range"
        value={value}
        min={min} max={max} step={step}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="mt-2 w-full accent-brand-600"
      />
    </label>
  );
}

function ColorEditor({ value, onChange }: { value: string; onChange: (c: string) => void }) {
  const rgb = hexToRgb(value);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

  const update = (n: { r: number; g: number; b: number }) => onChange(rgbToHex(n.r, n.g, n.b));
  const updateHsl = (h: number, s: number, l: number) => {
    const r = hslToRgb(h, s, l);
    onChange(rgbToHex(r.r, r.g, r.b));
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={value.startsWith('#') ? value.slice(0, 7) : '#ffffff'}
          onChange={(e) => onChange(e.target.value)}
          className="w-12 h-12 rounded-lg border border-ink-200 cursor-pointer"
          aria-label="Pick background color"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="input flex-1 font-mono text-xs"
          aria-label="Hex color value"
        />
      </div>
      <div className="grid grid-cols-3 gap-2">
        <label className="block">
          <span className="text-xs text-ink-600">R</span>
          <input type="number" min={0} max={255} value={Math.round(rgb.r)} onChange={(e) => update({ ...rgb, r: parseInt(e.target.value, 10) || 0 })} className="input" />
        </label>
        <label className="block">
          <span className="text-xs text-ink-600">G</span>
          <input type="number" min={0} max={255} value={Math.round(rgb.g)} onChange={(e) => update({ ...rgb, g: parseInt(e.target.value, 10) || 0 })} className="input" />
        </label>
        <label className="block">
          <span className="text-xs text-ink-600">B</span>
          <input type="number" min={0} max={255} value={Math.round(rgb.b)} onChange={(e) => update({ ...rgb, b: parseInt(e.target.value, 10) || 0 })} className="input" />
        </label>
      </div>
      <Slider label="Hue" value={hsl.h} min={0} max={360} step={1} suffix="°" onChange={(h) => updateHsl(h, hsl.s, hsl.l)} />
      <Slider label="Saturation" value={hsl.s} min={0} max={1} step={0.01} onChange={(s) => updateHsl(hsl.h, s, hsl.l)} />
      <Slider label="Lightness" value={hsl.l} min={0} max={1} step={0.01} onChange={(l) => updateHsl(hsl.h, hsl.s, l)} />
      <div className="flex flex-wrap gap-1 pt-1">
        {PRESET_COLORS.map((c) => (
          <button
            key={c}
            type="button"
            className="w-6 h-6 rounded-md border border-ink-200 hover:scale-110 transition-transform"
            style={{ background: c }}
            onClick={() => onChange(c)}
            aria-label={`Use color ${c}`}
          />
        ))}
      </div>
    </div>
  );
}

function BackgroundImageEditor({ value, onChange }: { value: BackgroundImage | null; onChange: (v: BackgroundImage) => void }) {
  const fileRef = useRef<HTMLInputElement>(null);
  const v = value ?? {
    url: '', fit: 'cover', x: 0.5, y: 0.5, scale: 1, blur: 0, brightness: 1, contrast: 1, opacity: 1,
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!ACCEPTED_TYPES.includes(file.type as (typeof ACCEPTED_TYPES)[number])) return;
    const url = URL.createObjectURL(file);
    onChange({ ...v, url, fit: 'cover' });
  };

  return (
    <div className="space-y-3">
      <input ref={fileRef} type="file" accept={ACCEPTED_TYPES.join(',')} onChange={handleUpload} className="sr-only" />
      <button type="button" className="btn-secondary w-full" onClick={() => fileRef.current?.click()}>
        {v.url ? 'Replace background image' : 'Upload background image'}
      </button>
      {v.url && (
        <div className="rounded-lg overflow-hidden border border-ink-200 checker-bg">
          <img src={v.url} alt="Background preview" className="w-full h-24 object-cover" />
        </div>
      )}
      {v.url && (
        <>
          <div className="grid grid-cols-3 gap-1">
            {(['cover', 'contain', 'custom'] as const).map((f) => (
              <button
                key={f}
                type="button"
                className={`px-2 py-1 rounded-md text-xs font-medium border ${v.fit === f ? 'bg-brand-100 border-brand-300 text-brand-800' : 'border-ink-200 hover:bg-ink-50'}`}
                onClick={() => onChange({ ...v, fit: f })}
              >
                {f}
              </button>
            ))}
          </div>
          {v.fit === 'custom' && (
            <>
              <Slider label="Position X" value={v.x} min={0} max={1} step={0.01} onChange={(x) => onChange({ ...v, x })} />
              <Slider label="Position Y" value={v.y} min={0} max={1} step={0.01} onChange={(y) => onChange({ ...v, y })} />
              <Slider label="Scale" value={v.scale} min={0.2} max={3} step={0.01} onChange={(s) => onChange({ ...v, scale: s })} />
            </>
          )}
          <Slider label="Blur" value={v.blur} min={0} max={30} step={1} suffix="px" onChange={(b) => onChange({ ...v, blur: b })} />
          <Slider label="Brightness" value={v.brightness} min={0} max={2} step={0.01} onChange={(b) => onChange({ ...v, brightness: b })} />
          <Slider label="Contrast" value={v.contrast} min={0} max={2} step={0.01} onChange={(c) => onChange({ ...v, contrast: c })} />
          <Slider label="Opacity" value={v.opacity} min={0} max={1} step={0.01} onChange={(o) => onChange({ ...v, opacity: o })} />
        </>
      )}
    </div>
  );
}

function GradientEditor({ value, onChange }: { value: GradientDef; onChange: (v: GradientDef) => void }) {
  const updateStop = (idx: number, patch: Partial<{ color: string; pos: number }>) => {
    const stops = value.stops.map((s, i) => (i === idx ? { ...s, ...patch } : s));
    onChange({ ...value, stops });
  };
  const addStop = () => onChange({ ...value, stops: [...value.stops, { color: '#ffffff', pos: 0.5 }] });
  const removeStop = (idx: number) => onChange({ ...value, stops: value.stops.filter((_, i) => i !== idx) });

  return (
    <div className="space-y-2">
      <Slider label="Angle" value={value.angle} min={0} max={360} step={1} suffix="°" onChange={(a) => onChange({ ...value, angle: a })} />
      <div className="space-y-2">
        {value.stops.map((s, i) => (
          <div key={i} className="flex items-center gap-2">
            <input
              type="color"
              value={s.color.startsWith('#') ? s.color.slice(0, 7) : '#ffffff'}
              onChange={(e) => updateStop(i, { color: e.target.value })}
              className="w-8 h-8 rounded-md border border-ink-200 cursor-pointer"
              aria-label={`Stop ${i + 1} color`}
            />
            <input
              type="number"
              min={0} max={1} step={0.01}
              value={s.pos}
              onChange={(e) => updateStop(i, { pos: parseFloat(e.target.value) })}
              className="input flex-1 text-xs"
              aria-label={`Stop ${i + 1} position`}
            />
            <button
              type="button"
              className="text-xs text-red-700 hover:bg-red-50 rounded px-2 py-1"
              onClick={() => removeStop(i)}
              disabled={value.stops.length <= 2}
              aria-label={`Remove stop ${i + 1}`}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <button type="button" className="btn-ghost text-xs" onClick={addStop}>+ Add stop</button>
    </div>
  );
}

function FilterEditor({ value, onChange }: { value: FilterDef; onChange: (v: FilterDef) => void }) {
  return (
    <div className="space-y-3">
      <Slider label="Brightness" value={value.brightness} min={0.2} max={2} step={0.01} onChange={(n) => onChange({ ...value, brightness: n })} />
      <Slider label="Contrast" value={value.contrast} min={0.2} max={2} step={0.01} onChange={(n) => onChange({ ...value, contrast: n })} />
      <Slider label="Saturation" value={value.saturation} min={0} max={2} step={0.01} onChange={(n) => onChange({ ...value, saturation: n })} />
      <Slider label="Sharpness" value={value.sharpness} min={1} max={2} step={0.01} onChange={(n) => onChange({ ...value, sharpness: n })} />
      <Slider label="Temperature" value={value.temperature} min={-1} max={1} step={0.01} onChange={(n) => onChange({ ...value, temperature: n })} />
      <button type="button" className="btn-ghost text-xs" onClick={() => onChange({ ...DEFAULT_FILTERS })}>
        Reset filters
      </button>
    </div>
  );
}

function TransformEditor({ value, onChange }: { value: TransformDef; onChange: (v: TransformDef) => void }) {
  return (
    <div className="space-y-3">
      <Slider label="Scale" value={value.scale} min={0.2} max={3} step={0.01} onChange={(n) => onChange({ ...value, scale: n })} />
      <Slider label="Rotate" value={value.rotation} min={-180} max={180} step={1} suffix="°" onChange={(n) => onChange({ ...value, rotation: n })} />
      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          className={`btn-secondary text-xs ${value.flipH ? 'bg-brand-100 border-brand-300' : ''}`}
          onClick={() => onChange({ ...value, flipH: !value.flipH })}
        >Flip ↔</button>
        <button
          type="button"
          className={`btn-secondary text-xs ${value.flipV ? 'bg-brand-100 border-brand-300' : ''}`}
          onClick={() => onChange({ ...value, flipV: !value.flipV })}
        >Flip ↕</button>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <NumberInput label="Offset X" value={value.offsetX} onChange={(n) => onChange({ ...value, offsetX: n })} suffix="px" />
        <NumberInput label="Offset Y" value={value.offsetY} onChange={(n) => onChange({ ...value, offsetY: n })} suffix="px" />
      </div>
      <button type="button" className="btn-ghost text-xs" onClick={() => onChange({ ...DEFAULT_TRANSFORM })}>
        Reset transform
      </button>
    </div>
  );
}

function WatermarkTextEditor({ value, onChange }: { value: WatermarkText; onChange: (v: WatermarkText) => void }) {
  return (
    <div className="space-y-3">
      <label className="block">
        <span className="text-xs font-medium text-ink-700">Text</span>
        <input
          type="text"
          value={value.text}
          onChange={(e) => onChange({ ...value, text: e.target.value })}
          placeholder="© Your brand"
          className="input mt-1"
        />
      </label>
      <div className="grid grid-cols-2 gap-2">
        <label className="block">
          <span className="text-xs text-ink-700">Font</span>
          <select className="select mt-1" value={value.font} onChange={(e) => onChange({ ...value, font: e.target.value })}>
            <option value="sans-serif">Sans serif</option>
            <option value="serif">Serif</option>
            <option value="monospace">Monospace</option>
            <option value="cursive">Cursive</option>
            <option value="Inter, sans-serif">Inter</option>
            <option value="Georgia, serif">Georgia</option>
          </select>
        </label>
        <label className="block">
          <span className="text-xs text-ink-700">Color</span>
          <input
            type="color"
            value={value.color.startsWith('#') ? value.color.slice(0, 7) : '#ffffff'}
            onChange={(e) => onChange({ ...value, color: e.target.value })}
            className="block w-full h-9 mt-1 rounded-md border border-ink-200 cursor-pointer"
          />
        </label>
      </div>
      <Slider label="Size" value={value.size} min={1} max={20} step={0.5} suffix="%" onChange={(n) => onChange({ ...value, size: n })} />
      <Slider label="Opacity" value={value.opacity} min={0} max={1} step={0.01} onChange={(n) => onChange({ ...value, opacity: n })} />
      <Slider label="Rotation" value={value.rotation} min={-90} max={90} step={1} suffix="°" onChange={(n) => onChange({ ...value, rotation: n })} />
      <label className="block">
        <span className="text-xs text-ink-700">Position</span>
        <select className="select mt-1" value={value.position} onChange={(e) => onChange({ ...value, position: e.target.value as WatermarkText['position'] })}>
          {POSITION_OPTIONS.map((p) => <option key={p.value} value={p.value}>{p.label}</option>)}
        </select>
      </label>
      <label className="flex items-center gap-2 text-sm text-ink-800">
        <input type="checkbox" checked={value.shadow} onChange={(e) => onChange({ ...value, shadow: e.target.checked })} className="rounded" />
        Shadow
      </label>
      <button type="button" className="btn-ghost text-xs" onClick={() => onChange({ ...DEFAULT_WATERMARK_TEXT, text: value.text })}>
        Reset text watermark
      </button>
    </div>
  );
}

function WatermarkImageEditor({ value, onChange, onUpload }: { value: WatermarkImage; onChange: (v: WatermarkImage) => void; onUpload: (url: string) => void }) {
  const fileRef = useRef<HTMLInputElement>(null);
  const handle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!ACCEPTED_TYPES.includes(file.type as (typeof ACCEPTED_TYPES)[number])) return;
    const url = URL.createObjectURL(file);
    onChange({ ...value, url });
    onUpload(url);
  };
  return (
    <div className="space-y-3">
      <input ref={fileRef} type="file" accept={ACCEPTED_TYPES.join(',')} onChange={handle} className="sr-only" />
      <button type="button" className="btn-secondary w-full" onClick={() => fileRef.current?.click()}>
        {value.url ? 'Replace watermark image' : 'Upload watermark image'}
      </button>
      {value.url && (
        <>
          <Slider label="Size" value={value.size} min={5} max={80} step={1} suffix="%" onChange={(n) => onChange({ ...value, size: n })} />
          <Slider label="Opacity" value={value.opacity} min={0} max={1} step={0.01} onChange={(n) => onChange({ ...value, opacity: n })} />
          <Slider label="Rotation" value={value.rotation} min={-180} max={180} step={1} suffix="°" onChange={(n) => onChange({ ...value, rotation: n })} />
          <label className="block">
            <span className="text-xs text-ink-700">Position</span>
            <select className="select mt-1" value={value.position} onChange={(e) => onChange({ ...value, position: e.target.value as WatermarkImage['position'] })}>
              {POSITION_OPTIONS.filter((p) => p.value !== 'tile').map((p) => <option key={p.value} value={p.value}>{p.label}</option>)}
            </select>
          </label>
        </>
      )}
    </div>
  );
}

export function BackgroundEditor({ state, onChange, showFilters = true, showTransform = true, showWatermark = true }: BackgroundEditorProps) {
  const updateBg = (patch: Partial<BackgroundDef>) => onChange({ ...state, background: { ...state.background, ...patch } });
  const setMode = (mode: BackgroundMode) => updateBg({ mode });

  const [colorHistory, setColorHistory] = useState<string[]>([]);
  const lastColor = useRef(state.background.color);
  useEffect(() => {
    if (lastColor.current !== state.background.color) {
      lastColor.current = state.background.color;
      setColorHistory((prev) => {
        if (prev.includes(state.background.color)) return prev;
        const next = [state.background.color, ...prev].slice(0, 8);
        return next;
      });
    }
  }, [state.background.color]);

  return (
    <div className="card divide-y divide-ink-100 p-2">
      <Section title="Background" defaultOpen>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-1">
          {(['transparent', 'solid', 'gradient', 'blur', 'image'] as BackgroundMode[]).map((m) => (
            <button
              key={m}
              type="button"
              className={`px-3 py-2 rounded-lg text-xs font-medium border capitalize ${state.background.mode === m ? 'bg-brand-100 border-brand-300 text-brand-800' : 'border-ink-200 hover:bg-ink-50'}`}
              onClick={() => setMode(m)}
            >
              {m === 'blur' ? 'Blur original' : m}
            </button>
          ))}
        </div>

        {state.background.mode === 'solid' && (
          <ColorEditor value={state.background.color} onChange={(c) => updateBg({ color: c })} />
        )}

        {state.background.mode === 'gradient' && (
          <GradientEditor
            value={state.background.gradient}
            onChange={(v) => updateBg({ gradient: v })}
          />
        )}

        {state.background.mode === 'image' && (
          <BackgroundImageEditor
            value={state.background.image}
            onChange={(v) => updateBg({ image: v })}
          />
        )}

        {state.background.mode === 'blur' && (
          <Slider label="Blur amount" value={state.background.blurAmount} min={0} max={30} step={1} suffix="px" onChange={(n) => updateBg({ blurAmount: n })} />
        )}

        {colorHistory.length > 0 && (
          <div>
            <p className="text-xs text-ink-500 mb-1">Recent colors</p>
            <div className="flex flex-wrap gap-1">
              {colorHistory.map((c) => (
                <button key={c} type="button" className="w-6 h-6 rounded-md border border-ink-200 hover:scale-110 transition-transform" style={{ background: c }} onClick={() => updateBg({ color: c, mode: 'solid' })} aria-label={`Use ${c}`} />
              ))}
            </div>
          </div>
        )}
      </Section>

      {showTransform && (
        <Section title="Position & size" defaultOpen={false}>
          <TransformEditor value={state.transform} onChange={(v) => onChange({ ...state, transform: v })} />
        </Section>
      )}

      {showFilters && (
        <Section title="Photo adjustments" defaultOpen={false}>
          <FilterEditor value={state.filters} onChange={(v) => onChange({ ...state, filters: v })} />
        </Section>
      )}

      {showWatermark && (
        <>
          <Section title="Text watermark" defaultOpen={false}>
            <label className="flex items-center gap-2 text-sm text-ink-800 mb-1">
              <input
                type="checkbox"
                checked={state.watermarkText.enabled}
                onChange={(e) => onChange({ ...state, watermarkText: { ...state.watermarkText, enabled: e.target.checked } })}
                className="rounded"
              />
              Enable text watermark
            </label>
            <WatermarkTextEditor
              value={state.watermarkText}
              onChange={(v) => onChange({ ...state, watermarkText: v })}
            />
          </Section>
          <Section title="Image watermark" defaultOpen={false}>
            <label className="flex items-center gap-2 text-sm text-ink-800 mb-1">
              <input
                type="checkbox"
                checked={state.watermarkImage.enabled}
                onChange={(e) => onChange({ ...state, watermarkImage: { ...state.watermarkImage, enabled: e.target.checked } })}
                className="rounded"
              />
              Enable image watermark
            </label>
            <WatermarkImageEditor
              value={state.watermarkImage}
              onChange={(v) => onChange({ ...state, watermarkImage: v })}
              onUpload={(url) => {
                onChange({ ...state, watermarkImage: { ...state.watermarkImage, enabled: true, url } });
              }}
            />
          </Section>
        </>
      )}

      <Section title="Output" defaultOpen={false}>
        <label className="block">
          <span className="text-xs text-ink-700">Format</span>
          <select
            className="select mt-1"
            value={state.output.format}
            onChange={(e) => onChange({ ...state, output: { ...state.output, format: e.target.value as typeof state.output.format } })}
          >
            <option value="image/png">PNG (lossless, transparency)</option>
            <option value="image/jpeg">JPG (smaller, no transparency)</option>
            <option value="image/webp">WebP (small + transparent)</option>
          </select>
        </label>
        {(state.output.format === 'image/jpeg' || state.output.format === 'image/webp') && (
          <Slider
            label="Quality"
            value={state.output.quality}
            min={0.4}
            max={1}
            step={0.01}
            onChange={(n) => onChange({ ...state, output: { ...state.output, quality: n } })}
          />
        )}
        {state.output.format === 'image/jpeg' && (
          <label className="block">
            <span className="text-xs text-ink-700">Flatten color (background for JPG)</span>
            <input
              type="text"
              value={state.output.flattenColor}
              onChange={(e) => onChange({ ...state, output: { ...state.output, flattenColor: e.target.value } })}
              className="input mt-1"
            />
          </label>
        )}
        <NumberInput
          label="Output width (px)"
          value={state.output.width}
          min={16}
          max={8000}
          onChange={(n) => {
            const h = Math.max(16, Math.round((state.sourceHeight / state.sourceWidth) * n));
            onChange({ ...state, output: { ...state.output, width: n, height: h } });
          }}
        />
        <NumberInput
          label="Output height (px)"
          value={state.output.height}
          min={16}
          max={8000}
          onChange={(n) => {
            const w = Math.max(16, Math.round((state.sourceWidth / state.sourceHeight) * n));
            onChange({ ...state, output: { ...state.output, height: n, width: w } });
          }}
        />
        <label className="block">
          <span className="text-xs text-ink-700">Filename</span>
          <input
            type="text"
            value={state.output.filename}
            onChange={(e) => onChange({ ...state, output: { ...state.output, filename: e.target.value } })}
            className="input mt-1"
          />
        </label>
        <p className="text-xs text-ink-500">
          Estimated size: <span className="font-semibold text-ink-700">{formatBytes(Math.round(state.output.width * state.output.height * (state.output.format === 'image/png' ? 0.6 : 0.18 * state.output.quality)))}</span> (rough estimate)
        </p>
      </Section>
    </div>
  );
}

export { buildDefaultOutput };
