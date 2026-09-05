/**
 * Static site metadata — single source of truth for SEO + nav.
 */

export const SITE = {
  name: 'Pixcuro',
  tagline: 'Free image tools that run in your browser',
  description:
    'Pixcuro is a free, privacy-first image toolkit. Remove backgrounds, compress, resize, crop and convert images — all processed locally in your browser. No signup, no uploads.',
  url: 'https://pixcuro.vercel.app',
  ogImage: '/og-image.svg',
  twitter: '@pixcuro',
  contactEmail: 'hello@pixcuro.app',
  locale: 'en_US',
} as const;

export type ToolCategory =
  | 'remove'
  | 'id'
  | 'compress'
  | 'resize'
  | 'convert'
  | 'edit'
  | 'batch';

export interface ToolEntry {
  slug: string;
  path: string;
  title: string;
  shortTitle: string;
  description: string;
  category: ToolCategory;
  badge?: string;
  /** Short note used in SEO landing pages */
  intro: string;
  /** Optional list of supported formats */
  inputFormats?: string[];
  outputFormats?: string[];
}

export const CATEGORY_META: Record<ToolCategory, { title: string; subtitle: string }> = {
  remove: {
    title: 'Remove & change',
    subtitle: 'Remove or replace image backgrounds in seconds. Your photo stays on your device.',
  },
  id: {
    title: 'Photo & ID',
    subtitle: 'Create passport, visa and ID photos, then print them on standard paper sizes.',
  },
  compress: {
    title: 'Compress & optimize',
    subtitle: 'Make images smaller without visible quality loss. Strip metadata before sharing.',
  },
  resize: {
    title: 'Resize & crop',
    subtitle: 'Resize to exact dimensions, crop to any ratio, and lock common aspect ratios.',
  },
  convert: {
    title: 'Convert',
    subtitle: 'Convert between JPG, PNG and WebP with quality controls. Done in your browser.',
  },
  edit: {
    title: 'Edit',
    subtitle: 'Adjust brightness, contrast, sharpness, saturation and add watermarks.',
  },
  batch: {
    title: 'Batch',
    subtitle: 'Apply the same edit to multiple images at once and download everything as a ZIP.',
  },
};

