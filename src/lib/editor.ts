/**
 * Editor core — image transformation pipeline.
 *
 * Every tool page shares this:
 *   1. user uploads an original image
 *   2. user makes adjustments (background, filters, crop, watermark, etc.)
 *   3. user downloads the composed result
 *
 * History: each commit() pushes a snapshot into a stack so undo/redo work.
 *
 * Compositing is done in a single off-screen canvas each time we re-render
 * so we always read from a known-good baseline (no chained canvas corruption).
 */

import type { OutputFormat } from './imageOps';

export interface RGBA {
  r: number; // 0..255
  g: number; // 0..255
  b: number; // 0..255
  a: number; // 0..255
}

export interface HSL {
  h: number; // 0..360
  s: number; // 0..1
  l: number; // 0..1
}

export type BackgroundMode = 'transparent' | 'solid' | 'gradient' | 'image' | 'blur';

export interface GradientStop {
  color: string;
  /** 0..1 */
  pos: number;
}

export interface GradientDef {
  type: 'linear';
  angle: number; // degrees
  stops: GradientStop[];
}

export interface BackgroundImage {
  url: string;
  /** fit 'cover' | 'contain' | 'custom' */
  fit: 'cover' | 'contain' | 'custom';
  /** Position when fit=custom, 0..1 each axis */
  x: number;
  y: number;
  /** Scale when fit=custom, 0.1..3 */
  scale: number;
  /** Background blur 0..30 */
  blur: number;
  /** Brightness 0..2 */
  brightness: number;
  /** Contrast 0..2 */
  contrast: number;
  /** Opacity 0..1 (only used for image backgrounds) */
  opacity: number;
}

export interface BackgroundDef {
  mode: BackgroundMode;
  color: string; // hex or rgba()
  gradient: GradientDef;
  image: BackgroundImage | null;
  /** Blur amount when mode=blur, 0..30 */
  blurAmount: number;
}

export interface FilterDef {
  brightness: number; // 0..2
  contrast: number; // 0..2
  saturation: number; // 0..2
  sharpness: number; // 0..2 (1 = off)
  temperature: number; // -1..1
}

export interface TransformDef {
  scale: number; // 0.1..3
  offsetX: number; // px
  offsetY: number; // px
  rotation: number; // degrees
  flipH: boolean;
  flipV: boolean;
}

export interface CropDef {
  enabled: boolean;
  x: number; // 0..1 of source dimensions
  y: number;
  width: number; // 0..1
  height: number; // 0..1
}

export interface WatermarkText {
  enabled: boolean;
  text: string;
  font: string;
  color: string;
  size: number; // % of canvas width
  opacity: number; // 0..1
  rotation: number; // degrees
  position:
    | 'top-left' | 'top-center' | 'top-right'
    | 'middle-left' | 'middle-center' | 'middle-right'
    | 'bottom-left' | 'bottom-center' | 'bottom-right'
    | 'tile';
  shadow: boolean;
}

export interface WatermarkImage {
  enabled: boolean;
  url: string;
  /** Size as % of canvas width */
  size: number;
  opacity: number;
  rotation: number;
  position: WatermarkText['position'];
}

export interface OutputSettings {
  format: OutputFormat;
  quality: number; // 0..1
  filename: string;
  /** Output dimensions in pixels */
  width: number;
  height: number;
  /** Background color when format doesn't support alpha (jpg) */
  flattenColor: string;
}

export interface EditorState {
  sourceWidth: number;
  sourceHeight: number;
  background: BackgroundDef;
  filters: FilterDef;
  transform: TransformDef;
  crop: CropDef;
  watermarkText: WatermarkText;
  watermarkImage: WatermarkImage;
  output: OutputSettings;
}

export const DEFAULT_BACKGROUND: BackgroundDef = {
  mode: 'transparent',
  color: '#ffffff',
  gradient: {
    type: 'linear',
    angle: 135,
    stops: [
      { color: '#118ce6', pos: 0 },
      { color: '#0a4b81', pos: 1 },
    ],
  },
  image: null,
  blurAmount: 12,
};

export const DEFAULT_FILTERS: FilterDef = {
  brightness: 1,
  contrast: 1,
  saturation: 1,
  sharpness: 1,
  temperature: 0,
};

export const DEFAULT_TRANSFORM: TransformDef = {
  scale: 1,
  offsetX: 0,
  offsetY: 0,
  rotation: 0,
  flipH: false,
  flipV: false,
};

