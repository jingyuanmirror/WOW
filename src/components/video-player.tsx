import { useRef, useEffect } from 'react';

interface VideoPlayerProps {
  src: string;
  poster?: string;
}

export default function VideoPlayer({ src, poster }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play();
    }
  }, [src]);

  return (
    <div className="relative w-full aspect-video bg-black flex items-center justify-center">
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className="w-full h-full object-contain rounded-xl"
        autoPlay
        muted
        loop
        controls
        playsInline
        aria-label="皮肤演示视频"
        preload="auto"
        onClick={() => videoRef.current?.requestFullscreen()}
      />
      {/* Loading 动画可按需补充 */}
    </div>
  );
}
