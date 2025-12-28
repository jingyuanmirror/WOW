export function SkinGridSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className="bg-zinc-900/50 border border-zinc-800 rounded-lg overflow-hidden">
          {/* 预览图骨架 */}
          <div className="aspect-video bg-zinc-800 animate-pulse" />
          
          {/* 媒体指示器骨架 */}
          <div className="px-3 py-2 bg-zinc-950/50">
            <div className="h-3 w-16 bg-zinc-800 rounded animate-pulse" />
          </div>
          
          {/* 内容骨架 */}
          <div className="p-4 space-y-3">
            {/* 标题 */}
            <div className="h-5 bg-zinc-800 rounded animate-pulse" />
            <div className="h-5 w-3/4 bg-zinc-800 rounded animate-pulse" />
            
            {/* 作者 */}
            <div className="h-3 w-24 bg-zinc-800 rounded animate-pulse" />
            
            {/* 互动数据 */}
            <div className="flex gap-4">
              <div className="h-3 w-12 bg-zinc-800 rounded animate-pulse" />
              <div className="h-3 w-12 bg-zinc-800 rounded animate-pulse" />
              <div className="h-3 w-12 bg-zinc-800 rounded animate-pulse" />
            </div>
            
            {/* 标签 */}
            <div className="flex gap-2">
              <div className="h-6 w-16 bg-zinc-800 rounded-full animate-pulse" />
              <div className="h-6 w-16 bg-zinc-800 rounded-full animate-pulse" />
            </div>
            
            {/* 按钮 */}
            <div className="flex gap-2 pt-2">
              <div className="h-9 flex-1 bg-zinc-800 rounded-lg animate-pulse" />
              <div className="h-9 w-9 bg-zinc-800 rounded-lg animate-pulse" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
