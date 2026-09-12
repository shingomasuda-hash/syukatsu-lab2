export const SITE = {
  name: "関西就活ラボ",
  nameEn: "KANSAI SHUKATSU LAB",
  description:
    "企業の名前より、そこで働く人の話を。関西の就活生へ届ける、仕事との出会い。",
  url: "https://kansai-shukatsu-lab.vercel.app",
  line: "https://line.me/R/ti/p/@381flauo",
  instagram: "https://www.instagram.com/kansai_shukatsu_lab",
} as const;

export type NavItem = {
  href: string;
  label: string;
  /** 英字ラベル。ドロワーと Footer で使う。 */
  en: string;
};

export const NAV: NavItem[] = [
  { href: "/companies", label: "企業を探す", en: "COMPANIES" },
  { href: "/interviews", label: "インタビュー", en: "INTERVIEWS" },
  { href: "/events", label: "就活イベント", en: "EVENTS" },
  { href: "/knowhow", label: "就活ノウハウ", en: "KNOWHOW" },
  { href: "/about", label: "関西就活ラボについて", en: "ABOUT" },
  { href: "/for-companies", label: "企業の方へ", en: "FOR COMPANY" },
];

/** 日付を 2026.09.28 形式にする */
export function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-");
  return `${y}.${m}.${d}`;
}
