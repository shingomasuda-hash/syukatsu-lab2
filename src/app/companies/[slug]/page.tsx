import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { companies, getCompany, relatedCompanies } from "@/data/companies";
import { PageCTA } from "@/components/PageCTA";
import { StoryCard } from "@/components/cards";
import { formatDate } from "@/lib/site";

export function generateStaticParams() {
  return companies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const company = getCompany(slug);
  if (!company) return {};
  return {
    title: `${company.title}｜${company.name}`,
    description: company.excerpt,
    openGraph: {
      title: `${company.title}｜${company.name}`,
      description: company.excerpt,
      images: [company.photo],
    },
  };
}

export default async function CompanyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const company = getCompany(slug);
  if (!company) notFound();

  const related = relatedCompanies(slug);

  return (
    <>
      {/* Hero だけ dark。本文は白にして可読性を優先する。 */}
      <header className="lab-detail-hero">
        <div className="lab-hero-grid" aria-hidden="true" />
        <div className="lab-orbit lab-orbit-two" aria-hidden="true" />

        <nav className="lab-crumbs" aria-label="現在地">
          <Link href="/">TOP</Link>
          <span aria-hidden="true">／</span>
          <Link href="/companies">COMPANIES</Link>
          <span aria-hidden="true">／</span>
          <span>{company.name}</span>
        </nav>

        <h1>{company.title}</h1>
        <p className="lab-intro">{company.lead}</p>

        <div className="lab-detail-meta">
          <span>{formatDate(company.publishedAt)}</span>
          <span>{company.location}</span>
          <span>{company.industry}</span>
          <span>
            {company.personTitle} {company.personName}
          </span>
        </div>

        <figure className="lab-detail-figure">
          <Image
            src={company.photo}
            alt={`${company.name} ${company.personTitle} ${company.personName}氏`}
            fill
            sizes="(max-width: 760px) 100vw, 90vw"
            className="object-cover"
            style={{ objectPosition: company.focus }}
            priority
          />
        </figure>
      </header>

      <article className="lab-article">
        <div className="lab-prose">
          {company.chapters.map((chapter) => (
            <section key={chapter.heading}>
              <h2>{chapter.heading}</h2>
              {chapter.body.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
              {chapter.pullquote && (
                <p className="lab-pullquote">{chapter.pullquote}</p>
              )}
            </section>
          ))}

          <div className="lab-profile">
            <h2
              className="lab-label"
              style={{ color: "var(--lab-blue)", marginBottom: 20 }}
            >
              COMPANY PROFILE
            </h2>
            <dl>
              <dt>会社名</dt>
              <dd>{company.name}</dd>
              {company.profile.map((row) => (
                <div key={row.label} style={{ display: "contents" }}>
                  <dt>{row.label}</dt>
                  <dd>{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </article>

      <section className="lab-section lab-ruled">
        <div className="lab-section-head">
          <div>
            <p className="lab-label">NEXT INTERVIEW</p>
            <h2>ほかの企業も見てみる。</h2>
          </div>
          <Link href="/companies">
            企業一覧
            <ArrowUpRight width={18} height={18} aria-hidden="true" />
          </Link>
        </div>
        <div className="lab-grid-4">
          {related.map((item) => (
            <StoryCard
              key={item.slug}
              company={item}
              sizes="(max-width: 760px) 100vw, 22vw"
            />
          ))}
        </div>
      </section>

      <PageCTA
        title={
          <>
            次は、
            <br />
            直接会いにいこう。
          </>
        }
        href="/events"
        cta="イベントを見る"
      />
    </>
  );
}
