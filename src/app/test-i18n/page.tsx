'use client';

import { useLanguageStore } from '@/lib/stores/language-store';
import { useTranslation } from '@/lib/i18n/use-translation';

export default function TestI18nPage() {
  const { locale, setLocale } = useLanguageStore();
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-4xl mb-8">i18n Test Page</h1>
      
      <div className="mb-8">
        <p className="mb-2">Current Locale: <strong>{locale}</strong></p>
        <button 
          onClick={() => setLocale('zh-CN')}
          className="bg-blue-500 px-4 py-2 rounded mr-2"
        >
          中文
        </button>
        <button 
          onClick={() => setLocale('en-US')}
          className="bg-green-500 px-4 py-2 rounded"
        >
          English
        </button>
      </div>

      <div className="space-y-4">
        <div className="border border-gray-700 p-4 rounded">
          <p className="text-gray-400">hero.title:</p>
          <p className="text-2xl">{t('hero.title')}</p>
        </div>

        <div className="border border-gray-700 p-4 rounded">
          <p className="text-gray-400">hero.subtitle:</p>
          <p className="text-xl">{t('hero.subtitle')}</p>
        </div>

        <div className="border border-gray-700 p-4 rounded">
          <p className="text-gray-400">nav.brand:</p>
          <p className="text-xl">{t('nav.brand')}</p>
        </div>

        <div className="border border-gray-700 p-4 rounded">
          <p className="text-gray-400">featuredSkins.title:</p>
          <p className="text-xl">{t('featuredSkins.title')}</p>
        </div>
      </div>
    </div>
  );
}
