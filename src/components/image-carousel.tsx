import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface ImageCarouselProps {
  images: { url: string; alt?: string }[];
}

export default function ImageCarousel({ images }: ImageCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [zoom, setZoom] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // 左右切换
  const prev = () => setCurrent((c) => (c === 0 ? images.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === images.length - 1 ? 0 : c + 1));

  // 双击/滚轮缩放
  const handleDoubleClick = () => setZoom((z) => !z);

  return (
    <div className="relative w-full aspect-video bg-zinc-900 flex items-center justify-center">
      {/* 左右箭头 */}
      <button
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-zinc-800/60 hover:bg-yellow-500/80 text-white rounded-full p-2"
        onClick={prev}
        aria-label="上一张"
      >
        <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
      </button>
      <button
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-zinc-800/60 hover:bg-yellow-500/80 text-white rounded-full p-2"
        onClick={next}
        aria-label="下一张"
      >
        <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
      </button>
      {/* 主图 */}
      <motion.img
        ref={imgRef}
        src={images[current].url}
        alt={images[current].alt || ''}
        className={`object-contain w-full h-full transition-transform duration-300 ${zoom ? 'scale-150 cursor-zoom-out' : 'cursor-zoom-in'}`}
        onDoubleClick={handleDoubleClick}
        style={{ userSelect: 'none' }}
        draggable={false}
      />
      {/* 缩略图导航 */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-zinc-900/60 rounded-xl px-3 py-2">
        {images.map((img, idx) => (
          <img
            key={img.url}
            src={img.url}
            alt={img.alt || ''}
            className={`w-12 h-7 object-cover rounded-md border-2 ${idx === current ? 'border-yellow-500 scale-110' : 'border-transparent opacity-70'} transition-all cursor-pointer`}
            onClick={() => setCurrent(idx)}
          />
        ))}
      </div>
    </div>
  );
}
