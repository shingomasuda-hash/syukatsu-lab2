import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { PageCTA } from "@/components/PageCTA";
import { Reveal } from "@/components/Reveal";
import { companies } from "@/data/companies";

export const metadata: Metadata = {
  title: "関西就活ラボについて",
  description:
    "名前より、中身を知る。関西就活ラボがなぜ企業を取材し、学生へ届けているのか。",
};

/** 線と数字とタイポグラフィで見せる。角丸カード3枚にはしない。 */
const VALUES = [
  {
    no: "01",
    en: "KNOW",
    title: "名前より、中身を知る。",
    body: "知名度は、その会社で何が起きているかを何も説明しません。私たちは規模ではなく、働いている人の言葉から会社を紹介します。",
  },
  {
    no: "02",
    en: "MEET",
    title: "読むだけで、終わらせない。",
    body: "記事を読んで終わりではなく、実際に会える場までをひとつづきに設計しています。少人数のイベントを続けているのはそのためです。",
  },
  {
    no: "03",
    en: "HONEST",
    title: "良いところだけを、書かない。",
    body: "採用広報の代行はしません。厳しさや向き不向きも含めて聞き、そのまま載せます。入ってから違ったと思われることが、一番の失敗だからです。",
  },
  {
    no: "04",
    en: "LOCAL",
    title: "関西から、選択肢を増やす。",
    body: "東京に出なければ選べない、という前提を外したい。地元で働くことが妥協ではなく選択になるだけの情報量を用意します。",
  },
];

const PROCESS = [
  {
    no: "STEP 01",
    title: "取材",
    body: "経営者だけでなく、現場で働く人にも時間をもらいます。同じ質問を複数の人に聞くことで、会社の輪郭が見えてきます。",
  },
  {
    no: "STEP 02",
    title: "編集",
    body: "話をそのまま並べるのではなく、就活生が判断できる形に整理します。何が強みで、何が向いていないかを曖昧にしません。",
  },
  {
    no: "STEP 03",
    title: "発信",
    body: "記事とLINE、Instagramで届けます。長文を読む前に、何がある会社なのかが分かる構成を心がけています。",
  },
  {
    no: "STEP 04",
    title: "出会い",
    body: "記事で気になった企業と、実際に話せる場をつくります。読むことと会うことのあいだを、できるだけ短くします。",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        label="ABOUT THE LAB"
        title={
          <>
            名前より、
            <br />
            <span>中身を知る。</span>
          </>
        }
        intro="大手だけが正解じゃない。関西の就活生が、自分で選ぶための材料をつくっています。"
        word="ABOUT"
        index={[
          { value: String(companies.length), label: "COMPANIES COVERED" },
          { value: "2026", label: "SINCE" },
        ]}
      />

      {/* PURPOSE */}
      <section className="lab-section lab-surface-paper">
        <div className="lab-section-head">
          <div>
            <p className="lab-label">PURPOSE</p>
            <h2>なぜ、関西就活ラボをやるのか。</h2>
          </div>
        </div>
        <Reveal className="lab-about-intro">
          <div>
            <p>
              就活を始めた学生の多くが、最初に見るのは名前を知っている会社です。それ自体は自然なことですが、
              知らない会社は選択肢に入らないまま終わります。
            </p>
            <p>
              関西には、学生がまだ知らないだけの企業がたくさんあります。知られていないことと、
              良くないことは、まったく別のことです。
            </p>
          </div>
          <div>
            <p>
              だから私たちは、会社の規模や知名度ではなく、そこで働いている人の話を取材して届けています。
              何を作っているのか、どんな判断をしているのか、どこが大変なのか。
            </p>
            <p>
              判断材料さえあれば、選ぶのは学生自身です。私たちの仕事は、
              その材料を増やすことだと考えています。
            </p>
          </div>
        </Reveal>
      </section>

      {/* VALUES */}
      <section className="lab-section lab-surface-dark lab-ring-ornament">
        <div className="lab-hero-grid" aria-hidden="true" />
        <div className="lab-section-head">
          <div>
            <p className="lab-label">
              <span className="lab-label-rule" aria-hidden="true" />
              VALUES
            </p>
            <h2>大切にしていること。</h2>
          </div>
        </div>
        <Reveal className="lab-values">
          {VALUES.map((value) => (
            <div key={value.no}>
              <span className="lab-value-no" aria-hidden="true">
                {value.no}
              </span>
              <span className="lab-value-en">{value.en}</span>
              <h3>{value.title}</h3>
              <p>{value.body}</p>
            </div>
          ))}
        </Reveal>
      </section>

      {/* PROCESS */}
      <section className="lab-section lab-ruled">
        <div className="lab-section-head">
          <div>
            <p className="lab-label">PROCESS</p>
            <h2>取材から、出会いまで。</h2>
          </div>
        </div>
        <Reveal>
          <ol className="lab-process">
            {PROCESS.map((step) => (
              <li key={step.no}>
                <span className="lab-process-no">{step.no}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </li>
            ))}
          </ol>
        </Reveal>
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
