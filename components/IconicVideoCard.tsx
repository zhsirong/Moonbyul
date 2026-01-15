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

  // ✅ 等视频到可播放状态（避免 IntersectionObserver 里 play 太早导致黑屏/卡住）
  const waitUntilPlayable = (el: HTMLVideoElement) => {
    if (el.readyState >= 2) return Promise.resolve(); // HAVE_CURRENT_DATA
    return new Promise<void>((resolve) => {
      const onReady = () => resolve();
      el.addEventListener("loadeddata", onReady, { once: true });
      el.addEventListener("canplay", onReady, { once: true });
    });
  };

  // ✅ 进入视口自动播放（更稳：先等 canplay）
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      async ([entry]) => {
        if (!el) return;

        if (entry.isIntersecting) {
          try {
            // 等到能播再 play，避免卡死
            await waitUntilPlayable(el);
            await el.play();
          } catch (err) {
            console.log("[IconicVideoCard] play blocked:", err);
          }
        } else {
          el.pause();
        }
      },
      { threshold: 0.6 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  // ✅ 监听全屏状态变化：退出全屏后恢复静音（符合“点击才有声”）
  useEffect(() => {
    const onFsChange = () => {
      const fsEl = document.fullscreenElement;
      const fs = !!fsEl;
      setIsFullscreen(fs);

      const el = videoRef.current;
      if (!el) return;

      // 退出全屏后回到静音自动播放状态
      if (!fs) {
        el.muted = true;
        el.volume = 0;
        el.play().catch(() => {});
      }
    };

    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, []);

  const toggleFullscreenAndSound = async () => {
  const el = videoRef.current;
  if (!el) return;

  // 已全屏：退出
  if (document.fullscreenElement) {
    await document.exitFullscreen().catch(() => {});
    return;
  }

  // 未全屏：先开声音
  el.muted = false;
  el.volume = 1;

  try {
    // ✅ 最关键：先播放（用户点击手势）
    await el.play();

    // ✅ 再进全屏
    if (el.requestFullscreen) {
      await el.requestFullscreen();
    }
    // iOS Safari 兜底
    // @ts-ignore
    else if (el.webkitEnterFullscreen) {
      // @ts-ignore
      el.webkitEnterFullscreen();
    }
  } catch (err) {
    console.log("CLICK PLAY FAILED:", err);
  }
};

  return (
    <div
      className="group aspect-video rounded-[60px] overflow-hidden bg-black border border-white/10 transition-all duration-700 hover:border-violet-400 hover:shadow-[0_0_100px_rgba(139,92,246,0.25)] hover:scale-[1.02] transform cursor-pointer relative"
      onClick={toggleFullscreenAndSound}
    >
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover opacity-85 group-hover:opacity-100 transition-opacity duration-700"
        playsInline
        muted
        loop
        autoPlay
        preload="metadata"
        crossOrigin="anonymous"
        // ✅ 这三条用来“抓真凶”
        onError={(e) => {
          console.log(
            "[IconicVideoCard] VIDEO onError:",
            e.currentTarget.error,
            src
          );
        }}
        onLoadedMetadata={() => console.log("[IconicVideoCard] loadedMetadata:", src)}
        onCanPlay={() => console.log("[IconicVideoCard] canPlay:", src)}
      >
        <source src={src} type="video/mp4" />
      </video>

      {/* 微弱玻璃遮罩，让文字更融入你的风格 */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent pointer-events-none" />

      {/* 左上角标题 */}
      <div className="absolute top-6 left-6 z-10 text-xs md:text-sm text-zinc-200 tracking-widest uppercase pointer-events-none">

        Moonbyul Moment
      </div>

      {/* 左下角标题（可选） */}
      {title && (
        <div className="absolute bottom-6 left-6 right-6 z-10 pointer-events-none">

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

