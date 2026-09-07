/**
 * A reusable batch-processing page.
 *
 * Uploads many files, applies the same operation to each, then downloads a ZIP.
 * Designed for compress, resize and convert.
 */

import { useState, useCallback } from 'react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { ImageUploader } from './ImageUploader';
import { type ProcessResult } from '../lib/imageOps';
import { fileToImage, formatBytes } from '../lib/imageOps';

export interface BatchFile {
  file: File;
  url: string;
  img: HTMLImageElement;
  width: number;
  height: number;
  size: number;
  status: 'pending' | 'processing' | 'done' | 'error';
  result?: ProcessResult;
  error?: string;
}

interface BatchPageProps<TOpts> {
  title: string;
  intro: string;
  /** Per-file processor — produces a ProcessResult (PNG/JPG/WebP) */
  process: (img: HTMLImageElement, file: BatchFile, options: TOpts) => Promise<ProcessResult>;
  /** Sidebar options UI */
  Options: React.FC<{ value: TOpts; setValue: (v: TOpts) => void }>;
  /** Default options */
  defaultOptions: TOpts;
}

export function BatchPage<TOpts>({ title, intro, process, Options, defaultOptions }: BatchPageProps<TOpts>) {
  const [files, setFiles] = useState<BatchFile[]>([]);
  const [opts, setOpts] = useState(defaultOptions);
  const [running, setRunning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addFiles = useCallback(async (fileList: FileList | File[]) => {
    if (!fileList) return;
    setError(null);
    const list: BatchFile[] = [];
    for (const file of Array.from(fileList)) {
      try {
        const url = URL.createObjectURL(file);
        const img = await fileToImage(file);
        list.push({ file, url, img, width: img.naturalWidth, height: img.naturalHeight, size: file.size, status: 'pending' });
      } catch (e) {
        console.warn('Bad file', file.name, e);
      }
    }
    setFiles((prev) => [...prev, ...list]);
  }, []);

  const remove = (idx: number) => {
    setFiles((prev) => {
      const next = [...prev];
      const f = next[idx];
      if (f) URL.revokeObjectURL(f.url);
      next.splice(idx, 1);
      return next;
    });
  };

  const clear = () => {
    files.forEach((f) => URL.revokeObjectURL(f.url));
    setFiles([]);
  };

  const run = async () => {
    setRunning(true);
    setFiles((prev) => prev.map((f) => ({ ...f, status: 'processing' as const, result: undefined, error: undefined })));
    for (let i = 0; i < files.length; i++) {
      const f = files[i];
      try {
        const result = await process(f.img, f, opts);
        setFiles((prev) => {
          const next = [...prev];
          next[i] = { ...next[i], status: 'done', result };
          return next;
        });
      } catch (e) {
        const msg = e instanceof Error ? e.message : 'Failed';
        setFiles((prev) => {
          const next = [...prev];
          next[i] = { ...next[i], status: 'error', error: msg };
          return next;
        });
      }
    }
    setRunning(false);
  };

  const downloadZip = async () => {
    const zip = new JSZip();
    for (const f of files) {
      if (f.status === 'done' && f.result) {
        zip.file(f.result.name, f.result.blob);
      }
    }
    const blob = await zip.generateAsync({ type: 'blob' });
    saveAs(blob, `pixcuro-batch-${Date.now()}.zip`);
  };

  const downloadOne = (f: BatchFile) => {
    if (f.result) saveAs(f.result.blob, f.result.name);
  };

  if (files.length === 0) {
    return (
      <div className="container-narrow py-10">
        <header className="max-w-2xl mb-6">
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-ink-900">{title}</h1>
          <p className="text-ink-700 mt-2">{intro}</p>
        </header>
        <ImageUploader onSelect={(f) => addFiles([f])} multiple onError={(m) => setError(m)} />
        <div className="mt-3 flex items-center justify-end">
          <input
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            id="multi-input"
            onChange={(e) => addFiles(e.target.files ?? [])}
          />
          <button
            type="button"
            className="btn-secondary"
            onClick={() => (document.getElementById('multi-input') as HTMLInputElement)?.click()}
          >Choose multiple files</button>
        </div>
        {error && <p className="mt-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2" role="alert">{error}</p>}
      </div>
    );
  }

  const doneCount = files.filter((f) => f.status === 'done').length;
  const totalSaved = files.reduce((acc, f) => acc + ((f.result && f.size > 0) ? Math.max(0, f.size - f.result.size) : 0), 0);

  return (
    <div className="container-wide py-8">
      <header className="max-w-2xl mb-6">
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-ink-900">{title}</h1>
        <p className="text-ink-700 mt-2">{intro}</p>
      </header>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="card p-4 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-sm text-ink-700">{files.length} files · {doneCount} done · saved {formatBytes(totalSaved)} so far</p>
              <div className="flex flex-wrap gap-2">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  id="multi-input-2"
                  onChange={(e) => addFiles(e.target.files ?? [])}
                />
                <button type="button" className="btn-secondary" onClick={() => (document.getElementById('multi-input-2') as HTMLInputElement)?.click()}>Add more</button>
                <button type="button" className="btn-ghost text-red-700 hover:bg-red-50" onClick={clear}>Clear all</button>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <button type="button" className="btn-primary" disabled={running} onClick={run}>{running ? 'Processing…' : 'Process all'}</button>
              <button type="button" className="btn-secondary" disabled={doneCount === 0 || running} onClick={downloadZip}>Download all (ZIP)</button>
            </div>
          </div>
          <div className="space-y-2">
            {files.map((f, i) => (
              <div key={i} className="card p-3 flex items-center gap-3">
                <img src={f.url} alt={f.file.name} className="w-14 h-14 object-cover rounded-md border border-ink-200" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-ink-900 truncate">{f.file.name}</p>
                  <p className="text-xs text-ink-500">
                    {formatBytes(f.size)} · {f.width}×{f.height}
                    {f.result && f.size > 0 && ` → ${formatBytes(f.result.size)} (${((1 - f.result.size / f.size) * 100).toFixed(1)}% smaller)`}
                    {f.error && <span className="text-red-700 ml-2">· {f.error}</span>}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${f.status === 'done' ? 'bg-green-100 text-green-800' : f.status === 'error' ? 'bg-red-100 text-red-800' : f.status === 'processing' ? 'bg-blue-100 text-blue-800 animate-pulse' : 'bg-ink-100 text-ink-700'}`}>
                    {f.status}
                  </span>
                  {f.result && <button type="button" className="text-xs text-brand-700 hover:underline" onClick={() => downloadOne(f)}>Download</button>}
                  <button type="button" className="text-xs text-red-700 hover:underline" onClick={() => remove(i)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <Options value={opts} setValue={setOpts} />
        </div>
      </div>
    </div>
  );
}
