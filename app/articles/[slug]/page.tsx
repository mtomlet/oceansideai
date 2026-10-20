import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ArticleCard from "@/components/ArticleCard";
import VideoEmbed from "@/components/VideoEmbed";
import { Footer, Nav, Primary } from "@/components/Site";
import { articles, fmtDate, getArticle, thumb } from "@/lib/articles";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const a = getArticle((await params).slug);
  if (!a) return {};
  return {
    title: a.title,
    description: a.dek,
    openGraph: { title: a.title, description: a.dek, images: [thumb(a.videoId)], type: "article" },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const a = getArticle((await params).slug);
  if (!a) notFound();
  const more = articles.filter((x) => x.slug !== a.slug).slice(0, 3);

  return (
    <div className="grain relative min-h-screen overflow-x-clip">
      <Nav />
      <main className="px-5 pt-36 sm:px-8 md:pt-44">
        <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[420px] w-[800px] -translate-x-1/2 rounded-full bg-teal-400/[0.06] blur-[120px]" />
        <article className="mx-auto max-w-3xl">
          <Link href="/articles" className="text-sm text-white/45 transition hover:text-white">← All articles</Link>
          <p className="mt-10 flex items-center gap-2.5 text-xs uppercase tracking-[0.18em] text-white/40">
            <span className="text-teal-300/90">{a.category}</span>
            <span className="h-px w-3 bg-white/20" />
            {a.readMins} min read
          </p>
          <h1 className="mt-5 text-4xl font-medium leading-[1.05] tracking-[-0.04em] text-white sm:text-6xl">{a.title}</h1>
          <p className="mt-6 text-xl leading-relaxed text-white/55">{a.dek}</p>
          <div className="mt-8 flex items-center gap-3 border-b border-white/[0.08] pb-10">
            <img src="/youtube-profile.jpg" alt="" className="h-10 w-10 rounded-full object-cover" />
            <div className="text-sm">
              <p className="text-white">Mark Tomlet</p>
              <p className="text-white/40">{fmtDate(a.date)}</p>
            </div>
          </div>

          <div className="mt-12">
            <VideoEmbed id={a.videoId} title={a.videoTitle} />
            <p className="mt-3 text-center text-xs text-white/35">Watch: {a.videoTitle}</p>
          </div>

          <div className="mt-14 space-y-6 text-[18px] leading-[1.75] text-white/70">
            {a.body.map((b, i) =>
              b.type === "h2" ? (
                <h2 key={i} className="!mt-14 text-2xl font-medium tracking-[-0.02em] text-white sm:text-3xl">{b.text}</h2>
              ) : b.type === "quote" ? (
                <blockquote key={i} className="!my-10 border-l-2 border-teal-300/60 pl-6 font-serif text-2xl italic leading-snug text-white/90 sm:text-3xl">
                  {b.text}
                </blockquote>
              ) : (
                <p key={i}>{b.text}</p>
              )
            )}
          </div>

          <div className="mt-20 rounded-3xl border border-white/[0.08] bg-gradient-to-b from-teal-300/[0.07] to-transparent p-8 sm:p-10">
            <h2 className="text-3xl font-medium tracking-[-0.03em] text-white">
              Want an agent like this <span className="font-serif font-normal italic text-teal-200">for your business?</span>
            </h2>
            <p className="mt-4 leading-relaxed text-white/55">
              Book a free 30 minute call. We&apos;ll look at how your calls are handled today and tell you straight
              whether an agent is worth it.
            </p>
            <Primary className="mt-8">Book a free call</Primary>
          </div>
        </article>

        {more.length > 0 && (
          <section className="mx-auto mt-28 max-w-6xl pb-28">
            <p className="text-xs uppercase tracking-[0.22em] text-white/35">Keep reading</p>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {more.map((m) => (
                <ArticleCard key={m.slug} a={m} />
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
