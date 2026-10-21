export type SupportedLocale = 'en' | 'id' | 'de' | 'es' | 'it' | 'pt' | 'ja';

export interface LocaleEntry {
  code: SupportedLocale;
  label: string;
  flag: string;
}

export const SUPPORTED_LOCALES: LocaleEntry[] = [
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'id', label: 'Indonesia', flag: '🇮🇩' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'it', label: 'Italiano', flag: '🇮🇹' },
  { code: 'pt', label: 'Português', flag: '🇧🇷' },
  { code: 'ja', label: '日本語', flag: '🇯🇵' },
];

export interface ToolI18nMapping {
  toolId: string;
  paths: Partial<Record<SupportedLocale, string>>; // langCode -> relative path with trailing slash
}

export const I18N_TOOL_MATRIX: ToolI18nMapping[] = [
  {
    toolId: 'compress-image-to-100kb',
    paths: {
      en: '/compress-image-to-100kb/',
      id: '/id/kompres-foto-100kb/',
    },
  },
  {
    toolId: 'compress-image-to-200kb',
    paths: {
      en: '/compress-image-to-200kb/',
      id: '/id/kompres-foto-200kb/',
    },
  },
  {
    toolId: 'pdf-redact',
    paths: {
      en: '/redact-pdf-online/',
      de: '/de/pdf-schwaerzen/',
    },
  },
  {
    toolId: 'p7m-to-pdf-it',
    paths: {
      it: '/it/convertire-p7m-in-pdf/',
    },
  },
  {
    toolId: 'split-pdf-size-pt',
    paths: {
      pt: '/pt/dividir-pdf-por-tamanho/',
    },
  },
  {
    toolId: 'id-masking-ja',
    paths: {
      ja: '/ja/hokensho-masking/',
    },
  },
];

/**
 * Returns alternate hreflang links for a given normalized path.
 * Only returns alternates for pages that are explicitly registered in the matrix.
 */
export function getHreflangsForPath(pathname: string): Record<string, string> | null {
  const cleanPath = pathname.replace(/\/+$/, '') + '/';
  
  for (const entry of I18N_TOOL_MATRIX) {
    const matchingLang = Object.entries(entry.paths).find(([_, path]) => path === cleanPath);
    if (matchingLang) {
      const alternates: Record<string, string> = {};
      for (const [lang, path] of Object.entries(entry.paths)) {
        if (path) alternates[lang] = path;
      }
      alternates['x-default'] = entry.paths['en'] || cleanPath;
      return alternates;
    }
  }
  return null;
}
