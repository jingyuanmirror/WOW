'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Eye, ShoppingCart, Sparkles, Zap, Smartphone } from 'lucide-react';
import Link from 'next/link';

const FEATURED_SKINS = [
  {
    id: 1,
    name: '暗影之刃',
    description: '专为竞技场PvP设计，突出技能冷却和敌方施法条',
    price: 19.99,
    quality: 'legendary',
    image: '/images/skin-1.jpg',
    features: ['高度自定义', '性能优化', '多分辨率适配'],
  },
  {
    id: 2,
    name: '圣光守护',
    description: '治疗专精界面，清晰的团队框架和法术监控',
    price: 24.99,
    quality: 'epic',
    image: '/images/skin-2.jpg',
    features: ['高度自定义', '性能优化', '多分辨率适配'],
  },
  {
    id: 3,
    name: '狂怒之心',
    description: 'DPS输出专用，伤害统计和增益监控一目了然',
    price: 19.99,
    quality: 'epic',
    image: '/images/skin-3.jpg',
    features: ['高度自定��', '性能优化', '多分辨率适配'],
  },
  {
    id: 4,
    name: '冰霜纪元',
    description: '极简设计风格，适合专注游戏的玩家',
    price: 0,
    quality: 'rare',
    image: '/images/skin-4.jpg',
    features: ['高度自定义', '性能优化', '多分辨率适配'],
  },
  {
    id: 5,
    name: '翡翠梦境',
    description: '自然系主题，适合德鲁伊职业',
    price: 22.99,
    quality: 'epic',
    image: '/images/skin-5.jpg',
    features: ['高度自定义', '性能优化', '多分辨率适配'],
  },
  {
    id: 6,
    name: '虚空领主',
    description: '暗黑风格，突出暗影系技能特效',
    price: 24.99,
    quality: 'legendary',
    image: '/images/skin-6.jpg',
    features: ['高度自定义', '性能优化', '多分辨率适配'],
  },
];

const QUALITY_COLORS = {
  legendary: 'from-orange-500 to-yellow-500',
  epic: 'from-purple-500 to-pink-500',
  rare: 'from-blue-500 to-cyan-500',
  uncommon: 'from-green-500 to-emerald-500',
};

