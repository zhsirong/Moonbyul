import { MOONBYUL_IMAGES, MOONBYUL_VIDEOS, MOONBYUL_ICONIC } from "../data";
import Gallery from "../components/Gallery";
import VideoCard from "../components/VideoCard";
import IconicVideoCard from "../components/IconicVideoCard";
import { useState } from "react";

export default function Home() {
  const [inputText, setInputText] = useState("");
  const [danmus, setDanmus] = useState<
    { id: number; text: string; top: number; duration: number }[]
  >([]);

  // 发送留言逻辑
  const handleSendMessage = () => {
  if (!inputText.trim()) return;

  // ✅ 放在这里：函数内部，newDanmu 之前
  const isMobile =
    typeof window !== "undefined" && window.innerWidth < 768;

  const newDanmu = {
    id: Date.now(),
    text: inputText,
    top: 20 + Math.random() * 60,
    duration: isMobile
      ? 10 + Math.random() * 6   // 手机更慢
      : 7 + Math.random() * 5,   // 桌面端
  };

  setDanmus([...danmus, newDanmu]);
  setInputText("");
};


  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* 1. 流星层：fixed，滚动时背景不消失 */}
      <div className="night-sky fixed inset-0 pointer-events-none">
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            className="shooting-star"
            style={
              {
                // @ts-ignore
                '--delay': `${Math.random() * 14}s`,
'--duration': `${7 + Math.random() * 5}s`,
                top: `${Math.random() * 60}%`,
                left: `${Math.random() * 100}%`,
              } as React.CSSProperties
            }
          ></div>
        ))}
      </div>

      {/* 留言弹幕展示层 */}
      {danmus.map((d) => (
  <div
    key={d.id}
    className="message-star text-lg md:text-2xl italic"
    style={{
      top: `${d.top}%`,
      animationDuration: `${d.duration}s`,
    }}
    onAnimationIteration={() => {
      setDanmus((prev) =>
        prev.map((item) =>
          item.id === d.id
            ? {
                ...item,
                top: 20 + Math.random() * 60,
                duration: 7 + Math.random() * 5,
              }
            : item
        )
      );
    }}
  >
    {d.text}
  </div>
))}


      {/* ✅ 前景内容统一放在 z-10 容器里，避免多余 </div> */}
      <div className="relative z-10 w-full">
        {/* Header */}
        <header className="py-32 md:py-64 text-center px-4 overflow-hidden">
          <h1 className="text-[6rem] md:text-[18rem] lg:text-[22rem] font-serif italic tracking-tighter bg-gradient-to-b from-white via-violet-100 to-violet-500 bg-clip-text text-transparent drop-shadow-[0_0_80px_rgba(139,92,246,0.6)] leading-[0.8] break-all">
            Moonbyul
          </h1>
          <p className="mt-8 md:mt-12 text-zinc-100 tracking-[0.3em] md:tracking-[0.8em] uppercase text-sm md:text-2xl font-black opacity-100 drop-shadow-md">
            The Soloist & Muse / 玟星
          </p>
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

        {/* Section 02: Moonbyul 知名瞬间（本地/Blob 视频） */}
        <section className="max-w-[1700px] mx-auto px-6 md:px-16 mb-48 md:mb-80">
          <div className="flex items-center gap-6 md:gap-12 mb-16 md:mb-32">
            <span className="text-sm md:text-xl font-mono tracking-widest text-violet-300 font-bold uppercase">
              SCENE 02 // ICONIC MOMENTS
            </span>
            <div className="h-[1px] md:h-[2px] flex-1 bg-gradient-to-r from-violet-600 to-transparent" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
            {/* 左：一张超大主视频 */}
            <div className="md:col-span-8">
              <IconicVideoCard
                src={MOONBYUL_ICONIC[0]?.src}
                title={MOONBYUL_ICONIC[0]?.title}
              />
            </div>

            {/* 右：两张小的堆叠 */}
            <div className="md:col-span-4 flex flex-col gap-10 md:gap-16">
              {MOONBYUL_ICONIC.slice(1, 3).map((v) => (
                <IconicVideoCard key={v.id} src={v.src} title={v.title} />
              ))}
            </div>

            {/* 下：第4个（可选） */}
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
              <div key={v.id} className={index % 3 === 0 ? "md:col-span-2" : ""}>
                <VideoCard videoId={v.id} />
              </div>
            ))}
          </div>
        </section>

        {/* 留言框 */}
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
                className="px-10 py-3 bg-violet-600/80 hover:bg-violet-500 text-white rounded-full text-xs md:text-sm font-black tracking-widest transition-all hover:scale-105 active:scale-95">

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
