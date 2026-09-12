import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { companies, INDUSTRIES, REGIONS } from "@/data/companies";
import { InterviewCarousel } from "@/components/InterviewCarousel";
import { SITE } from "@/lib/site";

/** Hero 右下に重ねる、取材した人の顔スタック（先頭3名） */
const FACES = companies.slice(0, 3);

export default function HomePage() {
  return (
    <div className="lab-home">
      {/* ---------------- HERO ---------------- */}
      <section className="lab-hero lab-hero-future">
        <div className="lab-hero-grid" aria-hidden="true" />
        <div className="lab-orbit lab-orbit-one" aria-hidden="true" />
        <div className="lab-orbit lab-orbit-two" aria-hidden="true" />
        <span className="lab-future-word" aria-hidden="true">
          FUTURE
        </span>

        <div className="lab-hero-copy">
          <p className="lab-label">
            <span className="lab-label-rule" aria-hidden="true" />
            {SITE.nameEn}
          </p>
          <h1>
            まだ知らない、
            <br />
            自分の<span>未来へ。</span>
          </h1>
          <p className="lab-intro">
            企業の名前より、そこで働く人の話を。
            <br />
            関西の就活生へ届ける、仕事との出会い。
          </p>
          <a className="lab-button" href="#stories">
            企業の話を読む
            <ArrowUpRight width={20} height={20} aria-hidden="true" />
          </a>
        </div>

        <figure className="lab-hero-image">
          <Image
            src="/images/kansai-cityscape.jpg"
            alt="大阪の街並み"
            fill
            sizes="(max-width: 760px) 100vw, 48vw"
            className="object-cover"
            priority
          />
          <figcaption>
            <span>KANSAI, JAPAN</span>
            <span>YOUR NEXT STARTS HERE</span>
          </figcaption>
        </figure>

        <div className="lab-hero-people" aria-label="企業インタビュー">
          <div className="lab-hero-faces">
            {FACES.map((company) => (
              <Link
                key={company.slug}
                href={`/companies/${company.slug}`}
                aria-label={`${company.name}のインタビューを読む`}
              >
                <Image
                  src={company.photo}
                  alt={`${company.personTitle} ${company.personName}氏`}
                  fill
                  sizes="72px"
                  className="object-cover"
                  style={{ objectPosition: company.focus }}
                />
              </Link>
            ))}
          </div>
          <Link href="/interviews">
            働く人の、本音へ。
            <ArrowUpRight width={18} height={18} aria-hidden="true" />
          </Link>
        </div>

        <div className="lab-hero-bottom">
          <span>大手だけが、正解じゃない。</span>
          <Link href="/about">
            関西就活ラボについて
            <ArrowUpRight width={18} height={18} aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* ---------------- INTERVIEWS（3Dメリーゴーランド） ---------------- */}
      <section id="stories" className="lab-section lab-interview-orbit">
        <div className="lab-section-head">
          <div>
            <p className="lab-label">INTERVIEWS</p>
            <h2>働く人から、知っていく。</h2>
          </div>
          <Link href="/interviews">
            すべての記事
            <ArrowUpRight width={18} height={18} aria-hidden="true" />
          </Link>
        </div>
        <InterviewCarousel companies={companies} />
      </section>

      {/* ---------------- FIND YOUR NEXT ---------------- */}
      <section className="lab-finder lab-section">
        <div className="lab-section-head">
          <div>
            <p className="lab-label">FIND YOUR NEXT</p>
            <h2>気になる場所、仕事から。</h2>
          </div>
          <Link href="/companies">
            企業一覧
            <ArrowUpRight width={18} height={18} aria-hidden="true" />
          </Link>
        </div>

        <div className="lab-filter-row">
          <h3>地域</h3>
          <div>
            {REGIONS.map((region) => (
              <Link
                key={region}
                href={`/companies?pref=${encodeURIComponent(region)}`}
              >
                {region}
              </Link>
            ))}
          </div>
        </div>

        <details className="lab-industries">
          <summary>業種から探す</summary>
          <div>
            {INDUSTRIES.map((industry) => (
              <Link
                key={industry}
                href={`/companies?cat=${encodeURIComponent(industry)}`}
              >
                {industry}
              </Link>
            ))}
          </div>
        </details>
      </section>

      {/* ---------------- EVENTS / KEEP IN TOUCH ---------------- */}
      <section className="lab-section lab-connect">
        <div>
          <p className="lab-label">EVENTS</p>
          <h2>次は、直接話そう。</h2>
          <p>少人数で、企業の人と話せるイベントを準備中。</p>
          <Link className="lab-text-link" href="/events">
            イベント情報
            <ArrowUpRight width={18} height={18} aria-hidden="true" />
          </Link>
        </div>
        <div>
          <p className="lab-label">KEEP IN TOUCH</p>
          <h2>就活のヒントを、日常に。</h2>
          <p>イベントのお知らせや就活情報を届けます。</p>
          <div className="lab-social-links">
            <a href={SITE.line} target="_blank" rel="noopener noreferrer">
              LINE
              <ArrowUpRight width={18} height={18} aria-hidden="true" />
            </a>
            <a href={SITE.instagram} target="_blank" rel="noopener noreferrer">
              Instagram
              <ArrowUpRight width={18} height={18} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
