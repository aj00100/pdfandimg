export interface LocaleEntry {
  code: string;
  label: string;
  flag: string;
}

export const SUPPORTED_LOCALES: LocaleEntry[] = [
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'id', label: 'Indonesia', flag: '🇮🇩' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
];

export interface ToolI18nMapping {
  toolId: string;
  paths: Record<string, string>; // langCode -> relative path with trailing slash
}

export const I18N_TOOL_MATRIX: ToolI18nMapping[] = [
  {
    toolId: 'compress-image-to-100kb',
    paths: {
      en: '/compress-image-to-100kb/',
      id: '/id/kompres-foto-100kb/',
      de: '/de/bild-komprimieren-100kb/',
      es: '/es/comprimir-imagen-100kb/',
    },
  },
  {
    toolId: 'compress-image-to-200kb',
    paths: {
      en: '/compress-image-to-200kb/',
      id: '/id/kompres-foto-200kb/',
      de: '/de/bild-komprimieren-200kb/',
      es: '/es/comprimir-imagen-200kb/',
    },
  },
  {
    toolId: 'compress-pdf-to-100kb',
    paths: {
      en: '/compress-pdf-to-100kb/',
      id: '/id/kompres-pdf-100kb/',
      de: '/de/pdf-komprimieren-100kb/',
      es: '/es/comprimir-pdf-100kb/',
    },
  },
  {
    toolId: 'convert-heic-to-jpg',
    paths: {
      en: '/convert-heic-to-jpg/',
      id: '/id/konversi-heic-ke-jpg/',
      de: '/de/heic-in-jpg-umwandeln/',
      es: '/es/convertir-heic-a-jpg/',
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
        alternates[lang] = path;
      }
      alternates['x-default'] = entry.paths['en'] || cleanPath;
      return alternates;
    }
  }
  return null;
}