const QUALITY_LABELS = {
  legendary: '传说',
  epic: '史诗',
  rare: '精良',
  uncommon: '优秀',
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
          <h2 className="mb-4 text-5xl font-bold text-white">精选作品</h2>
          <p className="text-xl text-gray-400">专为不同职业和玩法风格打造</p>
        </motion.div>

        {/* Skins Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {FEATURED_SKINS.map((skin, index) => (
            <motion.div
              key={skin.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="group overflow-hidden border-gray-800 bg-gray-900/50 backdrop-blur-sm transition-all hover:-translate-y-2 hover:border-gray-700 hover:shadow-2xl hover:shadow-gray-600/10">
                {/* Image */}
                <div className="relative aspect-video overflow-hidden">
                  {/* 模拟真实的魔兽世界UI界面截图背景 */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${getThemeColors(skin.id).bg}`}>
                    {/* 模拟游戏界面元素 */}
                    <div className="absolute inset-0 opacity-30">
                      {/* 网格背景 */}
                      <div className="absolute inset-0" style={{
                        backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
                        backgroundSize: '20px 20px'
                      }} />
                    </div>
                    
                    {/* 模拟UI框架轮廓 */}
                    <div className={`absolute left-4 top-4 h-12 w-32 rounded border border-${getThemeColors(skin.id).accent}/20 bg-black/40 backdrop-blur-sm`}>
                      {/* 模拟玩家头像 */}
                      <div className={`m-1 h-10 w-10 rounded-full border border-${getThemeColors(skin.id).accent}/30 bg-gradient-to-br from-gray-700 to-gray-800`} />
                    </div>
                    <div className={`absolute right-4 top-4 h-12 w-32 rounded border border-${getThemeColors(skin.id).accent}/20 bg-black/40 backdrop-blur-sm`}>
                      {/* 模拟目标头像 */}
                      <div className={`m-1 ml-auto h-10 w-10 rounded-full border border-red-500/30 bg-gradient-to-br from-red-900 to-gray-800`} />
                    </div>
                    <div className={`absolute bottom-4 left-1/2 h-16 w-64 -translate-x-1/2 rounded border border-${getThemeColors(skin.id).accent}/20 bg-black/40 backdrop-blur-sm`} />
                    
                    {/* 模拟技能图标 - 根据主题变色 */}
                    <div className="absolute bottom-6 left-6 flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={`h-8 w-8 rounded border border-${getThemeColors(skin.id).accent}/40 bg-gradient-to-br from-${getThemeColors(skin.id).accent}/30 to-black/60 backdrop-blur-sm`}
                          style={{
                            boxShadow: `0 0 10px rgba(var(--${getThemeColors(skin.id).accent}), 0.3)`
                          }}
                        />
                      ))}
                    </div>
                    
                    {/* 模拟血条/能量条 - 使用主题色 */}
                    <div className="absolute left-4 top-20 h-2 w-40 overflow-hidden rounded-full bg-black/60 shadow-inner">
                      <div className={`h-full w-[85%] bg-gradient-to-r from-red-600 to-red-500 shadow-lg`} 
                           style={{ boxShadow: '0 0 8px rgba(220, 38, 38, 0.6)' }} />
                    </div>
                    <div className="absolute left-4 top-24 h-2 w-40 overflow-hidden rounded-full bg-black/60 shadow-inner">
                      <div className={`h-full w-[60%] bg-gradient-to-r from-${getThemeColors(skin.id).bar2} to-${getThemeColors(skin.id).bar1}`}
                           style={{ boxShadow: `0 0 8px rgba(var(--${getThemeColors(skin.id).bar1}), 0.6)` }} />
                    </div>
                    
                    {/* 中心光效 */}
                    <div className={`absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-${getThemeColors(skin.id).accent}/10 blur-2xl`} />
                    
                    {/* 品质光效 */}
                    <div className={`absolute inset-0 bg-gradient-to-t ${
                      skin.quality === 'legendary' ? 'from-orange-500/10' :
                      skin.quality === 'epic' ? 'from-purple-500/10' :
                      'from-blue-500/10'
                    } via-transparent to-transparent`} />
                  </div>
                  
                  <div className={`absolute left-4 top-4 rounded-full bg-gradient-to-r ${QUALITY_COLORS[skin.quality as keyof typeof QUALITY_COLORS]} px-3 py-1 text-xs font-bold text-white shadow-lg`}>
                    {QUALITY_LABELS[skin.quality as keyof typeof QUALITY_LABELS]}
                  </div>
                  
                  {/* Quick View Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity group-hover:opacity-100">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-white/30 bg-white/10 text-white backdrop-blur-sm hover:bg-white hover:text-black"
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      快速预览
                    </Button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="mb-2 text-2xl font-bold text-white">{skin.name}</h3>
                  <p className="mb-4 line-clamp-2 text-sm text-gray-400">
                    {skin.description}
                  </p>

                  {/* Features */}
                  <div className="mb-4 flex gap-3">
                    <div className="group/icon relative">
                      <Sparkles className="h-5 w-5 text-yellow-500" />
                      <span className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-black px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover/icon:opacity-100">
                        高度自定义
                      </span>
                    </div>
                    <div className="group/icon relative">
                      <Zap className="h-5 w-5 text-blue-500" />
                      <span className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-black px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover/icon:opacity-100">
                        性能优化
                      </span>
                    </div>
                    <div className="group/icon relative">
                      <Smartphone className="h-5 w-5 text-green-500" />
                      <span className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-black px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover/icon:opacity-100">
                        多分辨率适配
                      </span>
                    </div>
                  </div>

                  {/* Price and Actions */}
                  <div className="flex items-center justify-between">
                    <div>
                      {skin.price === 0 ? (
                        <span className="text-2xl font-bold text-green-400">免费</span>
                      ) : (
                        <span className="text-2xl font-bold text-gray-200">
                          ${skin.price.toFixed(2)}
                        </span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-700 text-white hover:bg-white/10"
                      >
                        查看详情
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
              探索全部 50+ 款皮肤 →
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default FeaturedSkins;
