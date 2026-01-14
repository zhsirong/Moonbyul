import { MOONBYUL_IMAGES, MOONBYUL_VIDEOS } from "../data";
import Gallery from "../components/Gallery";
import VideoCard from "../components/VideoCard";

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-x-hidden selection:bg-violet-500/30">
      
      {/* 1. 流星层：改为 fixed 以确保滚动时背景不消失，且通过 CSS 控制随机位置 */}
      <div className="night-sky fixed inset-0 pointer-events-none">
        {[...Array(40)].map((_, i) => (
          <div 
            key={i} 
            className="shooting-star" 
            style={{
              // @ts-ignore
              '--delay': `${Math.random() * 8}s`,
              '--duration': `${2 + Math.random() * 2}s`,
              top: `${Math.random() * 60}%`,
              left: `${Math.random() * 100}%`,
            }}
          ></div>
        ))}
      </div>

      <div className="relative z-10 w-full">
        
        {/* Header: 使用 md: 前缀区分手机和电脑字号 */}
        <header className="py-32 md:py-64 text-center px-4 overflow-hidden">
          <h1 className="text-[6rem] md:text-[18rem] lg:text-[22rem] font-serif italic tracking-tighter bg-gradient-to-b from-white via-violet-100 to-violet-500 bg-clip-text text-transparent drop-shadow-[0_0_80px_rgba(139,92,246,0.6)] leading-[0.8] break-all">
            Moonbyul
          </h1>
          {/* 手机端间距缩窄，防止文字溢出 */}
          <p className="mt-8 md:mt-12 text-zinc-100 tracking-[0.3em] md:tracking-[0.8em] uppercase text-sm md:text-2xl font-black opacity-100 drop-shadow-md">
            The Soloist & Muse / 玟星
          </p>
        </header>

        {/* Section 01: 图片画廊 - 保持杂志留白感 */}
        <main className="max-w-[1400px] mx-auto px-6 md:px-16 mb-48 md:mb-80">
          <div className="flex items-center gap-6 md:gap-10 mb-16 md:mb-32">
            <span className="text-sm md:text-2xl font-mono tracking-widest text-violet-300 font-black uppercase">SCENE 01 // VISUALS</span>
            <div className="h-[1px] md:h-[2px] flex-1 bg-gradient-to-r from-violet-600 to-transparent opacity-50" />
          </div>
          {/* 手机端不使用 scale-105 以免切掉边角 */}
          <div className="md:px-10 md:scale-105"> 
            <Gallery items={MOONBYUL_IMAGES} />
          </div>
        </main>

        {/* Section 02: 视频集锦 - 保持非对称排版 */}
        <section className="max-w-[1700px] mx-auto px-6 md:px-16">
          <div className="flex items-center gap-6 md:gap-12 mb-16 md:mb-32">
            <span className="text-sm md:text-xl font-mono tracking-widest text-violet-300 font-bold uppercase">Film 02 // Cinematic</span>
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

        {/* Footer: 优化后的间距 */}
<footer className="mt-24 md:mt-40 text-center pb-32 px-6"> 
  {/* 原本是 mt-[40rem]，现在改成了 md:mt-40 */}
  <p className="text-lg md:text-3xl text-purple tracking-[0.5em] md:tracking-[1.5em] font-black uppercase opacity-90">
    Dedicated to Moonbyul
  </p>
  <div className="h-[1px] w-40 md:w-80 bg-violet-500/50 mx-auto mt-12 mb-8" />
  <p className="text-xs md:text-lg text-zinc-500 tracking-widest">EST. 2026 ARCHIVE PROJECT</p>
</footer>

      </div>
    </div>
  );
}