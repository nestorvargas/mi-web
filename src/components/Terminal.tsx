import { useEffect, useRef, useState } from 'react';
import type { KeyboardEvent, ReactNode } from 'react';
import { useReveal } from '../hooks/useReveal';
import { experience } from '../data/experience';
import { capabilities, skills as SKILLS } from '../data/capabilities';
import { useLanguage } from '../i18n/LanguageContext';
import type { Dictionary } from '../i18n/types';

const SECTIONS: Record<string, string> = {
  hero: 'hero',
  servicios: 'servicios',
  stack: 'stack',
  portfolio: 'portfolio',
  'sobre-mi': 'sobre-mi',
};

type Line = { id: number; prompt?: string; content: ReactNode };

function Whoami({ t }: { t: Dictionary }) {
  return (
    <>
      <p>{t.terminal.whoami.p1}</p>
      <p>{t.terminal.whoami.p2}</p>
      <p className="term-muted">{t.terminal.whoami.hint}</p>
    </>
  );
}

function Skills() {
  return <p>{SKILLS.join('  ·  ')}</p>;
}

function Projects({ t }: { t: Dictionary }) {
  return (
    <>
      <p>{t.terminal.projectsIntro}</p>
      {capabilities.map((p, i) => {
        const copy = t.portfolio.capabilities[p.id];
        return (
          <p key={p.id}>
            <span className="term-accent">{String(i + 1).padStart(2, '0')}.</span> <strong>{copy.title}</strong>{' '}
            — {copy.desc}
          </p>
        );
      })}
    </>
  );
}

function Experience({ t }: { t: Dictionary }) {
  return (
    <>
      <p>{t.terminal.experienceIntro}</p>
      {experience.map((job) => {
        const copy = t.portfolio.jobs[job.id];
        return (
          <p key={job.id}>
            <span className="term-accent">{copy.period.padEnd(20, ' ')}</span>
            <strong>{job.company}</strong> — {copy.role}
            <br />
            <span className="term-muted">&nbsp;&nbsp;&nbsp;&nbsp;{job.stack.join(', ')}</span>
          </p>
        );
      })}
    </>
  );
}

function Contact({ t }: { t: Dictionary }) {
  return (
    <>
      <p>
        <span className="term-muted">{t.terminal.contactLinkedIn} </span>
        <a href="https://linkedin.com/in/nestorfabian92" target="_blank" rel="noopener noreferrer">
          linkedin.com/in/nestorfabian92
        </a>
      </p>
      <p>
        <span className="term-muted">{t.terminal.contactGitHub} </span>
        <a href="https://github.com/nestorvargas" target="_blank" rel="noopener noreferrer">
          github.com/nestorvargas
        </a>
      </p>
    </>
  );
}

function Help({ t }: { t: Dictionary }) {
  return (
    <>
      <p>{t.terminal.helpIntro}</p>
      {t.terminal.help.map(({ cmd, desc }) => (
        <p key={cmd}>
          <span className="term-accent">{cmd.padEnd(16, ' ')}</span>
          {desc}
        </p>
      ))}
    </>
  );
}

export default function Terminal() {
  const { ref, visible } = useReveal<HTMLElement>();
  const { t } = useLanguage();
  const [lines, setLines] = useState<Line[]>(() =>
    t.terminal.welcome.map((text, i) => ({ id: -(i + 1), content: <p>{text}</p> })),
  );
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const nextId = useRef(0);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: 'smooth' });
  }, [lines]);

  function run(raw: string) {
    const cmd = raw.trim();
    const [name, ...rest] = cmd.split(/\s+/);
    const arg = rest.join(' ');

    if (cmd === '') {
      setLines((prev) => [...prev, { id: nextId.current++, prompt: raw, content: null }]);
      return;
    }

    let content: ReactNode;
    switch (name) {
      case 'whoami':
        content = <Whoami t={t} />;
        break;
      case 'skills':
        content = <Skills />;
        break;
      case 'projects':
        content = <Projects t={t} />;
        break;
      case 'experience':
        content = <Experience t={t} />;
        break;
      case 'contact':
        content = <Contact t={t} />;
        break;
      case 'help':
        content = <Help t={t} />;
        break;
      case 'clear':
        setLines([]);
        return;
      case 'scroll':
        if (!arg) {
          content = (
            <p>
              {t.terminal.scrollUsage} {Object.keys(SECTIONS).join(', ')}
            </p>
          );
        } else if (SECTIONS[arg]) {
          document.getElementById(SECTIONS[arg])?.scrollIntoView({ behavior: 'smooth' });
          content = (
            <p>
              {t.terminal.scrollNavigating} "{arg}"...
            </p>
          );
        } else {
          content = (
            <p>
              scroll: "{arg}" {t.terminal.scrollNotFound}
            </p>
          );
        }
        break;
      default:
        content = (
          <p>
            bash: {name}: {t.terminal.notFound}
          </p>
        );
    }

    setLines((prev) => [...prev, { id: nextId.current++, prompt: raw, content }]);
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      run(input);
      if (input.trim() !== '') setHistory((prev) => [...prev, input]);
      setInput('');
      setHistoryIndex(null);
      return;
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length === 0) return;
      const nextIndex = historyIndex === null ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInput(history[nextIndex]);
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex === null) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex >= history.length) {
        setHistoryIndex(null);
        setInput('');
      } else {
        setHistoryIndex(nextIndex);
        setInput(history[nextIndex]);
      }
    }
  }

  return (
    <section id="terminal" ref={ref} className={`reveal ${visible ? 'visible' : ''}`}>
      <div className="section-inner">
        <span className="eyebrow">{t.terminal.eyebrow}</span>
        <h2>{t.terminal.title}</h2>
        <p className="section-desc">{t.terminal.desc}</p>

        <div className="term-window">
          <div className="term-titlebar">
            <span className="term-dot term-dot-red" />
            <span className="term-dot term-dot-yellow" />
            <span className="term-dot term-dot-green" />
            <span className="term-titletext">{t.terminal.windowTitle}</span>
          </div>
          <div className="term-body" ref={bodyRef}>
            {lines.map((line) => (
              <div key={line.id} className="term-line">
                {line.prompt !== undefined && (
                  <p className="term-cmd">
                    <span className="term-prompt">{t.terminal.prompt}</span> {line.prompt}
                  </p>
                )}
                {line.content}
              </div>
            ))}
            <div className="term-inputrow">
              <span className="term-prompt">{t.terminal.windowTitle.replace(' ', '')}$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                autoComplete="off"
                autoCapitalize="off"
                spellCheck={false}
                aria-label={t.terminal.inputAria}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
