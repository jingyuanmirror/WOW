'use client';

import { motion } from 'framer-motion';
import { Palette, Zap, Wrench, Monitor, RefreshCw, MessageCircle } from 'lucide-react';

const FEATURES = [
  {
    icon: Palette,
    title: '专业美术设计',
    description: '每一款皮肤都经过精心打磨，兼顾美观与实用性',
    color: 'text-yellow-500',
  },
  {
    icon: Zap,
    title: '轻量高效',
    description: '优化代码，确保不影响游戏帧数，流畅运行',
    color: 'text-blue-500',
  },
  {
    icon: Wrench,
    title: '灵活配置',
    description: '提供丰富的自定义选项，打造专属于你的界面',
    color: 'text-orange-500',
  },
  {
    icon: Monitor,
    title: '完美适配',
    description: '支持1080p到4K各种分辨率，自动缩放',
    color: 'text-green-500',
  },
  {
    icon: RefreshCw,
    title: '免费更新',
    description: '跟随游戏版本更新，终身免费升级',
    color: 'text-purple-500',
  },
  {
    icon: MessageCircle,
    title: '活跃社区',
    description: '专业客服和活跃社区，随时解答你的问题',
    color: 'text-pink-500',
  },
];

function FeatureHighlight() {
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
          <h2 className="mb-4 text-5xl font-bold text-white">为什么选择我们的UI皮肤</h2>
          <p className="text-xl text-gray-400">专业设计，极致体验</p>
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
              {/* Icon */}
              <motion.div
                className="mb-6"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <feature.icon className={`h-16 w-16 ${feature.color}`} />
              </motion.div>

              {/* Content */}
              <h3 className="mb-3 text-2xl font-bold text-white">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>

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
