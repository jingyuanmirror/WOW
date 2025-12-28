'use client';

import { create } from 'zustand';

export type Locale = 'zh-CN' | 'en-US';

interface LanguageState {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

// Get initial locale from localStorage safely
const getInitialLocale = (): Locale => {
  if (typeof window === 'undefined') return 'zh-CN';
  
  try {
    const stored = localStorage.getItem('language-preference');
    if (stored) {
      const parsed = JSON.parse(stored);
      return parsed.state?.locale || 'zh-CN';
    }
  } catch (e) {
    console.error('Failed to parse stored locale:', e);
  }
  
  return 'zh-CN';
};

// Simple store without persist to avoid SSR issues
export const useLanguageStore = create<LanguageState>()((set) => ({
  locale: getInitialLocale(),
  setLocale: (locale) => {
    set({ locale });
    // Manually save to localStorage
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('language-preference', JSON.stringify({ state: { locale } }));
      } catch (e) {
        console.error('Failed to save locale:', e);
      }
    }
  },
}));
