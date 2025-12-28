'use client';

import { useEffect } from 'react';
import { useLanguageStore } from '@/lib/stores/language-store';

export function LanguageUpdater() {
  const locale = useLanguageStore((state) => state.locale);

  useEffect(() => {
    // Update HTML lang attribute
    if (typeof document !== 'undefined') {
      document.documentElement.lang = locale;
    }
  }, [locale]);

  return null;
}
