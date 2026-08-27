import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';

function setMetaContent(selector: string, value: string) {
  const el = document.querySelector(selector);
  if (el) el.setAttribute('content', value);
}

export default function NotFoundPage() {
  const { t, withLang } = useLanguage();
  const p = t.notFound;

  useEffect(() => {
    document.title = p.meta.title;
    setMetaContent('meta[name="description"]', p.meta.description);
    setMetaContent('meta[name="robots"]', 'noindex, follow');
    return () => {
      setMetaContent('meta[name="robots"]', 'index, follow');
    };
  }, [p.meta.title, p.meta.description]);

  return (
    <section className="notfound-page">
      <div className="notfound-inner">
        <div className="logo">IA</div>
        <p className="notfound-code">404</p>
        <h1>{p.heading}</h1>
        <p className="notfound-desc">{p.desc}</p>
        <Link className="btn btn-primary" to={withLang('/')}>
          ← {p.cta}
        </Link>
      </div>
    </section>
  );
}
