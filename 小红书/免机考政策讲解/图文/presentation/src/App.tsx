import "./styles/fonts.css";
import "./styles/tokens.css";
import "./styles/base.css";
import "./styles/animations.css";
import "./pages/Ex34.css";

import { useEffect, useState } from "react";
import { PageDots } from "./components/PageDots";
import { SettingsPanel } from "./components/SettingsPanel";
import { Stage } from "./components/Stage";
import { PAGES, categoriesForPage } from "./data/categories";
import { useStepper } from "./hooks/useStepper";
import { CategoryPage } from "./pages/CategoryPage";

const TOTAL = PAGES.length;
const SIZE_KEY = "xhs-exemption-item-size";
const DEFAULT_ITEM_SIZE = 29;

function readStoredSize(): number {
  try {
    const raw = localStorage.getItem(SIZE_KEY);
    const n = raw == null ? NaN : Number(raw);
    if (Number.isFinite(n) && n >= 18 && n <= 40) return n;
  } catch {
    /* ignore */
  }
  return DEFAULT_ITEM_SIZE;
}

export default function App() {
  const { step, totalSteps, next, jump } = useStepper(TOTAL);
  const [itemSize, setItemSize] = useState(readStoredSize);

  useEffect(() => {
    try {
      localStorage.setItem(SIZE_KEY, String(itemSize));
    } catch {
      /* ignore */
    }
  }, [itemSize]);

  return (
    <>
      <Stage
        onAdvance={next}
        style={{ ["--ex34-item-size" as string]: `${itemSize}px` }}
      >
        <div key={step} className="scene">
          <CategoryPage categories={categoriesForPage(step)} />
        </div>
      </Stage>
      <SettingsPanel
        schoolSize={itemSize}
        onSchoolSizeChange={setItemSize}
      />
      <PageDots total={totalSteps} current={step} onJump={jump} />
    </>
  );
}
