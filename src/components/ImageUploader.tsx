import { useState, useRef, useCallback, type DragEvent, type ChangeEvent } from 'react';
import {
  ACCEPTED_TYPES,
  MAX_FILE_SIZE,
  formatBytes,
  validateFile,
  type ImageMeta,
} from '../lib/imageOps';

interface ImageUploaderProps {
  onSelect: (file: File, meta: ImageMeta) => void;
  onError?: (msg: string) => void;
  /** Optional className for outer container */
  className?: string;
  /** Multiple files */
  multiple?: boolean;
  /** Custom hint text */
  hint?: string;
}

export function ImageUploader({
  onSelect,
  onError,
  className = '',
  multiple = false,
  hint,
}: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const acceptString = ACCEPTED_TYPES.join(',');

  const handleFiles = useCallback(
    (files: FileList | null) => {
      if (!files || files.length === 0) return;
      const list = Array.from(files);
      for (const file of list) {
        try {
          const meta = validateFile(file);
          onSelect(file, meta);
          setError(null);
        } catch (e) {
          const msg = e instanceof Error ? e.message : 'Could not read file';
          setError(msg);
          onError?.(msg);
          return;
        }
      }
    },
    [onSelect, onError],
  );

  const onDragOver = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  };
  const onDragLeave = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
  };
  const onDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
    handleFiles(e.dataTransfer.files);
  };
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div className={className}>
      <label
        htmlFor="image-upload-input"
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className={[
          'flex flex-col items-center justify-center gap-3 cursor-pointer',
          'rounded-2xl border-2 border-dashed p-10 sm:p-14 text-center',
          'transition-all duration-150 select-none',
          dragging
            ? 'border-brand-500 bg-brand-50 scale-[1.01]'
            : 'border-ink-200 bg-white hover:border-brand-300 hover:bg-brand-50/50',
        ].join(' ')}
        aria-label="Upload an image: drag and drop or click to choose"
      >
        <div
          className="w-14 h-14 rounded-2xl bg-brand-100 text-brand-700 flex items-center justify-center"
          aria-hidden="true"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
        </div>
        <div className="space-y-1">
          <p className="text-lg font-semibold text-ink-900">
            Drop image{multiple ? 's' : ''} here, or click to choose
          </p>
          <p className="text-sm text-ink-600">
            {hint ?? 'PNG, JPG, WebP, BMP or GIF · up to ' + formatBytes(MAX_FILE_SIZE)}
          </p>
        </div>
        <input
          ref={inputRef}
          id="image-upload-input"
          type="file"
          accept={acceptString}
          multiple={multiple}
          onChange={onChange}
          className="sr-only"
        />
      </label>
      {error && (
        <p role="alert" className="mt-3 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
          {error}
        </p>
      )}
    </div>
  );
}
