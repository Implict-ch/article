import { useEffect, useState } from "react";

/** 3:4 舞台缩放：1080 × 1440 */
export function useStageScale(
  baseW = 1080,
  baseH = 1440,
  marginX = 48,
  marginY = 64,
) {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    function update() {
      const usefulW = Math.max(240, window.innerWidth - marginX * 2);
      const usefulH = Math.max(320, window.innerHeight - marginY * 2);
      setScale(Math.min(usefulW / baseW, usefulH / baseH));
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [baseW, baseH, marginX, marginY]);

  return scale;
}
