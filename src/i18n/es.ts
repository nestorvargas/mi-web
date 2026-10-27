import type { Dictionary } from './types';

export const es: Dictionary = {
  home: {
    meta: {
      title: 'Nestor Vargas — Desarrollador Full Stack | Portales y Apps Web',
      description:
        'Desarrollador Full Stack con +10 años de experiencia. Desarrollo portales web, aplicaciones a medida y automatización con IA — de punta a punta: frontend, backend y despliegue.',
    },
  },
  nav: {
    brand: 'Desarrollador Web Full Stack - IA',
    services: 'Servicios',
    stack: 'Stack',
    portfolio: 'Portfolio',
    console: 'Consola',
    about: 'Sobre mí',
  },
  hero: {
    title: 'Desarrollador Web Full Stack - IA Nestor Vargas',
    subtitle:
      'Desarrollo de aplicaciones web con tecnologías modernas y prácticas, integrando inteligencia artificial en soluciones digitales',
    ctaChat: 'Probar el chat',
    ctaServices: 'Ver servicios',
    scrollAria: 'Bajar a la sección de servicios',
    stats: {
      years: '10+',
      yearsLabel: 'Años de experiencia',
      projects: '20+',
      projectsLabel: 'Proyectos entregados',
      role: 'Full Stack',
      roleLabel: 'Backend / Full Stack Senior',
    },
  },
  services: {
    eyebrow: 'Servicios',
    title: 'Lo que corre en el servidor',
    desc: 'Tres piezas conectadas: chat, automatización y orquestación de modelos de IA locales.',
    chatIa: {
      title: 'Chat IA',
      desc: 'Aplicación de chat propia, conectada al bot vía n8n con base de conocimiento.',
    },
    n8n: {
      title: 'n8n',
      desc: 'Orquesta el bot, el RAG y los agentes de IA. Cómo armo esos flujos, de punta a punta.',
    },
    devai: {
      title: 'Cómo desarrollo con IA',
      desc: 'Asistentes de código, modelos self-hosted y automatización: así integro IA a mi flujo de trabajo.',
    },
  },
  stack: {
    eyebrow: 'Stack tecnológico',
    title: 'Qué corre atrás',
    desc: 'Desarrollo de software con tecnologías modernas y prácticas.',
  },
  portfolio: {
    eyebrow: 'Portfolio',
    title: 'Qué hago',
    desc: 'Desarrollador Backend / Full Stack Senior con más de 10 años de experiencia. Este mismo servidor es una muestra en vivo de cómo trabajo: infraestructura propia, hardenizada y desplegada de punta a punta.',
    capabilities: {
      'web-apps': {
        title: 'Desarrollo de apps web',
        desc: 'Sitios corporativos, portales de gestión/administración, y aplicaciones web a medida — frontend, backend, base de datos y despliegue de punta a punta.',
      },
      architecture: {
        title: 'Arquitectura Backend / Full Stack',
        desc: 'APIs REST con PHP (Drupal, Laravel), Node.js y Java Spring Boot, bases de datos SQL y NoSQL, todo conectado end-to-end.',
      },
      security: {
        title: 'Seguridad & hardening',
        desc: 'TLS, headers de seguridad (HSTS, X-Frame-Options), ocultamiento de versión de servidor, principio de menor privilegio en firewall y accesos.',
      },
      cicd: {
        title: 'CI/CD & deploys',
        desc: 'Despliegues con Docker y Coolify, integración con GitHub, entornos reproducibles de código a producción.',
      },
      'ai-automation': {
        title: 'Automatización con IA',
        desc: 'Workflows con n8n, agentes conectados a modelos locales (Ollama) y RAG con base de conocimiento propia.',
      },
      'ai-dev': {
        title: 'Desarrollo con IA',
        desc: 'Herramientas de IA integradas al flujo de trabajo diario, para acelerar desarrollo, debugging y code review sin perder control sobre la arquitectura.',
      },
    },
    experienceHeading: 'Experiencia laboral',
    current: 'Actual',
    jobs: {
      complemento360: { role: 'Desarrollador Full Stack', period: 'Nov 2022 — Actual' },
      'estrenar-vivienda': { role: 'Líder de Desarrollo — PHP', period: 'Nov 2021 — Nov 2022' },
      ariadna: { role: 'Desarrollador Drupal', period: 'Jun 2021 — Nov 2021' },
      esinergia: { role: 'Desarrollador Drupal', period: 'Sep 2020 — Jun 2021' },
      invima: { role: 'Desarrollador Full Stack', period: 'Ago 2017 — Sep 2021' },
      indexcol: { role: 'Desarrollador Drupal', period: 'Ago 2017 — Sep 2021' },
      tecsua: { role: 'Desarrollador Full Stack, Soporte', period: 'Mar 2014 — Jul 2017' },
    },
  },
  terminal: {
    eyebrow: 'Consola',
    title: 'Probar mi CV en vivo',
    desc: 'Escriba comandos para explorar mi perfil, en formato terminal.',
    windowTitle: 'cliente@server: ~',
    prompt: 'cliente@server:~$',
    inputAria: 'Comando de la consola',
    welcome: [
      'Bienvenido — consola interactiva sobre mi perfil.',
      'Escriba "help" para ver los comandos disponibles.',
    ],
    help: [
      { cmd: 'whoami', desc: 'Quién soy' },
      { cmd: 'skills', desc: 'Habilidades técnicas' },
      { cmd: 'projects', desc: 'En qué trabajo' },
      { cmd: 'experience', desc: 'Experiencia laboral' },
      { cmd: 'contact', desc: 'Cómo contactarme' },
      { cmd: 'scroll <sección>', desc: 'Navegar a una sección de la web' },
      { cmd: 'clear', desc: 'Limpiar la terminal' },
      { cmd: 'help', desc: 'Mostrar esta ayuda' },
    ],
    whoami: {
      p1: 'Nestor Vargas — Desarrollador Backend / Full Stack Senior, +10 años de experiencia.',
      p2: 'Especialista en PHP (Drupal, Laravel), con también Node.js, Java Spring Boot y Python (FastAPI). Este mismo servidor (donde estás parado ahora) es un proyecto personal para explorar IA self-hosted de punta a punta: Docker, Ollama y n8n corriendo en un servidor propio.',
      hint: 'Escriba "help" para ver más comandos.',
    },
    projectsIntro: 'Soy Desarrollador Full Stack. Estos son los pilares en los que trabajo:',
    experienceIntro: 'Experiencia laboral (más reciente primero):',
    contactLinkedIn: 'LinkedIn',
    contactGitHub: 'GitHub',
    helpIntro: 'Comandos disponibles:',
    scrollUsage: 'Uso: scroll <sección> — disponibles:',
    scrollNavigating: 'Navegando a',
    scrollNotFound: 'sección no encontrada',
    notFound: 'command not found',
  },
  aboutMe: {
    eyebrow: 'Sobre mí',
    title: 'Quién armó todo esto',
    desc: 'Backend / Full Stack Senior con más de 10 años de experiencia, detrás de este servidor de IA self-hosted.',
    role: 'Desarrollador Fullstack',
    bio: 'Desarrollador Backend / Full Stack Senior con más de 10 años de experiencia. Especialista en PHP (Drupal, Laravel), con también Node.js, Java Spring Boot y Python (FastAPI). Este servidor es un proyecto personal para explorar IA self-hosted de punta a punta.',
    skillsTitle: 'Habilidades',
  },
  footer: {
    copyright: '© {year} Nestor Vargas. Todos los derechos reservados.',
    backToTop: 'Volver arriba',
  },
  detail: {
    back: 'Volver al inicio',
  },
  n8nPage: {
    meta: {
      title: 'Cómo desarrollo con n8n — Nestor Vargas',
      description:
        'n8n es la capa de orquestación de este servidor de IA self-hosted: conecta el chatbot, el RAG y los modelos de Ollama sin un backend a medida por integración.',
    },
    title: 'Cómo desarrollo con n8n',
    intro:
      'n8n es la capa de orquestación de este servidor: conecta el chatbot, el RAG y los modelos de Ollama sin escribir un backend a medida para cada integración.',
    flowTitle: 'Flujo típico',
    steps: [
      {
        title: 'Webhook de entrada',
        body: 'El backend de Chat IA llama a un webhook de n8n autenticado con token, pasando el mensaje del usuario.',
      },
      {
        title: 'Búsqueda RAG',
        body: 'n8n genera el embedding del mensaje con Ollama y busca contexto relevante en un vector store en memoria, sembrado desde una base de conocimiento propia.',
      },
      {
        title: 'Agente de IA',
        body: 'Un nodo AI Agent arma el prompt final con ese contexto y lo envía al modelo de chat de Ollama que corre en el mismo servidor.',
      },
      {
        title: 'Respuesta',
        body: 'n8n devuelve la respuesta al backend, que la registra y la reenvía al frontend.',
      },
    ],
    whyTitle: 'Por qué n8n',
    whyBody:
      'Es la pieza que me permite iterar rápido sobre la lógica de IA sin tocar código de aplicación: cambiar un prompt, agregar una fuente de contexto o encadenar un nuevo modelo es reordenar nodos, no redeployar un servicio. Y al correr en el mismo servidor que Ollama, los datos nunca salen a una API externa.',
    note: 'n8n solo es accesible dentro de mi red privada (Tailscale) — por eso esta página documenta el flujo en vez de enlazar directo a la instancia.',
    hereTitle: 'En este servidor',
    crossChatIa: 'Ver el producto final: Chat IA',
    crossDevAi: 'Cómo desarrollo con IA en general',
  },
  chatIaPage: {
    meta: {
      title: 'Chat IA — Nestor Vargas',
      description:
        'Aplicación de chat propia, monorepo NestJS + Next.js, conectada al pipeline de n8n con base de conocimiento (RAG) sobre modelos de Ollama.',
    },
    title: 'Chat IA',
    intro:
      'Aplicación de chat propia, monorepo NestJS + Next.js, conectada al pipeline de n8n con base de conocimiento (RAG) sobre modelos de Ollama.',
    archTitle: 'Arquitectura',
    step1: {
      title: 'Frontend (Next.js)',
      body: 'El widget de chat envía el mensaje del usuario a POST /chat en el backend.',
    },
    step2: {
      title: 'Backend (NestJS)',
      before: 'Reenvía el mensaje al webhook de',
      after: ', autenticado con un token propio, y registra cada request/response en SQLite (éxito o error).',
    },
    step3: {
      title: 'RAG + Ollama',
      body: 'n8n resuelve el contexto y genera la respuesta con el modelo de chat local.',
    },
    stackTitle: 'Stack',
    deployTitle: 'Despliegue',
    deployBefore: 'Frontend y backend viven en un mismo recurso de Coolify (',
    deployAfter:
      '), desplegados directamente en el servidor. La URL del backend queda fija en el build del frontend, así que cambiarla implica un rebuild, no solo reiniciar el contenedor.',
    hereTitle: 'En este servidor',
    crossN8n: 'Cómo desarrollo con n8n',
    crossDevAi: 'Cómo desarrollo con IA en general',
    ctaLive: 'Abrir el chat en vivo',
  },
  devAiPage: {
    meta: {
      title: 'Cómo desarrollo con IA — Nestor Vargas',
      description:
        'Asistentes de código, modelos self-hosted con Ollama y automatización con n8n: así integro IA a mi flujo de trabajo diario sin perder control de la arquitectura.',
    },
    title: 'Cómo desarrollo con IA',
    intro:
      'La IA no es solo el producto de este servidor — es parte de cómo lo construyo día a día, desde la arquitectura hasta el código y el debugging.',
    codeTitle: 'Asistentes de código',
    codeBody:
      'Uso agentes de IA (Claude Code) integrados al flujo de trabajo diario para planificar cambios, generar código y revisar diffs antes de mergear. La IA acelera la escritura, pero las decisiones de arquitectura, seguridad y trade-offs las sigo tomando yo — reviso cada cambio como si lo hubiera escrito a mano.',
    modelsTitle: 'Modelos propios',
    modelsBody:
      'Este mismo servidor corre Ollama de forma self-hosted, lo que me deja prototipar y probar ideas con modelos locales sin depender de una API externa ni exponer datos sensibles fuera de mi red.',
    pipelineTitle: 'De modelo a producto',
    pipelineBefore:
      'conecta esos modelos con lógica real (RAG, agentes, webhooks) sin que cada experimento termine siendo un microservicio nuevo. El resultado de esa cadena — modelo local + orquestación + producto — es',
    pipelineMiddle: '',
    pipelineAfter: ', el chatbot que corre en este sitio.',
    hereTitle: 'En este servidor',
    crossN8n: 'Cómo desarrollo con n8n',
    crossChatIa: 'Ver el producto final: Chat IA',
  },
  chatWidget: {
    openAria: 'Abrir chat',
    closeAria: 'Cerrar chat',
    title: 'Chatbot IA',
    status: 'En línea',
    emptyTitle: '¿En qué le puedo ayudar?',
    emptySubtitle: 'Pregunte sobre la experiencia de Nestor, o elija una opción:',
    suggested: [
      '¿Qué proyectos hizo Nestor?',
      '¿Tiene experiencia con PHP?',
      '¿Cuáles son sus skills?',
      '¿Cómo lo contacto?',
    ],
    inputLabel: 'Mensaje para el chatbot',
    placeholder: 'Escriba su mensaje...',
    sendAria: 'Enviar',
    errorMessage: 'Hubo un error de conexión. Intente de nuevo en un momento.',
    codeRejected:
      'Por seguridad no puedo recibir código, etiquetas HTML ni comandos. Escríbame su pregunta con palabras 🙂',
    helpBubble: [
      '¡Hola! 👋 ¿Le ayudo en algo?',
      'Pregúnteme por los proyectos de Nestor',
      '¿Busca un desarrollador? Le cuento todo',
      'Respondo al instante, cuando quiera',
    ],
    dismissHelpAria: 'Ocultar mensaje',
  },
  notFound: {
    meta: {
      title: '404 — Página no encontrada | Nestor Vargas',
      description: 'La página que busca no existe o se movió de lugar.',
    },
    heading: 'Página no encontrada',
    desc: 'La página que busca no existe o se movió de lugar.',
    cta: 'Volver al inicio',
  },
};
