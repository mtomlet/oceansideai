import Expandable from "@/components/Expandable";
import Reveal from "@/components/Reveal";
import { Eyebrow } from "@/components/Site";
import { allPlatforms, categories, iconPlatforms, type Platform } from "@/lib/integrations";

function Glyph({ p, size = "h-4 w-4" }: { p: Platform; size?: string }) {
  if (!p.icon) {
    return (
      <span className={`${size} grid shrink-0 place-items-center rounded-[5px] bg-white/10 text-[9px] font-semibold text-white/70`}>
        {p.name[0]}
      </span>
    );
  }
  return (
    <span
      aria-hidden
      className={`${size} shrink-0 bg-white/60 transition-colors duration-300 group-hover/chip:bg-[var(--brand)]`}
      style={{
        ["--brand" as string]: p.hex ? `#${p.hex}` : "#ffffff",
        maskImage: `url(/integrations/${p.icon}.svg)`,
        WebkitMaskImage: `url(/integrations/${p.icon}.svg)`,
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

function Row({ items, reverse = false }: { items: Platform[]; reverse?: boolean }) {
  return (
    <div className="group/row flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <div
        className={`flex w-max gap-3 pr-3 group-hover/row:[animation-play-state:paused] ${
          reverse ? "animate-[marquee_60s_linear_infinite_reverse]" : "animate-[marquee_60s_linear_infinite]"
        }`}
      >
        {[...items, ...items].map((p, i) => (
          <span
            key={`${p.name}-${i}`}
            aria-hidden={i >= items.length}
            title={p.name}
            className="group/chip grid h-16 w-16 shrink-0 place-items-center rounded-2xl border border-white/[0.07] bg-white/[0.02] transition duration-300 hover:border-white/20 hover:bg-white/[0.06]"
          >
            <Glyph p={p} size="h-7 w-7" />
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Integrations() {
  const half = Math.ceil(iconPlatforms.length / 2);
  return (
    <section id="integrations" className="scroll-mt-24 px-5 pb-28 sm:px-8 md:pb-36">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <Eyebrow>Integrations</Eyebrow>
              <h2 className="mt-5 max-w-3xl text-4xl font-medium leading-[1.05] tracking-[-0.035em] text-white sm:text-6xl">
                Plugs into <span className="font-serif font-normal italic text-white/60">everything you run.</span>
              </h2>
              <p className="mt-5 max-w-xl leading-relaxed text-white/50">
                Your phones, calendar, CRM, and the industry software your business lives in. If it has an API, your
                agent can read from it and write to it mid call.
              </p>
            </div>
            <p className="shrink-0 text-sm text-white/40">
              <span className="text-2xl font-medium tracking-tight text-white">{allPlatforms.length}+</span> platforms and counting
            </p>
          </div>
        </Reveal>

        <div className="mt-14 space-y-3">
          <Row items={iconPlatforms.slice(0, half)} />
          <Row items={iconPlatforms.slice(half)} reverse />
        </div>

        <Expandable label={`See all ${allPlatforms.length}+ integrations`}>
        <div className="grid gap-px overflow-hidden rounded-3xl border border-white/[0.07] bg-white/[0.07] sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => (
            <div key={c.title} className="bg-[#07090c]">
              <div className="h-full p-6 sm:p-7">
                <h3 className="text-lg font-medium text-white">{c.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-white/45">{c.blurb}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {c.platforms.map((p) => (
                    <span
                      key={p.name}
                      className="group/chip inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.02] py-1.5 pl-2 pr-3 text-[13px] text-white/70 transition duration-300 hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
                    >
                      <Glyph p={p} />
                      {p.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-6 text-center text-sm text-white/40">
          Don&apos;t see yours? If it has an API, we can connect it.
        </p>
        </Expandable>
      </div>
    </section>
  );
}
