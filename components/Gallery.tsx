import Masonry from 'react-masonry-css';

export default function Gallery({ items }: any) {
  // 统一适配方案：让布局随屏幕宽度丝滑切换
  const breakpointColumns = {
    default: 4, // 宽屏 4 列
    1200: 3,    // 中屏 3 列
    800: 2,     // 平板 2 列
    500: 1      // 手机 1 列
  };

  return (
    <Masonry
      breakpointCols={breakpointColumns}
      className="flex w-auto -ml-6" // 增大间距，更有呼吸感
      columnClassName="pl-6 bg-clip-padding"
    >
      {items.map((item: any) => (
        <div 
          key={item.id} 
          className="mb-6 overflow-hidden rounded-[24px] group relative border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(139,92,246,0.2)] hover:border-violet-500/30"
        >
          {/* 图片增加亮度提升效果 */}
          <img 
            src={item.src} 
            alt={item.title} 
            className="w-full h-auto block transition-all duration-700 group-hover:scale-110 group-hover:brightness-110" 
          />
          
          {/* 渐变遮罩：改用深紫色调，告别丧葬感 */}
          <div className="absolute inset-0 bg-gradient-to-t from-violet-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end p-6">
            <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              <p className="text-white text-lg font-serif italic drop-shadow-md">{item.title}</p>
            </div>
          </div>
        </div>
      ))}
    </Masonry>
  );
}