import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import type { PageMeta } from '../i18n/types';
import { PAGE_PATHS, type PageKey } from '../i18n/routes';

const SITE_URL = 'https://nestordevelop.online';

function setMetaContent(selector: string, value: string) {
  const el = document.querySelector(selector);
  if (!el) return;
  el.setAttribute(el.tagName === 'LINK' ? 'href' : 'content', value);
}

function upsertAlternateLink(hreflang: string, href: string) {
  let el = document.querySelector<HTMLLinkElement>(`link[rel="alternate"][hreflang="${hreflang}"]`);
  if (!el) {
    el = document.createElement('link');
    el.rel = 'alternate';
    el.setAttribute('hreflang', hreflang);
    document.head.appendChild(el);
  }
  el.href = href;
}

export function usePageMeta(meta: PageMeta, pageKey: PageKey) {
  const location = useLocation();
  const paths = PAGE_PATHS[pageKey];
  const lang = location.pathname === paths.en || location.pathname.startsWith(`${paths.en}/`) ? 'en' : 'es';
  const currentPath = paths[lang];

  useEffect(() => {
    document.title = meta.title;
    const url = `${SITE_URL}${currentPath}`;

    setMetaContent('meta[name="description"]', meta.description);
    setMetaContent('link[rel="canonical"]', url);
    setMetaContent('meta[property="og:url"]', url);
    setMetaContent('meta[property="og:title"]', meta.title);
    setMetaContent('meta[property="og:description"]', meta.description);
    setMetaContent('meta[name="twitter:title"]', meta.title);
    setMetaContent('meta[name="twitter:description"]', meta.description);

    upsertAlternateLink('es', `${SITE_URL}${paths.es}`);
    upsertAlternateLink('en', `${SITE_URL}${paths.en}`);
    upsertAlternateLink('x-default', `${SITE_URL}${paths.es}`);
  }, [meta.title, meta.description, currentPath, paths.es, paths.en]);
}
