import data from "./articles.json";

export type Block = { type: "h2" | "p" | "quote"; text: string };
export type Article = {
  slug: string;
  title: string;
  dek: string;
  videoId: string;
  videoTitle: string;
  date: string;
  readMins: number;
  category: string;
  body: Block[];
};

export const articles = (data as Article[]).slice().sort((a, b) => b.date.localeCompare(a.date));

export const getArticle = (slug: string) => articles.find((a) => a.slug === slug);

export const thumb = (id: string) => `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;

export const fmtDate = (d: string) =>
  new Date(`${d}T12:00:00Z`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
