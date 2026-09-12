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

/** 左右交互にずらす横並びカード。空いた側に大きな通し番号を置く。 */
export function StaggerCompanyCard({
  company,
  number,
  priority = false,
}: {
  company: Company;
  /** 行の通し番号。空いた側にアウトライン数字として出す。 */
  number: number;
  /** 一覧の先頭カードだけ true。LCP 画像になるため。 */
  priority?: boolean;
}) {
  return (
    <Link href={`/companies/${company.slug}`} className="lab-stagger-item">
      <div className="lab-stagger-media">
        <Image
          src={company.photo}
          alt={`${company.personTitle} ${company.personName}氏`}
          fill
          sizes="(max-width: 760px) 100vw, 520px"
          className="object-cover"
          style={{ objectPosition: company.focus }}
          priority={priority}
        />
      </div>
      <div className="lab-stagger-body">
        <p className="lab-meta">
          {company.location} ／ {company.industry}
        </p>
        <h3>{company.title}</h3>
        <p className="lab-stagger-excerpt">{company.excerpt}</p>
        <p className="lab-stagger-by">
          {company.name}
          <span>
            {company.personTitle} {company.personName}
          </span>
        </p>
      </div>
      <span className="lab-stagger-no" aria-hidden="true">
        {String(number).padStart(2, "0")}
      </span>
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
      <b aria-hidden="true">{String(number).padStart(2, "0")}</b>
      <div>
        <p className="lab-index-meta">
          <span className="lab-index-cat">{article.category}</span>
          <span>{formatDate(article.publishedAt)}</span>
          <span>{article.readingTime} MIN READ</span>
        </p>
        <div className="lab-index-head">
          <h3>{article.title}</h3>
          <i className="lab-index-arrow">
            <ArrowUpRight width={18} height={18} aria-hidden="true" />
          </i>
        </div>
        <p>{article.excerpt}</p>
      </div>
    </Link>
  );
}

/** PICK UP 帯に置く dark 面のカード */
export function PickupCard({
  article,
  mark,
}: {
  article: Article;
  /** カード左上の英字マーク */
  mark: string;
}) {
  return (
    <Link href={`/knowhow/${article.slug}`}>
      <div>
        <b>{mark}</b>
        <h3>{article.title}</h3>
        <p>{article.excerpt}</p>
      </div>
      <div className="lab-pickup-foot">
        <span>{article.category}</span>
        <ArrowUpRight width={16} height={16} aria-hidden="true" />
      </div>
    </Link>
  );
}
