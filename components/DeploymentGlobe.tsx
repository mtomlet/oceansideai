"use client";

import { useEffect, useRef } from "react";
import deployments from "@/lib/deployments.json";

type Dot = { c: string; r: string; s: string; lat: number; lng: number };
const DOTS = deployments as Dot[];
const RAD = Math.PI / 180;

export default function DeploymentGlobe() {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = canvas.current!;
    const ctx = cv.getContext("2d")!;
    let land: number[] = [];
    fetch("/globe-land.json")
      .then((r) => r.json())
      .then((d) => (land = d))
      .catch(() => {});

    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const view = { lng: -96, tilt: 24 };
    let size = 0;
    let dpr = 1;
    let raf = 0;
    let visible = true;

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
    let lastX = 0;
    let lastY = 0;
    let lastT = 0;
    let idleSince = 0;
    let vx = 0; // degrees of longitude per frame from a flick
    let vy = 0;
    const AUTO = reduce ? 0 : 0.05;

    const draw = (time: number) => {
      raf = requestAnimationFrame(draw);
      if (!visible || !size) return;
      if (!dragging) {
        view.lng -= vx;
        view.tilt = Math.max(-70, Math.min(70, view.tilt + vy));
        vy *= 0.92;
        // a flick coasts and slows; after a short rest the globe eases back into a slow spin
        if (time - idleSince > 2500) vx += (AUTO - vx) * 0.03;
        else vx *= 0.95;
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
      const pulse = (time / 1000) % 2.4;
      DOTS.forEach((d, i) => {
        const p = project(d.lat, d.lng);
        if (p.z <= 0.02) return;
        const x = c + p.x * R;
        const y = c - p.y * R;
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

    const degPerPx = () => 180 / (size * 0.46 * Math.PI);
    const onDown = (e: PointerEvent) => {
      dragging = true;
      vx = vy = 0;
      lastX = e.clientX;
      lastY = e.clientY;
      lastT = performance.now();
      cv.setPointerCapture(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      const k = degPerPx();
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      const now = performance.now();
      const frames = Math.max(1, (now - lastT) / 16.7);
      view.lng -= dx * k;
      view.tilt = Math.max(-70, Math.min(70, view.tilt + dy * k));
      vx = (dx * k) / frames;
      vy = (dy * k) / frames;
      lastX = e.clientX;
      lastY = e.clientY;
      lastT = now;
    };
    const onUp = () => {
      dragging = false;
      if (performance.now() - lastT > 80) vx = vy = 0; // held still before letting go
      vx = Math.max(-6, Math.min(6, vx));
      vy = Math.max(-4, Math.min(4, vy));
      idleSince = performance.now();
    };
    cv.addEventListener("pointerdown", onDown);
    cv.addEventListener("pointermove", onMove);
    cv.addEventListener("pointerup", onUp);
    cv.addEventListener("pointercancel", onUp);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      cv.removeEventListener("pointerdown", onDown);
      cv.removeEventListener("pointermove", onMove);
      cv.removeEventListener("pointerup", onUp);
      cv.removeEventListener("pointercancel", onUp);
    };
  }, []);

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[560px]">
      <canvas
        ref={canvas}
        className="h-full w-full cursor-grab touch-none active:cursor-grabbing"
        aria-label="Spinning globe with a dot for every business location running one of our voice agents. Drag to spin it."
        role="img"
      />
    </div>
  );
}
