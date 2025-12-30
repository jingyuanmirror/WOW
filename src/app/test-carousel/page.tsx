import PromoCarousel from '@/components/promo-carousel'
import { promoSlides } from '@/lib/data'

export default function TestCarousel() {
  return (
    <div className="min-h-screen bg-zinc-900">
      <h1 className="text-white text-4xl p-8 text-center">测试轮播组件</h1>
      
      <div className="mb-8">
        <PromoCarousel slides={promoSlides} height="600px" />
      </div>
      
      <div className="p-8 text-white">
        <h2 className="text-2xl mb-4">轮播数据:</h2>
        <pre className="bg-zinc-800 p-4 rounded overflow-auto">
          {JSON.stringify(promoSlides, null, 2)}
        </pre>
      </div>
    </div>
  )
}
