'use client';

import { useEffect } from 'react';
import PromoCarousel from '@/components/promo-carousel';
import { promoSlides } from '@/lib/data';

export default function DebugCarousel() {
  useEffect(() => {
    console.log('轮播组件已加载');
    console.log('轮播数据:', promoSlides);
  }, []);

  return (
    <div className="min-h-screen bg-zinc-900">
      {/* 明显的标题 */}
      <div className="bg-red-500 text-white text-4xl p-8 text-center font-bold">
        ⬇️ 轮播应该显示在这里 ⬇️
      </div>
      
      {/* 轮播组件 */}
      <div className="bg-green-500 p-4">
        <div className="bg-blue-500 text-white text-2xl p-4 mb-2">
          轮播容器开始（蓝色边框）
        </div>
        <PromoCarousel slides={promoSlides} height="500px" />
        <div className="bg-blue-500 text-white text-2xl p-4 mt-2">
          轮播容器结束（蓝色边框）
        </div>
      </div>

      {/* 数据展示 */}
      <div className="bg-yellow-500 text-black text-4xl p-8 text-center font-bold">
        ⬆️ 轮播应该显示在上面 ⬆️
      </div>
      
      <div className="p-8 text-white bg-zinc-800">
        <h2 className="text-2xl mb-4">轮播数据（共 {promoSlides.length} 项）:</h2>
        <pre className="bg-zinc-900 p-4 rounded overflow-auto text-sm">
          {JSON.stringify(promoSlides, null, 2)}
        </pre>
      </div>
    </div>
  );
}
