/**
 * Static tool preview illustrations.
 *
 * Each tool gets one unique illustration that visually shows what the tool
 * does — no animation, no shared templates. The illustrations are tiny inline
 * SVGs (~1 KB each) so the homepage stays light.
 *
 * Style: clean, soft gradient backgrounds, a recognizable shape that hints
 * at the tool's purpose, and a subtle "result" indicator.
 */

import type { ReactNode } from 'react';

interface PreviewProps {
  children: ReactNode;
  bg?: string;
}

/* ---------- Layout wrapper ---------- */

function Preview({ children, bg = 'linear-gradient(135deg, #f1f5f9 0%, #e0e7ff 100%)' }: PreviewProps) {
  return (
    <div
      className="relative w-full aspect-[16/10] rounded-lg overflow-hidden border border-ink-200/70"
      style={{ background: bg }}
      aria-hidden="true"
    >
      {children}
    </div>
  );
}

/* ---------- 1. Background Remover ----------
 * Subject (head + shoulders) cut out and floating on a clean white BG.
 * A small dotted "magic" sparkle hints at AI.
 */
export function PreviewBgRemover() {
  return (
    <Preview bg="linear-gradient(135deg, #fef9c3 0%, #fcd34d 100%)">
      <svg viewBox="0 0 160 100" className="absolute inset-0 w-full h-full">
        <defs>
          <linearGradient id="bg-fg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#f1f5f9" />
          </linearGradient>
        </defs>
        {/* checkered transparency indicator */}
        <g opacity="0.45">
          {Array.from({ length: 8 }).map((_, r) =>
            Array.from({ length: 13 }).map((_, c) => (
              ((r + c) % 2 === 0) ? (
                <rect key={`${r}-${c}`} x={c * 12} y={r * 12} width="12" height="12" fill="#e2e8f0" />
              ) : null
            )),
          )}
        </g>
        {/* Subject */}
        <circle cx="80" cy="38" r="16" fill="url(#bg-fg)" stroke="#cbd5e1" strokeWidth="1" />
        <path d="M52 90c0-15 12-26 28-26s28 11 28 26" fill="url(#bg-fg)" stroke="#cbd5e1" strokeWidth="1" />
        {/* sparkle */}
        <g fill="#f59e0b">
          <path d="M126 24l2 6 6 2-6 2-2 6-2-6-6-2 6-2z" />
          <circle cx="34" cy="22" r="2" />
          <circle cx="140" cy="70" r="1.5" />
        </g>
      </svg>
    </Preview>
  );
}

/* ---------- 2. Background Changer ----------
 * Subject on a solid color (white BG, with the same subject silhouette).
 */
export function PreviewBgChanger() {
  return (
    <Preview bg="#ffffff">
      <svg viewBox="0 0 160 100" className="absolute inset-0 w-full h-full">
        <rect x="0" y="0" width="160" height="100" fill="#dbeafe" />
        <circle cx="80" cy="38" r="16" fill="#ffffff" />
        <path d="M52 90c0-15 12-26 28-26s28 11 28 26" fill="#ffffff" />
        <rect x="8" y="80" width="16" height="12" rx="2" fill="#0a4b81" />
        <rect x="28" y="80" width="16" height="12" rx="2" fill="#118ce6" />
        <rect x="48" y="80" width="16" height="12" rx="2" fill="#ef4444" />
        <rect x="68" y="80" width="16" height="12" rx="2" fill="#10b981" />
      </svg>
    </Preview>
  );
}

/* ---------- 3. Transparent Background ----------
 * Just the subject floating on checkered pattern.
 */
export function PreviewTransparent() {
  return (
    <Preview>
      <svg viewBox="0 0 160 100" className="absolute inset-0 w-full h-full">
        <g opacity="0.5">
          {Array.from({ length: 8 }).map((_, r) =>
            Array.from({ length: 13 }).map((_, c) => (
              ((r + c) % 2 === 0) ? (
                <rect key={`${r}-${c}`} x={c * 12} y={r * 12} width="12" height="12" fill="#cbd5e1" />
              ) : null
            )),
          )}
        </g>
        <circle cx="80" cy="38" r="16" fill="#a3e635" />
        <path d="M52 90c0-15 12-26 28-26s28 11 28 26" fill="#a3e635" />
      </svg>
    </Preview>
  );
}

