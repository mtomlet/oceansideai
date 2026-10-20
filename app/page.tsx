// app/page.tsx
import Link from "next/link";
import AudioPlayer from "@/components/AudioPlayer";

const CALENDLY_URL = "https://calendly.com/d/crgj-sgp-sq8";
const LINKEDIN_URL = "https://www.linkedin.com/in/mark-tomlet-8853b3180/";
const YOUTUBE_URL = "https://www.youtube.com/@TechTomlet";
const SKOOL_URL = "https://www.skool.com/pioneers/about";

const cases = [
  {
    client: "Merx Truck & Trailer Repair",
    kind: "After hours receptionist",
    img: "/case-merx.png",
    audio: "/merx-demo.mp3",
    stat: "20% → 0%",
    statLabel: "missed calls",
    body: "Calls after the shop closed used to go to voicemail and to the competition. Now every one gets answered, and new customers get booked the same night.",
  },
  {
    client: "Funeral Buddy, Australia",
    kind: "Outbound sales agent",
    img: "/case-funeral.png",
    audio: "/funeral-demo.mp3",
    stat: "10+ hrs",
    statLabel: "saved every day",
    body: "An outbound agent that calls funeral homes and books sales meetings. One day of calls matched what used to take several people a full week.",
  },
  {
    client: "Tutor ABC, Brazil",
    kind: "Multilingual receptionist",
    img: "/case-tutor.png",
    audio: "/tutor-demo.mp3",
    stat: "$50k+",
    statLabel: "saved per year",
    body: "A 24/7 receptionist that answers questions about language courses in Portuguese and English, and enrolls students without a person on the line.",
  },
];

const steps = [
  {
    n: "01",
    title: "We talk through your calls",
    body: "A 30 minute call about who phones you, what they want, and where calls fall through today. You leave with a clear picture of what the agent would do.",
  },
  {
    n: "02",
    title: "I build it, you test it",
    body: "I map the full call flow on a page you can comment on, then build the agent and connect it to your calendar, CRM, or booking system. You call it and try to break it.",
  },
  {
    n: "03",
    title: "It goes live, I keep watching",
    body: "Usually live within one to two weeks. I review real calls after launch and tune the agent as your business changes.",
  },
];

const faqs = [
  {
    q: "Who actually builds my agent?",
    a: "I do. Oceanside is me. There is no sales team and no handoff to a junior developer. The person on your first call is the person who builds, tests, and maintains your agent.",
  },
  {
    q: "What happens if you are unavailable?",
    a: "Your agent runs on Retell AI's cloud infrastructure, not on my computer, so it keeps answering calls whether I am online or not. You also get your own access to the platform, so you are never locked out of your agent.",
  },
  {
    q: "Will callers know it is AI?",
    a: "Some will and most will not care. The agent speaks naturally, handles interruptions, and gets to the point. If a caller asks for a person, it transfers or takes a message, whichever you prefer.",
  },
  {
    q: "What can it connect to?",
    a: "Calendars, CRMs, booking and POS systems, SMS, email, and most tools with an API. If your system has a way in, the agent can usually read from it and write to it during the call.",
  },
  {
    q: "What languages does it speak?",
    a: "English, Spanish, Portuguese, and more. One agent can switch languages mid call if the caller does.",
  },
];

