'use client';

import { useState, useEffect } from 'react';
import { Skin } from '@/lib/types/skin';
import { SkinCard } from './skin-card';
import SkinPreviewModal from '../skin-preview-modal';
import Image from 'next/image';

interface SkinGridProps {
  skins: Skin[];
}

export function SkinGrid({ skins }: SkinGridProps) {
  const [previewSkin, setPreviewSkin] = useState<Skin | null>(null);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

  const closePreview = () => {
    setPreviewSkin(null);
    setCurrentMediaIndex(0);
  };

  // 键盘导航
  useEffect(() => {
    if (!previewSkin) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        const allMedia = getAllMedia();
        setCurrentMediaIndex((prev) => (prev - 1 + allMedia.length) % allMedia.length);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        const allMedia = getAllMedia();
        setCurrentMediaIndex((prev) => (prev + 1) % allMedia.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [previewSkin]);

  const getAllMedia = () => {
    if (!previewSkin) return [];
    
    const allMedia = [
      ...(previewSkin.media?.images || []).map((img) => ({ type: 'image' as const, ...img })),
      ...(previewSkin.media?.videos || []).map((vid) => ({ type: 'video' as const, ...vid })),
    ];

    if (allMedia.length === 0) {
      if (previewSkin.image) {
        allMedia.push({ type: 'image' as const, url: previewSkin.image, width: 1920, height: 1080 });
      }
      if (previewSkin.video) {
        allMedia.push({ 
          type: 'video' as const, 
          url: previewSkin.video, 
          thumbnail: previewSkin.image || '', 
          duration: 30 
        });
      }
    }

    return allMedia;
  };

  const renderPreviewContent = () => {
    if (!previewSkin) return null;

    const allMedia = getAllMedia();

    const currentMedia = allMedia[currentMediaIndex];

    const handlePrev = () => {
      setCurrentMediaIndex((prev) => (prev - 1 + allMedia.length) % allMedia.length);
    };

    const handleNext = () => {
      setCurrentMediaIndex((prev) => (prev + 1) % allMedia.length);
    };

    return (
      <div className="w-full flex flex-col">
        {/* 主显示区 */}
        <div className="relative bg-black rounded-t-2xl flex items-center justify-center p-4 md:p-8 h-[50vh] md:h-[55vh]">
          {currentMedia?.type === 'image' ? (
            <div className="relative w-full h-full">
              <Image
                src={currentMedia.url}
                alt={previewSkin.name}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 80vw"
                priority
              />
            </div>
          ) : currentMedia?.type === 'video' ? (
            <video
              src={currentMedia.url}
              controls
              autoPlay
              loop
              className="max-w-full max-h-full rounded-lg"
            >
              您的浏览器不支持视频播放
            </video>
          ) : (
            <div className="text-zinc-400">暂无预览</div>
          )}

          {/* 左右切换按钮 */}
          {allMedia.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-all backdrop-blur-sm z-10"
                aria-label="上一张"
              >
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>
              <button
                onClick={handleNext}
                className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-all backdrop-blur-sm z-10"
                aria-label="下一张"
              >
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </>
          )}

          {/* 页码指示器 */}
          {allMedia.length > 1 && (
            <div className="absolute bottom-2 md:bottom-4 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full bg-black/50 text-white text-sm backdrop-blur-sm">
              {currentMediaIndex + 1} / {allMedia.length}
            </div>
          )}
        </div>

        {/* 缩略图轮播 */}
        {allMedia.length > 1 && (
          <div className="p-3 md:p-4 bg-zinc-900/80 flex items-center gap-2 overflow-x-auto scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-zinc-900">
            {allMedia.map((media, index) => (
              <button
                key={index}
                onClick={() => setCurrentMediaIndex(index)}
                className={`relative flex-shrink-0 w-16 h-12 md:w-20 md:h-14 rounded overflow-hidden border-2 transition-all ${
                  index === currentMediaIndex
                    ? 'border-amber-500 scale-105'
                    : 'border-zinc-700 opacity-60 hover:opacity-100'
                }`}
              >
                {media.type === 'image' ? (
                  <Image
                    src={media.url}
                    alt={`预览 ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                ) : (
                  <div className="w-full h-full bg-zinc-800 flex items-center justify-center">
                    <span className="text-xs">🎬</span>
                  </div>
                )}
              </button>
            ))}
          </div>
        )}

        {/* 信息与操作栏 */}
        <div className="p-3 md:p-4 bg-zinc-900 rounded-b-2xl border-t border-zinc-800">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
            <div className="flex-1">
              <h3 className="text-base md:text-lg font-bold text-white">{previewSkin.name}</h3>
              {previewSkin.author && (
                <p className="text-xs md:text-sm text-zinc-400">by {previewSkin.author.name}</p>
              )}
            </div>
            <div className="flex items-center gap-3 w-full md:w-auto">
              <span className="text-xs md:text-sm text-zinc-400 flex-1 md:flex-initial">
                ❤️ {previewSkin.stats?.likes || previewSkin.downloads || 0} 喜欢
              </span>
              <a
                href={`/skins/${previewSkin.id}`}
                className="px-3 md:px-4 py-1.5 md:py-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-xs md:text-sm font-medium rounded-lg transition-all whitespace-nowrap"
              >
                查看完整详情
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (skins.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-xl font-semibold text-zinc-300 mb-2">未找到符合条件的皮肤</h3>
        <p className="text-zinc-500">尝试调整筛选条件或清除所有筛选</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {skins.map((skin) => (
          <SkinCard key={skin.id} skin={skin} onPreview={setPreviewSkin} />
        ))}
      </div>

      {/* 预览弹窗 */}
      <SkinPreviewModal open={Boolean(previewSkin)} onClose={closePreview}>
        {renderPreviewContent()}
      </SkinPreviewModal>
    </>
  );
}
