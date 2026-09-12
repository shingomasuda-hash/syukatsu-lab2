/**
 * 就活ノウハウ記事データ
 * 本文は仮です。CONTENT-TODO.md を参照してください。
 */

export type KnowhowCategory =
  | "はじめかた"
  | "自己分析"
  | "企業研究"
  | "エントリーシート"
  | "面接"
  | "関西で働く";

export const KNOWHOW_CATEGORIES: KnowhowCategory[] = [
  "はじめかた",
  "自己分析",
  "企業研究",
  "エントリーシート",
  "面接",
  "関西で働く",
];

export type Article = {
  slug: string;
  title: string;
  category: KnowhowCategory;
  publishedAt: string;
  /** 読了目安（分） */
  readingTime: number;
  excerpt: string;
  lead: string;
  /** 特集記事として大きく扱う */
  featured?: boolean;
  sections: { heading: string; body: string[] }[];
};

export const articles: Article[] = [
  {
    slug: "how-to-start",
    title: "何から始めればいいか分からない人へ。",
    category: "はじめかた",
    publishedAt: "2026-08-30",
    readingTime: 6,
    featured: true,
    excerpt:
      "就活は、情報を集める前に「何を決めるのか」を決めたほうが早く進みます。",
    lead: "やることが多すぎて動けない、という相談が一番多い。順番を決めるところから始めます。",
    sections: [
      {
        heading: "最初に決めるのは、志望業界ではない",
        body: [
          "多くの人が最初に業界を絞ろうとしますが、判断材料がない段階で絞ると、あとで戻れなくなります。",
          "先に決めるべきなのは、働く場所と、どういう時間の使い方をしたいか。この2つは自分の中だけで決められるので、情報収集を待つ必要がありません。",
        ],
      },
      {
        heading: "情報は、広げてから絞る",
        body: [
          "最初から5社に絞るより、30社をざっと見て、そこから減らすほうが精度が上がります。知らない選択肢は選べないからです。",
          "一覧ページを流し見するだけでも構いません。名前を知らない会社が何をしているのかを、数か月ではなく数日で把握することを目指してください。",
        ],
      },
      {
        heading: "締切だけは、先に押さえる",
        body: [
          "やる気の問題ではなく、締切を把握していないことが原因で出せないケースが非常に多いです。",
          "気になった会社を見つけたら、内容を読む前にエントリー締切だけメモしておくと、後から取り返しがつきます。",
        ],
      },
    ],
  },
  {
    slug: "company-research",
    title: "企業研究で、本当に見るべき3つ。",
    category: "企業研究",
    publishedAt: "2026-08-22",
    readingTime: 5,
    excerpt: "採用ページに書いてあることの、どこを信じるか。",
    lead: "会社が自分で発信している情報と、外から見える情報を分けて読むのがコツです。",
    sections: [
      {
        heading: "事業の説明が具体的かどうか",
        body: [
          "何をしている会社なのかを、就活生向けではない言葉で説明しているか。取引先や製品名が具体的に出てくるページがあるかを確認します。",
        ],
      },
      {
        heading: "人の話が、役職に偏っていないか",
        body: [
          "社長のメッセージしかない採用ページは、現場の情報が出てこない可能性があります。入社数年目の人の話があるかどうかは、ひとつの目安です。",
        ],
      },
      {
        heading: "採用人数と組織規模のバランス",
        body: [
          "社員数に対して採用人数が極端に多い場合、その理由を面接で聞いてみる価値があります。事業拡大なのか、別の理由なのか。",
        ],
      },
    ],
  },
  {
    slug: "es-writing",
    title: "エントリーシートは、結論から書く。",
    category: "エントリーシート",
    publishedAt: "2026-08-15",
    readingTime: 4,
    excerpt: "読む側は、1枚に数十秒しかかけられない。",
    lead: "文章力の問題ではなく、構造の問題であることがほとんどです。",
    sections: [
      {
        heading: "最初の一文で、何の話か分かるように",
        body: [
          "エピソードから書き始めると、読み手は何の話か分からないまま3行読むことになります。先に結論を置いてください。",
        ],
      },
      {
        heading: "数字は、規模ではなく変化を書く",
        body: [
          "「100人規模の団体で」より「参加者を40人から100人に増やした」のほうが、何をしたかが伝わります。",
        ],
      },
    ],
  },
  {
    slug: "interview-basics",
    title: "面接で緊張しても、問題ない理由。",
    category: "面接",
    publishedAt: "2026-08-08",
    readingTime: 5,
    excerpt: "評価されているのは、流暢さではありません。",
    lead: "うまく話せたかどうかと、通過するかどうかは、あまり関係がありません。",
    sections: [
      {
        heading: "沈黙は、思考時間として許容される",
        body: [
          "即答できない質問に対して、少し考えてから答えるのは減点になりません。むしろ、準備した答えをそのまま返すほうが伝わらないことがあります。",
        ],
      },
      {
        heading: "分からないことは、分からないと言う",
        body: [
          "知ったかぶりは必ず次の質問で崩れます。知らないと伝えたうえで、どう考えるかを話すほうが評価されます。",
        ],
      },
    ],
  },
  {
    slug: "self-analysis",
    title: "自己分析は、過去より「いま」を見る。",
    category: "自己分析",
    publishedAt: "2026-07-31",
    readingTime: 5,
    excerpt: "幼少期まで遡らなくても、材料は足りています。",
    lead: "長い年表をつくることが目的ではありません。",
    sections: [
      {
        heading: "直近2年で十分",
        body: [
          "就活で聞かれるのは、これからどう働くか。判断材料としては、大学に入ってからの行動で足ります。",
        ],
      },
      {
        heading: "避けたことも書き出す",
        body: [
          "やったことだけでなく、やらなかったこと・途中でやめたことにも、判断の基準が表れます。",
        ],
      },
    ],
  },
  {
    slug: "working-in-kansai",
    title: "関西で働くと、どう変わるか。",
    category: "関西で働く",
    publishedAt: "2026-07-24",
    readingTime: 6,
    excerpt: "通勤時間、家賃、そして会社との距離感。",
    lead: "勤務地の話は、条件の話であると同時に、生活の話でもあります。",
    sections: [
      {
        heading: "移動時間が短い",
        body: [
          "主要な就業エリアが比較的コンパクトにまとまっているため、通勤時間が生活に与える影響が小さくなります。",
        ],
      },
      {
        heading: "会社との距離が近い",
        body: [
          "本社機能が近くにある企業が多く、意思決定をする人との物理的な距離が近い環境で働きやすくなります。",
        ],
      },
    ],
  },
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function featuredArticle(): Article {
  return articles.find((a) => a.featured) ?? articles[0];
}

export function relatedArticles(slug: string, limit = 3): Article[] {
  const current = getArticle(slug);
  if (!current) return articles.slice(0, limit);
  const same = articles.filter(
    (a) => a.slug !== slug && a.category === current.category,
  );
  const rest = articles.filter(
    (a) => a.slug !== slug && a.category !== current.category,
  );
  return [...same, ...rest].slice(0, limit);
}
