'use client';

import Image from "next/image";
import { ArrowUpRight, Mail, Quote, Sparkles, Stars } from "lucide-react";

import { Button } from "@/components/ui/button";
import { AuthorStats, AuthorStatItem } from "@/components/author-stats";
import { SocialLinks, SocialLinkItem } from "@/components/social-links";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/lib/i18n/use-translation";

export type AuthorWork = {
  title: string;
  description: string;
  tag?: string;
  image: string;
  href?: string;
};

export type AuthorProfileProps = {
  author: {
    name: string;
    title: string;
    tagline?: string;
    avatar: string;
    bio: string[];
    philosophy: string;
    highlights?: string[];
  };
  stats: AuthorStatItem[];
  socialLinks: SocialLinkItem[];
  works?: AuthorWork[];
  contactEmail?: string;
  className?: string;
};

export function AuthorProfile({
  author,
  stats,
  socialLinks,
  works = [],
  contactEmail,
  className,
}: AuthorProfileProps) {
  const { t } = useTranslation();

  return (
    <section
      className={cn(
        "relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-gray-900 via-black to-black text-white shadow-2xl",
        "before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_20%_20%,rgba(255,193,7,0.12),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(99,102,241,0.12),transparent_30%)] before:opacity-80",
        className
      )}
    >
      <div className="absolute -left-10 top-10 h-64 w-64 rounded-full bg-amber-500/10 blur-3xl" />
      <div className="absolute -right-10 bottom-0 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl" />

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-12 px-4 py-12 sm:px-8 lg:px-12 lg:py-16">
        <header className="space-y-3">
          <p className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.2em] text-amber-100/80 ring-1 ring-white/10">
            <Sparkles className="size-4" />
            {t('author.aboutDesigner')}
          </p>
          {author.name ? (
            <h1 className="text-4xl font-bold leading-tight md:text-5xl">
              {author.name}
            </h1>
          ) : null}
          {author.tagline ? (
            <p className="max-w-3xl text-lg text-gray-300">{author.tagline}</p>
          ) : null}
        </header>

        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr]">
          {/* Left column: avatar, basics, social, stats */}
          <div className="space-y-6">
            <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 shadow-lg sm:flex-row sm:items-center">
              <div className="relative size-28 overflow-hidden rounded-2xl border border-white/10 shadow-xl">
                <Image
                  src={author.avatar}
                  alt={`${author.name} avatar`}
                  fill
                  className="object-cover"
                  sizes="112px"
                  priority
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-amber-200">
                  <Stars className="size-4" />
                  {author.title}
                </div>
                {author.name ? (
                  <h2 className="text-2xl font-semibold text-white">{author.name}</h2>
                ) : null}
                {author.tagline ? (
                  <p className="text-sm text-gray-300">{author.tagline}</p>
                ) : null}
              </div>
            </div>

            <SocialLinks links={socialLinks} />

            <AuthorStats stats={stats} />
          </div>

          {/* Right column: bio, philosophy, highlights, CTA */}
          <div className="space-y-8">
            <section className="space-y-3">
              <h3 className="text-lg font-semibold text-amber-100">{t('author.bio')}</h3>
              <div className="space-y-3 text-gray-200">
                {author.bio.map((paragraph) => (
                  <p key={paragraph} className="leading-7 text-gray-300">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>

            <section className="space-y-3 rounded-2xl border border-amber-500/30 bg-amber-500/5 p-6 shadow-inner">
              <div className="flex items-center gap-2 text-amber-100">
                <Quote className="size-4" />
                <h3 className="text-lg font-semibold">{t('author.philosophy')}</h3>
              </div>
              <p className="text-lg leading-8 text-amber-50">{author.philosophy}</p>
              {author.highlights && author.highlights.length > 0 ? (
                <ul className="grid gap-2 text-sm text-amber-100 sm:grid-cols-2">
                  {author.highlights.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="block size-1.5 rounded-full bg-amber-300" />
                      {item}
                    </li>
                  ))}
                </ul>
              ) : null}
            </section>

            {contactEmail ? (
              <div className="flex flex-wrap items-center gap-3">
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-amber-500 to-orange-500 text-base font-semibold text-white shadow-lg shadow-amber-500/40"
                >
                  <a href={`mailto:${contactEmail}`} aria-label="联系作者">
                    <Mail className="mr-2 size-5" /> {t('author.contactAuthor')}
                  </a>
                </Button>
                <p className="text-sm text-gray-400">{t('author.contactMessage')}</p>
              </div>
            ) : null}
          </div>
        </div>

        {works.length > 0 ? (
          <section className="space-y-4">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-xl font-semibold">{t('author.works')}</h3>
                <p className="text-sm text-gray-400">{t('author.worksSubtitle')}</p>
              </div>
              <div className="hidden text-sm text-gray-500 sm:block">{t('author.moreWorks')}</div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {works.map((work) => (
                <div
                  key={work.title}
                  className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-lg transition duration-200 hover:-translate-y-1 hover:border-amber-400/40"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={work.image}
                      alt={work.title}
                      fill
                      className="object-cover transition duration-300 group-hover:scale-105"
                      sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    {work.tag ? (
                      <span className="absolute left-4 top-4 rounded-full bg-amber-500/80 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-black">
                        {work.tag}
                      </span>
                    ) : null}
                  </div>
                  <div className="space-y-2 p-5">
                    <h4 className="text-lg font-semibold text-white">{work.title}</h4>
                    <p className="text-sm text-gray-300">{work.description}</p>
                    {work.href ? (
                      <Button
                        asChild
                        variant="ghost"
                        size="sm"
                        className="text-amber-200 hover:bg-amber-500/10 hover:text-amber-100"
                      >
                        <a href={work.href} className="inline-flex items-center" aria-label={`查看${work.title}`}>
                          {t('author.viewDetails')}
                          <ArrowUpRight className="ml-1 size-4" />
                        </a>
                      </Button>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </section>
  );
}
