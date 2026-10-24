// inline phrase that shows a photo on hover/tap
export default function HoverPhoto({ label, src, alt, caption }: { label: string; src: string; alt: string; caption: string }) {
  return (
    <span tabIndex={0} className="group relative inline-block cursor-help outline-none">
      <span className="text-white underline decoration-teal-300/60 decoration-dotted underline-offset-4">{label}</span>
      <span className="pointer-events-none invisible absolute bottom-full left-1/2 z-20 mb-3 w-[min(260px,70vw)] -translate-x-1/2 translate-y-1 rounded-2xl border border-white/10 bg-[#0c1014] p-2 opacity-0 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)] transition duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus:visible group-focus:translate-y-0 group-focus:opacity-100">
        <img src={src} alt={alt} loading="lazy" className="block aspect-[4/5] w-full rounded-xl object-cover" />
        <span className="mt-2 block px-1 pb-0.5 text-[11px] leading-snug text-white/45">{caption}</span>
      </span>
    </span>
  );
}
