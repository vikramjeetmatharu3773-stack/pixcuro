/**
 * Background removal using @imgly/background-removal.
 *
 * The model runs entirely in the user's browser via WebAssembly / ONNX.
 * No image data is uploaded to any server.
 */

import { removeBackground, Config } from '@imgly/background-removal';

let lastConfig: Config | null = null;

function buildConfig(progress?: (p: number) => void): Config {
  const config: Config = {
    debug: false,
    output: { format: 'image/png', quality: 1 },
    progress: (key: string, current: number, total: number) => {
      if (progress && total > 0) {
        // Normalize the per-stage progress into an overall 0..1 number.
        const ratio = Math.max(0, Math.min(1, current / total));
        progress(ratio);
      }
      void key;
    },
  };
  lastConfig = config;
  return config;
}

export interface BackgroundRemovalResult {
  blob: Blob;
  url: string;
  width: number;
  height: number;
  size: number;
}

/**
 * Remove the background from a File using the in-browser model.
 * The first call downloads the model (~40 MB) to the browser cache.
 */
export async function removeImageBackground(
  file: File,
  onProgress?: (p: number) => void,
): Promise<BackgroundRemovalResult> {
  const config = buildConfig(onProgress);
  const blob = await removeBackground(file, config);
  const url = URL.createObjectURL(blob);

  // Decode for width/height
  const img = new Image();
  await new Promise<void>((resolve, reject) => {
    img.onload = () => resolve();
    img.onerror = () => reject(new Error('Could not decode background-removed result'));
    img.src = url;
  });

  return {
    blob,
    url,
    width: img.naturalWidth,
    height: img.naturalHeight,
    size: blob.size,
  };
}

export function getLastConfig(): Config | null {
  return lastConfig;
}
