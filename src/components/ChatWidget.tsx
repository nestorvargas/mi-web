import { Fragment, useEffect, useRef, useState } from 'react';
import type { ChangeEvent, FormEvent, KeyboardEvent, ReactNode } from 'react';

const API_URL = 'https://chat.nestordevelop.online/api/chat';

const SUGGESTED_PROMPTS = [
  '¿Qué proyectos hizo Nestor?',
  '¿Tiene experiencia con PHP?',
  '¿Cuáles son sus skills?',
  '¿Cómo lo contacto?',
];

type Message = { role: 'user' | 'assistant'; content: string };

// Minimal markdown renderer for what the model actually produces: **bold**,
// "- " / "1. " lists, and paragraphs. Avoids pulling in react-markdown for
// this narrow subset.
function renderInline(text: string): ReactNode[] {
  const pattern = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g;
  return text.split(pattern).map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    const link = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(part);
    if (link) {
      return (
        <a key={i} href={link[2]} target="_blank" rel="noopener noreferrer">
          {link[1]}
        </a>
      );
    }
    return <Fragment key={i}>{part}</Fragment>;
  });
}

function renderMarkdown(text: string): ReactNode[] {
  const lines = text.split('\n');
  const blocks: ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    if (/^\s*[-*]\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\s*[-*]\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\s*[-*]\s+/, ''));
        i++;
      }
      blocks.push(
        <ul key={blocks.length}>
          {items.map((it, idx) => (
            <li key={idx}>{renderInline(it)}</li>
          ))}
        </ul>,
      );
      continue;
    }
    if (/^\s*\d+\.\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\s*\d+\.\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\s*\d+\.\s+/, ''));
        i++;
      }
      blocks.push(
        <ol key={blocks.length}>
          {items.map((it, idx) => (
            <li key={idx}>{renderInline(it)}</li>
          ))}
        </ol>,
      );
      continue;
    }
    if (line.trim() === '') {
      i++;
      continue;
    }
    const paraLines: string[] = [];
    while (i < lines.length && lines[i].trim() !== '' && !/^\s*[-*]\s+/.test(lines[i]) && !/^\s*\d+\.\s+/.test(lines[i])) {
      paraLines.push(lines[i]);
      i++;
    }
    blocks.push(
      <p key={blocks.length}>
        {paraLines.map((pl, idx) => (
          <Fragment key={idx}>
            {idx > 0 && <br />}
            {renderInline(pl)}
          </Fragment>
        ))}
      </p>,
    );
  }

  return blocks;
}

type Props = {
  isOpen: boolean;
  onToggle: () => void;
};

export default function ChatWidget({ isOpen, onToggle }: Props) {
  const [history, setHistory] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [history, loading]);

  function handleInput(e: ChangeEvent<HTMLTextAreaElement>) {
    setInput(e.target.value);
    const el = e.target;
    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight}px`;
  }

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  async function sendMessage(overrideText?: string) {
    const text = overrideText ?? input.trim();
    if (!text || loading) return;

    const nextHistory: Message[] = [...history, { role: 'user', content: text }];
    setHistory(nextHistory);
    setInput('');
    if (inputRef.current) inputRef.current.style.height = 'auto';
    setLoading(true);

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: nextHistory }),
      });
      if (!res.ok) throw new Error(`Error ${res.status}`);
      const data = await res.json();
      setHistory((prev) => [...prev, { role: 'assistant', content: data.response ?? '' }]);
    } catch {
      setHistory((prev) => [
        ...prev,
        { role: 'assistant', content: 'Hubo un error de conexión. Intente de nuevo en un momento.' },
      ]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    sendMessage();
  }

  return (
    <>
      <button
        id="chat-launcher"
        type="button"
        aria-label={isOpen ? 'Cerrar chat' : 'Abrir chat'}
        className={isOpen ? 'open' : undefined}
        onClick={onToggle}
      >
        <i className="fa-solid fa-comment-dots icon-chat" />
        <i className="fa-solid fa-xmark icon-close" />
      </button>

      <div id="chat-panel" className={isOpen ? 'open' : undefined}>
        <div className="chat-header">
          <div className="logo">IA</div>
          <div>
            <div className="title">Chatbot IA</div>
            <div className="status">
              <span className="dot" />
              En línea
            </div>
          </div>
          <button
            id="chat-header-close"
            type="button"
            aria-label="Cerrar chat"
            onClick={onToggle}
          >
            <i className="fa-solid fa-xmark" />
          </button>
        </div>

        <div id="chat-messages" ref={messagesRef}>
          {history.length === 0 && (
            <div id="chat-empty-state">
              <div className="chat-empty-icon">IA</div>
              <p className="chat-empty-title">¿En qué le puedo ayudar?</p>
              <p className="chat-empty-subtitle">Pregunte sobre la experiencia de Nestor, o elija una opción:</p>
              <div className="chat-suggested-prompts">
                {SUGGESTED_PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    className="chat-prompt-chip"
                    onClick={() => sendMessage(prompt)}
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          )}
          {history.map((m, i) => (
            <div key={i} className={`msg-row ${m.role === 'user' ? 'user' : 'bot'}`}>
              <div className={`msg-avatar ${m.role === 'user' ? 'user' : 'bot'}`}>
                {m.role === 'user' ? '' : 'IA'}
              </div>
              <div className="msg-bubble">{m.role === 'user' ? m.content : renderMarkdown(m.content)}</div>
            </div>
          ))}
          {loading && (
            <div className="msg-row bot">
              <div className="msg-avatar bot">IA</div>
              <div className="msg-bubble">
                <div className="typing-dots">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            </div>
          )}
        </div>

        <form id="chat-form" onSubmit={handleSubmit}>
          <label
            htmlFor="chat-input"
            style={{
              position: 'absolute',
              width: 1,
              height: 1,
              overflow: 'hidden',
              clip: 'rect(0,0,0,0)',
              whiteSpace: 'nowrap',
            }}
          >
            Mensaje para el chatbot
          </label>
          <textarea
            id="chat-input"
            ref={inputRef}
            rows={1}
            placeholder="Escriba su mensaje..."
            value={input}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            disabled={loading}
          />
          <button id="chat-send" type="submit" aria-label="Enviar" disabled={loading || !input.trim()}>
            <i className="fa-solid fa-paper-plane" style={{ fontSize: 14 }} />
          </button>
        </form>
      </div>
    </>
  );
}