function Logo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <circle cx="16" cy="16" r="15" fill="#0f5c58" />
      <path
        d="M6 18c2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2 2.5 2 5 2"
        fill="none"
        stroke="#f6f2ea"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M6 13c2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2 2.5 2 5 2"
        fill="none"
        stroke="#f6f2ea"
        strokeOpacity=".5"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Arrow() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M4 10h12M11 5l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BookButton({ children = "Book a call" }: { children?: React.ReactNode }) {
  return (
    <a
      href={CALENDLY_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-full bg-[#13201d] px-6 py-3.5 text-sm font-medium text-[#f6f2ea] transition hover:bg-[#0f5c58]"
    >
      {children} <Arrow />
    </a>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-clip bg-[#f6f2ea] text-[#13201d]">
      {/* nav */}
      <header className="sticky top-0 z-50 border-b border-[#13201d]/8 bg-[#f6f2ea]/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
          <a href="#top" className="flex items-center gap-2.5">
            <Logo className="h-7 w-7" />
            <span className="font-display text-lg font-medium tracking-tight">Oceanside AI</span>
          </a>
          <nav className="hidden items-center gap-8 text-sm text-[#4a5653] md:flex">
            <a href="#work" className="transition hover:text-[#13201d]">Work</a>
            <a href="#process" className="transition hover:text-[#13201d]">Process</a>
            <a href="#about" className="transition hover:text-[#13201d]">About</a>
            <a href="#faq" className="transition hover:text-[#13201d]">FAQ</a>
          </nav>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-[#13201d]/15 px-4 py-2 text-sm font-medium transition hover:border-[#13201d] hover:bg-[#13201d] hover:text-[#f6f2ea]"
          >
            Book a call
          </a>
        </div>
      </header>

      <main id="top">
        {/* hero */}
        <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-20 pt-16 sm:px-8 md:grid-cols-[1.25fr_1fr] md:pb-28 md:pt-24">
          <div>
            <p className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#e3eeeb] px-3 py-1 text-xs font-medium text-[#0f5c58]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#0f5c58]" /> AI voice agents for small and mid sized businesses
            </p>
            <h1 className="font-display text-[2.6rem] font-normal leading-[1.05] tracking-tight sm:text-6xl">
              Every call answered.
              <br />
              <span className="italic text-[#0f5c58]">Even the ones at 2am.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#4a5653]">
              I build AI receptionists that pick up when you can&apos;t, book the appointment, and text the
              caller a confirmation. Built around how your business actually runs, live in one to two weeks.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <BookButton />
              <a href="#work" className="inline-flex items-center gap-2 px-2 py-3 text-sm font-medium text-[#0f5c58] hover:underline">
                Hear real calls first
              </a>
            </div>
          </div>

          <figure className="relative mx-auto w-full max-w-sm">
            <div className="absolute -inset-3 -z-0 rotate-2 rounded-[2rem] bg-[#e3eeeb]" aria-hidden />
            <img
              src="/founder.jpg"
              alt="Mark Tomlet, founder of Oceanside AI Solutions"
              className="relative aspect-[4/5] w-full rounded-[1.6rem] object-cover"
            />
            <figcaption className="absolute -bottom-6 left-4 right-4 rounded-2xl bg-white p-4 shadow-[0_10px_30px_-12px_rgba(19,32,29,0.25)] sm:left-auto sm:right-[-1.5rem] sm:w-64">
              <p className="text-sm font-medium">Mark Tomlet</p>
              <p className="mt-0.5 text-xs leading-relaxed text-[#5b6764]">
                Founder. I build every agent myself, from the first call to go live.
              </p>
            </figcaption>
          </figure>
        </section>

        {/* logos */}
        <section className="border-y border-[#13201d]/8 bg-white/50">
          <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-5 py-8 sm:px-8 md:flex-row md:justify-between">
            <p className="text-xs uppercase tracking-[0.18em] text-[#5b6764]">Work for teams at</p>
            <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5">
              {[
                { src: "/logos/cbn.png", alt: "CBN News" },
                { src: "/logos/regent.png", alt: "Regent University" },
                { src: "/logos/merx.png", alt: "Merx Truck & Trailer" },
              ].map((l) => (
                <img key={l.alt} src={l.src} alt={l.alt} className="h-7 w-auto object-contain opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0 sm:h-8" />
              ))}
            </div>
          </div>
        </section>

        {/* work */}
        <section id="work" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-24 sm:px-8 md:py-32">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-[#0f5c58]">Client work</p>
            <h2 className="mt-3 font-display text-4xl tracking-tight sm:text-5xl">Don&apos;t take my word for it. Press play.</h2>
            <p className="mt-5 text-lg leading-relaxed text-[#4a5653]">
              These are recordings of agents I built, talking to real callers.
            </p>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {cases.map((c) => (
              <article key={c.client} className="flex flex-col overflow-hidden rounded-3xl border border-[#13201d]/8 bg-white">
                <img src={c.img} alt={c.client} className="aspect-[16/10] w-full object-cover" />
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#0f5c58]">{c.kind}</p>
                  <h3 className="mt-2 text-lg font-semibold">{c.client}</h3>
                  <p className="mt-3 flex-1 text-[15px] leading-relaxed text-[#4a5653]">{c.body}</p>
                  <div className="mt-6 flex items-baseline gap-2 border-t border-[#13201d]/8 pt-5">
                    <span className="font-display text-3xl">{c.stat}</span>
                    <span className="text-sm text-[#5b6764]">{c.statLabel}</span>
                  </div>
                  <div className="mt-5">
                    <AudioPlayer src={c.audio} label="Real call" />
                  </div>
                </div>
              </article>
            ))}
          </div>

          <article className="mt-6 grid overflow-hidden rounded-3xl bg-[#13201d] text-[#f6f2ea] md:grid-cols-[1fr_1.4fr]">
            <img src="/case-cbn.png" alt="CBN News and Regent University" className="h-full max-h-80 w-full object-cover md:max-h-none" />
            <div className="p-8 sm:p-10">
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#8fc9c0]">Workflow automation</p>
              <h3 className="mt-2 font-display text-3xl tracking-tight">CBN News + Regent University</h3>
              <p className="mt-4 max-w-lg leading-relaxed text-[#c9d3d0]">
                Where this started. I built a writing assistant for CBN journalists that learns each
                reporter&apos;s voice and drafts scripts from a short interview. Then I built automations for
                Regent University that took repetitive work off staff.
              </p>
              <div className="mt-8 grid max-w-md grid-cols-2 gap-6">
                <div>
                  <p className="font-display text-3xl">4h → 20m</p>
                  <p className="mt-1 text-sm text-[#a9b6b2]">per news script</p>
                </div>
                <div>
                  <p className="font-display text-3xl">500+ hrs</p>
                  <p className="mt-1 text-sm text-[#a9b6b2]">saved per year at Regent</p>
                </div>
              </div>
            </div>
          </article>
        </section>

        {/* process */}
        <section id="process" className="scroll-mt-20 bg-[#e8efe9]">
          <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 md:py-32">
            <div className="max-w-2xl">
              <p className="text-sm font-medium text-[#0f5c58]">How it works</p>
              <h2 className="mt-3 font-display text-4xl tracking-tight sm:text-5xl">From first call to live agent in about two weeks.</h2>
            </div>
            <ol className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
              {steps.map((s) => (
                <li key={s.n} className="border-t-2 border-[#13201d] pt-6">
                  <span className="font-display text-sm text-[#0f5c58]">{s.n}</span>
                  <h3 className="mt-2 text-xl font-semibold">{s.title}</h3>
                  <p className="mt-3 leading-relaxed text-[#4a5653]">{s.body}</p>
                </li>
              ))}
            </ol>

            <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                ["Answers 24/7", "Nights, weekends, holidays, and lunch rush."],
                ["Books and updates", "Writes straight to your calendar and CRM."],
                ["Texts confirmations", "Callers get the details in writing right away."],
                ["Hands off to you", "Transfers or takes a message when a person is needed."],
              ].map(([t, d]) => (
                <div key={t} className="rounded-2xl bg-[#f6f2ea] p-5">
                  <p className="font-semibold">{t}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#5b6764]">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* about */}
        <section id="about" className="mx-auto grid max-w-6xl scroll-mt-20 gap-14 px-5 py-24 sm:px-8 md:grid-cols-[1fr_1.3fr] md:py-32">
          <div>
            <p className="text-sm font-medium text-[#0f5c58]">About</p>
            <h2 className="mt-3 font-display text-4xl tracking-tight sm:text-5xl">Hi, I&apos;m Mark.</h2>
            <div className="mt-8 flex flex-wrap gap-3 text-sm">
              <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="rounded-full border border-[#13201d]/15 px-4 py-2 transition hover:border-[#13201d]">LinkedIn</a>
              <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer" className="rounded-full border border-[#13201d]/15 px-4 py-2 transition hover:border-[#13201d]">YouTube</a>
              <a href={SKOOL_URL} target="_blank" rel="noopener noreferrer" className="rounded-full border border-[#13201d]/15 px-4 py-2 transition hover:border-[#13201d]">Community</a>
            </div>
          </div>
          <div className="space-y-5 text-lg leading-relaxed text-[#3f4a47]">
            <p>
              I studied cybersecurity and started out working alongside journalists, including reporters
              covering the war in Ukraine. Watching them race deadlines, I built an AI assistant to help draft
              their scripts. It cut a four hour job to twenty minutes, and CBN News asked me to build more.
            </p>
            <p>
              Today I build AI voice agents on Retell AI for businesses that lose money every time the phone
              goes unanswered: truck repair shops, barbershops, home services, oil and gas, education, and
              more.
            </p>
            <p>
              Oceanside is a one person shop on purpose. When you work with me, you talk to the person who
              builds your agent, and I only take on as many clients as I can look after properly.
            </p>
            <p>
              I also teach this stuff. My YouTube channel, Tech Tomlet, has 300k+ views of tutorials and live
              builds, and I run AI Voice Pioneers, a community where builders learn to ship real voice agents.
            </p>
          </div>
        </section>

        {/* faq */}
        <section id="faq" className="scroll-mt-20 border-t border-[#13201d]/8">
          <div className="mx-auto grid max-w-6xl gap-12 px-5 py-24 sm:px-8 md:grid-cols-[1fr_1.6fr] md:py-32">
            <div>
              <p className="text-sm font-medium text-[#0f5c58]">Questions</p>
              <h2 className="mt-3 font-display text-4xl tracking-tight sm:text-5xl">The things people ask on the first call.</h2>
            </div>
            <div className="divide-y divide-[#13201d]/10 border-y border-[#13201d]/10">
              {faqs.map((f) => (
                <details key={f.q} className="group py-6">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-medium [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-[#13201d]/15 text-[#0f5c58] transition group-open:rotate-45">
                      <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden><path d="M8 3v10M3 8h10" strokeLinecap="round" /></svg>
                    </span>
                  </summary>
                  <p className="mt-4 max-w-2xl leading-relaxed text-[#4a5653]">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* cta */}
        <section className="px-5 pb-24 sm:px-8">
          <div className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-[#0f5c58] px-6 py-16 text-center text-[#f6f2ea] sm:px-12 md:py-24">
            <h2 className="mx-auto max-w-3xl font-display text-4xl tracking-tight sm:text-6xl">
              How many calls did you miss this week?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-[#cfe3df]">
              Book a free 30 minute call. I&apos;ll walk through your calls and tell you honestly whether an
              agent makes sense for your business.
            </p>
            <div className="mt-10">
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#f6f2ea] px-7 py-4 text-sm font-semibold text-[#13201d] transition hover:bg-white"
              >
                Book a call <Arrow />
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#13201d]/8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-8 text-sm text-[#5b6764] sm:flex-row sm:px-8">
          <div className="flex items-center gap-2">
            <Logo className="h-5 w-5" />
            <span>© {new Date().getFullYear()} Oceanside AI Solutions</span>
          </div>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-[#13201d]">Privacy</Link>
            <Link href="/terms" className="hover:text-[#13201d]">Terms</Link>
            <a href={SKOOL_URL} target="_blank" rel="noopener noreferrer" className="hover:text-[#13201d]">Community</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
