'use client';

import Link from "next/link";
import { Sparkles, Star, ArrowRight, Palette, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navbar from "@/components/navbar";
import { useTranslation } from "@/lib/i18n/use-translation";

// Mock data for testing
const mockSkins = [
  {
    id: 1,
    name: "暗影精灵",
    description: "适合暗牧、术士等暗系职业",
    price: 29.99,
    quality: "epic" as const,
    featured: true,
  },
  {
    id: 2,
    name: "圣光守卫",
    description: "完美适配圣骑士和牧师",
    price: 39.99,
    quality: "legendary" as const,
    featured: true,
  },
  {
    id: 3,
    name: "自然之怒",
    description: "德鲁伊专属设计",
    price: 34.99,
    quality: "rare" as const,
    featured: true,
  },
];

export default function HomePage() {
  const { t } = useTranslation();

  const stats = {
    activeUsers: "100,000+",
    totalSkins: "50+",
    totalDownloads: "1,000,000+"
  };

  return (
    <div className="min-h-screen bg-[url('/wow-bg.svg')] bg-cover bg-center bg-fixed" style={{backgroundColor: '#0b0b0b'}}>
      <Navbar />

      {/* Hero Section */}
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

      {/* Featured Skins */}
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
            {mockSkins.map((skin) => (
              <Card 
                key={skin.id}
                className="group bg-zinc-900/50 border-zinc-800 hover:border-yellow-500/50 overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-yellow-500/20"
              >
                <div className="relative aspect-video overflow-hidden bg-zinc-800">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-zinc-900/90 z-10"></div>
                  
                  <div className={`absolute top-4 left-4 z-20 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm ${
                    skin.quality === 'legendary' ? 'bg-orange-500/90 text-white' :
                    skin.quality === 'epic' ? 'bg-purple-500/90 text-white' :
                    'bg-blue-500/90 text-white'
                  }`}>
                    {skin.quality === 'legendary' ? '传说' :
                     skin.quality === 'epic' ? '史诗' : '精良'}
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center">
                    <Palette className="w-24 h-24 text-zinc-700" />
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <h3 className="text-2xl font-bold text-white truncate">
                    {skin.name}
                  </h3>

                  <p className="text-sm text-zinc-400 line-clamp-2 min-h-[40px]">
                    {skin.description}
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

      {/* Footer */}
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
