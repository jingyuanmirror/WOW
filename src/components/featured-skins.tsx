'use client';

import { useMemo, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Eye, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import SkinPreviewModal from './skin-preview-modal';
import ImageCarousel from './image-carousel';
import VideoPlayer from './video-player';
import SkinInfoPanel from './skin-info-panel';
import { useTranslation } from '@/lib/i18n/use-translation';
import useSWR from 'swr';

const FALLBACK_SKINS = [
  {
    id: 1,
    name: '暗影之刃',
    nameEn: 'Shadow Blade',
    description: '专为竞技场PvP设计，突出技能冷却和敌方施法条',
    descriptionEn: 'Designed for arena PvP, highlights skill cooldowns and enemy cast bars',
    price: 19.99,
    quality: 'legendary',
    images: [
      { url: '/images/skin-1-1.webp', alt: '暗影之刃主界面' },
      { url: '/images/skin-1-2.webp', alt: '暗影之刃战斗界面' },
    ],
    video: '/videos/skin-1-demo.mp4',
    features: ['高度自定义', '性能优化', '多分辨率适配'],
  },
  {
    id: 2,
    name: '圣光守护',
    nameEn: 'Holy Guardian',
    description: '治疗专精界面，清晰的团队框架和法术监控',
    descriptionEn: 'Healing specialization interface with clear raid frames and spell monitoring',
    price: 24.99,
    quality: 'epic',
    images: [
      { url: '/images/skin-2-1.webp', alt: '圣光守护主界面' },
      { url: '/images/skin-2-2.webp', alt: '圣光守护团队界面' },
    ],
    video: '/videos/skin-2-demo.mp4',
    features: ['高度自定义', '性能优化', '多分辨率适配'],
  },
  {
    id: 3,
    name: '狂怒之心',
    nameEn: 'Fury Heart',
    description: 'DPS输出专用，伤害统计和增益监控一目了然',
    descriptionEn: 'DPS-focused interface with clear damage stats and buff monitoring',
    price: 19.99,
    quality: 'epic',
    images: [
      { url: '/images/skin-3-1.webp', alt: '狂怒之心主界面' },
      { url: '/images/skin-3-2.webp', alt: '狂怒之心输出界面' },
    ],
    video: '/videos/skin-3-demo.mp4',
    features: ['高度自定义', '性能优化', '多分辨率适配'],
  },
];

type FeaturedRemoteItem = {
  id: string;
  title: string;
  description: string;
  quality?: string;
  status?: string;
  price?: number | null;
  priceType?: 'paid' | 'free';
  tags?: string[];
  mainImage?: string;
  backupImages?: string[];
  sortOrder?: number;
};

const fetcher = (url: string) => fetch(url).then((res) => res.json()).then((data) => data.items ?? []);

const QUALITY_COLORS = {
  legendary: 'from-orange-500 to-yellow-500',
  epic: 'from-purple-500 to-pink-500',
  rare: 'from-blue-500 to-cyan-500',
  uncommon: 'from-green-500 to-emerald-500',
  common: 'from-gray-500 to-zinc-400',
};

const QUALITY_LABELS = {
  legendary: { zh: '传说', en: 'Legendary' },
  epic: { zh: '史诗', en: 'Epic' },
  rare: { zh: '精良', en: 'Rare' },
  uncommon: { zh: '优秀', en: 'Uncommon' },
  common: { zh: '优秀', en: 'Common' },
};

// 根据皮肤ID生成不同的UI主题色
const getThemeColors = (skinId: number) => {
  const themes = [
    { bg: 'from-purple-900/40 via-slate-900 to-black', accent: 'purple-500', bar1: 'purple-600', bar2: 'indigo-600' }, // 暗影
    { bg: 'from-yellow-900/30 via-slate-900 to-black', accent: 'yellow-500', bar1: 'yellow-600', bar2: 'amber-500' }, // 圣光
    { bg: 'from-red-900/40 via-slate-900 to-black', accent: 'red-500', bar1: 'red-600', bar2: 'orange-600' }, // 狂怒
    { bg: 'from-cyan-900/30 via-slate-900 to-black', accent: 'cyan-500', bar1: 'cyan-600', bar2: 'blue-500' }, // 冰霜
    { bg: 'from-green-900/40 via-slate-900 to-black', accent: 'green-500', bar1: 'green-600', bar2: 'emerald-500' }, // 翡翠
    { bg: 'from-violet-900/40 via-slate-900 to-black', accent: 'violet-500', bar1: 'violet-600', bar2: 'purple-600' }, // 虚空
  ];
  return themes[(skinId - 1) % themes.length];
};


function FeaturedSkins() {
  const { t, locale } = useTranslation();
  const [previewSkin, setPreviewSkin] = useState<null | typeof FALLBACK_SKINS[0]>(null);
  const [previewTab, setPreviewTab] = useState<'image' | 'video'>('image');

  const { data: remoteItems, isLoading, error } = useSWR<FeaturedRemoteItem[]>('/api/featured', fetcher);

  const featuredSkins = useMemo(() => {
    const source = (remoteItems ?? []).filter((item) => item.status === 'published');
    const ordered = source.sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
    if (!ordered.length) return FALLBACK_SKINS;

    const fallbackImage = FALLBACK_SKINS[0]?.images?.[0]?.url ?? '/images/skin-1-1.webp';

    return ordered.map((item, index) => {
      const images = [item.mainImage, ...(item.backupImages ?? [])]
        .filter(Boolean)
        .map((url, imgIndex) => ({ url: url as string, alt: `${item.title} ${imgIndex + 1}` }));

      return {
        id: Number(item.id) || index + 1,
        name: item.title,
        nameEn: item.title,
        description: item.description,
        descriptionEn: item.description,
        price: item.price ?? 0,
        quality: (item.quality as keyof typeof QUALITY_COLORS) ?? 'rare',
        images: images.length ? images : [{ url: fallbackImage, alt: item.title }],
        video: undefined,
        features: item.tags ?? [],
      };
    });
  }, [remoteItems]);

  return (
    <section className="bg-gradient-to-b from-black via-gray-900 to-black py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-4 text-5xl font-bold text-white">{t('featuredSkins.title')}</h2>
          <p className="text-xl text-gray-400">{t('featuredSkins.subtitle')}</p>
        </motion.div>

        {isLoading && (
          <div className="mb-4 rounded-lg border border-blue-500/30 bg-blue-500/10 px-4 py-3 text-sm text-blue-100">
            正在加载精选内容...
          </div>
        )}

        {error && (
          <div className="mb-4 rounded-lg border border-yellow-500/30 bg-yellow-500/10 px-4 py-3 text-sm text-yellow-100">
            精选数据加载失败，已回退到本地示例。
          </div>
        )}

        {/* Skins Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featuredSkins.map((skin, index) => (
            <motion.div
              key={skin.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="group overflow-hidden border-gray-800 bg-gray-900/50 backdrop-blur-sm transition-all hover:-translate-y-2 hover:border-gray-700 hover:shadow-2xl hover:shadow-gray-600/10">
                {/* Image */}
                <div className="relative aspect-video overflow-hidden cursor-pointer" onClick={() => { setPreviewSkin(skin); setPreviewTab('image'); }}>
                  <img src={skin.images[0].url} alt={skin.images[0].alt} className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105" />
                  <div className={`absolute left-4 top-4 rounded-full bg-gradient-to-r ${QUALITY_COLORS[skin.quality as keyof typeof QUALITY_COLORS]} px-3 py-1 text-xs font-bold text-white shadow-lg`}>
                    {locale === 'en-US' ? QUALITY_LABELS[skin.quality as keyof typeof QUALITY_LABELS].en : QUALITY_LABELS[skin.quality as keyof typeof QUALITY_LABELS].zh}
                  </div>
                  {/* Quick View Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity group-hover:opacity-100">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-white/30 bg-white/10 text-white backdrop-blur-sm hover:bg-white hover:text-black"
                      onClick={e => { e.stopPropagation(); setPreviewSkin(skin); setPreviewTab('image'); }}
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      {t('featuredSkins.preview')}
                    </Button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="mb-2 text-2xl font-bold text-white">{locale === 'en-US' ? (skin as any).nameEn || skin.name : skin.name}</h3>
                  <p className="mb-6 line-clamp-2 text-sm text-gray-400">
                    {locale === 'en-US' ? (skin as any).descriptionEn || skin.description : skin.description}
                  </p>

                  {/* Price and Actions */}
                  <div className="flex items-center justify-between">
                    <div>
                      {skin.price === 0 ? (
                        <span className="text-2xl font-bold text-green-400">{locale === 'en-US' ? 'Free' : '免费'}</span>
                      ) : (
                        <span className="text-2xl font-bold text-gray-200">
                          ¥{skin.price.toFixed(2)}
                        </span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-700 text-white hover:bg-white/10"
                        onClick={() => { setPreviewSkin(skin); setPreviewTab('image'); }}
                      >
                        {t('featuredSkins.preview')}
                      </Button>
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-gray-700 to-gray-800 text-white hover:from-gray-600 hover:to-gray-700"
                      >
                        <ShoppingCart className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Link href="/skins">
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-gray-600/30 bg-gray-800/10 px-8 py-6 text-lg font-bold text-gray-300 backdrop-blur-sm transition-all hover:border-gray-500 hover:bg-gray-700/30 hover:text-white"
            >
              {t('featuredSkins.viewAll')} →
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* 皮肤预览弹窗 */}
      <SkinPreviewModal open={!!previewSkin} onClose={() => setPreviewSkin(null)}>
        {previewSkin && (
          <div className="flex flex-col md:flex-row w-full">
            {/* 左侧：图片轮播/视频 (扩大预览区) */}
            <div className="flex-1 min-w-0 bg-black/80 flex flex-col items-center justify-center">
              <div className="flex gap-2 p-4">
                <Button size="sm" variant={previewTab === 'image' ? 'default' : 'outline'} onClick={() => setPreviewTab('image')}>{locale === 'en-US' ? 'Images' : '图片'}</Button>
                {previewSkin.video && <Button size="sm" variant={previewTab === 'video' ? 'default' : 'outline'} onClick={() => setPreviewTab('video')}>{locale === 'en-US' ? 'Demo Video' : '演示视频'}</Button>}
              </div>
              <div className="w-full px-4 pb-4">
                {previewTab === 'image' ? (
                  <ImageCarousel images={previewSkin.images} />
                ) : (
                  <VideoPlayer src={previewSkin.video} poster={previewSkin.images[0].url} />
                )}
              </div>
            </div>
            {/* 右侧：信息区（缩窄并弱化） */}
            <div className="w-full md:w-[260px] border-l border-zinc-800 bg-zinc-950/80">
              <SkinInfoPanel
                name={previewSkin.name}
                quality={previewSkin.quality}
                description={previewSkin.description}
                price={previewSkin.price}
                features={previewSkin.features}
                onBuy={() => {}}
                onDetail={() => {}}
                compact
              />
            </div>
          </div>
        )}
      </SkinPreviewModal>
    </section>
  );
}

export default FeaturedSkins;
