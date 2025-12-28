'use client';

import { useLanguageStore } from '@/lib/stores/language-store';
import HomePage from './home-page';

export default function HomePageWrapper() {
  const locale = useLanguageStore((state) => state.locale);
  
  console.log('[HomePageWrapper] Current locale:', locale);
  
  // Force complete remount when locale changes
  return <HomePage key={locale} />;
}
