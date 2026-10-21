// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Instrument_Serif } from "next/font/google";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

const serif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: {
    default: "Oceanside AI Solutions | AI voice agents that answer every call",
    template: "%s | Oceanside AI",
  },
  description:
    "Custom AI voice agents that answer, book, and follow up on every call. Designed, built, and maintained by the Oceanside AI team.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} ${serif.variable}`}>
      <body className="bg-[#07090c] text-[#ecebe6] antialiased">{children}</body>
    </html>
  );
}