export const DEFAULT_CROP: CropDef = {
  enabled: false,
  x: 0,
  y: 0,
  width: 1,
  height: 1,
};

export const DEFAULT_WATERMARK_TEXT: WatermarkText = {
  enabled: false,
  text: '',
  font: 'sans-serif',
  color: '#ffffff',
  size: 6,
  opacity: 0.7,
  rotation: 0,
  position: 'bottom-right',
  shadow: true,
};

export const DEFAULT_WATERMARK_IMAGE: WatermarkImage = {
  enabled: false,
  url: '',
  size: 20,
  opacity: 0.85,
  rotation: 0,
  position: 'bottom-right',
};

export function buildDefaultOutput(width: number, height: number, filename: string): OutputSettings {
  return {
    format: 'image/png',
    quality: 0.92,
    filename,
    width,
    height,
    flattenColor: '#ffffff',
  };
}

export function buildDefaultState(
  sourceWidth: number,
  sourceHeight: number,
  filename: string,
): EditorState {
  return {
    sourceWidth,
    sourceHeight,
    background: { ...DEFAULT_BACKGROUND, gradient: { ...DEFAULT_BACKGROUND.gradient, stops: [...DEFAULT_BACKGROUND.gradient.stops] } },
    filters: { ...DEFAULT_FILTERS },
    transform: { ...DEFAULT_TRANSFORM },
    crop: { ...DEFAULT_CROP },
    watermarkText: { ...DEFAULT_WATERMARK_TEXT },
    watermarkImage: { ...DEFAULT_WATERMARK_IMAGE },
    output: buildDefaultOutput(sourceWidth, sourceHeight, filename),
  };
}

// ============================================================================
// Color helpers
// ============================================================================

export function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const m = hex.replace('#', '').trim();
  const full = m.length === 3 ? m.split('').map((c) => c + c).join('') : m;
  const num = parseInt(full, 16);
  if (Number.isNaN(num)) return { r: 0, g: 0, b: 0 };
  return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
}

export function rgbToHex(r: number, g: number, b: number): string {
  const c = (v: number) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0');
  return `#${c(r)}${c(g)}${c(b)}`;
}

export function rgbToHsl(r: number, g: number, b: number): HSL {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0; let s = 0; const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return { h: h * 360, s, l };
}

export function hslToRgb(h: number, s: number, l: number): { r: number; g: number; b: number } {
  h /= 360;
  let r: number; let g: number; let b: number;
  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  return { r: r * 255, g: g * 255, b: b * 255 };
}

// ============================================================================
// Filter CSS string for canvas (uses filter property on context)
// ============================================================================

export function filtersToCss(f: FilterDef): string {
  const parts: string[] = [];
  parts.push(`brightness(${f.brightness})`);
  parts.push(`contrast(${f.contrast})`);
  parts.push(`saturate(${f.saturation})`);
  if (f.temperature !== 0) {
    // Approximate temperature via sepia + hue-rotate.
    const hue = f.temperature * 30;
    parts.push(`hue-rotate(${hue}deg)`);
    if (f.temperature > 0) parts.push(`sepia(${Math.min(0.4, f.temperature * 0.4)})`);
  }
  return parts.join(' ');
}

// ============================================================================
// Compositor
// ============================================================================

/**
 * Render the editor state into a result canvas and return its blob.
 *
 * `fg` is the optional foreground (already-background-removed) image.
 * If no foreground is provided, we just use the source image directly.
 */
export async function renderEditor(
  source: HTMLImageElement,
  fg: HTMLImageElement | null,
  state: EditorState,
  opts: {
    onProgress?: (phase: string, p: number) => void;
  } = {},
): Promise<{ canvas: HTMLCanvasElement; blob: Blob }> {
  opts.onProgress?.('setup', 0);
  const out = document.createElement('canvas');
  out.width = Math.max(1, Math.round(state.output.width));
  out.height = Math.max(1, Math.round(state.output.height));
  const ctx = out.getContext('2d', { willReadFrequently: false });
  if (!ctx) throw new Error('Canvas context unavailable');

  // 1. Background layer
  opts.onProgress?.('background', 0.15);
  drawBackground(ctx, out.width, out.height, state.background);

  // 2. Foreground
  opts.onProgress?.('foreground', 0.4);
  drawForeground(ctx, fg ?? source, state);

  // 3. Watermarks
  opts.onProgress?.('watermark', 0.7);
  await drawWatermarks(ctx, out.width, out.height, state);

  opts.onProgress?.('encode', 0.9);
  const blob: Blob = await new Promise((resolve, reject) => {
    out.toBlob(
      (b) => (b ? resolve(b) : reject(new Error('Encode failed'))),
      state.output.format,
      state.output.quality,
    );
  });
  opts.onProgress?.('done', 1);
  return { canvas: out, blob };
}

