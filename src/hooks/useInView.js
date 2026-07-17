import { useEffect, useRef, useState } from 'react';

export function useInView(options = {}) {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (!options.repeat) {
            observer.unobserve(element);
          }
        } else if (options.repeat) {
          setIsInView(false);
        }
      },
      {
        threshold: options.threshold || 0.15,
        rootMargin: options.rootMargin || '0px 0px -60px 0px',
      }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [options.threshold, options.rootMargin, options.repeat]);

  return [ref, isInView];
}

export function useStaggeredInView(count, baseDelay = 100) {
  const [ref, isInView] = useInView({ threshold: 0.1 });
  const delays = Array.from({ length: count }, (_, i) => i * baseDelay);
  return [ref, isInView, delays];
}
