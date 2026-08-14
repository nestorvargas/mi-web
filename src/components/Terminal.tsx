import { useEffect, useRef, useState } from 'react';
import type { KeyboardEvent, ReactNode } from 'react';
import { useReveal } from '../hooks/useReveal';
import { experience } from '../data/experience';
import { capabilities, skills as SKILLS } from '../data/capabilities';

const SECTIONS: Record<string, string> = {
  hero: 'hero',
  servicios: 'servicios',
  stack: 'stack',
  portfolio: 'portfolio',
  'sobre-mi': 'sobre-mi',
};

const PROJECTS = capabilities;

const HELP_LINES = [
  ['whoami', 'Quién soy'],
  ['skills', 'Habilidades técnicas'],
  ['projects', 'En qué trabajo'],
  ['experience', 'Experiencia laboral'],
  ['contact', 'Cómo contactarme'],
  ['scroll <sección>', 'Navegar a una sección de la web'],
  ['clear', 'Limpiar la terminal'],
  ['help', 'Mostrar esta ayuda'],
];

type Line = { id: number; prompt?: string; content: ReactNode };

function Whoami() {
  return (
    <>
      <p>Nestor Vargas — Desarrollador Backend / Full Stack Senior, +10 años de experiencia.</p>
      <p>
        Especialista en PHP (Drupal, Laravel), con también Node.js, Java Spring Boot y Python
        (FastAPI). Este mismo servidor (donde estás parado ahora) es un proyecto personal para
        explorar IA self-hosted de punta a punta: Docker, Ollama y n8n corriendo en un servidor
        propio.
      </p>
      <p className="term-muted">Escriba "help" para ver más comandos.</p>
    </>
  );
}

function Skills() {
  return <p>{SKILLS.join('  ·  ')}</p>;
}

function Projects() {
  return (
    <>
      <p>Soy Desarrollador Full Stack. Estos son los pilares en los que trabajo:</p>
      {PROJECTS.map((p, i) => (
        <p key={p.title}>
          <span className="term-accent">{String(i + 1).padStart(2, '0')}.</span> <strong>{p.title}</strong>{' '}
          — {p.desc}
        </p>
      ))}
    </>
  );
}

function Experience() {
  return (
    <>
      <p>Experiencia laboral (más reciente primero):</p>
      {experience.map((job) => (
        <p key={job.company}>
          <span className="term-accent">{job.period.padEnd(20, ' ')}</span>
          <strong>{job.company}</strong> — {job.role}
          <br />
          <span className="term-muted">&nbsp;&nbsp;&nbsp;&nbsp;{job.stack.join(', ')}</span>
        </p>
      ))}
    </>
  );
}

function Contact() {
  return (
    <>
      <p>
        <span className="term-muted">LinkedIn </span>
        <a href="https://linkedin.com/in/nestorfabian92" target="_blank" rel="noopener noreferrer">
          linkedin.com/in/nestorfabian92
        </a>
      </p>
      <p>
        <span className="term-muted">GitHub  </span>
        <a href="https://github.com/nestorvargas" target="_blank" rel="noopener noreferrer">
          github.com/nestorvargas
        </a>
      </p>
    </>
  );
}

function Help() {
  return (
    <>
      <p>Comandos disponibles:</p>
      {HELP_LINES.map(([cmd, desc]) => (
        <p key={cmd}>
          <span className="term-accent">{cmd.padEnd(16, ' ')}</span>
          {desc}
        </p>
      ))}
    </>
  );
}

const WELCOME: Line[] = [
  { id: -2, content: <p>Bienvenido — consola interactiva sobre mi perfil.</p> },
  { id: -1, content: <p>Escriba "help" para ver los comandos disponibles.</p> },
];

export default function Terminal() {
  const { ref, visible } = useReveal<HTMLElement>();
  const [lines, setLines] = useState<Line[]>(WELCOME);
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
        content = <Whoami />;
        break;
      case 'skills':
        content = <Skills />;
        break;
      case 'projects':
        content = <Projects />;
        break;
      case 'experience':
        content = <Experience />;
        break;
      case 'contact':
        content = <Contact />;
        break;
      case 'help':
        content = <Help />;
        break;
      case 'clear':
        setLines([]);
        return;
      case 'scroll':
        if (!arg) {
          content = (
            <p>
              Uso: scroll &lt;sección&gt; — disponibles: {Object.keys(SECTIONS).join(', ')}
            </p>
          );
        } else if (SECTIONS[arg]) {
          document.getElementById(SECTIONS[arg])?.scrollIntoView({ behavior: 'smooth' });
          content = <p>Navegando a "{arg}"...</p>;
        } else {
          content = <p>scroll: sección "{arg}" no encontrada</p>;
        }
        break;
      default:
        content = <p>bash: {name}: command not found</p>;
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
        <span className="eyebrow">Consola</span>
        <h2>Probar mi CV en vivo</h2>
        <p className="section-desc">Escriba comandos para explorar mi perfil, en formato terminal.</p>

        <div className="term-window">
          <div className="term-titlebar">
            <span className="term-dot term-dot-red" />
            <span className="term-dot term-dot-yellow" />
            <span className="term-dot term-dot-green" />
            <span className="term-titletext">cliente@server: ~</span>
          </div>
          <div className="term-body" ref={bodyRef}>
            {lines.map((line) => (
              <div key={line.id} className="term-line">
                {line.prompt !== undefined && (
                  <p className="term-cmd">
                    <span className="term-prompt">cliente@server:~$</span> {line.prompt}
                  </p>
                )}
                {line.content}
              </div>
            ))}
            <div className="term-inputrow">
              <span className="term-prompt">cliente@server:~$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                autoComplete="off"
                autoCapitalize="off"
                spellCheck={false}
                aria-label="Comando de la consola"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
