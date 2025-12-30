'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, Star, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/lib/i18n/use-translation';

interface HeroSlide {
  id: string | number;
  title: string;
  titleEn?: string;
  description?: string;
  descriptionEn?: string;
  image?: string;
  link?: string;
  linkText?: string;
  linkTextEn?: string;
  backgroundColor?: string;
  isHeroSlide?: boolean;
}

interface HeroCarouselProps {
  slides: HeroSlide[];
  autoPlayInterval?: number;
}

export default function HeroCarouselSection({ 
  slides, 
  autoPlayInterval = 8000 
}: HeroCarouselProps) {
  const { t, locale } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Guard against empty or undefined slides to avoid runtime errors
  if (!slides || slides.length === 0) {
    return null;
  }

  useEffect(() => {
    if (!isAutoPlaying || slides.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [slides.length, autoPlayInterval, isAutoPlaying]);

  // Clamp current index when slide count shrinks (e.g., removing slides)
  useEffect(() => {
    if (currentIndex >= slides.length) {
      setCurrentIndex(Math.max(slides.length - 1, 0));
    }
  }, [slides.length, currentIndex]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const scrollToNext = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  const currentSlide = slides[currentIndex];
  const isHero = currentSlide.isHeroSlide;

  return (
    <section 
      className="relative h-screen w-full overflow-hidden"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Slides Container */}
      {slides.map((slide, index) => {
        const isActive = index === currentIndex;
        const isHeroSlide = slide.isHeroSlide;
        
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            {isHeroSlide ? (
              // Hero Slide - 原来的Hero效果
              <div className="relative h-full w-full bg-black">
                {/* Epic WoW Raid Background */}
                <div className="absolute inset-0 z-0">
                  <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-black to-black" />
                  
                  {/* 战场光源 */}
                  <div className="absolute inset-0">
                    <div className="absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-radial from-orange-600/20 via-red-900/10 to-transparent blur-3xl" />
                    <div className="absolute left-1/2 top-1/3 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-radial from-blue-600/10 via-cyan-900/5 to-transparent blur-3xl" />
                  </div>

                  {/* 粒子效果 */}
                  <div className="absolute inset-0 opacity-40">
                    {[...Array(60)].map((_, i) => {
                      const isEmber = i % 3 === 0;
                      const isDust = i % 3 === 1;
                      const isMagic = i % 3 === 2;
                      
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
                              [null, (Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080)) - 200] :
                              [null, (Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080)) + 200],
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

                  {/* 烟雾和暗角 */}
                  <div className="absolute inset-0">
                    <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/80 via-gray-900/40 to-transparent" />
                  </div>
                  <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-60" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black opacity-80" />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                </div>

                {/* Hero Content */}
                <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
                  <motion.h1
                    className="mb-6 text-6xl font-bold leading-tight md:text-7xl lg:text-8xl"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-500 bg-clip-text text-transparent drop-shadow-2xl">
                      {slide.titleEn && locale === 'en-US' ? slide.titleEn : slide.title}
                    </span>
                  </motion.h1>

                  <motion.p
                    className="mb-12 max-w-3xl text-xl text-gray-300 md:text-2xl"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  >
                    {slide.descriptionEn && locale === 'en-US' ? slide.descriptionEn : slide.description}
                  </motion.p>

                  <motion.div
                    className="flex flex-col gap-4 sm:flex-row"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                  >
                    {slide.link && (
                      <Link href={slide.link}>
                        <Button
                          size="lg"
                          className="group bg-gradient-to-r from-yellow-500 to-orange-500 px-8 py-6 text-lg font-bold text-white shadow-2xl shadow-orange-500/50 transition-all hover:scale-105 hover:shadow-orange-500/70"
                        >
                          {slide.linkTextEn && locale === 'en-US' ? slide.linkTextEn : slide.linkText}
                          <ArrowRight className="ml-2 inline-block transition-transform group-hover:translate-x-1" />
                        </Button>
                      </Link>
                    )}
                  </motion.div>

                  {/* Stats */}
                  <motion.div
                    className="mt-16 flex flex-wrap items-center justify-center gap-8 text-gray-400"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                  >
                    <div className="flex items-center gap-2">
                      <Star className="h-5 w-5 fill-yellow-500 text-yellow-500" />
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
              </div>
            ) : (
              // 活动轮播 Slide
              <div 
                className="relative h-full w-full"
                style={{ backgroundColor: slide.backgroundColor || '#1a1a1a' }}
              >
                {slide.image && (
                  <>
                    <Image
                      src={slide.image}
                      alt={slide.title}
                      fill
                      className="object-cover"
                      priority={index === 1}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
                  </>
                )}

                <div className="relative h-full flex items-center">
                  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-2xl space-y-6">
                      <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white leading-tight drop-shadow-2xl">
                        {slide.title}
                      </h2>
                      
                      {slide.description && (
                        <p className="text-xl sm:text-2xl text-zinc-200 leading-relaxed drop-shadow-lg">
                          {slide.description}
                        </p>
                      )}

                      {slide.link && (
                        <div className="pt-4">
                          <Link
                            href={slide.link}
                            className="inline-flex items-center gap-2 px-8 py-4 bg-yellow-500 hover:bg-yellow-400 text-zinc-900 font-bold rounded-lg transition-all transform hover:scale-105 shadow-xl hover:shadow-yellow-500/50 text-lg"
                          >
                            <span>{slide.linkText || "了解更多"}</span>
                            <ArrowRight className="w-5 h-5" />
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}

      {/* Navigation Controls */}
      {slides.length > 1 && (
        <>
          {/* Arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20 w-14 h-14 bg-zinc-900/80 backdrop-blur-md border-2 border-zinc-700/50 rounded-full flex items-center justify-center text-white hover:bg-yellow-500 hover:border-yellow-500 hover:scale-110 transition-all opacity-0 hover:opacity-100 group-hover:opacity-100 shadow-xl"
          >
            <ChevronLeft className="w-7 h-7" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 w-14 h-14 bg-zinc-900/80 backdrop-blur-md border-2 border-zinc-700/50 rounded-full flex items-center justify-center text-white hover:bg-yellow-500 hover:border-yellow-500 hover:scale-110 transition-all opacity-0 hover:opacity-100 group-hover:opacity-100 shadow-xl"
          >
            <ChevronRight className="w-7 h-7" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3 bg-zinc-900/80 backdrop-blur-md px-6 py-3 rounded-full border border-zinc-700/50">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all ${
                  index === currentIndex
                    ? 'w-10 h-3 bg-gradient-to-r from-yellow-500 to-amber-600'
                    : 'w-3 h-3 bg-zinc-600 hover:bg-zinc-500'
                } rounded-full`}
              />
            ))}
          </div>

          {/* Counter */}
          <div className="absolute top-24 left-8 z-20">
            <div className="px-4 py-2 bg-zinc-900/80 backdrop-blur-md border border-zinc-700/50 rounded-full text-sm text-zinc-300 font-medium shadow-lg">
              {currentIndex + 1} / {slides.length}
            </div>
          </div>
        </>
      )}

      {/* Scroll Indicator - Only show on Hero slide */}
      {isHero && (
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
      )}
    </section>
  );
}
