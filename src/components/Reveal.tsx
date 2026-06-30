"use client";

import { useEffect, useRef, ReactNode, CSSProperties, ElementType } from "react";

type RevealProps = {
  children: ReactNode;
  delay?: string;
  className?: string;
  style?: CSSProperties;
  as?: ElementType;
  [key: string]: unknown;
};

export default function Reveal({
  children,
  delay,
  className,
  style,
  as: Tag = "div",
  ...rest
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-in");
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const combinedStyle: CSSProperties = {
    ...(delay ? ({ "--d": delay } as CSSProperties) : {}),
    ...style,
  };

  const Component = Tag as "div";

  return (
    <Component
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      data-reveal=""
      className={className}
      style={combinedStyle}
      {...(rest as Record<string, unknown>)}
    >
      {children}
    </Component>
  );
}
