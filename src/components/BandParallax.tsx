"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export default function BandParallax() {
  const mediaRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const media = mediaRef.current;
    if (!section || !media) return;

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const viewH = window.innerHeight;
      if (rect.bottom < 0 || rect.top > viewH) return;
      const progress = (viewH - rect.top) / (viewH + rect.height);
      const offset = (progress - 0.5) * 80;
      media.style.transform = `translateY(${offset}px)`;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="band" aria-label="Founder quote" ref={sectionRef}>
      <div className="band__media" ref={mediaRef} id="band-media">
        <Image
          src="/images/site-aerial.svg"
          alt="Aerial view of a Hartwell crew walking a rebar deck"
          fill
          style={{ objectFit: "cover" }}
          loading="lazy"
        />
      </div>
      <div className="band__content container">
        <blockquote data-reveal>
          <p>&ldquo;A building is only as honest as the people who frame it.&rdquo;</p>
          <cite>Daniel Hartwell &mdash; Founder</cite>
        </blockquote>
      </div>
    </section>
  );
}
