export type Job = {
  id: string;
  company: string;
  current?: boolean;
  stack: string[];
};

export const experience: Job[] = [
  {
    id: 'complemento360',
    company: 'Complemento 360',
    current: true,
    stack: ['PHP', 'Node.js', 'Drupal', 'Laravel', 'MySQL', 'Redis', 'Docker', 'Azure DevOps'],
  },
  {
    id: 'estrenar-vivienda',
    company: 'Estrenar Vivienda',
    stack: ['PHP', 'Drupal', 'Laravel', 'MySQL', 'Redis', 'GitLab CI/CD', 'Docker'],
  },
  {
    id: 'ariadna',
    company: 'Ariadna Communications Group',
    stack: ['PHP', 'Drupal API', 'Tailwind', 'Bootstrap', 'MySQL', 'PostgreSQL'],
  },
  {
    id: 'esinergia',
    company: 'ESinergia',
    stack: ['PHP', 'Drupal API', 'MySQL', 'Redis', 'Docker (DDEV)'],
  },
  {
    id: 'invima',
    company: 'Invima',
    stack: ['PHP', 'Drupal', 'Laravel', 'Java', 'MySQL', 'Redis'],
  },
  {
    id: 'indexcol',
    company: 'Indexcol',
    stack: ['PHP', 'Drupal API', 'MySQL', 'PostgreSQL'],
  },
  {
    id: 'tecsua',
    company: 'Tecsua SAS',
    stack: ['PHP', 'Drupal', 'MySQL', 'PostgreSQL'],
  },
];
