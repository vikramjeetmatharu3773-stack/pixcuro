/**
 * Passport / ID photo size presets.
 *
 * These are *commonly reported* sizes in millimetres and pixels. They are
 * NOT guaranteed to be accepted by any specific authority — they should be
 * treated as starting points. The user is responsible for confirming the
 * exact requirements of their country's authority.
 *
 * Sources are linked where possible; sizes may vary by issuing office.
 */

export interface PassportPreset {
  /** Display label, e.g. "US Passport (2×2 in / 51×51 mm)" */
  label: string;
  /** ISO country code or generic region */
  country: string;
  /** Short key */
  key: string;
  /** Width in millimetres */
  widthMm: number;
  /** Height in millimetres */
  heightMm: number;
  /** Width in pixels at typical 300 DPI */
  widthPx: number;
  /** Height in pixels at typical 300 DPI */
  heightPx: number;
  /** Notes / disclaimer */
  notes: string;
}

export const PASSPORT_PRESETS: PassportPreset[] = [
  {
    key: 'us-passport',
    label: 'US Passport / Visa (2 × 2 in)',
    country: 'US',
    widthMm: 51,
    heightMm: 51,
    widthPx: 600,
    heightPx: 600,
    notes:
      'Common US passport and immigrant visa photo dimensions. Always verify with the issuing authority.',
  },
  {
    key: 'schengen',
    label: 'Schengen / EU (35 × 45 mm)',
    country: 'EU',
    widthMm: 35,
    heightMm: 45,
    widthPx: 413,
    heightPx: 531,
    notes: 'Common Schengen visa standard. Confirm the exact current requirement with the consulate.',
  },
  {
    key: 'uk-passport',
    label: 'UK Passport (35 × 45 mm)',
    country: 'UK',
    widthMm: 35,
    heightMm: 45,
    widthPx: 413,
    heightPx: 531,
    notes: 'Standard UK passport photo. Check the latest guidance on gov.uk.',
  },
  {
    key: 'india-passport',
    label: 'India Passport (35 × 45 mm)',
    country: 'IN',
    widthMm: 35,
    heightMm: 45,
    widthPx: 413,
    heightPx: 531,
    notes: 'Standard India passport photo. Check the current spec on india.gov.in / passport.gov.in.',
  },
  {
    key: 'canada-passport',
    label: 'Canada Passport (50 × 70 mm)',
    country: 'CA',
    widthMm: 50,
    heightMm: 70,
    widthPx: 590,
    heightPx: 826,
    notes: 'Canada passport photo dimensions per current government guidance.',
  },
  {
    key: 'china-passport',
    label: 'China Passport (33 × 48 mm)',
    country: 'CN',
    widthMm: 33,
    heightMm: 48,
    widthPx: 390,
    heightPx: 567,
    notes: 'Standard China passport photo dimensions.',
  },
  {
    key: 'australia-passport',
    label: 'Australia Passport (35 × 45 mm)',
    country: 'AU',
    widthMm: 35,
    heightMm: 45,
    widthPx: 413,
    heightPx: 531,
    notes: 'Standard Australia passport photo dimensions.',
  },
  {
    key: 'japan-passport',
    label: 'Japan Visa (35 × 45 mm)',
    country: 'JP',
    widthMm: 35,
    heightMm: 45,
    widthPx: 413,
    heightPx: 531,
    notes: 'Common Japan visa photo size. Confirm with the embassy.',
  },
  {
    key: 'id-1x1',
    label: 'Square Profile (1 × 1 in)',
    country: 'Generic',
    widthMm: 25.4,
    heightMm: 25.4,
    widthPx: 300,
    heightPx: 300,
    notes: 'Square profile/avatar size.',
  },
];

export const PAPER_PRESETS = [
  { key: 'a4', label: 'A4 (210 × 297 mm)', widthMm: 210, heightMm: 297 },
  { key: 'letter', label: 'US Letter (216 × 279 mm)', widthMm: 215.9, heightMm: 279.4 },
  { key: 'a5', label: 'A5 (148 × 210 mm)', widthMm: 148, heightMm: 210 },
  { key: '4x6', label: '4 × 6 in (102 × 152 mm)', widthMm: 101.6, heightMm: 152.4 },
];

/** Default photo output DPI used by passport presets. */
export const PASSPORT_DPI = 300;
