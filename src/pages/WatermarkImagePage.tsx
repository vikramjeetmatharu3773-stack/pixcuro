import { SITE, TOOL_BY_PATH } from '../lib/site';
import { usePageMeta } from '../lib/usePageMeta';
import { EditorPage } from '../components/EditorPage';

const TOOL = TOOL_BY_PATH['/watermark-image'];

export function WatermarkImagePage() {
  usePageMeta({
    title: TOOL?.title,
    description: TOOL?.description,
    path: '/watermark-image',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: TOOL?.title,
      url: `${SITE.url}/watermark-image`,
      applicationCategory: 'MultimediaApplication',
      operatingSystem: 'Any',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      description: TOOL?.description,
    },
  });

  return (
    <EditorPage
      title={TOOL!.title}
      intro={TOOL!.intro}
      defaultMode="transparent"
      defaultFormat="image/png"
    />
  );
}
