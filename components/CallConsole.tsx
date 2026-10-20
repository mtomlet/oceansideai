"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import transcripts from "@/lib/transcripts.json";

type Turn = { s: "a" | "c"; t: number; x: string };

const CALLS = [
  {
    id: "merx",
    client: "Merx Truck & Trailer",
    kind: "Inbound · After hours receptionist",
    src: "/merx-demo.mp3",
    agent: "Chet",
  },
  {
    id: "funeral",
    client: "Funeral Buddy",
    kind: "Outbound · Sales appointment setter",
    src: "/funeral-demo.mp3",
    agent: "Sales agent",
  },
  {
    id: "tutor",
    client: "TutorABC Brazil",
    kind: "Inbound · Course enrollment",
    src: "/tutor-demo.mp3",
    agent: "Camila",
  },
] as const;

const BARS = 56;

function fmt(s: number) {
  if (!Number.isFinite(s)) return "0:00";
  return `${Math.floor(s / 60)}:${Math.floor(s % 60)
    .toString()
    .padStart(2, "0")}`;
}

export default function CallConsole() {
  const audio = useRef<HTMLAudioElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const scroller = useRef<HTMLDivElement>(null);
  const analyser = useRef<AnalyserNode | null>(null);
  const autoplay = useRef(false);
  const [idx, setIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [dur, setDur] = useState(0);
  const [started, setStarted] = useState(false);

  const call = CALLS[idx];
  const turns = (transcripts as Record<string, Turn[]>)[call.id];
  const shown = turns.filter((t) => t.t <= time + 0.15);
  const visible = started ? shown : turns.slice(0, 2);

  const ensureAnalyser = () => {
    if (analyser.current || !audio.current) return;
    const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new Ctx();
    const src = ctx.createMediaElementSource(audio.current);
    const an = ctx.createAnalyser();
    an.fftSize = 256;
    an.smoothingTimeConstant = 0.78;
    src.connect(an);
    an.connect(ctx.destination);
    analyser.current = an;
  };

  const toggle = useCallback(async () => {
    const a = audio.current;
    if (!a) return;
    if (a.paused) {
      ensureAnalyser();
      await (analyser.current?.context as AudioContext | undefined)?.resume();
      await a.play();
      setStarted(true);
    } else {
      a.pause();
    }
  }, []);

  const pick = (i: number) => {
    if (i === idx) return toggle();
    audio.current?.pause();
    setIdx(i);
    setTime(0);
    setStarted(true);
    autoplay.current = true;
  };

  useEffect(() => {
    if (!autoplay.current || !audio.current) return;
    autoplay.current = false;
    ensureAnalyser();
    audio.current.load();
    audio.current.play().catch(() => {});
  }, [idx]);

  // waveform
  useEffect(() => {
    const c = canvas.current;
    if (!c) return;
    const g = c.getContext("2d");
    if (!g) return;
    let raf = 0;
    const data = new Uint8Array(128);
    const levels = new Array(BARS).fill(0);
    const draw = (ts: number) => {
      const dpr = window.devicePixelRatio || 1;
      const w = c.clientWidth;
      const h = c.clientHeight;
      if (c.width !== w * dpr) {
        c.width = w * dpr;
        c.height = h * dpr;
      }
      g.setTransform(dpr, 0, 0, dpr, 0, 0);
      g.clearRect(0, 0, w, h);
      const live = analyser.current && audio.current && !audio.current.paused;
      if (live) analyser.current!.getByteFrequencyData(data);
      const gap = 3;
      const bw = (w - gap * (BARS - 1)) / BARS;
      for (let i = 0; i < BARS; i++) {
        const mirrored = Math.abs(i - BARS / 2) / (BARS / 2);
        let target: number;
        if (live) {
          const bin = Math.floor((1 - mirrored) * 46) + 2;
          target = Math.pow(data[bin] / 255, 1.4) * 1.15;
        } else {
          target = 0.06 + 0.05 * Math.sin(ts / 600 + i * 0.35) * (1 - mirrored);
        }
        levels[i] += (target - levels[i]) * 0.28;
        const bh = Math.max(3, Math.min(1, levels[i]) * h * 0.92);
        const x = i * (bw + gap);
        const y = (h - bh) / 2;
        const alpha = 0.35 + 0.65 * (1 - mirrored);
        g.fillStyle = `rgba(94, 234, 212, ${alpha})`;
        g.beginPath();
        g.roundRect(x, y, bw, bh, bw / 2);
        g.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, []);

  // auto scroll transcript
  useEffect(() => {
    const s = scroller.current;
    if (s) s.scrollTo({ top: s.scrollHeight, behavior: "smooth" });
  }, [visible.length, idx]);

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const a = audio.current;
    if (!a || !dur) return;
    const r = e.currentTarget.getBoundingClientRect();
    a.currentTime = ((e.clientX - r.left) / r.width) * dur;
    setStarted(true);
  };

  return (
    <div className="relative">
      <div className="pointer-events-none absolute -inset-x-20 -top-24 bottom-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(45,212,191,0.16),transparent_65%)] blur-2xl" />
      <div className="overflow-hidden rounded-[28px] border border-white/10 bg-[#0c1014]/80 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.8)] backdrop-blur-xl">
        {/* title bar */}
        <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-3.5">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
          </div>
          <p className="text-xs text-white/40">Real client calls</p>
          <span className="flex items-center gap-2 text-xs text-teal-300">
            <span className={`h-1.5 w-1.5 rounded-full bg-teal-300 ${playing ? "animate-[pulse-dot_1.4s_ease-out_infinite]" : "opacity-40"}`} />
            {playing ? "On call" : "Ready"}
          </span>
        </div>

        <div className="grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
          {/* left: player */}
          <div className="flex flex-col border-b border-white/[0.07] p-5 sm:p-7 md:border-b-0 md:border-r">
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/40">{call.kind}</p>
            <h3 className="mt-2 text-2xl font-medium tracking-tight text-white">{call.client}</h3>

            <div className="relative mt-6 h-28">
              <canvas ref={canvas} className="h-full w-full" />
            </div>

            <div className="mt-6 flex items-center gap-4">
              <button
                onClick={toggle}
                aria-label={playing ? "Pause call" : "Play call"}
                className="group relative grid h-14 w-14 shrink-0 place-items-center rounded-full bg-teal-300 text-[#07090c] transition hover:scale-105 hover:bg-teal-200"
              >
                {!started && <span className="absolute inset-0 rounded-full animate-[pulse-dot_1.8s_ease-out_infinite]" />}
                {playing ? (
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1.2" /><rect x="14" y="5" width="4" height="14" rx="1.2" /></svg>
                ) : (
                  <svg viewBox="0 0 24 24" className="ml-0.5 h-5 w-5" fill="currentColor"><path d="M8 5.5v13a1 1 0 0 0 1.5.86l11-6.5a1 1 0 0 0 0-1.72l-11-6.5A1 1 0 0 0 8 5.5Z" /></svg>
                )}
              </button>
              <div className="min-w-0 flex-1">
                <div onClick={seek} className="group relative h-1.5 cursor-pointer rounded-full bg-white/10" role="presentation">
                  <div className="absolute inset-y-0 left-0 rounded-full bg-teal-300" style={{ width: dur ? `${(time / dur) * 100}%` : "0%" }} />
                </div>
                <div className="mt-2 flex justify-between text-xs tabular-nums text-white/40">
                  <span>{fmt(time)}</span>
                  <span>{fmt(dur)}</span>
                </div>
              </div>
            </div>

            <div className="mt-7 space-y-1.5">
              {CALLS.map((c, i) => (
                <button
                  key={c.id}
                  onClick={() => pick(i)}
                  className={`flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-left text-sm transition ${
                    i === idx ? "bg-white/[0.07] text-white" : "text-white/50 hover:bg-white/[0.04] hover:text-white/80"
                  }`}
                >
                  <span className="truncate">{c.client}</span>
                  <span className="ml-3 shrink-0 text-xs text-white/35">{c.kind.split(" · ")[0]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* right: transcript */}
          <div className="relative">
            <div
              ref={scroller}
              className="h-[340px] overflow-y-auto px-5 py-6 sm:h-[420px] sm:px-7 [mask-image:linear-gradient(to_bottom,transparent,black_18%,black_88%,transparent)] [scrollbar-width:none]"
            >
              <div className="h-12" />
              <AnimatePresence initial={false} mode="popLayout">
                {visible.map((t, i) => {
                  const current = started && i === visible.length - 1 && playing;
                  return (
                    <motion.div
                      key={`${call.id}-${t.t}`}
                      layout
                      initial={{ opacity: 0, y: 14, filter: "blur(4px)" }}
                      animate={{ opacity: started ? 1 : 0.45, y: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      className={`mb-5 flex gap-3 ${t.s === "c" ? "flex-row-reverse text-right" : ""}`}
                    >
                      <span
                        className={`mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full text-[10px] font-semibold ${
                          t.s === "a" ? "bg-teal-300/15 text-teal-200" : "bg-white/10 text-white/60"
                        }`}
                      >
                        {t.s === "a" ? "AI" : "C"}
                      </span>
                      <div className="max-w-[85%]">
                        <p className="mb-1 text-[11px] uppercase tracking-[0.14em] text-white/30">
                          {t.s === "a" ? `${call.agent} · AI agent` : "Caller"}
                        </p>
                        <p
                          className={`inline-block rounded-2xl px-4 py-2.5 text-[15px] leading-relaxed transition-colors ${
                            t.s === "a" ? "bg-teal-300/[0.08] text-white/90" : "bg-white/[0.05] text-white/75"
                          } ${current ? "ring-1 ring-teal-300/40" : ""}`}
                        >
                          {t.x}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
              {!started && (
                <p className="mt-2 text-center text-sm text-white/40">Press play to hear the full call</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <audio
        ref={audio}
        src={call.src}
        preload="metadata"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
        onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDur(e.currentTarget.duration)}
      />
    </div>
  );
}
