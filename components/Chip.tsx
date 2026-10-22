import Glyph from "@/components/Glyph";
import type { Platform } from "@/lib/integrations";

export default function Chip({ p }: { p: Platform }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] py-1.5 pl-2 pr-3 text-[13px] text-white/75 transition duration-300 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.07] hover:text-white">
      <Glyph p={p} />
      {p.name}
    </span>
  );
}
