/**
 * Background removal using U2NetP (lightest U2Net variant, ~4.7 MB model).
 * Runs entirely in the browser via ONNX Runtime Web.
 * Zero server cost, unlimited use, no account required.
 */

import * as ort from 'onnxruntime-web';

const MODEL_URL = '/pixcuro/u2netp.onnx';

let session: ort.InferenceSession | null = null;
let modelPromise: Promise<ort.InferenceSession> | null = null;

async function loadSession(): Promise<ort.InferenceSession> {
  if (session) return session;
  if (modelPromise) return modelPromise;

  modelPromise = (async () => {
    const sess = await ort.InferenceSession.create(MODEL_URL, {
      executionProviders: ['wasm'],
    });
    session = sess;
    return sess;
  })();

  return modelPromise;
}

/** Resize an ImageData to target dimensions using a canvas. */
function resizeImageData(
  imageData: ImageData,
  targetW: number,
  targetH: number,
): ImageData {
  const canvas = document.createElement('canvas');
  canvas.width = targetW;
  canvas.height = targetH;
  const ctx = canvas.getContext('2d')!;
  const tempCanvas = document.createElement('canvas');
  tempCanvas.width = imageData.width;
  tempCanvas.height = imageData.height;
  const tempCtx = tempCanvas.getContext('2d')!;
  tempCtx.putImageData(imageData, 0, 0);
  ctx.drawImage(tempCanvas, 0, 0, targetW, targetH);
  return ctx.getImageData(0, 0, targetW, targetH);
}

/** Normalize pixels to [0,1] then standardize with U2Net mean/std. */
function preprocess(imageData: ImageData): Float32Array {
  const { width, height, data } = imageData;
  const input = new Float32Array(1 * 3 * height * width); // NCHW

  // U2NetP mean/std (ImageNet)
  const mean = [0.485, 0.456, 0.406];
  const std = [0.229, 0.224, 0.225];

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      const r = data[idx] / 255;
      const g = data[idx + 1] / 255;
      const b = data[idx + 2] / 255;

      input[0 * height * width + y * width + x] = (r - mean[0]) / std[0];
      input[1 * height * width + y * width + x] = (g - mean[1]) / std[1];
      input[2 * height * width + y * width + x] = (b - mean[2]) / std[2];
    }
  }

  return input;
}

/** Sigmoid activation. */
function sigmoid(x: number): number {
  return 1 / (1 + Math.exp(-x));
}

/** Post-process model output into an alpha mask ImageData. */
function postprocess(
  output: Float32Array,
  origW: number,
  origH: number,
): ImageData {
  const modelH = 320;
  const modelW = 320;
  const mask = new Uint8ClampedArray(modelH * modelW);

  // Find min/max for normalization
  let min = output[0];
  let max = output[0];
  for (let i = 1; i < output.length; i++) {
    if (output[i] < min) min = output[i];
    if (output[i] > max) max = output[i];
  }

  const range = max - min + 1e-7;

  for (let i = 0; i < output.length; i++) {
    mask[i] = Math.round(sigmoid((output[i] - min) / range) * 255);
  }

  // Resize mask to original dimensions
  const maskCanvas = document.createElement('canvas');
  maskCanvas.width = modelW;
  maskCanvas.height = modelH;
  const maskCtx = maskCanvas.getContext('2d')!;
  const maskImg = maskCtx.createImageData(modelW, modelH);
  maskImg.data.set(mask);
  maskCtx.putImageData(maskImg, 0, 0);

  const outCanvas = document.createElement('canvas');
  outCanvas.width = origW;
  outCanvas.height = origH;
  const outCtx = outCanvas.getContext('2d')!;
  outCtx.drawImage(maskCanvas, 0, 0, origW, origH);
  return outCtx.getImageData(0, 0, origW, origH);
}

/** Composite original RGBA image with alpha mask. */
function composite(
  original: ImageData,
  alpha: ImageData,
): ImageData {
  const { width, height, data } = original;
  const result = new Uint8ClampedArray(data.length);

  for (let i = 0; i < data.length; i += 4) {
    result[i] = data[i];     // R
    result[i + 1] = data[i + 1]; // G
    result[i + 2] = data[i + 2]; // B
    result[i + 3] = alpha.data[i]; // A from mask
  }

  return new ImageData(result, width, height);
}

export interface BackgroundRemovalResult {
  blob: Blob;
  url: string;
  width: number;
  height: number;
  size: number;
}

export async function removeImageBackground(
  file: File,
  onProgress?: (p: number) => void,
): Promise<BackgroundRemovalResult> {
  onProgress?.(0.05);

  // Load image
  const img = await loadImage(file);
  onProgress?.(0.15);

  const origW = img.naturalWidth;
  const origH = img.naturalHeight;

  // Draw to canvas to get ImageData
  const canvas = document.createElement('canvas');
  canvas.width = origW;
  canvas.height = origH;
  const ctx = canvas.getContext('2d')!;
  ctx.drawImage(img, 0, 0);
  const imageData = ctx.getImageData(0, 0, origW, origH);

  onProgress?.(0.25);

  // Resize to 320x320 for model input
  const resized = resizeImageData(imageData, 320, 320);
  onProgress?.(0.35);

  // Preprocess
  const input = preprocess(resized);
  onProgress?.(0.45);

  // Run model
  const sess = await loadSession();
  onProgress?.(0.65);

  const feeds: Record<string, ort.Tensor> = {
    'input1': new ort.Tensor(input, [1, 3, 320, 320]),
  };

  const results = await sess.run(feeds);
  onProgress?.(0.80);

  const output = results['0'] as ort.Tensor;
  const outputData = output.data as Float32Array;
  onProgress?.(0.85);

  // Postprocess: resize mask back to original size
  const alphaMask = postprocess(outputData, origW, origH);
  onProgress?.(0.90);

  // Composite
  const resultImageData = composite(imageData, alphaMask);

  // Draw result to canvas and export as PNG blob
  const outCanvas = document.createElement('canvas');
  outCanvas.width = origW;
  outCanvas.height = origH;
  const outCtx = outCanvas.getContext('2d')!;
  outCtx.putImageData(resultImageData, 0, 0);

  onProgress?.(0.95);

  const blob = await new Promise<Blob>((resolve) => {
    outCanvas.toBlob((b) => resolve(b!), 'image/png');
  });

  const url = URL.createObjectURL(blob);

  return {
    blob,
    url,
    width: origW,
    height: origH,
    size: blob.size,
  };
}

/** Load a File into an HTMLImageElement. */
function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('Could not load image file'));
    img.src = URL.createObjectURL(file);
  });
}

export function getModelStatus(): { loaded: boolean; model: string } {
  return {
    loaded: session !== null,
    model: 'U2NetP (~4.7 MB)',
  };
}
