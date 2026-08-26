export type Lang = 'es' | 'en';

export type PageMeta = {
  title: string;
  description: string;
};

export type Dictionary = {
  home: {
    meta: PageMeta;
  };
  nav: {
    brand: string;
    services: string;
    stack: string;
    portfolio: string;
    console: string;
    about: string;
  };
  hero: {
    title: string;
    subtitle: string;
    ctaChat: string;
    ctaServices: string;
    scrollAria: string;
    stats: {
      years: string;
      yearsLabel: string;
      projects: string;
      projectsLabel: string;
      role: string;
      roleLabel: string;
    };
  };
  services: {
    eyebrow: string;
    title: string;
    desc: string;
    chatIa: { title: string; desc: string };
    n8n: { title: string; desc: string };
    devai: { title: string; desc: string };
  };
  stack: {
    eyebrow: string;
    title: string;
    desc: string;
  };
  portfolio: {
    eyebrow: string;
    title: string;
    desc: string;
    capabilities: Record<string, { title: string; desc: string }>;
    experienceHeading: string;
    current: string;
    jobs: Record<string, { role: string; period: string }>;
  };
  terminal: {
    eyebrow: string;
    title: string;
    desc: string;
    windowTitle: string;
    prompt: string;
    inputAria: string;
    welcome: string[];
    help: { cmd: string; desc: string }[];
    whoami: { p1: string; p2: string; hint: string };
    projectsIntro: string;
    experienceIntro: string;
    contactLinkedIn: string;
    contactGitHub: string;
    helpIntro: string;
    scrollUsage: string;
    scrollNavigating: string;
    scrollNotFound: string;
    notFound: string;
  };
  aboutMe: {
    eyebrow: string;
    title: string;
    desc: string;
    role: string;
    bio: string;
    skillsTitle: string;
  };
  footer: {
    copyright: string;
    backToTop: string;
  };
  detail: {
    back: string;
  };
  n8nPage: {
    meta: PageMeta;
    title: string;
    intro: string;
    flowTitle: string;
    steps: { title: string; body: string }[];
    whyTitle: string;
    whyBody: string;
    note: string;
    hereTitle: string;
    crossChatIa: string;
    crossDevAi: string;
  };
  chatIaPage: {
    meta: PageMeta;
    title: string;
    intro: string;
    archTitle: string;
    step1: { title: string; body: string };
    step2: { title: string; before: string; after: string };
    step3: { title: string; body: string };
    stackTitle: string;
    deployTitle: string;
    deployBefore: string;
    deployAfter: string;
    hereTitle: string;
    crossN8n: string;
    crossDevAi: string;
    ctaLive: string;
  };
  devAiPage: {
    meta: PageMeta;
    title: string;
    intro: string;
    codeTitle: string;
    codeBody: string;
    modelsTitle: string;
    modelsBody: string;
    pipelineTitle: string;
    pipelineBefore: string;
    pipelineMiddle: string;
    pipelineAfter: string;
    hereTitle: string;
    crossN8n: string;
    crossChatIa: string;
  };
  chatWidget: {
    openAria: string;
    closeAria: string;
    title: string;
    status: string;
    emptyTitle: string;
    emptySubtitle: string;
    suggested: string[];
    inputLabel: string;
    placeholder: string;
    sendAria: string;
    errorMessage: string;
  };
};
