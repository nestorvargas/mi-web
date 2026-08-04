import { useEffect, useRef, useState } from 'react';
import type { ChangeEvent, FormEvent, KeyboardEvent } from 'react';

const API_URL = 'https://server-ia.tail30c2a0.ts.net:10000/api/chat';

type Message = { role: 'user' | 'assistant'; content: string };

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

  async function sendMessage() {
    const text = input.trim();
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
        { role: 'assistant', content: 'Uy, hubo un error de conexión. Probá de nuevo en un momento.' },
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
        </div>

        <div id="chat-messages" ref={messagesRef}>
          {history.map((m, i) => (
            <div key={i} className={`msg-row ${m.role === 'user' ? 'user' : 'bot'}`}>
              <div className={`msg-avatar ${m.role === 'user' ? 'user' : 'bot'}`}>
                {m.role === 'user' ? '' : 'IA'}
              </div>
              <div className="msg-bubble">{m.content}</div>
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
            placeholder="Escribí tu mensaje..."
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
