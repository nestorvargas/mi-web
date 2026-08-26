export const PAGE_PATHS = {
  home: { es: '/', en: '/en' },
  n8n: { es: '/n8n', en: '/en/n8n' },
  chatIa: { es: '/chat-ia', en: '/en/chat-ia' },
  devAi: { es: '/desarrollo-ia', en: '/en/desarrollo-ia' },
} as const;

export type PageKey = keyof typeof PAGE_PATHS;
