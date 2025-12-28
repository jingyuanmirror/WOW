'use client';

import { create } from 'zustand';

export type Locale = 'zh-CN' | 'en-US';

interface LanguageState {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

// Simple store - always start with zh-CN
export const useLanguageStore = create<LanguageState>()((set) => ({
  locale: 'zh-CN',
  setLocale: (locale) => {
    console.log('[LanguageStore] Changing locale to:', locale);
    set({ locale });
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('app-language', locale);
        console.log('[LanguageStore] Saved to localStorage:', locale);
      } catch (e) {
        console.error('Failed to save locale:', e);
      }
    }
  },
}));

// Initialize from localStorage on client side - runs once
if (typeof window !== 'undefined') {
  const initLocale = () => {
    try {
      const saved = localStorage.getItem('app-language') as Locale;
      if (saved && (saved === 'zh-CN' || saved === 'en-US')) {
        console.log('[LanguageStore] Loading saved locale:', saved);
        useLanguageStore.setState({ locale: saved });
      }
    } catch (e) {
      console.error('Failed to load locale:', e);
    }
  };
  
  // Run after a brief delay to avoid hydration issues
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLocale);
  } else {
    setTimeout(initLocale, 0);
  }
}
