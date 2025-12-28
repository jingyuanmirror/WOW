'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Heart, 
  Eye, 
  Download, 
  Share2, 
  MessageCircle,
  Calendar,
  User,
  Tag,
  Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Skin } from '@/lib/types/skin';
import { 
  getQualityTextClass, 
  getVersionColor, 
  formatNumber,
  formatRelativeTime 
} from '@/lib/utils/skin-filters';
import { useLikeSkin } from '@/lib/hooks/use-like-skin';
import { useTranslation } from '@/lib/i18n/use-translation';
import ImageCarousel from '@/components/image-carousel';
import VideoPlayer from '@/components/video-player';

// 临时数据 - 实际应该从API获取
const getSkinById = (id: string): Skin | null => {
  // 这里应该调用API获取真实数据
  // 暂时返回模拟数据
  const mockSkin: Skin = {
    id,
    name: `皮肤 #${id}`,
    description: '这是一个精美的魔兽世界界面皮肤，提供完整的UI定制方案。',
    author: {
      id: 'author-1',
      name: 'SkinMaster',
      avatar: '/placeholder-avatar.jpg'
    },
    quality: 'epic',
    versions: ['retail', 'classic'],
    tags: ['界面', '任务', 'PvE', 'PvP'],
    downloads: 12580,
    rating: 4.8,
    reviewCount: 256,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-12-20'),
    image: '/images/skin-1-1.webp',
    media: {
      thumbnail: '/images/skin-1-1.webp',
      images: [
        { url: '/images/skin-1-1.webp', alt: '主界面展示' },
        { url: '/images/skin-1-2.webp', alt: '战斗界面' },
        { url: '/images/skin-2-1.webp', alt: '团队框架' },
      ],
      videos: ['/videos/skin-1-demo.mp4']
    },
    stats: {
      likes: 3420,
      views: 25680,
      downloads: 12580,
      comments: 128
    },
    features: [
      '高度可定制的界面布局',
      '优化的性能表现',
      '支持多分辨率适配',
      '定期更新维护'
    ]
  };
  
  return mockSkin;
};

