import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { articles, getArticle, relatedArticles } from "@/data/knowhow";
import { PageCTA } from "@/components/PageCTA";
import { ArticleIndexRow } from "@/components/cards";
import { formatDate } from "@/lib/site";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return { title: article.title, description: article.excerpt };
}

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const related = relatedArticles(slug);

  return (
    <>
      <header className="lab-detail-hero" style={{ paddingBottom: 56 }}>
        <div className="lab-hero-grid" aria-hidden="true" />
        <div className="lab-orbit lab-orbit-two" aria-hidden="true" />

        <nav className="lab-crumbs" aria-label="現在地">
          <Link href="/">TOP</Link>
          <span aria-hidden="true">／</span>
          <Link href="/knowhow">KNOWHOW</Link>
          <span aria-hidden="true">／</span>
          <span>{article.category}</span>
        </nav>

        <h1>{article.title}</h1>
        <p className="lab-intro">{article.lead}</p>

        <div className="lab-detail-meta">
          <span>{formatDate(article.publishedAt)}</span>
          <span>{article.category}</span>
          <span>{article.readingTime} MIN READ</span>
        </div>
      </header>

      <article className="lab-article">
        <div className="lab-prose">
          {article.sections.map((section) => (
            <section key={section.heading}>
              <h2>{section.heading}</h2>
              {section.body.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </section>
          ))}
        </div>
      </article>

      <section className="lab-section lab-ruled">
        <div className="lab-section-head">
          <div>
            <p className="lab-label">NEXT READ</p>
            <h2>続けて読む。</h2>
          </div>
          <Link href="/knowhow">
            記事一覧
            <ArrowUpRight width={18} height={18} aria-hidden="true" />
          </Link>
        </div>
        {related.map((item, i) => (
          <ArticleIndexRow key={item.slug} article={item} number={i + 1} />
        ))}
      </section>

      <PageCTA
        title={
          <>
            まだ知らない企業と、
            <br />
            出会いにいこう。
          </>
        }
        href="/companies"
        cta="企業を見る"
      />
    </>
  );
}
