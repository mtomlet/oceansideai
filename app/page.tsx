// app/page.tsx
import CallConsole from "@/components/CallConsole";
import Reveal from "@/components/Reveal";
import Countries from "@/components/Countries";
import ArticleCard from "@/components/ArticleCard";
import Integrations from "@/components/Integrations";
import { articles } from "@/lib/articles";
import { Arrow, CALENDLY_URL, Eyebrow, Footer, LINKEDIN_URL, Nav, Primary, SKOOL_URL, YOUTUBE_URL } from "@/components/Site";

const results = [
  { big: "20% → 0%", label: "missed calls", who: "Merx Truck & Trailer" },
  { big: "10+ hrs", label: "of calling saved every day", who: "Funeral Buddy" },
  { big: "$50k+", label: "saved per year", who: "TutorABC Brazil" },
  { big: "4h → 20m", label: "per news script", who: "CBN News" },
];

const steps = [
  {
    when: "Discovery",
    title: "We map your calls",
    body: "A 30 minute call on who phones you, what they want, and where calls fall through today.",
  },
  {
    when: "Build",
    title: "We build, you break it",
    body: "You get an interactive call flow to comment on. We build the agent, wire it into your systems, and you call it until you can't break it.",
  },
  {
    when: "Launch",
    title: "Live, and we stay on it",
    body: "The agent starts taking real calls. We review them, tune the agent, and we keep a standing weekly check in.",
  },
];

const faqs = [
  {
    q: "Who actually builds my agent?",
    a: "Our team. The same people who scope your agent on the first call build, test, and maintain it. No offshore handoff, no template dropped in and forgotten.",
  },
  {
    q: "What if you're unavailable?",
    a: "Your agent runs on Retell AI's cloud infrastructure, so it keeps answering around the clock, no matter what. You also get your own access to the platform, so you're never locked out of your agent.",
  },
  {
    q: "Will callers know it's AI?",
    a: "Some will, and most won't care. It speaks naturally, handles interruptions, and gets to the point. If someone wants a person, it transfers or takes a message, your call.",
  },
  {
    q: "What can it connect to?",
    a: "Calendars, CRMs, booking and POS systems, SMS, email, and most tools with an API. If your system has a way in, the agent can read from it and write to it mid call.",
  },
  {
    q: "Can you handle patient calls?",
    a: "Yes. We build HIPAA compliant voice agents for clinics and healthcare practices, so patient calls can be answered, routed, and booked without putting protected information at risk.",
  },
  {
    q: "What languages does it speak?",
    a: "English, Spanish, Portuguese, and more. One agent can switch languages mid call if the caller does.",
  },
];

