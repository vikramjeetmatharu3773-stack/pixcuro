import { SITE, TOOL_BY_PATH } from '../lib/site';
import { usePageMeta } from '../lib/usePageMeta';
import { EditorPage } from '../components/EditorPage';

const TOOL = TOOL_BY_PATH['/background-changer'];

export function BackgroundChangerPage() {
  usePageMeta({
    title: TOOL?.title,
    description: TOOL?.description,
    path: '/background-changer',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: TOOL?.title,
      url: `${SITE.url}/background-changer`,
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
      defaultMode="solid"
      defaultColor="#ffffff"
      defaultFormat="image/png"
    />
  );
}
