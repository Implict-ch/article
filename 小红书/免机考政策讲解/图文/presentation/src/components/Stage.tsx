import type { CSSProperties, ReactNode } from "react";
import { useStageScale } from "../hooks/useStageScale";

const STAGE_W = 1080;
const STAGE_H = 1440;

interface Props {
  onAdvance(): void;
  children: ReactNode;
  style?: CSSProperties;
}

export function Stage({ onAdvance, children, style }: Props) {
  const scale = useStageScale();
  const fitterStyle: CSSProperties = {
    width: STAGE_W * scale,
    height: STAGE_H * scale,
  };
  const frameStyle: CSSProperties = {
    ...style,
    transform: `scale(${scale})`,
  };

  return (
    <div className="app-shell">
      <div className="stage-fitter" style={fitterStyle}>
        <div
          className="stage-frame"
          style={frameStyle}
          onClick={(e) => {
            const t = e.target as HTMLElement;
            if (t.closest("button, a, input, [data-no-advance]")) return;
            onAdvance();
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