export const TOOLS: ToolEntry[] = [
  // Remove & change
  {
    slug: 'background-remover',
    path: '/background-remover',
    title: 'Background Remover',
    shortTitle: 'Background Remover',
    description:
      'Remove the background from any photo in seconds. The AI runs entirely in your browser — your image never leaves your device.',
    category: 'remove',
    badge: 'Most popular',
    intro:
      'Upload a JPG, PNG or WebP and get a clean transparent PNG. The model runs locally so the photo is never sent anywhere.',
    inputFormats: ['PNG', 'JPG', 'WebP', 'BMP', 'GIF'],
    outputFormats: ['PNG'],
  },
  {
    slug: 'background-changer',
    path: '/background-changer',
    title: 'Background Changer',
    shortTitle: 'Background Changer',
    description:
      'Replace the background of any photo with a solid color, gradient, blur or custom image. Switch backgrounds as many times as you want.',
    category: 'remove',
    intro:
      'Upload once and try many backgrounds — solid, gradient, blurred or your own image. No re-uploading needed.',
    inputFormats: ['PNG', 'JPG', 'WebP', 'BMP'],
    outputFormats: ['PNG', 'JPG', 'WebP'],
  },
  {
    slug: 'transparent-background',
    path: '/transparent-background',
    title: 'Transparent Background Maker',
    shortTitle: 'Transparent Background',
    description:
      'Make the background of an image transparent (PNG with alpha). Useful for logos, product photos and design assets.',
    category: 'remove',
    intro:
      'Drop a photo and download a PNG with a transparent background. Perfect for product listings, logos and overlays.',
    inputFormats: ['PNG', 'JPG', 'WebP'],
    outputFormats: ['PNG'],
  },
  {
    slug: 'background-color-changer',
    path: '/background-color-changer',
    title: 'Background Color Changer',
    shortTitle: 'Background Color',
    description:
      'Change the background of a photo to white, blue, red or any custom HEX / RGB color. Pick from presets or fine-tune with sliders.',
    category: 'remove',
    intro:
      'Pick from preset colors, or enter your own HEX or RGB value. The background is replaced instantly.',
    inputFormats: ['PNG', 'JPG', 'WebP'],
    outputFormats: ['PNG', 'JPG', 'WebP'],
  },
  // Photo & ID
  {
    slug: 'passport-photo-maker',
    path: '/passport-photo-maker',
    title: 'Passport Photo Maker',
    shortTitle: 'Passport Photo Maker',
    description:
      'Create passport, visa and ID photos in common sizes. Pick a country preset, change the background, then print.',
    category: 'id',
    badge: 'New',
    intro:
      'Pick a country preset (US, EU/Schengen, UK, India, etc.), upload a photo, change the background and download.',
    inputFormats: ['PNG', 'JPG', 'WebP'],
    outputFormats: ['PNG', 'JPG'],
  },
  {
    slug: 'passport-photo-resizer',
    path: '/passport-photo-resizer',
    title: 'Passport Photo Resizer',
    shortTitle: 'Passport Photo Resizer',
    description:
      'Resize an existing photo to standard passport or visa dimensions. Output is print-ready at 300 DPI.',
    category: 'id',
    intro:
      'Drop a photo, choose a country or set custom millimetre dimensions, and download at 300 DPI.',
    inputFormats: ['PNG', 'JPG', 'WebP'],
    outputFormats: ['PNG', 'JPG'],
  },
  {
    slug: 'photo-resizer',
    path: '/photo-resizer',
    title: 'Photo Resizer',
    shortTitle: 'Photo Resizer',
    description:
      'Resize a photo to specific pixel or percentage dimensions with aspect-ratio lock. Includes social presets.',
    category: 'id',
    intro:
      'Type a width and height, lock the aspect ratio, or pick a social-media preset.',
    inputFormats: ['PNG', 'JPG', 'WebP', 'BMP'],
    outputFormats: ['PNG', 'JPG', 'WebP'],
  },
  {
    slug: 'custom-photo-size',
    path: '/custom-photo-size',
    title: 'Custom Photo Size',
    shortTitle: 'Custom Photo Size',
    description:
      'Resize a photo to any custom size you specify — by pixels, millimetres or DPI.',
    category: 'id',
    intro:
      'Set your own width, height, unit and DPI. The preview updates as you type.',
    inputFormats: ['PNG', 'JPG', 'WebP'],
    outputFormats: ['PNG', 'JPG'],
  },
  {
    slug: 'photo-sheet',
    path: '/photo-sheet',
    title: 'Passport Photo Sheet',
    shortTitle: 'Photo Sheet',
    description:
      'Place multiple copies of a passport photo on a printable A4 or US Letter sheet. Download as PNG, JPG or PDF.',
    category: 'id',
    intro:
      'Choose how many copies fit on A4 or US Letter, then download a print-ready file.',
    inputFormats: ['PNG', 'JPG', 'WebP'],
    outputFormats: ['PNG', 'JPG', 'PDF'],
  },
  // Compress & optimize
  {
    slug: 'image-compressor',
    path: '/image-compressor',
    title: 'Image Compressor',
    shortTitle: 'Image Compressor',
    description:
      'Shrink JPG, PNG and WebP files to a smaller size while keeping quality you can control. Compare before and after side by side.',
    category: 'compress',
    intro:
      'Choose a quality level and instantly see how much you save. Compression runs in your browser for speed and privacy.',
    inputFormats: ['PNG', 'JPG', 'WebP', 'BMP'],
    outputFormats: ['PNG', 'JPG', 'WebP'],
  },
  {
    slug: 'image-optimizer',
    path: '/image-optimizer',
    title: 'Image Optimizer',
    shortTitle: 'Image Optimizer',
    description:
      'One-click image optimization that picks the best format and quality for your image to make it as small as possible.',
    category: 'compress',
    intro:
      'Drop an image and get the smallest reasonable version back. We try WebP and JPG and pick whichever wins.',
    inputFormats: ['PNG', 'JPG', 'WebP', 'BMP'],
    outputFormats: ['PNG', 'JPG', 'WebP'],
  },
  {
    slug: 'reduce-file-size',
    path: '/reduce-file-size',
    title: 'Reduce File Size',
    shortTitle: 'Reduce File Size',
    description:
      'Reduce the file size of an image to a target KB or percentage. Great for email attachments and forms.',
    category: 'compress',
    intro:
      'Set a target size in KB and we re-encode the image until it fits. Useful for forms with upload limits.',
    inputFormats: ['PNG', 'JPG', 'WebP'],
    outputFormats: ['JPG', 'WebP'],
  },
  {
    slug: 'exif-remover',
    path: '/remove-image-metadata',
    title: 'Remove Image Metadata',
    shortTitle: 'Remove Metadata',
    description:
      'Remove hidden camera data (GPS, device, timestamp) from images before you share them.',
    category: 'compress',
    intro:
      'Re-encoding the image in your browser drops the EXIF block. Use this before posting photos online.',
    inputFormats: ['PNG', 'JPG', 'WebP'],
    outputFormats: ['PNG', 'JPG'],
  },
  // Resize & crop
  {
    slug: 'image-resizer',
    path: '/image-resizer',
    title: 'Image Resizer',
    shortTitle: 'Image Resizer',
    description:
      'Resize images to exact dimensions, by percentage, or with presets for Instagram, YouTube, LinkedIn and more.',
    category: 'resize',
    intro:
      'Type a width and height, lock the aspect ratio, or pick a preset. The output downloads instantly as PNG or JPG.',
    inputFormats: ['PNG', 'JPG', 'WebP', 'BMP'],
    outputFormats: ['PNG', 'JPG', 'WebP'],
  },
  {
    slug: 'image-cropper',
    path: '/image-cropper',
    title: 'Image Cropper',
    shortTitle: 'Image Cropper',
    description:
      'Crop images visually with a draggable selection box. Lock to common aspect ratios and export to PNG or JPG.',
    category: 'resize',
    intro:
      'Drag the crop handles, snap to an aspect ratio and download. Cropping happens in your browser — no upload needed.',
    inputFormats: ['PNG', 'JPG', 'WebP', 'BMP'],
    outputFormats: ['PNG', 'JPG', 'WebP'],
  },
  {
    slug: 'image-rotate',
    path: '/image-rotate',
    title: 'Rotate / Flip Image',
    shortTitle: 'Rotate / Flip',
    description:
      'Rotate an image by any angle and flip it horizontally or vertically. Useful for straightening photos.',
    category: 'resize',
    intro:
      'Use the rotate slider for any angle, plus quick horizontal and vertical flip buttons.',
    inputFormats: ['PNG', 'JPG', 'WebP', 'BMP'],
    outputFormats: ['PNG', 'JPG', 'WebP'],
  },
  // Convert
  {
    slug: 'image-converter',
    path: '/image-converter',
    title: 'Image Converter',
    shortTitle: 'Image Converter',
    description:
      'Convert between PNG, JPG and WebP with quality controls. See the original and new sizes before you download.',
    category: 'convert',
    intro:
      'Pick a target format, choose quality, and download the converted image. Everything is done locally.',
    inputFormats: ['PNG', 'JPG', 'WebP', 'BMP'],
    outputFormats: ['PNG', 'JPG', 'WebP'],
  },
  {
    slug: 'jpg-to-png',
    path: '/jpg-to-png',
    title: 'JPG to PNG',
    shortTitle: 'JPG → PNG',
    description:
      'Convert JPG photos to PNG images with full quality. Useful when you need a lossless copy of a JPEG.',
    category: 'convert',
    intro:
      'Drag in a JPG and get a PNG. Re-encoding happens in your browser — the file is never uploaded.',
    inputFormats: ['JPG', 'JPEG'],
    outputFormats: ['PNG'],
  },
  {
    slug: 'png-to-jpg',
    path: '/png-to-jpg',
    title: 'PNG to JPG',
    shortTitle: 'PNG → JPG',
    description:
      'Convert PNG images to smaller JPG files. Pick a quality level and download the JPG instantly.',
    category: 'convert',
    intro:
      'Set the JPG quality, drop the PNG, and download. Useful for shrinking screenshots and product photos.',
    inputFormats: ['PNG'],
    outputFormats: ['JPG'],
  },
  {
    slug: 'webp-converter',
    path: '/webp-converter',
    title: 'WebP Converter',
    shortTitle: 'WebP ↔ JPG/PNG',
    description:
      'Convert to and from WebP. Modern browsers love WebP because it beats JPG and PNG on size for the same quality.',
    category: 'convert',
    intro:
      'Move between WebP and JPG/PNG. Pick a quality and download — all done in the browser.',
    inputFormats: ['WebP', 'JPG', 'PNG'],
    outputFormats: ['WebP', 'JPG', 'PNG'],
  },
  {
    slug: 'jpg-to-webp',
    path: '/jpg-to-webp',
    title: 'JPG to WebP',
    shortTitle: 'JPG → WebP',
    description:
      'Convert JPG images to smaller WebP files. Great for speeding up websites.',
    category: 'convert',
    intro: 'Convert JPG to WebP with adjustable quality. WebP usually beats JPG on size.',
    inputFormats: ['JPG', 'JPEG'],
    outputFormats: ['WebP'],
  },
  {
    slug: 'png-to-webp',
    path: '/png-to-webp',
    title: 'PNG to WebP',
    shortTitle: 'PNG → WebP',
    description:
      'Convert PNG images to WebP. Get smaller files with or without transparency.',
    category: 'convert',
    intro: 'Drop a PNG and download a WebP that is typically 25–35% smaller.',
    inputFormats: ['PNG'],
    outputFormats: ['WebP'],
  },
  {
    slug: 'webp-to-jpg',
    path: '/webp-to-jpg',
    title: 'WebP to JPG',
    shortTitle: 'WebP → JPG',
    description: 'Convert WebP images to JPG so they open in older apps and devices.',
    category: 'convert',
    intro: 'Convert a WebP file to JPG. Pick a quality, get a JPG that opens anywhere.',
    inputFormats: ['WebP'],
    outputFormats: ['JPG'],
  },
  {
    slug: 'webp-to-png',
    path: '/webp-to-png',
    title: 'WebP to PNG',
    shortTitle: 'WebP → PNG',
    description: 'Convert WebP images to PNG with transparency preserved.',
    category: 'convert',
    intro: 'Convert WebP to PNG. Transparency is preserved.',
    inputFormats: ['WebP'],
    outputFormats: ['PNG'],
  },
  // Edit
  {
    slug: 'image-watermark',
    path: '/watermark-image',
    title: 'Image Watermark',
    shortTitle: 'Watermark',
    description:
      'Add a text or image watermark to your photos. Choose position, opacity, rotation, font and color.',
    category: 'edit',
    intro:
      'Type your watermark text or upload a logo, pick a corner, and download.',
    inputFormats: ['PNG', 'JPG', 'WebP', 'BMP'],
    outputFormats: ['PNG', 'JPG', 'WebP'],
  },
  {
    slug: 'image-enhance',
    path: '/enhance-image',
    title: 'Enhance Image',
    shortTitle: 'Enhance',
    description:
      'Adjust brightness, contrast, saturation and sharpness in your browser. No AI upscaling, no fake claims.',
    category: 'edit',
    intro:
      'Use sliders for brightness, contrast, saturation, sharpness and temperature. Results are saved as PNG/JPG/WebP.',
    inputFormats: ['PNG', 'JPG', 'WebP'],
    outputFormats: ['PNG', 'JPG', 'WebP'],
  },
  // Batch
  {
    slug: 'batch-compress',
    path: '/batch-compress',
    title: 'Batch Compress',
    shortTitle: 'Batch Compress',
    description: 'Compress many images at once with the same quality settings. Download everything as a ZIP.',
    category: 'batch',
    intro: 'Drop a folder of images and download a single ZIP of compressed versions.',
    inputFormats: ['PNG', 'JPG', 'WebP'],
    outputFormats: ['JPG', 'WebP', 'PNG'],
  },
  {
    slug: 'batch-resize',
    path: '/batch-resize',
    title: 'Batch Resize',
    shortTitle: 'Batch Resize',
    description: 'Resize many images to the same dimensions in one pass. Output is a single ZIP.',
    category: 'batch',
    intro: 'Set the target width and height, drop a folder of images, and download a ZIP.',
    inputFormats: ['PNG', 'JPG', 'WebP'],
    outputFormats: ['PNG', 'JPG', 'WebP'],
  },
  {
    slug: 'batch-convert',
    path: '/batch-convert',
    title: 'Batch Convert',
    shortTitle: 'Batch Convert',
    description: 'Convert many images to the same target format in a single click.',
    category: 'batch',
    intro: 'Pick a target format, drop a folder of images, and download a ZIP of the conversions.',
    inputFormats: ['PNG', 'JPG', 'WebP'],
    outputFormats: ['PNG', 'JPG', 'WebP'],
  },
];