export default function SkinDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { t, locale } = useTranslation();
  const skinId = params.id as string;
  
  const [skin, setSkin] = useState<Skin | null>(null);
  const [activeTab, setActiveTab] = useState<'images' | 'video'>('images');
  const [loading, setLoading] = useState(true);

  const { isLiked, likes, toggleLike } = useLikeSkin(skinId, {
    initialLiked: false,
    initialLikes: skin?.stats?.likes || 0,
  });

  useEffect(() => {
    const fetchSkin = async () => {
      setLoading(true);
      // 模拟API调用延迟
      await new Promise(resolve => setTimeout(resolve, 500));
      const skinData = getSkinById(skinId);
      setSkin(skinData);
      setLoading(false);
    };

    fetchSkin();
  }, [skinId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">加载中...</div>
      </div>
    );
  }

  if (!skin) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center">
        <div className="text-white text-2xl mb-4">皮肤未找到</div>
        <Button onClick={() => router.push('/skins')}>返回列表</Button>
      </div>
    );
  }

  const hasVideo = skin.media?.videos && skin.media.videos.length > 0;
  const images = skin.media?.images || [{ url: skin.image, alt: skin.name }];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black">
      {/* 返回按钮 */}
      <div className="container mx-auto px-4 py-6">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="text-zinc-400 hover:text-white"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          返回
        </Button>
      </div>

      <div className="container mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 左侧：媒体展示 */}
          <div className="lg:col-span-2">
            <Card className="bg-zinc-900/50 border-zinc-800 overflow-hidden">
              {/* 标签切换 */}
              {hasVideo && (
                <div className="flex border-b border-zinc-800">
                  <button
                    onClick={() => setActiveTab('images')}
                    className={`flex-1 px-6 py-3 text-sm font-medium transition-colors ${
                      activeTab === 'images'
                        ? 'bg-zinc-800 text-white'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    📷 图片展示 ({images.length})
                  </button>
                  <button
                    onClick={() => setActiveTab('video')}
                    className={`flex-1 px-6 py-3 text-sm font-medium transition-colors ${
                      activeTab === 'video'
                        ? 'bg-zinc-800 text-white'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    🎬 视频演示
                  </button>
                </div>
              )}

              {/* 媒体内容 */}
              <div className="p-6">
                {activeTab === 'images' ? (
                  <ImageCarousel images={images} />
                ) : (
                  <VideoPlayer src={skin.media?.videos?.[0] || ''} />
                )}
              </div>
            </Card>

            {/* 详细描述 */}
            <Card className="bg-zinc-900/50 border-zinc-800 mt-6 p-6">
              <h2 className="text-2xl font-bold text-white mb-4">详细介绍</h2>
              <p className="text-zinc-300 leading-relaxed mb-6">
                {skin.description}
              </p>

              {skin.features && skin.features.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">主要特性</h3>
                  <ul className="space-y-2">
                    {skin.features.map((feature, index) => (
                      <li key={index} className="flex items-start text-zinc-300">
                        <Star className="w-5 h-5 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </Card>
          </div>

          {/* 右侧：信息面板 */}
          <div className="space-y-6">
            {/* 基本信息卡片 */}
            <Card className="bg-zinc-900/50 border-zinc-800 p-6">
              {/* 标题和品质 */}
              <div className="mb-4">
                <h1 className={`text-3xl font-bold mb-2 ${getQualityTextClass(skin.quality)}`}>
                  {skin.name}
                </h1>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                    {skin.quality === 'epic' ? '史诗' : skin.quality === 'legendary' ? '传说' : '精良'}
                  </span>
                  <div className="flex items-center text-amber-500">
                    <Star className="w-4 h-4 fill-current mr-1" />
                    <span className="font-semibold">{skin.rating}</span>
                    <span className="text-xs text-zinc-400 ml-1">({skin.reviewCount})</span>
                  </div>
                </div>
              </div>

              {/* 统计数据 */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-2 text-sm">
                  <Heart className={`w-4 h-4 ${isLiked ? 'text-red-500 fill-current' : 'text-zinc-400'}`} />
                  <span className="text-zinc-300">{formatNumber(likes)}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Eye className="w-4 h-4 text-zinc-400" />
                  <span className="text-zinc-300">{formatNumber(skin.stats?.views || 0)}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Download className="w-4 h-4 text-zinc-400" />
                  <span className="text-zinc-300">{formatNumber(skin.downloads)}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MessageCircle className="w-4 h-4 text-zinc-400" />
                  <span className="text-zinc-300">{formatNumber(skin.stats?.comments || 0)}</span>
                </div>
              </div>

              {/* 操作按钮 */}
              <div className="space-y-3">
                <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-medium">
                  <Download className="w-4 h-4 mr-2" />
                  下载皮肤
                </Button>
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    onClick={toggleLike}
                    className={`border-zinc-700 ${
                      isLiked
                        ? 'bg-red-500/20 border-red-500/50 text-red-400 hover:bg-red-500/30'
                        : 'text-zinc-300 hover:bg-zinc-800'
                    }`}
                  >
                    <Heart className={`w-4 h-4 mr-2 ${isLiked ? 'fill-current' : ''}`} />
                    {isLiked ? '已喜欢' : '喜欢'}
                  </Button>
                  <Button variant="outline" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800">
                    <Share2 className="w-4 h-4 mr-2" />
                    分享
                  </Button>
                </div>
              </div>
            </Card>

            {/* 版本支持 */}
            <Card className="bg-zinc-900/50 border-zinc-800 p-6">
              <h3 className="text-lg font-semibold text-white mb-3">支持版本</h3>
              <div className="flex flex-wrap gap-2">
                {skin.versions.map((version) => (
                  <span
                    key={version}
                    className={`px-3 py-1 rounded-full text-sm border ${getVersionColor(version)}`}
                  >
                    {version === 'retail' ? '正式服' : version === 'classic' ? '60版' : '80版'}
                  </span>
                ))}
              </div>
            </Card>

            {/* 标签 */}
            <Card className="bg-zinc-900/50 border-zinc-800 p-6">
              <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                <Tag className="w-4 h-4 mr-2" />
                标签
              </h3>
              <div className="flex flex-wrap gap-2">
                {skin.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-sm bg-zinc-800/50 text-zinc-400 border border-zinc-700/50 hover:border-zinc-600 cursor-pointer transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Card>

            {/* 作者信息 */}
            {skin.author && (
              <Card className="bg-zinc-900/50 border-zinc-800 p-6">
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  作者
                </h3>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center text-xl">
                    👤
                  </div>
                  <div>
                    <div className="font-medium text-white">{skin.author.name}</div>
                    <div className="text-sm text-zinc-400">UI设计师</div>
                  </div>
                </div>
              </Card>
            )}

            {/* 更新时间 */}
            <Card className="bg-zinc-900/50 border-zinc-800 p-6">
              <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                更新信息
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-zinc-400">创建时间</span>
                  <span className="text-zinc-300">{formatRelativeTime(skin.createdAt)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">最后更新</span>
                  <span className="text-zinc-300">{formatRelativeTime(skin.updatedAt)}</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
