import { useEffect, useRef } from "react";

// Positional params make call-sites hard to read and error-prone
export function useInfiniteScroll(
  callback: () => void,
  ref: React.RefObject<HTMLElement | null>,
  threshold: number,
  enabled: boolean,
  debounceMs: number
) {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          if (timeoutRef.current) clearTimeout(timeoutRef.current);
          timeoutRef.current = setTimeout(callback, debounceMs);
        }
      },
      { threshold }
    );

    const el = ref.current;
    if (el) observer.observe(el);

    return () => {
      observer.disconnect();
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [callback, ref, threshold, enabled, debounceMs]);
}