/* ---------- 4. Background Color Changer ----------
 * Color picker rings + subject.
 */
export function PreviewBgColor() {
  return (
    <Preview>
      <svg viewBox="0 0 160 100" className="absolute inset-0 w-full h-full">
        <circle cx="80" cy="50" r="36" fill="#118ce6" />
        <circle cx="80" cy="50" r="28" fill="#ffffff" />
        <circle cx="80" cy="50" r="20" fill="#118ce6" />
        <line x1="80" y1="14" x2="80" y2="22" stroke="#0a4b81" strokeWidth="3" strokeLinecap="round" />
      </svg>
    </Preview>
  );
}

/* ---------- 5. Compressor ----------
 * Two photo cards, "before" full size, "after" smaller with arrow.
 */
export function PreviewCompressor() {
  return (
    <Preview bg="linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)">
      <svg viewBox="0 0 160 100" className="absolute inset-0 w-full h-full">
        <rect x="14" y="22" width="44" height="56" rx="4" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
        <rect x="20" y="32" width="32" height="4" rx="2" fill="#94a3b8" />
        <rect x="20" y="40" width="22" height="4" rx="2" fill="#cbd5e1" />
        <rect x="20" y="48" width="28" height="4" rx="2" fill="#cbd5e1" />
        <text x="14" y="92" fontFamily="Inter, sans-serif" fontSize="9" fontWeight="700" fill="#475569">2.8 MB</text>
        <path d="M68 50l14 0m0 0l-5-5m5 5l-5 5" stroke="#0a4b81" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="92" y="30" width="44" height="56" rx="4" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
        <rect x="98" y="40" width="32" height="4" rx="2" fill="#94a3b8" />
        <rect x="98" y="48" width="22" height="4" rx="2" fill="#cbd5e1" />
        <rect x="98" y="56" width="28" height="4" rx="2" fill="#cbd5e1" />
        <text x="92" y="100" fontFamily="Inter, sans-serif" fontSize="9" fontWeight="700" fill="#10b981">820 KB</text>
      </svg>
    </Preview>
  );
}

/* ---------- 6. Image Optimizer ----------
 * Sparkle + small file with star.
 */
export function PreviewOptimizer() {
  return (
    <Preview bg="linear-gradient(135deg, #ede9fe 0%, #c7d2fe 100%)">
      <svg viewBox="0 0 160 100" className="absolute inset-0 w-full h-full">
        <rect x="50" y="22" width="60" height="60" rx="6" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
        <text x="80" y="60" fontFamily="Inter, sans-serif" fontSize="20" fontWeight="800" fill="#6366f1" textAnchor="middle">W</text>
        <g stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" fill="none">
          <line x1="30" y1="30" x2="40" y2="40" />
          <line x1="120" y1="30" x2="130" y2="20" />
          <line x1="120" y1="70" x2="130" y2="80" />
        </g>
        <g fill="#f59e0b">
          <path d="M22 18l1.5 4 4 1.5-4 1.5-1.5 4-1.5-4-4-1.5 4-1.5z" />
          <circle cx="138" cy="50" r="2" />
        </g>
      </svg>
    </Preview>
  );
}

/* ---------- 7. Resizer ----------
 * Frame with corner handles + dimension labels.
 */
export function PreviewResizer() {
  return (
    <Preview bg="linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)">
      <svg viewBox="0 0 160 100" className="absolute inset-0 w-full h-full">
        <rect x="32" y="20" width="96" height="60" rx="2" fill="#ffffff" stroke="#118ce6" strokeWidth="2" />
        <text x="80" y="56" fontFamily="JetBrains Mono, monospace" fontSize="14" fontWeight="700" fill="#0a4b81" textAnchor="middle">1280×720</text>
        <g fill="#ffffff" stroke="#118ce6" strokeWidth="1.5">
          <rect x="28" y="16" width="8" height="8" />
          <rect x="124" y="16" width="8" height="8" />
          <rect x="28" y="76" width="8" height="8" />
          <rect x="124" y="76" width="8" height="8" />
        </g>
      </svg>
    </Preview>
  );
}

