import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { ToolsIndexPage } from './pages/ToolsIndexPage';
import { AboutPage } from './pages/AboutPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { ContactPage } from './pages/ContactPage';
import { FaqPage } from './pages/FaqPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Lazy-load each tool page so the @imgly/background-removal bundle only ships
// when a user actually visits a tool page (esp. background-remover).
const BackgroundRemoverPage = lazy(() => import('./pages/BackgroundRemoverPage').then((m) => ({ default: m.BackgroundRemoverPage })));
const ImageCompressorPage = lazy(() => import('./pages/ImageCompressorPage').then((m) => ({ default: m.ImageCompressorPage })));
const ImageResizerPage = lazy(() => import('./pages/ImageResizerPage').then((m) => ({ default: m.ImageResizerPage })));
const ImageCropperPage = lazy(() => import('./pages/ImageCropperPage').then((m) => ({ default: m.ImageCropperPage })));
const ImageConverterPage = lazy(() => import('./pages/ImageConverterPage').then((m) => ({ default: m.ImageConverterPage })));
const JpgToPngPage = lazy(() => import('./pages/JpgToPngPage').then((m) => ({ default: m.JpgToPngPage })));
const PngToJpgPage = lazy(() => import('./pages/PngToJpgPage').then((m) => ({ default: m.PngToJpgPage })));
const JpgToWebpPage = lazy(() => import('./pages/JpgToWebpPage').then((m) => ({ default: m.JpgToWebpPage })));
const PngToWebpPage = lazy(() => import('./pages/PngToWebpPage').then((m) => ({ default: m.PngToWebpPage })));
const WebpToJpgPage = lazy(() => import('./pages/WebpToJpgPage').then((m) => ({ default: m.WebpToJpgPage })));
const WebpToPngPage = lazy(() => import('./pages/WebpToPngPage').then((m) => ({ default: m.WebpToPngPage })));
const WebpConverterPage = lazy(() => import('./pages/WebpConverterPage').then((m) => ({ default: m.WebpConverterPage })));
const ImageOptimizerPage = lazy(() => import('./pages/ImageOptimizerPage').then((m) => ({ default: m.ImageOptimizerPage })));
const ReduceFileSizePage = lazy(() => import('./pages/ReduceFileSizePage').then((m) => ({ default: m.ReduceFileSizePage })));
const ExifRemoverPage = lazy(() => import('./pages/ExifRemoverPage').then((m) => ({ default: m.ExifRemoverPage })));
const ImageRotatePage = lazy(() => import('./pages/ImageRotatePage').then((m) => ({ default: m.ImageRotatePage })));
const PhotoResizerPage = lazy(() => import('./pages/PhotoResizerPage').then((m) => ({ default: m.PhotoResizerPage })));
const PassportPhotoResizerPage = lazy(() => import('./pages/PassportPhotoResizerPage').then((m) => ({ default: m.PassportPhotoResizerPage })));
const CustomPhotoSizePage = lazy(() => import('./pages/CustomPhotoSizePage').then((m) => ({ default: m.CustomPhotoSizePage })));
const PhotoSheetPage = lazy(() => import('./pages/PhotoSheetPage').then((m) => ({ default: m.PhotoSheetPage })));
const PassportPhotoMakerPage = lazy(() => import('./pages/PassportPhotoMakerPage').then((m) => ({ default: m.PassportPhotoMakerPage })));
const BackgroundChangerPage = lazy(() => import('./pages/BackgroundChangerPage').then((m) => ({ default: m.BackgroundChangerPage })));
const BackgroundColorChangerPage = lazy(() => import('./pages/BackgroundColorChangerPage').then((m) => ({ default: m.BackgroundColorChangerPage })));
const TransparentBackgroundPage = lazy(() => import('./pages/TransparentBackgroundPage').then((m) => ({ default: m.TransparentBackgroundPage })));
const WatermarkImagePage = lazy(() => import('./pages/WatermarkImagePage').then((m) => ({ default: m.WatermarkImagePage })));
const ImageEnhancePage = lazy(() => import('./pages/ImageEnhancePage').then((m) => ({ default: m.ImageEnhancePage })));
const BatchCompressPage = lazy(() => import('./pages/BatchCompressPage').then((m) => ({ default: m.BatchCompressPage })));
const BatchResizePage = lazy(() => import('./pages/BatchResizePage').then((m) => ({ default: m.BatchResizePage })));
const BatchConvertPage = lazy(() => import('./pages/BatchConvertPage').then((m) => ({ default: m.BatchConvertPage })));
const GuidesPage = lazy(() => import('./pages/GuidesPage').then((m) => ({ default: m.GuidesPage })));
const GuidePostPage = lazy(() => import('./pages/GuidePostPage').then((m) => ({ default: m.GuidePostPage })));

