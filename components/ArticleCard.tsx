import Link from "next/link";
import { type Article, fmtDate, thumb } from "@/lib/articles";

export default function ArticleCard({ a, large = false }: { a: Article; large?: boolean }) {
  return (
    <Link
      href={`/articles/${a.slug}`}
      className={`group flex h-full flex-col overflow-hidden rounded-3xl border border-white/[0.07] bg-white/[0.02] transition duration-500 hover:border-white/15 hover:bg-white/[0.04] ${
        large ? "md:flex-row" : ""
      }`}
    >
      <div className={`relative overflow-hidden ${large ? "md:w-[58%]" : ""}`}>
        <img
          src={thumb(a.videoId)}
          alt=""
          className="aspect-video h-full w-full object-cover opacity-85 transition duration-700 group-hover:scale-[1.03] group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07090c]/60 to-transparent" />
      </div>
      <div className={`flex flex-1 flex-col p-6 sm:p-7 ${large ? "md:justify-center md:p-10" : ""}`}>
        <p className="flex items-center gap-2.5 text-[11px] uppercase tracking-[0.18em] text-white/40">
          <span className="text-teal-300/90">{a.category}</span>
          <span className="h-px w-3 bg-white/20" />
          {a.readMins} min read
        </p>
        <h3
          className={`mt-3 font-medium leading-snug tracking-[-0.02em] text-white ${
            large ? "text-3xl sm:text-4xl" : "text-xl"
          }`}
        >
          {a.title}
        </h3>
        <p className={`mt-3 leading-relaxed text-white/50 ${large ? "text-lg" : "text-[15px]"}`}>{a.dek}</p>
        <p className="mt-auto flex items-center justify-between pt-6 text-xs text-white/35">
          {fmtDate(a.date)}
          <span className="text-white/60 transition group-hover:translate-x-0.5 group-hover:text-teal-200">Read →</span>
        </p>
      </div>
    </Link>
  );
}