function drawBackground(ctx: CanvasRenderingContext2D, w: number, h: number, bg: BackgroundDef) {
  if (bg.mode === 'transparent') return; // leave canvas transparent
  if (bg.mode === 'solid') {
    ctx.fillStyle = bg.color;
    ctx.fillRect(0, 0, w, h);
    return;
  }
  if (bg.mode === 'gradient') {
    const angle = (bg.gradient.angle * Math.PI) / 180;
    const cx = w / 2;
    const cy = h / 2;
    const r = Math.max(w, h);
    const x1 = cx - Math.cos(angle) * r;
    const y1 = cy - Math.sin(angle) * r;
    const x2 = cx + Math.cos(angle) * r;
    const y2 = cy + Math.sin(angle) * r;
    const grad = ctx.createLinearGradient(x1, y1, x2, y2);
    for (const s of bg.gradient.stops) grad.addColorStop(Math.max(0, Math.min(1, s.pos)), s.color);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);
    return;
  }
  if (bg.mode === 'blur') {
    // We need a blurred version of the source — caller should set bg.image with the source url
    if (bg.image) {
      drawBackgroundImage(ctx, w, h, bg.image, bg.blurAmount, true);
    } else {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, w, h);
    }
    return;
  }
  // 'image'
  if (bg.image) {
    drawBackgroundImage(ctx, w, h, bg.image, 0, false);
  }
}

function drawBackgroundImage(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  img: BackgroundImage,
  blur: number,
  isBlurMode: boolean,
) {
  const bgImg = imageCache.get(img.url);
  if (!bgImg) return;
  ctx.save();
  ctx.filter = [
    `blur(${blur}px)`,
    `brightness(${img.brightness})`,
    `contrast(${img.contrast})`,
  ].join(' ');
  ctx.globalAlpha = img.opacity;
  const iw = bgImg.naturalWidth;
  const ih = bgImg.naturalHeight;
  if (img.fit === 'cover') {
    const r = Math.max(w / iw, h / ih);
    const dw = iw * r;
    const dh = ih * r;
    const dx = (w - dw) / 2;
    const dy = (h - dh) / 2;
    ctx.drawImage(bgImg, dx, dy, dw, dh);
  } else if (img.fit === 'contain') {
    const r = Math.min(w / iw, h / ih);
    const dw = iw * r;
    const dh = ih * r;
    const dx = (w - dw) / 2;
    const dy = (h - dh) / 2;
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, w, h);
    ctx.drawImage(bgImg, dx, dy, dw, dh);
  } else {
    const dw = iw * img.scale;
    const dh = ih * img.scale;
    const dx = (w - dw) * img.x;
    const dy = (h - dh) * img.y;
    ctx.drawImage(bgImg, dx, dy, dw, dh);
  }
  ctx.restore();
  void isBlurMode;
}

function drawForeground(ctx: CanvasRenderingContext2D, img: HTMLImageElement, state: EditorState) {
  ctx.save();

  // Apply crop first
  let sx = 0; let sy = 0; let sw = state.sourceWidth; let sh = state.sourceHeight;
  if (state.crop.enabled) {
    sx = Math.max(0, state.crop.x * state.sourceWidth);
    sy = Math.max(0, state.crop.y * state.sourceHeight);
    sw = Math.max(1, state.crop.width * state.sourceWidth);
    sh = Math.max(1, state.crop.height * state.sourceHeight);
  }

  // Build a temp source canvas with the cropped + transformed image
  const tmp = document.createElement('canvas');
  tmp.width = Math.max(1, Math.round(sw));
  tmp.height = Math.max(1, Math.round(sh));
  const tctx = tmp.getContext('2d');
  if (!tctx) {
    ctx.restore();
    return;
  }
  tctx.drawImage(img, sx, sy, sw, sh, 0, 0, tmp.width, tmp.height);

  // Apply CSS filter for brightness/contrast/saturation/temperature
  tctx.filter = filtersToCss(state.filters);

  // Apply transforms via ctx on the output
  const ow = state.output.width;
  const oh = state.output.height;

  // Compute final scale so the cropped image fits into output with margin
  const baseScale = Math.min(ow / tmp.width, oh / tmp.height);
  const finalScale = baseScale * state.transform.scale;
  const dw = tmp.width * finalScale;
  const dh = tmp.height * finalScale;

  ctx.translate(ow / 2 + state.transform.offsetX, oh / 2 + state.transform.offsetY);
  ctx.rotate((state.transform.rotation * Math.PI) / 180);
  if (state.transform.flipH) ctx.scale(-1, 1);
  if (state.transform.flipV) ctx.scale(1, -1);

  ctx.filter = filtersToCss(state.filters);

  // Sharpness via over-composite
  ctx.drawImage(tmp, -dw / 2, -dh / 2, dw, dh);

  ctx.restore();

  // Sharpness post-pass: simple unsharp mask if sharpness != 1
  if (state.filters.sharpness !== 1) {
    applyUnsharpMask(ctx, ow, oh, state.filters.sharpness);
  }
}

