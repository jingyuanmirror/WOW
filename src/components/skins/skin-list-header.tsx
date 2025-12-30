'use client';

import { useTranslation } from '@/lib/i18n';

export function SkinListHeader({ total }: { total: number }) {
  const { t } = useTranslation();

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-950 border-b border-zinc-800">
      {/* 背景纹理 */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-400 bg-clip-text text-transparent">
            {t('skinsPage.header.title')}
          </h1>
          <p className="text-lg text-zinc-400 mb-6">
            {t('skinsPage.header.subtitle')}
          </p>
          <div className="flex items-center justify-center gap-6 text-sm text-zinc-500">
            <span>
              {t('skinsPage.header.totalPrefix')}{' '}
              <span className="text-amber-400 font-semibold">{total}</span>{' '}
              {t('skinsPage.header.totalSuffix')}
            </span>
            <span className="hidden md:inline">|</span>
            <span className="hidden md:inline">{t('skinsPage.header.supportText')}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
