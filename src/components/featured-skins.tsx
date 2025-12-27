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

export function FeaturedSkins() {
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
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900" />
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
