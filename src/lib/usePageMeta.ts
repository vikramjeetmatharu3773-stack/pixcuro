import { useEffect } from 'react';
import { SITE } from './site';

interface MetaOptions {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  type?: 'website' | 'article';
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  noindex?: boolean;
}

function setMeta(name: string, content: string, attr: 'name' | 'property' = 'name') {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

function removeExistingJsonLd(id: string) {
  const existing = document.getElementById(id);
  if (existing) existing.remove();
}

function setJsonLd(id: string, data: Record<string, unknown> | Record<string, unknown>[]) {
  removeExistingJsonLd(id);
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.id = id;
  script.text = JSON.stringify(data);
  document.head.appendChild(script);
}

/**
 * Set page-specific SEO metadata (title, meta, OG, Twitter, canonical, JSON-LD).
 * Mounts via useEffect; cleans up by restoring the default title when unmounted.
 */
export function usePageMeta({
  title,
  description,
  path,
  image,
  type = 'website',
  jsonLd,
  noindex = false,
}: MetaOptions) {
  useEffect(() => {
    const fullTitle = title ? `${title} — ${SITE.name}` : `${SITE.name} — ${SITE.tagline}`;
    document.title = fullTitle;
    const desc = description ?? SITE.description;
    const url = `${SITE.url}${path ?? ''}`;
    const img = image ? (image.startsWith('http') ? image : `${SITE.url}${image}`) : `${SITE.url}${SITE.ogImage}`;

    setMeta('description', desc);
    setMeta('robots', noindex ? 'noindex,nofollow' : 'index,follow,max-image-preview:large');
    setLink('canonical', url);

    setMeta('og:title', fullTitle, 'property');
    setMeta('og:description', desc, 'property');
    setMeta('og:url', url, 'property');
    setMeta('og:image', img, 'property');
    setMeta('og:type', type, 'property');

    setMeta('twitter:title', fullTitle);
    setMeta('twitter:description', desc);
    setMeta('twitter:image', img);

    if (jsonLd) {
      setJsonLd('page-jsonld', jsonLd);
    }
  }, [title, description, path, image, type, jsonLd, noindex]);
}

export function clearJsonLd(id: string) {
  removeExistingJsonLd(id);
}