function applyUnsharpMask(ctx: CanvasRenderingContext2D, w: number, h: number, amount: number) {
  if (amount <= 1) return;
  try {
    const data = ctx.getImageData(0, 0, w, h);
    const blurred = blurImageData(data, w, h, 1);
    const strength = (amount - 1) * 0.6;
    for (let i = 0; i < data.data.length; i += 4) {
      data.data[i]     = clamp(data.data[i]     + (data.data[i]     - blurred.data[i])     * strength);
      data.data[i + 1] = clamp(data.data[i + 1] + (data.data[i + 1] - blurred.data[i + 1]) * strength);
      data.data[i + 2] = clamp(data.data[i + 2] + (data.data[i + 2] - blurred.data[i + 2]) * strength);
    }
    ctx.putImageData(data, 0, 0);
  } catch (e) {
    // Some browsers reject getImageData on tainted canvases; silently skip.
    void e;
  }
}

function blurImageData(src: ImageData, w: number, h: number, radius: number): ImageData {
  const dst = new ImageData(new Uint8ClampedArray(src.data), w, h);
  const r = Math.max(1, Math.round(radius));
  // Simple box blur (3 passes approximates gaussian)
  for (let pass = 0; pass < 2; pass++) {
    boxBlurH(dst.data, w, h, r);
    boxBlurV(dst.data, w, h, r);
  }
  return dst;
}

function boxBlurH(data: Uint8ClampedArray, w: number, h: number, r: number) {
  const tmp = new Uint8ClampedArray(data.length);
  for (let y = 0; y < h; y++) {
    let rs = 0, gs = 0, bs = 0, count = 0;
    for (let x = -r; x <= r; x++) {
      const xi = Math.max(0, Math.min(w - 1, x));
      const i = (y * w + xi) * 4;
      rs += data[i]; gs += data[i + 1]; bs += data[i + 2]; count++;
    }
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * 4;
      tmp[i] = rs / count; tmp[i + 1] = gs / count; tmp[i + 2] = bs / count; tmp[i + 3] = data[i + 3];
      const xOut = x - r; const xIn = x + r + 1;
      const xiOut = Math.max(0, Math.min(w - 1, xOut));
      const xiIn = Math.max(0, Math.min(w - 1, xIn));
      const iOut = (y * w + xiOut) * 4;
      const iIn = (y * w + xiIn) * 4;
      rs += data[iIn] - data[iOut];
      gs += data[iIn + 1] - data[iOut + 1];
      bs += data[iIn + 2] - data[iOut + 2];
    }
  }
  data.set(tmp);
}

function boxBlurV(data: Uint8ClampedArray, w: number, h: number, r: number) {
  const tmp = new Uint8ClampedArray(data.length);
  for (let x = 0; x < w; x++) {
    let rs = 0, gs = 0, bs = 0, count = 0;
    for (let y = -r; y <= r; y++) {
      const yi = Math.max(0, Math.min(h - 1, y));
      const i = (yi * w + x) * 4;
      rs += data[i]; gs += data[i + 1]; bs += data[i + 2]; count++;
    }
    for (let y = 0; y < h; y++) {
      const i = (y * w + x) * 4;
      tmp[i] = rs / count; tmp[i + 1] = gs / count; tmp[i + 2] = bs / count; tmp[i + 3] = data[i + 3];
      const yOut = y - r; const yIn = y + r + 1;
      const yiOut = Math.max(0, Math.min(h - 1, yOut));
      const yiIn = Math.max(0, Math.min(h - 1, yIn));
      const iOut = (yiOut * w + x) * 4;
      const iIn = (yiIn * w + x) * 4;
      rs += data[iIn] - data[iOut];
      gs += data[iIn + 1] - data[iOut + 1];
      bs += data[iIn + 2] - data[iOut + 2];
    }
  }
  data.set(tmp);
}

