import { Link } from 'react-router-dom';
import DetailHeader from '../components/DetailHeader';
import { useLanguage } from '../i18n/LanguageContext';
import { usePageMeta } from '../hooks/usePageMeta';

const stack = ['NestJS', 'Next.js (App Router)', 'n8n', 'Ollama', 'SQLite', 'Docker', 'Coolify'];

export default function ChatIaPage() {
  const { t } = useLanguage();
  const p = t.chatIaPage;
  usePageMeta(p.meta, '/chat-ia');

  return (
    <section className="detail-page">
      <div className="section-inner">
        <DetailHeader icon="fa-comment-dots" iconClass="chatbot" title={p.title}>
          {p.intro}
        </DetailHeader>

        <div className="detail-body">
          <div className="detail-block">
            <p className="detail-block-title">
              <i className="fa-solid fa-route" />
              {p.archTitle}
            </p>
            <div className="detail-flow">
              <div className="detail-flow-step">
                <span className="detail-flow-index">1</span>
                <p>
                  <strong>{p.step1.title}</strong>
                  {p.step1.body}
                </p>
              </div>
              <div className="detail-flow-step">
                <span className="detail-flow-index">2</span>
                <p>
                  <strong>{p.step2.title}</strong>
                  {p.step2.before} <Link to="/n8n">n8n</Link> {p.step2.after}
                </p>
              </div>
              <div className="detail-flow-step">
                <span className="detail-flow-index">3</span>
                <p>
                  <strong>{p.step3.title}</strong>
                  {p.step3.body}
                </p>
              </div>
            </div>
          </div>

          <div className="detail-block">
            <p className="detail-block-title">
              <i className="fa-solid fa-layer-group" />
              {p.stackTitle}
            </p>
            <div className="detail-tags">
              {stack.map((tech) => (
                <span key={tech} className="timeline-chip">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="detail-block">
            <p className="detail-block-title">
              <i className="fa-solid fa-rocket" />
              {p.deployTitle}
            </p>
            <p>
              {p.deployBefore}
              <code>docker-compose.yml</code>
              {p.deployAfter}
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
              <Link to="/desarrollo-ia">
                <span className="detail-cross-icon">
                  <i className="fa-solid fa-code" />
                </span>
                <span>{p.crossDevAi}</span>
              </Link>
            </div>
          </div>

          <div className="detail-links">
            <a
              className="btn btn-primary"
              href="https://chat.nestordevelop.online"
              target="_blank"
              rel="noopener noreferrer"
            >
              {p.ctaLive}
              <i className="fa-solid fa-arrow-up-right-from-square" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
