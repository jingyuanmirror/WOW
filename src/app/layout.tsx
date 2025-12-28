import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LanguageUpdater } from "@/components/language-updater";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "专业魔兽世界UI皮肤设计 | Professional WoW UI Designer",
  description: "提供50+款高质量魔兽世界UI皮肤，专业设计，简单易用，10万+玩家的选择。支持PvP/PvE各种玩法风格。Over 50+ high-quality WoW UI skins, professional design, easy to use.",
  keywords: ["魔兽世界UI", "WOW UI皮肤", "插件", "界面美化", "ElvUI", "WeakAuras", "WoW UI", "WoW Skins", "WoW Addons"],
  authors: [{ name: "WOW UI Designer" }],
  openGraph: {
    title: "专业魔兽世界UI皮肤设计 | Professional WoW UI Designer",
    description: "提供50+款高质量UI皮肤，10万+玩家的选择 | Over 50+ high-quality UI skins",
    type: "website",
    locale: "zh_CN",
    alternateLocale: ["en_US"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-black antialiased`}
      >
        <LanguageUpdater />
        {children}
      </body>
    </html>
  );
}
