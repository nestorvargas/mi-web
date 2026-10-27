// Client-side pre-check for the chat widget: the bot only answers plain
// questions, so code, markup and commands are stopped before they're sent.
// The real enforcement is server-side, in chatbot_ia's
// backend/src/chat/code-guard.ts — keep the two pattern lists in sync.

export const MAX_MESSAGE_LENGTH = 500;

const CODE_PATTERNS: RegExp[] = [
  /```/, // markdown code fences
  /<\s*\/?\s*[a-z!?][^>]*>/i, // HTML/XML tags, <!-- -->, <?php
  /<\?|\?>/, // PHP / XML processing instructions
  /\b(javascript|vbscript)\s*:/i,
  /\bdata\s*:\s*[a-z]+\/[a-z+.-]+[;,]/i, // data: URLs
  /\bon[a-z]+\s*=\s*["'`]?\s*[\w(]/i, // inline event handlers (onerror=...)
  /\b(union\s+(all\s+)?select|select\s+[\w*,\s.]+\s+from|insert\s+into|drop\s+(table|database)|delete\s+from|update\s+\w+\s+set|truncate\s+table)\b/i,
  /['"]\s*(or|and)\s+['"]?\w+['"]?\s*=\s*['"]?\w+/i, // ' OR 1=1
  /;\s*--|\/\*[\s\S]*?\*\//, // SQL / block comments
  /\$\(|\$\{|`[^`\n]+`/, // shell/template substitution, inline code
  /\b(rm\s+-rf|sudo\s+\w|chmod\s+\d|curl\s+(-|https?:)|wget\s+https?:|bash\s+-c|powershell|cmd\.exe)\b/i,
  /\b(function\s*\w*\s*\(|console\.\w+\(|import\s+[\w{*]|require\s*\(|eval\s*\(|exec\s*\(|def\s+\w+\s*\(|#include\b|public\s+static\b|System\.out\b)/,
  /=>\s*[{(]/, // arrow functions
];

// Punctuation that's rare in a normal question but everywhere in code.
const CODE_CHARS = /[{}<>;=$`|\\[\]]/g;

export function looksLikeCode(text: string): boolean {
  if (CODE_PATTERNS.some((pattern) => pattern.test(text))) return true;
  return (text.match(CODE_CHARS)?.length ?? 0) >= 6;
}

// Links in the bot's replies: only web, email and phone links become <a>;
// anything else (javascript:, data:, ...) is shown as plain text.
export function isSafeHref(href: string): boolean {
  return /^(https?:\/\/|mailto:|tel:)/i.test(href.trim());
}