function PageFallback() {
  return (
    <div className="container-narrow py-20">
      <div className="card p-8 text-center">
        <div className="mx-auto w-10 h-10 rounded-full border-2 border-brand-200 border-t-brand-600 animate-spin" />
        <p className="mt-4 text-sm text-ink-600">Loading tool…</p>
      </div>
    </div>
  );
}

const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'tools', element: <ToolsIndexPage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'privacy', element: <PrivacyPage /> },
      { path: 'terms', element: <TermsPage /> },
      { path: 'contact', element: <ContactPage /> },
      { path: 'faq', element: <FaqPage /> },
      { path: 'guides', element: <Suspense fallback={<PageFallback />}><GuidesPage /></Suspense> },
      { path: 'guides/:slug', element: <Suspense fallback={<PageFallback />}><GuidePostPage /></Suspense> },
      { path: 'background-remover', element: <Suspense fallback={<PageFallback />}><BackgroundRemoverPage /></Suspense> },
      { path: 'background-changer', element: <Suspense fallback={<PageFallback />}><BackgroundChangerPage /></Suspense> },
      { path: 'transparent-background', element: <Suspense fallback={<PageFallback />}><TransparentBackgroundPage /></Suspense> },
      { path: 'background-color-changer', element: <Suspense fallback={<PageFallback />}><BackgroundColorChangerPage /></Suspense> },
      { path: 'passport-photo-maker', element: <Suspense fallback={<PageFallback />}><PassportPhotoMakerPage /></Suspense> },
      { path: 'passport-photo-resizer', element: <Suspense fallback={<PageFallback />}><PassportPhotoResizerPage /></Suspense> },
      { path: 'photo-resizer', element: <Suspense fallback={<PageFallback />}><PhotoResizerPage /></Suspense> },
      { path: 'custom-photo-size', element: <Suspense fallback={<PageFallback />}><CustomPhotoSizePage /></Suspense> },
      { path: 'photo-sheet', element: <Suspense fallback={<PageFallback />}><PhotoSheetPage /></Suspense> },
      { path: 'image-compressor', element: <Suspense fallback={<PageFallback />}><ImageCompressorPage /></Suspense> },
      { path: 'image-optimizer', element: <Suspense fallback={<PageFallback />}><ImageOptimizerPage /></Suspense> },
      { path: 'reduce-file-size', element: <Suspense fallback={<PageFallback />}><ReduceFileSizePage /></Suspense> },
      { path: 'remove-image-metadata', element: <Suspense fallback={<PageFallback />}><ExifRemoverPage /></Suspense> },
      { path: 'image-resizer', element: <Suspense fallback={<PageFallback />}><ImageResizerPage /></Suspense> },
      { path: 'image-cropper', element: <Suspense fallback={<PageFallback />}><ImageCropperPage /></Suspense> },
      { path: 'image-rotate', element: <Suspense fallback={<PageFallback />}><ImageRotatePage /></Suspense> },
      { path: 'image-converter', element: <Suspense fallback={<PageFallback />}><ImageConverterPage /></Suspense> },
      { path: 'jpg-to-png', element: <Suspense fallback={<PageFallback />}><JpgToPngPage /></Suspense> },
      { path: 'png-to-jpg', element: <Suspense fallback={<PageFallback />}><PngToJpgPage /></Suspense> },
      { path: 'jpg-to-webp', element: <Suspense fallback={<PageFallback />}><JpgToWebpPage /></Suspense> },
      { path: 'png-to-webp', element: <Suspense fallback={<PageFallback />}><PngToWebpPage /></Suspense> },
      { path: 'webp-to-jpg', element: <Suspense fallback={<PageFallback />}><WebpToJpgPage /></Suspense> },
      { path: 'webp-to-png', element: <Suspense fallback={<PageFallback />}><WebpToPngPage /></Suspense> },
      { path: 'webp-converter', element: <Suspense fallback={<PageFallback />}><WebpConverterPage /></Suspense> },
      { path: 'watermark-image', element: <Suspense fallback={<PageFallback />}><WatermarkImagePage /></Suspense> },
      { path: 'enhance-image', element: <Suspense fallback={<PageFallback />}><ImageEnhancePage /></Suspense> },
      { path: 'batch-compress', element: <Suspense fallback={<PageFallback />}><BatchCompressPage /></Suspense> },
      { path: 'batch-resize', element: <Suspense fallback={<PageFallback />}><BatchResizePage /></Suspense> },
      { path: 'batch-convert', element: <Suspense fallback={<PageFallback />}><BatchConvertPage /></Suspense> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
];

const router = createBrowserRouter(routes);

export default function App() {
  return <RouterProvider router={router} />;
}
