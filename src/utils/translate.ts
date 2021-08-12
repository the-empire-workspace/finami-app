import es from '@translate/es.json'
import en from '@translate/en.json'
import { memoize } from 'lodash'
import i18n from 'i18n-js'
import RNLocalize from 'react-native-localize'
import { I18nManager } from 'react-native'

export const translationGetters: any = {
  es: es,
  en: en,
}

export const translate: any = memoize(
  (key: any, config: any) => i18n.t(key, config),
  (key, config) => (config ? key + JSON.stringify(config) : key),
)

export const setI18nConfig = (language: any = null) => {
  // fallback if no available language fits
  const fallback = { languageTag: language || 'es', isRTL: false }

  const { languageTag, isRTL } = language
    ? fallback
    : RNLocalize.findBestAvailableLanguage(Object.keys(translationGetters)) ||
      fallback

  // clear translation cache
  translate.cache.clear()
  // update layout direction
  I18nManager.forceRTL(isRTL)
  // set i18n-js config
  i18n.translations = { [languageTag]: translationGetters[languageTag] }
  i18n.locale = languageTag
}
