import "./styles/fonts.css";
import "./styles/tokens.css";
import "./styles/base.css";
import "./styles/animations.css";
import "./pages/Tu34.css";

import { useEffect, useState } from "react";
import { PageDots } from "./components/PageDots";
import { SettingsPanel } from "./components/SettingsPanel";
import { Stage } from "./components/Stage";
import { PAGES, regionsForPage } from "./data/regions";
import { useStepper } from "./hooks/useStepper";
import { CoverPage } from "./pages/CoverPage";
import { RegionPage } from "./pages/RegionPage";

const TOTAL = PAGES.length + 1; // 封面 + 地区页
const SIZE_KEY = "xhs-target-univ-school-size";
const DEFAULT_SCHOOL_SIZE = 29;

function readStoredSize(): number {
  try {
    const raw = localStorage.getItem(SIZE_KEY);
    const n = raw == null ? NaN : Number(raw);
    if (Number.isFinite(n) && n >= 18 && n <= 40) return n;
  } catch {
    /* ignore */
  }
  return DEFAULT_SCHOOL_SIZE;
}

export default function App() {
  const { step, totalSteps, next, jump } = useStepper(TOTAL);
  const [schoolSize, setSchoolSize] = useState(readStoredSize);

  useEffect(() => {
    try {
      localStorage.setItem(SIZE_KEY, String(schoolSize));
    } catch {
      /* ignore */
    }
  }, [schoolSize]);

  return (
    <>
      <Stage
        onAdvance={next}
        style={{ ["--tu34-school-size" as string]: `${schoolSize}px` }}
      >
        <div key={step} className="scene">
          {step === 0 ? (
            <CoverPage />
          ) : (
            <RegionPage regions={regionsForPage(step - 1)} />
          )}
        </div>
      </Stage>
      {step > 0 ? (
        <SettingsPanel
          schoolSize={schoolSize}
          onSchoolSizeChange={setSchoolSize}
        />
      ) : null}
      <PageDots total={totalSteps} current={step} onJump={jump} />
    </>
  );
}
