"use client";

import { useEffect, useRef, useState } from "react";

interface StatCounterProps {
  count: number;
  suffix?: string;
  label: string;
  delay?: string;
}

export default function StatCounter({ count, suffix = "", label, delay }: StatCounterProps) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          el.classList.add("is-in");
          const duration = 1400;
          const start = performance.now();
          const animate = (now: number) => {
            const t = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - t, 3);
            setValue(Math.round(eased * count));
            if (t < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [count]);

  const style = delay ? ({ "--d": delay } as React.CSSProperties) : undefined;

  return (
    <div className="stat" data-reveal ref={ref} style={style}>
      <span className="stat__num">
        {value}{suffix}
      </span>
      <span className="stat__label">{label}</span>
    </div>
  );
}
