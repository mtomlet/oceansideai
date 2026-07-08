"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  motion,
  animate,
  useInView,
  useScroll,
  useTransform,
  useMotionValueEvent,
  type MotionValue,
} from "framer-motion";
import {
  ArrowRight,
  ArrowDown,
  PhoneCall,
  Cpu,
  Shield,
  Clock,
  Globe,
  Play,
  Pause,
  Youtube,
  MessageCircle,
  CheckCircle2,
  Sparkles,
  Linkedin,
  Users,
  Crown,
  Calendar,
  Database,
  Ear,
  Brain,
  Waves,
  ChevronDown,
} from "lucide-react";

const CALENDLY_URL = "https://calendly.com/d/crgj-sgp-sq8";

/* ============================== Logo ============================== */

function LogoOceanside({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-label="Oceanside AI logo">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#6366f1" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="30" fill="none" stroke="url(#g)" strokeWidth="4" opacity="0.25" />
      <path
        d="M50 22c-4-7-12-12-20-12C18 10 8 20 8 32s10 22 22 22c8 0 16-5 20-12"
        fill="none"
        stroke="url(#g)"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <circle cx="54" cy="24" r="3.2" fill="url(#g)" />
      <circle cx="56" cy="40" r="2.4" fill="url(#g)" />
    </svg>
  );
}

/* ============================== Primitives ============================== */

function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Spotlight({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  }, []);
  return (
    <div ref={ref} onMouseMove={onMove} className={`group relative overflow-hidden ${className}`}>
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(440px circle at var(--mx,50%) var(--my,50%), rgba(56,189,248,0.10), transparent 65%)",
        }}
      />
      {children}
    </div>
  );
}

function GradientText({ children }: { children: React.ReactNode }) {
  return (
    <span className="bg-gradient-to-r from-cyan-300 via-sky-400 to-indigo-400 bg-clip-text text-transparent">
      {children}
    </span>
  );
}

