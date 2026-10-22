import Chip from "@/components/Chip";
import Expandable from "@/components/Expandable";
import Glyph from "@/components/Glyph";
import IndustryTabs from "@/components/IndustryTabs";
import Reveal from "@/components/Reveal";
import { Eyebrow } from "@/components/Site";
import { categories, marqueeBottom, marqueeTop, platformCount, type Platform } from "@/lib/integrations";

function Row({ items, reverse = false }: { items: Platform[]; reverse?: boolean }) {
  return (
    <div className="group/row flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <div
        className={`flex w-max gap-3 pr-3 group-hover/row:[animation-play-state:paused] ${
          reverse ? "animate-[marquee_70s_linear_infinite_reverse]" : "animate-[marquee_70s_linear_infinite]"
        }`}
      >
        {[...items, ...items].map((p, i) => (
          <span
            key={`${p.name}-${i}`}
            aria-hidden={i >= items.length}
            className="flex h-14 shrink-0 items-center gap-2.5 rounded-2xl border border-white/[0.07] bg-white/[0.03] px-4 text-sm text-white/80 transition duration-300 hover:border-white/20 hover:bg-white/[0.07]"
          >
            <Glyph p={p} size="h-6 w-6" />
            {p.name}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Integrations() {
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
              <span className="text-2xl font-medium tracking-tight text-white">{platformCount}+</span> platforms and counting
            </p>
          </div>
        </Reveal>

        <div className="mt-14 space-y-3">
          <Row items={marqueeTop} />
          <Row items={marqueeBottom} reverse />
        </div>

        <Expandable label={`See all ${platformCount}+ integrations`}>
          <div className="overflow-hidden rounded-3xl border border-white/[0.07] bg-white/[0.07]">
            <div className="grid gap-px sm:grid-cols-2 lg:grid-cols-3">
              {categories.map((c) => (
                <div key={c.title} className="bg-[#07090c] p-6 sm:p-7">
                  <h3 className="text-lg font-medium text-white">{c.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/45">{c.blurb}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {c.platforms.map((p) => (
                      <Chip key={p.name} p={p} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <IndustryTabs />
          </div>
          <p className="mt-6 text-center text-sm text-white/40">
            Don&apos;t see yours? If it has an API, we can connect it.
          </p>
        </Expandable>
      </div>
    </section>
  );
}
