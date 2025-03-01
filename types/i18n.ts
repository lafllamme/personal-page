import type { Locale } from 'vue-i18n'

export interface LanguageOption {
  code: Locale
  labelKey: string
}

export const languages: LanguageOption[] = [
  { code: 'de', labelKey: 'languages.de' },
  { code: 'en', labelKey: 'languages.en' },
  { code: 'fr', labelKey: 'languages.fr' },
  { code: 'ja', labelKey: 'languages.ja' },
  { code: 'zh', labelKey: 'languages.zh' },
  { code: 'pt', labelKey: 'languages.pt' },
  { code: 'es', labelKey: 'languages.es' },
  { code: 'pl', labelKey: 'languages.pl' },
  { code: 'da', labelKey: 'languages.da' },
  { code: 'cs', labelKey: 'languages.cs' },
  { code: 'nl', labelKey: 'languages.nl' },
  { code: 'el', labelKey: 'languages.el' },
  { code: 'tr', labelKey: 'languages.tr' },
  { code: 'ko', labelKey: 'languages.ko' },
  { code: 'uk', labelKey: 'languages.uk' },
  { code: 'ar', labelKey: 'languages.ar' },
]