/* ---------- 8. Converter ----------
 * JPG → arrow → WebP with file cards.
 */
export function PreviewConverter() {
  return (
    <Preview bg="linear-gradient(135deg, #ecfeff 0%, #cffafe 100%)">
      <svg viewBox="0 0 160 100" className="absolute inset-0 w-full h-full">
        <rect x="14" y="30" width="46" height="46" rx="4" fill="#ffffff" stroke="#0a4b81" strokeWidth="1.5" />
        <text x="37" y="58" fontFamily="Inter, sans-serif" fontSize="13" fontWeight="800" fill="#0a4b81" textAnchor="middle">JPG</text>
        <path d="M70 53l20 0m0 0l-6-6m6 6l-6 6" stroke="#0e7490" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="100" y="30" width="46" height="46" rx="4" fill="#0891b2" />
        <text x="123" y="58" fontFamily="Inter, sans-serif" fontSize="13" fontWeight="800" fill="#ffffff" textAnchor="middle">WebP</text>
      </svg>
    </Preview>
  );
}

/* ---------- 9. Cropper ----------
 * Crop frame inside a larger image.
 */
export function PreviewCropper() {
  return (
    <Preview bg="linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%)">
      <svg viewBox="0 0 160 100" className="absolute inset-0 w-full h-full">
        <rect x="20" y="14" width="120" height="72" rx="2" fill="#f472b6" opacity="0.35" />
        <circle cx="50" cy="40" r="10" fill="#fbcfe8" />
        <path d="M30 80c0-8 8-14 20-14s20 6 20 14" fill="#fbcfe8" />
        <rect x="58" y="26" width="60" height="44" rx="2" fill="none" stroke="#ffffff" strokeWidth="2" strokeDasharray="4 3" />
        <g fill="#ffffff">
          <rect x="54" y="22" width="8" height="8" />
          <rect x="114" y="22" width="8" height="8" />
          <rect x="54" y="66" width="8" height="8" />
          <rect x="114" y="66" width="8" height="8" />
        </g>
      </svg>
    </Preview>
  );
}

/* ---------- 10. Watermark ----------
 * Photo with © overlay.
 */
export function PreviewWatermark() {
  return (
    <Preview bg="linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)">
      <svg viewBox="0 0 160 100" className="absolute inset-0 w-full h-full">
        <rect x="32" y="16" width="96" height="68" rx="4" fill="#ffffff" />
        <rect x="40" y="24" width="80" height="20" rx="2" fill="#fecaca" />
        <circle cx="58" cy="34" r="6" fill="#f87171" />
        <rect x="68" y="30" width="48" height="4" rx="2" fill="#fca5a5" />
        <rect x="68" y="38" width="34" height="3" rx="1" fill="#fecaca" />
        <text x="80" y="78" fontFamily="Inter, sans-serif" fontSize="13" fontWeight="700" fill="#0a4b81" fillOpacity="0.7" textAnchor="middle" transform="rotate(-12 80 78)">© Brand</text>
      </svg>
    </Preview>
  );
}

/* ---------- 11. Passport ----------
 * ID-card style with portrait + 35×45 chip.
 */
