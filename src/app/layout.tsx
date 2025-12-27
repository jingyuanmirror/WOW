import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "专业魔兽世界UI皮肤设计 | WOW UI Designer",
  description: "提供50+款高质量魔兽世界UI皮肤，专业设计，简单易用，10万+玩家的选择。支持PvP/PvE各种玩法风格。",
  keywords: ["魔兽世界UI", "WOW UI皮肤", "插件", "界面美化", "ElvUI", "WeakAuras"],
  authors: [{ name: "WOW UI Designer" }],
  openGraph: {
    title: "专业魔兽世界UI皮肤设计",
    description: "提供50+款高质量UI皮肤，10万+玩家的选择",
    type: "website",
    locale: "zh_CN",
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
        {children}
      </body>
    </html>
  );
}
