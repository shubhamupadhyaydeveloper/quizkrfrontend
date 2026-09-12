import { useCallback } from 'react';
import { useAppStore } from '../store/AppStore';
import { en, es, hi, StringKey } from './strings';

export type Language = 'en' | 'hi' | 'es';

export const LANGUAGES: { code: Language; native: string; english: string }[] = [
  { code: 'en', native: 'English', english: 'English' },
  { code: 'hi', native: 'हिन्दी', english: 'Hindi' },
  { code: 'es', native: 'Español', english: 'Spanish' },
];

const DICTIONARIES = { en, hi, es };

type Vars = Record<string, string | number>;

export const translate = (language: Language, key: StringKey, vars?: Vars) => {
  const template = DICTIONARIES[language][key] ?? en[key];
  if (!vars) return template;
  return template.replace(/\{(\w+)\}/g, (_, name: string) =>
    name in vars ? String(vars[name]) : `{${name}}`,
  );
};

export const languageName = (language: Language) =>
  LANGUAGES.find(item => item.code === language)?.native ?? 'English';

// Reads the language from the store, so every screen re-renders on change.
export const useT = () => {
  const { language } = useAppStore();
  return useCallback((key: StringKey, vars?: Vars) => translate(language, key, vars), [language]);
};
