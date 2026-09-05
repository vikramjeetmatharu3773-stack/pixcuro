# Pixcuro — Free Image Tools

A privacy-first image toolkit that runs entirely in your browser. No uploads, no signup, no tracking.

## Tools

- **Background Remover** — AI-powered background removal (model runs locally)
- **Background Changer / Color / Transparent** — replace, recolor, or remove backgrounds
- **Passport Photo Maker / Resizer / Sheet** — ID photos with country presets and printable A4/Letter sheets
- **Image Compressor / Optimizer / Reduce File Size** — shrink JPG, PNG and WebP
- **Image Resizer / Cropper / Rotate / Custom Photo Size / Photo Sheet**
- **Image Converter** — PNG ↔ JPG ↔ WebP
- **Image Watermark** — text or logo overlays
- **Enhance Image** — brightness, contrast, saturation, sharpness, temperature
- **Remove Image Metadata** — strip EXIF by re-encoding
- **Batch Compress / Resize / Convert** — process many images and download a ZIP

## Architecture

- **Framework**: React 18 + Vite 5 + TypeScript
- **Styling**: Tailwind CSS 3 (custom brand palette)
- **Routing**: React Router 7
- **Image processing**: native HTML5 Canvas (resize, crop, compress, watermark, format conversion)
- **Background removal**: [@imgly/background-removal](https://github.com/imgly/background-removal) — runs locally via WebAssembly/ONNX
- **PDF generation**: built-in dependency-free PDF writer (`src/lib/pdf.ts`)
- **ZIP for batch**: [JSZip](https://stuk.github.io/jszip/)
- **Downloads**: [file-saver](https://github.com/eligrey/FileSaver.js/)

## Privacy

Every tool runs entirely in the user's browser. No image data leaves the device.

- The background-removal model downloads to the browser cache once (~40 MB).
- No analytics scripts are loaded by default.
- The only network requests made by the app are to fetch the static HTML/JS/CSS and Google Fonts.

## Development

```bash
npm install
npm run dev      # dev server with HMR
npm run build    # production build to ./dist
npm run preview  # serve the production build locally
npm run lint
```

## Deployment

This is a static site — any static host works (Vercel, Netlify, Cloudflare Pages, GitHub Pages, S3+CloudFront, etc.).

### Vercel

```bash
npm i -g vercel
vercel          # interactive
# or, with an API token:
vercel --token "$VERCEL_TOKEN" --yes --prod
```

Output directory: `dist`. Build command: `npm run build`.

## Environment variables

None required for runtime. All processing is client-side.

For convenience during deployment, the project picks up `VERCEL_TOKEN` if set.

## License

MIT.
