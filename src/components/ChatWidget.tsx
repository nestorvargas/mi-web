import { Fragment, useEffect, useRef, useState } from 'react';
import type { ChangeEvent, CSSProperties, FormEvent, KeyboardEvent, ReactNode } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import BotAtDesk from './BotAtDesk';
import BotMascot from './BotMascot';
import { useRoaming } from '../hooks/useRoaming';

const API_URL = 'https://chat.nestordevelop.online/api/chat';

const MOBILE_QUERY = '(max-width: 640px)';

// Auto-focusing the input pops the mobile keyboard immediately and the
// browser scrolls/zooms to keep it in view, which hides the header and
// message list right as the panel opens — it stops looking like a chat
// window and looks like a zoomed-in text field. Skip autofocus on mobile;
// desktop keeps it since there's no keyboard/zoom to fight there.
function isMobileViewport() {
  return typeof window !== 'undefined' && window.matchMedia(MOBILE_QUERY).matches;
}

// crypto.randomUUID() requires a secure context (HTTPS or localhost) and throws
// otherwise; getRandomValues() has no such restriction and works over plain HTTP too.
function createId() {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
}

const SESSION_ID_KEY = 'chat_session_id';
const HELP_DISMISSED_KEY = 'chat_help_dismissed';
const HELP_DELAY_MS = 1500;
const HELP_ROTATE_MS = 4500;
// The walking robot shrinks on phones so it doesn't cover half the screen.
const ROAMER_WIDTH = 100;
const ROAMER_WIDTH_MOBILE = 76;

