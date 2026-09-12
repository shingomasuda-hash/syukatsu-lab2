import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, MapPin, Users, Clock } from "lucide-react";
import { sortedEvents, eventStatus } from "@/data/events";
import { PageHero } from "@/components/PageHero";
import { PageCTA } from "@/components/PageCTA";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "就活イベント",
  description:
    "少人数で、企業の人と直接話せる関西就活ラボのイベント情報。開催予定と過去の開催。",
};

/** 日付を 09 / 28 の2段に割る */
function splitDate(iso: string) {
  const [, month, day] = iso.split("-");
  return { month, day };
}

export default function EventsPage() {
  const list = sortedEvents();
  const upcoming = list.filter((e) => eventStatus(e) === "upcoming");

  return (
    <>
      <PageHero
        label="EVENTS"
        title={
          <>
            次は、
            <br />
            <span>直接話そう。</span>
          </>
        }
        intro="少人数で、企業の人と話せる場をつくっています。聞きたいことが残ったまま帰らないための設計です。"
        word="EVENTS"
        index={[
          { value: String(upcoming.length), label: "UPCOMING" },
          { value: String(list.length), label: "TOTAL" },
        ]}
      />

      <section className="lab-section lab-surface-light">
        <div className="lab-section-head">
          <div>
            <p className="lab-label">SCHEDULE</p>
            <h2>開催予定と、これまで。</h2>
          </div>
        </div>

        <Reveal>
          {list.map((event) => {
            const { month, day } = splitDate(event.date);
            const status = eventStatus(event);
            const closed = status === "closed";

            return (
              <Link
                key={event.slug}
                href={`/events/${event.slug}`}
                className={`lab-event${closed ? " lab-event-closed" : ""}`}
              >
                {/* 日付を大きなタイポグラフィとして扱う */}
                <div className="lab-event-date">
                  <b>{month}</b>
                  <i>{day}</i>
                  <u>{event.city}</u>
                </div>

                <div className="lab-event-body">
                  <span
                    className={`lab-status ${
                      closed ? "lab-status-closed" : "lab-status-upcoming"
                    }`}
                  >
                    {closed ? "ENDED" : "OPEN"}
                  </span>
                  <h3 style={{ marginTop: 14 }}>{event.title}</h3>
                  <p>{event.excerpt}</p>
                  <div className="lab-event-facts">
                    <span>
                      <Clock width={14} height={14} aria-hidden="true" />
                      {event.time}
                    </span>
                    <span>
                      <MapPin width={14} height={14} aria-hidden="true" />
                      {event.venue}
                    </span>
                    <span>
                      <Users width={14} height={14} aria-hidden="true" />
                      {event.capacity}
                    </span>
                  </div>
                </div>

                <span className="lab-event-go">
                  {closed ? "開催レポート" : "詳細を見る"}
                  <ArrowUpRight width={16} height={16} aria-hidden="true" />
                </span>
              </Link>
            );
          })}
        </Reveal>
      </section>

      <PageCTA
        label="KEEP IN TOUCH"
        title={
          <>
            開催のお知らせは、
            <br />
            LINEで届きます。
          </>
        }
        href="/about"
        cta="関西就活ラボについて"
      />
    </>
  );
}
