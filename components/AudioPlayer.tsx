"use client";

import { useEffect, useRef, useState } from "react";

function fmt(s: number) {
  if (!Number.isFinite(s)) return "--:--";
  const m = Math.floor(s / 60);
  const r = Math.floor(s % 60);
  return `${m}:${r.toString().padStart(2, "0")}`;
}

export default function AudioPlayer({ src, label }: { src: string; label: string }) {
  const ref = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [dur, setDur] = useState(NaN);

  useEffect(() => {
    const a = ref.current;
    if (!a) return;
    const onTime = () => setTime(a.currentTime);
    const onMeta = () => setDur(a.duration);
    const onEnd = () => setPlaying(false);
    a.addEventListener("timeupdate", onTime);
    a.addEventListener("loadedmetadata", onMeta);
    a.addEventListener("ended", onEnd);
    return () => {
      a.removeEventListener("timeupdate", onTime);
      a.removeEventListener("loadedmetadata", onMeta);
      a.removeEventListener("ended", onEnd);
    };
  }, []);

  const toggle = () => {
    const a = ref.current;
    if (!a) return;
    if (a.paused) {
      document.querySelectorAll("audio").forEach((el) => el !== a && el.pause());
      a.play();
      setPlaying(true);
    } else {
      a.pause();
      setPlaying(false);
    }
  };

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const a = ref.current;
    if (!a || !Number.isFinite(a.duration)) return;
    const r = e.currentTarget.getBoundingClientRect();
    a.currentTime = ((e.clientX - r.left) / r.width) * a.duration;
  };

  const pct = Number.isFinite(dur) && dur > 0 ? (time / dur) * 100 : 0;

  return (
    <div className="flex items-center gap-3 rounded-full border border-[#13201d]/10 bg-white py-2 pl-2 pr-4">
      <audio ref={ref} src={src} preload="metadata" onPause={() => setPlaying(false)} />
      <button
        onClick={toggle}
        aria-label={playing ? `Pause ${label}` : `Play ${label}`}
        className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#0f5c58] text-white transition hover:bg-[#0b4744]"
      >
        {playing ? (
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1" /><rect x="14" y="5" width="4" height="14" rx="1" /></svg>
        ) : (
          <svg viewBox="0 0 24 24" className="ml-0.5 h-4 w-4" fill="currentColor"><path d="M8 5.5v13a1 1 0 0 0 1.5.86l11-6.5a1 1 0 0 0 0-1.72l-11-6.5A1 1 0 0 0 8 5.5Z" /></svg>
        )}
      </button>
      <div className="min-w-0 flex-1">
        <div className="mb-1.5 flex items-center justify-between text-xs text-[#5b6764]">
          <span className="flex items-center gap-1.5 truncate">
            {playing && (
              <span className="flex h-3 items-end gap-[2px]" aria-hidden>
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="w-[2px] origin-bottom rounded-full bg-[#0f5c58]"
                    style={{ height: "100%", animation: `eq 0.9s ${i * 0.15}s ease-in-out infinite` }}
                  />
                ))}
              </span>
            )}
            {label}
          </span>
          <span className="tabular-nums">
            {fmt(time)} / {fmt(dur)}
          </span>
        </div>
        <div onClick={seek} className="h-1.5 cursor-pointer rounded-full bg-[#13201d]/10" role="presentation">
          <div className="h-full rounded-full bg-[#0f5c58]" style={{ width: `${pct}%` }} />
        </div>
      </div>
    </div>
  );
}
