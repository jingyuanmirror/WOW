"use client";

import { useTranslation } from '@/lib/i18n';

interface SkinResultsSummaryProps {
  total: number;
  totalSkins: number;
}

export function SkinResultsSummary({ total, totalSkins }: SkinResultsSummaryProps) {
  const { t } = useTranslation();

  if (total === totalSkins) return null;

  return (
    <div className="mb-6 text-sm text-zinc-400">
      {t('skinsPage.results.filteredPrefix')}{' '}
      <span className="text-amber-400 font-semibold">{total}</span>{' '}
      {t('skinsPage.results.filteredSuffix')}
    </div>
  );
}