export const TOOL_BY_PATH: Record<string, ToolEntry> = Object.fromEntries(
  TOOLS.map((t) => [t.path, t]),
);

export const PRESETS = {
  instagram: [
    { label: 'Instagram Post (1:1, 1080×1080)', width: 1080, height: 1080 },
    { label: 'Instagram Portrait (4:5, 1080×1350)', width: 1080, height: 1350 },
    { label: 'Instagram Story / Reel (9:16, 1080×1920)', width: 1080, height: 1920 },
    { label: 'Instagram Landscape (1.91:1, 1080×566)', width: 1080, height: 566 },
  ],
  youtube: [
    { label: 'YouTube Thumbnail (1280×720)', width: 1280, height: 720 },
    { label: 'YouTube Banner (2560×1440)', width: 2560, height: 1440 },
    { label: 'YouTube Shorts Cover (1080×1920)', width: 1080, height: 1920 },
  ],
  facebook: [
    { label: 'Facebook Post (1200×630)', width: 1200, height: 630 },
    { label: 'Facebook Cover (820×312)', width: 820, height: 312 },
    { label: 'Facebook Story (1080×1920)', width: 1080, height: 1920 },
  ],
  linkedin: [
    { label: 'LinkedIn Post (1200×627)', width: 1200, height: 627 },
    { label: 'LinkedIn Cover (1584×396)', width: 1584, height: 396 },
    { label: 'LinkedIn Profile (400×400)', width: 400, height: 400 },
  ],
  x: [
    { label: 'X (Twitter) Post (1600×900)', width: 1600, height: 900 },
    { label: 'X Header (1500×500)', width: 1500, height: 500 },
    { label: 'X Profile (400×400)', width: 400, height: 400 },
  ],
  ecommerce: [
    { label: 'Product Square (1000×1000)', width: 1000, height: 1000 },
    { label: 'Product Hero (1600×1200)', width: 1600, height: 1200 },
    { label: 'Product Thumbnail (300×300)', width: 300, height: 300 },
  ],
};

export const ASPECT_RATIOS: { label: string; value: number | null }[] = [
  { label: 'Free', value: null },
  { label: '1:1', value: 1 },
  { label: '4:3', value: 4 / 3 },
  { label: '3:2', value: 3 / 2 },
  { label: '16:9', value: 16 / 9 },
  { label: '9:16', value: 9 / 16 },
  { label: '2:3', value: 2 / 3 },
  { label: '3:4', value: 3 / 4 },
];

export type PresetKey = keyof typeof PRESETS;