export function PreviewPassport() {
  return (
    <Preview bg="linear-gradient(135deg, #dbeafe 0%, #93c5fd 100%)">
      <svg viewBox="0 0 160 100" className="absolute inset-0 w-full h-full">
        <rect x="40" y="12" width="80" height="76" rx="4" fill="#ffffff" stroke="#1e3a8a" strokeWidth="1.5" />
        <circle cx="80" cy="38" r="10" fill="#93c5fd" />
        <path d="M58 64c0-8 10-14 22-14s22 6 22 14" fill="#93c5fd" />
        <rect x="44" y="74" width="40" height="3" rx="1" fill="#cbd5e1" />
        <rect x="44" y="80" width="30" height="2" rx="1" fill="#e2e8f0" />
        <rect x="106" y="72" width="12" height="14" rx="1" fill="#1e293b" />
        <rect x="108" y="74" width="8" height="2" fill="#475569" />
        <rect x="108" y="78" width="8" height="2" fill="#475569" />
        <rect x="108" y="82" width="8" height="2" fill="#475569" />
      </svg>
    </Preview>
  );
}

/* ---------- 12. Photo Sheet ----------
 * Multiple copies of one ID on a page.
 */
export function PreviewPhotoSheet() {
  return (
    <Preview bg="#f8fafc">
      <svg viewBox="0 0 160 100" className="absolute inset-0 w-full h-full">
        <rect x="14" y="8" width="132" height="84" fill="#ffffff" stroke="#94a3b8" strokeWidth="0.8" />
        {[
          [28, 18], [84, 18], [28, 52], [84, 52],
        ].map(([x, y], i) => (
          <g key={i}>
            <rect x={x} y={y} width="44" height="30" rx="2" fill="#dbeafe" stroke="#93c5fd" strokeWidth="0.6" strokeDasharray="2 2" />
            <circle cx={x + 22} cy={y + 12} r="5" fill="#93c5fd" />
            <path d={`M${x + 12} ${y + 28}c0-4 4-8 10-8s10 4 10 8`} fill="#93c5fd" />
          </g>
        ))}
      </svg>
    </Preview>
  );
}

/* ---------- 13. EXIF / Metadata Remover ----------
 * Photo with an X over EXIF data.
 */
export function PreviewExif() {
  return (
    <Preview bg="linear-gradient(135deg, #f1f5f9 0%, #cbd5e1 100%)">
      <svg viewBox="0 0 160 100" className="absolute inset-0 w-full h-full">
        <rect x="40" y="22" width="60" height="56" rx="4" fill="#ffffff" />
        <rect x="48" y="30" width="44" height="3" rx="1" fill="#94a3b8" />
        <rect x="48" y="36" width="36" height="3" rx="1" fill="#cbd5e1" />
        <rect x="48" y="42" width="44" height="3" rx="1" fill="#cbd5e1" />
        <rect x="48" y="48" width="28" height="3" rx="1" fill="#cbd5e1" />
        <rect x="48" y="54" width="40" height="3" rx="1" fill="#cbd5e1" />
        <rect x="48" y="60" width="32" height="3" rx="1" fill="#cbd5e1" />
        <circle cx="120" cy="70" r="14" fill="#ef4444" />
        <line x1="111" y1="61" x2="129" y2="79" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
      </svg>
    </Preview>
  );
}

/* ---------- 14. Image Rotate ----------
 * Photo with rotation arrow.
 */
export function PreviewRotate() {
  return (
    <Preview bg="linear-gradient(135deg, #fae8ff 0%, #f5d0fe 100%)">
      <svg viewBox="0 0 160 100" className="absolute inset-0 w-full h-full">
        <rect x="40" y="22" width="60" height="56" rx="4" fill="#ffffff" stroke="#c084fc" strokeWidth="1.5" transform="rotate(-12 70 50)" />
        <path d="M118 50a18 18 0 1 1-3-10" stroke="#a855f7" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <polyline points="115 32 115 40 123 40" stroke="#a855f7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    </Preview>
  );
}

/* ---------- 15. Enhance ----------
 * Photo with sparkle/shine.
 */
