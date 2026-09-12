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
import { ArticleIndexRow, PickupCard } from "@/components/cards";
import { SectionLabel } from "@/components/SectionLabel";
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
  // PICK UP は特集以外から3件
  const pickup = articles.filter((a) => a.slug !== feature.slug).slice(0, 3);

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

      {/* ---- FEATURED：dark 面で1本だけ大きく見せる ---- */}
      {!cat && (
        <section className="lab-feature-stage">
          <div className="lab-hero-grid" aria-hidden="true" />
          <div className="lab-orbit lab-orbit-two" aria-hidden="true" />

          <div className="lab-feature-inner">
            <div>
              <SectionLabel rule>FEATURED</SectionLabel>
              <h2>
                <Link href={`/knowhow/${feature.slug}`}>{feature.title}</Link>
              </h2>
              <p className="lab-feature-lead">{feature.lead}</p>
              <Link
                href={`/knowhow/${feature.slug}`}
                className="lab-button lab-button-lime"
              >
                この記事を読む
                <ArrowUpRight width={20} height={20} aria-hidden="true" />
              </Link>
            </div>

            <div className="lab-feature-side">
              <b aria-hidden="true">01</b>
              <p className="lab-feature-facts">
                <span>{feature.category}</span>
                <span>{formatDate(feature.publishedAt)}</span>
                <span>{feature.readingTime} MIN READ</span>
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ---- CATEGORY ---- */}
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

      {/* ---- INDEX：雑誌の目次 ---- */}
      <section className="lab-section lab-ruled" style={{ paddingTop: 40 }}>
        <div className="lab-section-head">
          <div className="lab-result-count">
            <strong>{String(list.length).padStart(2, "0")}</strong>
            <span>{cat ? "ARTICLES IN CATEGORY" : "ARTICLES"}</span>
          </div>
          {cat && (
            <Link href="/knowhow">
              すべての記事
              <ArrowUpRight width={18} height={18} aria-hidden="true" />
            </Link>
          )}
        </div>

        {indexed.length === 0 ? (
          <p className="lab-empty">このカテゴリの記事はまだありません。</p>
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

      {/* ---- PICK UP：dark 面に戻してリズムを作る ---- */}
      {!cat && (
        <section className="lab-section lab-surface-dark lab-ring-ornament">
          <div className="lab-hero-grid" aria-hidden="true" />
          <div className="lab-section-head">
            <div>
              <SectionLabel rule>PICK UP</SectionLabel>
              <h2>迷ったら、この3本。</h2>
            </div>
            <Link href="/knowhow">
              記事一覧
              <ArrowUpRight width={18} height={18} aria-hidden="true" />
            </Link>
          </div>
          <Reveal className="lab-pickup">
            {pickup.map((article, i) => (
              <PickupCard
                key={article.slug}
                article={article}
                mark={`NO.${String(i + 1).padStart(2, "0")}`}
              />
            ))}
          </Reveal>
        </section>
      )}

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
