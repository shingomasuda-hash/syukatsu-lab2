import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Company } from "@/data/companies";
import type { Article } from "@/data/knowhow";
import { formatDate } from "@/lib/site";

/**
 * 4:5 の人物写真を主役にしたカード。
 * トップページの .lab-story をそのまま共通化したもの。
 */
export function StoryCard({
  company,
  sizes = "(max-width: 760px) 84vw, 24vw",
}: {
  company: Company;
  sizes?: string;
}) {
  return (
    <article>
      <Link href={`/companies/${company.slug}`} className="lab-story">
        <div className="lab-story-photo">
          <Image
            src={company.photo}
            alt={`${company.personTitle} ${company.personName}氏`}
            fill
            sizes={sizes}
            className="object-cover"
            style={{ objectPosition: company.focus }}
          />
          <span className="lab-story-arrow">
            <ArrowUpRight width={18} height={18} aria-hidden="true" />
          </span>
        </div>
        <p className="lab-meta">
          {company.location} ／ {company.industry}
        </p>
        <h3>{company.title}</h3>
        <p className="lab-company">
          {company.name}／{company.personTitle} {company.personName}
        </p>
      </Link>
    </article>
  );
}

/** /companies の一覧先頭に置く、大きめの 5:4 カード */
export function LeadCompanyCard({ company }: { company: Company }) {
  return (
    <article className="lab-editorial-lead">
      <Link href={`/companies/${company.slug}`} className="lab-story">
        <div className="lab-story-photo">
          <Image
            src={company.photo}
            alt={`${company.personTitle} ${company.personName}氏`}
            fill
            sizes="(max-width: 1100px) 100vw, 46vw"
            className="object-cover"
            style={{ objectPosition: company.focus }}
            priority
          />
          <span className="lab-story-arrow">
            <ArrowUpRight width={20} height={20} aria-hidden="true" />
          </span>
        </div>
        <p className="lab-meta">
          {company.location} ／ {company.industry}
        </p>
        <h3>{company.title}</h3>
        <p className="lab-company">
          {company.name}／{company.personTitle} {company.personName}
        </p>
      </Link>
    </article>
  );
}

/** 左右交互にずらす横並びカード */
export function StaggerCompanyCard({
  company,
  priority = false,
}: {
  company: Company;
  /** 一覧の先頭カードだけ true。LCP 画像になるため。 */
  priority?: boolean;
}) {
  return (
    <Link
      href={`/companies/${company.slug}`}
      className="lab-stagger-item"
      style={{ display: "grid", gridTemplateColumns: "inherit", gap: "inherit" }}
    >
      <div className="lab-stagger-media">
        <Image
          src={company.photo}
          alt={`${company.personTitle} ${company.personName}氏`}
          fill
          sizes="(max-width: 760px) 100vw, 45vw"
          className="object-cover"
          style={{ objectPosition: company.focus }}
          priority={priority}
        />
      </div>
      <div>
        <p className="lab-meta" style={{ marginTop: 0 }}>
          {company.location} ／ {company.industry}
        </p>
        <h3
          style={{
            fontSize: "clamp(20px, 2vw, 30px)",
            fontWeight: 700,
            letterSpacing: "-0.03em",
            lineHeight: 1.55,
            marginTop: 12,
          }}
        >
          {company.title}
        </h3>
        <p className="lab-company">{company.excerpt}</p>
        <p className="lab-company" style={{ marginTop: 16 }}>
          {company.name}／{company.personTitle} {company.personName}
        </p>
      </div>
    </Link>
  );
}

/** ノウハウ記事の目次行 */
export function ArticleIndexRow({
  article,
  number,
}: {
  article: Article;
  number: number;
}) {
  return (
    <Link href={`/knowhow/${article.slug}`} className="lab-index-row">
      <b>{String(number).padStart(2, "0")}</b>
      <div>
        <h3>{article.title}</h3>
        <p>{article.excerpt}</p>
      </div>
      <span>
        {article.category} · {formatDate(article.publishedAt)}
      </span>
    </Link>
  );
}
