import { createContext, useCallback, useContext, useEffect, useMemo } from 'react';
import type { ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import type { Lang } from './types';
import { es } from './es';
import { en } from './en';

const dictionaries = { es, en };

function langFromPath(pathname: string): Lang {
  return pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'es';
}

/** Path for `bare` (an es-language path, e.g. "/n8n") in the given language. */
function pathForLang(targetLang: Lang, bare: string): string {
  if (targetLang === 'es') return bare;
  return bare === '/' ? '/en' : `/en${bare}`;
}

type LanguageContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  /** Prefixes an es-language path (e.g. "/n8n") with /en when the current language is English. */
  withLang: (path: string) => string;
  t: (typeof dictionaries)['es'];
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: Readonly<{ children: ReactNode }>) {
  const location = useLocation();
  const navigate = useNavigate();
  const lang = langFromPath(location.pathname);

  useEffect(() => {
    document.documentElement.lang = lang;
    document
      .querySelector('meta[property="og:locale"]')
      ?.setAttribute('content', lang === 'en' ? 'en_US' : 'es_CO');
  }, [lang]);

  const withLang = useCallback((path: string) => pathForLang(lang, path), [lang]);

  const setLang = useCallback(
    (next: Lang) => {
      if (next === lang) return;
      const bare = location.pathname.replace(/^\/en/, '') || '/';
      navigate(`${pathForLang(next, bare)}${location.hash}`);
    },
    [lang, location.pathname, location.hash, navigate],
  );

  const value = useMemo<LanguageContextValue>(
    () => ({ lang, setLang, withLang, t: dictionaries[lang] }),
    [lang, setLang, withLang],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider');
  return ctx;
}
