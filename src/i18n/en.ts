import type { Dictionary } from './types';

export const en: Dictionary = {
  home: {
    meta: {
      title: 'Nestor Vargas — Full Stack Developer | Web Portals & Apps',
      description:
        'Full Stack developer with 10+ years of experience. Building web portals, custom applications, and AI automation — end to end: frontend, backend, and deployment.',
    },
  },
  nav: {
    brand: 'Full Stack Web Developer - AI',
    services: 'Services',
    stack: 'Stack',
    portfolio: 'Portfolio',
    console: 'Console',
    about: 'About me',
  },
  hero: {
    title: 'Full Stack Web Developer - AI — Nestor Vargas',
    subtitle:
      'Building web applications with modern, practical technologies, integrating artificial intelligence into digital products',
    ctaChat: 'Try the chat',
    ctaServices: 'See services',
    scrollAria: 'Scroll down to the services section',
    stats: {
      years: '10+',
      yearsLabel: 'Years of experience',
      projects: '20+',
      projectsLabel: 'Projects delivered',
      role: 'Full Stack',
      roleLabel: 'Backend / Full Stack Senior',
    },
  },
  services: {
    eyebrow: 'Services',
    title: 'What runs on the server',
    desc: 'Three connected pieces: chat, automation, and orchestration of local AI models.',
    chatIa: {
      title: 'Chat AI',
      desc: 'A chat app of my own, connected to the bot via n8n with a knowledge base.',
    },
    n8n: {
      title: 'n8n',
      desc: 'Orchestrates the bot, the RAG pipeline, and the AI agents. How I build those flows, end to end.',
    },
    devai: {
      title: 'How I build with AI',
      desc: 'Code assistants, self-hosted models, and automation: how I fold AI into my day-to-day workflow.',
    },
  },
  stack: {
    eyebrow: 'Tech stack',
    title: 'What runs under the hood',
    desc: 'Building software with modern, practical technologies.',
  },
  portfolio: {
    eyebrow: 'Portfolio',
    title: 'What I do',
    desc: 'Senior Backend / Full Stack developer with 10+ years of experience. This very server is a live sample of how I work: my own infrastructure, hardened and deployed end to end.',
    capabilities: {
      'web-apps': {
        title: 'Web app development',
        desc: 'Corporate sites, admin/management portals, and custom web applications — frontend, backend, database, and deployment, end to end.',
      },
      architecture: {
        title: 'Backend / Full Stack architecture',
        desc: 'REST APIs with PHP (Drupal, Laravel), Node.js and Java Spring Boot, SQL and NoSQL databases, all connected end-to-end.',
      },
      security: {
        title: 'Security & hardening',
        desc: 'TLS, security headers (HSTS, X-Frame-Options), hiding server version banners, least-privilege firewall rules and access control.',
      },
      cicd: {
        title: 'CI/CD & deploys',
        desc: 'Deployments with Docker and Coolify, GitHub integration, reproducible environments from code to production.',
      },
      'ai-automation': {
        title: 'AI automation',
        desc: 'Workflows with n8n, agents connected to local models (Ollama), and RAG over a knowledge base I built myself.',
      },
      'ai-dev': {
        title: 'Building with AI',
        desc: 'AI tooling built into my daily workflow, to speed up development, debugging, and code review without losing control of the architecture.',
      },
    },
    experienceHeading: 'Work experience',
    current: 'Current',
    jobs: {
      complemento360: { role: 'Full Stack Developer', period: 'Nov 2022 — Present' },
      'estrenar-vivienda': { role: 'Development Lead — PHP', period: 'Nov 2021 — Nov 2022' },
      ariadna: { role: 'Drupal Developer', period: 'Jun 2021 — Nov 2021' },
      esinergia: { role: 'Drupal Developer', period: 'Sep 2020 — Jun 2021' },
      invima: { role: 'Full Stack Developer', period: 'Aug 2017 — Sep 2021' },
      indexcol: { role: 'Drupal Developer', period: 'Aug 2017 — Sep 2021' },
      tecsua: { role: 'Full Stack Developer, Support', period: 'Mar 2014 — Jul 2017' },
    },
  },
  terminal: {
    eyebrow: 'Console',
    title: 'Try my résumé live',
    desc: 'Type commands to explore my profile, terminal-style.',
    windowTitle: 'client@server: ~',
    prompt: 'client@server:~$',
    inputAria: 'Console command',
    welcome: [
      'Welcome — an interactive console over my profile.',
      'Type "help" to see the available commands.',
    ],
    help: [
      { cmd: 'whoami', desc: 'Who I am' },
      { cmd: 'skills', desc: 'Technical skills' },
      { cmd: 'projects', desc: 'What I work on' },
      { cmd: 'experience', desc: 'Work experience' },
      { cmd: 'contact', desc: 'How to reach me' },
      { cmd: 'scroll <section>', desc: 'Jump to a section of the site' },
      { cmd: 'clear', desc: 'Clear the terminal' },
      { cmd: 'help', desc: 'Show this help' },
    ],
    whoami: {
      p1: 'Nestor Vargas — Senior Backend / Full Stack Developer, +10 years of experience.',
      p2: 'Specialized in PHP (Drupal, Laravel), also working with Node.js, Java Spring Boot, and Python (FastAPI). This very server (where you\'re standing right now) is a personal project to explore self-hosted AI end to end: Docker, Ollama, and n8n running on my own hardware.',
      hint: 'Type "help" to see more commands.',
    },
    projectsIntro: "I'm a Full Stack Developer. These are the pillars I work on:",
    experienceIntro: 'Work experience (most recent first):',
    contactLinkedIn: 'LinkedIn',
    contactGitHub: 'GitHub',
    helpIntro: 'Available commands:',
    scrollUsage: 'Usage: scroll <section> — available:',
    scrollNavigating: 'Navigating to',
    scrollNotFound: 'section not found',
    notFound: 'command not found',
  },
  aboutMe: {
    eyebrow: 'About me',
    title: 'Who built all this',
    desc: 'Senior Backend / Full Stack developer with 10+ years of experience, behind this self-hosted AI server.',
    role: 'Full Stack Developer',
    bio: 'Senior Backend / Full Stack developer with 10+ years of experience. Specialized in PHP (Drupal, Laravel), also working with Node.js, Java Spring Boot, and Python (FastAPI). This server is a personal project to explore self-hosted AI end to end.',
    skillsTitle: 'Skills',
  },
  footer: {
    copyright: '© {year} Nestor Vargas. All rights reserved.',
    backToTop: 'Back to top',
  },
  detail: {
    back: 'Back to home',
  },
  n8nPage: {
    meta: {
      title: 'How I build with n8n — Nestor Vargas',
      description:
        "n8n is this self-hosted AI server's orchestration layer: it connects the chatbot, the RAG pipeline, and the Ollama models without a custom backend per integration.",
    },
    title: 'How I build with n8n',
    intro:
      "n8n is this server's orchestration layer: it connects the chatbot, the RAG pipeline, and the Ollama models without writing a custom backend for every integration.",
    flowTitle: 'Typical flow',
    steps: [
      {
        title: 'Incoming webhook',
        body: "Chat AI's backend calls a token-authenticated n8n webhook, passing the user's message.",
      },
      {
        title: 'RAG lookup',
        body: "n8n embeds the message with Ollama and looks up relevant context in an in-memory vector store, seeded from my own knowledge base.",
      },
      {
        title: 'AI agent',
        body: 'An AI Agent node builds the final prompt with that context and sends it to the Ollama chat model running on the same server.',
      },
      {
        title: 'Response',
        body: 'n8n returns the response to the backend, which logs it and forwards it to the frontend.',
      },
    ],
    whyTitle: 'Why n8n',
    whyBody:
      "It's the piece that lets me iterate fast on the AI logic without touching application code: changing a prompt, adding a context source, or chaining a new model is rearranging nodes, not redeploying a service. And since it runs on the same server as Ollama, data never leaves to an external API.",
    note: "n8n is only reachable inside my private network (Tailscale) — that's why this page documents the flow instead of linking straight to the instance.",
    hereTitle: 'On this server',
    crossChatIa: 'See the final product: Chat AI',
    crossDevAi: 'How I build with AI in general',
  },
  chatIaPage: {
    meta: {
      title: 'Chat AI — Nestor Vargas',
      description:
        'A chat app of my own, a NestJS + Next.js monorepo, connected to the n8n pipeline with a knowledge base (RAG) over Ollama models.',
    },
    title: 'Chat AI',
    intro:
      'A chat app of my own, a NestJS + Next.js monorepo, connected to the n8n pipeline with a knowledge base (RAG) over Ollama models.',
    archTitle: 'Architecture',
    step1: {
      title: 'Frontend (Next.js)',
      body: "The chat widget sends the user's message to POST /chat on the backend.",
    },
    step2: {
      title: 'Backend (NestJS)',
      before: 'Forwards the message to the',
      after: 'webhook, authenticated with its own token, and logs every request/response in SQLite (success or error).',
    },
    step3: {
      title: 'RAG + Ollama',
      body: 'n8n resolves the context and generates the response with the local chat model.',
    },
    stackTitle: 'Stack',
    deployTitle: 'Deployment',
    deployBefore: 'Frontend and backend live in a single Coolify resource (',
    deployAfter:
      '), deployed directly on the server. The backend URL is baked into the frontend build, so changing it takes a rebuild, not just a container restart.',
    hereTitle: 'On this server',
    crossN8n: 'How I build with n8n',
    crossDevAi: 'How I build with AI in general',
    ctaLive: 'Open the live chat',
  },
  devAiPage: {
    meta: {
      title: 'How I build with AI — Nestor Vargas',
      description:
        'Code assistants, self-hosted models with Ollama, and automation with n8n: how I fold AI into my daily workflow without losing control of the architecture.',
    },
    title: 'How I build with AI',
    intro:
      "AI isn't just this server's product — it's part of how I build it day to day, from architecture to code to debugging.",
    codeTitle: 'Code assistants',
    codeBody:
      "I use AI agents (Claude Code) built into my daily workflow to plan changes, generate code, and review diffs before merging. AI speeds up the writing, but I still make the architecture, security, and trade-off calls myself — I review every change as if I'd written it by hand.",
    modelsTitle: 'My own models',
    modelsBody:
      'This same server runs Ollama self-hosted, which lets me prototype and test ideas with local models without depending on an external API or exposing sensitive data outside my network.',
    pipelineTitle: 'From model to product',
    pipelineBefore:
      'connects those models to real logic (RAG, agents, webhooks) without every experiment turning into a new microservice. The result of that chain — local model + orchestration + product — is',
    pipelineMiddle: '',
    pipelineAfter: ', the chatbot running on this site.',
    hereTitle: 'On this server',
    crossN8n: 'How I build with n8n',
    crossChatIa: 'See the final product: Chat AI',
  },
  chatWidget: {
    openAria: 'Open chat',
    closeAria: 'Close chat',
    title: 'Chatbot AI',
    status: 'Online',
    emptyTitle: 'How can I help?',
    emptySubtitle: "Ask about Nestor's experience, or pick an option:",
    suggested: [
      'What projects has Nestor worked on?',
      'Does he have experience with PHP?',
      'What are his skills?',
      'How do I contact him?',
    ],
    inputLabel: 'Message for the chatbot',
    placeholder: 'Type your message...',
    sendAria: 'Send',
    errorMessage: 'There was a connection error. Please try again in a moment.',
  },
};