function CountUp({
  to,
  prefix = "",
  suffix = "",
}: {
  to: number;
  prefix?: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  useEffect(() => {
    if (!inView || !ref.current) return;
    const controls = animate(0, to, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = `${prefix}${Math.round(v)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, to, prefix, suffix]);
  return <span ref={ref}>{`${prefix}0${suffix}`}</span>;
}

/* ============================== Star / Particle Field ============================== */

function StarField() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0;
    let H = 0;
    let stars: { x: number; y: number; z: number; r: number; tw: number }[] = [];
    const build = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      cv.width = W * dpr;
      cv.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(150, Math.floor((W * H) / 14000));
      stars = Array.from({ length: count }, (_, i) => ({
        x: Math.abs(Math.sin(i * 91.7) * W),
        y: Math.abs(Math.cos(i * 53.3) * H),
        z: 0.3 + (Math.abs(Math.sin(i * 12.9)) % 1) * 0.7,
        r: 0.4 + (Math.abs(Math.cos(i * 7.1)) % 1) * 1.3,
        tw: Math.abs(Math.sin(i * 3.3)) * 6.28,
      }));
    };
    build();
    window.addEventListener("resize", build);
    const t0 = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = (now - t0) / 1000;
      ctx.clearRect(0, 0, W, H);
      for (const s of stars) {
        const a = 0.25 + 0.5 * (0.5 + 0.5 * Math.sin(t * 0.8 * s.z + s.tw));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(148,206,255,${a * s.z})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", build);
    };
  }, []);
  return <canvas ref={ref} className="pointer-events-none fixed inset-0 -z-10 opacity-70" aria-hidden="true" />;
}

/* ============================== Cursor Ripples ============================== */

function CursorRipples() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0;
    let H = 0;
    const size = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      cv.width = W * dpr;
      cv.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    size();
    window.addEventListener("resize", size);
    type Ripple = { x: number; y: number; r: number; max: number; a: number };
    const ripples: Ripple[] = [];
    let lastX = -1;
    let lastY = -1;
    const onMove = (e: PointerEvent) => {
      if (lastX < 0) {
        lastX = e.clientX;
        lastY = e.clientY;
        return;
      }
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      const dist = Math.hypot(dx, dy);
      const STEP = 26;
      if (dist < STEP * 0.5) return;
      const steps = Math.min(6, Math.floor(dist / STEP) || 1);
      for (let s = 1; s <= steps; s++) {
        ripples.push({
          x: lastX + (dx * s) / steps + (Math.random() - 0.5) * 4,
          y: lastY + (dy * s) / steps + (Math.random() - 0.5) * 4,
          r: 1.5,
          max: 22 + Math.random() * 14,
          a: 0.22,
        });
      }
      if (ripples.length > 70) ripples.splice(0, ripples.length - 70);
      lastX = e.clientX;
      lastY = e.clientY;
    };
    window.addEventListener("pointermove", onMove);
    let raf = 0;
    const tick = () => {
      ctx.clearRect(0, 0, W, H);
      for (let i = ripples.length - 1; i >= 0; i--) {
        const p = ripples[i];
        p.r += (p.max - p.r) * 0.035 + 0.25;
        p.a *= 0.968;
        if (p.a < 0.01) {
          ripples.splice(i, 1);
          continue;
        }
        ctx.lineWidth = 1;
        ctx.strokeStyle = `rgba(125,211,252,${p.a})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.stroke();
        ctx.strokeStyle = `rgba(186,230,253,${p.a * 0.4})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 0.6, 0, Math.PI * 2);
        ctx.stroke();
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", size);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);
  return <canvas ref={ref} className="pointer-events-none fixed inset-0 z-[65]" aria-hidden="true" />;
}

/* ============================== Voice Orb (living core) ============================== */

function VoiceOrb({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let raf = 0;
    const size = () => {
      const s = cv.clientWidth || 480;
      cv.width = s * dpr;
      cv.height = s * dpr;
    };
    size();
    window.addEventListener("resize", size);
    const t0 = performance.now();
    const render = (now: number) => {
      const t = (now - t0) / 1000;
      const s = cv.width;
      const c = s / 2;
      const R = s * 0.3;
      ctx.clearRect(0, 0, s, s);
      ctx.globalCompositeOperation = "lighter";
      const breath = 1 + 0.05 * Math.sin(t * 1.4);
      let g = ctx.createRadialGradient(c, c, 0, c, c, R * 0.92 * breath);
      g.addColorStop(0, "rgba(186,240,255,0.55)");
      g.addColorStop(0.35, "rgba(34,211,238,0.22)");
      g.addColorStop(0.75, "rgba(99,102,241,0.10)");
      g.addColorStop(1, "rgba(99,102,241,0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(c, c, R * 0.92 * breath, 0, Math.PI * 2);
      ctx.fill();
      g = ctx.createRadialGradient(c, c, 0, c, c, R * 0.34);
      g.addColorStop(0, "rgba(240,252,255,0.9)");
      g.addColorStop(1, "rgba(125,211,252,0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(c, c, R * 0.34, 0, Math.PI * 2);
      ctx.fill();
      const N = 112;
      ctx.lineCap = "round";
      ctx.lineWidth = Math.max(1.5, s * 0.005);
      for (let i = 0; i < N; i++) {
        const a = (i / N) * Math.PI * 2 + t * 0.12;
        const seed = Math.abs(Math.sin(i * 12.9898) * 43758.5453) % 1;
        const wave =
          (Math.sin(t * 2.4 + i * 0.55) * 0.5 + 0.5) *
          (Math.sin(t * 0.9 + i * 1.7 + seed * 6) * 0.5 + 0.5);
        const len = R * 0.1 + wave * R * 0.42 * (0.35 + seed * 0.65);
        const x1 = c + Math.cos(a) * (R * 1.02);
        const y1 = c + Math.sin(a) * (R * 1.02);
        const x2 = c + Math.cos(a) * (R * 1.02 + len);
        const y2 = c + Math.sin(a) * (R * 1.02 + len);
        const hue = 196 + Math.sin(a + t * 0.5) * 28;
        ctx.strokeStyle = `hsla(${hue}, 92%, 64%, ${0.5 + wave * 0.45})`;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }
      for (let k = 0; k < 2; k++) {
        const phase = ((t * 0.42 + k * 0.5) % 1 + 1) % 1;
        const rr = R * (1.05 + phase * 0.62);
        ctx.strokeStyle = `rgba(103,232,249,${0.28 * (1 - phase)})`;
        ctx.lineWidth = Math.max(1, s * 0.002);
        ctx.beginPath();
        ctx.arc(c, c, rr, 0, Math.PI * 2);
        ctx.stroke();
      }
      for (let k = 0; k < 3; k++) {
        const a = t * (0.3 + k * 0.12) + (k * Math.PI * 2) / 3;
        const rr = R * (1.32 + k * 0.1);
        const x = c + Math.cos(a) * rr;
        const y = c + Math.sin(a) * rr * 0.96;
        const dg = ctx.createRadialGradient(x, y, 0, x, y, s * 0.016);
        dg.addColorStop(0, "rgba(207,250,254,0.95)");
        dg.addColorStop(1, "rgba(34,211,238,0)");
        ctx.fillStyle = dg;
        ctx.beginPath();
        ctx.arc(x, y, s * 0.016, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalCompositeOperation = "source-over";
      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", size);
    };
  }, []);
  return <canvas ref={ref} className={className} aria-hidden="true" />;
}

/* ============================== The Assembly (scroll centerpiece) ============================== */

const SATELLITES = [
  { icon: Calendar, label: "Calendar", angle: -55, hue: "from-cyan-400 to-sky-500", win: [0.5, 0.6] },
  { icon: Database, label: "Knowledge", angle: -125, hue: "from-indigo-400 to-violet-500", win: [0.54, 0.64] },
  { icon: Users, label: "CRM", angle: 125, hue: "from-emerald-400 to-teal-500", win: [0.58, 0.68] },
  { icon: MessageCircle, label: "SMS", angle: 55, hue: "from-amber-300 to-orange-500", win: [0.62, 0.72] },
] as const;

function Conduit({
  p,
  angle,
  r = 380,
  win,
  color = "rgba(103,232,249,0.9)",
}: {
  p: MotionValue<number>;
  angle: number;
  r?: number;
  win: [number, number];
  color?: string;
}) {
  const rad = (angle * Math.PI) / 180;
  const x2 = 500 + Math.cos(rad) * r;
  const y2 = 500 + Math.sin(rad) * r;
  const draw = useTransform(p, [win[0], win[1]], [0, 1]);
  const flow = useTransform(p, [win[0], win[1]], [0, 0.55]);
  const d = `M500 500 L ${x2.toFixed(1)} ${y2.toFixed(1)}`;
  return (
    <>
      <motion.path d={d} stroke={color} strokeWidth={1.4} fill="none" style={{ pathLength: draw, opacity: draw }} />
      <motion.path
        d={d}
        stroke="rgba(186,230,253,0.9)"
        strokeWidth={3}
        strokeLinecap="round"
        strokeDasharray="2 16"
        fill="none"
        style={{ opacity: flow }}
        className="[animation:dash-flow_1s_linear_infinite]"
      />
    </>
  );
}

function Satellite({
  p,
  icon: Icon,
  label,
  angle,
  hue,
  win,
}: {
  p: MotionValue<number>;
  icon: typeof Calendar;
  label: string;
  angle: number;
  hue: string;
  win: readonly [number, number];
}) {
  const rad = (angle * Math.PI) / 180;
  const left = 50 + Math.cos(rad) * 38;
  const top = 50 + Math.sin(rad) * 38;
  const op = useTransform(p, [win[0], win[0] + 0.05, win[1], 0.98, 1], [0, 1, 1, 1, 1]);
  const scale = useTransform(p, [win[0], win[1]], [0.2, 1]);
  const blur = useTransform(p, [win[0], win[0] + 0.06], ["blur(8px)", "blur(0px)"]);
  return (
    <motion.div
      className="absolute z-20"
      style={{ left: `${left}%`, top: `${top}%`, opacity: op }}
    >
      <motion.div style={{ scale, filter: blur }} className="-translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col items-center gap-1.5 [animation:bob_5s_ease-in-out_infinite]">
          <div className="relative">
            <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${hue} opacity-40 blur-lg`} />
            <div
              className={`relative flex h-11 w-11 items-center justify-center rounded-2xl border border-white/20 bg-gradient-to-br ${hue} shadow-lg md:h-14 md:w-14`}
            >
              <Icon className="h-5 w-5 text-white md:h-6 md:w-6" />
            </div>
          </div>
          <span className="rounded-full border border-white/10 bg-[#060c16]/80 px-2 py-0.5 text-[10px] font-medium text-zinc-300 backdrop-blur md:text-xs">
            {label}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

const PHASES = [
  {
    key: "listen",
    icon: Ear,
    word: "Listens",
    line: "“Hi, do you have anything open this week?”",
    sub: "Natural speech in — captured word for word, in any language.",
    win: [0.14, 0.32] as [number, number],
  },
  {
    key: "understand",
    icon: Brain,
    word: "Understands",
    line: "Intent: book appointment · urgency: this week",
    sub: "It reasons like your best receptionist — no menus, no scripts to press.",
    win: [0.34, 0.5] as [number, number],
  },
  {
    key: "remember",
    icon: Database,
    word: "Remembers",
    line: "Checking calendar · CRM · knowledge base",
    sub: "Plugged into your calendar, CRM, and systems — it knows what you know.",
    win: [0.52, 0.7] as [number, number],
  },
  {
    key: "respond",
    icon: Waves,
    word: "Responds",
    line: "“You're booked for Tuesday at 2:30 — just texted you the details.”",
    sub: "It speaks back, books the slot, and follows up. The call is handled.",
    win: [0.72, 0.9] as [number, number],
  },
];

function PhaseCopy({ p, phase }: { p: MotionValue<number>; phase: (typeof PHASES)[number] }) {
  const [a, b] = phase.win;
  const pad = 0.04;
  const op = useTransform(p, [a - pad, a, b, b + pad], [0, 1, 1, 0]);
  const y = useTransform(p, [a - pad, a, b, b + pad], [24, 0, 0, -24]);
  const Icon = phase.icon;
  return (
    <motion.div
      style={{ opacity: op, y }}
      className="pointer-events-none absolute inset-x-0 top-0 flex flex-col items-center px-6 text-center"
    >
      <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-500/[0.06] px-3.5 py-1 text-[11px] font-medium uppercase tracking-[0.25em] text-cyan-300">
        <Icon className="h-3.5 w-3.5" /> {phase.key}
      </div>
      <h3 className="font-display text-4xl font-semibold tracking-tight md:text-6xl">
        It <GradientText>{phase.word}</GradientText>
      </h3>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-zinc-300 md:text-base">{phase.line}</p>
      <p className="mt-1.5 max-w-sm text-xs text-zinc-500 md:text-sm">{phase.sub}</p>
    </motion.div>
  );
}

function AgentAssembly() {
  const wrap = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: wrap, offset: ["start start", "end end"] });
  const p = scrollYProgress;
  const [active, setActive] = useState(0);
  useMotionValueEvent(p, "change", (v) => {
    const i = v < 0.34 ? 0 : v < 0.52 ? 1 : v < 0.72 ? 2 : 3;
    setActive(i);
  });

  // core + ring transforms
  const coreOp = useTransform(p, [0.02, 0.16], [0, 1]);
  const coreScale = useTransform(p, [0.02, 0.2], [0.3, 1]);
  const ring1 = useTransform(p, [0.32, 0.48], [0, 1]);
  const ring1s = useTransform(p, [0.32, 0.48], [0.6, 1]);
  const ring2 = useTransform(p, [0.5, 0.68], [0, 1]);
  const ring2s = useTransform(p, [0.5, 0.68], [0.6, 1]);

  // inbound "listen" node (left) + outbound "respond" node (right)
  const inOp = useTransform(p, [0.14, 0.24, 0.5, 0.6], [0, 1, 1, 0.35]);
  const inConduit = useTransform(p, [0.16, 0.3], [0, 1]);
  const outOp = useTransform(p, [0.72, 0.82], [0, 1]);
  const bookedOp = useTransform(p, [0.84, 0.92], [0, 1]);
  const assembledOp = useTransform(p, [0.92, 0.99], [0, 1]);

  return (
    <section ref={wrap} className="relative h-[520vh]" aria-label="How the voice agent works">
      <div className="sticky top-0 flex h-screen flex-col items-center justify-start overflow-hidden pt-[27vh]">
        {/* section eyebrow */}
        <div className="absolute top-[6%] left-1/2 -translate-x-1/2 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.3em] text-zinc-400 backdrop-blur">
            <Sparkles className="h-3 w-3 text-cyan-300" /> Watch one get built
          </div>
        </div>

        {/* phase copy stack (top) */}
        <div className="absolute top-[12%] left-1/2 h-40 w-full max-w-3xl -translate-x-1/2">
          {PHASES.map((ph) => (
            <PhaseCopy key={ph.key} p={p} phase={ph} />
          ))}
        </div>

        {/* left phase rail */}
        <div className="absolute left-4 top-1/2 hidden -translate-y-1/2 flex-col gap-5 md:left-10 md:flex">
          {PHASES.map((ph, i) => {
            const on = i === active;
            const passed = i < active;
            return (
              <div key={ph.key} className="flex items-center gap-3">
                <div
                  className={`relative flex h-3 w-3 items-center justify-center rounded-full transition-all duration-500 ${
                    on ? "bg-cyan-300" : passed ? "bg-cyan-500/60" : "bg-white/15"
                  }`}
                >
                  {on && <span className="absolute inset-0 animate-ping rounded-full bg-cyan-300/60" />}
                </div>
                <span
                  className={`text-xs font-medium tracking-wide transition-colors duration-500 ${
                    on ? "text-white" : "text-zinc-600"
                  }`}
                >
                  {ph.word}
                </span>
              </div>
            );
          })}
        </div>

        {/* ============ THE STAGE ============ */}
        <div className="relative aspect-square w-[min(84vw,500px)]">
          {/* conduits + rings SVG */}
          <svg viewBox="0 0 1000 1000" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
            {SATELLITES.map((s) => (
              <Conduit key={s.label} p={p} angle={s.angle} win={s.win as [number, number]} />
            ))}
            {/* inbound conduit (left → core) */}
            <motion.path
              d="M120 500 L 500 500"
              stroke="rgba(52,211,153,0.8)"
              strokeWidth={1.4}
              fill="none"
              style={{ pathLength: inConduit, opacity: inConduit }}
            />
            <motion.path
              d="M120 500 L 500 500"
              stroke="rgba(167,243,208,0.9)"
              strokeWidth={3}
              strokeLinecap="round"
              strokeDasharray="2 16"
              fill="none"
              style={{ opacity: inOp }}
              className="[animation:dash-flow_0.9s_linear_infinite]"
            />
            {/* outbound conduit (core → right) */}
            <motion.path
              d="M500 500 L 880 500"
              stroke="rgba(103,232,249,0.85)"
              strokeWidth={3}
              strokeLinecap="round"
              strokeDasharray="2 16"
              fill="none"
              style={{ opacity: outOp }}
              className="[animation:dash-flow_0.8s_linear_infinite_reverse]"
            />
          </svg>

          {/* understanding ring */}
          <motion.div
            style={{ opacity: ring1, scale: ring1s }}
            className="absolute left-1/2 top-1/2 h-[54%] w-[54%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-cyan-300/30 [animation:spin-slow_24s_linear_infinite]"
          />
          {/* memory ring */}
          <motion.div
            style={{ opacity: ring2, scale: ring2s }}
            className="absolute left-1/2 top-1/2 h-[80%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-indigo-300/20 [animation:spin-rev_40s_linear_infinite]"
          >
            <span className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-300/70" />
            <span className="absolute left-0 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300/70" />
          </motion.div>

          {/* central living core */}
          <motion.div
            style={{ opacity: coreOp, scale: coreScale }}
            className="absolute left-1/2 top-1/2 h-[46%] w-[46%] -translate-x-1/2 -translate-y-1/2"
          >
            <VoiceOrb className="h-full w-full" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-[#060c16]/60 backdrop-blur md:h-16 md:w-16">
                <Cpu className="h-6 w-6 text-cyan-200 md:h-7 md:w-7" />
              </div>
            </div>
          </motion.div>

          {/* satellites */}
          {SATELLITES.map((s) => (
            <Satellite key={s.label} p={p} icon={s.icon} label={s.label} angle={s.angle} hue={s.hue} win={s.win} />
          ))}

          {/* inbound listen node */}
          <motion.div style={{ opacity: inOp }} className="absolute left-[-2%] top-1/2 z-20 -translate-y-1/2">
            <div className="-translate-x-1/2 flex flex-col items-center gap-1.5">
              <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-emerald-400/30 bg-gradient-to-br from-emerald-500/25 to-teal-500/25 backdrop-blur md:h-14 md:w-14">
                <PhoneCall className="h-5 w-5 text-emerald-200 md:h-6 md:w-6" />
                <span className="absolute inset-0 rounded-2xl bg-emerald-400/30 [animation:ping-slow_2.2s_ease-out_infinite]" />
              </div>
              <span className="rounded-full border border-white/10 bg-[#060c16]/80 px-2 py-0.5 text-[10px] text-zinc-300 backdrop-blur md:text-xs">
                Inbound
              </span>
            </div>
          </motion.div>

          {/* outbound respond node */}
          <motion.div style={{ opacity: outOp }} className="absolute right-[-2%] top-1/2 z-20 -translate-y-1/2">
            <div className="translate-x-1/2 flex flex-col items-center gap-1.5">
              <div className="flex h-11 items-end gap-[3px] rounded-2xl border border-cyan-400/25 bg-[#060c16]/70 px-3 backdrop-blur md:h-14">
                {[0, 1, 2, 3, 4].map((i) => (
                  <span
                    key={i}
                    className="w-[3px] origin-bottom rounded-full bg-cyan-300/90 [animation:eq_1s_ease-in-out_infinite]"
                    style={{ height: `${35 + ((i * 41) % 55)}%`, animationDelay: `${i * 0.12}s` }}
                  />
                ))}
              </div>
              <span className="rounded-full border border-white/10 bg-[#060c16]/80 px-2 py-0.5 text-[10px] text-zinc-300 backdrop-blur md:text-xs">
                Voice out
              </span>
            </div>
          </motion.div>

          {/* booked pill */}
          <motion.div
            style={{ opacity: bookedOp }}
            className="absolute bottom-[6%] left-1/2 z-30 -translate-x-1/2"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/15 px-4 py-2 text-xs font-medium text-emerald-200 backdrop-blur md:text-sm">
              <CheckCircle2 className="h-4 w-4" /> Appointment booked · Tue 2:30 PM
            </div>
          </motion.div>
        </div>

        {/* assembled caption */}
        <motion.div
          style={{ opacity: assembledOp }}
          className="pointer-events-none absolute bottom-[7%] left-1/2 -translate-x-1/2 text-center"
        >
          <p className="font-display text-lg font-semibold text-white md:text-2xl">
            One agent. <GradientText>Every call, answered.</GradientText>
          </p>
          <p className="mt-1 text-xs text-zinc-500 md:text-sm">Assembled for your business in about a week.</p>
        </motion.div>
      </div>
    </section>
  );
}

/* ============================== Live Call Simulation ============================== */

const CALL_SCRIPT: { role: "caller" | "agent"; text: string }[] = [
  { role: "caller", text: "Hi, do you have anything open this week?" },
  {
    role: "agent",
    text: "Absolutely. I can get you in Tuesday at 2:30 PM or Thursday at 10 AM. Which works better for you?",
  },
  { role: "caller", text: "Tuesday works great." },
  {
    role: "agent",
    text: "Perfect, you’re booked for Tuesday at 2:30 PM. I just texted you a confirmation with all the details.",
  },
];

function LiveCallCard() {
  const [count, setCount] = useState(0);
  const [partial, setPartial] = useState("");
  const [done, setDone] = useState(false);
  const [sec, setSec] = useState(0);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let alive = true;
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
    (async () => {
      while (alive) {
        setCount(0);
        setPartial("");
        setDone(false);
        setSec(0);
        await sleep(1100);
        for (let k = 0; k < CALL_SCRIPT.length; k++) {
          if (!alive) return;
          await sleep(k === 0 ? 300 : 750);
          const text = CALL_SCRIPT[k].text;
          for (let i = 2; i <= text.length; i += 2) {
            if (!alive) return;
            setPartial(text.slice(0, i));
            await sleep(16);
          }
          setPartial("");
          setCount(k + 1);
        }
        if (!alive) return;
        await sleep(500);
        setDone(true);
        await sleep(6000);
      }
    })();
    const timer = setInterval(() => setSec((s) => s + 1), 1000);
    return () => {
      alive = false;
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [count, partial, done]);

  const fmt = (s: number) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
  const typingRole = CALL_SCRIPT[count]?.role;

  return (
    <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-[#060c16]/85 shadow-2xl shadow-cyan-500/10 backdrop-blur-xl">
      <div className="flex items-center gap-3 border-b border-white/5 px-5 py-4">
        <div className="relative">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-indigo-500">
            <PhoneCall className="h-4 w-4 text-white" />
          </div>
          <span className="absolute inset-0 rounded-full bg-cyan-400/40 [animation:ping-slow_2.4s_ease-out_infinite]" />
        </div>
        <div className="flex-1">
          <div className="text-sm font-medium text-white">Oceanside Voice Agent</div>
          <div className="flex items-center gap-1.5 text-xs text-cyan-300/90">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            Live call · {fmt(sec)}
          </div>
        </div>
        <div className="flex h-6 items-end gap-[3px]" aria-hidden="true">
          {[0, 1, 2, 3, 4].map((i) => (
            <span
              key={i}
              className="w-[3px] origin-bottom rounded-full bg-cyan-400/80 [animation:eq_1s_ease-in-out_infinite]"
              style={{ height: `${40 + ((i * 37) % 55)}%`, animationDelay: `${i * 0.13}s` }}
            />
          ))}
        </div>
      </div>
      <div ref={bodyRef} className="flex h-[280px] flex-col gap-3 overflow-hidden px-5 py-4">
        {CALL_SCRIPT.slice(0, count).map((m, i) => (
          <div
            key={i}
            className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
              m.role === "agent"
                ? "self-start border border-cyan-400/15 bg-cyan-500/10 text-cyan-50"
                : "self-end bg-white/[0.07] text-zinc-200"
            }`}
          >
            {m.text}
          </div>
        ))}
        {partial && (
          <div
            className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
              typingRole === "agent"
                ? "self-start border border-cyan-400/15 bg-cyan-500/10 text-cyan-50"
                : "self-end bg-white/[0.07] text-zinc-200"
            }`}
          >
            {partial}
            <span className="ml-0.5 inline-block h-3.5 w-[2px] animate-pulse bg-cyan-300 align-middle" />
          </div>
        )}
        {done && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-1 space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-medium text-emerald-300">
              <CheckCircle2 className="h-3.5 w-3.5" /> Appointment booked · Tue 2:30 PM
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                { icon: Calendar, label: "Calendar synced" },
                { icon: Cpu, label: "CRM updated" },
                { icon: MessageCircle, label: "SMS sent" },
              ].map((c) => (
                <span
                  key={c.label}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] text-zinc-300"
                >
                  <c.icon className="h-3 w-3 text-cyan-300" /> {c.label}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

/* ============================== Audio Demo Player ============================== */

const BAR_COUNT = 44;
const BARS = Array.from(
  { length: BAR_COUNT },
  (_, i) => 0.3 + 0.7 * Math.abs(Math.sin(i * 0.89) * 0.6 + Math.sin(i * 0.37) * 0.4)
);

function AudioDemo({ src, label }: { src: string; label: string }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) a.play();
    else a.pause();
  };
  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const a = audioRef.current;
    if (!a || !a.duration) return;
    const r = e.currentTarget.getBoundingClientRect();
    a.currentTime = Math.max(0, Math.min(1, (e.clientX - r.left) / r.width)) * a.duration;
  };
  const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

  return (
    <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur">
      <audio
        ref={audioRef}
        src={src}
        preload="none"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onTimeUpdate={(e) => {
          const a = e.currentTarget;
          setTime(a.currentTime);
          setProgress(a.duration ? a.currentTime / a.duration : 0);
        }}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onEnded={() => {
          setPlaying(false);
          setProgress(0);
          setTime(0);
        }}
      />
      <div className="flex items-center gap-4">
        <button
          onClick={toggle}
          aria-label={playing ? "Pause demo call" : "Play demo call"}
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-indigo-500 text-white shadow-lg shadow-cyan-500/25 transition hover:scale-105 active:scale-95"
        >
          {playing ? <Pause className="h-5 w-5" /> : <Play className="ml-0.5 h-5 w-5" />}
        </button>
        <div className="min-w-0 flex-1">
          <div className="flex h-10 cursor-pointer items-end gap-[3px]" onClick={seek}>
            {BARS.map((h, i) => {
              const lit = i / BAR_COUNT <= progress;
              return (
                <span
                  key={i}
                  className={`min-w-0 flex-1 origin-bottom rounded-full transition-colors duration-150 ${
                    lit ? "bg-cyan-400" : "bg-white/15"
                  } ${playing && lit ? "[animation:eq_1.1s_ease-in-out_infinite]" : ""}`}
                  style={{ height: `${h * 100}%`, animationDelay: `${(i % 7) * 0.09}s` }}
                />
              );
            })}
          </div>
          <div className="mt-2 flex items-center justify-between text-xs text-zinc-400">
            <span className="truncate">{label}</span>
            <span className="tabular-nums">
              {fmt(time)} / {duration ? fmt(duration) : "--:--"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================== Section Heading ============================== */

function SectionHeading({
  eyebrow,
  title,
  sub,
}: {
  eyebrow: string;
  title: React.ReactNode;
  sub?: string;
}) {
  return (
    <Reveal>
      <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-500/[0.06] px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-cyan-300">
        <Sparkles className="h-3 w-3" />
        {eyebrow}
      </div>
      <h2 className="font-display text-3xl font-semibold tracking-tight md:text-5xl">{title}</h2>
      {sub && <p className="mt-4 max-w-2xl text-lg text-zinc-400">{sub}</p>}
    </Reveal>
  );
}

/* ============================== Page ============================== */

export default function OceansideLanding() {
  const { scrollYProgress } = useScroll();

  const caseStudies = [
    {
      title: "Merx Truck & Trailer Repair",
      img: "/case-merx.png",
      alt: "Merx Truck & Trailer",
      tags: ["Truck Repair", "Off-Hours Receptionist"],
      audio: "/merx-demo.mp3",
      result: "165%+",
      resultLabel: "Extra Bookings Per Month",
      body: (
        <>
          Reduced missed calls from <span className="text-cyan-300">20% to 0%</span>, capturing new
          clients weekly they otherwise would’ve lost, worth thousands per month.
        </>
      ),
    },
    {
      title: "Funeral Buddy",
      img: "/case-funeral.png",
      alt: "Funeral Buddy",
      tags: ["Funeral Services", "Outbound Sales Agent"],
      audio: "/funeral-demo.mp3",
      result: "10hrs+",
      resultLabel: "Saved Daily",
      body: (
        <>
          Ran outbound sales campaigns that booked meetings with funeral homes across Australia. One
          day of calls equaled a week’s output from{" "}
          <span className="text-cyan-300">multiple staff members</span>.
        </>
      ),
    },
    {
      title: "Tutor ABC, Brazil",
      img: "/case-tutor.png",
      alt: "Tutor ABC",
      tags: ["Education", "Multilingual Receptionist"],
      audio: "/tutor-demo.mp3",
      result: "$50,000+",
      resultLabel: "Saved Annually",
      body: (
        <>
          Built a 24/7 AI receptionist answering questions faster than humans and selling language
          courses automatically. Reduced the need of{" "}
          <span className="text-cyan-300">multiple staff members</span> through automation.
        </>
      ),
    },
    {
      title: "CBN News + Regent University",
      img: "/case-cbn.png",
      alt: "CBN News + Regent University",
      tags: ["News Media", "Workflow Automation"],
      audio: null,
      result: "500+",
      resultLabel: "Hours Saved Annually",
      body: (
        <>
          Built newsroom automations that cut scriptwriting time from{" "}
          <span className="text-cyan-300">4 hours to 20 minutes</span>. Regent’s AI saved over{" "}
          <span className="text-cyan-300">500 hours</span> yearly.
        </>
      ),
    },
  ];

  return (
    <div className="relative min-h-screen overflow-x-clip bg-[#02050a] text-white">
      {/* scroll progress */}
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-500"
      />

      <StarField />
      <CursorRipples />

      {/* global background */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_900px_600px_at_15%_-5%,rgba(34,211,238,0.10),transparent),radial-gradient(ellipse_800px_500px_at_85%_5%,rgba(99,102,241,0.10),transparent),radial-gradient(ellipse_700px_500px_at_50%_110%,rgba(14,116,144,0.12),transparent)]" />
        <div
          className="absolute inset-0 opacity-[0.5]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(148,163,184,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.05) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
            maskImage: "radial-gradient(ellipse 90% 70% at 50% 0%, black 30%, transparent 75%)",
            WebkitMaskImage: "radial-gradient(ellipse 90% 70% at 50% 0%, black 30%, transparent 75%)",
          }}
        />
        <div className="absolute -left-40 top-[-10%] h-[36rem] w-[36rem] rounded-full bg-cyan-500/[0.07] blur-3xl [animation:drift-a_26s_ease-in-out_infinite]" />
        <div className="absolute -right-40 top-[25%] h-[32rem] w-[32rem] rounded-full bg-indigo-500/[0.07] blur-3xl [animation:drift-b_30s_ease-in-out_infinite]" />
      </div>

      {/* ============ NAV ============ */}
      <header className="fixed inset-x-0 top-4 z-50 px-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between rounded-2xl border border-white/10 bg-[#04080f]/70 px-5 py-3 shadow-xl shadow-black/30 backdrop-blur-xl">
          <a href="#top" className="flex items-center gap-3">
            <LogoOceanside className="h-8 w-8" />
            <span className="font-display text-base font-semibold tracking-tight md:text-lg">
              Oceanside AI Solutions
            </span>
          </a>
          <nav className="hidden items-center gap-7 lg:flex">
            {[
              { href: "#build", label: "How it works" },
              { href: "#case-studies", label: "Client Success" },
              { href: "#story", label: "Founder" },
              { href: "#community", label: "Community" },
            ].map((l) => (
              <a key={l.href} href={l.href} className="text-sm text-zinc-400 transition hover:text-white">
                {l.label}
              </a>
            ))}
          </nav>
          <a
            href={CALENDLY_URL}
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-cyan-400 to-indigo-500 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-cyan-500/25 transition hover:shadow-cyan-400/40"
          >
            Work with us
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>
      </header>

      {/* ============ HERO ============ */}
      <section id="top" className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-28 pb-20 text-center">
        {/* orb behind */}
        <VoiceOrb className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[min(120vw,860px)] max-w-none -translate-x-1/2 -translate-y-[54%] opacity-80" />

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 mb-7 inline-flex items-center gap-2.5 rounded-full border border-cyan-400/25 bg-cyan-500/[0.07] px-4 py-2 text-xs font-medium tracking-wide text-cyan-200 backdrop-blur"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          Voice agents answering live, 24/7
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 max-w-4xl font-display text-5xl font-semibold leading-[1.02] tracking-tight md:text-8xl"
        >
          Ride the{" "}
          <span className="bg-gradient-to-r from-cyan-300 via-indigo-400 to-cyan-300 bg-[length:200%_auto] bg-clip-text text-transparent [animation:shimmer_5s_linear_infinite]">
            AI Wave
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400 md:text-xl"
        >
          Voice AI that answers, understands, and closes — for every call your business can’t afford
          to miss. Built like a Tesla: quiet power, immaculate design.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 mt-9 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href={CALENDLY_URL}
            className="group inline-flex h-12 items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-indigo-500 px-7 text-sm font-semibold text-white shadow-xl shadow-cyan-500/30 transition hover:scale-[1.02] hover:shadow-cyan-400/40"
          >
            Work with us
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#case-studies"
            className="inline-flex h-12 items-center gap-2 rounded-xl border border-white/15 bg-white/[0.03] px-7 text-sm font-medium text-zinc-200 backdrop-blur transition hover:border-cyan-400/40 hover:text-white"
          >
            Hear real calls
            <ArrowDown className="h-4 w-4" />
          </a>
        </motion.div>

        {/* scroll cue → into the assembly */}
        <motion.a
          href="#build"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="relative z-10 mt-16 inline-flex flex-col items-center gap-2 text-xs uppercase tracking-[0.25em] text-zinc-500 transition hover:text-cyan-300"
        >
          Scroll to assemble a voice agent
          <ChevronDown className="h-4 w-4 [animation:float-slow_2.4s_ease-in-out_infinite]" />
        </motion.a>
      </section>

      {/* ============ LOGOS (companies we've worked with) ============ */}
      <section className="mx-auto max-w-7xl px-6 py-14">
        <Reveal>
          <h3 className="text-center text-xs font-medium uppercase tracking-[0.3em] text-zinc-500">
            Companies we’ve worked with
          </h3>
        </Reveal>
        <div
          className="relative mt-8 overflow-hidden"
          style={{
            maskImage: "linear-gradient(90deg, transparent, black 12%, black 88%, transparent)",
            WebkitMaskImage: "linear-gradient(90deg, transparent, black 12%, black 88%, transparent)",
          }}
        >
          <div className="flex w-max items-center gap-20 [animation:marquee_30s_linear_infinite]">
            {[
              { alt: "Regent University", src: "/logos/regent.png", w: 140 },
              { alt: "CBN News", src: "/logos/cbn.png", w: 120 },
              { alt: "Merx Truck & Trailer", src: "/logos/merx.png", w: 180 },
              { alt: "Live Fire Media", src: "/logos/livefire.png", w: 150 },
              { alt: "Regent University", src: "/logos/regent.png", w: 140 },
              { alt: "CBN News", src: "/logos/cbn.png", w: 120 },
              { alt: "Merx Truck & Trailer", src: "/logos/merx.png", w: 180 },
              { alt: "Live Fire Media", src: "/logos/livefire.png", w: 150 },
            ].map((l, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={`${l.alt}-${i}`}
                src={l.src}
                alt={l.alt}
                width={l.w}
                className="opacity-60 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
              />
            ))}
          </div>
        </div>
      </section>

      {/* ============ THE ASSEMBLY ============ */}
      <div id="build" className="scroll-mt-0">
        <AgentAssembly />
      </div>

      {/* ============ LIVE CALL ============ */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="See it think"
              title={
                <>
                  Watch it work a call <GradientText>in real time</GradientText>
                </>
              }
              sub="This is a live simulation of the agent taking a call — transcribing, reasoning, booking, and confirming, all in a few seconds."
            />
            <div className="mt-8 flex flex-col gap-3">
              {[
                { icon: Ear, t: "Understands natural speech", d: "No menus. No “press 1.” Just talk." },
                { icon: Brain, t: "Reasons and decides", d: "Handles reschedules, edge cases, follow-ups." },
                { icon: CheckCircle2, t: "Closes the loop", d: "Books, updates the CRM, and texts a confirmation." },
              ].map((r) => (
                <Reveal key={r.t}>
                  <div className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-500/10">
                      <r.icon className="h-5 w-5 text-cyan-300" />
                    </div>
                    <div>
                      <div className="font-medium text-white">{r.t}</div>
                      <div className="text-sm text-zinc-400">{r.d}</div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
          <Reveal delay={0.1} className="flex justify-center">
            <div className="[animation:float-y_7s_ease-in-out_infinite]">
              <LiveCallCard />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ METRICS ============ */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
          {[
            { label: "Live calls automated", value: 100, prefix: "", suffix: "k+" },
            { label: "Call resolution success rate", value: 95, prefix: "", suffix: "%" },
            { label: "Appt. conversion", value: 28, prefix: "+", suffix: "%" },
            { label: "Setup to live", value: 14, prefix: "7 to ", suffix: " days" },
          ].map((m, i) => (
            <Reveal key={m.label} delay={i * 0.08}>
              <Spotlight className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur">
                <div className="font-display text-4xl font-semibold tracking-tight md:text-5xl">
                  <GradientText>
                    <CountUp to={m.value} prefix={m.prefix} suffix={m.suffix} />
                  </GradientText>
                </div>
                <div className="mt-2 text-sm text-zinc-400">{m.label}</div>
              </Spotlight>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ CASE STUDIES ============ */}
      <section id="case-studies" className="mx-auto max-w-7xl scroll-mt-28 px-6 py-24">
        <SectionHeading
          eyebrow="Client Success Stories"
          title="Real calls. Real results."
          sub="Businesses using Voice AI and workflow automation to save hours and unlock new revenue. Press play and hear the agents for yourself."
        />
        <div className="mt-16 flex flex-col gap-24">
          {caseStudies.map((cs, i) => (
            <Reveal key={cs.title}>
              <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                <div className={`relative ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                  <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-cyan-500/15 via-transparent to-indigo-500/15 blur-2xl" />
                  <div className="group relative overflow-hidden rounded-3xl border border-white/10 p-[1px]">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/30 via-transparent to-indigo-500/30 opacity-60" />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={cs.img}
                      alt={cs.alt}
                      className="relative h-72 w-full rounded-3xl object-cover transition duration-500 group-hover:scale-[1.03] md:h-96"
                    />
                    <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-t from-[#02050a]/60 via-transparent to-transparent" />
                  </div>
                </div>
                <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                  <div className="flex flex-wrap gap-2">
                    {cs.tags.map((t, j) => (
                      <span
                        key={t}
                        className={`rounded-full border px-3.5 py-1.5 text-xs font-medium ${
                          j === 1
                            ? "border-cyan-400/30 bg-cyan-500/[0.07] text-cyan-300"
                            : "border-white/15 bg-white/[0.03] text-zinc-300"
                        }`}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <h3 className="mt-5 font-display text-2xl font-semibold tracking-tight md:text-3xl">
                    {cs.title}
                  </h3>
                  <p className="mt-4 text-lg leading-relaxed text-zinc-400">{cs.body}</p>
                  {cs.audio && <AudioDemo src={cs.audio} label="Listen to a real call" />}
                  <div className="mt-7 flex items-end gap-3 border-t border-white/10 pt-6">
                    <div className="font-display text-4xl font-semibold tracking-tight md:text-5xl">
                      <GradientText>{cs.result}</GradientText>
                    </div>
                    <div className="pb-1.5 text-sm text-zinc-400">{cs.resultLabel}</div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ FOUNDER ============ */}
      <section id="story" className="mx-auto max-w-6xl scroll-mt-28 px-6 py-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          <Reveal className="lg:col-span-1">
            <div className="relative">
              <div className="absolute -inset-2 rounded-[2rem] bg-gradient-to-br from-cyan-400/40 via-sky-500/10 to-indigo-500/40 blur-lg" />
              <a
                href="https://www.linkedin.com/in/mark-tomlet-8853b3180/"
                target="_blank"
                rel="noopener noreferrer"
                className="relative block rounded-[1.75rem] bg-gradient-to-br from-cyan-400/60 to-indigo-500/60 p-[1.5px]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/founder.jpg" alt="Mark Tomlet" className="h-80 w-full rounded-[1.65rem] object-cover" />
              </a>
            </div>
            <div className="mt-5 flex items-center gap-2 text-sm text-zinc-400">
              <a
                href="https://www.linkedin.com/in/mark-tomlet-8853b3180/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-medium text-cyan-300 transition hover:text-cyan-200"
              >
                <Linkedin className="h-4 w-4" /> Mark Tomlet
              </a>
              , Founder &amp; Operator
            </div>
          </Reveal>
          <Reveal delay={0.12} className="lg:col-span-2">
            <SectionHeading eyebrow="Founder" title="Our Founder’s Story" />
            <div className="mt-8 space-y-5 leading-relaxed text-zinc-400">
              <p>
                Oceanside AI Solutions began not in a boardroom, but amidst the urgency of Ukraine’s
                conflict zones, where <span className="text-cyan-300">Mark Tomlet</span>, a
                cybersecurity specialist with a background in journalism, recognized a pressing need.
                Surrounded by reporters grappling with tight deadlines, Mark saw an opportunity for AI
                to revolutionize scriptwriting.
              </p>
              <p>
                Mark’s journey with AI didn’t start with grand ambitions. It began with a simple, yet
                powerful idea: an AI assistant that could help journalists draft their scripts more
                efficiently. He programmed the AI to ask journalists a series of questions, gleaning
                the essence of their stories and style. This innovative approach allowed the AI to
                produce drafts that resonated with each journalist’s voice.
              </p>
              <p>
                The development wasn’t without its challenges. It required extensive training and
                refinement, but the results were undeniable. A script that once took 4 hours to draft
                could now be completed in just 20 minutes. This breakthrough caught the attention of{" "}
                <span className="text-cyan-300">CBN News</span>, leading to an invitation for Mark and
                his team to develop custom AI solutions for their journalists. As word spread,
                Oceanside AI Solutions evolved, extending its reach beyond journalism.
              </p>
              <p className="border-l-2 border-cyan-400/60 pl-5 text-zinc-300">
                Oceanside AI Solutions believes AI is like a coming tsunami; companies can either ride
                it or get wiped out by it.
              </p>
              <p>
                Today, Mark works with companies around the globe deploying voice agents powered by{" "}
                <span className="text-cyan-300">Retell AI</span>. Hundreds of businesses run on agents
                he has built, spanning home services from home inspections to roofing, oil and gas,
                barbershop chains, and beyond. He also runs{" "}
                <a
                  href="https://www.skool.com/pioneers/about"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-300 transition hover:text-cyan-200"
                >
                  AI Voice Pioneers
                </a>
                , the #1 community on Voice AI.
              </p>
              <p>
                At Oceanside AI Solutions, we pride ourselves on developing AI solutions that are
                effective, not boastful. Our goal is to provide tools that are genuinely useful,
                helping professionals save money by doing more in less time.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ YOUTUBE + COMMUNITY (kept) ============ */}
      <section id="community" className="mx-auto max-w-7xl scroll-mt-28 px-6 py-16">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Reveal>
            <Spotlight className="relative h-full overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-10 text-center backdrop-blur">
              <div className="pointer-events-none absolute -top-24 left-1/2 h-56 w-[32rem] -translate-x-1/2 rounded-full bg-red-500/[0.08] blur-3xl" />
              <div className="relative flex h-full flex-col items-center">
                <div className="relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/youtube-profile.jpg"
                    alt="YouTube profile"
                    className="h-16 w-16 rounded-full border-2 border-white/20"
                  />
                  <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-red-600">
                    <Youtube className="h-3.5 w-3.5 text-white" />
                  </div>
                </div>
                <h3 className="mt-6 font-display text-2xl font-semibold tracking-tight">
                  Watch on YouTube · <GradientText>300k+ views</GradientText>
                </h3>
                <p className="mt-3 text-zinc-400">Tutorials, live builds, and real client delivery.</p>
                <div className="min-h-7 flex-1" />
                <a
                  href="https://www.youtube.com/@TechTomlet"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex h-10 items-center gap-2 rounded-lg border border-white/15 bg-white/[0.04] px-5 text-sm font-medium transition hover:border-red-400/40 hover:bg-white/[0.07]"
                >
                  Visit Channel
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </a>
              </div>
            </Spotlight>
          </Reveal>
          <Reveal delay={0.1}>
            <Spotlight className="relative h-full overflow-hidden rounded-[2rem] border border-amber-400/15 bg-white/[0.03] p-10 text-center backdrop-blur">
              <div className="pointer-events-none absolute -top-24 left-1/2 h-56 w-[32rem] -translate-x-1/2 rounded-full bg-amber-400/[0.08] blur-3xl" />
              <div className="relative flex h-full flex-col items-center">
                <div className="flex items-center -space-x-3">
                  {[
                    "from-cyan-400 to-sky-600",
                    "from-indigo-400 to-violet-600",
                    "from-amber-300 to-orange-500",
                    "from-emerald-400 to-teal-600",
                  ].map((g, i) => (
                    <div
                      key={i}
                      className={`flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#070d16] bg-gradient-to-br ${g}`}
                    >
                      <Users className="h-4 w-4 text-white/90" />
                    </div>
                  ))}
                  <div className="flex h-11 items-center rounded-full border-2 border-[#070d16] bg-white/10 px-3.5 text-xs font-semibold text-zinc-200 backdrop-blur">
                    +1,000s
                  </div>
                </div>
                <div className="mt-5 inline-flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 px-3.5 py-1 text-xs font-semibold text-amber-300">
                  <Crown className="h-3.5 w-3.5" /> #1 Community on Voice AI
                </div>
                <h3 className="mt-4 font-display text-2xl font-semibold tracking-tight">AI Voice Pioneers</h3>
                <p className="mt-3 text-zinc-400">
                  Mark runs the #1 community on Voice AI, where builders learn to ship real agents.
                </p>
                <div className="min-h-7 flex-1" />
                <a
                  href="https://www.skool.com/pioneers/about"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex h-10 items-center gap-2 rounded-lg border border-white/15 bg-white/[0.04] px-5 text-sm font-medium transition hover:border-amber-400/40 hover:bg-white/[0.07]"
                >
                  Join the Community
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </a>
              </div>
            </Spotlight>
          </Reveal>
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section className="relative mx-auto max-w-7xl px-6 py-20">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-cyan-400/20 bg-gradient-to-b from-cyan-500/[0.08] to-indigo-500/[0.05] px-8 py-12 text-center backdrop-blur md:py-16">
            <div className="pointer-events-none absolute -top-32 left-1/2 h-72 w-[44rem] -translate-x-1/2 rounded-full bg-cyan-400/10 blur-3xl" />
            <h2 className="relative font-display text-3xl font-semibold tracking-tight md:text-5xl">
              Ready to ride the <GradientText>AI wave</GradientText>?
            </h2>
            <p className="relative mx-auto mt-4 max-w-xl text-zinc-400">
              Book a call and hear what a voice agent built for your business sounds like.
            </p>
            <div className="relative mt-8">
              <a
                href={CALENDLY_URL}
                className="group inline-flex h-11 items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-indigo-500 px-7 text-sm font-semibold text-white shadow-xl shadow-cyan-500/25 transition hover:scale-[1.02] hover:shadow-cyan-400/40"
              >
                Work with us
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>
            <div className="relative mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-sm text-zinc-500">
              <span className="inline-flex items-center gap-2">
                <Clock className="h-4 w-4 text-cyan-400" /> Typical setup: 7 to 14 days
              </span>
              <span className="inline-flex items-center gap-2">
                <Globe className="h-4 w-4 text-cyan-400" /> English, Spanish, Portuguese, more
              </span>
              <span className="inline-flex items-center gap-2">
                <Shield className="h-4 w-4 text-cyan-400" /> Security-minded practices &amp; data minimization
              </span>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="border-t border-white/[0.07]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 px-6 py-12 md:flex-row">
          <div className="flex items-center gap-3">
            <LogoOceanside className="h-6 w-6" />
            <div className="text-sm text-zinc-500">
              © {new Date().getFullYear()} Oceanside AI Solutions. All rights reserved.
            </div>
          </div>
          <div className="flex items-center gap-7 text-sm text-zinc-500">
            <Link className="transition hover:text-white" href="/privacy">
              Privacy
            </Link>
            <Link className="transition hover:text-white" href="/terms">
              Terms
            </Link>
            <a
              className="transition hover:text-white"
              href="https://www.skool.com/pioneers/about"
              target="_blank"
              rel="noopener noreferrer"
            >
              Community
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
