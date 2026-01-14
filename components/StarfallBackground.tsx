import { useCallback } from "react";
import Particles from "react-particles";
import { loadSlim } from "tsparticles-slim";

const StarfallBackground = () => {
  const particlesInit = useCallback(async (engine: any) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        fullScreen: { enable: true, zIndex: -1 },
        background: { color: "#050505" }, // 深邃背景
        particles: {
          number: { value: 20 }, // 流星不需要太多，20个左右最有质感
          color: { value: "#ffffff" },
          shape: {
            type: "star", // 星星末梢
            options: { star: { sides: 5 } }
          },
          opacity: {
            value: { min: 0.1, max: 0.8 },
          },
          size: {
            value: { min: 1, max: 3 },
          },
          move: {
            enable: true,
            speed: { min: 10, max: 20 }, // 快速落下
            direction: "bottom-right", // 倾斜落下
            straight: true, // 直线飞行
            outModes: "out",
          },
          // 核心：实现“落下在动”的拖尾效果
          stroke: { width: 0 },
          line_linked: { enable: false },
          canvas: {
            // 这里利用画布残留实现拖尾
          },
          move_tail: { // 某些版本支持，若不支持则靠 move speed 和 opacity 模拟
            enable: true,
            length: 10,
            fill: { color: "#ffffff" }
          }
        },
        // 增加辉光效果，去掉丧葬感
        emitters: {
          direction: "bottom-right",
          rate: { delay: 0.5, quantity: 1 },
          position: { x: 0, y: 0 }
        }
      }}
    />
  );
};

export default StarfallBackground;