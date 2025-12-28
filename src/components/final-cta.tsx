'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useTranslation } from '@/lib/i18n/use-translation';

function FinalCTA() {
  const { t } = useTranslation();
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black py-24">
      {/* Animated background */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-2 w-2 rounded-full bg-gray-600/30"
            initial={{
              x: Math.random() * 100 + '%',
              y: Math.random() * 100 + '%',
            }}
            animate={{
              y: [null, (Math.random() - 0.5) * 200],
              x: [null, (Math.random() - 0.5) * 200],
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Icon */}
          <motion.div
            className="mx-auto mb-8 inline-flex"
            animate={{
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <Sparkles className="h-16 w-16 text-gray-300" />
          </motion.div>

          {/* Title */}
          <h2 className="mb-6 text-5xl font-bold text-white md:text-6xl">
            {t('cta.title')}
          </h2>

          {/* Subtitle */}
          <p className="mb-12 text-xl text-gray-300 md:text-2xl">
            {t('cta.subtitle')}
          </p>

          {/* Buttons */}
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link href="/skins">
              <Button
                size="lg"
                className="group bg-gradient-to-r from-gray-700 to-gray-800 px-10 py-7 text-lg font-bold text-white shadow-2xl transition-all hover:scale-105 hover:from-gray-600 hover:to-gray-700"
              >
                {t('cta.explore')}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>

            <Link href="/skins?filter=free">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-gray-600 bg-transparent px-10 py-7 text-lg font-bold text-gray-200 transition-all hover:border-gray-500 hover:bg-gray-800/50"
              >
                {t('cta.contact')}
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Decorative corners */}
      <div className="absolute left-0 top-0 h-32 w-32 border-l-4 border-t-4 border-gray-700/30" />
      <div className="absolute bottom-0 right-0 h-32 w-32 border-b-4 border-r-4 border-gray-700/30" />
    </section>
  );
}

export default FinalCTA;
