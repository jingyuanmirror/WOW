import Link from "next/link";
import { 
  Star, Download, Users, Sparkles, ArrowRight, Palette, Zap, Settings, 
  Monitor, Mail, Twitter, Youtube, Check, Eye, ArrowDown, Smartphone,
  User, RefreshCw, MessageCircle, ShoppingCart, Search, ChevronDown, 
  Play, Award
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { skins, designer, testimonials, installSteps } from "@/lib/data";

export default function Home() {
  const featuredSkins = skins.filter(skin => skin.featured).slice(0, 6);
  
  const stats = {
    activeUsers: "100,000+",
    totalSkins: "50+",
    averageRating: "4.9/5.0",
    totalDownloads: "1,000,000+"
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950">
      {/* 导航栏 */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/80 backdrop-blur-lg border-b border-zinc-800/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 group">
              <Sparkles className="w-8 h-8 text-yellow-500 group-hover:rotate-12 transition-transform" />
              <span className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-amber-600 bg-clip-text text-transparent">
                艾泽拉斯UI工坊
              </span>
            </Link>

            <div className="hidden lg:flex items-center gap-8">
              <Link href="/skins" className="text-zinc-300 hover:text-yellow-400 transition-colors">
                作品集
              </Link>
              <Link href="/docs" className="text-zinc-300 hover:text-yellow-400 transition-colors">
                使用文档
              </Link>
              <Link href="/about" className="text-zinc-300 hover:text-yellow-400 transition-colors">
                关于
              </Link>
              <Link href="/community" className="text-zinc-300 hover:text-yellow-400 transition-colors">
                社区
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="outline" className="hidden md:flex border-zinc-700 hover:border-yellow-500 text-zinc-300">
                <User className="w-4 h-4 mr-2" />
                登录
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero 区域 */}
      <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950"></div>

        <div className="container mx-auto max-w-6xl relative z-10 py-20">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-6 py-2 bg-yellow-500/10 border border-yellow-500/30 rounded-full text-yellow-400 text-sm backdrop-blur-sm">
              <Star className="w-4 h-4 fill-yellow-400" />
              <span className="font-medium">{stats.activeUsers} 活跃用户 · {stats.averageRating} 用户评分</span>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight">
              <span className="block bg-gradient-to-r from-yellow-200 via-yellow-400 to-amber-600 bg-clip-text text-transparent drop-shadow-2xl">
                重新定义
              </span>
              <span className="block text-white mt-2 drop-shadow-2xl">你的战斗体验</span>
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl text-zinc-300 max-w-3xl mx-auto leading-relaxed">
              <span className="text-white font-semibold">专业设计</span> | <span className="text-white font-semibold">极致美观</span> | <span className="text-white font-semibold">简单易用</span>
              <br />
              <span className="text-yellow-400 font-bold">10万+玩家</span>的选择
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
              <Link href="/skins">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-zinc-950 font-bold px-8 py-6 text-lg rounded-xl shadow-2xl shadow-yellow-500/50 hover:shadow-yellow-500/70 transition-all hover:scale-105"
                >
                  探索皮肤作品
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-zinc-700 bg-zinc-900/50 backdrop-blur-sm text-white hover:bg-white hover:text-zinc-950 hover:border-white px-8 py-6 text-lg rounded-xl transition-all hover:scale-105"
              >
                <Play className="w-5 h-5 mr-2" />
                观看演示视频
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 精选作品 */}
      <section className="py-24 px-4 bg-zinc-900/50" id="featured">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              精选作品
            </h2>
            <p className="text-xl text-zinc-400">
              专为不同职业和玩法风格打造
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
                    {skin.quality === 'legendary' ? '传说' :
                     skin.quality === 'epic' ? '史诗' :
                     skin.quality === 'rare' ? '精良' : '优秀'}
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
                        详情
                      </Button>
                      <Button 
                        size="sm"
                        className="bg-yellow-500 hover:bg-yellow-600 text-zinc-950"
                      >
                        购买
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
              为什么选择我们的UI皮肤
            </h2>
            <p className="text-xl text-zinc-400">
              专业设计，极致体验
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Palette, title: "专业美术设计", description: "每一款皮肤都经过精心打磨，兼顾美观与实用性", color: "from-yellow-500 to-amber-600" },
              { icon: Zap, title: "轻量高效", description: "优化代码，确保不影响游戏帧数，流畅运行", color: "from-blue-500 to-cyan-600" },
              { icon: Settings, title: "灵活配置", description: "提供丰富的自定义选项，打造专属于你的界面", color: "from-purple-500 to-pink-600" },
              { icon: Monitor, title: "完美适配", description: "支持1080p到4K各种分辨率，自动缩放", color: "from-green-500 to-emerald-600" },
              { icon: RefreshCw, title: "免费更新", description: "跟随游戏版本更新，终身免费升级", color: "from-orange-500 to-red-600" },
              { icon: MessageCircle, title: "活跃社区", description: "专业客服和活跃社区，随时解答你的问题", color: "from-pink-500 to-rose-600" }
            ].map((feature, index) => (
              <Card key={index} className="group bg-zinc-900/50 border-zinc-800 hover:border-zinc-700 p-8 text-center transition-all duration-300 hover:-translate-y-2">
                <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${feature.color} p-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-full h-full text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-zinc-400 leading-relaxed">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 页脚 */}
      <footer className="bg-zinc-950 border-t border-zinc-800 py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center text-zinc-500 text-sm">
            © 2025 WOW UI Designer. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
