// "40 countries" with a hover/tap map of a few of them
export default function Countries() {
  return (
    <span tabIndex={0} className="group relative inline-block cursor-help outline-none">
      <span className="text-white underline decoration-teal-300/60 decoration-dotted underline-offset-4">
        40 countries
      </span>
      <span className="pointer-events-none invisible absolute bottom-full left-1/2 z-20 mb-3 w-[min(360px,82vw)] -translate-x-1/2 translate-y-1 rounded-2xl border border-white/10 bg-[#0c1014] p-3 opacity-0 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)] transition duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus:visible group-focus:translate-y-0 group-focus:opacity-100">
        <img src="/world-visited.svg" alt="World map with countries Mark has visited highlighted" className="block w-full" />
        <span className="mt-2 flex items-center gap-2 px-1 text-[11px] leading-snug text-white/45">
          <span className="h-2 w-2 shrink-0 rounded-full bg-teal-300" />A few of them, from Panama to Japan
        </span>
      </span>
    </span>
  );
}
