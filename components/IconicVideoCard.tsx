import { useEffect, useRef, useState } from "react";

export default function IconicVideoCard({
  src,
  title,
}: {
  src: string;
  title?: string;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // ✅ 进入视口自动播放（手机端“停留中间播放”效果）
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!el) return;
        if (entry.isIntersecting) {
          el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { threshold: 0.6 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  // ✅ 监听全屏状态变化
  useEffect(() => {
    const onFsChange = () => {
      const fsEl = document.fullscreenElement;
      setIsFullscreen(!!fsEl);
    };
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, []);

  const toggleFullscreenAndSound = async () => {
    const el = videoRef.current;
    if (!el) return;

    // 如果已全屏：退出全屏
    if (document.fullscreenElement) {
      await document.exitFullscreen().catch(() => {});
      // 退出后你要不要继续有声？你说“再单击退出全屏”，没要求静音，我就不改它
      return;
    }

    // 未全屏：进入全屏 + 开声音播放
    el.muted = false; // ✅ 用户点击手势里解除静音才有效
    el.volume = 1;

    // 进入全屏（标准）
    if (el.requestFullscreen) {
      await el.requestFullscreen().catch(() => {});
    }
    // iOS Safari 兜底（部分机型）
    // @ts-ignore
    if (el.webkitEnterFullscreen) {
      // @ts-ignore
      el.webkitEnterFullscreen();
    }

    el.play().catch(() => {});
  };

  return (
    <div
      className="group aspect-video rounded-[60px] overflow-hidden bg-black border border-white/10 transition-all duration-700 hover:border-violet-400 hover:shadow-[0_0_100px_rgba(139,92,246,0.25)] hover:scale-[1.02] transform cursor-pointer relative"
      onClick={toggleFullscreenAndSound}
    >
      <video
        ref={videoRef}
        src={src}
        className="absolute inset-0 w-full h-full object-cover opacity-85 group-hover:opacity-100 transition-opacity duration-700"
        playsInline
        muted
        loop
        autoPlay
        preload="metadata"
      />

      {/* 微弱玻璃遮罩，让文字更融入你的风格 */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />

      {/* 左上角标题 */}
      <div className="absolute top-6 left-6 z-10 text-xs md:text-sm text-zinc-200 tracking-widest uppercase">
        Moonbyul Moment
      </div>

      {/* 左下角标题（可选） */}
      {title && (
        <div className="absolute bottom-6 left-6 right-6 z-10">
          <div className="text-sm md:text-base text-white/90 font-semibold">
            {title}
          </div>
          <div className="mt-1 text-xs text-zinc-300/80">
            Tap to {isFullscreen ? "exit fullscreen" : "fullscreen + sound"}
          </div>
        </div>
      )}
    </div>
  );
}
