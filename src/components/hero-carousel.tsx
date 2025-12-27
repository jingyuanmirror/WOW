"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Palette } from "lucide-react";

interface CarouselItem {
  id: number | string;
  name: string;
  image?: string;
  quality: string;
  description?: string;
}

interface HeroCarouselProps {
  items: CarouselItem[];
  autoPlayInterval?: number;
}

export function HeroCarousel({ items, autoPlayInterval = 6000 }: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying || items.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [items.length, autoPlayInterval, isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
    setIsAutoPlaying(false);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
    setIsAutoPlaying(false);
  };

  const getQualityColor = (quality: string) => {
    switch (quality) {
      case 'legendary':
        return {
          gradient: 'from-orange-500 via-yellow-500 to-orange-600',
          glow: 'shadow-orange-500/50',
          text: '传说品质'
        };
      case 'epic':
        return {
          gradient: 'from-purple-500 via-pink-500 to-purple-600',
          glow: 'shadow-purple-500/50',
          text: '史诗品质'
        };
      case 'rare':
        return {
          gradient: 'from-blue-500 via-cyan-500 to-blue-600',
          glow: 'shadow-blue-500/50',
          text: '精良品质'
        };
      default:
        return {
          gradient: 'from-green-500 via-emerald-500 to-green-600',
          glow: 'shadow-green-500/50',
          text: '优秀品质'
        };
    }
  };

  if (items.length === 0) return null;

  const currentItem = items[currentIndex];
  const qualityInfo = getQualityColor(currentItem.quality);

  return (
    <div className="relative w-full h-full group">
      {/* Main Carousel Display */}
      <div className="relative w-full h-full overflow-hidden">
        {items.map((item, index) => {
          const itemQuality = getQualityColor(item.quality);
          return (
            <div
              key={item.id}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                index === currentIndex
                  ? 'opacity-100 scale-100 z-10'
                  : 'opacity-0 scale-105 z-0'
              }`}
            >
              {/* Animated Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${itemQuality.gradient} opacity-15 animate-gradient`} 
                   style={{ backgroundSize: '200% 200%' }} />
              
              {/* Radial Glow */}
              <div className="absolute inset-0">
                <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r ${itemQuality.gradient} opacity-20 blur-[120px] animate-pulse`} />
              </div>

              {/* Grid Pattern */}
              <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />

              {/* Center Preview Card - Made more visible with brighter colors */}
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <div className={`relative w-full max-w-4xl aspect-video bg-gradient-to-br ${itemQuality.gradient} p-1 rounded-3xl ${itemQuality.glow} shadow-2xl overflow-hidden transform hover:scale-105 transition-all duration-500`}>
                  {/* Inner card with dark background */}
                  <div className="relative w-full h-full bg-zinc-900 rounded-3xl overflow-hidden">
                    {/* Animated gradient overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${itemQuality.gradient} opacity-20 animate-gradient`} 
                         style={{ backgroundSize: '200% 200%' }} />
                    
                    {/* Grid Pattern */}
                    <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
                    
                    {/* Content */}
                    <div className="relative h-full flex flex-col items-center justify-center p-12 text-center">
                      {/* Icon */}
                      <div className={`w-40 h-40 rounded-3xl bg-gradient-to-br ${itemQuality.gradient} p-1 mb-8 ${itemQuality.glow} shadow-2xl animate-pulse`}>
                        <div className="w-full h-full bg-zinc-900 rounded-3xl flex items-center justify-center">
                          <Palette className="w-20 h-20 text-white" />
                        </div>
                      </div>
                      
                      {/* Title */}
                      <h3 className="text-6xl font-bold text-white mb-4 tracking-tight drop-shadow-2xl">
                        {item.name}
                      </h3>
                    
                      {/* Quality Badge */}
                      <div className={`inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r ${itemQuality.gradient} rounded-full ${itemQuality.glow} shadow-lg mb-6`}>
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                        <span className="text-white font-bold text-sm uppercase tracking-wider">
                          {itemQuality.text}
                        </span>
                      </div>

                      {/* Description */}
                      {item.description && (
                        <p className="text-zinc-300 text-lg max-w-xl leading-relaxed">
                          {item.description}
                        </p>
                      )}
                    </div>

                    {/* Corner Decorations */}
                    <div className={`absolute top-0 left-0 w-24 h-24 bg-gradient-to-br ${itemQuality.gradient} opacity-20 blur-2xl`} />
                    <div className={`absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl ${itemQuality.gradient} opacity-20 blur-2xl`} />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-8 top-1/2 -translate-y-1/2 z-20 w-14 h-14 bg-zinc-900/90 backdrop-blur-md border-2 border-zinc-700/50 rounded-full flex items-center justify-center text-white hover:bg-zinc-800 hover:border-yellow-500/50 hover:scale-110 transition-all opacity-0 group-hover:opacity-100 shadow-xl"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-7 h-7" />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-8 top-1/2 -translate-y-1/2 z-20 w-14 h-14 bg-zinc-900/90 backdrop-blur-md border-2 border-zinc-700/50 rounded-full flex items-center justify-center text-white hover:bg-zinc-800 hover:border-yellow-500/50 hover:scale-110 transition-all opacity-0 group-hover:opacity-100 shadow-xl"
        aria-label="Next slide"
      >
        <ChevronRight className="w-7 h-7" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex gap-3 bg-zinc-900/80 backdrop-blur-md px-6 py-3 rounded-full border border-zinc-700/50">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all ${
              index === currentIndex
                ? 'w-10 h-3 bg-gradient-to-r from-yellow-500 to-amber-600'
                : 'w-3 h-3 bg-zinc-600 hover:bg-zinc-500'
            } rounded-full`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Auto-play Indicator */}
      {isAutoPlaying && (
        <div className="absolute top-8 right-8 z-20">
          <div className="px-4 py-2 bg-zinc-900/90 backdrop-blur-md border border-zinc-700/50 rounded-full text-sm text-zinc-300 flex items-center gap-2 shadow-lg">
            <div className="relative">
              <div className="w-2 h-2 bg-yellow-500 rounded-full animate-ping absolute" />
              <div className="w-2 h-2 bg-yellow-500 rounded-full" />
            </div>
            <span className="font-medium">自动播放</span>
          </div>
        </div>
      )}

      {/* Slide Counter */}
      <div className="absolute top-8 left-8 z-20">
        <div className="px-4 py-2 bg-zinc-900/90 backdrop-blur-md border border-zinc-700/50 rounded-full text-sm text-zinc-300 font-medium shadow-lg">
          {currentIndex + 1} / {items.length}
        </div>
      </div>
    </div>
  );
}

