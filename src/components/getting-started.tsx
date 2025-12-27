'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Download, FolderOpen, CheckCircle, PlayCircle } from 'lucide-react';

const STEPS = [
  {
    number: '01',
    icon: Download,
    title: '选择并下载',
    description: '浏览作品集，选择喜欢的皮肤，完成购买后立即获得下载链接',
  },
  {
    number: '02',
    icon: FolderOpen,
    title: '安装到游戏',
    description: '解压文件，复制到魔兽世界的 Interface/AddOns 目录',
  },
  {
    number: '03',
    icon: CheckCircle,
    title: '启用并享受',
    description: '启动游戏，在插件列表中启用，开始你的全新界面体验',
  },
];

export function GettingStarted() {
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
          <h2 className="mb-4 text-5xl font-bold text-white">三步开始使用</h2>
          <p className="text-xl text-gray-400">简单易用，5分钟完成安装</p>
        </motion.div>

        {/* Steps */}
        <div className="relative mx-auto max-w-6xl">
          {/* Connection Lines */}
          <div className="absolute left-0 right-0 top-32 hidden h-0.5 bg-gradient-to-r from-transparent via-yellow-500/30 to-transparent lg:block" />

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            {STEPS.map((step, index) => (
              <motion.div
                key={index}
                className="relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                {/* Step Number */}
                <div className="mb-6 text-center">
                  <span className="text-7xl font-bold text-white/10">{step.number}</span>
                </div>

              {/* Icon */}
              <motion.div
                className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-gray-600 to-gray-700 shadow-2xl shadow-gray-800/50"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <step.icon className="h-12 w-12 text-white" />
              </motion.div>                {/* Content */}
                <div className="text-center">
                  <h3 className="mb-3 text-2xl font-bold text-white">{step.title}</h3>
                  <p className="text-gray-400">{step.description}</p>
                </div>

                {/* Arrow for desktop */}
                {index < STEPS.length - 1 && (
                  <div className="absolute -right-6 top-32 hidden text-yellow-500/30 lg:block">
                    <svg
                      className="h-8 w-12"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Buttons */}
        <motion.div
          className="mt-16 flex flex-col items-center justify-center gap-4 sm:flex-row"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Button
            variant="link"
            className="text-lg text-gray-400 hover:text-gray-200"
          >
            查看详细安装文档 →
          </Button>

          <span className="text-gray-600">|</span>

          <Button
            variant="link"
            className="text-lg text-gray-400 hover:text-gray-200"
          >
            <PlayCircle className="mr-2 h-5 w-5" />
            观看视频教程
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
