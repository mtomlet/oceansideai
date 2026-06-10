"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion, animate, useInView, useScroll } from "framer-motion";
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
  Calendar,
  MessageCircle,
  CheckCircle2,
  Sparkles,
  Linkedin,
  Users,
  Crown,
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
    let last = 0;
    let lastX = -1;
    let lastY = -1;

    const onMove = (e: PointerEvent) => {
      const now = performance.now();
      if (now - last < 55) return;
      const speed =
        lastX < 0 ? 0 : Math.hypot(e.clientX - lastX, e.clientY - lastY);
      last = now;
      lastX = e.clientX;
      lastY = e.clientY;
      // faster movement makes bigger, brighter ripples
      const boost = Math.min(1.7, 0.65 + speed / 90);
      ripples.push({
        x: e.clientX,
        y: e.clientY,
        r: 2,
        max: (55 + Math.random() * 45) * boost,
        a: Math.min(0.55, 0.34 * boost),
      });
      if (ripples.length > 30) ripples.shift();
    };
    const onDown = (e: PointerEvent) => {
      ripples.push({ x: e.clientX, y: e.clientY, r: 6, max: 190, a: 0.6 });
      ripples.push({ x: e.clientX, y: e.clientY, r: 2, max: 110, a: 0.45 });
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerdown", onDown);

    let raf = 0;
    const tick = () => {
      ctx.clearRect(0, 0, W, H);
      ctx.globalCompositeOperation = "lighter";
      for (let i = ripples.length - 1; i >= 0; i--) {
        const p = ripples[i];
        p.r += (p.max - p.r) * 0.05 + 0.65;
        p.a *= 0.962;
        if (p.a < 0.012) {
          ripples.splice(i, 1);
          continue;
        }
        ctx.shadowColor = "rgba(34,211,238,0.8)";
        ctx.shadowBlur = 14;
        ctx.lineWidth = 1.6;
        ctx.strokeStyle = `rgba(103,232,249,${p.a})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.stroke();
        ctx.shadowBlur = 0;
        ctx.lineWidth = 1.1;
        ctx.strokeStyle = `rgba(165,243,252,${p.a * 0.55})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 0.68, 0, Math.PI * 2);
        ctx.stroke();
        ctx.strokeStyle = `rgba(199,250,255,${p.a * 0.3})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 0.4, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.globalCompositeOperation = "source-over";
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", size);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
    };
  }, []);

  return <canvas ref={ref} className="pointer-events-none fixed inset-0 z-[65]" aria-hidden="true" />;
}

/* ============================== Voice Orb ============================== */

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

      // breathing core
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

      // inner disc
      g = ctx.createRadialGradient(c, c, 0, c, c, R * 0.34);
      g.addColorStop(0, "rgba(240,252,255,0.9)");
      g.addColorStop(1, "rgba(125,211,252,0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(c, c, R * 0.34, 0, Math.PI * 2);
      ctx.fill();

      // radial voice bars
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

      // expanding pulse rings
      for (let k = 0; k < 2; k++) {
        const phase = ((t * 0.42 + k * 0.5) % 1 + 1) % 1;
        const rr = R * (1.05 + phase * 0.62);
        ctx.strokeStyle = `rgba(103,232,249,${0.28 * (1 - phase)})`;
        ctx.lineWidth = Math.max(1, s * 0.002);
        ctx.beginPath();
        ctx.arc(c, c, rr, 0, Math.PI * 2);
        ctx.stroke();
      }

      // orbiting satellites
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
      {/* header */}
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

      {/* transcript */}
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
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-1 space-y-2"
          >
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

  const fmt = (s: number) =>
    `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

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
          Ran outbound sales campaigns that booked meetings with funeral homes across Australia.
          One day of calls equaled a week’s output from{" "}
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

      {/* cursor water ripples */}
      <CursorRipples />

      {/* global background */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_900px_600px_at_15%_-5%,rgba(34,211,238,0.10),transparent),radial-gradient(ellipse_800px_500px_at_85%_5%,rgba(99,102,241,0.10),transparent),radial-gradient(ellipse_700px_500px_at_50%_110%,rgba(14,116,144,0.12),transparent)]" />
        <div
          className="absolute inset-0 opacity-[0.55]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(148,163,184,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.05) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
            maskImage: "radial-gradient(ellipse 90% 70% at 50% 0%, black 30%, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 90% 70% at 50% 0%, black 30%, transparent 75%)",
          }}
        />
        <div className="absolute -left-40 top-[-10%] h-[36rem] w-[36rem] rounded-full bg-cyan-500/[0.07] blur-3xl [animation:drift-a_26s_ease-in-out_infinite]" />
        <div className="absolute -right-40 top-[25%] h-[32rem] w-[32rem] rounded-full bg-indigo-500/[0.07] blur-3xl [animation:drift-b_30s_ease-in-out_infinite]" />
        {/* persistent ocean swell pinned to the viewport bottom */}
        <motion.div
          className="absolute bottom-[-3rem] left-[-12%] w-[124%]"
          animate={{ x: [0, -70, 0], y: [0, -8, 0] }}
          transition={{ duration: 21, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg viewBox="0 0 1440 320" className="h-40 w-full" preserveAspectRatio="none">
            <path
              fill="#06b6d4"
              fillOpacity="0.07"
              d="M0,256L60,224C120,192,240,128,360,122.7C480,117,600,171,720,186.7C840,203,960,181,1080,160C1200,139,1320,117,1380,106.7L1440,96V320H0Z"
            />
          </svg>
        </motion.div>
        <motion.div
          className="absolute bottom-[-3rem] left-[-12%] w-[124%]"
          animate={{ x: [0, 55, 0], y: [0, -12, 0] }}
          transition={{ duration: 27, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <svg viewBox="0 0 1440 320" className="h-32 w-full" preserveAspectRatio="none">
            <path
              fill="#6366f1"
              fillOpacity="0.06"
              d="M0,288L48,250.7C96,213,192,139,288,122.7C384,107,480,149,576,170.7C672,192,768,192,864,176C960,160,1056,128,1152,128C1248,128,1344,160,1392,176L1440,192V320H0Z"
            />
          </svg>
        </motion.div>
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
              { href: "#what", label: "What we do" },
              { href: "#process", label: "Process" },
              { href: "#case-studies", label: "Client Success Stories" },
              { href: "#story", label: "Founder" },
            ].map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm text-zinc-400 transition hover:text-white"
              >
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
      <section id="top" className="relative flex min-h-screen items-center overflow-hidden pt-36 pb-28">
        {/* drifting waves at the base */}
        <motion.div
          className="absolute bottom-0 left-[-12%] w-[124%]"
          animate={{ x: [0, -100, 0], y: [0, -14, 0] }}
          transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg viewBox="0 0 1440 320" className="h-64 w-full" preserveAspectRatio="none">
            <path
              fill="#06b6d4"
              fillOpacity="0.20"
              d="M0,256L60,224C120,192,240,128,360,122.7C480,117,600,171,720,186.7C840,203,960,181,1080,160C1200,139,1320,117,1380,106.7L1440,96V320H0Z"
            />
          </svg>
        </motion.div>
        <motion.div
          className="absolute bottom-0 left-[-12%] w-[124%]"
          animate={{ x: [0, 85, 0], y: [0, -10, 0] }}
          transition={{ duration: 19, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
        >
          <svg viewBox="0 0 1440 320" className="h-52 w-full" preserveAspectRatio="none">
            <path
              fill="#6366f1"
              fillOpacity="0.16"
              d="M0,288L48,250.7C96,213,192,139,288,122.7C384,107,480,149,576,170.7C672,192,768,192,864,176C960,160,1056,128,1152,128C1248,128,1344,160,1392,176L1440,192V320H0Z"
            />
          </svg>
        </motion.div>
        <motion.div
          className="absolute bottom-0 left-[-12%] w-[124%]"
          animate={{ x: [0, -55, 0], y: [0, -18, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 1.4 }}
        >
          <svg viewBox="0 0 1440 320" className="h-44 w-full" preserveAspectRatio="none">
            <path
              fill="#22d3ee"
              fillOpacity="0.12"
              d="M0,224L80,229.3C160,235,320,245,480,224C640,203,800,149,960,144C1120,139,1280,181,1360,202.7L1440,224V320H0Z"
            />
          </svg>
        </motion.div>

        <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-16 px-6 lg:grid-cols-2">
          {/* left: copy */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-cyan-400/25 bg-cyan-500/[0.07] px-4 py-2 text-xs font-medium tracking-wide text-cyan-200"
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
              className="font-display text-5xl font-semibold leading-[1.04] tracking-tight md:text-7xl"
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
              className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-400 md:text-xl"
            >
              Voice AI that books, routes, and resolves. Built like a Tesla: quiet power, immaculate
              design.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
              className="mt-9 flex flex-wrap items-center gap-4"
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

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.45 }}
              className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-sm text-zinc-500"
            >
              {["Books appointments", "Routes calls", "Powered by Retell AI"].map((f) => (
                <span key={f} className="inline-flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-cyan-400" /> {f}
                </span>
              ))}
            </motion.div>
          </div>

          {/* right: orb + live call */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto flex w-full max-w-xl items-center justify-center"
          >
            <VoiceOrb className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[125%] max-w-none -translate-x-1/2 -translate-y-1/2" />
            <div className="relative z-10 w-full px-2 [animation:float-y_7s_ease-in-out_infinite]">
              <LiveCallCard />
            </div>
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-3 top-2 z-20 hidden items-center gap-2 rounded-full border border-white/10 bg-[#060c16]/90 px-4 py-2 text-xs text-zinc-300 shadow-lg backdrop-blur md:inline-flex"
            >
              <PhoneCall className="h-3.5 w-3.5 text-cyan-300" /> 100k+ live calls automated
            </motion.div>
            <motion.div
              animate={{ y: [0, 9, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -left-4 bottom-4 z-20 hidden items-center gap-2 rounded-full border border-white/10 bg-[#060c16]/90 px-4 py-2 text-xs text-zinc-300 shadow-lg backdrop-blur md:inline-flex"
            >
              <Globe className="h-3.5 w-3.5 text-cyan-300" /> English · Spanish · Portuguese
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ============ LOGOS ============ */}
      <section className="mx-auto max-w-7xl px-6 py-14">
        <Reveal>
          <h3 className="text-center text-xs font-medium uppercase tracking-[0.3em] text-zinc-500">
            Companies we’ve worked with
          </h3>
        </Reveal>
        <div
          className="relative mt-8 overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(90deg, transparent, black 12%, black 88%, transparent)",
            WebkitMaskImage:
              "linear-gradient(90deg, transparent, black 12%, black 88%, transparent)",
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

      {/* ============ WHAT WE DO ============ */}
      <section id="what" className="mx-auto max-w-7xl scroll-mt-28 px-6 py-24">
        <SectionHeading
          eyebrow="What we do"
          title={
            <>
              Phone lines that <GradientText>run themselves</GradientText>
            </>
          }
        />
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {[
            {
              icon: PhoneCall,
              title: "Voice Agents",
              desc: "24/7 phone agents that answer, qualify, and schedule. Integrates with your CRM and calendar.",
            },
            {
              icon: Cpu,
              title: "Workflow Automation",
              desc: "Make/Zapier + custom APIs to remove repetitive work across teams.",
            },
            {
              icon: Shield,
              title: "Security & Reliability",
              desc: "Built by a cybersecurity specialist. Data minimization and audit trails by default.",
            },
          ].map((c, i) => (
            <Reveal key={c.title} delay={i * 0.1}>
              <Spotlight className="h-full rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur transition-colors duration-300 hover:border-cyan-400/25">
                <div className="relative mb-6 inline-flex">
                  <div className="absolute inset-0 rounded-2xl bg-cyan-400/30 blur-xl transition group-hover:bg-cyan-400/50" />
                  <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-400/25 bg-gradient-to-br from-cyan-500/20 to-indigo-500/20">
                    <c.icon className="h-6 w-6 text-cyan-300" />
                  </div>
                </div>
                <h3 className="font-display text-xl font-semibold text-white">{c.title}</h3>
                <p className="mt-3 leading-relaxed text-zinc-400">{c.desc}</p>
              </Spotlight>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ PROCESS ============ */}
      <section id="process" className="mx-auto max-w-7xl scroll-mt-28 px-6 py-24">
        <SectionHeading
          eyebrow="Process"
          title="Our process"
          sub="Clear, fast, and accountable. You’ll always know what’s happening and when."
        />
        <div className="relative mt-14">
          <div className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent lg:block" />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                step: "01",
                title: "Discovery",
                desc: "10 to 15 min call. Goals, call flows, systems. We scope the quickest path to value.",
              },
              {
                step: "02",
                title: "Prototype",
                desc: "We ship a working agent + call logs. You test scripts and edge cases.",
              },
              {
                step: "03",
                title: "Integrate",
                desc: "Calendar, CRM, IVR, sheets, webhooks. Prompts + guardrails hardened.",
              },
              {
                step: "04",
                title: "Go live",
                desc: "We monitor, iterate weekly, and report. SLA on uptime and response.",
              },
            ].map((p, i) => (
              <Reveal key={p.step} delay={i * 0.1}>
                <Spotlight className="relative h-full rounded-3xl border border-white/10 bg-[#040910]/80 p-7 backdrop-blur">
                  <div className="relative z-10 mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-indigo-500 font-display text-lg font-semibold text-white shadow-lg shadow-cyan-500/25">
                    {p.step}
                  </div>
                  <div className="pointer-events-none absolute -right-2 -top-4 select-none font-display text-[7rem] font-bold leading-none text-white/[0.03]">
                    {p.step}
                  </div>
                  <h3 className="font-display text-xl font-semibold">{p.title}</h3>
                  <p className="mt-2.5 leading-relaxed text-zinc-400">{p.desc}</p>
                </Spotlight>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CASE STUDIES ============ */}
      <section id="case-studies" className="mx-auto max-w-7xl scroll-mt-28 px-6 py-24">
        <SectionHeading
          eyebrow="Client Success Stories"
          title="Our Success Stories"
          sub="Real businesses using Voice AI and workflow automation to save hours and unlock new revenue."
        />
        <div className="mt-16 flex flex-col gap-24">
          {caseStudies.map((cs, i) => (
            <Reveal key={cs.title}>
              <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                {/* image */}
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
                {/* content */}
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
                <img
                  src="/founder.jpg"
                  alt="Mark Tomlet"
                  className="h-80 w-full rounded-[1.65rem] object-cover"
                />
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
                Oceanside AI Solutions began not in a boardroom, but amidst the urgency of
                Ukraine’s conflict zones, where <span className="text-cyan-300">Mark Tomlet</span>,
                a cybersecurity specialist with a background in journalism, recognized a pressing
                need. Surrounded by reporters grappling with tight deadlines, Mark saw an
                opportunity for AI to revolutionize scriptwriting.
              </p>
              <p>
                Mark’s journey with AI didn’t start with grand ambitions. It began with a simple,
                yet powerful idea: an AI assistant that could help journalists draft their scripts
                more efficiently. He programmed the AI to ask journalists a series of questions,
                gleaning the essence of their stories and style. This innovative approach allowed
                the AI to produce drafts that resonated with each journalist’s voice.
              </p>
              <p>
                The development wasn’t without its challenges. It required extensive training and
                refinement, but the results were undeniable. A script that once took 4 hours to
                draft could now be completed in just 20 minutes. This breakthrough caught the
                attention of <span className="text-cyan-300">CBN News</span>, leading to an
                invitation for Mark and his team to develop custom AI solutions for their
                journalists. As word spread, Oceanside AI Solutions evolved, extending its reach
                beyond journalism.
              </p>
              <p className="border-l-2 border-cyan-400/60 pl-5 text-zinc-300">
                Oceanside AI Solutions believes AI is like a coming tsunami; companies can either
                ride it or get wiped out by it.
              </p>
              <p>
                Today, Mark works with companies around the globe deploying voice agents powered by{" "}
                <span className="text-cyan-300">Retell AI</span>. Hundreds of businesses run on
                agents he has built, spanning home services from home inspections to roofing, oil
                and gas, barbershop chains, and beyond. He also runs{" "}
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

      {/* ============ YOUTUBE + COMMUNITY ============ */}
      <section id="youtube" className="mx-auto max-w-7xl px-6 py-16">
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
                <p className="mt-3 text-zinc-400">
                  Tutorials, live builds, and real client delivery.
                </p>
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
                <h3 className="mt-4 font-display text-2xl font-semibold tracking-tight">
                  AI Voice Pioneers
                </h3>
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
                <Shield className="h-4 w-4 text-cyan-400" /> Security-minded practices &amp; data
                minimization
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
