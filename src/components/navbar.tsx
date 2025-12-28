'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sparkles, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { LanguageSwitcher } from '@/components/language-switcher';
import { useTranslation } from '@/lib/i18n/use-translation';

function Navbar() {
  const { t } = useTranslation();

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/80 backdrop-blur-lg border-b border-zinc-800/50"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-2 group">
            <Sparkles className="w-8 h-8 text-yellow-500 group-hover:rotate-12 transition-transform duration-300" />
            <span className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-amber-600 bg-clip-text text-transparent">
              {t('nav.brand')}
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link 
              href="/" 
              className="text-zinc-300 hover:text-yellow-400 transition-colors duration-200 font-medium"
            >
              {t('nav.home')}
            </Link>
            <Link 
              href="/skins" 
              className="text-zinc-300 hover:text-yellow-400 transition-colors duration-200 font-medium"
            >
              {t('nav.skins')}
            </Link>
            <Link 
              href="/about" 
              className="text-zinc-300 hover:text-yellow-400 transition-colors duration-200 font-medium"
            >
              {t('nav.about')}
            </Link>
            <Link 
              href="/community" 
              className="text-zinc-300 hover:text-yellow-400 transition-colors duration-200 font-medium"
            >
              {t('nav.community')}
            </Link>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <Button 
              variant="outline" 
              className="border-zinc-700 hover:border-yellow-500 hover:bg-yellow-500/10 text-zinc-300 hover:text-yellow-400 transition-all duration-200"
            >
              <User className="w-4 h-4 mr-2" />
              {t('nav.login')}
            </Button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}

export default Navbar;
