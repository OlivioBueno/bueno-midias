import { useLanguage } from '@/contexts/LanguageContext'
import pt from '@/translations/pt.json'
import en from '@/translations/en.json'

export function useTranslation() {
  const { language } = useLanguage()
  const translations = language === 'en' ? en : pt

  const t = (key) => {
    const keys = key.split('.')
    let value = translations

    for (const k of keys) {
      if (value[k] === undefined) {
        console.warn(`Tradução não encontrada: ${key}`)
        return key
      }
      value = value[k]
    }

    return value
  }

  return { t, language }
}
