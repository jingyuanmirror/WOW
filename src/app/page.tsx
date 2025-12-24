import Link from "next/link";
import { Star, Download, Users, Sparkles, ArrowRight, Palette, Zap, Settings, Shield, Award, FolderOpen, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { skins, designer, testimonials, features, installSteps } from "@/lib/data";

export default function Home() {
  const featuredSkins = skins.filter(skin => skin.featured);

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-8 h-8 text-yellow-500" />
            <span className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-amber-600 bg-clip-text text-transparent">
              艾泽拉斯UI工坊
            </span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <Link href="/skins" className="text-zinc-300 hover:text-yellow-400 transition-colors">作品集</Link>
            <Link href="/docs" className="text-zinc-300 hover:text-yellow-400 transition-colors">使用指南</Link>
            <Link href="/about" className="text-zinc-300 hover:text-yellow-400 transition-colors">关于我</Link>
            <Button className="bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-zinc-950 font-semibold">
              立即购买
            </Button>
          </div>
        </div>
      </nav>

      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-yellow-900/20 via-transparent to-transparent"></div>
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500/10 border border-yellow-500/20 rounded-full text-yellow-400 text-sm">
              <Star className="w-4 h-4" />
              <span>超过 125,000 次下载 · 4.8星平均评分</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-yellow-200 via-yellow-400 to-amber-600 bg-clip-text text-transparent">
                重新定义
              </span>
              <br />
              <span className="text-white">魔兽世界界面体验</span>
            </h1>

            <p className="text-xl md:text-2xl text-zinc-400 max-w-3xl mx-auto">
              专业设计师倾力打造，为不同职业和玩法量身定制的顶级UI皮肤
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button size="lg" className="bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-zinc-950 font-semibold text-lg px-8 h-14 group">
                浏览作品集
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-zinc-800 bg-zinc-950 py-12 px-4">
        <div className="container mx-auto max-w-6xl text-center text-sm text-zinc-500">
          <p>&copy; 2025 艾泽拉斯UI工坊. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
