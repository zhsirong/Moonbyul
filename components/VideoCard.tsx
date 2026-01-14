import YouTube from "react-youtube";
import { useEffect, useRef, useState } from "react";

type Props = {
  videoId: string;
  // 自动播放是否静音（强烈建议 true）
  autoplayMuted?: boolean;
  // 手机端：进入视口中间就自动播放
  autoPlayOnView?: boolean;
  // 点击是否打开 YouTube（全屏/播放器页）
  openYouTubeOnClick?: boolean;
  // 是否新开标签页
  openInNewTab?: boolean;
};

export default function VideoCard({
  videoId,
  autoplayMuted = true,
  autoPlayOnView = true,
  openYouTubeOnClick = true,
  openInNewTab = true,
}: Props) {
  const [player, setPlayer] = useState<any>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const onReady = (event: any) => {
    const p = event.target;
    setPlayer(p);

    // 自动播放场景建议静音，否则移动端大概率不播
    if (autoplayMuted) p.mute();
    else p.unMute();

    // 不要在 onReady 就 play（桌面 hover 或 in-view 再触发）
  };

  // 手机端/通用：in-view 自动播放
  useEffect(() => {
    if (!autoPlayOnView) return;
    if (!containerRef.current) return;
    if (!player) return;

    const el = containerRef.current;

    // 让“页面中间”更敏感：rootMargin 上下各收紧一点
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;

        if (entry.isIntersecting) {
          // 进入视口：播放
          if (autoplayMuted) player.mute();
          player.playVideo?.();
        } else {
          // 离开：暂停
          player.pauseVideo?.();
        }
      },
      {
        // 你想“到页面中间停留播放”，可以把阈值设高一点
        threshold: 0.65,
        root: null,
        rootMargin: "0px 0px 0px 0px",
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [player, autoPlayOnView, autoplayMuted]);

  const openYouTube = () => {
    const url = `https://www.youtube.com/watch?v=${videoId}`;
    if (!openYouTubeOnClick) return;

    if (openInNewTab) {
      window.open(url, "_blank", "noopener,noreferrer");
    } else {
      window.location.href = url;
    }
  };

  const isTouch =
    typeof window !== "undefined" &&
    ("ontouchstart" in window || navigator.maxTouchPoints > 0);

  return (
    <div
      ref={containerRef}
      className="group aspect-video rounded-[60px] overflow-hidden bg-black border border-white/10 transition-all duration-700 hover:border-violet-400 hover:shadow-[0_0_100px_rgba(139,92,246,0.3)] hover:scale-105 transform cursor-pointer relative"
      // 桌面 hover 播放/暂停（触摸设备不走 hover）
      onMouseEnter={() => !isTouch && player?.playVideo?.()}
      onMouseLeave={() => !isTouch && player?.pauseVideo?.()}
      // 点击：跳转 YouTube 全屏/播放器页
      onClick={openYouTube}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") openYouTube();
      }}
      aria-label="Open video in YouTube"
    >
      <YouTube
        videoId={videoId}
        onReady={onReady}
        opts={{
          width: "100%",
          height: "100%",
          playerVars: {
            rel: 0,
            modestbranding: 1,
            controls: 0,
            iv_load_policy: 3,
            disablekb: 1,
            autoplay: 0,
            playsinline: 1, // 关键：移动端内联播放更稳定
            mute: autoplayMuted ? 1 : 0,
          },
        }}
        className="w-full h-full opacity-70 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
      />

      {/* 可选：给点击一个提示层 */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-700 pointer-events-none" />
    </div>
  );
}
