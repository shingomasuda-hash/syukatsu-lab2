import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, X } from "lucide-react";
import {
  companies,
  INDUSTRIES,
  REGIONS,
  type Industry,
  type Region,
} from "@/data/companies";
import { PageHero } from "@/components/PageHero";
import { PageCTA } from "@/components/PageCTA";
import { Reveal } from "@/components/Reveal";
import { LeadCompanyCard, StoryCard } from "@/components/cards";

export const metadata: Metadata = {
  title: "企業を探す",
  description:
    "関西の就活生へ。まだ知らない企業と出会うための、地域と業種からの探索。",
};

type Search = { cat?: string; pref?: string };

/** クエリを保ったまま1つの条件だけ差し替えた URL を作る */
function buildHref(current: Search, patch: Search): string {
  const next = { ...current, ...patch };
  const params = new URLSearchParams();
  if (next.cat) params.set("cat", next.cat);
  if (next.pref) params.set("pref", next.pref);
  const qs = params.toString();
  return qs ? `/companies?${qs}` : "/companies";
}

export default async function CompaniesPage({
  searchParams,
}: {
  searchParams: Promise<Search>;
}) {
  const sp = await searchParams;
  const cat = INDUSTRIES.includes(sp.cat as Industry)
    ? (sp.cat as Industry)
    : undefined;
  const pref = REGIONS.includes(sp.pref as Region)
    ? (sp.pref as Region)
    : undefined;

  const results = companies.filter(
    (c) => (!cat || c.industry === cat) && (!pref || c.region === pref),
  );

  // 大1 + 小2 を Editorial ブロックに、残りは4列グリッドへ送る
  const [lead, ...rest] = results;
  const beside = rest.slice(0, 2);
  const remainder = rest.slice(2);
  const filtered = Boolean(cat || pref);

  return (
    <>
      <PageHero
        label="COMPANIES"
        title={
          <>
            まだ知らない企業と、
            <br />
            <span>出会う。</span>
          </>
        }
        intro="規模でも知名度でもなく、そこで何が起きているかで選ぶ。関西の就活生のための、企業の探索。"
        word="COMPANIES"
        image={{ src: "/images/kansai-cityscape.jpg", alt: "大阪の街並み" }}
        index={[
          { value: String(companies.length), label: "COMPANIES" },
          { value: String(REGIONS.length), label: "AREAS" },
          { value: String(INDUSTRIES.length), label: "INDUSTRIES" },
        ]}
      />

      {/* 絞り込み。トップの FIND YOUR NEXT と同じ言語。 */}
      <section className="lab-finder-panel lab-section lab-ring-ornament">
        <div className="lab-section-head">
          <div>
            <p className="lab-label">FIND YOUR NEXT</p>
            <h2>気になる場所、仕事から。</h2>
          </div>
        </div>

        <div className="lab-filter-row">
          <h3>地域</h3>
          <div>
            {REGIONS.map((region) => (
              <Link
                key={region}
                href={buildHref(
                  { cat, pref },
                  { pref: pref === region ? undefined : region },
                )}
                aria-current={pref === region ? "true" : undefined}
              >
                {region}
              </Link>
            ))}
          </div>
        </div>

        <div className="lab-filter-row">
          <h3>業種</h3>
          <div>
            {INDUSTRIES.map((industry) => (
              <Link
                key={industry}
                href={buildHref(
                  { cat, pref },
                  { cat: cat === industry ? undefined : industry },
                )}
                aria-current={cat === industry ? "true" : undefined}
              >
                {industry}
              </Link>
            ))}
          </div>
        </div>

        {filtered && (
          <div className="lab-filter-active">
            <span>絞り込み中</span>
            {pref && (
              <Link
                className="lab-chip"
                href={buildHref({ cat, pref }, { pref: undefined })}
              >
                {pref}
                <X width={14} height={14} aria-hidden="true" />
              </Link>
            )}
            {cat && (
              <Link
                className="lab-chip"
                href={buildHref({ cat, pref }, { cat: undefined })}
              >
                {cat}
                <X width={14} height={14} aria-hidden="true" />
              </Link>
            )}
            <Link className="lab-filter-clear" href="/companies">
              条件をすべて外す
            </Link>
          </div>
        )}
      </section>

      {/* 結果。大1 + 小Nの Editorial Layout。 */}
      <section className="lab-section lab-ruled">
        <div className="lab-section-head">
          <div className="lab-result-count">
            <strong>{String(results.length).padStart(2, "0")}</strong>
            <span>COMPANIES FOUND</span>
          </div>
          {filtered && (
            <Link href="/companies">
              すべての企業
              <ArrowUpRight width={18} height={18} aria-hidden="true" />
            </Link>
          )}
        </div>

        {results.length === 0 ? (
          <p className="lab-empty">
            この条件に当てはまる企業はまだありません。条件を外すか、別の地域から探してみてください。
          </p>
        ) : (
          <>
            <Reveal className="lab-editorial">
              <LeadCompanyCard company={lead} />
              <div className="lab-editorial-rest">
                {beside.map((company) => (
                  <StoryCard
                    key={company.slug}
                    company={company}
                    sizes="(max-width: 760px) 100vw, 320px"
                  />
                ))}
              </div>
            </Reveal>

            {remainder.length > 0 && (
              <Reveal className="lab-grid-4" as="div">
                {remainder.map((company) => (
                  <StoryCard
                    key={company.slug}
                    company={company}
                    sizes="(max-width: 760px) 100vw, 380px"
                  />
                ))}
              </Reveal>
            )}
          </>
        )}
      </section>

      <PageCTA
        title={
          <>
            働く人の話から、
            <br />
            会社を知る。
          </>
        }
        href="/interviews"
        cta="インタビューを読む"
      />
    </>
  );
}
