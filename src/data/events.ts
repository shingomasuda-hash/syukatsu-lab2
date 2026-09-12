/**
 * イベントデータ
 * 本文・日程は仮です。CONTENT-TODO.md を参照してください。
 */

export type EventStatus = "upcoming" | "closed";

export type LabEvent = {
  slug: string;
  title: string;
  /** ISO 形式の開催日 */
  date: string;
  /** 開始〜終了 */
  time: string;
  /** 都市名（英字・大きく見せる） */
  city: string;
  venue: string;
  /** 定員 */
  capacity: string;
  /** 参加費 */
  fee: string;
  excerpt: string;
  body: string[];
  /** 当日の流れ */
  timetable: { time: string; label: string }[];
  /** 登壇・参加予定の企業 slug */
  companySlugs: string[];
};

export const events: LabEvent[] = [
  {
    slug: "osaka-meetup-09",
    title: "少人数で、企業の人と話す日。",
    date: "2026-09-28",
    time: "13:00 - 17:00",
    city: "OSAKA",
    venue: "大阪市内（申込者に個別にご案内します）",
    capacity: "学生 20名",
    fee: "無料",
    excerpt:
      "1社あたり6〜8名の少人数。質問しきれないまま終わらない設計にしています。",
    body: [
      "大人数の合同説明会では、結局ひとことも話せずに終わってしまうことがあります。このイベントは、その逆をやります。",
      "1テーブルにつき学生は6〜8名。企業の担当者と、時間いっぱい話せる形式です。聞きたいことが残ったまま帰らないことを目的にしています。",
      "服装は自由です。エントリーや選考とは切り離して運営しているので、情報収集だけの参加で構いません。",
    ],
    timetable: [
      { time: "13:00", label: "受付・オリエンテーション" },
      { time: "13:30", label: "企業セッション 前半" },
      { time: "15:00", label: "休憩" },
      { time: "15:15", label: "企業セッション 後半" },
      { time: "16:30", label: "フリータイム" },
      { time: "17:00", label: "終了" },
    ],
    companySlugs: ["osaka-meiban", "nagata-reiki", "s-pack"],
  },
  {
    slug: "kyoto-factory-visit-10",
    title: "工場を、見にいく。",
    date: "2026-10-19",
    time: "14:00 - 17:30",
    city: "KYOTO",
    venue: "京都府内の製造拠点（現地集合）",
    capacity: "学生 12名",
    fee: "無料（現地までの交通費は各自負担）",
    excerpt: "説明を聞くより、動いているところを見るほうが早いこともある。",
    body: [
      "オフィスの写真だけでは、その会社で何が起きているかは分かりません。実際に稼働している現場を歩いて、働いている人に直接聞く回です。",
      "見学後は、若手社員との座談会を設けています。入社1〜3年目の人が中心なので、就活時に何を考えていたかを近い距離で聞けます。",
    ],
    timetable: [
      { time: "14:00", label: "現地集合・安全説明" },
      { time: "14:30", label: "工場見学" },
      { time: "16:00", label: "若手社員との座談会" },
      { time: "17:30", label: "解散" },
    ],
    companySlugs: ["hatta-keiami", "inoue-ribbon"],
  },
  {
    slug: "kobe-career-talk-08",
    title: "はじめての、業界の話。",
    date: "2026-08-24",
    time: "14:00 - 16:30",
    city: "KOBE",
    venue: "神戸市内",
    capacity: "学生 25名",
    fee: "無料",
    excerpt: "業界の全体像を、就活を始めたばかりの人向けに整理する回でした。",
    body: [
      "就活を始めた直後は、そもそも業界の区分けが分からないという声が多くあります。この回では、関西で働くことを前提に、業界ごとの仕事の違いを整理しました。",
      "参加者からは「自分が見ていた範囲がいかに狭かったか分かった」という感想が多く寄せられました。",
    ],
    timetable: [
      { time: "14:00", label: "受付" },
      { time: "14:15", label: "業界の全体像" },
      { time: "15:15", label: "グループワーク" },
      { time: "16:00", label: "質疑応答" },
      { time: "16:30", label: "終了" },
    ],
    companySlugs: ["yamagata-harness", "maru-taka"],
  },
];

/** 開催予定か終了済みかを日付から判定する */
export function eventStatus(event: LabEvent, now = new Date()): EventStatus {
  const day = new Date(`${event.date}T23:59:59+09:00`);
  return day.getTime() >= now.getTime() ? "upcoming" : "closed";
}

export function getEvent(slug: string): LabEvent | undefined {
  return events.find((e) => e.slug === slug);
}

/** 開催予定を日付の近い順、そのあとに終了済みを新しい順で返す */
export function sortedEvents(now = new Date()): LabEvent[] {
  const upcoming = events
    .filter((e) => eventStatus(e, now) === "upcoming")
    .sort((a, b) => a.date.localeCompare(b.date));
  const closed = events
    .filter((e) => eventStatus(e, now) === "closed")
    .sort((a, b) => b.date.localeCompare(a.date));
  return [...upcoming, ...closed];
}
