import type { Platform } from "@/lib/integrations";

export default function Glyph({ p, size = "h-[18px] w-[18px]" }: { p: Platform; size?: string }) {
  if (p.icon) {
    const url = `url(/integrations/${p.icon}.svg)`;
    return (
      <span
        aria-hidden
        className={`${size} shrink-0`}
        style={{
          backgroundColor: p.hex ? `#${p.hex}` : "#ffffff",
          maskImage: url,
          WebkitMaskImage: url,
          maskSize: "contain",
          WebkitMaskSize: "contain",
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
          maskPosition: "center",
          WebkitMaskPosition: "center",
        }}
      />
    );
  }
  if (p.domain) {
    return <img src={`/integrations/fav/${p.domain}.png`} alt="" loading="lazy" className={`${size} shrink-0 rounded-[5px] bg-white object-contain p-[2px]`} />;
  }
  return (
    <span className={`${size} grid shrink-0 place-items-center rounded-[5px] bg-white/10 text-[9px] font-semibold text-white/70`}>
      {p.name[0]}
    </span>
  );
}
