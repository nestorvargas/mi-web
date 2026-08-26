export type Capability = {
  id: string;
  icon: string;
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
  { id: 'web-apps', icon: 'fa-globe' },
  { id: 'architecture', icon: 'fa-layer-group' },
  { id: 'security', icon: 'fa-lock' },
  { id: 'cicd', icon: 'fa-rocket' },
  { id: 'ai-automation', icon: 'fa-robot' },
  { id: 'ai-dev', icon: 'fa-wand-magic-sparkles' },
];
