import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"
import {
  I18nContext,
  translations,
  type I18nContextValue,
  type Language,
} from "./i18n"

type I18nProviderProps = {
  children: ReactNode
}

const LANGUAGE_STORAGE_KEY = "architects-journey-language"

function getInitialLanguage(): Language {
  const storedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY)

  return storedLanguage === "en" || storedLanguage === "pt"
    ? storedLanguage
    : "pt"
}

export function I18nProvider({ children }: I18nProviderProps) {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage)

  const setLanguage = useCallback((nextLanguage: Language) => {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLanguage)
    setLanguageState(nextLanguage)
  }, [])

  useEffect(() => {
    document.documentElement.lang = language === "pt" ? "pt-BR" : "en"
  }, [language])

  const value = useMemo<I18nContextValue>(
    () => ({
      language,
      setLanguage,
      t: translations[language],
    }),
    [language],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}
