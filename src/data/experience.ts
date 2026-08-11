export type Job = {
  company: string;
  role: string;
  period: string;
  current?: boolean;
  stack: string[];
};

export const experience: Job[] = [
  {
    company: 'Complemento 360',
    role: 'Desarrollador Full Stack',
    period: 'Nov 2022 — Actual',
    current: true,
    stack: ['PHP', 'Node.js', 'Drupal', 'Laravel', 'MySQL', 'Redis', 'Docker', 'Azure DevOps'],
  },
  {
    company: 'Estrenar Vivienda',
    role: 'Líder de Desarrollo — PHP',
    period: 'Nov 2021 — Nov 2022',
    stack: ['PHP', 'Drupal', 'Laravel', 'MySQL', 'Redis', 'GitLab CI/CD', 'Docker'],
  },
  {
    company: 'Ariadna Communications Group',
    role: 'Desarrollador Drupal',
    period: 'Jun 2021 — Nov 2021',
    stack: ['PHP', 'Drupal API', 'Tailwind', 'Bootstrap', 'MySQL', 'PostgreSQL'],
  },
  {
    company: 'ESinergia',
    role: 'Desarrollador Drupal',
    period: 'Sep 2020 — Jun 2021',
    stack: ['PHP', 'Drupal API', 'MySQL', 'Redis', 'Docker (DDEV)'],
  },
  {
    company: 'Invima',
    role: 'Desarrollador Full Stack',
    period: 'Ago 2017 — Sep 2021',
    stack: ['PHP', 'Drupal', 'Laravel', 'Java', 'MySQL', 'Redis'],
  },
  {
    company: 'Indexcol',
    role: 'Desarrollador Drupal',
    period: 'Ago 2017 — Sep 2021',
    stack: ['PHP', 'Drupal API', 'MySQL', 'PostgreSQL'],
  },
  {
    company: 'Tecsua SAS',
    role: 'Desarrollador Full Stack, Soporte',
    period: 'Mar 2014 — Jul 2017',
    stack: ['PHP', 'Drupal', 'MySQL', 'PostgreSQL'],
  },
];
