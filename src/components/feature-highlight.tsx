'use client';

import { motion } from 'framer-motion';
import { Palette, Zap, Wrench, Monitor, RefreshCw, MessageCircle } from 'lucide-react';
import { useTranslation } from '@/lib/i18n/use-translation';

const FEATURES = [
  {
    icon: Palette,
    title: { zh: '专业美术设计', en: 'Professional Design' },
    description: { zh: '每一款皮肤都经过精心打磨，兼顾美观与实用性', en: 'Every skin is carefully crafted, balancing beauty and practicality' },
    color: 'text-yellow-500',
  },
  {
    icon: Zap,
    title: { zh: '轻量高效', en: 'Lightweight & Efficient' },
    description: { zh: '优化代码，确保不影响游戏帧数，流畅运行', en: 'Optimized code ensures smooth gameplay without affecting frame rate' },
    color: 'text-blue-500',
  },
  {
    icon: Wrench,
    title: { zh: '灵活配置', en: 'Flexible Configuration' },
    description: { zh: '提供丰富的自定义选项，打造专属于你的界面', en: 'Rich customization options to create your unique interface' },
    color: 'text-orange-500',
  },
  {
    icon: Monitor,
    title: { zh: '完美适配', en: 'Perfect Compatibility' },
    description: { zh: '支持1080p到4K各种分辨率，自动缩放', en: 'Supports all resolutions from 1080p to 4K with auto-scaling' },
    color: 'text-green-500',
  },
  {
    icon: RefreshCw,
    title: { zh: '免费更新', en: 'Free Updates' },
    description: { zh: '跟随游戏版本更新，终身免费升级', en: 'Follow game version updates with lifetime free upgrades' },
    color: 'text-purple-500',
  },
  {
    icon: MessageCircle,
    title: { zh: '活跃社区', en: 'Active Community' },
    description: { zh: '专业客服和活跃社区，随时解答你的问题', en: 'Professional support and active community ready to help' },
    color: 'text-pink-500',
  },
];

function FeatureHighlight() {
  const { t, locale } = useTranslation();
  return (
    <section className="bg-gradient-to-b from-black via-gray-950 to-black py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-4 text-5xl font-bold text-white">{t('features.title')}</h2>
          <p className="text-xl text-gray-400">{t('features.subtitle')}</p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, index) => (
            <motion.div
              key={index}
              className="group relative overflow-hidden rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900/50 to-gray-900/30 p-8 backdrop-blur-sm transition-all hover:-translate-y-2 hover:border-gray-700 hover:shadow-2xl hover:shadow-gray-600/10"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {/* Icon + Title */}
              <div className="mb-4 flex items-center gap-4">
                <motion.div
                  className="flex h-14 w-14 items-center justify-center rounded-xl bg-gray-800/40"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <feature.icon className={`h-10 w-10 ${feature.color}`} />
                </motion.div>
                <h3 className="text-2xl font-bold text-white">{locale === 'en-US' ? feature.title.en : feature.title.zh}</h3>
              </div>

              {/* Content */}
              <p className="text-gray-400">{locale === 'en-US' ? feature.description.en : feature.description.zh}</p>

              {/* Decorative gradient */}
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br from-gray-600/10 to-transparent opacity-0 blur-3xl transition-opacity group-hover:opacity-100" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeatureHighlight;
