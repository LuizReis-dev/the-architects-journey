import { createContext, useContext } from "react";
import en from "../locales/en";
import pt from "../locales/pt";

export const translations = {
  pt,
  en,
};

export type Language = keyof typeof translations;
export type Translation = typeof pt;

export type I18nContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: Translation;
};

export const I18nContext = createContext<I18nContextValue | null>(null);

export function useI18n() {
  const context = useContext(I18nContext);

  if (!context) {
    throw new Error("useI18n must be used inside I18nProvider");
  }

  return context;
}
