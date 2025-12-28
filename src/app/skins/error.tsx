'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/navbar';

export default function SkinsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Skins page error:', error);
  }, [error]);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-zinc-950 pt-20 flex items-center justify-center">
        <div className="text-center px-4 max-w-md">
        <div className="text-6xl mb-6">⚠️</div>
        <h2 className="text-2xl font-bold text-white mb-3">出错了</h2>
        <p className="text-zinc-400 mb-6">
          加载皮肤列表时出现问题，请稍后重试
        </p>
        <div className="flex gap-3 justify-center">
          <Button
            onClick={reset}
            className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
          >
            重试
          </Button>
          <Button
            variant="outline"
            onClick={() => window.location.href = '/'}
            className="border-zinc-700 hover:bg-zinc-800"
          >
            返回首页
          </Button>
        </div>
        {process.env.NODE_ENV === 'development' && error.message && (
          <div className="mt-6 p-4 bg-zinc-900 border border-zinc-800 rounded-lg text-left">
            <p className="text-xs text-red-400 font-mono">{error.message}</p>
          </div>
        )}
      </div>
    </main>
    </>
  );
}
