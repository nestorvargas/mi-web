export type Capability = {
  icon: string;
  title: string;
  desc: string;
};

export const skills = [
  'PHP',
  'Drupal',
  'Laravel',
  'Node.js',
  'Java Spring Boot',
  'Python',
  'FastAPI',
  'MySQL',
  'PostgreSQL',
  'Redis',
  'MongoDB',
  'Docker',
  'CI/CD',
  'Linux',
  'n8n',
];

export const capabilities: Capability[] = [
  {
    icon: 'fa-globe',
    title: 'Desarrollo de apps web',
    desc: 'Sitios corporativos, portales de gestión/administración, y aplicaciones web a medida — frontend, backend, base de datos y despliegue de punta a punta.',
  },
  {
    icon: 'fa-layer-group',
    title: 'Arquitectura Backend / Full Stack',
    desc: 'APIs REST con PHP (Drupal, Laravel), Node.js y Java Spring Boot, bases de datos SQL y NoSQL, todo conectado end-to-end.',
  },
  {
    icon: 'fa-lock',
    title: 'Seguridad & hardening',
    desc: 'TLS, headers de seguridad (HSTS, X-Frame-Options), ocultamiento de versión de servidor, principio de menor privilegio en firewall y accesos.',
  },
  {
    icon: 'fa-rocket',
    title: 'CI/CD & deploys',
    desc: 'Despliegues con Docker y Coolify, integración con GitHub, entornos reproducibles de código a producción.',
  },
  {
    icon: 'fa-robot',
    title: 'Automatización con IA',
    desc: 'Workflows con n8n, agentes conectados a modelos locales (Ollama) y RAG con base de conocimiento propia.',
  },
  {
    icon: 'fa-wand-magic-sparkles',
    title: 'Desarrollo con IA',
    desc: 'Herramientas de IA integradas al flujo de trabajo diario, para acelerar desarrollo, debugging y code review sin perder control sobre la arquitectura.',
  },
];
