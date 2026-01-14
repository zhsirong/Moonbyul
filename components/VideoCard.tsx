import YouTube from 'react-youtube';
import { useState } from 'react';

export default function VideoCard({ videoId }: { videoId: string }) {
  const [player, setPlayer] = useState<any>(null);

  const onReady = (event: any) => {
    setPlayer(event.target);
    event.target.mute(); // 必须静音才能自动播放
  };

  return (
    <div 
      // 修复重点：所有的样式必须全部放在 className 字符串里
      className="group aspect-video rounded-[60px] overflow-hidden bg-black border border-white/10 transition-all duration-700 hover:border-violet-400 hover:shadow-[0_0_100px_rgba(139,92,246,0.3)] hover:scale-105 transform cursor-pointer"
      onMouseEnter={() => player && player.playVideo()}
      onMouseLeave={() => player && player.pauseVideo()}
    >
      <YouTube 
        videoId={videoId} 
        onReady={onReady}
        opts={{ 
          width: '100%', 
          height: '100%', 
          playerVars: { 
            rel: 0, 
            modestbranding: 1, 
            controls: 0, 
            iv_load_policy: 3,
            disablekb: 1,
            autoplay: 0 
          } 
        }} 
        className="w-full h-full opacity-70 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" 
      />
    </div>
  );
}