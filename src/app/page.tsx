import { HeroSection } from '@/components/hero-section';
import { FeaturedSkins } from '@/components/featured-skins';
import { FeatureHighlight } from '@/components/feature-highlight';
import { GettingStarted } from '@/components/getting-started';
import { Testimonials } from '@/components/testimonials';
import { StatsBanner } from '@/components/stats-banner';
import { Newsletter } from '@/components/newsletter';
import { FinalCTA } from '@/components/final-cta';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black">
      <HeroSection />
      <FeaturedSkins />
      <FeatureHighlight />
      <StatsBanner />
      <GettingStarted />
      <Testimonials />
      <Newsletter />
      <FinalCTA />
    </main>
  );
}
