import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  articles,
  featuredArticle,
  KNOWHOW_CATEGORIES,
  type KnowhowCategory,
} from "@/data/knowhow";
import { PageHero } from "@/components/PageHero";
import { PageCTA } from "@/components/PageCTA";
import { Reveal } from "@/components/Reveal";
import { ArticleIndexRow } from "@/components/cards";
import { formatDate } from "@/lib/site";

export const metadata: Metadata = {
  title: "就活ノウハウ",
  description:
    "何から始めるか、何を見るか。就活を進めるための考え方をまとめた記事一覧。",
};

type Search = { cat?: string };

export default async function KnowhowPage({
  searchParams,
}: {
  searchParams: Promise<Search>;
}) {
  const sp = await searchParams;
  const cat = KNOWHOW_CATEGORIES.includes(sp.cat as KnowhowCategory)
    ? (sp.cat as KnowhowCategory)
    : undefined;

  const feature = featuredArticle();
  const list = cat ? articles.filter((a) => a.category === cat) : articles;
  // 特集として大きく出す記事は、絞り込みがないときだけ目次から外す
  const indexed = cat ? list : list.filter((a) => a.slug !== feature.slug);

  return (
    <>
      <PageHero
        label="KNOWHOW"
        title={
          <>
            就活の順番を、
            <br />
            <span>整理する。</span>
          </>
        }
        intro="情報が多すぎて動けないなら、何を先に決めるかから。読み物としてまとめています。"
        word="KNOWHOW"
        index={[
          { value: String(articles.length), label: "ARTICLES" },
          { value: String(KNOWHOW_CATEGORIES.length), label: "CATEGORIES" },
        ]}
      />

      {/* FEATURED — 雑誌の巻頭 */}
      {!cat && (
        <section className="lab-section lab-surface-paper">
          <Reveal className="lab-feature">
            <div>
              <span className="lab-feature-mark">FEATURED</span>
              <h2>
                <Link href={`/knowhow/${feature.slug}`}>{feature.title}</Link>
              </h2>
              <p>{feature.excerpt}</p>
              <Link className="lab-text-link" href={`/knowhow/${feature.slug}`}>
                読む
                <ArrowUpRight width={18} height={18} aria-hidden="true" />
              </Link>
            </div>
            <div style={{ textAlign: "right" }}>
              <span className="lab-feature-number" aria-hidden="true">
                01
              </span>
              <p
                className="lab-meta"
                style={{ fontFamily: "var(--font-label)", letterSpacing: ".1em" }}
              >
                {feature.category} · {formatDate(feature.publishedAt)} ·{" "}
                {feature.readingTime}MIN
              </p>
            </div>
          </Reveal>
        </section>
      )}

      {/* CATEGORY — タブ */}
      <section className="lab-section lab-ruled" style={{ paddingBottom: 0 }}>
        <div className="lab-section-head">
          <div>
            <p className="lab-label">CATEGORY</p>
            <h2>読みたいところから。</h2>
          </div>
        </div>
        <div className="lab-tabs">
          <Link href="/knowhow" aria-current={!cat ? "true" : undefined}>
            すべて
          </Link>
          {KNOWHOW_CATEGORIES.map((c) => (
            <Link
              key={c}
              href={`/knowhow?cat=${encodeURIComponent(c)}`}
              aria-current={cat === c ? "true" : undefined}
            >
              {c}
            </Link>
          ))}
        </div>
      </section>

      {/* INDEX — 目次 */}
      <section className="lab-section lab-ruled" style={{ paddingTop: 40 }}>
        <div className="lab-section-head">
          <div className="lab-result-count">
            <strong>{String(list.length).padStart(2, "0")}</strong>
            <span>{cat ? "ARTICLES IN CATEGORY" : "ARTICLES"}</span>
          </div>
        </div>

        {indexed.length === 0 ? (
          <p className="lab-empty">
            このカテゴリの記事はまだありません。
          </p>
        ) : (
          <Reveal>
            {indexed.map((article, i) => (
              <ArticleIndexRow
                key={article.slug}
                article={article}
                number={i + 1}
              />
            ))}
          </Reveal>
        )}
      </section>

      <PageCTA
        title={
          <>
            読んだあとは、
            <br />
            会いにいく。
          </>
        }
        href="/events"
        cta="イベントを見る"
      />
    </>
  );
}
