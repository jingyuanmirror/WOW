'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/lib/i18n/use-translation';

function HeroSection() {
  const { t } = useTranslation();
  const scrollToNext = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* Epic WoW Raid Background - 史诗突袭场景 */}
      <div className="absolute inset-0 z-0">
        {/* 深色背景基底 */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-black to-black" />
        
        {/* 模拟战场光源 - 中心神秘光芒 */}
        <div className="absolute inset-0">
          <div className="absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-radial from-orange-600/20 via-red-900/10 to-transparent blur-3xl" />
          <div className="absolute left-1/2 top-1/3 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-radial from-blue-600/10 via-cyan-900/5 to-transparent blur-3xl" />
        </div>

        {/* 魔法粒子、灰尘和余烬效果 */}
        <div className="absolute inset-0 opacity-40">
          {[...Array(60)].map((_, i) => {
            const isEmber = i % 3 === 0; // 每3个粒子中有1个是余烬
            const isDust = i % 3 === 1; // 灰尘
            const isMagic = i % 3 === 2; // 魔法粒子
            
            return (
              <motion.div
                key={i}
                className={`absolute rounded-full ${
                  isEmber ? 'bg-orange-500/60 w-1 h-1' :
                  isDust ? 'bg-gray-400/30 w-0.5 h-0.5' :
                  'bg-cyan-400/50 w-1.5 h-1.5'
                }`}
                style={{
                  boxShadow: isEmber ? '0 0 8px rgba(255,100,0,0.5)' :
                             isMagic ? '0 0 10px rgba(0,200,255,0.4)' : 'none',
                }}
                initial={{
                  x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
                  y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080),
                  opacity: Math.random() * 0.6 + 0.2,
                }}
                animate={{
                  y: isEmber ? 
                    [null, (Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080)) - 200] : // 余烬上升
                    [null, (Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080)) + 200], // 灰尘下落
                  x: [null, Math.random() * 100 - 50],
                  opacity: [null, 0],
                  scale: isMagic ? [1, 1.5, 0] : 1,
                }}
                transition={{
                  duration: isEmber ? Math.random() * 8 + 4 : Math.random() * 12 + 6,
                  repeat: Infinity,
                  ease: 'linear',
                  delay: Math.random() * 3,
                }}
              />
            );
          })}
        </div>

        {/* 战场烟雾效果 */}
        <div className="absolute inset-0">
          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/80 via-gray-900/40 to-transparent" />
        </div>

        {/* 强烈的边缘暗角效果 */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black opacity-80" />
        </div>

        {/* 战士剪影暗示（底部中央） */}
        <div className="absolute bottom-0 left-1/2 h-1/4 w-32 -translate-x-1/2 bg-gradient-to-t from-black via-gray-900/50 to-transparent opacity-80 blur-sm" />
        
        {/* 文字区域保护遮罩 */}
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
        <motion.h1
          className="mb-6 text-6xl font-bold leading-tight md:text-7xl lg:text-8xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-500 bg-clip-text text-transparent drop-shadow-2xl">
            {t('hero.title')}
          </span>
        </motion.h1>

        <motion.p
          className="mb-12 max-w-3xl text-xl text-gray-300 md:text-2xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {t('hero.subtitle')}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col gap-4 sm:flex-row"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Button
            size="lg"
            className="group bg-gradient-to-r from-yellow-500 to-orange-500 px-8 py-6 text-lg font-bold text-white shadow-2xl shadow-orange-500/50 transition-all hover:scale-105 hover:shadow-orange-500/70"
          >
            {t('hero.cta')}
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>

          {/* 观看演示视频 按钮已移除 */}
        </motion.div>

        {/* Social Proof */}
        <motion.div
          className="mt-16 flex flex-wrap items-center justify-center gap-8 text-gray-400"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          <div className="flex items-center gap-2">
            <span className="text-3xl font-bold text-gray-200">100,000+</span>
            <span className="text-sm">{t('hero.stats.activeUsers')}</span>
          </div>
          <div className="hidden h-8 w-px bg-gray-700 sm:block" />
          <div className="flex items-center gap-2">
            <span className="text-3xl font-bold text-gray-200">50+</span>
            <span className="text-sm">{t('hero.stats.totalSkins')}</span>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2 text-gray-500 transition-colors hover:text-gray-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{
          opacity: { duration: 0.8, delay: 1.2 },
          y: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
        }}
      >
        <span className="text-sm">{t('common.viewMore')}</span>
        <ChevronDown className="h-6 w-6" />
      </motion.button>
    </section>
  );
}

export default HeroSection;
