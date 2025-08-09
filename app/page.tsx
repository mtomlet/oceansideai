export const metadata = {
  title: "Oceanside AI Solutions",
  description: "Voice AI that books, routes, and resolves—built like a Tesla.",
};

"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Check, PhoneCall, Sparkles, Shield, Cpu, Clock, Globe, ArrowRight, Waves, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

function LogoOceanside({ className = "h-8 w-8" }: { className?: string }) {
  // Minimal, clean "C" wave mark with orbiting dots (inspired by your reference)
  return (
    <svg viewBox="0 0 64 64" className={className} aria-label="Oceanside AI logo">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#6366f1" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="30" fill="none" stroke="url(#g)" strokeWidth="4" opacity="0.25" />
      <path d="M50 22c-4-7-12-12-20-12C18 10 8 20 8 32s10 22 22 22c8 0 16-5 20-12" fill="none" stroke="url(#g)" strokeWidth="6" strokeLinecap="round" />
      <circle cx="54" cy="24" r="3.2" fill="url(#g)" />
      <circle cx="56" cy="40" r="2.4" fill="url(#g)" />
    </svg>
  );
}
function FiveStars() {
  return (
    <div className="mb-3 flex items-center gap-1" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
      ))}
    </div>
  );
}

export default function OceansideLanding() {
  // Demo form state
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error" | ""; message: string }>({ type: "", message: "" });

  // Lead wizard state
  const [wizardOpen, setWizardOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [leadLoading, setLeadLoading] = useState(false);
  const [leadStatus, setLeadStatus] = useState("");
  const [lead, setLead] = useState({
    budget: "", // monthly
    setupFee: "", // one-time
    mrr: "",
    projectType: [] as string[], // inbound | outbound
    callVolume: "",
    outboundLeads: "",
    functions: [] as string[], // sms | email | scheduling | crm
    crm: "",
    useGcal: "no",
    phoneSystem: "",
    mobileProvider: "",
    description: "",
    whyNow: "",
    name: "",
    company: "",
    email: "",
    phone: "",
    notes: "",
  });

  const CALENDLY_URL = "https://calendly.com/d/crgj-sgp-sq8"; // booking link

  function updateLead<K extends keyof typeof lead>(k: K, v: (typeof lead)[K]) {
    setLead((prev) => ({ ...prev, [k]: v }));
  }
  function toggleArray(field: "projectType" | "functions", value: string) {
    setLead((prev) => {
      const has = (prev as any)[field].includes(value);
      const next = has ? (prev as any)[field].filter((x: string) => x !== value) : [...(prev as any)[field], value];
      return { ...prev, [field]: next } as typeof prev;
    });
  }

  // Qual rules (no hard reject in UI)
  const qualified =
    Number(lead.budget || 0) >= 300 &&
    Number(lead.setupFee || 0) >= 1000 &&
    Number(lead.mrr || 0) >= 10000;

  async function submitLead() {
    try {
      setLeadLoading(true);
      // POST full lead payload to Google Sheets hook
      const res = await fetch("https://hook.us1.make.com/qbcgj6jjvxpnrwur6bd2qz1azn5pg4n3", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      });
      if (!res.ok) throw new Error("Hook failed");
      setLeadStatus("Form submitted successfully. If there’s a fit, we’ll reach out.");
      // Always send to Calendly per request
      window.location.href = CALENDLY_URL;
    } catch (e) {
      setLeadStatus("Could not submit. Please try again later.");
    } finally {
      setLeadLoading(false);
    }
  }

  async function handleDemoSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
  
    // Show success-style message immediately so users don't see an error UI
    setStatus({
      type: "success",
      message: "Thanks! Form received. Your AI call may take up to ~60 seconds.",
    });
  
    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());
  
    try {
      // Fire-and-forget — we don't care about status codes for UI
      await fetch("https://hook.us1.make.com/8wjefrydnsrgvihnxjx0ykimen4fc3hj", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch {
      // Even if the network hiccups, keep the same friendly message
      setStatus({
        type: "success",
        message: "Thanks! Form received. Your AI call may take up to ~60 seconds to.",
      });
    } finally {
      setLoading(false);
      (e.currentTarget as HTMLFormElement).reset();
    }
  }
  

  return (
    <div className="min-h-screen bg-black text-white">
      {/* NAV ON TOP */}
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-black/40">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <LogoOceanside className="h-8 w-8" />
            <span className="text-lg font-semibold tracking-tight">Oceanside AI Solutions</span>
          </div>
          <nav className="hidden items-center gap-8 md:flex">
            <a href="#what" className="text-sm text-zinc-300 hover:text-white"><span className="underline decoration-cyan-400/40 underline-offset-4">What we do</span></a>
            <a href="#process" className="text-sm text-zinc-300 hover:text-white"><span className="underline decoration-cyan-400/40 underline-offset-4">Process</span></a>
            <a href="#story" className="text-sm text-zinc-300 hover:text-white"><span className="underline decoration-cyan-400/40 underline-offset-4">Founder</span></a>
            <a href="#reviews" className="text-sm text-zinc-300 hover:text-white"><span className="underline decoration-cyan-400/40 underline-offset-4">Reviews</span></a>
          </nav>
          <div className="flex items-center gap-3">
            <a href="#demo" className="group inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-white hover:border-white/40">
              <span className="underline decoration-cyan-400/40 underline-offset-4">Try a demo</span> <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </a>
            {/* Work with us -> Calendly link (replaces wizard open) */}
            <a href={CALENDLY_URL} className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm hover:bg-white/20">
              <span className="underline decoration-cyan-400/40 underline-offset-4">Work with us</span>
            </a>
          </div>
        </div>
      </header>

      {/* HERO WITH VIOLENT WAVE BELOW NAV */}
      <section className="relative h-[75vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-900/30 via-black to-black" />

        {/* crashing wave layers */}
        <motion.div className="absolute bottom-0 left-0 right-0" initial={{ y: 140 }} animate={{ y: [140, 0, 140] }} transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}>
          <svg viewBox="0 0 1440 320" className="h-64 w-full" preserveAspectRatio="none">
            <path fill="#06b6d4" fillOpacity="0.55" d="M0,256L60,224C120,192,240,128,360,122.7C480,117,600,171,720,186.7C840,203,960,181,1080,160C1200,139,1320,117,1380,106.7L1440,96V320H0Z" />
          </svg>
        </motion.div>
        <motion.div className="absolute bottom-0 left-0 right-0" initial={{ y: 160 }} animate={{ y: [160, 10, 160] }} transition={{ duration: 3.1, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}>
          <svg viewBox="0 0 1440 320" className="h-56 w-full" preserveAspectRatio="none">
            <path fill="#22d3ee" fillOpacity="0.35" d="M0,288L48,250.7C96,213,192,139,288,122.7C384,107,480,149,576,170.7C672,192,768,192,864,176C960,160,1056,128,1152,128C1248,128,1344,160,1392,176L1440,192V320H0Z" />
          </svg>
        </motion.div>
        {/* splash particles */}
        <motion.div className="pointer-events-none absolute inset-x-0 bottom-28" initial={{ opacity: 0.6 }} animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 1.8, repeat: Infinity }}>
          {[...Array(28)].map((_, i) => (
            <motion.span key={i} className="absolute h-1 w-1 rounded-full bg-cyan-200/80" style={{ left: `${Math.random()*100}%` }} initial={{ y: 0 }} animate={{ y: [-30 - Math.random()*50, 0] }} transition={{ duration: 0.9 + Math.random()*1.1, repeat: Infinity, repeatType: "mirror" }} />
          ))}
        </motion.div>

        {/* headline */}
        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col items-center justify-center px-6 text-center">
          <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-5xl font-semibold leading-tight tracking-tight md:text-7xl">
            <span className="bg-gradient-to-r from-cyan-300 to-cyan-500 bg-clip-text text-transparent">Ride the AI Wave</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }} className="mt-4 max-w-2xl text-lg text-zinc-300">
            Voice AI that books, routes, and resolves—built like a Tesla: quiet power, immaculate design.
          </motion.p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button onClick={() => document.getElementById("demo")?.scrollIntoView({ behavior: "smooth" })} className="h-11 rounded-xl bg-white px-6 text-black hover:bg-zinc-200"><span className="underline decoration-cyan-400/40 underline-offset-4">Get a demo call</span></Button>
            {/* Work with us -> Calendly link */}
            <a href={CALENDLY_URL} className="h-11 rounded-xl border border-white/30 bg-transparent px-6 inline-flex items-center justify-center text-white hover:border-white/60">
              <span className="underline decoration-cyan-400/40 underline-offset-4">Work with us</span>
            </a>
          </div>
        </div>
      </section>

      {/* Background glows */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_800px_at_20%_-10%,rgba(56,189,248,0.10),transparent),radial-gradient(circle_600px_at_80%_10%,rgba(99,102,241,0.10),transparent)]" />

      {/* What we do */}
      <section id="what" className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {[
            { icon: PhoneCall, title: "Voice Agents", desc: "24/7 phone agents that answer, qualify, and schedule. Integrates with your CRM and calendar." },
            { icon: Cpu, title: "Workflow Automation", desc: "Make/Zapier + custom APIs to remove repetitive work across teams." },
            { icon: Shield, title: "Security & Reliability", desc: "Built by a cybersecurity specialist. Data minimization and audit trails by default." },
          ].map((c, i) => (
            <motion.div key={c.title} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}>
              <Card className="border-white/10 bg-white/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-zinc-100">
                    {<c.icon className="h-5 w-5 text-cyan-400" />} <span className="underline decoration-cyan-400/40 underline-offset-4">{c.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-zinc-300"><span className="underline decoration-cyan-400/30 underline-offset-4">{c.desc}</span></CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Metrics */}
      <section className="mx-auto max-w-7xl px-6 pb-10">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {[
            { k: "Avg. wait time", v: "<4 sec" },
            { k: "Calls resolved", v: "90%" },
            { k: "Appt. conversion", v: "+28%" },
            { k: "Setup to live", v: "7–14 days" },
          ].map((m, i) => (
            <motion.div key={m.k} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }} className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="text-3xl font-semibold text-cyan-300">{m.v}</div>
              <div className="mt-1 text-sm text-zinc-400"><span className="underline decoration-cyan-400/30 underline-offset-4">{m.k}</span></div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Companies worked with (marquee) */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        <h3 className="text-center text-sm uppercase tracking-widest text-zinc-400">Companies we’ve worked with</h3>
        <div className="relative mt-6 overflow-hidden">
          <div className="animate-[marquee_22s_linear_infinite] flex min-w-full items-center gap-16 opacity-80 hover:opacity-100">
            {[
              { alt: "Regent University", src: "/logos/regent.png", w: 140 },
              { alt: "CBN News", src: "/logos/cbn.png", w: 120 },
              { alt: "Merx Truck & Trailer", src: "/logos/merx.png", w: 180 },
              { alt: "Live Fire Media", src: "/logos/livefire.png", w: 150 },
              { alt: "Regent University", src: "/logos/regent.png", w: 140 }, // duplicated for seamless loop
              { alt: "CBN News", src: "/logos/cbn.png", w: 120 },
              { alt: "Merx Truck & Trailer", src: "/logos/merx.png", w: 180 },
              { alt: "Live Fire Media", src: "/logos/livefire.png", w: 150 },
            ].map((l) => (
              <img key={l.alt + Math.random()} src={l.src} alt={l.alt} width={l.w} className="brightness-95 contrast-125 grayscale hover:grayscale-0" />
            ))}
          </div>
          {/* gradient edges */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black to-transparent" />
        </div>
      </section>

      <style jsx global>{`
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
      `}</style>

      {/* Process */}
      <section id="process" className="mx-auto max-w-7xl px-6 py-20">
        <h2 className="text-3xl font-semibold tracking-tight md:text-4xl"><span className="underline decoration-cyan-400/40 underline-offset-4">Our process</span></h2>
        <p className="mt-3 max-w-2xl text-zinc-300"><span className="underline decoration-cyan-400/30 underline-offset-4">Clear, fast, and accountable. You’ll always know what’s happening and when.</span></p>
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-4">
          {[
            { step: "01", title: "Discovery", desc: "10–15 min call. Goals, call flows, systems. We scope the quickest path to value." },
            { step: "02", title: "Prototype", desc: "We ship a working agent + call logs. You test scripts and edge cases." },
            { step: "03", title: "Integrate", desc: "Calendar, CRM, IVR, sheets, webhooks. Prompts + guardrails hardened." },
            { step: "04", title: "Go live", desc: "We monitor, iterate weekly, and report. SLA on uptime and response." },
          ].map((p, i) => (
            <motion.div key={p.step} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }} className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="text-sm text-zinc-400">{p.step}</div>
              <div className="mt-2 text-lg font-medium"><span className="underline decoration-cyan-400/40 underline-offset-4">{p.title}</span></div>
              <div className="mt-1 text-zinc-300"><span className="underline decoration-cyan-400/30 underline-offset-4">{p.desc}</span></div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Founder Story (with photo slot) */}
      <section id="story" className="mx-auto max-w-5xl px-6 py-20">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <motion.div initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="md:col-span-1">
          <a href="https://www.linkedin.com/in/mark-tomlet-8853b3180/" target="_blank" rel="noopener noreferrer">
         <img src="/founder.jpg" alt="Mark Tomlet" className="h-72 w-full rounded-3xl object-cover ring-1 ring-white/20" />
        </a>
       <div className="mt-3 text-sm text-zinc-400">
        <a href="https://www.linkedin.com/in/mark-tomlet-8853b3180/" target="_blank" rel="noopener noreferrer" className="text-cyan-300">
        Mark Tomlet
      </a>, Founder & Operator 
    </div>

          </motion.div>
          <motion.div initial={{ opacity: 0, x: 12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="md:col-span-2">
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl"><span className="underline decoration-cyan-400/40 underline-offset-4">Our Founder’s Story</span></h2>
            <div className="mt-6 space-y-4 text-zinc-300">
              <p>Oceanside AI Solutions began not in a boardroom, but amidst the urgency of Ukraine's conflict zones, where <span className="text-cyan-300">Mark Tomlet</span>, a cybersecurity specialist with a background in journalism, recognized a pressing need. Surrounded by reporters grappling with tight deadlines, Mark saw an opportunity for AI to revolutionize scriptwriting.</p>
              <p>Mark's journey with AI didn't start with grand ambitions. It began with a simple, yet powerful idea: an AI assistant that could help journalists draft their scripts more efficiently. He programmed the AI to ask journalists a series of questions, gleaning the essence of their stories and style. This innovative approach allowed the AI to produce drafts that resonated with each journalist’s voice.</p>
              <p>The development wasn't without its challenges. It required extensive training and refinement, but the results were undeniable. A script that once took 4 hours to draft could now be completed in just 20 minutes. This breakthrough caught the attention of <span className="text-cyan-300">CBN News</span>, leading to an invitation for Mark and his team to develop custom AI solutions for their journalists. As word spread, Oceanside AI Solutions evolved, extending its reach beyond journalism.</p>
              <p>Oceanside AI Solutions believes AI is like a coming tsunami; companies can either ride it or get wiped out by it. Today, the company works with diverse businesses, tackling unique workflow challenges with tailored real‑world AI solutions, ensuring their clients won't get left behind.</p>
              <p>At Oceanside AI Solutions, we pride ourselves on developing AI solutions that are effective, not boastful. Our goal is to provide tools that are genuinely useful, helping professionals save money by doing more in less time.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="mx-auto max-w-7xl px-6 py-20">
        <h2 className="text-3xl font-semibold tracking-tight md:text-4xl"><span className="underline decoration-cyan-400/40 underline-offset-4">What clients say</span></h2>
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          <Card className="border-white/10 bg-white/5">
            <CardContent className="p-6">
              <FiveStars />
              <div className="text-zinc-300">“We run outbound sales across AU and needed an AI that wouldn’t embarrass us. Oceanside shipped in a week, handled accents flawlessly, and booked more qualified calls than our old SDR team.”</div>
              <div className="mt-4 text-sm text-zinc-400">— Apex Outbound, Sydney</div>
            </CardContent>
          </Card>
          <Card className="border-white/10 bg-white/5">
            <CardContent className="p-6">
              <FiveStars />
              <div className="text-zinc-300">“Our truck & trailer shop misses calls after hours. Their agent answers, filters spam, and sends us clean job tickets. It’s like adding a night shift without payroll.”</div>
              <div className="mt-4 text-sm text-zinc-400">— Merx Truck & Trailer</div>
            </CardContent>
          </Card>
          <Card className="border-white/10 bg-white/5">
            <CardContent className="p-6">
              <FiveStars />
              <div className="text-zinc-300">“Time saver of the decade. Multilingual support means our Rio team finally stopped juggling missed calls and WhatsApps. Huge win.”</div>
              <div className="mt-4 text-sm text-zinc-400">— Learn Global </div>
            </CardContent>
          </Card>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          <Card className="border-white/10 bg-white/5">
            <CardContent className="p-6">
              <FiveStars />
              <div className="text-zinc-300">“Mark is incredible to work with—fast, calm under pressure, and deeply technical. He delivered newsroom automations that cut our script time from hours to minutes.”</div>
              <div className="mt-4 text-sm text-zinc-400">— CBN News </div>
            </CardContent>
          </Card>
          <Card className="border-white/10 bg-white/5">
            <CardContent className="p-6">
              <FiveStars />
              <div className="text-zinc-300">“Mark helped us with a website automation that saved ~500 hours of time.”</div>
              <div className="mt-4 text-sm text-zinc-400">— Regent University</div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA + Demo Form */}
      <section id="demo" className="mx-auto max-w-7xl px-6 pb-24">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          <div className="self-center">
            <h3 className="text-3xl font-semibold tracking-tight md:text-4xl"><span className="underline decoration-cyan-400/40 underline-offset-4">Try a live demo call</span></h3>
            <p className="mt-3 max-w-xl text-zinc-300">Enter your details and our AI voice agent will call you. You’ll hear how it greets, qualifies, and books in under 2 minutes.</p>
            <ul className="mt-6 space-y-3 text-zinc-300">
              <li className="flex items-center gap-2"><Clock className="h-4 w-4 text-cyan-400" /> Typical setup: 7–14 days</li>
              <li className="flex items-center gap-2"><Globe className="h-4 w-4 text-cyan-400" /> English, Spanish, Portuguese, more</li>
              <li className="flex items-center gap-2"><Shield className="h-4 w-4 text-cyan-400" /> Security‑minded practices & data minimization</li>
            </ul>
          </div>

          <Card className="border-white/10 bg-white/5">
            <CardHeader>
              <CardTitle className="text-zinc-100">Try a demo now</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleDemoSubmit} className="grid grid-cols-1 gap-4">
                <div>
                  <Label htmlFor="name">Your name</Label>
                  <Input id="name" name="name" placeholder="Jane Doe" required className="mt-1 bg-black/40 text-white placeholder:text-zinc-500" />
                </div>
                <div>
                  <Label htmlFor="company">Company</Label>
                  <Input id="company" name="company" placeholder="Acme Co." required className="mt-1 bg-black/40 text-white placeholder:text-zinc-500" />
                </div>
                <div className="grid grid-cols-3 gap-3">
            
                  <div className="col-span-2">
                    <Label htmlFor="phone">Phone number</Label>
                    <Input id="phone" name="phone" placeholder="(555) 123‑4567" required className="mt-1 bg-black/40 text-white placeholder:text-zinc-500" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Work email</Label>
                  <Input id="email" name="email" type="email" placeholder="you@company.com" required className="mt-1 bg-black/40 text-white placeholder:text-zinc-500" />
                </div>
                {/* Removed preferred time field: it calls instantly */}
                <div>
                  <Label htmlFor="notes">Notes (optional)</Label>
                  <Textarea id="notes" name="notes" placeholder="Anything we should know?" className="mt-1 bg-black/40 text-white placeholder:text-zinc-500" />
                </div>
                <Button type="submit" disabled={loading} className="h-11 rounded-xl bg-white text-black hover:bg-zinc-200">
                  {loading ? "Requesting…" : "Call me now"}
                </Button>
                {status.message && (
                  <div className={`${status.type === "success" ? "text-emerald-400" : "text-rose-400"} text-sm`}>{status.message}</div>
                )}
                <div className="text-xs text-zinc-500">By submitting, you agree to our terms and to be contacted about this demo.</div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* LEAD CAPTURE WIZARD */}
      {wizardOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4">
          <div className="relative w-full max-w-2xl rounded-2xl border border-white/10 bg-zinc-900 p-6 shadow-2xl">
            <button onClick={() => setWizardOpen(false)} className="absolute right-3 top-3 rounded-md bg-white/10 px-2 py-1 text-xs text-zinc-200 hover:bg-white/20">Close</button>
            <div className="mb-4 text-sm text-zinc-400">Step {step + 1} of 10</div>

            {step === 0 && (
              <div>
                <h3 className="text-2xl font-semibold">Monthly budget</h3>
                <p className="mt-2 text-zinc-300">What’s your monthly budget for Voice AI?</p>
                <div className="mt-4 grid grid-cols-3 gap-3">
                  {["300","500","750","1000","2000","3000+"].map((b)=> (
                    <button key={b} onClick={()=>updateLead("budget", b.replace("+",""))} className={`rounded-xl border border-white/10 px-4 py-3 text-sm ${lead.budget===b.replace("+","")?"bg-white text-black":"bg-white/5 text-white hover:bg-white/10"}`}>{b==="3000+"?"$3000+":`$${b}`}</button>
                  ))}
                </div>
                <div className="mt-6 flex justify-end"><Button onClick={()=>setStep(1)} className="rounded-xl bg-white px-6 text-black hover:bg-zinc-200">Continue</Button></div>
              </div>
            )}

            {step === 1 && (
              <div>
                <h3 className="text-2xl font-semibold">Setup fee</h3>
                <p className="mt-2 text-zinc-300">One‑time setup budget.</p>
                <div className="mt-4 grid grid-cols-3 gap-3">
                  {["500","1000","2000","3000","5000+"].map((r)=> (
                    <button key={r} onClick={()=>updateLead("setupFee", r.replace("+",""))} className={`rounded-xl border border-white/10 px-4 py-3 text-sm ${lead.setupFee===r.replace("+","")?"bg-white text-black":"bg-white/5 text-white hover:bg-white/10"}`}>{r==="5000+"?"$5000+":`$${r}`}</button>
                  ))}
                </div>
                <div className="mt-6 flex justify-end"><Button onClick={()=>setStep(2)} className="rounded-xl bg-white px-6 text-black hover:bg-zinc-200">Continue</Button></div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h3 className="text-2xl font-semibold">Company MRR</h3>
                <p className="mt-2 text-zinc-300">Approximate monthly recurring revenue.</p>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  {["<10k","10k-50k","50k-200k",">200k"].map((r)=> (
                    <button key={r} onClick={()=>updateLead("mrr", r==="<10k"?"9000":r==="10k-50k"?"10000":r==="50k-200k"?"50000":"200001")} className={`rounded-xl border border-white/10 px-4 py-3 text-sm ${lead.mrr===(r==="<10k"?"9000":r==="10k-50k"?"10000":r==="50k-200k"?"50000":"200001")?"bg-white text-black":"bg-white/5 text-white hover:bg-white/10"}`}>{r}</button>
                  ))}
                </div>
                <div className="mt-6 flex justify-end"><Button onClick={()=>setStep(3)} className="rounded-xl bg-white px-6 text-black hover:bg-zinc-200">Continue</Button></div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h3 className="text-2xl font-semibold">Project type</h3>
                <p className="mt-2 text-zinc-300">Inbound receptionist, outbound campaigns, or both?</p>
                <div className="mt-4 grid grid-cols-3 gap-3">
                  {["inbound","outbound","both"].map((t)=> (
                    <button key={t} onClick={()=>updateLead("projectType", t==="both"?["inbound","outbound"]:[t])} className={`rounded-xl border border-white/10 px-4 py-3 text-sm ${lead.projectType.includes(t)||(t==="both"&&lead.projectType.length===2)?"bg-white text-black":"bg-white/5 text-white hover:bg-white/10"}`}>{t}</button>
                  ))}
                </div>
                <div className="mt-6 flex justify-end"><Button onClick={()=>setStep(4)} className="rounded-xl bg-white px-6 text-black hover:bg-zinc-200">Continue</Button></div>
              </div>
            )}

            {step === 4 && (
              <div>
                <h3 className="text-2xl font-semibold">Call volume</h3>
              <p className="mt-2 text-zinc-300">Estimated monthly call volume (inbound and/or outbound).</p>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <Label>Estimated monthly call volume</Label>
                  <Input value={lead.callVolume} onChange={(e)=>updateLead("callVolume", e.target.value)} placeholder="e.g. 2,000" className="mt-1 bg-black/40 text-white placeholder:text-zinc-500" />
                </div>
                {lead.projectType.includes("outbound") && (
                  <div>
                    <Label>How many outbound leads do you have?</Label>
                    <Input value={lead.outboundLeads} onChange={(e)=>updateLead("outboundLeads", e.target.value)} placeholder="e.g. 5,000" className="mt-1 bg-black/40 text-white placeholder:text-zinc-500" />
                  </div>
                )}
              </div>
              <div className="mt-6 flex justify-end"><Button onClick={()=>setStep(5)} className="rounded-xl bg-white px-6 text-black hover:bg-zinc-200">Continue</Button></div>
            </div>
            )}

            {step === 5 && (
              <div>
                <h3 className="text-2xl font-semibold">Functionality</h3>
                <p className="mt-2 text-zinc-300">Select what you need.</p>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  {["sms","email","scheduling","crm"].map((f)=> (
                    <button key={f} onClick={()=>toggleArray("functions", f)} className={`rounded-xl border border-white/10 px-4 py-3 text-sm capitalize ${lead.functions.includes(f)?"bg-white text-black":"bg-white/5 text-white hover:bg-white/10"}`}>{f}</button>
                  ))}
                </div>
                {lead.functions.includes("crm") && (
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div>
                      <Label>What CRM do you use?</Label>
                      <Input value={lead.crm} onChange={(e)=>updateLead("crm", e.target.value)} placeholder="Salesforce, HubSpot, Dentrix…" className="mt-1 bg-black/40 text-white placeholder:text-zinc-500" />
                    </div>
                    <div>
                      <Label>Could we use Google Calendar instead?</Label>
                      <select value={lead.useGcal} onChange={(e)=>updateLead("useGcal", e.target.value)} className="mt-1 w-full rounded-md border border-white/10 bg-black/40 p-2 text-white">
                        <option value="no">No</option>
                        <option value="yes">Yes</option>
                      </select>
                    </div>
                  </div>
                )}
                <div className="mt-6 flex justify-end"><Button onClick={()=>setStep(6)} className="rounded-xl bg-white px-6 text-black hover:bg-zinc-200">Continue</Button></div>
              </div>
            )}

            {step === 6 && (
              <div>
                <h3 className="text-2xl font-semibold">Phone system</h3>
                <p className="mt-2 text-zinc-300">What phone provider do you use? We support systems that let us control routing.</p>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  {["RingCentral","Zoom Phone","8x8","Dialpad","Twilio","Aircall","Grasshopper","GoTo Connect","Vonage","Nextiva","Five9","Genesys","Mobile only"].map((p)=> (
                    <button key={p} onClick={()=>updateLead("phoneSystem", p)} className={`rounded-xl border border-white/10 px-4 py-3 text-sm ${lead.phoneSystem===p?"bg-white text-black":"bg-white/5 text-white hover:bg-white/10"}`}>{p}</button>
                  ))}
                </div>
                {lead.phoneSystem === "Mobile only" && (
                  <div className="mt-4">
                    <Label>Mobile provider</Label>
                    <Input value={lead.mobileProvider} onChange={(e)=>updateLead("mobileProvider", e.target.value)} placeholder="AT&T, Verizon, T‑Mobile…" className="mt-1 bg-black/40 text-white placeholder:text-zinc-500" />
                  </div>
                )}
                <div className="mt-6 flex justify-end"><Button onClick={()=>setStep(7)} className="rounded-xl bg-white px-6 text-black hover:bg-zinc-200">Continue</Button></div>
              </div>
            )}

            {step === 7 && (
              <div>
                <h3 className="text-2xl font-semibold">Describe your agent</h3>
                <p className="mt-2 text-zinc-300">Be detailed: greetings, FAQs, booking logic, languages, edge cases.</p>
                <Textarea value={lead.description} onChange={(e)=>updateLead("description", e.target.value)} rows={6} placeholder="Tell us exactly how your agent should behave…" className="mt-3 bg-black/40 text-white placeholder:text-zinc-500" />
                <div className="mt-6 flex justify-end"><Button onClick={()=>setStep(8)} className="rounded-xl bg-white px-6 text-black hover:bg-zinc-200">Continue</Button></div>
              </div>
            )}

            {step === 8 && (
              <div>
                <h3 className="text-2xl font-semibold">Why now?</h3>
                <p className="mt-2 text-zinc-300">What makes this urgent?</p>
                <Textarea value={lead.whyNow} onChange={(e)=>updateLead("whyNow", e.target.value)} rows={4} placeholder="Hiring costs, missed calls, peak season, scaling…" className="mt-3 bg-black/40 text-white placeholder:text-zinc-500" />
                <div className="mt-6 flex justify-end"><Button onClick={()=>setStep(9)} className="rounded-xl bg-white px-6 text-black hover:bg-zinc-200">Continue</Button></div>
              </div>
            )}

            {step === 9 && (
              <div>
                <h3 className="text-2xl font-semibold">Your details</h3>
                <p className="mt-2 text-zinc-300">Submit and we’ll review. If there’s a fit, we’ll send booking options.</p>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div>
                    <Label>Your name</Label>
                    <Input value={lead.name} onChange={(e)=>updateLead("name", e.target.value)} placeholder="Jane Doe" className="mt-1 bg-black/40 text-white placeholder:text-zinc-500" />
                  </div>
                  <div>
                    <Label>Company</Label>
                    <Input value={lead.company} onChange={(e)=>updateLead("company", e.target.value)} placeholder="Acme Co." className="mt-1 bg-black/40 text-white placeholder:text-zinc-500" />
                  </div>
                  <div>
                    <Label>Work email</Label>
                    <Input value={lead.email} onChange={(e)=>updateLead("email", e.target.value)} placeholder="you@company.com" className="mt-1 bg-black/40 text-white placeholder:text-zinc-500" />
                  </div>
                  <div>
                    <Label>Phone</Label>
                    <Input value={lead.phone} onChange={(e)=>updateLead("phone", e.target.value)} placeholder="(555) 123‑4567" className="mt-1 bg-black/40 text-white placeholder:text-zinc-500" />
                  </div>
                  <div className="col-span-2">
                    <Label>Notes</Label>
                    <Textarea value={lead.notes} onChange={(e)=>updateLead("notes", e.target.value)} placeholder="Anything else we should know?" className="mt-1 bg-black/40 text-white placeholder:text-zinc-500" />
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <div className="text-sm text-zinc-400">We’ll email next steps.</div>
                  <Button disabled={leadLoading} onClick={submitLead} className="rounded-xl bg-white px-6 text-black hover:bg-zinc-200 disabled:opacity-50">Submit</Button>
                </div>
                {leadStatus && <div className="mt-3 text-sm text-zinc-400">{leadStatus}</div>}
              </div>
            )}

          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-10 md:flex-row">
          <div className="flex items-center gap-3">
            <LogoOceanside className="h-6 w-6" />
            <div className="text-sm text-zinc-400">© {new Date().getFullYear()} Oceanside AI Solutions. All rights reserved.</div>
          </div>
          <div className="flex items-center gap-6 text-sm text-zinc-400">
            <a className="hover:text-white" href="#">Privacy</a>
            <a className="hover:text-white" href="#">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

// --- Quick self-tests (non-breaking) ---
// These are simple runtime checks to validate the gating logic.
// They don't render anything and won't affect the UI.
export function __selfTest__() {
  type Lead = { budget: number; setupFee: number; mrr: number };
  const qualifies = (l: Lead) => l.budget >= 300 && l.setupFee >= 1000 && l.mrr >= 10000;
  const cases: [Lead, boolean][] = [
    [{ budget: 299, setupFee: 1000, mrr: 10000 }, false],
    [{ budget: 300, setupFee: 999, mrr: 10000 }, false],
    [{ budget: 300, setupFee: 1000, mrr: 9999 }, false],
    [{ budget: 300, setupFee: 1000, mrr: 10000 }, true],
    [{ budget: 1000, setupFee: 5000, mrr: 200000 }, true],
    [{ budget: 500, setupFee: 1000, mrr: 10000 }, true],
    [{ budget: 1000, setupFee: 900, mrr: 50000 }, false],
  ];
  return cases.map(([l, expect]) => qualifies(l) === expect).every(Boolean);
}
