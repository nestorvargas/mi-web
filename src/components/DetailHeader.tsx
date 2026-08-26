import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';
import { useLanguage } from '../i18n/LanguageContext';

type Props = {
  icon: string;
  iconClass: string;
  title: string;
  children: ReactNode;
};

export default function DetailHeader({ icon, iconClass, title, children }: Readonly<Props>) {
  const { t, withLang } = useLanguage();

  return (
    <div className="detail-header">
      <Link className="detail-back" to={withLang('/')}>
        <i className="fa-solid fa-arrow-left" />
        {t.detail.back}
      </Link>
      <div className={`detail-icon ${iconClass}`}>
        <i className={`fa-solid ${icon}`} />
      </div>
      <h1>{title}</h1>
      <p className="detail-intro">{children}</p>
    </div>
  );
}
