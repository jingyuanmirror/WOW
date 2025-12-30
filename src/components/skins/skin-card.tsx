'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, Eye, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Skin } from '@/lib/types/skin';
import {
  getQualityTextClass,
  getVersionColor,
  formatNumber,
  formatRelativeTime,
} from '@/lib/utils/skin-filters';
import { useLikeSkin } from '@/lib/hooks/use-like-skin';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useTranslation } from '@/lib/i18n';

interface SkinCardProps {
  skin: Skin;
  onPreview?: (skin: Skin) => void;
}

export function SkinCard({ skin, onPreview }: SkinCardProps) {
  const { t } = useTranslation();
  const [isHovered, setIsHovered] = useState(false);
  const { isLiked, likes, toggleLike } = useLikeSkin(skin.id, {
    initialLiked: false,
    initialLikes: skin.stats?.likes || skin.downloads || 0,
  });

  const thumbnail = skin.media?.thumbnail || skin.image || '/placeholder-skin.jpg';
  const hasVideo = Boolean(skin.media?.videos?.length || skin.video);
  const imageCount = skin.media?.images?.length || 1;
  const videoCount = skin.media?.videos?.length || (skin.video ? 1 : 0);

  const handlePreview = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onPreview?.(skin);
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card className="overflow-hidden bg-zinc-900/50 border-zinc-800 hover:border-zinc-700 transition-colors h-full flex flex-col">
        {/* 预览图区域 */}
        <Link href={`/skins/${skin.id}`} className="relative aspect-video bg-zinc-950 cursor-pointer group overflow-hidden block">
          <Image
            src={thumbnail}
            alt={skin.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
          />
          
          {/* 悬停遮罩 */}
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center"
            >
              <span className="text-white text-sm font-medium">{t('skinsPage.card.viewDetails')}</span>
            </motion.div>
          )}

          {/* 品质色条 */}
          <div
            className="absolute top-0 left-0 right-0 h-1"
            style={{ backgroundColor: getQualityColor(skin.quality) }}
          />
        </Link>

        {/* 媒体类型指示器 */}
        <div className="px-3 py-2 bg-zinc-950/50 flex items-center gap-3 text-xs text-zinc-400">
          {imageCount > 0 && (
            <span className="flex items-center gap-1">
              🖼️ {imageCount}{t('skinsPage.card.images')}
            </span>
          )}
          {videoCount > 0 && (
            <span className="flex items-center gap-1">
              🎬 {videoCount}{t('skinsPage.card.videos')}
            </span>
          )}
        </div>

        {/* 内容区域 */}
        <div className="p-4 flex-1 flex flex-col">
          {/* 标题 */}
          <h3
            className={`text-lg font-bold mb-3 line-clamp-2 ${getQualityTextClass(
              skin.quality
            )}`}
            title={skin.name}
          >
            {skin.name}
          </h3>

          {/* 互动数据 */}
          <div className="flex items-center gap-4 text-xs text-zinc-400 mb-3">
            <span className="flex items-center gap-1" title={t('skinsPage.card.likes')}>
              <Heart className="w-3.5 h-3.5" />
              {formatNumber(likes)}
            </span>
            <span className="flex items-center gap-1" title={t('skinsPage.card.views')}>
              <Eye className="w-3.5 h-3.5" />
              {formatNumber(skin.stats?.views || (skin.downloads ? skin.downloads * 2 : 0))}
            </span>
            {skin.stats?.comments ? (
              <span className="flex items-center gap-1" title={t('skinsPage.card.comments')}>
                <MessageCircle className="w-3.5 h-3.5" />
                {formatNumber(skin.stats.comments)}
              </span>
            ) : null}
          </div>

          {/* 标签区 */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {/* 版本标签 */}
            {skin.versions.map((version) => (
              <span
                key={version}
                className={`px-2 py-0.5 rounded-full text-xs border ${getVersionColor(
                  version
                )}`}
              >
                {version === 'retail'
                  ? t('skinsPage.card.versions.retail')
                  : version === 'classic'
                  ? t('skinsPage.card.versions.classic')
                  : t('skinsPage.card.versions.wrath')}
              </span>
            ))}
            
            {/* 分类标签 */}
            {skin.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-full text-xs bg-zinc-800/50 text-zinc-400 border border-zinc-700/50"
              >
                {tag}
              </span>
            ))}
            {skin.tags.length > 2 && (
              <span className="px-2 py-0.5 rounded-full text-xs bg-zinc-800/50 text-zinc-400 border border-zinc-700/50">
                +{skin.tags.length - 2}
              </span>
            )}
          </div>

          {/* 操作按钮 */}
          <div className="mt-auto flex gap-2">
            <Button
              asChild
              className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-medium"
            >
              <Link href={`/skins/${skin.id}`}>{t('skinsPage.card.viewDetails')}</Link>
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={(e) => {
                e.preventDefault();
                toggleLike();
              }}
              className={`border-zinc-700 ${
                isLiked
                  ? 'bg-red-500/20 border-red-500/50 text-red-400 hover:bg-red-500/30'
                  : 'hover:bg-zinc-800'
              }`}
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

function getQualityColor(quality: Skin['quality']): string {
  const colors = {
    common: '#FFFFFF',
    rare: '#0070DD',
    epic: '#A335EE',
    legendary: '#FF8000',
  };
  return colors[quality];
}
