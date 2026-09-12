# 差し替えが必要なコンテンツ

このリポジトリは、共有された**トップページのエクスポートHTML**を唯一の入力として構築されています。
本番サイト（`kansai-shukatsu-lab.vercel.app`）はこの作業環境のネットワークポリシーで遮断されており、
**下層ページの実コンテンツは取得できませんでした。**

そのため、以下を明確に区別しています。

---

## 実データ（エクスポートから抽出・改変していない）

| 項目 | 内容 |
|---|---|
| 企業9社 | slug / 社名 / 所在地 / 業種 / 取材対象者の氏名・役職 |
| 画像11点 | ロゴ、大阪の街並み、代表者ポートレート9点（`public/images/`） |
| ルート構成 | `/companies` `/interviews` `/events` `/knowhow` `/about` `/for-companies` と詳細 |
| フィルタ値 | `?cat=` 14種 / `?pref=` 7種 |
| ナビ・フッター | 6項目のラベルとリンク先 |
| 公式LINE | `https://line.me/R/ti/p/@381flauo` |
| Instagram | `https://www.instagram.com/kansai_shukatsu_lab` |
| トップページ文言 | Hero・INTERVIEWS・FIND YOUR NEXT・EVENTS・KEEP IN TOUCH の全コピー |
| 3Dカルーセル | CSS・JSの実装仕様（回転速度・感度・停止条件まで） |

---

## 仮テキスト（要差し替え）

| ファイル | 差し替える箇所 |
|---|---|
| `src/data/companies.ts` | `title` / `excerpt` / `lead` / `chapters` / `profile`。**9社すべて同じ `PLACEHOLDER_CHAPTERS` を参照している**ので、取材原稿ごとに個別の `chapters` を書いてください。 |
| `src/data/events.ts` | 3件すべて。日付・会場・定員・当日の流れ・本文。 |
| `src/data/knowhow.ts` | 6記事すべて。`sections` の本文。 |
| `src/app/about/page.tsx` | `VALUES`（4項目）と `PROCESS`（4工程）の文言、PURPOSE の本文。 |
| `src/app/for-companies/page.tsx` | `SERVICES` / `FLOW` / `FIGURES` の内容。**`FIGURES` は実績値なので、実数に置き換えるまで公開しないでください。** |

`src/data/*.ts` は型が付いているので、CMS や JSON に差し替える場合も
`Company` / `LabEvent` / `Article` 型を満たせばページ側の変更は不要です。

---

## 既存の本番ソースがある場合

本番の Next.js ソースが手元にある場合、このリポジトリを丸ごと使うのではなく、
**デザインレイヤーだけを移植する**ほうが安全です。移植対象は次の3つです。

1. `src/app/globals.css` — デザイントークンと `lab-*` の共通言語（全2800行）
2. `src/components/` — `PageHero` / `PageCTA` / `SectionLabel` / `cards` / `Reveal` / `Header` / `Footer`
3. `DESIGN-SYSTEM.md` — 抽出したデザイン仕様

`src/components/InterviewCarousel.tsx` は**既存実装がある場合は移植しないでください。**
本番側の実装をそのまま残すのが最も安全です。
