import { Link } from 'react-router-dom';
import DetailHeader from '../components/DetailHeader';
import { useLanguage } from '../i18n/LanguageContext';

export default function DesarrolloIaPage() {
  const { t } = useLanguage();
  const p = t.devAiPage;

  return (
    <section className="detail-page">
      <div className="section-inner">
        <DetailHeader icon="fa-wand-magic-sparkles" iconClass="devai" title={p.title}>
          {p.intro}
        </DetailHeader>

        <div className="detail-body">
          <div className="detail-block">
            <p className="detail-block-title">
              <i className="fa-solid fa-code" />
              {p.codeTitle}
            </p>
            <p>{p.codeBody}</p>
          </div>

          <div className="detail-block">
            <p className="detail-block-title">
              <i className="fa-solid fa-server" />
              {p.modelsTitle}
            </p>
            <p>{p.modelsBody}</p>
          </div>

          <div className="detail-block">
            <p className="detail-block-title">
              <i className="fa-solid fa-diagram-project" />
              {p.pipelineTitle}
            </p>
            <p>
              <Link to="/n8n">n8n</Link> {p.pipelineBefore}{' '}
              <Link to="/chat-ia">{t.chatIaPage.title}</Link>
              {p.pipelineAfter}
            </p>
          </div>

          <div className="detail-block">
            <p className="detail-block-title">
              <i className="fa-solid fa-diagram-project" />
              {p.hereTitle}
            </p>
            <div className="detail-cross">
              <Link to="/n8n">
                <span className="detail-cross-icon">
                  <i className="fa-solid fa-diagram-project" />
                </span>
                <span>{p.crossN8n}</span>
              </Link>
              <Link to="/chat-ia">
                <span className="detail-cross-icon">
                  <i className="fa-solid fa-comment-dots" />
                </span>
                <span>{p.crossChatIa}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
