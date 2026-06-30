"use client";

import { useEffect, useRef } from "react";

const STAGES: [number, number, string][] = [
  [0.04, 0.30, "Every project starts as level ground."],
  [0.36, 0.62, "Framed by hand. Checked twice."],
  [0.68, 0.94, "Move-in ready. Right on schedule."],
];

export default function ScrubHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const cueRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLElement>(null);
  const stageRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!section || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Draw a construction-atmosphere gradient on canvas
    const draw = (progress: number) => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      // Sky gradient evolves from night → golden hour → day
      const skyGrad = ctx.createLinearGradient(0, 0, 0, h);
      const p = progress;

      // Dark to warm golden progression
      const r1 = Math.round(10 + p * 50);
      const g1 = Math.round(8 + p * 30);
      const b1 = Math.round(5 + p * 15);
      const r2 = Math.round(30 + p * 100);
      const g2 = Math.round(20 + p * 60);
      const b2 = Math.round(10 + p * 20);

      skyGrad.addColorStop(0, `rgb(${r1},${g1},${b1})`);
      skyGrad.addColorStop(0.5, `rgb(${r2},${g2},${b2})`);
      skyGrad.addColorStop(1, `rgb(${Math.round(22 + p * 40)},${Math.round(18 + p * 30)},${Math.round(12 + p * 10)})`);
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, w, h);

      // Ground
      ctx.fillStyle = `rgb(${Math.round(20 + p * 30)},${Math.round(16 + p * 20)},${Math.round(10 + p * 10)})`;
      ctx.fillRect(0, h * 0.65, w, h);

      // Framing structure — grows with progress
      if (progress > 0.02) {
        const frameProgress = Math.min(1, (progress - 0.02) / 0.7);
        ctx.strokeStyle = `rgba(160, 120, 80, ${0.3 + frameProgress * 0.5})`;
        ctx.lineWidth = 3;

        const baseY = h * 0.65;
        const maxFrameH = h * 0.55;
        const currentH = maxFrameH * frameProgress;

        // Vertical studs
        for (let i = 0; i < 8; i++) {
          const x = w * 0.15 + (w * 0.7 * i) / 7;
          ctx.beginPath();
          ctx.moveTo(x, baseY);
          ctx.lineTo(x, baseY - currentH);
          ctx.stroke();
        }

        // Horizontal beams
        const beamCount = Math.floor(frameProgress * 5);
        for (let i = 0; i <= beamCount; i++) {
          const y = baseY - (currentH * i) / 5;
          ctx.beginPath();
          ctx.moveTo(w * 0.15, y);
          ctx.lineTo(w * 0.85, y);
          ctx.stroke();
        }

        // Roof lines at end
        if (frameProgress > 0.7) {
          const roofAlpha = (frameProgress - 0.7) / 0.3;
          ctx.strokeStyle = `rgba(180, 140, 90, ${roofAlpha * 0.8})`;
          ctx.lineWidth = 4;
          ctx.beginPath();
          ctx.moveTo(w * 0.1, baseY - currentH);
          ctx.lineTo(w * 0.5, baseY - currentH - h * 0.12);
          ctx.lineTo(w * 0.9, baseY - currentH);
          ctx.stroke();
        }
      }

      // Atmospheric haze
      const hazeGrad = ctx.createLinearGradient(0, 0, 0, h);
      hazeGrad.addColorStop(0, "rgba(10,8,5,0.45)");
      hazeGrad.addColorStop(0.32, "transparent");
      hazeGrad.addColorStop(0.62, "transparent");
      hazeGrad.addColorStop(1, "rgba(10,8,5,0.5)");
      ctx.fillStyle = hazeGrad;
      ctx.fillRect(0, 0, w, h);
    };

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      draw(0);
    };

    resize();
    window.addEventListener("resize", resize);

    let started = false;

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const total = section.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / total));

      draw(progress);

      // Fade intro out once scrolling starts
      if (introRef.current) {
        introRef.current.style.opacity = String(Math.max(0, 1 - progress * 8));
      }

      // Fade cue out
      if (cueRef.current) {
        cueRef.current.style.opacity = String(Math.max(0, 1 - progress * 6));
      }

      // Progress bar
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${progress})`;
      }

      // Stage captions
      stageRefs.current.forEach((el, i) => {
        if (!el) return;
        const [start, end] = STAGES[i];
        const inRange = progress >= start && progress <= end;
        el.style.opacity = inRange ? "1" : "0";
      });

      if (!started && progress > 0) started = true;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section
      className="scrub"
      id="scrub"
      ref={sectionRef}
      aria-label="Timelapse of a Hartwell home being framed — scroll to play"
    >
      <div className="scrub__sticky">
        <div className="scrub__frame">
          <canvas
            ref={canvasRef}
            id="scrub-canvas"
            className="scrub__video"
            style={{ width: "100%", height: "100%" }}
          />
          <div className="scrub__scrim" aria-hidden="true" />

          <div className="scrub__intro" id="scrub-intro" ref={introRef}>
            <p className="scrub__eyebrow">Hartwell &mdash; Est. 1998 &middot; Vancouver, BC</p>
            <h1 className="scrub__title">
              We build
              <br />
              what lasts.
            </h1>
            <p className="scrub__sub">
              Construction &amp; restoration, done the old way &mdash; properly.
            </p>
          </div>

          {STAGES.map(([, , text], i) => (
            <p
              key={i}
              className="scrub__stage"
              ref={(el) => { stageRefs.current[i] = el; }}
            >
              {text}
            </p>
          ))}

          <div className="scrub__cue" ref={cueRef} aria-hidden="true">
            <span className="scrub__cue-text">Scroll to build</span>
            <span className="scrub__cue-line"></span>
          </div>

          <div className="scrub__progress" aria-hidden="true">
            <i ref={barRef} id="scrub-bar" />
          </div>
        </div>
      </div>
    </section>
  );
}
