import type { Metadata } from "next";
import ArticleCard from "@/components/ArticleCard";
import Reveal from "@/components/Reveal";
import { Eyebrow, Footer, Nav, YOUTUBE_URL, Arrow } from "@/components/Site";
import { articles } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Writing",
  description: "Articles by Mark Tomlet on building, buying, and running AI voice agents.",
};

export default function ArticlesPage() {
  const [lead, ...rest] = articles;
  return (
    <div className="grain relative min-h-screen overflow-x-clip">
      <Nav />
      <main className="px-5 pb-28 pt-40 sm:px-8 md:pt-48">
        <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[420px] w-[800px] -translate-x-1/2 rounded-full bg-teal-400/[0.06] blur-[120px]" />
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <Eyebrow>Writing</Eyebrow>
            <h1 className="mt-5 max-w-4xl text-5xl font-medium leading-[1] tracking-[-0.045em] text-white sm:text-7xl">
              Notes from <span className="font-serif font-normal italic text-white/60">the field.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/50">
              Lessons from building voice agents for real businesses. Every article comes from one of my videos, so
              you can read it or watch it.
            </p>
            <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 text-sm text-teal-300/90 hover:text-teal-200">
              Watch on YouTube <Arrow className="h-3.5 w-3.5" />
            </a>
          </Reveal>
          <div className="mt-16 grid gap-5">
            {lead && (
              <Reveal>
                <ArticleCard a={lead} large />
              </Reveal>
            )}
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {rest.map((a, i) => (
                <Reveal key={a.slug} delay={(i % 3) * 0.07}>
                  <ArticleCard a={a} />
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
