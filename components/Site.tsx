import Link from "next/link";

export const CALENDLY_URL = "https://calendly.com/d/crgj-sgp-sq8";
export const LINKEDIN_URL = "https://www.linkedin.com/in/mark-tomlet-8853b3180/";
export const YOUTUBE_URL = "https://www.youtube.com/@TechTomlet";
export const SKOOL_URL = "https://www.skool.com/pioneers/about";

export function Arrow({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M4 10h12M11 5l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Mark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <rect width="32" height="32" rx="9" fill="#5eead4" />
      <path d="M7 17.5c2.3 0 2.3-2.5 4.6-2.5s2.3 2.5 4.6 2.5 2.3-2.5 4.6-2.5 2.3 2.5 4.2 2.5" fill="none" stroke="#07090c" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M7 12c2.3 0 2.3-2.5 4.6-2.5S13.9 12 16.2 12s2.3-2.5 4.6-2.5S23.1 12 25 12" fill="none" stroke="#07090c" strokeOpacity=".45" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M7 23c2.3 0 2.3-2.5 4.6-2.5s2.3 2.5 4.6 2.5 2.3-2.5 4.6-2.5 2.3 2.5 4.2 2.5" fill="none" stroke="#07090c" strokeOpacity=".2" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

export function Primary({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <a
      href={CALENDLY_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex items-center gap-2.5 rounded-full bg-[#ecebe6] px-6 py-3.5 text-sm font-medium text-[#07090c] transition hover:bg-white ${className}`}
    >
      {children}
      <Arrow className="h-4 w-4 transition group-hover:translate-x-0.5" />
    </a>
  );
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.22em] text-teal-300/90">
      <span className="h-px w-6 bg-teal-300/60" />
      {children}
    </p>
  );
}

export function Nav() {
  return (
    <>
      {/* nav */}
      <header className="fixed inset-x-0 top-0 z-50">
        <div className="mx-auto mt-3 flex max-w-6xl items-center justify-between rounded-full border border-white/[0.07] bg-[#07090c]/70 py-2 pl-4 pr-2 backdrop-blur-xl sm:mx-6 lg:mx-auto">
          <a href="/" className="flex items-center gap-2.5">
            <Mark className="h-7 w-7" />
            <span className="text-[15px] font-medium tracking-tight">Oceanside AI</span>
          </a>
          <nav className="hidden items-center gap-8 text-sm text-white/55 md:flex">
            <a href="/#calls" className="transition hover:text-white">Real calls</a>
            <a href="/#how" className="transition hover:text-white">How it works</a>
            <a href="/#about" className="transition hover:text-white">About</a>
            <Link href="/articles" className="transition hover:text-white">Writing</Link>
            <a href="/#faq" className="transition hover:text-white">FAQ</a>
          </nav>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-white/[0.08] px-4 py-2 text-sm font-medium transition hover:bg-white/15"
          >
            Book a call
          </a>
        </div>
      </header>

    </>
  );
}

export function Footer() {
  return (
      <footer className="px-5 py-10 sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 text-sm text-white/40 sm:flex-row">
          <div className="flex items-center gap-2.5">
            <Mark className="h-5 w-5" />
            <span>© {new Date().getFullYear()} Oceanside AI Solutions</span>
          </div>
          <div className="flex gap-6">
            <Link href="/privacy" className="transition hover:text-white">Privacy</Link>
            <Link href="/terms" className="transition hover:text-white">Terms</Link>
            <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer" className="transition hover:text-white">YouTube</a>
            <a href={SKOOL_URL} target="_blank" rel="noopener noreferrer" className="transition hover:text-white">Community</a>
          </div>
        </div>
      </footer>
  );
}
