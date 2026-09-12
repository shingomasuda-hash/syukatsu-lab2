/**
 * 企業データ
 *
 * slug / name / person / region / industry / photo は
 * 現行トップページのエクスポートから抽出した実データです。
 *
 * tagline / lead / chapters / profile の本文は仮テキストです。
 * 取材原稿への差し替えが必要な箇所は CONTENT-TODO.md を参照してください。
 */

export type Industry =
  | "IT・SaaS"
  | "メーカー"
  | "建設"
  | "商社"
  | "サービス"
  | "人材"
  | "物流"
  | "金融"
  | "不動産"
  | "小売"
  | "食品"
  | "広告・マーケティング"
  | "コンサル"
  | "その他";

export type Region =
  | "大阪府"
  | "京都府"
  | "兵庫県"
  | "奈良県"
  | "滋賀県"
  | "和歌山県"
  | "その他の地域";

export const INDUSTRIES: Industry[] = [
  "IT・SaaS",
  "メーカー",
  "建設",
  "商社",
  "サービス",
  "人材",
  "物流",
  "金融",
  "不動産",
  "小売",
  "食品",
  "広告・マーケティング",
  "コンサル",
  "その他",
];

export const REGIONS: Region[] = [
  "大阪府",
  "京都府",
  "兵庫県",
  "奈良県",
  "滋賀県",
  "和歌山県",
  "その他の地域",
];

export type Chapter = {
  /** 章見出し */
  heading: string;
  /** 段落の配列 */
  body: string[];
  /** 引用として大きく見せる一文（任意） */
  pullquote?: string;
};

export type Company = {
  slug: string;
  /** 会社名 */
  name: string;
  /** 所在地（表記そのまま） */
  location: string;
  /** フィルタ用の地域区分 */
  region: Region;
  industry: Industry;
  /** 取材対象者の氏名 */
  personName: string;
  /** 取材対象者の役職 */
  personTitle: string;
  /** ポートレート画像 */
  photo: string;
  /**
   * 画像の object-position。顔が全コンテナで枠内に収まる値。
   * カード(0.73) / StoryCard(0.8) / 顔スタック(0.84) / Stagger(1.33) /
   * 詳細帯(5:3) のどれで切り抜かれても頭頂とアゴが切れないよう、
   * 実測した頭部の位置から許容範囲を解いて決めている。
   * 画像を差し替えたら scripts/focus-check.mjs で再検証すること。
   */
  focus: string;
  /** 記事タイトル */
  title: string;
  /** 一覧用の短い引き */
  excerpt: string;
  /** 記事冒頭のリード文 */
  lead: string;
  /** 公開日 */
  publishedAt: string;
  chapters: Chapter[];
  profile: { label: string; value: string }[];
};

const PLACEHOLDER_CHAPTERS: Chapter[] = [
  {
    heading: "この会社を選んだ理由",
    body: [
      "大学時代は、名前を知っている会社ばかりを見ていました。説明会に行っても、どこも同じように見えて、自分が何を基準に選べばいいのか分からなくなっていたと思います。",
      "転機になったのは、実際に工場を見せてもらったことでした。働いている人が、自分の担当している仕事の話を、驚くほど具体的にしてくれる。その解像度の高さに、ここは違うと感じました。",
    ],
    pullquote: "名前で選ばなくてよかった、と今は思っています。",
  },
  {
    heading: "入社して分かったこと",
    body: [
      "入る前に想像していたより、任される範囲がずっと広いです。小さな組織なので、自分がやらなければ誰もやらない。最初は不安でしたが、結果的にそれが一番の成長機会になりました。",
      "分からないことを聞ける距離に、決裁権を持っている人がいる。これは規模の大きな会社では得にくい環境だと思います。",
    ],
  },
  {
    heading: "これから入ってくる人へ",
    body: [
      "就活のときに「やりたいこと」が明確でなくても、まったく問題ないと思っています。むしろ、入ってから見つかることのほうが多い。",
      "大事なのは、その会社の人と話したときに、自分が素直でいられるかどうか。そこだけは、実際に会わないと分かりません。",
    ],
  },
];

