import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { companies } from "@/data/companies";
import { PageHero } from "@/components/PageHero";
import { PageCTA } from "@/components/PageCTA";
import { Reveal } from "@/components/Reveal";
import { StaggerCompanyCard, StoryCard } from "@/components/cards";

export const metadata: Metadata = {
  title: "インタビュー",
  description:
    "企業の名前より、そこで働く人の話を。関西就活ラボの企業インタビュー一覧。",
};

export default function InterviewsPage() {
  // 先頭3件は左右交互のずらしレイアウト、残りは写真主役のグリッド。
  const [first, second, third, ...rest] = companies;
  const featured = [first, second, third].filter(Boolean);

  return (
    <>
      <PageHero
        label="INTERVIEWS"
        title={
          <>
            働く人の、
            <br />
            <span>本音へ。</span>
          </>
        }
        intro="会社案内では出てこない話を聞きにいく。何を選び、何に迷い、いまどう働いているか。"
        word="INTERVIEWS"
        image={{
          src: companies[0].photo,
          alt: `${companies[0].personTitle} ${companies[0].personName}氏`,
        }}
        index={[
          { value: String(companies.length), label: "INTERVIEWS" },
          { value: String(new Set(companies.map((c) => c.industry)).size), label: "INDUSTRIES" },
        ]}
      />

      <section className="lab-section lab-surface-paper">
        <div className="lab-section-head">
          <div>
            <p className="lab-label">LATEST</p>
            <h2>最近、話を聞いた人。</h2>
          </div>
          <Link href="/companies">
            企業から探す
            <ArrowUpRight width={18} height={18} aria-hidden="true" />
          </Link>
        </div>

        <Reveal className="lab-stagger">
          {featured.map((company, i) => (
            <StaggerCompanyCard
              key={company.slug}
              company={company}
              number={i + 1}
              priority={i === 0}
            />
          ))}
        </Reveal>
      </section>

      {rest.length > 0 && (
        <section className="lab-section lab-ruled">
          <div className="lab-section-head">
            <div>
              <p className="lab-label">ALL INTERVIEWS</p>
              <h2>すべての記事。</h2>
            </div>
          </div>
          <Reveal className="lab-grid-4">
            {rest.map((company) => (
              <StoryCard
                key={company.slug}
                company={company}
                sizes="(max-width: 760px) 100vw, 22vw"
              />
            ))}
          </Reveal>
        </section>
      )}

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
