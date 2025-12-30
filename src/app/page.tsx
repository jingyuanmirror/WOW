import HeroCarouselSection from '@/components/hero-carousel-section'
import FeaturedSkins from '@/components/featured-skins'
import FeatureHighlight from '@/components/feature-highlight'
import GettingStarted from '@/components/getting-started'
import Testimonials from '@/components/testimonials'
import Newsletter from '@/components/newsletter'
import FinalCTA from '@/components/final-cta'
import Navbar from '@/components/navbar'
import { promoSlides } from '@/lib/data'

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-zinc-950">
        <HeroCarouselSection slides={promoSlides} />
        <FeaturedSkins />
        <FeatureHighlight />
        <GettingStarted />
        <Testimonials />
        <Newsletter />
        <FinalCTA />
      </main>
    </>
  )
}