export const companies: Company[] = [
  {
    slug: "yamagata-harness",
    name: "株式会社山形ハーネス",
    location: "山形県",
    region: "その他の地域",
    industry: "メーカー",
    personName: "水口啓一",
    personTitle: "代表取締役",
    photo: "/images/yamagata-harness.jpg",
    focus: "62% 34.0%",
    title: "見えない場所で、動かしている。",
    excerpt: "製品の内側にしかない部品を、ミリ単位でつくり続ける理由。",
    lead: "完成した製品を開けなければ、その部品は誰の目にも触れない。それでも精度にこだわり続ける現場を訪ねた。",
    publishedAt: "2026-07-18",
    chapters: PLACEHOLDER_CHAPTERS,
    profile: [
      { label: "所在地", value: "山形県" },
      { label: "業種", value: "メーカー" },
      { label: "取材対象", value: "代表取締役 水口啓一氏" },
    ],
  },
  {
    slug: "shoei-seiki",
    name: "株式会社昭栄精機",
    location: "山梨県",
    region: "その他の地域",
    industry: "メーカー",
    personName: "佐藤元章",
    personTitle: "代表取締役",
    photo: "/images/shoei-seiki.jpg",
    focus: "52% 17.9%",
    title: "精度は、人の手からしか生まれない。",
    excerpt: "機械化が進んでも、最後に残る判断がある。",
    lead: "自動化できる工程は自動化する。そのうえで、人が残るべき場所はどこかを問い続けている。",
    publishedAt: "2026-07-11",
    chapters: PLACEHOLDER_CHAPTERS,
    profile: [
      { label: "所在地", value: "山梨県" },
      { label: "業種", value: "メーカー" },
      { label: "取材対象", value: "代表取締役 佐藤元章氏" },
    ],
  },
  {
    slug: "nagata-reiki",
    name: "永田冷機工業所",
    location: "熊本県",
    region: "その他の地域",
    industry: "建設",
    personName: "永田雄大",
    personTitle: "経営企画室",
    photo: "/images/nagata-reiki.jpg",
    focus: "63% 42.0%",
    title: "止められない設備を、支える。",
    excerpt: "冷やし続けることが前提の場所で、何が起きているか。",
    lead: "食品も医療も、温度が止まれば成立しない。その前提を守る仕事の現場を聞いた。",
    publishedAt: "2026-07-04",
    chapters: PLACEHOLDER_CHAPTERS,
    profile: [
      { label: "所在地", value: "熊本県" },
      { label: "業種", value: "建設" },
      { label: "取材対象", value: "経営企画室 永田雄大氏" },
    ],
  },
  {
    slug: "chuo-denko",
    name: "株式会社中央電工",
    location: "静岡県",
    region: "その他の地域",
    industry: "建設",
    personName: "富岡賢",
    personTitle: "代表取締役社長",
    photo: "/images/chuo-denko.jpg",
    focus: "50% 13.1%",
    title: "電気は、地面の下を通っている。",
    excerpt: "普段は意識されないインフラを、つくり直し続ける。",
    lead: "新しくつくる仕事より、使われ続けているものを更新する仕事のほうが多い。",
    publishedAt: "2026-06-27",
    chapters: PLACEHOLDER_CHAPTERS,
    profile: [
      { label: "所在地", value: "静岡県" },
      { label: "業種", value: "建設" },
      { label: "取材対象", value: "代表取締役社長 富岡賢氏" },
    ],
  },
  {
    slug: "hatta-keiami",
    name: "八田経編株式会社",
    location: "福井県",
    region: "その他の地域",
    industry: "メーカー",
    personName: "八田嘉一郎",
    personTitle: "代表取締役",
    photo: "/images/hatta-keiami.jpg",
    focus: "43% 19.7%",
    title: "編むことでしか、出せない構造がある。",
    excerpt: "織るのでも縫うのでもない、経編という技術。",
    lead: "伸びる、透ける、破れない。用途ごとに構造から設計する繊維の話。",
    publishedAt: "2026-06-20",
    chapters: PLACEHOLDER_CHAPTERS,
    profile: [
      { label: "所在地", value: "福井県" },
      { label: "業種", value: "メーカー" },
      { label: "取材対象", value: "代表取締役 八田嘉一郎氏" },
    ],
  },
  {
    slug: "s-pack",
    name: "株式会社エスパック",
    location: "山形県",
    region: "その他の地域",
    industry: "メーカー",
    personName: "佐藤健太郎",
    personTitle: "代表取締役社長",
    photo: "/images/s-pack.jpg",
    focus: "52% 17.7%",
    title: "包むことは、届けること。",
    excerpt: "中身より先に手に取られるものを、つくっている。",
    lead: "パッケージは、商品が最初に発する言葉でもある。",
    publishedAt: "2026-06-13",
    chapters: PLACEHOLDER_CHAPTERS,
    profile: [
      { label: "所在地", value: "山形県" },
      { label: "業種", value: "メーカー" },
      { label: "取材対象", value: "代表取締役社長 佐藤健太郎氏" },
    ],
  },
  {
    slug: "inoue-ribbon",
    name: "井上リボン工業株式会社",
    location: "福井県",
    region: "その他の地域",
    industry: "メーカー",
    personName: "井上博之",
    personTitle: "代表取締役社長",
    photo: "/images/inoue-ribbon.jpg",
    focus: "55% 10.5%",
    title: "細いものを、正確に。",
    excerpt: "幅数ミリの世界で、品質をどう定義するか。",
    lead: "リボンという言葉から想像されるものより、ずっと産業に近い現場だった。",
    publishedAt: "2026-06-06",
    chapters: PLACEHOLDER_CHAPTERS,
    profile: [
      { label: "所在地", value: "福井県" },
      { label: "業種", value: "メーカー" },
      { label: "取材対象", value: "代表取締役社長 井上博之氏" },
    ],
  },
  {
    slug: "osaka-meiban",
    name: "大阪銘板株式会社",
    location: "大阪府",
    region: "大阪府",
    industry: "メーカー",
    personName: "山口徹",
    personTitle: "代表取締役社長",
    photo: "/images/osaka-meiban.jpg",
    focus: "52% 32.4%",
    title: "表示は、安全の一部だ。",
    excerpt: "読めなければ意味がない、という前提からつくる。",
    lead: "機械の操作パネルも、非常口の案内も、読み違えられない設計が要る。",
    publishedAt: "2026-05-30",
    chapters: PLACEHOLDER_CHAPTERS,
    profile: [
      { label: "所在地", value: "大阪府" },
      { label: "業種", value: "メーカー" },
      { label: "取材対象", value: "代表取締役社長 山口徹氏" },
    ],
  },
  {
    slug: "maru-taka",
    name: "丸髙工業株式会社",
    location: "東京都",
    region: "その他の地域",
    industry: "建設",
    personName: "高沢治世子",
    personTitle: "代表取締役社長",
    photo: "/images/maru-taka.jpg",
    focus: "50% 8.1%",
    title: "現場は、段取りで決まる。",
    excerpt: "工事が始まる前に、ほとんどが決まっている。",
    lead: "着工してからの判断より、その前に積み上げた準備のほうが長い。",
    publishedAt: "2026-05-23",
    chapters: PLACEHOLDER_CHAPTERS,
    profile: [
      { label: "所在地", value: "東京都" },
      { label: "業種", value: "建設" },
      { label: "取材対象", value: "代表取締役社長 高沢治世子氏" },
    ],
  },
];

export function getCompany(slug: string): Company | undefined {
  return companies.find((c) => c.slug === slug);
}

export function relatedCompanies(slug: string, limit = 3): Company[] {
  const current = getCompany(slug);
  if (!current) return companies.slice(0, limit);
  const sameIndustry = companies.filter(
    (c) => c.slug !== slug && c.industry === current.industry,
  );
  const rest = companies.filter(
    (c) => c.slug !== slug && c.industry !== current.industry,
  );
  return [...sameIndustry, ...rest].slice(0, limit);
}
