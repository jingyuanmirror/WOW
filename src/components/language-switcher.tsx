'use client';

import { Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguageStore, type Locale } from '@/lib/stores/language-store';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export function LanguageSwitcher() {
  const { locale, setLocale } = useLanguageStore();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'zh-CN' as Locale, label: '中文', flag: '🇨🇳' },
    { code: 'en-US' as Locale, label: 'English', flag: '🇺🇸' },
  ];

  const currentLanguage = languages.find((lang) => lang.code === locale) || languages[0];

  const handleLanguageChange = (newLocale: Locale) => {
    setLocale(newLocale);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="border-zinc-700 hover:border-yellow-500 text-zinc-300 gap-2"
      >
        <Globe className="w-4 h-4" />
        <span className="hidden sm:inline">{currentLanguage.flag} {currentLanguage.label}</span>
        <span className="sm:hidden">{currentLanguage.flag}</span>
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 z-40" 
              onClick={() => setIsOpen(false)}
            />
            
            {/* Dropdown */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 mt-2 w-40 bg-zinc-900 border border-zinc-800 rounded-lg shadow-xl overflow-hidden z-50"
            >
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`w-full px-4 py-3 text-left flex items-center gap-3 transition-colors ${
                    locale === lang.code
                      ? 'bg-yellow-500/10 text-yellow-400'
                      : 'text-zinc-300 hover:bg-zinc-800'
                  }`}
                >
                  <span className="text-xl">{lang.flag}</span>
                  <span className="font-medium">{lang.label}</span>
                  {locale === lang.code && (
                    <span className="ml-auto text-yellow-400">✓</span>
                  )}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
