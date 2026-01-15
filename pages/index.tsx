import React, { useEffect, useState } from "react";
import { MOONBYUL_IMAGES, MOONBYUL_VIDEOS, MOONBYUL_ICONIC } from "../data";
import Gallery from "../components/Gallery";
import VideoCard from "../components/VideoCard";
import IconicVideoCard from "../components/IconicVideoCard";

type Danmu = {
  id: number;
  text: string;
  top: number; // %
  duration: number; // seconds
};

export default function Home() {
  const [inputText, setInputText] = useState("");
  const [danmus, setDanmus] = useState<Danmu[]>([]);

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

    const newDanmu: Danmu = {
      id: Date.now(),
      text: inputText.trim(),
      top: 20 + Math.random() * 60,
      duration: isMobile ? 10 + Math.random() * 6 : 7 + Math.random() * 5,
    };

    setDanmus((prev) => [...prev, newDanmu]);
    setInputText("");
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* 1) 流星层：fixed，滚动背景不消失 */}
      <div className="night-sky fixed inset-0 pointer-events-none">
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            className="shooting-star"
            style={
              {
                // @ts-ignore - CSS variables
                "--delay": `${Math.random() * 14}s`,
                // @ts-ignore - CSS variables
                "--duration": `${7 + Math.random() * 5}s`,
                top: `${Math.random() * 60}%`,
                left: `${Math.random() * 100}%`,
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      {/* 2) 留言弹幕展示层（循环落下） */}
      {danmus.map((d) => (
        <DanmuItem key={d.id} danmu={d} setDanmus={setDanmus} />
      ))}

      {/* 3) 前景内容统一放在 z-10 容器里 */}
      <div className="relative z-10 w-full">
        {/* Header */}
        <header className="pt-28 pb-14 md:pt-44 md:pb-20 text-center px-4 overflow-hidden">
          <h1 className="text-[6rem] md:text-[18rem] lg:text-[22rem] font-serif italic tracking-tighter bg-gradient-to-b from-white via-violet-100 to-violet-500 bg-clip-text text-transparent drop-shadow-[0_0_80px_rgba(139,92,246,0.6)] leading-[0.8] break-all">
            Moonbyul
          </h1>
          <p className="mt-8 md:mt-12 text-zinc-100 tracking-[0.3em] md:tracking-[0.8em] uppercase text-sm md:text-2xl font-black opacity-100 drop-shadow-md">
            The Soloist & Muse / 玟星
          </p>

          {/* Intro + Profile Card */}
          <div className="mt-12 md:mt-20 px-6">
  <div className="max-w-[1200px] 2xl:max-w-[1320px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-14 items-start">
              {/* Left: Editorial Intro */}
              <div className="md:col-span-7 lg:col-span-8 text-left">
  <p className="text-[13px] md:text-[15px] lg:text-[16px] text-zinc-200/90 leading-relaxed tracking-wide">
                  <span className="text-violet-200 font-semibold">Moonbyul</span>{" "}
                  (문별) is a South Korean rapper, singer, and songwriter under
                  RBW. She is best known as a member of{" "}
                  <span className="text-violet-200 font-semibold">MAMAMOO</span>{" "}
                  and its sub-unit{" "}
                  <span className="text-violet-200 font-semibold">
                    MAMAMOO+
                  </span>
                  . Born{" "}
                  <span className="text-violet-200 font-semibold">
                    Moon Byul-yi
                  </span>{" "}
                  (문별이) on{" "}
                  <span className="text-violet-200 font-semibold">
                    Dec 22, 1992
                  </span>{" "}
                  in Bucheon, she’s recognized for a restrained-yet-powerful
                  stage presence and extensive songwriting credits.
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {[
                    "Rapper · Vocalist · Songwriter",
                    "MAMAMOO / MAMAMOO+",
                    "RBW Entertainment",
                    "Moon × Star = ‘Moonbyul’",
                  ].map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-[12px] md:text-[13px] text-zinc-200/90 tracking-widest"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right: Channel glass card */}
              <aside className="md:col-span-5 lg:col-span-4">
  <div className="rounded-[30px] border border-white/10 bg-white/5 backdrop-blur-2xl shadow-[0_0_90px_rgba(139,92,246,0.22)] overflow-hidden">
    <div className="p-7 md:p-8">
                  
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="text-[11px] tracking-[0.45em] uppercase text-violet-300 font-bold">
                          Official Channel
                        </div>
                        <div className="mt-2 text-xl md:text-2xl font-semibold text-white/90">
                          문별이다 moonbyul2da
                        </div>
                        <div className="mt-1 text-sm text-zinc-300/90">
                          @moonbyul2da
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-[11px] text-zinc-300/80 tracking-widest">
                          296K subscribers
                        </div>
                        <div className="text-[11px] text-zinc-300/80 tracking-widest mt-1">
                          241 videos
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 h-px bg-gradient-to-r from-violet-500/60 via-white/10 to-transparent" />

                    <p className="mt-5 text-sm md:text-[15px] leading-relaxed text-zinc-200/90">
                      안녕하세요 문별입니다.
                      <span className="text-zinc-400/80"> …more</span>
                    </p>

                    <div className="mt-6 flex flex-col gap-3">
                      <a
                        href="https://www.youtube.com/@moonbyul2da"
                        target="_blank"
                        rel="noreferrer"
                        className="group flex items-center justify-between rounded-xl border border-white/10 bg-black/20 px-4 py-3 hover:border-violet-400/60 transition"
                      >
                        <span className="text-sm text-white/90 tracking-widest">
                          Open YouTube
                        </span>
                        <span className="text-xs text-zinc-300/80 group-hover:text-violet-200 transition">
                          ↗
                        </span>
                      </a>

                      <a
                        href="https://www.instagram.com/mo_onbyul/"
                        target="_blank"
                        rel="noreferrer"
                        className="group flex items-center justify-between rounded-xl border border-white/10 bg-black/20 px-4 py-3 hover:border-violet-400/60 transition"
                      >
                        <span className="text-sm text-white/90 tracking-widest">
                          instagram.com/mo_onbyul
                        </span>
                        <span className="text-xs text-zinc-300/80 group-hover:text-violet-200 transition">
                          ↗
                        </span>
                      </a>
                    </div>

                    <p className="mt-5 text-[11px] text-zinc-400/70 leading-relaxed">
                      Channel: “문별이다 moonbyul2da” · Handle: “@moonbyul2da”
                    </p>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </header>

        {/* Section 01: 图片画廊 */}
        <main className="max-w-[1400px] mx-auto px-6 md:px-16 mb-48 md:mb-80">
          <div className="flex items-center gap-6 md:gap-10 mb-16 md:mb-32">
            <span className="text-sm md:text-2xl font-mono tracking-widest text-violet-300 font-black uppercase">
              SCENE 01 // VISUALS
            </span>
            <div className="h-[1px] md:h-[2px] flex-1 bg-gradient-to-r from-violet-600 to-transparent opacity-50" />
          </div>

          <div className="md:px-10 md:scale-105">
            <Gallery items={MOONBYUL_IMAGES} />
          </div>
        </main>

        {/* Section 02: ICONIC MOMENTS */}
        <section className="max-w-[1700px] mx-auto px-6 md:px-16 mb-48 md:mb-80">
          <div className="flex items-center gap-6 md:gap-12 mb-16 md:mb-32">
            <span className="text-sm md:text-xl font-mono tracking-widest text-violet-300 font-bold uppercase">
              SCENE 02 // ICONIC MOMENTS
            </span>
            <div className="h-[1px] md:h-[2px] flex-1 bg-gradient-to-r from-violet-600 to-transparent" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
            <div className="md:col-span-8">
              <IconicVideoCard
                src={MOONBYUL_ICONIC[0]?.src}
                title={MOONBYUL_ICONIC[0]?.title}
              />
            </div>

            <div className="md:col-span-4 flex flex-col gap-10 md:gap-16">
              {MOONBYUL_ICONIC.slice(1, 3).map((v) => (
                <IconicVideoCard key={v.id} src={v.src} title={v.title} />
              ))}
            </div>

            {MOONBYUL_ICONIC[3] && (
              <div className="md:col-span-12">
                <IconicVideoCard
                  src={MOONBYUL_ICONIC[3].src}
                  title={MOONBYUL_ICONIC[3].title}
                />
              </div>
            )}
          </div>
        </section>

        {/* Section 03: 视频集锦 */}
        <section className="max-w-[1700px] mx-auto px-6 md:px-16">
          <div className="flex items-center gap-6 md:gap-12 mb-16 md:mb-32">
            <span className="text-sm md:text-xl font-mono tracking-widest text-violet-300 font-bold uppercase">
              Film 01 // Cinematic
            </span>
            <div className="h-[1px] md:h-[2px] flex-1 bg-gradient-to-r from-violet-600 to-transparent" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-24">
            {MOONBYUL_VIDEOS.map((v, index) => (
              <div
                key={v.id}
                className={index % 3 === 0 ? "md:col-span-2" : ""}
              >
                <VideoCard videoId={v.id} />
              </div>
            ))}
          </div>
        </section>

        {/* 留言框（尺寸和间距已更舒服） */}
        <section className="max-w-[720px] mx-auto px-6 mt-24 mb-40 text-center">
          <div className="p-10 md:p-12 rounded-[32px] bg-white/5 backdrop-blur-2xl border border-white/10 shadow-[0_0_60px_rgba(139,92,246,0.25)]">
            <h3 className="text-violet-300 text-xs tracking-[0.6em] uppercase mb-10 font-bold">
              Leave a Message
            </h3>

            <div className="flex flex-col md:flex-row gap-6 items-center">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="将你的思念化作流星..."
                className="flex-1 bg-transparent border-b border-white/20 py-3 md:py-4 text-white outline-none focus:border-violet-400 transition-colors tracking-widest text-sm md:text-base"
              />

              <button
                onClick={handleSendMessage}
                className="px-10 py-3 bg-violet-600/80 hover:bg-violet-500 text-white rounded-full text-xs md:text-sm font-black tracking-widest transition-all hover:scale-105 active:scale-95"
              >
                SEND
              </button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-24 md:mt-40 text-center pb-32 px-6">
          <p className="text-lg md:text-3xl text-purple tracking-[0.5em] md:tracking-[1.5em] font-black uppercase opacity-90">
            Dedicated to Moonbyul
          </p>
          <div className="h-[1px] w-40 md:w-80 bg-violet-500/50 mx-auto mt-12 mb-8" />
          <p className="text-xs md:text-lg text-zinc-500 tracking-widest">
            EST. 2026 ARCHIVE PROJECT
          </p>
        </footer>
      </div>
    </div>
  );
}

/** 单独组件：为了稳定监听 animationiteration，实现“循环落下” */
function DanmuItem({
  danmu,
  setDanmus,
}: {
  danmu: Danmu;
  setDanmus: React.Dispatch<React.SetStateAction<Danmu[]>>;
}) {
  useEffect(() => {
    const el = document.getElementById(`danmu-${danmu.id}`);
    if (!el) return;

    const handler = () => {
      const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
      setDanmus((prev) =>
        prev.map((item) =>
          item.id === danmu.id
            ? {
                ...item,
                top: 20 + Math.random() * 60,
                duration: isMobile ? 10 + Math.random() * 6 : 7 + Math.random() * 5,
              }
            : item
        )
      );
    };

    el.addEventListener("animationiteration", handler);
    return () => el.removeEventListener("animationiteration", handler);
  }, [danmu.id, setDanmus]);

  return (
    <div
      id={`danmu-${danmu.id}`}
      className="message-star text-lg md:text-2xl italic"
      style={{
        top: `${danmu.top}%`,
        animationDuration: `${danmu.duration}s`,
      }}
    >
      {danmu.text}
    </div>
  );
}
