"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Chip from "@/components/Chip";
import { industries } from "@/lib/integrations";

export default function IndustryTabs() {
  const [i, setI] = useState(0);
  const ind = industries[i];
  return (
    <div className="mt-px bg-[#07090c] p-6 sm:p-8">
      <div className="flex flex-col justify-between gap-2 md:flex-row md:items-end">
        <div>
          <h3 className="text-lg font-medium text-white">Industry software</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-white/45">
            The system your business actually runs on, from field service to patient records. Pick your industry.
          </p>
        </div>
      </div>
      <div className="mt-6 flex flex-wrap gap-2" role="tablist">
        {industries.map((x, k) => (
          <button
            key={x.title}
            role="tab"
            aria-selected={k === i}
            onClick={() => setI(k)}
            className={`rounded-full px-3.5 py-1.5 text-[13px] transition ${
              k === i ? "bg-teal-300 text-[#07090c]" : "bg-white/[0.05] text-white/60 hover:bg-white/10 hover:text-white"
            }`}
          >
            {x.title}
          </button>
        ))}
      </div>
      <div className="mt-6 min-h-[96px] border-t border-white/[0.07] pt-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={ind.title}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            className="flex flex-wrap gap-2"
          >
            {ind.platforms.map((p) => (
              <Chip key={p.name} p={p} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
