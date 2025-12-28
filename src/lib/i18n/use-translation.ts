'use client';

import { useLanguageStore, type Locale } from '@/lib/stores/language-store';
import { translations } from './translations';

type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`;
}[keyof ObjectType & (string | number)];

type TranslationPath = NestedKeyOf<typeof translations['zh-CN']>;

export function useTranslation() {
  const locale = useLanguageStore((state) => state.locale);

  const t = (path: TranslationPath): string => {
    const keys = path.split('.');
    let value: any = translations[locale];

    for (const key of keys) {
      if (value && typeof value === 'object' && key in value) {
        value = value[key];
      } else {
        console.warn(`Translation key not found: ${path} for locale ${locale}`);
        return path;
      }
    }

    return typeof value === 'string' ? value : path;
  };

  return { t, locale };
}

// Helper function for server components or non-hook contexts
export function getTranslation(locale: Locale) {
  const t = (path: TranslationPath): string => {
    const keys = path.split('.');
    let value: any = translations[locale];

    for (const key of keys) {
      if (value && typeof value === 'object' && key in value) {
        value = value[key];
      } else {
        return path;
      }
    }

    return typeof value === 'string' ? value : path;
  };

  return { t, locale };
}