function clamp(v: number): number {
  return v < 0 ? 0 : v > 255 ? 255 : v;
}

async function drawWatermarks(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  state: EditorState,
) {
  if (state.watermarkText.enabled && state.watermarkText.text.trim()) {
    const wt = state.watermarkText;
    const sizePx = Math.max(10, Math.round((wt.size / 100) * w));
    ctx.save();
    ctx.font = `600 ${sizePx}px ${wt.font}`;
    ctx.fillStyle = wt.color;
    ctx.globalAlpha = wt.opacity;
    if (wt.shadow) {
      ctx.shadowColor = 'rgba(0,0,0,0.45)';
      ctx.shadowBlur = 4;
      ctx.shadowOffsetX = 1;
      ctx.shadowOffsetY = 1;
    }
    const metrics = ctx.measureText(wt.text);
    if (wt.position === 'tile') {
      const stepX = Math.max(80, metrics.width + 80);
      const stepY = Math.max(60, sizePx * 2.4);
      ctx.rotate((wt.rotation * Math.PI) / 180);
      for (let y = 0; y < h + stepY; y += stepY) {
        for (let x = -stepX; x < w + stepX; x += stepX) {
          ctx.fillText(wt.text, x, y);
        }
      }
    } else {
      const { x, y } = watermarkAnchor(w, h, metrics.width, sizePx, wt.position);
      ctx.translate(x + metrics.width / 2, y + sizePx / 2);
      ctx.rotate((wt.rotation * Math.PI) / 180);
      ctx.fillText(wt.text, -metrics.width / 2, sizePx / 2);
    }
    ctx.restore();
  }
  if (state.watermarkImage.enabled && state.watermarkImage.url) {
    const wi = state.watermarkImage;
    const img = imageCache.get(wi.url);
    if (img) {
      const targetW = Math.max(20, Math.round((wi.size / 100) * w));
      const ratio = img.naturalHeight / img.naturalWidth;
      const targetH = targetW * ratio;
      const { x, y } = watermarkAnchor(w, h, targetW, targetH, wi.position);
      ctx.save();
      ctx.globalAlpha = wi.opacity;
      ctx.translate(x + targetW / 2, y + targetH / 2);
      ctx.rotate((wi.rotation * Math.PI) / 180);
      ctx.drawImage(img, -targetW / 2, -targetH / 2, targetW, targetH);
      ctx.restore();
    }
  }
}

function watermarkAnchor(
  w: number,
  h: number,
  elW: number,
  elH: number,
  pos: WatermarkText['position'],
): { x: number; y: number } {
  const pad = 16;
  switch (pos) {
    case 'top-left': return { x: pad, y: pad };
    case 'top-center': return { x: (w - elW) / 2, y: pad };
    case 'top-right': return { x: w - elW - pad, y: pad };
    case 'middle-left': return { x: pad, y: (h - elH) / 2 };
    case 'middle-center': return { x: (w - elW) / 2, y: (h - elH) / 2 };
    case 'middle-right': return { x: w - elW - pad, y: (h - elH) / 2 };
    case 'bottom-left': return { x: pad, y: h - elH - pad };
    case 'bottom-center': return { x: (w - elW) / 2, y: h - elH - pad };
    case 'bottom-right': return { x: w - elW - pad, y: h - elH - pad };
    case 'tile': return { x: 0, y: 0 };
  }
}

// ============================================================================
// Image cache — caches decoded HTMLImageElements by URL to avoid redecoding
// ============================================================================

export const imageCache: Map<string, HTMLImageElement> = new Map();

export async function loadImage(url: string): Promise<HTMLImageElement> {
  if (imageCache.has(url)) return imageCache.get(url)!;
  const img = new Image();
  img.crossOrigin = 'anonymous';
  await new Promise<void>((resolve, reject) => {
    img.onload = () => resolve();
    img.onerror = () => reject(new Error('Image load failed: ' + url));
    img.src = url;
  });
  imageCache.set(url, img);
  return img;
}

export function evictImage(url: string) {
  const img = imageCache.get(url);
  if (img && img.src.startsWith('blob:')) URL.revokeObjectURL(img.src);
  imageCache.delete(url);
}