export function PreviewEnhance() {
  return (
    <Preview bg="linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)">
      <svg viewBox="0 0 160 100" className="absolute inset-0 w-full h-full">
        <circle cx="80" cy="50" r="30" fill="#ffffff" />
        <circle cx="80" cy="50" r="22" fill="#fef9c3" />
        <g stroke="#f59e0b" strokeWidth="2" strokeLinecap="round">
          <line x1="80" y1="14" x2="80" y2="22" />
          <line x1="80" y1="78" x2="80" y2="86" />
          <line x1="44" y1="50" x2="52" y2="50" />
          <line x1="108" y1="50" x2="116" y2="50" />
        </g>
        <path d="M58 28l3 6 6 3-6 3-3 6-3-6-6-3 6-3z" fill="#f59e0b" />
        <path d="M104 70l2 4 4 2-4 2-2 4-2-4-4-2 4-2z" fill="#fb923c" />
      </svg>
    </Preview>
  );
}

/* ---------- 16. Batch ----------
 * Stack of files with arrows pointing to one zip.
 */
export function PreviewBatch() {
  return (
    <Preview bg="linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)">
      <svg viewBox="0 0 160 100" className="absolute inset-0 w-full h-full">
        {[
          [14, 16],
          [14, 48],
          [14, 80],
          [44, 16],
          [44, 48],
        ].map(([x, y], i) => (
          <g key={i}>
            <rect x={x} y={y} width="22" height="28" rx="2" fill="#ffffff" stroke="#0c4a6e" strokeWidth="1" />
            <rect x={x + 3} y={y + 5} width="16" height="3" rx="1" fill="#cbd5e1" />
            <rect x={x + 3} y={y + 10} width="12" height="3" rx="1" fill="#e2e8f0" />
            <circle cx={x + 6} cy={y + 20} r="2.5" fill="#f472b6" />
          </g>
        ))}
        <path d="M76 50l20 0m0 0l-7-7m7 7l-7 7" stroke="#0c4a6e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="104" y="32" width="42" height="36" rx="4" fill="#fef3c7" stroke="#b45309" strokeWidth="1.5" strokeDasharray="3 2" />
        <path d="M114 56c0-6 4-10 10-10s10 4 10 10" stroke="#b45309" strokeWidth="2" fill="none" />
        <text x="125" y="76" fontFamily="Inter, sans-serif" fontSize="9" fontWeight="700" fill="#b45309" textAnchor="middle">ZIP</text>
      </svg>
    </Preview>
  );
}

/* ---------- Map every tool to its unique preview ---------- */

export function ToolPreview({ slug, category }: { slug: string; category: string }) {
  let node: ReactNode;
  switch (slug) {
    case 'background-remover':
      node = <PreviewBgRemover />; break;
    case 'background-changer':
      node = <PreviewBgChanger />; break;
    case 'transparent-background':
      node = <PreviewTransparent />; break;
    case 'background-color-changer':
      node = <PreviewBgColor />; break;
    case 'image-compressor':
      node = <PreviewCompressor />; break;
    case 'image-optimizer':
      node = <PreviewOptimizer />; break;
    case 'reduce-file-size':
      node = <PreviewCompressor />; break;
    case 'image-resizer':
    case 'photo-resizer':
    case 'custom-photo-size':
    case 'passport-photo-resizer':
      node = <PreviewResizer />; break;
    case 'image-cropper':
      node = <PreviewCropper />; break;
    case 'image-rotate':
      node = <PreviewRotate />; break;
    case 'image-converter':
    case 'webp-converter':
    case 'jpg-to-png':
    case 'png-to-jpg':
    case 'jpg-to-webp':
    case 'png-to-webp':
    case 'webp-to-jpg':
    case 'webp-to-png':
      node = <PreviewConverter />; break;
    case 'watermark-image':
      node = <PreviewWatermark />; break;
    case 'enhance-image':
      node = <PreviewEnhance />; break;
    case 'passport-photo-maker':
    case 'photo-sheet':
      node = <PreviewPassport />; break;
    case 'remove-image-metadata':
      node = <PreviewExif />; break;
    case 'batch-compress':
    case 'batch-resize':
    case 'batch-convert':
      node = <PreviewBatch />; break;
    default:
      // category-level fallback
      if (category === 'id') node = <PreviewPassport />;
      else if (category === 'batch') node = <PreviewBatch />;
      else node = <PreviewBgRemover />;
  }

  // Wrap with the Preview container
  return <>{node}</>;
}
