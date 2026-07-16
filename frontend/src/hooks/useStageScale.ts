import { useEffect } from "react";

export default function useStageScale() {
  useEffect(() => {
    const stage = document.querySelector<HTMLElement>(".stage");

    if (!stage) {
      return undefined;
    }

    const fit = () => {
      const scale = Math.min(window.innerWidth / 1280, window.innerHeight / 720);
      stage.style.transform = `scale(${scale})`;
    };

    fit();
    window.addEventListener("resize", fit);

    return () => window.removeEventListener("resize", fit);
  }, []);
}
