export type SupportedLocale = 'en' | 'de' | 'it' | 'pt' | 'ja' | 'id' | 'es';

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

export interface LocalizedLink {
  label: string;
  mobileLabel?: string;
  href: string;
  highlight?: boolean;
}

export interface LocaleChrome {
  langCode: SupportedLocale;
  homeLabel: string;
  toolsDropdownLabel: string;
  moreDropdownLabel: string;
  footerTagline: string;
  footerToolsHeading: string;
  footerCompanyHeading: string;
  footerViewAllTools: string;
  footerCopyright: string;
  relatedHeading: string;
  navLinks: LocalizedLink[];
  footerToolLinks: LocalizedLink[];
  companyLinks: LocalizedLink[];
  relatedTools: {
    name: string;
    desc: string;
    href: string;
    badge: string;
  }[];
}

export const i18nChrome: Record<string, LocaleChrome> = {
  en: {
    langCode: 'en',
    homeLabel: 'HOME',
    toolsDropdownLabel: 'Tools ▾',
    moreDropdownLabel: 'More ▾',
    footerTagline: 'Precision image and PDF optimization for professionals. Target any file size with mathematical accuracy—100% locally in your browser.',
    footerToolsHeading: 'Tools',
    footerCompanyHeading: 'Company',
    footerViewAllTools: 'View all tools →',
    footerCopyright: '© 2026 PdfAndImg — All rights reserved',
    relatedHeading: 'Recommended Precision Tools',
    navLinks: [
      { label: 'Exam Resizer', href: '/exam-photo-resizer/', highlight: true },
      { label: 'Converter', href: '/photo-pdf-converter/' },
      { label: 'PDF Tools', href: '/tools/#pdf-tools' },
      { label: 'Crop', href: '/crop-image-online/' },
      { label: 'Compress', href: '/' },
      { label: 'Enhance', href: '/increase-image-size-in-kb/' },
      { label: 'Blog', href: '/blog/' },
    ],
    footerToolLinks: [
      { label: 'Exam Photo Resizer', mobileLabel: 'Exam Resizer', href: '/exam-photo-resizer/', highlight: true },
      { label: 'Reduce Image Size in KB', mobileLabel: 'Reduce KB Size', href: '/reduce-image-size-in-kb/' },
      { label: 'Increase Image Size in KB', mobileLabel: 'Increase KB Size', href: '/increase-image-size-in-kb/' },
      { label: 'Convert PNG to JPG', mobileLabel: 'PNG to JPG', href: '/png-to-jpg/' },
      { label: 'Convert JPG to PDF', mobileLabel: 'JPG to PDF', href: '/jpg-to-pdf/' },
      { label: 'Redact PDF Online', mobileLabel: 'Redact PDF', href: '/redact-pdf-online/' },
      { label: 'Passport Size Photo', mobileLabel: 'Passport Photo', href: '/passport-size-photo/' },
    ],
    companyLinks: [
      { label: 'Guides & Blog', href: '/blog/' },
      { label: 'About Us', href: '/about/' },
      { label: 'Contact Us', href: '/contact/' },
      { label: 'Privacy Policy', href: '/privacy/' },
      { label: 'Terms & Conditions', href: '/terms/' },
    ],
    relatedTools: [
      { name: 'Compress Image to 20KB', desc: 'Exact binary-search compression for portals.', href: '/compress-image-to-20kb/', badge: '20KB' },
      { name: 'Compress Image to 50KB', desc: 'High-clarity photo optimization under 50KB.', href: '/compress-image-to-50kb/', badge: '50KB' },
      { name: 'Compress PDF to 100KB', desc: 'Shrink official PDF documents locally.', href: '/compress-pdf-to-100kb/', badge: 'PDF' },
      { name: 'Redact PDF Online', desc: 'Permanent client-side text layer destruction.', href: '/redact-pdf-online/', badge: 'GDPR' },
      { name: 'Exam Photo Resizer', desc: 'UPSC, SSC, NEET, IBPS & GATE presets.', href: '/exam-photo-resizer/', badge: 'EXAM' },
      { name: 'Convert HEIC to JPG', desc: 'Instant local iPhone photo conversion.', href: '/convert-heic-to-jpg/', badge: 'HEIC' },
    ],
  },

  de: {
    langCode: 'de',
    homeLabel: 'STARTSEITE',
    toolsDropdownLabel: 'Werkzeuge ▾',
    moreDropdownLabel: 'Rechtliches ▾',
    footerTagline: 'DSGVO-konforme PDF- und Bildbearbeitung direkt im Browser. 100 % lokal auf Ihrem Gerät ohne Server-Upload.',
    footerToolsHeading: 'Werkzeuge',
    footerCompanyHeading: 'Rechtliches & Info',
    footerViewAllTools: 'Alle Werkzeuge ansehen →',
    footerCopyright: '© 2026 PdfAndImg — Alle Rechte vorbehalten',
    relatedHeading: 'Weitere DSGVO-konforme Werkzeuge',
    navLinks: [
      { label: 'PDF Schwärzen', href: '/de/pdf-schwaerzen/', highlight: true },
      { label: 'PDF auf 100KB', href: '/compress-pdf-to-100kb/' },
      { label: 'PDF Zusammenfügen', href: '/merge-multiple-pdf-into-one/' },
      { label: 'PDF Seiten Löschen', href: '/remove-pdf-pages/' },
      { label: 'Passfoto Schengen', href: '/schengen-visa-photo-size/' },
    ],
    footerToolLinks: [
      { label: 'PDF Schwärzen (DSGVO)', mobileLabel: 'PDF Schwärzen', href: '/de/pdf-schwaerzen/', highlight: true },
      { label: 'PDF komprimieren (100 KB)', mobileLabel: 'PDF 100 KB', href: '/compress-pdf-to-100kb/' },
      { label: 'PDF Seiten entfernen', mobileLabel: 'PDF Seiten löschen', href: '/remove-pdf-pages/' },
      { label: 'PDF zusammenfügen', mobileLabel: 'PDF verbinden', href: '/merge-multiple-pdf-into-one/' },
      { label: 'HEIC in JPG umwandeln', mobileLabel: 'HEIC zu JPG', href: '/convert-heic-to-jpg/' },
    ],
    companyLinks: [
      { label: 'Über uns', href: '/about/' },
      { label: 'Kontakt', href: '/contact/' },
      { label: 'Datenschutz (DSGVO)', href: '/privacy/' },
      { label: 'Nutzungsbedingungen', href: '/terms/' },
    ],
    relatedTools: [
      { name: 'PDF Schwärzen Online', desc: 'Unwiderrufliche Schwärzung nach DSGVO ohne Upload.', href: '/de/pdf-schwaerzen/', badge: 'DSGVO' },
      { name: 'PDF Seiten entfernen', desc: 'Vertrauliche Seiten lokal im Browser löschen.', href: '/remove-pdf-pages/', badge: 'LOKAL' },
      { name: 'PDF Passwort entfernen', desc: 'Geschützte PDF-Dokumente lokal entsperren.', href: '/unlock-pdf/', badge: 'SCHUTZ' },
      { name: 'HEIC in PDF umwandeln', desc: 'iPhone-Fotos lokal in ein PDF-Dokument konvertieren.', href: '/convert-heic-to-pdf/', badge: 'HEIC' },
    ],
  },

  it: {
    langCode: 'it',
    homeLabel: 'HOME',
    toolsDropdownLabel: 'Strumenti ▾',
    moreDropdownLabel: 'Info & Privacy ▾',
    footerTagline: 'Strumenti PDF e immagini 100% locali nel browser. Nessun caricamento su server esterni, massima tutela della privacy e conformità GDPR.',
    footerToolsHeading: 'Strumenti PDF & File',
    footerCompanyHeading: 'Informazioni Legali',
    footerViewAllTools: 'Tutti gli strumenti →',
    footerCopyright: '© 2026 PdfAndImg — Tutti i diritti riservati',
    relatedHeading: 'Altri Strumenti Sicuri nel Browser',
    navLinks: [
      { label: 'Convertire P7M in PDF', href: '/it/convertire-p7m-in-pdf/', highlight: true },
      { label: 'Unisci PDF', href: '/merge-multiple-pdf-into-one/' },
      { label: 'Comprimi PDF 100KB', href: '/compress-pdf-to-100kb/' },
      { label: 'Sblocca PDF', href: '/unlock-pdf/' },
      { label: 'Oscura PDF', href: '/redact-pdf-online/' },
    ],
    footerToolLinks: [
      { label: 'Convertire P7M in PDF Online', mobileLabel: 'P7M in PDF', href: '/it/convertire-p7m-in-pdf/', highlight: true },
      { label: 'Comprimi PDF a 100 KB', mobileLabel: 'PDF 100 KB', href: '/compress-pdf-to-100kb/' },
      { label: 'Unisci più file PDF', mobileLabel: 'Unisci PDF', href: '/merge-multiple-pdf-into-one/' },
      { label: 'Rimuovi Pagine da PDF', mobileLabel: 'Rimuovi Pagine', href: '/remove-pdf-pages/' },
      { label: 'Converti HEIC in JPG', mobileLabel: 'HEIC in JPG', href: '/convert-heic-to-jpg/' },
    ],
    companyLinks: [
      { label: 'Chi Siamo', href: '/about/' },
      { label: 'Contatti', href: '/contact/' },
      { label: 'Informativa Privacy', href: '/privacy/' },
      { label: 'Termini e Condizioni', href: '/terms/' },
    ],
    relatedTools: [
      { name: 'Convertire P7M in PDF', desc: 'Estrai PDF da file firmati CAdES .p7m e FatturaPA.', href: '/it/convertire-p7m-in-pdf/', badge: 'P7M' },
      { name: 'Sblocca PDF Protetti', desc: 'Rimuovi password e restrizioni di stampa localmente.', href: '/unlock-pdf/', badge: 'PDF' },
      { name: 'Comprimi PDF a 100 KB', desc: 'Riduci il peso dei PDF per invii PEC e portali PA.', href: '/compress-pdf-to-100kb/', badge: '100KB' },
      { name: 'Separa Pagine PDF', desc: 'Estrai singole pagine da documenti PDF nel browser.', href: '/separate-pdf-pages/', badge: 'DIVIDI' },
    ],
  },

  pt: {
    langCode: 'pt',
    homeLabel: 'INÍCIO',
    toolsDropdownLabel: 'Ferramentas ▾',
    moreDropdownLabel: 'Mais ▾',
    footerTagline: 'Processamento de PDF e imagens 100% local no navegador. Sigilo absoluto (LGPD) para advogados, processos judiciais e documentos pessoais.',
    footerToolsHeading: 'Ferramentas PDF',
    footerCompanyHeading: 'Institucional',
    footerViewAllTools: 'Ver todas as ferramentas →',
    footerCopyright: '© 2026 PdfAndImg — Todos os direitos reservados',
    relatedHeading: 'Ferramentas Recomendadas (100% Local)',
    navLinks: [
      { label: 'Dividir PDF por Tamanho', href: '/pt/dividir-pdf-por-tamanho/', highlight: true },
      { label: 'Comprimir PDF 100KB', href: '/compress-pdf-to-100kb/' },
      { label: 'Juntar PDF', href: '/merge-multiple-pdf-into-one/' },
      { label: 'Remover Páginas PDF', href: '/remove-pdf-pages/' },
      { label: 'Desbloquear PDF', href: '/unlock-pdf/' },
    ],
    footerToolLinks: [
      { label: 'Dividir PDF por Tamanho (PJe / e-SAJ)', mobileLabel: 'Dividir PDF', href: '/pt/dividir-pdf-por-tamanho/', highlight: true },
      { label: 'Comprimir PDF para 100 KB', mobileLabel: 'PDF 100 KB', href: '/compress-pdf-to-100kb/' },
      { label: 'Juntar Vários PDFs em Um', mobileLabel: 'Juntar PDF', href: '/merge-multiple-pdf-into-one/' },
      { label: 'Remover Páginas de PDF', mobileLabel: 'Excluir Páginas', href: '/remove-pdf-pages/' },
      { label: 'Converter JPG para PDF', mobileLabel: 'JPG para PDF', href: '/jpg-to-pdf/' },
    ],
    companyLinks: [
      { label: 'Sobre Nós', href: '/about/' },
      { label: 'Contato', href: '/contact/' },
      { label: 'Política de Privacidade (LGPD)', href: '/privacy/' },
      { label: 'Termos de Uso', href: '/terms/' },
    ],
    relatedTools: [
      { name: 'Dividir PDF por Tamanho', desc: 'Fracionamento automático em lotes para PJe, e-SAJ e PROJUDI.', href: '/pt/dividir-pdf-por-tamanho/', badge: 'PJe / e-SAJ' },
      { name: 'Comprimir PDF para 200 KB', desc: 'Reduza o tamanho de petições e anexos sem upload.', href: '/compress-pdf-to-200kb/', badge: '200KB' },
      { name: 'Remover Páginas de PDF', desc: 'Exclua páginas em branco ou sigilosas no navegador.', href: '/remove-pdf-pages/', badge: 'PDF' },
      { name: 'Desbloquear PDF', desc: 'Remova restrições de assinatura e senha localmente.', href: '/unlock-pdf/', badge: 'SENHA' },
    ],
  },

  ja: {
    langCode: 'ja',
    homeLabel: 'ホーム',
    toolsDropdownLabel: 'ツール一覧 ▾',
    moreDropdownLabel: '詳細情報 ▾',
    footerTagline: 'サーバー送信ゼロ・完全ブラウザ内完結の画像・PDF処理ツール。本人確認書類や機密文書を安全に加工できます。',
    footerToolsHeading: '主要ツール',
    footerCompanyHeading: '運営・規約',
    footerViewAllTools: 'すべてのツールを見る →',
    footerCopyright: '© 2026 PdfAndImg — All rights reserved',
    relatedHeading: '関連するプライバシー保護ツール',
    navLinks: [
      { label: '保険証・マイナンバー黒塗り', href: '/ja/hokensho-masking/', highlight: true },
      { label: 'PDF黒塗り (墨消し)', href: '/redact-pdf-online/' },
      { label: '画像圧縮 (100KB)', href: '/compress-image-to-100kb/' },
      { label: 'HEICをJPGに変換', href: '/convert-heic-to-jpg/' },
      { label: 'PDFロック解除', href: '/unlock-pdf/' },
    ],
    footerToolLinks: [
      { label: '保険証・マイナンバー黒塗りツール', mobileLabel: '保険証マスキング', href: '/ja/hokensho-masking/', highlight: true },
      { label: 'PDF黒塗り・墨消しツール', mobileLabel: 'PDF黒塗り', href: '/redact-pdf-online/' },
      { label: '画像を100KB以下に圧縮', mobileLabel: '100KB画像圧縮', href: '/compress-image-to-100kb/' },
      { label: 'iPhoneのHEIC写真をJPG変換', mobileLabel: 'HEIC→JPG変換', href: '/convert-heic-to-jpg/' },
      { label: 'PDFパスワード解除', mobileLabel: 'PDFロック解除', href: '/unlock-pdf/' },
    ],
    companyLinks: [
      { label: '当サイトについて', href: '/about/' },
      { label: 'お問い合わせ', href: '/contact/' },
      { label: 'プライバシーポリシー', href: '/privacy/' },
      { label: '利用規約', href: '/terms/' },
    ],
    relatedTools: [
      { name: '保険証・マイナンバー黒塗り', desc: '記号・番号・枝番・QRコードをブラウザ内で完全抹消＆EXIF削除。', href: '/ja/hokensho-masking/', badge: '本人確認' },
      { name: 'PDF黒塗り・墨消しツール', desc: 'テキストレイヤーごと完全に画像化して機密情報を抹消。', href: '/redact-pdf-online/', badge: '墨消し' },
      { name: '画像を200KBに圧縮', desc: 'e-Taxやオンライン申請用の添付画像サイズ調整。', href: '/compress-image-to-200kb/', badge: '200KB' },
      { name: 'HEICをJPGに変換', desc: 'iPhoneの写真をサーバー送信なしで一括JPG変換。', href: '/convert-heic-to-jpg/', badge: 'iPhone' },
    ],
  },

  id: {
    langCode: 'id',
    homeLabel: 'BERANDA',
    toolsDropdownLabel: 'Alat ▾',
    moreDropdownLabel: 'Lainnya ▾',
    footerTagline: 'Kompresi foto dan dokumen PDF presisi tinggi langsung di browser Anda. 100% aman tanpa unggah ke server.',
    footerToolsHeading: 'Alat Populer',
    footerCompanyHeading: 'Informasi',
    footerViewAllTools: 'Lihat semua alat →',
    footerCopyright: '© 2026 PdfAndImg — Hak cipta dilindungi',
    relatedHeading: 'Alat Kompresi Foto & PDF Lainnya',
    navLinks: [
      { label: 'Kompres Foto 100KB', href: '/id/kompres-foto-100kb/', highlight: true },
      { label: 'Kompres Foto 200KB', href: '/id/kompres-foto-200kb/', highlight: true },
      { label: 'Kompres Foto 50KB', href: '/compress-image-to-50kb/' },
      { label: 'Kompres PDF 100KB', href: '/compress-pdf-to-100kb/' },
      { label: 'Gabung PDF', href: '/merge-multiple-pdf-into-one/' },
    ],
    footerToolLinks: [
      { label: 'Kompres Foto 100KB Online', mobileLabel: 'Kompres 100KB', href: '/id/kompres-foto-100kb/', highlight: true },
      { label: 'Kompres Foto 200KB (CPNS/SSCASN)', mobileLabel: 'Kompres 200KB', href: '/id/kompres-foto-200kb/', highlight: true },
      { label: 'Kompres Foto ke 50KB', mobileLabel: 'Kompres 50KB', href: '/compress-image-to-50kb/' },
      { label: 'Kompres File PDF ke 100KB', mobileLabel: 'PDF 100KB', href: '/compress-pdf-to-100kb/' },
      { label: 'Ubah JPG ke PDF 100KB', mobileLabel: 'JPG ke PDF', href: '/convert-jpg-to-pdf-100kb/' },
    ],
    companyLinks: [
      { label: 'Tentang Kami', href: '/about/' },
      { label: 'Hubungi Kami', href: '/contact/' },
      { label: 'Kebijakan Privasi', href: '/privacy/' },
      { label: 'Syarat & Ketentuan', href: '/terms/' },
    ],
    relatedTools: [
      { name: 'Kompres Foto 100KB', desc: 'Kompres ukuran foto pas 100KB untuk syarat daftar online.', href: '/id/kompres-foto-100kb/', badge: '100KB' },
      { name: 'Kompres Foto 200KB', desc: 'Kecilkan ukuran foto untuk portal SSCASN, CPNS & SNPMB.', href: '/id/kompres-foto-200kb/', badge: '200KB' },
      { name: 'Kompres PDF 100KB', desc: 'Kecilkan ukuran dokumen scan PDF tanpa pecah.', href: '/compress-pdf-to-100kb/', badge: 'PDF' },
      { name: 'Potong Foto Pasfoto', desc: 'Sesuaikan rasio pasfoto resmi langsung di browser.', href: '/crop-image-to-passport-size/', badge: 'PASFOTO' },
    ],
  },
};

export function getLocaleChrome(lang?: string, pathname?: string): LocaleChrome {
  if (lang && lang in i18nChrome) {
    return i18nChrome[lang];
  }
  if (pathname) {
    const firstSeg = pathname.split('/').filter(Boolean)[0];
    if (firstSeg && firstSeg in i18nChrome) {
      return i18nChrome[firstSeg];
    }
  }
  return i18nChrome.en;
}

