'use client';

import { useEffect } from 'react';
import Link from "next/link";
import { 
  Star, Download, Users, Sparkles, ArrowRight, Palette, Zap, Settings, 
  Monitor, Mail, Twitter, Youtube, Check, Eye, ArrowDown, Smartphone,
  User, RefreshCw, MessageCircle, ShoppingCart, Search, ChevronDown, Award
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { skins, designer, testimonials, installSteps } from "@/lib/data";
import Navbar from "@/components/navbar";
import { useTranslation } from "@/lib/i18n/use-translation";
import { useLanguageStore } from "@/lib/stores/language-store";

export default function HomePage() {
  const { t, locale } = useTranslation();
  const featuredSkins = skins.filter(skin => skin.featured).slice(0, 6);
  
  console.log('[HomePage] Rendering with locale:', locale);
  
  // Force re-render when locale changes
  useEffect(() => {
    console.log('[HomePage] Locale changed to:', locale);
  }, [locale]);

  const stats = {
    activeUsers: "100,000+",
    totalSkins: "50+",
    totalDownloads: "1,000,000+"
  };

  return (
    <div className="min-h-screen bg-[url('/wow-bg.svg')] bg-cover bg-center bg-fixed" style={{backgroundColor: '#0b0b0b'}}>
      {/* DEBUG INFO */}
      <div style={{
        position: 'fixed',
        top: '100px',
        right: '20px',
        background: 'red',
        color: 'white',
        padding: '20px',
        zIndex: 9999,
        border: '3px solid yellow'
      }}>
        <div>Current Locale: {locale}</div>
        <div>Hero Title: {t('hero.title')}</div>
        <div>Component: home-page.tsx</div>
      </div>
      
      {/* 导航栏 */}
      <Navbar />

      {/* Hero 区域 */}
      <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-zinc-950/20 to-zinc-950/30 z-0 pointer-events-none"></div>

        <div className="container mx-auto max-w-6xl relative z-10 py-20">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-6 py-2 bg-yellow-500/10 border border-yellow-500/30 rounded-full text-yellow-400 text-sm backdrop-blur-sm">
              <Star className="w-4 h-4 fill-yellow-400" />
              <span className="font-medium">{stats.activeUsers} {t('hero.stats.activeUsers')}</span>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight">
              <span className="block bg-gradient-to-r from-yellow-200 via-yellow-400 to-amber-600 bg-clip-text text-transparent drop-shadow-2xl">
                {t('hero.title')}
              </span>
              <span className="block text-white mt-2 drop-shadow-2xl">{t('hero.subtitle')}</span>
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl text-zinc-300 max-w-3xl mx-auto leading-relaxed">
              <span className="text-white font-semibold">{t('features.professional.title')}</span> | <span className="text-white font-semibold">{t('features.simple.title')}</span> | <span className="text-white font-semibold">{t('features.updates.title')}</span>
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
              <Link href="/skins">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-zinc-950 font-bold px-8 py-6 text-lg rounded-xl shadow-2xl shadow-yellow-500/50 hover:shadow-yellow-500/70 transition-all hover:scale-105"
                >
                  {t('hero.cta')}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 精选作品 */}
      <section className="py-24 px-4 bg-zinc-900/50" id="featured">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {t('featuredSkins.title')}
            </h2>
            <p className="text-xl text-zinc-400">
              {t('featuredSkins.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredSkins.map((skin) => (
              <Card 
                key={skin.id}
                className="group bg-zinc-900/50 border-zinc-800 hover:border-yellow-500/50 overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-yellow-500/20"
              >
                <div className="relative aspect-video overflow-hidden bg-zinc-800">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-zinc-900/90 z-10"></div>
                  
                  <div className={`absolute top-4 left-4 z-20 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm ${
                    skin.quality === 'legendary' ? 'bg-orange-500/90 text-white' :
                    skin.quality === 'epic' ? 'bg-purple-500/90 text-white' :
                    skin.quality === 'rare' ? 'bg-blue-500/90 text-white' :
                    'bg-green-500/90 text-white'
                  }`}>
                    {t(`quality.${skin.quality}` as any)}
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center">
                    <Palette className="w-24 h-24 text-zinc-700" />
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <h3 className="text-2xl font-bold text-white truncate">
                    {locale === 'en-US' ? (skin as any).nameEn || skin.name : skin.name}
                  </h3>

                  <p className="text-sm text-zinc-400 line-clamp-2 min-h-[40px]">
                    {locale === 'en-US' ? (skin as any).descriptionEn || skin.description : skin.description}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
                    <div className="text-2xl font-bold text-yellow-500">
                      ¥{skin.price.toFixed(2)}
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="border-zinc-700 hover:border-yellow-500 text-zinc-300"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        {t('featuredSkins.preview')}
                      </Button>
                      <Button 
                        size="sm"
                        className="bg-yellow-500 hover:bg-yellow-600 text-zinc-950"
                      >
                        {t('featuredSkins.download')}
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 功能特性 */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {t('features.title')}
            </h2>
            <p className="text-xl text-zinc-400">
              {t('features.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Palette, titleKey: 'features.professional.title', descKey: 'features.professional.description', color: "from-yellow-500 to-amber-600" },
              { icon: Zap, titleKey: 'features.simple.title', descKey: 'features.simple.description', color: "from-blue-500 to-cyan-600" },
              { icon: Settings, titleKey: 'features.custom.title', descKey: 'features.custom.description', color: "from-purple-500 to-pink-600" },
              { icon: Monitor, titleKey: 'features.professional.title', descKey: 'features.professional.description', color: "from-green-500 to-emerald-600" },
              { icon: RefreshCw, titleKey: 'features.updates.title', descKey: 'features.updates.description', color: "from-orange-500 to-red-600" },
              { icon: MessageCircle, titleKey: 'features.simple.title', descKey: 'features.simple.description', color: "from-pink-500 to-rose-600" }
            ].map((feature, index) => (
              <Card key={index} className="group bg-zinc-900/50 border-zinc-800 hover:border-zinc-700 p-8 text-center transition-all duration-300 hover:-translate-y-2">
                <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${feature.color} p-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-full h-full text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{t(feature.titleKey as any)}</h3>
                <p className="text-zinc-400 leading-relaxed">{t(feature.descKey as any)}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 页脚 */}
      <footer className="bg-zinc-950 border-t border-zinc-800 py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center text-zinc-500 text-sm">
            {t('footer.copyright')}
          </div>
        </div>
      </footer>
    </div>
  );
}
