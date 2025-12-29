import { Palette, Users, Star, CalendarClock, MessageCircle, Twitter, Youtube, Github, Globe, Play } from "lucide-react";

import { AuthorProfile, AuthorWork } from "@/components/author-profile";
import Navbar from "@/components/navbar";
import { AuthorStatItem } from "@/components/author-stats";
import { SocialLinkItem } from "@/components/social-links";
import { designer, skins } from "@/lib/data";

const numberFormatter = new Intl.NumberFormat("en-US");

const socialLinks: SocialLinkItem[] = [
  {
    platform: "Twitter",
    label: "Twitter / X",
    handle: "@azerothui",
    href: designer.social.twitter,
    icon: Twitter,
    badge: "官方",
  },
  {
    platform: "Discord",
    label: "Discord 社群",
    handle: "discord.gg/wowui",
    href: designer.social.discord,
    icon: MessageCircle,
    badge: "社区",
    colorClass: "bg-gradient-to-br from-indigo-500/80 to-purple-500/80",
  },
  {
    platform: "YouTube",
    label: "YouTube 频道",
    handle: "@wowuimaster",
    href: designer.social.youtube,
    icon: Youtube,
    badge: "视频",
    colorClass: "bg-gradient-to-br from-rose-500/80 to-orange-400/80",
  },
  {
    platform: "Bilibili",
    label: "Bilibili · 教程",
    handle: "WOW UI 设计师",
    href: "https://www.bilibili.com/",
    icon: Play,
    badge: "教程",
    colorClass: "bg-gradient-to-br from-sky-400/80 to-cyan-500/80",
  },
  {
    platform: "NGA",
    label: "NGA 论坛",
    handle: "UI 交流区",
    href: "https://nga.cn/",
    icon: Globe,
    badge: "社区",
    colorClass: "bg-gradient-to-br from-emerald-500/80 to-lime-400/80",
  },
  {
    platform: "GitHub",
    label: "GitHub",
    handle: "wowuimaster",
    href: designer.social.github,
    icon: Github,
    badge: "代码",
    colorClass: "bg-gradient-to-br from-slate-600/80 to-slate-800/80",
  },
];

const stats: AuthorStatItem[] = [
  {
    label: "皮肤作品",
    value: `${designer.stats.totalSkins}+`,
    helper: "精品持续更新",
    icon: Palette,
  },
  {
    label: "活跃用户",
    value: `${numberFormatter.format(designer.stats.totalDownloads)}+`,
    helper: "全球玩家覆盖",
    icon: Users,
  },
  {
    label: "平均评分",
    value: designer.stats.averageRating.toFixed(1),
    helper: "社区口碑保障",
    icon: Star,
  },
  {
    label: "从业年限",
    value: `${designer.stats.yearsExperience}+ 年`,
    helper: "深耕魔兽UI生态",
    icon: CalendarClock,
  },
];

const works: AuthorWork[] = skins
  .filter((skin) => skin.featured)
  .slice(0, 3)
  .map((skin) => ({
    title: skin.name,
    description: skin.description,
    tag: skin.quality === "legendary" ? "传说" : "精品",
    image: "/window.svg",
    href: `/skins/${skin.id}`,
  }));

const author = {
  name: "",
  title: designer.title,
  // tagline intentionally omitted per request
  avatar: "/designer-avatar.svg",
  bio: [
    "你好，我是 Azeroth UI Master，专注魔兽世界UI设计 8 年，擅长以数据驱动的方式优化界面体验。",
    "我相信优秀的UI应该兼顾美观与实用，信息清晰、操作高效、视觉舒适是每一次设计的底线。",
    "感谢 12 万+ 玩家选择我的作品，我希望通过持续迭代让每位玩家都拥有专属的游戏体验。",
  ],
  philosophy: "简洁、高效、美观是核心准则；每个像素都要服务信息传达，每个交互都应让玩家更沉浸。",
  highlights: [
    "信息层级清晰，战斗读秒与冷却一目了然",
    "视觉统一，品质色与职业色精细还原",
    "性能优先，轻量化与低占用并行",
    "多分辨率适配，1080p-4K皆有出色体验",
  ],
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-zinc-950 px-4 pt-24 pb-12 sm:px-6 lg:px-12 lg:pb-16">
        <div className="mx-auto max-w-6xl space-y-10">
          <AuthorProfile
            author={author}
            stats={stats}
            socialLinks={socialLinks}
            works={works}
            contactEmail="contact@wowui.design"
          />
        </div>
      </main>
    </>
  );
}
