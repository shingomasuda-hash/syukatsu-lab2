import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { PageCTA } from "@/components/PageCTA";
import { Reveal } from "@/components/Reveal";
import { companies } from "@/data/companies";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "企業の方へ",
  description:
    "関西就活ラボの取材・掲載について。採用広報の代行ではなく、学生が判断できる記事をつくります。",
};

/** できること */
const SERVICES = [
  {
    key: "INTERVIEW",
    title: "経営者・現場社員への取材",
    body: "代表の方だけでなく、実際に現場で働いている方にも同席いただきます。同じ質問を複数の方に伺うことで、会社の輪郭が立体的になります。",
  },
  {
    key: "ARTICLE",
    title: "記事の編集・制作",
    body: "話を並べるのではなく、学生が判断できる形に編集します。写真撮影を含め、原稿確認のうえで公開します。",
  },
  {
    key: "EVENT",
    title: "少人数イベントへの出展",
    body: "1テーブル6〜8名の形式で、学生と直接話していただきます。大人数の合同説明会とは目的が異なります。",
  },
  {
    key: "DISTRIBUTION",
    title: "LINE・Instagramでの配信",
    body: "記事公開時に、登録している学生へ直接届けます。検索で見つけてもらうのを待つだけにはしません。",
  },
];

/** 取材の流れ */
const FLOW = [
  {
    no: "01",
    title: "お問い合わせ",
    body: "公式LINEまたはInstagramからご連絡ください。事業内容と、採用でお困りのことを伺います。",
  },
  {
    no: "02",
    title: "打ち合わせ",
    body: "オンラインで30分ほど。どなたに取材するか、何を伝えたいかを一緒に整理します。",
  },
  {
    no: "03",
    title: "取材・撮影",
    body: "貴社にお伺いします。所要はおよそ2〜3時間。現場を見せていただけると記事の精度が上がります。",
  },
  {
    no: "04",
    title: "原稿確認",
    body: "公開前に必ずご確認いただきます。事実関係の修正には対応します。",
  },
  {
    no: "05",
    title: "公開・配信",
    body: "記事公開後、LINEとInstagramで配信します。イベント出展をご希望の場合は日程を調整します。",
  },
];

/** メディアの特徴 */
const FIGURES = [
  { value: String(companies.length), unit: "社", label: "これまでに取材した企業" },
  { value: "6", unit: "〜8名", label: "イベント1テーブルあたりの学生数" },
  { value: "100", unit: "%", label: "公開前の原稿確認" },
];

export default function ForCompaniesPage() {
  return (
    <>
      <PageHero
        label="FOR COMPANY"
        title={
          <>
            伝わらないのは、
            <br />
            <span>知られていないから。</span>
          </>
        }
        intro="関西就活ラボは、企業の採用広報を代行するメディアではありません。学生が自分で判断できる材料をつくり、その先の出会いまでを設計します。"
        word="FOR COMPANY"
        index={[
          { value: String(companies.length), label: "COMPANIES" },
          { value: "2026", label: "SINCE" },
        ]}
      />

      {/* 掲載・取材について */}
      <section className="lab-section lab-surface-paper">
        <div className="lab-section-head">
          <div>
            <p className="lab-label">ABOUT COVERAGE</p>
            <h2>掲載・取材について。</h2>
          </div>
        </div>
        <Reveal className="lab-about-intro">
          <div>
            <p>
              採用サイトやパンフレットに書かれていることは、どの会社も似た表現になりがちです。
              学生がそこから違いを読み取るのは簡単ではありません。
            </p>
            <p>
              私たちは、良いところだけを並べる記事はつくりません。厳しさや向き不向きも含めて伺い、
              そのまま掲載します。
            </p>
          </div>
          <div>
            <p>
              入社してから「聞いていた話と違った」と思われることが、採用において最も損失が大きいと考えているからです。
            </p>
            <p>
              結果として、記事を読んで応募される方は、事業内容と働き方を理解したうえで来られます。
            </p>
          </div>
        </Reveal>
      </section>

      {/* できること */}
      <section className="lab-section lab-ruled">
        <div className="lab-section-head">
          <div>
            <p className="lab-label">WHAT WE DO</p>
            <h2>できること。</h2>
          </div>
        </div>
        <Reveal>
          <dl>
            {SERVICES.map((service) => (
              <div className="lab-spec" key={service.key}>
                <dt>{service.key}</dt>
                <dd>
                  <h3>{service.title}</h3>
                  <p>{service.body}</p>
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </section>

      {/* メディアの特徴 — 数字を主役に */}
      <section className="lab-section lab-surface-dark lab-ring-ornament">
        <div className="lab-hero-grid" aria-hidden="true" />
        <div className="lab-section-head">
          <div>
            <p className="lab-label">
              <span className="lab-label-rule" aria-hidden="true" />
              MEDIA
            </p>
            <h2>メディアの特徴。</h2>
          </div>
        </div>
        <Reveal className="lab-figures">
          {FIGURES.map((figure) => (
            <div key={figure.label}>
              <strong>
                {figure.value}
                <em>{figure.unit}</em>
              </strong>
              <span>{figure.label}</span>
            </div>
          ))}
        </Reveal>
      </section>

      {/* 取材の流れ */}
      <section className="lab-section lab-surface-paper">
        <div className="lab-section-head">
          <div>
            <p className="lab-label">FLOW</p>
            <h2>取材の流れ。</h2>
          </div>
        </div>
        <Reveal>
          <ol className="lab-flow">
            {FLOW.map((step) => (
              <li key={step.no}>
                <b aria-hidden="true">{step.no}</b>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
      </section>

      {/* 掲載メリット + 問い合わせ */}
      <section className="lab-section lab-surface-light">
        <div className="lab-section-head">
          <div>
            <p className="lab-label">CONTACT</p>
            <h2>まずは、事業の話から。</h2>
          </div>
        </div>
        <div className="lab-contact">
          <p style={{ fontSize: "1rem", lineHeight: 1.9, color: "var(--lab-muted-2)" }}>
            取材のご相談、イベント出展のご検討、掲載内容のご質問など、
            公式LINEまたはInstagramのDMからご連絡ください。
            まずは貴社の事業と、採用でお困りのことを伺うところから始めます。
          </p>
          <a
            href={SITE.line}
            target="_blank"
            rel="noopener noreferrer"
            className="lab-button"
          >
            公式LINEで相談する
            <ArrowUpRight width={20} height={20} aria-hidden="true" />
          </a>
        </div>
      </section>

      <PageCTA
        title={
          <>
            掲載された企業の記事を、
            <br />
            見てみる。
          </>
        }
        href="/companies"
        cta="企業一覧へ"
      />
    </>
  );
}
