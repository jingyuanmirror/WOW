'use client';

import { Palette, Users, Star, CalendarClock, MessageCircle, Twitter, Youtube, Github, Globe, Play } from "lucide-react";

import { AuthorProfile, AuthorWork } from "@/components/author-profile";
import Navbar from "@/components/navbar";
import { AuthorStatItem } from "@/components/author-stats";
import { SocialLinkItem } from "@/components/social-links";
import { designer, skins } from "@/lib/data";
import { useTranslation } from "@/lib/i18n/use-translation";

const numberFormatter = new Intl.NumberFormat("en-US");

export default function AboutPage() {
  const { t } = useTranslation();
  const isEnglish = t('nav.home') === 'Home';

  const socialLinks: SocialLinkItem[] = [
    {
      platform: "Twitter",
      label: t('author.socialLinks.twitter'),
      handle: "@azerothui",
      href: designer.social.twitter,
      icon: Twitter,
      badge: t('author.socialLinks.badges.official'),
    },
    {
      platform: "Discord",
      label: t('author.socialLinks.discord'),
      handle: "discord.gg/wowui",
      href: designer.social.discord,
      icon: MessageCircle,
      badge: t('author.socialLinks.badges.community'),
      colorClass: "bg-gradient-to-br from-indigo-500/80 to-purple-500/80",
    },
    {
      platform: "YouTube",
      label: t('author.socialLinks.youtube'),
      handle: "@wowuimaster",
      href: designer.social.youtube,
      icon: Youtube,
      badge: t('author.socialLinks.badges.video'),
      colorClass: "bg-gradient-to-br from-rose-500/80 to-orange-400/80",
    },
    {
      platform: "Bilibili",
      label: t('author.socialLinks.bilibili'),
      handle: "WOW UI 设计师",
      href: "https://www.bilibili.com/",
      icon: Play,
      badge: t('author.socialLinks.badges.tutorial'),
      colorClass: "bg-gradient-to-br from-sky-400/80 to-cyan-500/80",
    },
    {
      platform: "NGA",
      label: t('author.socialLinks.nga'),
      handle: "UI 交流区",
      href: "https://nga.cn/",
      icon: Globe,
      badge: t('author.socialLinks.badges.community'),
      colorClass: "bg-gradient-to-br from-emerald-500/80 to-lime-400/80",
    },
    {
      platform: "GitHub",
      label: t('author.socialLinks.github'),
      handle: "wowuimaster",
      href: designer.social.github,
      icon: Github,
      badge: t('author.socialLinks.badges.code'),
      colorClass: "bg-gradient-to-br from-slate-600/80 to-slate-800/80",
    },
  ];

  const stats: AuthorStatItem[] = [
    {
      label: t('author.stats.totalSkins'),
      value: `${designer.stats.totalSkins}+`,
      helper: t('author.statsHelper.totalSkins'),
      icon: Palette,
    },
    {
      label: t('author.stats.totalDownloads'),
      value: `${numberFormatter.format(designer.stats.totalDownloads)}+`,
      helper: t('author.statsHelper.totalDownloads'),
      icon: Users,
    },
    {
      label: t('author.stats.averageRating'),
      value: designer.stats.averageRating.toFixed(1),
      helper: t('author.statsHelper.averageRating'),
      icon: Star,
    },
    {
      label: t('author.stats.yearsExperience'),
      value: `${designer.stats.yearsExperience}+${isEnglish ? '' : ' 年'}`,
      helper: t('author.statsHelper.yearsExperience'),
      icon: CalendarClock,
    },
  ];

  const works: AuthorWork[] = skins
    .filter((skin) => skin.featured)
    .slice(0, 3)
    .map((skin) => ({
      title: skin.name,
      description: skin.description,
      tag: skin.quality === "legendary" ? t('quality.legendary') : t('quality.epic'),
      image: "/window.svg",
      href: `/skins/${skin.id}`,
    }));

  const author = {
    name: "",
    title: designer.title,
    // tagline intentionally omitted per request
    avatar: "/designer-avatar.svg",
    bio: [
      t('author.bioContent.p1'),
      t('author.bioContent.p2'),
      t('author.bioContent.p3'),
    ],
    philosophy: t('author.philosophyContent'),
    highlights: isEnglish 
      ? [
        "Clear information hierarchy with combat timers and cooldowns at a glance",
        "Visual consistency with refined quality and class color representation",
        "Performance-first approach with lightweight and low-footprint optimization",
        "Multi-resolution support providing excellent experience from 1080p to 4K",
      ]
      : [
        "信息层级清晰，战斗读秒与冷却一目了然",
        "视觉统一，品质色与职业色精细还原",
        "性能优先，轻量化与低占用并行",
        "多分辨率适配，1080p-4K皆有出色体验",
      ],
  };

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
