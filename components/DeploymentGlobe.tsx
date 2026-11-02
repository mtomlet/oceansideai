"use client";

import { useEffect, useRef, useState } from "react";
import deployments from "@/lib/deployments.json";

type Dot = { c: string; r: string; s: string; lat: number; lng: number };
const DOTS = deployments as Dot[];
const RAD = Math.PI / 180;

export default function DeploymentGlobe() {
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const [tip, setTip] = useState<{ x: number; y: number; d: Dot } | null>(null);

  useEffect(() => {
    const cv = canvas.current!;
    const ctx = cv.getContext("2d")!;
    let land: number[] = [];
    fetch("/globe-land.json")
      .then((r) => r.json())
      .then((d) => (land = d))
      .catch(() => {});

    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const view = { lng: -96, tilt: 24, vel: reduce ? 0 : 0.06 };
    let size = 0;
    let dpr = 1;
    let raf = 0;
    let visible = true;
    let screen: { x: number; y: number; i: number }[] = [];

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      size = cv.clientWidth;
      cv.width = size * dpr;
      cv.height = size * dpr;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(cv);
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(cv);

    // orthographic projection: returns screen x, y and depth (z > 0 faces the viewer)
    const project = (lat: number, lng: number) => {
      const la = lat * RAD;
      const lo = (lng - view.lng) * RAD;
      const t = view.tilt * RAD;
      const x = Math.cos(la) * Math.sin(lo);
      const y0 = Math.sin(la);
      const z0 = Math.cos(la) * Math.cos(lo);
      const y = y0 * Math.cos(t) - z0 * Math.sin(t);
      const z = y0 * Math.sin(t) + z0 * Math.cos(t);
      return { x, y, z };
    };

    let dragging = false;
    let last = 0;
    let lastX = 0;
    let lastY = 0;

    const draw = (time: number) => {
      raf = requestAnimationFrame(draw);
      if (!visible || !size) return;
      if (!dragging) {
        view.lng -= view.vel;
        if (Math.abs(view.vel) > 0.06) view.vel *= 0.95;
      }
      const R = size * 0.46;
      const c = size / 2;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, size, size);

      // sphere body and rim
      const body = ctx.createRadialGradient(c - R * 0.35, c - R * 0.4, R * 0.1, c, c, R);
      body.addColorStop(0, "rgba(45,212,191,0.07)");
      body.addColorStop(1, "rgba(10,16,22,0.95)");
      ctx.fillStyle = body;
      ctx.beginPath();
      ctx.arc(c, c, R, 0, Math.PI * 2);
      ctx.fill();
      const rim = ctx.createRadialGradient(c, c, R * 0.92, c, c, R * 1.12);
      rim.addColorStop(0, "rgba(94,234,212,0.18)");
      rim.addColorStop(1, "rgba(94,234,212,0)");
      ctx.fillStyle = rim;
      ctx.beginPath();
      ctx.arc(c, c, R * 1.12, 0, Math.PI * 2);
      ctx.arc(c, c, R, 0, Math.PI * 2, true);
      ctx.fill();

      // land as a dot matrix
      for (let i = 0; i < land.length; i += 2) {
        const p = project(land[i + 1], land[i]);
        if (p.z <= 0) continue;
        ctx.fillStyle = `rgba(226,240,255,${0.08 + p.z * 0.22})`;
        ctx.fillRect(c + p.x * R - 0.9, c - p.y * R - 0.9, 1.8, 1.8);
      }

      // deployments
      screen = [];
      const pulse = (time / 1000) % 2.4;
      DOTS.forEach((d, i) => {
        const p = project(d.lat, d.lng);
        if (p.z <= 0.02) return;
        const x = c + p.x * R;
        const y = c - p.y * R;
        screen.push({ x, y, i });
        const off = d.s.includes("offline");
        const a = 0.35 + p.z * 0.65;
        ctx.fillStyle = off ? `rgba(148,163,184,${a * 0.25})` : `rgba(94,234,212,${a * 0.18})`;
        ctx.beginPath();
        ctx.arc(x, y, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = off ? `rgba(203,213,225,${a})` : `rgba(153,246,228,${a})`;
        ctx.beginPath();
        ctx.arc(x, y, 2.4, 0, Math.PI * 2);
        ctx.fill();
        if (!reduce && !off && i % 9 === 0 && pulse < 1.6) {
          ctx.strokeStyle = `rgba(94,234,212,${(1 - pulse / 1.6) * 0.5 * a})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(x, y, 3 + pulse * 9, 0, Math.PI * 2);
          ctx.stroke();
        }
      });
    };
    raf = requestAnimationFrame(draw);

    let downX = 0;
    let downY = 0;
    const onDown = (e: PointerEvent) => {
      dragging = true;
      downX = lastX = e.clientX;
      downY = lastY = e.clientY;
      last = performance.now();
      cv.setPointerCapture(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      const k = 180 / (size * 0.46 * Math.PI);
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      view.lng -= dx * k;
      view.tilt = Math.max(-60, Math.min(60, view.tilt + dy * k));
      const now = performance.now();
      view.vel = (-dx * k) / Math.max(1, (now - last) / 16);
      view.vel = -view.vel;
      last = now;
      lastX = e.clientX;
      lastY = e.clientY;
    };
    const onUp = (e: PointerEvent) => {
      dragging = false;
      if (Math.abs(view.vel) < 0.06 && !reduce) view.vel = 0.06;
      if (Math.hypot(e.clientX - downX, e.clientY - downY) > 5) return;
      const box = cv.getBoundingClientRect();
      const mx = e.clientX - box.left;
      const my = e.clientY - box.top;
      let best: { x: number; y: number; i: number } | null = null;
      let bd = 16 * 16;
      for (const s of screen) {
        const d = (s.x - mx) ** 2 + (s.y - my) ** 2;
        if (d < bd) {
          bd = d;
          best = s;
        }
      }
      setTip(best ? { x: best.x, y: best.y, d: DOTS[best.i] } : null);
    };
    cv.addEventListener("pointerdown", onDown);
    cv.addEventListener("pointermove", onMove);
    cv.addEventListener("pointerup", onUp);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      cv.removeEventListener("pointerdown", onDown);
      cv.removeEventListener("pointermove", onMove);
      cv.removeEventListener("pointerup", onUp);
    };
  }, []);

  return (
    <div ref={wrap} className="relative mx-auto aspect-square w-full max-w-[560px]">
      <canvas
        ref={canvas}
        className="h-full w-full cursor-grab touch-none active:cursor-grabbing"
        aria-label="Spinning globe with a dot for every location running one of our voice agents"
        role="img"
      />
      {tip && (
        <div
          className="pointer-events-none absolute z-10 w-max max-w-[220px] -translate-x-1/2 -translate-y-[calc(100%+14px)] rounded-xl border border-white/10 bg-[#0c1014]/95 px-3.5 py-2.5 text-left shadow-[0_20px_50px_-15px_rgba(0,0,0,0.9)]"
          style={{ left: tip.x, top: tip.y }}
        >
          <p className="text-sm font-medium text-white">{tip.d.c}</p>
          <p className="text-xs text-white/50">{tip.d.r}</p>
          <p className={`mt-1.5 flex items-center gap-1.5 text-[11px] ${tip.d.s.includes("offline") ? "text-white/45" : "text-teal-200"}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${tip.d.s.includes("offline") ? "bg-white/40" : "bg-teal-300"}`} />
            {tip.d.s}
          </p>
        </div>
      )}
    </div>
  );
}
