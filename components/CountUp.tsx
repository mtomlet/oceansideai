"use client";

import { useEffect, useRef, useState } from "react";

export default function CountUp({ to, duration = 1800 }: { to: number; duration?: number }) {
  const el = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(to);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setN(0);
    let raf = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const tick = (t: number) => {
          const u = Math.min(1, (t - t0) / duration);
          setN(Math.round(to * (1 - Math.pow(1 - u, 3))));
          if (u < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 }
    );
    if (el.current) io.observe(el.current);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to, duration]);
  return (
    <span ref={el} className="tabular-nums">
      {n}
    </span>
  );
}