export default function Home() {
  return (
    <div className="grain relative min-h-screen overflow-x-clip">
      <Nav />

      <main id="top">
        {/* hero */}
        <section className="relative px-5 pt-36 sm:px-8 md:pt-44">
          <div className="pointer-events-none absolute inset-0 -z-10 [background-image:linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_70%_55%_at_50%_0%,black,transparent)]" />
          <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-teal-400/[0.07] blur-[120px]" />

          <div className="mx-auto max-w-4xl text-center">
            <Reveal>
              <p className="mx-auto inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-xs text-white/60">
                <span className="h-1.5 w-1.5 rounded-full bg-teal-300 animate-[pulse-dot_1.6s_ease-out_infinite]" />
                Custom AI voice agents, built by hand
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="mt-7 bg-gradient-to-b from-white via-white to-white/50 bg-clip-text pb-2 text-[3.1rem] font-medium leading-[0.98] tracking-[-0.045em] text-transparent sm:text-7xl md:text-[5.6rem]">
                Your phone,
                <br />
                <span className="bg-gradient-to-r from-teal-200 to-cyan-300 bg-clip-text pr-2 font-serif font-normal italic tracking-[-0.02em] text-transparent">answered.</span>{" "}
                Every time.
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-white/55 sm:text-xl">
                AI receptionists that pick up on the first ring, book the appointment, and follow up, at 2pm or
                2am. Scoped and built around how your business actually runs.
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Primary>Book a free call</Primary>
                <a href="#calls" className="inline-flex items-center gap-2 rounded-full px-5 py-3.5 text-sm text-white/70 transition hover:text-white">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden><path d="M8 5.5v13a1 1 0 0 0 1.5.86l11-6.5a1 1 0 0 0 0-1.72l-11-6.5A1 1 0 0 0 8 5.5Z" /></svg>
                  Hear a real call
                </a>
              </div>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-white/45">
                <span className="flex items-center gap-1.5">
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-teal-300" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><path d="M12 3l7 3v6c0 4.5-3 7.7-7 9-4-1.3-7-4.5-7-9V6l7-3z" /><path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  HIPAA compliant AI
                </span>
                <span className="flex items-center gap-1.5"><span className="h-1 w-1 rounded-full bg-white/30" />Built on Retell AI</span>
                <span className="flex items-center gap-1.5"><span className="h-1 w-1 rounded-full bg-white/30" />English, Spanish, Portuguese</span>
              </div>
            </Reveal>
          </div>

          <div id="calls" className="mx-auto mt-20 max-w-5xl scroll-mt-28 md:mt-24">
            <Reveal delay={0.1}>
              <CallConsole />
            </Reveal>
          </div>
        </section>

        {/* logos */}
        <section className="px-5 pt-24 sm:px-8">
          <div className="mx-auto max-w-5xl">
            <p className="text-center text-xs uppercase tracking-[0.22em] text-white/35">Trusted by teams at</p>
            <div className="group/marquee relative mt-10 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
              <div className="flex w-max animate-[marquee_38s_linear_infinite] group-hover/marquee:[animation-play-state:paused]">
                {[0, 1].map((dup) => (
                  <div key={dup} className="flex shrink-0 items-center gap-4 pr-4" aria-hidden={dup === 1}>
                    {[
                      { src: "/logos/retell.svg", alt: "Retell AI", h: "h-7" },
                      { src: "/logos/cbn.png", alt: "CBN News", h: "h-9" },
                      { src: "/logos/regent.png", alt: "Regent University", h: "h-10" },
                      { src: "/logos/keepitcut.svg", alt: "Keep It Cut", h: "h-10" },
                      { src: "/logos/lovejoy.png", alt: "LoveJoy Hormone Clinic", h: "h-8" },
                      { src: "/logos/otwg.png", alt: "Oil The Woodlands Group", h: "h-11" },
                      { src: "/logos/merx.png", alt: "Merx Truck & Trailer", h: "h-8", jpg: true },
                    ].map((l) => (
                      <div
                        key={l.alt}
                        className="group/logo grid h-20 w-48 place-items-center rounded-2xl border border-white/[0.06] bg-white/[0.02] transition duration-500 hover:border-white hover:bg-white hover:shadow-[0_0_40px_-8px_rgba(94,234,212,0.5)]"
                      >
                        <img
                          src={l.src}
                          alt={dup ? "" : l.alt}
                          className={`${l.h} w-auto max-w-[140px] object-contain opacity-60 transition duration-500 group-hover/logo:opacity-100 group-hover/logo:[filter:none] ${
                            l.jpg ? "mix-blend-screen group-hover/logo:mix-blend-normal [filter:grayscale(1)_invert(1)_brightness(1.4)]" : "[filter:brightness(0)_invert(1)]"
                          }`}
                        />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* results */}
        <section className="px-5 pb-28 pt-20 sm:px-8 md:pb-36">
          <div className="mx-auto max-w-5xl">
            <Reveal>
              <div className="grid grid-cols-2 gap-y-10 md:grid-cols-4">
                {results.map((r, i) => (
                  <div key={r.who} className={`px-5 text-center ${i > 0 ? "md:border-l md:border-white/[0.07]" : ""} ${i % 2 === 1 ? "border-l border-white/[0.07] md:border-l" : ""}`}>
                    <p className="whitespace-nowrap text-2xl font-medium tracking-[-0.03em] text-white sm:text-3xl">{r.big}</p>
                    <p className="mt-1.5 text-sm text-white/45">{r.label}</p>
                    <p className="mt-3 text-[10px] uppercase tracking-[0.2em] text-teal-300/70">{r.who}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* what it does: bento */}
        <section className="px-5 pb-28 sm:px-8 md:pb-36">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <Eyebrow>What it does</Eyebrow>
              <h2 className="mt-5 max-w-5xl text-4xl font-medium leading-[1.05] tracking-[-0.035em] text-white sm:text-6xl">
                Your best receptionist, <span className="font-serif font-normal italic text-white/60">on every line.</span>
              </h2>
            </Reveal>

            <div className="mt-16 grid gap-4 md:grid-cols-6">
              {/* answer */}
              <Reveal className="md:col-span-3">
                <div className="h-full rounded-3xl border border-white/[0.07] bg-gradient-to-b from-white/[0.04] to-transparent p-7">
                  <div className="flex h-40 items-center justify-center">
                    <div className="relative grid h-20 w-20 place-items-center rounded-full bg-teal-300 text-[#07090c]">
                      <span className="absolute inset-0 rounded-full animate-[pulse-dot_1.8s_ease-out_infinite]" />
                      <svg viewBox="0 0 24 24" className="h-8 w-8 animate-[ring_2.4s_ease-in-out_infinite]" fill="currentColor" aria-hidden>
                        <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1L6.6 10.8Z" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="mt-6 text-xl font-medium text-white">Picks up on the first ring</h3>
                  <p className="mt-2 leading-relaxed text-white/50">Nights, weekends, holidays, and the lunch rush. No hold music, no voicemail, no &ldquo;press 1.&rdquo;</p>
                </div>
              </Reveal>

              {/* book */}
              <Reveal delay={0.06} className="md:col-span-3">
                <div className="h-full rounded-3xl border border-white/[0.07] bg-gradient-to-b from-white/[0.04] to-transparent p-7">
                  <div className="flex h-40 items-center justify-center">
                    <div className="w-full max-w-xs rounded-2xl border border-white/10 bg-[#0c1014] p-4 text-xs">
                      <div className="mb-3 flex justify-between text-white/40"><span>This week</span><span>Calendar</span></div>
                      <div className="grid grid-cols-5 gap-1.5 text-center text-white/35">
                        {["Mon", "Tue", "Wed", "Thu", "Fri"].map((d) => <span key={d}>{d}</span>)}
                        {Array.from({ length: 10 }).map((_, i) => (
                          <span key={i} className={`h-6 rounded-md ${i === 8 ? "bg-teal-300 text-[#07090c]" : i % 3 === 0 ? "bg-white/10" : "bg-white/[0.04]"} grid place-items-center`}>
                            {i === 8 ? "9:00" : ""}
                          </span>
                        ))}
                      </div>
                      <p className="mt-3 flex items-center gap-2 text-teal-200"><span className="h-1.5 w-1.5 rounded-full bg-teal-300" /> Demo booked · Thu 9:00 AM</p>
                    </div>
                  </div>
                  <h3 className="mt-6 text-xl font-medium text-white">Books it while they&apos;re on the line</h3>
                  <p className="mt-2 leading-relaxed text-white/50">Checks real availability and writes straight into your calendar or booking system.</p>
                </div>
              </Reveal>

              {/* sms */}
              <Reveal className="md:col-span-2">
                <div className="h-full rounded-3xl border border-white/[0.07] bg-gradient-to-b from-white/[0.04] to-transparent p-7">
                  <div className="flex h-32 flex-col justify-center gap-2">
                    <p className="ml-auto max-w-[85%] rounded-2xl rounded-br-md bg-teal-300 px-3.5 py-2 text-sm text-[#07090c]">You&apos;re booked for Thursday at 9am. Reply C to change.</p>
                    <p className="max-w-[60%] rounded-2xl rounded-bl-md bg-white/10 px-3.5 py-2 text-sm text-white/80">Perfect, thanks!</p>
                  </div>
                  <h3 className="mt-6 text-xl font-medium text-white">Follows up by text</h3>
                  <p className="mt-2 leading-relaxed text-white/50">Confirmations and details, sent the moment the call ends.</p>
                </div>
              </Reveal>

              {/* languages */}
              <Reveal delay={0.06} className="md:col-span-2">
                <div className="h-full rounded-3xl border border-white/[0.07] bg-gradient-to-b from-white/[0.04] to-transparent p-7">
                  <div className="flex h-32 flex-wrap content-center gap-2">
                    {["Hello", "Hola", "Olá", "Bonjour", "Ciao"].map((w, i) => (
                      <span key={w} className={`rounded-full border px-3.5 py-1.5 text-sm ${i === 2 ? "border-teal-300/50 bg-teal-300/10 text-teal-200" : "border-white/10 text-white/60"}`}>{w}</span>
                    ))}
                  </div>
                  <h3 className="mt-6 text-xl font-medium text-white">Speaks their language</h3>
                  <p className="mt-2 leading-relaxed text-white/50">English, Spanish, Portuguese, and more, switching mid call if the caller does.</p>
                </div>
              </Reveal>

              {/* systems */}
              <Reveal delay={0.12} className="md:col-span-2">
                <div className="h-full rounded-3xl border border-white/[0.07] bg-gradient-to-b from-white/[0.04] to-transparent p-7">
                  <div className="flex h-32 items-center justify-center">
                    <div className="grid grid-cols-3 gap-2 text-[11px] text-white/60">
                      {["Calendar", "CRM", "POS", "SMS", "Email", "Your API"].map((s) => (
                        <span key={s} className="rounded-lg border border-white/10 bg-white/[0.03] px-2.5 py-2 text-center">{s}</span>
                      ))}
                    </div>
                  </div>
                  <h3 className="mt-6 text-xl font-medium text-white"><a href="#integrations" className="hover:text-teal-200">Plugs into your systems →</a></h3>
                  <p className="mt-2 leading-relaxed text-white/50">Reads and writes the tools you already run, then hands off to a human when it should.</p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <Integrations />

        {/* how */}
        <section id="how" className="scroll-mt-24 border-y border-white/[0.06] bg-white/[0.015] px-5 py-28 sm:px-8 md:py-36">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <Eyebrow>How it works</Eyebrow>
              <h2 className="mt-5 max-w-3xl text-4xl font-medium leading-[1.05] tracking-[-0.035em] text-white sm:text-6xl">
                Built around <span className="font-serif font-normal italic text-white/60">your business.</span>
              </h2>
            </Reveal>
            <div className="relative mt-16 grid gap-10 md:grid-cols-3 md:gap-8">
              <div className="hairline absolute left-0 right-0 top-[11px] hidden h-px md:block" />
              {steps.map((s, i) => (
                <Reveal key={s.when} delay={i * 0.1}>
                  <div className="relative">
                    <span className="relative z-10 grid h-6 w-6 place-items-center rounded-full border border-teal-300/50 bg-[#07090c]">
                      <span className="h-2 w-2 rounded-full bg-teal-300" />
                    </span>
                    <p className="mt-6 text-xs uppercase tracking-[0.2em] text-teal-300/80">{s.when}</p>
                    <h3 className="mt-2 text-2xl font-medium tracking-tight text-white">{s.title}</h3>
                    <p className="mt-3 leading-relaxed text-white/50">{s.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* about */}
        <section id="about" className="scroll-mt-24 px-5 py-28 sm:px-8 md:py-36">
          <div className="mx-auto grid max-w-6xl items-center gap-14 md:grid-cols-[0.9fr_1.1fr] md:gap-20">
            <Reveal>
              <div className="relative">
                <div className="absolute -inset-4 -z-10 rounded-[36px] bg-teal-400/10 blur-2xl" />
                <img
                  src="/founder.jpg"
                  alt="Mark Tomlet"
                  className="aspect-[4/5] w-full rounded-[28px] object-cover [filter:grayscale(0.35)_contrast(1.05)]"
                />
                <span className="absolute left-4 top-4 rounded-full border border-white/10 bg-[#07090c]/60 px-3 py-1 text-xs text-white/70 backdrop-blur-md">
                  Ukraine, 2023
                </span>
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-2xl border border-white/10 bg-[#07090c]/70 px-4 py-3 backdrop-blur-md">
                  <div>
                    <p className="text-sm font-medium text-white">Mark Tomlet</p>
                    <p className="text-xs text-white/50">Founder, Oceanside AI</p>
                  </div>
                  <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="rounded-full bg-white/10 px-3 py-1.5 text-xs transition hover:bg-white/20">LinkedIn</a>
                </div>
              </div>
            </Reveal>
            <div>
              <Reveal>
                <Eyebrow>About</Eyebrow>
                <blockquote className="mt-6 font-serif text-4xl leading-[1.1] text-white sm:text-5xl">
                  &ldquo;AI is coming like a tsunami. You either ride it, or get wiped out by it.&rdquo;
                </blockquote>
              </Reveal>
              <Reveal delay={0.08}>
                <div className="mt-8 space-y-5 text-lg leading-relaxed text-white/55">
                  <p>
                    That&apos;s Mark in <span className="text-white">Ukraine in 2023</span>, covering the war. He grew
                    up in <span className="text-white">Panama</span>, starred in a movie in Armenia as a teen, and
                    worked as a helicopter cameraman in his late teens. Journalism took him to the front lines in
                    Ukraine, Armenia, Azerbaijan, and Venezuela, and to <Countries /> so far.
                  </p>
                  <p>
                    Ukraine is also where he started messing with AI. A news script took four hours to write, so he
                    built a tool that did it in twenty minutes, and <span className="text-white">CBN News</span>{" "}
                    asked him to build more.
                  </p>
                  <p>
                    He started Oceanside out of his <span className="text-white">dorm room</span> at Regent
                    University while studying cybersecurity. He finished the degree in three years, and by then a
                    cybersecurity job didn&apos;t make sense anymore. So he spent what would have been senior year
                    living in <span className="text-white">a new country every month</span> with his wife, running
                    the company from wherever they landed.
                  </                  <p>
                    What started as a news tool in Ukraine turned into the work. Covering a war, you learn fast how
                    much rides on someone picking up the phone. A business is no different:{" "}
                    <span className="text-white">a missed call is a customer gone.</span> So the team builds voice
                    agents that answer every call, follow up with new leads in seconds, cover after hours, and bring
                    old leads back, in English, Spanish, and Portuguese.
                  </p>
                  <p>
                    Today that means clinics of all kinds (hormone, DPC, substance abuse), barbershops, roofers,
                    repair shops, oil and gas, and home insurance. Mark shares everything he learns on YouTube and
                    with 500+ builders in AI Voice Pioneers.
                  </p>/p>
                </div>
              </Reveal>
              <Reveal delay={0.14}>
                <div className="mt-10 grid grid-cols-2 gap-4">
                  <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer" className="group rounded-2xl border border-white/[0.08] p-5 transition hover:border-white/20 hover:bg-white/[0.03]">
                    <svg viewBox="0 0 28 20" className="h-6 w-auto" aria-label="YouTube"><rect width="28" height="20" rx="5.5" fill="#FF0033" /><path d="M11.2 5.8v8.4l7.2-4.2-7.2-4.2z" fill="#fff" /></svg>
                    <p className="mt-4 text-2xl font-medium tracking-tight text-white">400,000+</p>
                    <p className="mt-1 text-sm text-white/50">views teaching voice AI on YouTube</p>
                    <p className="mt-4 flex items-center gap-1.5 text-xs text-teal-300/90">Tech Tomlet <Arrow className="h-3 w-3" /></p>
                  </a>
                  <a href={SKOOL_URL} target="_blank" rel="noopener noreferrer" className="group rounded-2xl border border-white/[0.08] p-5 transition hover:border-white/20 hover:bg-white/[0.03]">
                    <svg viewBox="0 0 88 28" className="h-6 w-auto" aria-label="Skool">
                      <text x="0" y="22" fontFamily="Arial Rounded MT Bold, Arial, sans-serif" fontWeight="800" fontSize="26" letterSpacing="-0.5">
                        <tspan fill="#2E66F6">s</tspan><tspan fill="#F0412E">k</tspan><tspan fill="#F7B32B">o</tspan><tspan fill="#2CA9E1">o</tspan><tspan fill="#F0412E">l</tspan>
                      </text>
                    </svg>
                    <p className="mt-4 text-2xl font-medium tracking-tight text-white">AI Voice Pioneers</p>
                    <p className="mt-1 text-sm text-white/50">500+ builders learning to ship voice agents</p>
                    <p className="mt-4 flex items-center gap-1.5 text-xs text-teal-300/90">Join on Skool <Arrow className="h-3 w-3" /></p>
                  </a>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* writing */}
        <section id="writing" className="scroll-mt-24 border-t border-white/[0.06] px-5 py-28 sm:px-8 md:py-36">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
                <div>
                  <Eyebrow>Writing</Eyebrow>
                  <h2 className="mt-5 max-w-3xl text-4xl font-medium leading-[1.05] tracking-[-0.035em] text-white sm:text-6xl">
                    Notes from <span className="font-serif font-normal italic text-white/60">the field.</span>
                  </h2>
                  <p className="mt-5 max-w-xl leading-relaxed text-white/50">
                    What I&apos;ve learned building voice agents for real businesses, each one paired with the video.
                  </p>
                </div>
                <a href="/articles" className="inline-flex shrink-0 items-center gap-2 text-sm text-white/70 transition hover:text-white">
                  All articles <Arrow className="h-3.5 w-3.5" />
                </a>
              </div>
            </Reveal>
            <div className="mt-14 grid gap-5">
              {articles[0] && (
                <Reveal>
                  <ArticleCard a={articles[0]} large />
                </Reveal>
              )}
              <div className="grid gap-5 md:grid-cols-3">
                {articles.slice(1, 4).map((a, i) => (
                  <Reveal key={a.slug} delay={i * 0.07}>
                    <ArticleCard a={a} />
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* faq */}
        <section id="faq" className="scroll-mt-24 px-5 pb-28 sm:px-8 md:pb-36">
          <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[0.8fr_1.2fr] md:gap-20">
            <Reveal>
              <Eyebrow>FAQ</Eyebrow>
              <h2 className="mt-5 text-4xl font-medium leading-[1.05] tracking-[-0.035em] text-white sm:text-5xl">
                Fair <span className="font-serif font-normal italic text-white/60">questions.</span>
              </h2>
              <p className="mt-5 max-w-sm leading-relaxed text-white/50">The things people ask on the first call. Anything else, just ask me.</p>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
                {faqs.map((f) => (
                  <details key={f.q} className="group py-6">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg text-white [&::-webkit-details-marker]:hidden">
                      {f.q}
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/15 text-white/60 transition group-open:rotate-45 group-open:border-teal-300/50 group-open:text-teal-300">
                        <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden><path d="M8 3v10M3 8h10" strokeLinecap="round" /></svg>
                      </span>
                    </summary>
                    <p className="mt-4 max-w-2xl leading-relaxed text-white/55">{f.a}</p>
                  </details>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* cta */}
        <section className="px-5 pb-10 sm:px-8">
          <Reveal>
            <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[36px] border border-white/[0.08] px-6 py-24 text-center sm:px-12 md:py-32">
              <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_80%_at_50%_120%,rgba(45,212,191,0.28),transparent)]" />
              <div className="pointer-events-none absolute inset-0 -z-10 [background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_at_bottom,black,transparent_70%)]" />
              <h2 className="mx-auto max-w-4xl text-5xl font-medium leading-[0.98] tracking-[-0.045em] text-white sm:text-7xl">
                Stop sending callers <span className="font-serif font-normal italic text-teal-200">to voicemail.</span>
              </h2>
              <p className="mx-auto mt-7 max-w-xl text-lg leading-relaxed text-white/55">
                Book a free 30 minute call. We&apos;ll look at how your calls are handled today and tell you straight
                whether an agent is worth it.
              </p>
              <Primary className="mt-10">Book a free call</Primary>
            </div>
          </Reveal>
        </section>
      </main>

      <Footer />
    </div>
  );
}
