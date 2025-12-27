import Navbar from '@/components/navbar'
import HeroSection from '@/components/hero-section'
import FeaturedSkins from '@/components/featured-skins'
import FeatureHighlight from '@/components/feature-highlight'
import GettingStarted from '@/components/getting-started'
import Testimonials from '@/components/testimonials'
import Newsletter from '@/components/newsletter'
import FinalCTA from '@/components/final-cta'

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950">
      <Navbar />
      <HeroSection />
      <FeaturedSkins />
      <FeatureHighlight />
      <GettingStarted />
      <Testimonials />
      <Newsletter />
      <FinalCTA />
    </main>
  )
}
