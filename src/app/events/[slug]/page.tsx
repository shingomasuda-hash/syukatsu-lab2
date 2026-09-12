import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { events, getEvent, eventStatus } from "@/data/events";
import { getCompany } from "@/data/companies";
import { PageCTA } from "@/components/PageCTA";
import { StoryCard } from "@/components/cards";
import { formatDate, SITE } from "@/lib/site";

export function generateStaticParams() {
  return events.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = getEvent(slug);
  if (!event) return {};
  return {
    title: `${event.title}｜${formatDate(event.date)}`,
    description: event.excerpt,
  };
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = getEvent(slug);
  if (!event) notFound();

  const closed = eventStatus(event) === "closed";
  const companies = event.companySlugs
    .map((s) => getCompany(s))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  return (
    <>
      <header className="lab-detail-hero">
        <div className="lab-hero-grid" aria-hidden="true" />
        <div className="lab-orbit lab-orbit-two" aria-hidden="true" />

        <nav className="lab-crumbs" aria-label="現在地">
          <Link href="/">TOP</Link>
          <span aria-hidden="true">／</span>
          <Link href="/events">EVENTS</Link>
          <span aria-hidden="true">／</span>
          <span>{event.city}</span>
        </nav>

        <span
          className={`lab-status ${
            closed ? "lab-status-closed" : "lab-status-upcoming"
          }`}
          style={{ marginTop: 22, display: "inline-flex" }}
        >
          {closed ? "ENDED" : "OPEN"}
        </span>

        <h1>{event.title}</h1>
        <p className="lab-intro">{event.excerpt}</p>

        <div className="lab-detail-meta">
          <span>{formatDate(event.date)}</span>
          <span>{event.time}</span>
          <span>{event.city}</span>
          <span>{event.capacity}</span>
        </div>

        {/* 開催概要を Hero 直下に、罫線だけで整理して置く */}
        <div className="lab-hero-index" style={{ margin: "40px 0 0" }}>
          <div>
            <strong>{event.date.split("-")[1]}</strong>
            <span>MONTH</span>
          </div>
          <div>
            <strong>{event.date.split("-")[2]}</strong>
            <span>DAY</span>
          </div>
          <div>
            <strong>{event.city}</strong>
            <span>AREA</span>
          </div>
        </div>
      </header>

      <article className="lab-article">
        <div className="lab-prose">
          <h2>この日にやること</h2>
          {event.body.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}

          <h2>当日の流れ</h2>
          <ol style={{ listStyle: "none", padding: 0 }}>
            {event.timetable.map((row) => (
              <li
                key={row.time}
                style={{
                  display: "grid",
                  gridTemplateColumns: "84px 1fr",
                  gap: 18,
                  borderTop: "1px solid var(--lab-line)",
                  padding: "14px 0",
                  margin: 0,
                }}
              >
                <b
                  style={{
                    fontFamily: "var(--font-label)",
                    letterSpacing: "0.06em",
                    color: "var(--lab-blue)",
                  }}
                >
                  {row.time}
                </b>
                <span>{row.label}</span>
              </li>
            ))}
          </ol>

          <div className="lab-profile">
            <h2
              className="lab-label"
              style={{ color: "var(--lab-blue)", marginBottom: 20 }}
            >
              EVENT DETAIL
            </h2>
            <dl>
              <dt>開催日</dt>
              <dd>{formatDate(event.date)}</dd>
              <dt>時間</dt>
              <dd>{event.time}</dd>
              <dt>会場</dt>
              <dd>{event.venue}</dd>
              <dt>定員</dt>
              <dd>{event.capacity}</dd>
              <dt>参加費</dt>
              <dd>{event.fee}</dd>
            </dl>
          </div>

          {!closed && (
            <p style={{ marginTop: 36 }}>
              <a
                href={SITE.line}
                target="_blank"
                rel="noopener noreferrer"
                className="lab-button"
                style={{ display: "inline-flex", marginTop: 0 }}
              >
                公式LINEから申し込む
                <ArrowUpRight width={20} height={20} aria-hidden="true" />
              </a>
            </p>
          )}
        </div>
      </article>

      {companies.length > 0 && (
        <section className="lab-section lab-ruled">
          <div className="lab-section-head">
            <div>
              <p className="lab-label">COMPANIES</p>
              <h2>この回に関わる企業。</h2>
            </div>
            <Link href="/companies">
              企業一覧
              <ArrowUpRight width={18} height={18} aria-hidden="true" />
            </Link>
          </div>
          <div className="lab-grid-4">
            {companies.map((company) => (
              <StoryCard
                key={company.slug}
                company={company}
                sizes="(max-width: 760px) 100vw, 22vw"
              />
            ))}
          </div>
        </section>
      )}

      <PageCTA
        title={
          <>
            ほかの回も、
            <br />
            見てみる。
          </>
        }
        href="/events"
        cta="イベント一覧へ"
      />
    </>
  );
}
