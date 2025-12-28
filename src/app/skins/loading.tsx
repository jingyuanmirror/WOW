import { SkinGridSkeleton } from '@/components/skins/skin-grid-skeleton';
import { SkinListHeader } from '@/components/skins/skin-list-header';
import Navbar from '@/components/navbar';

export default function SkinsLoading() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-zinc-950 pt-20">
        <SkinListHeader total={0} />
        
        <div className="sticky top-20 z-10 bg-zinc-950/95 backdrop-blur-md border-b border-zinc-800 py-4">
          <div className="container mx-auto px-4">
            <div className="h-10 bg-zinc-900/50 rounded-lg animate-pulse" />
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <SkinGridSkeleton />
        </div>
      </main>
    </>
  );
}
