import { Link } from 'react-router-dom';
import DetailHeader from '../components/DetailHeader';
import { useLanguage } from '../i18n/LanguageContext';

export default function N8nPage() {
  const { t } = useLanguage();
  const p = t.n8nPage;

  return (
    <section className="detail-page">
      <div className="section-inner">
        <DetailHeader icon="fa-diagram-project" iconClass="n8n" title={p.title}>
          {p.intro}
        </DetailHeader>

        <div className="detail-body">
          <div className="detail-block">
            <p className="detail-block-title">
              <i className="fa-solid fa-route" />
              {p.flowTitle}
            </p>
            <div className="detail-flow">
              {p.steps.map((step, i) => (
                <div className="detail-flow-step" key={step.title}>
                  <span className="detail-flow-index">{i + 1}</span>
                  <p>
                    <strong>{step.title}</strong>
                    {step.body}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="detail-block">
            <p className="detail-block-title">
              <i className="fa-solid fa-wand-magic-sparkles" />
              {p.whyTitle}
            </p>
            <p>{p.whyBody}</p>
          </div>

          <div className="detail-note">
            <i className="fa-solid fa-lock" />
            <span>{p.note}</span>
          </div>

          <div className="detail-block">
            <p className="detail-block-title">
              <i className="fa-solid fa-diagram-project" />
              {p.hereTitle}
            </p>
            <div className="detail-cross">
              <Link to="/chat-ia">
                <span className="detail-cross-icon">
                  <i className="fa-solid fa-comment-dots" />
                </span>
                <span>{p.crossChatIa}</span>
              </Link>
              <Link to="/desarrollo-ia">
                <span className="detail-cross-icon">
                  <i className="fa-solid fa-code" />
                </span>
                <span>{p.crossDevAi}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
