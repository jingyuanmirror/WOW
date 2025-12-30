"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export interface PromoSlide {
  id: string | number;
  title: string;
  description?: string;
  image: string;
  link?: string;
  linkText?: string;
  backgroundColor?: string;
}

interface PromoCarouselProps {
  slides: PromoSlide[];
  autoPlayInterval?: number;
  height?: string;
}

export default function PromoCarousel({ 
  slides, 
  autoPlayInterval = 5000,
  height = "500px"
}: PromoCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying || slides.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [slides.length, autoPlayInterval, isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
  };

  if (slides.length === 0) return null;

  const currentSlide = slides[currentIndex];

  return (
    <div 
      className="relative w-full overflow-hidden group border-b-4 border-yellow-500/30"
      style={{ height }}
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Slides Container */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-700 ease-in-out ${
              index === currentIndex
                ? 'opacity-100 scale-100 z-10'
                : 'opacity-0 scale-105 z-0'
            }`}
            style={{
              backgroundColor: slide.backgroundColor || '#1a1a1a'
            }}
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover"
                priority={index === 0}
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative h-full flex items-center">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl space-y-2 sm:space-y-4">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight drop-shadow-2xl">
                    {slide.title}
                  </h2>
                  
                  {slide.description && (
                    <p className="text-sm sm:text-base md:text-lg text-zinc-200 leading-relaxed drop-shadow-lg line-clamp-2">
                      {slide.description}
                    </p>
                  )}

                  {slide.link && (
                    <div className="pt-2">
                      <Link
                        href={slide.link}
                        className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-yellow-500 hover:bg-yellow-400 text-zinc-900 font-bold rounded-lg transition-all transform hover:scale-105 shadow-xl hover:shadow-yellow-500/50 text-sm sm:text-base"
                      >
                        <span>{slide.linkText || "了解更多"}</span>
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows - Only show if more than 1 slide */}
      {slides.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 bg-zinc-900/80 backdrop-blur-md border-2 border-zinc-700/50 rounded-full flex items-center justify-center text-white hover:bg-yellow-500 hover:border-yellow-500 hover:scale-110 transition-all opacity-0 group-hover:opacity-100 shadow-xl"
            aria-label="上一张"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 bg-zinc-900/80 backdrop-blur-md border-2 border-zinc-700/50 rounded-full flex items-center justify-center text-white hover:bg-yellow-500 hover:border-yellow-500 hover:scale-110 transition-all opacity-0 group-hover:opacity-100 shadow-xl"
            aria-label="下一张"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </>
      )}

      {/* Dots Indicator - 轮播指示器 */}
      {slides.length > 1 && (
        <div 
          className="absolute left-1/2 -translate-x-1/2 z-10 flex gap-1.5 sm:gap-2 bg-zinc-900/80 backdrop-blur-md px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-zinc-700/50 shadow-xl"
          style={{ bottom: '200px' }}
        >
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all ${
                index === currentIndex
                  ? 'w-6 sm:w-8 h-1.5 sm:h-2 bg-gradient-to-r from-yellow-500 to-amber-600 shadow-lg shadow-yellow-500/50'
                  : 'w-1.5 sm:w-2 h-1.5 sm:h-2 bg-zinc-600 hover:bg-zinc-500'
              } rounded-full`}
              aria-label={`跳转到第 ${index + 1} 张`}
            />
          ))}
        </div>
      )}

      {/* Auto-play Indicator */}
      {isAutoPlaying && slides.length > 1 && (
        <div className="absolute top-2 sm:top-4 right-2 sm:right-4 z-20">
          <div className="px-2 sm:px-3 py-1 sm:py-1.5 bg-zinc-900/80 backdrop-blur-md border border-zinc-700/50 rounded-full text-xs text-zinc-300 flex items-center gap-1.5 shadow-lg">
            <div className="relative">
              <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-ping absolute" />
              <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full" />
            </div>
            <span className="font-medium hidden sm:inline">自动播放</span>
          </div>
        </div>
      )}

      {/* Slide Counter */}
      {slides.length > 1 && (
        <div className="absolute top-2 sm:top-4 left-2 sm:left-4 z-20">
          <div className="px-2 sm:px-3 py-1 sm:py-1.5 bg-zinc-900/80 backdrop-blur-md border border-zinc-700/50 rounded-full text-xs text-zinc-300 font-medium shadow-lg">
            {currentIndex + 1} / {slides.length}
          </div>
        </div>
      )}
    </div>
  );
}
