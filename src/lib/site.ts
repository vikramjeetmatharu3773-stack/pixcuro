/**
 * Static site metadata — single source of truth for SEO + nav.
 */

export const SITE = {
  name: 'Pixcuro',
  tagline: 'Free image tools that run entirely in your browser',
  description:
    'Pixcuro is a privacy-first, browser-native image toolkit. Edit, compress, resize, crop, and convert images with zero server uploads — everything runs locally on GitHub Pages, so your files never leave your device.',
  url: 'https://pixcuro.github.io',
  ogImage: '/og-image.svg',
  twitter: '@pixcuro',
  contactEmail: 'hello@pixcuro.app',
  locale: 'en_US',
  repo: 'https://github.com/pixcuro/pixcuro',
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
    subtitle: 'Remove or replace image backgrounds in seconds. Hosted free on GitHub Pages — your photo stays on your device.',
  },
  id: {
    title: 'Photo & ID',
    subtitle: 'Create passport, visa and ID photos, then print them on standard paper sizes. 100% browser-based.',
  },
  compress: {
    title: 'Compress & optimize',
    subtitle: 'Make images smaller without visible quality loss. Strip metadata before sharing, with zero upload.',
  },
  resize: {
    title: 'Resize & crop',
    subtitle: 'Resize to exact dimensions, crop to any ratio, and lock common aspect ratios. Free on GitHub Pages.',
  },
  convert: {
    title: 'Convert',
    subtitle: 'Convert between JPG, PNG and WebP with quality controls. Served free by GitHub Pages, processed in your browser.',
  },
  edit: {
    title: 'Edit',
    subtitle: 'Adjust brightness, contrast, sharpness, saturation and add watermarks. Runs in your browser, no server.',
  },
  batch: {
    title: 'Batch',
    subtitle: 'Apply the same edit to multiple images at once and download everything as a ZIP. No upload, no tracking.',
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
      'Remove image backgrounds instantly using AI that runs entirely in your browser. Hosted free on GitHub Pages — your images never leave your device.',
    category: 'remove',
    badge: 'Popular',
    intro:
      'Drop a photo and get a clean transparent PNG. The AI model runs locally in your browser, so nothing is uploaded to any server.',
    inputFormats: ['PNG', 'JPG', 'WebP', 'BMP', 'GIF'],
    outputFormats: ['PNG'],
  },
  {
    slug: 'background-changer',
    path: '/background-changer',
    title: 'Background Changer & Color',
    shortTitle: 'Background Changer',
    description:
      'Replace or change backgrounds to solid colors, gradients, or custom images. All processing happens in your browser, served via free GitHub Pages.',
    category: 'remove',
    intro:
      'Easily replace backgrounds with a single click. Choose from presets, solid colors, or upload your own background image — all in your browser.',
    inputFormats: ['PNG', 'JPG', 'WebP', 'BMP'],
    outputFormats: ['PNG', 'JPG', 'WebP'],
  },
  {
    slug: 'transparent-background',
    path: '/transparent-background',
    title: 'Transparent Background Maker',
    shortTitle: 'Transparent Background',
    description:
      'Make image backgrounds transparent (PNG with alpha). Free browser-based tool hosted on GitHub Pages — perfect for logos and product photos.',
    category: 'remove',
    intro:
      'Drop a photo and download a PNG with a transparent background. Perfect for product listings, logos and overlays — no upload required.',
    inputFormats: ['PNG', 'JPG', 'WebP'],
    outputFormats: ['PNG'],
  },
  {
    slug: 'background-color-changer',
    path: '/background-color-changer',
    title: 'Background Color Changer',
    shortTitle: 'Background Color',
    description:
      'Change backgrounds to white, blue, red, or any custom HEX/RGB color. Free, browser-based, hosted on GitHub Pages.',
    category: 'remove',
    intro:
      'Pick from preset colors, or enter your own HEX or RGB value. The background is replaced instantly, right in your browser.',
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
      'Create standard passport, visa, and ID photos. Free browser-based tool hosted on GitHub Pages — your photos never leave your device.',
    category: 'id',
    badge: 'New',
    intro:
      'Select a country preset, upload your photo, and format it for official requirements — all in your browser.',
    inputFormats: ['PNG', 'JPG', 'WebP'],
    outputFormats: ['PNG', 'JPG'],
  },
  {
    slug: 'photo-resizer',
    path: '/photo-resizer',
    title: 'Photo Resizer & Cropper',
    shortTitle: 'Resize & Crop',
    description:
      'Resize and crop your photos with ease. Supports custom dimensions, social media presets, and aspect-ratio locks. Free, browser-based.',
    category: 'resize',
    intro:
      'Resize to exact dimensions or crop to any ratio. Perfect for social media, print, and professional use — all in your browser.',
    inputFormats: ['PNG', 'JPG', 'WebP', 'BMP'],
    outputFormats: ['PNG', 'JPG', 'WebP'],
  },
  {
    slug: 'custom-photo-size',
    path: '/custom-photo-size',
    title: 'Custom Photo Size',
    shortTitle: 'Custom Size',
    description:
      'Resize a photo to any custom size — by pixels, millimetres, or DPI. Free, browser-based, hosted on GitHub Pages.',
    category: 'id',
    intro:
      'Set your own width, height, unit, and DPI. The preview updates instantly in your browser, with zero upload.',
    inputFormats: ['PNG', 'JPG', 'WebP'],
    outputFormats: ['PNG', 'JPG'],
  },
  {
    slug: 'passport-photo-resizer',
    path: '/passport-photo-resizer',
    title: 'Passport Photo Resizer',
    shortTitle: 'Passport Resizer',
    description:
      'Resize photos to standard passport or visa dimensions. Free, browser-based, hosted on GitHub Pages — print-ready at 300 DPI.',
    category: 'id',
    intro:
      'Drop a photo, choose a country or set custom millimetre dimensions, and download at 300 DPI. Runs in your browser.',
    inputFormats: ['PNG', 'JPG', 'WebP'],
    outputFormats: ['PNG', 'JPG'],
  },
  {
    slug: 'photo-sheet',
    path: '/photo-sheet',
    title: 'Passport Photo Sheet',
    shortTitle: 'Photo Sheet',
    description:
      'Place multiple copies of a passport photo on a printable A4 or US Letter sheet. Free, browser-based, hosted on GitHub Pages.',
    category: 'id',
    intro:
      'Choose how many copies fit on A4 or US Letter, then download a print-ready file. All processing happens in your browser.',
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
      'Shrink JPG, PNG, and WebP files to a smaller size. Free, browser-based, hosted on GitHub Pages — your images never leave your device.',
    category: 'compress',
    intro:
      'Choose a quality level and instantly see how much you save. Compression runs entirely in your browser for speed and privacy.',
    inputFormats: ['PNG', 'JPG', 'WebP', 'BMP'],
    outputFormats: ['PNG', 'JPG', 'WebP'],
  },
  {
    slug: 'image-optimizer',
    path: '/image-optimizer',
    title: 'Image Optimizer',
    shortTitle: 'Image Optimizer',
    description:
      'One-click image optimization that picks the best format and quality. Free, browser-based, hosted on GitHub Pages.',
    category: 'compress',
    intro:
      'Drop an image and get the smallest reasonable version back. We try WebP and JPG and pick whichever wins — all in your browser.',
    inputFormats: ['PNG', 'JPG', 'WebP', 'BMP'],
    outputFormats: ['PNG', 'JPG', 'WebP'],
  },
  {
    slug: 'reduce-file-size',
    path: '/reduce-file-size',
    title: 'Reduce File Size',
    shortTitle: 'Reduce File Size',
    description:
      'Reduce image file size to a target KB or percentage. Free, browser-based, hosted on GitHub Pages — great for forms and email.',
    category: 'compress',
    intro:
      'Set a target size in KB and we re-encode the image until it fits. Useful for forms with upload limits, with zero upload required.',
    inputFormats: ['PNG', 'JPG', 'WebP'],
    outputFormats: ['JPG', 'WebP'],
  },
  {
    slug: 'exif-remover',
    path: '/remove-image-metadata',
    title: 'Remove Image Metadata',
    shortTitle: 'Remove Metadata',
    description:
      'Remove hidden camera data (GPS, device, timestamp) from images. Free, browser-based, hosted on GitHub Pages.',
    category: 'compress',
    intro:
      'Re-encoding the image in your browser drops the EXIF block. Use this before posting photos online — nothing leaves your device.',
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
      'Resize images to exact dimensions, by percentage, or with presets. Free, browser-based, hosted on GitHub Pages.',
    category: 'resize',
    intro:
      'Type a width and height, lock the aspect ratio, or pick a preset. The output downloads instantly as PNG or JPG — all in your browser.',
    inputFormats: ['PNG', 'JPG', 'WebP', 'BMP'],
    outputFormats: ['PNG', 'JPG', 'WebP'],
  },
  {
    slug: 'image-cropper',
    path: '/image-cropper',
    title: 'Image Cropper',
    shortTitle: 'Image Cropper',
    description:
      'Crop images visually with a draggable selection box. Free, browser-based, hosted on GitHub Pages — lock to any aspect ratio.',
    category: 'resize',
    intro:
      'Drag the crop handles, snap to an aspect ratio, and download. Cropping happens entirely in your browser — no upload needed.',
    inputFormats: ['PNG', 'JPG', 'WebP', 'BMP'],
    outputFormats: ['PNG', 'JPG', 'WebP'],
  },
  {
    slug: 'image-rotate',
    path: '/image-rotate',
    title: 'Rotate / Flip Image',
    shortTitle: 'Rotate / Flip',
    description:
      'Rotate an image by any angle and flip it horizontally or vertically. Free, browser-based, hosted on GitHub Pages.',
    category: 'resize',
    intro:
      'Use the rotate slider for any angle, plus quick horizontal and vertical flip buttons — all in your browser.',
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
      'Convert between PNG, JPG, and WebP with high-quality settings. Free, browser-based, hosted on GitHub Pages.',
    category: 'convert',
    intro:
      'Choose your target format and quality, then convert your images instantly. Everything is processed in your browser.',
    inputFormats: ['PNG', 'JPG', 'WebP', 'BMP'],
    outputFormats: ['PNG', 'JPG', 'WebP'],
  },
  // Edit
  {
    slug: 'image-watermark',
    path: '/watermark-image',
    title: 'Image Watermark',
    shortTitle: 'Watermark',
    description:
      'Add a text or image watermark to your photos. Free, browser-based, hosted on GitHub Pages — your photos never leave your device.',
    category: 'edit',
    intro:
      'Type your watermark text or upload a logo, pick a corner, and download. All processing happens in your browser.',
    inputFormats: ['PNG', 'JPG', 'WebP', 'BMP'],
    outputFormats: ['PNG', 'JPG', 'WebP'],
  },
  {
    slug: 'image-enhance',
    path: '/enhance-image',
    title: 'Enhance Image',
    shortTitle: 'Enhance',
    description:
      'Adjust brightness, contrast, saturation, and sharpness. Free, browser-based, hosted on GitHub Pages — no AI upscaling, no fake claims.',
    category: 'edit',
    intro:
      'Use sliders for brightness, contrast, saturation, sharpness, and temperature. Results are saved as PNG/JPG/WebP, all in your browser.',
    inputFormats: ['PNG', 'JPG', 'WebP'],
    outputFormats: ['PNG', 'JPG', 'WebP'],
  },
  // Batch
  {
    slug: 'batch-compress',
    path: '/batch-compress',
    title: 'Batch Compress',
    shortTitle: 'Batch Compress',
    description:
      'Compress many images at once with the same quality settings. Free, browser-based, hosted on GitHub Pages.',
    category: 'batch',
    intro:
      'Drop a folder of images and download a single ZIP of compressed versions — all in your browser.',
    inputFormats: ['PNG', 'JPG', 'WebP'],
    outputFormats: ['JPG', 'WebP', 'PNG'],
  },
  {
    slug: 'batch-resize',
    path: '/batch-resize',
    title: 'Batch Resize',
    shortTitle: 'Batch Resize',
    description:
      'Resize many images to the same dimensions in one pass. Free, browser-based, hosted on GitHub Pages.',
    category: 'batch',
    intro:
      'Set the target width and height, drop a folder of images, and download a ZIP. All processing happens in your browser.',
    inputFormats: ['PNG', 'JPG', 'WebP'],
    outputFormats: ['PNG', 'JPG', 'WebP'],
  },
  {
    slug: 'batch-convert',
    path: '/batch-convert',
    title: 'Batch Convert',
    shortTitle: 'Batch Convert',
    description:
      'Convert many images to the same target format in a single click. Free, browser-based, hosted on GitHub Pages.',
    category: 'batch',
    intro:
      'Pick a target format, drop a folder of images, and download a ZIP of the conversions — all in your browser.',
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
