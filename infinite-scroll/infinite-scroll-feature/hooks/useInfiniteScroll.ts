import { useEffect, useRef } from "react";

// ⚠️ Positional params make call-sites hard to read and error-prone — consider an options object instead.
// ⚠️ callback is listed as a dependency but is not expected to be stable — if the caller doesn't wrap it in useCallback, this effect re-subscribes on every render.
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
