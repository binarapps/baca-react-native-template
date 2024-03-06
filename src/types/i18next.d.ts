import 'i18next'
import english from '@baca/i18n/translations/en.json'

type EN = typeof english

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'en'
    returnNull: false
    resources: {
      en: EN
    }
  }
}
