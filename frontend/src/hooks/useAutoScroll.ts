import { useEffect, useRef } from "react";

export default function useAutoScroll(dependency: unknown) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    element.scrollTop = element.scrollHeight;
  }, [dependency]);

  return ref;
}
