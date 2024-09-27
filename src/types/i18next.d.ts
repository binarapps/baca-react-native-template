import { ParseKeys } from 'i18next'
import english from '@/i18n/translations/en.json'
import polish from '@/i18n/translations/pl.json'

type EN = typeof english
type PL = typeof polish

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'en'
    returnNull: false
    resources: {
      en: EN
      pl: PL
    }
  }
}

export type I18nKeys = ParseKeys