function getOrCreateSessionId(): string {
  const stored = window.localStorage.getItem(SESSION_ID_KEY);
  if (stored) return stored;
  const id = createId();
  window.localStorage.setItem(SESSION_ID_KEY, id);
  return id;
}

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
  const { t } = useLanguage();
  const [history, setHistory] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const sessionIdRef = useRef<string>('');
  const [mobile, setMobile] = useState(isMobileViewport);
  useEffect(() => {
    const mq = window.matchMedia(MOBILE_QUERY);
    const onChange = () => setMobile(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  const roamerWidth = mobile ? ROAMER_WIDTH_MOBILE : ROAMER_WIDTH;
  const roamer = useRoaming(!isOpen, roamerWidth);
  const [helpVisible, setHelpVisible] = useState(false);
  const [helpIndex, setHelpIndex] = useState(0);
  const [helpDismissed, setHelpDismissed] = useState(
    () => window.sessionStorage.getItem(HELP_DISMISSED_KEY) === '1',
  );

  // Floating "I can help" bubble next to the launcher: shows shortly after
  // load and cycles through hints until the visitor opens the chat or closes it.
  useEffect(() => {
    if (helpDismissed) return;
    const show = window.setTimeout(() => setHelpVisible(true), HELP_DELAY_MS);
    const rotate = window.setInterval(
      () => setHelpIndex((i) => (i + 1) % t.chatWidget.helpBubble.length),
      HELP_ROTATE_MS,
    );
    return () => {
      window.clearTimeout(show);
      window.clearInterval(rotate);
    };
  }, [helpDismissed, t.chatWidget.helpBubble.length]);

  function dismissHelp() {
    setHelpDismissed(true);
    window.sessionStorage.setItem(HELP_DISMISSED_KEY, '1');
  }

  function handleToggle() {
    if (!isOpen) dismissHelp();
    onToggle();
  }

  useEffect(() => {
    if (isOpen && !isMobileViewport()) inputRef.current?.focus();
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

    if (!sessionIdRef.current) {
      sessionIdRef.current = getOrCreateSessionId();
    }

    const nextHistory: Message[] = [...history, { role: 'user', content: text }];
    setHistory(nextHistory);
    setInput('');
    if (inputRef.current) inputRef.current.style.height = 'auto';
    setLoading(true);

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: nextHistory, sessionId: sessionIdRef.current }),
      });
      if (!res.ok) throw new Error(`Error ${res.status}`);
      const data = await res.json();
      setHistory((prev) => [...prev, { role: 'assistant', content: data.response ?? '' }]);
    } catch {
      setHistory((prev) => [...prev, { role: 'assistant', content: t.chatWidget.errorMessage }]);
    } finally {
      setLoading(false);
      if (!isMobileViewport()) inputRef.current?.focus();
    }
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    sendMessage();
  }

  // Only while it's wandering around, not mid-prank or while hiding from the visitor.
  const showHelp =
    helpVisible && !helpDismissed && !isOpen && !roamer.aloft && (roamer.pose === 'idle' || roamer.pose === 'walk');

  return (
    <>
      <button
        id="chat-launcher"
        type="button"
        aria-label={isOpen ? t.chatWidget.closeAria : t.chatWidget.openAria}
        className={isOpen ? 'open' : undefined}
        onClick={handleToggle}
      >
        <i className="fa-solid fa-comment-dots icon-chat" />
        <i className="fa-solid fa-xmark icon-close" />
      </button>

      {/* The floor the robot walks on along the bottom of the page */}
      <div className="bot-floor" aria-hidden="true" />

      {!isOpen && (
        <div
          id="chat-roamer"
          ref={roamer.outerRef}
          style={{ '--roam-w': `${roamerWidth}px` } as CSSProperties}
          className={[
            `facing-${roamer.facing}`,
            `bubble-${roamer.side === 'left' ? 'right' : 'left'}`,
          ]
            .filter(Boolean)
            .join(' ')}
        >
          <div className="chat-roamer-body" ref={roamer.innerRef}>
            {roamer.pose === 'kick' && (
              <div className="bot-count" key={roamer.count} aria-hidden="true">
                {roamer.count}
              </div>
            )}
            {showHelp && (
              <div id="chat-help-bubble" role="status">
                <button type="button" className="chat-help-text" onClick={handleToggle}>
                  <span key={helpIndex}>{t.chatWidget.helpBubble[helpIndex]}</span>
                </button>
                <button
                  type="button"
                  className="chat-help-dismiss"
                  aria-label={t.chatWidget.dismissHelpAria}
                  onClick={dismissHelp}
                >
                  <i className="fa-solid fa-xmark" />
                </button>
              </div>
            )}
            {/* Purely playful: clicking the robot makes it run off and hide, not open the chat. */}
            <button id="chat-bot" type="button" aria-hidden="true" tabIndex={-1} onClick={roamer.hide}>
              <BotMascot size={roamerWidth * 0.92} pose={roamer.pose} holding={roamer.carrying} />
            </button>
          </div>
        </div>
      )}

      <div id="chat-panel" className={isOpen ? 'open' : undefined}>
        <div className="chat-header">
          <div className="chat-header-bot">
            <BotMascot size={34} compact />
          </div>
          <div>
            <div className="title">{t.chatWidget.title}</div>
            <div className="status">
              <span className="dot" />
              {t.chatWidget.status}
            </div>
          </div>
          <button
            id="chat-header-close"
            type="button"
            aria-label={t.chatWidget.closeAria}
            onClick={onToggle}
          >
            <i className="fa-solid fa-xmark" />
          </button>
        </div>

        <div id="chat-messages" ref={messagesRef}>
          {history.length === 0 && (
            <div id="chat-empty-state">
              <BotAtDesk size={150} busy={loading} className="chat-empty-bot" />
              <p className="chat-empty-title">{t.chatWidget.emptyTitle}</p>
              <p className="chat-empty-subtitle">{t.chatWidget.emptySubtitle}</p>
              <div className="chat-suggested-prompts">
                {t.chatWidget.suggested.map((prompt) => (
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
                {m.role === 'user' ? (
                  <i className="fa-solid fa-user" style={{ fontSize: 11 }} />
                ) : (
                  <BotMascot size={26} compact animated={false} />
                )}
              </div>
              <div className="msg-bubble">{m.role === 'user' ? m.content : renderMarkdown(m.content)}</div>
            </div>
          ))}
          {loading && (
            <div className="msg-row bot chat-typing-row">
              <BotAtDesk size={76} busy />
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
            {t.chatWidget.inputLabel}
          </label>
          <textarea
            id="chat-input"
            ref={inputRef}
            rows={1}
            placeholder={t.chatWidget.placeholder}
            value={input}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            disabled={loading}
          />
          <button id="chat-send" type="submit" aria-label={t.chatWidget.sendAria} disabled={loading || !input.trim()}>
            <i className="fa-solid fa-paper-plane" style={{ fontSize: 14 }} />
          </button>
        </form>
      </div>
    </>
  );
}
