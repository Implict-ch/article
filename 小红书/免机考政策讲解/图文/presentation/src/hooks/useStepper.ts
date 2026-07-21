import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "xhs-exemption-34-v2";

export function useStepper(totalSteps: number) {
  const [step, setStep] = useState(() => {
    if (typeof window === "undefined") return 0;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw != null) {
        const n = Number(raw);
        if (Number.isFinite(n)) {
          return Math.max(0, Math.min(totalSteps - 1, n | 0));
        }
      }
    } catch {
      /* ignore */
    }
    return 0;
  });

  useEffect(() => {
    setStep((s) => Math.max(0, Math.min(totalSteps - 1, s)));
  }, [totalSteps]);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, String(step));
    } catch {
      /* ignore */
    }
  }, [step]);

  const next = useCallback(() => {
    setStep((s) => Math.min(totalSteps - 1, s + 1));
  }, [totalSteps]);

  const prev = useCallback(() => {
    setStep((s) => Math.max(0, s - 1));
  }, []);

  const jump = useCallback(
    (i: number) => {
      setStep(Math.max(0, Math.min(totalSteps - 1, i)));
    },
    [totalSteps],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) return;
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        next();
      } else if (e.key === "ArrowLeft" || e.key === "Backspace") {
        e.preventDefault();
        prev();
      } else if (e.key === "Home") {
        jump(0);
      } else if (e.key === "End") {
        jump(totalSteps - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev, jump, totalSteps]);

  return { step, totalSteps, next, prev, jump };
}
