# 関西就活ラボ — Design System
**Source of Truth: トップページ（`lab-home`）**
このドキュメントは添付トップページのエクスポートHTML/CSSから機械的に抽出したものです。
推測・創作は含みません。すべて実測値です。

---

## 1. Design Tokens

### 1.1 Core Palette（トップページ実測）

| Token | 値 | 用途（トップページでの実使用箇所） |
|---|---|---|
| `--lab-dark` | `#080f1d` | Hero背景 / `#stories.lab-interview-orbit` 背景 / faces枠線 |
| `--lab-navy` | `#10182b` | `.lab-finder` 背景（FIND YOUR NEXT） |
| `--lab-navy-alt` | `#131925` | `.lab-finder` 基底色 / `.lab-filter-row a:hover` 文字色 |
| `--lab-ink` | `#121722` | `.lab-home` 本文色 / `.lab-button` 背景 |
| `--lab-blue` | `#234ee8` | アクセント（見出しspan / arrow / label） |
| `--lab-blue-solid` | `#2855ed` | Hero斜め面（`:before`）の塗り |
| `--lab-lime` | `#b9f55e` | label罫線 / Hero見出しspan / CTAボタン / orbit focus |
| `--lab-light` | `#f7f9fc` | `#stories` セクション背景 |
| `--lab-paper` | `#ffffff` | 基底背景 |
| `--lab-muted` | `#ced5e1` | Hero本文（dark面） |
| `--lab-muted-2` | `#515966` | 本文サブ（light面）/ meta |
| `--lab-muted-3` | `#4a505c` | `.lab-intro`（light面） |
| `--lab-line` | `#cdd1d8` | light面の罫線 |
| `--lab-line-dark` | `#525761` | dark面の罫線（filter / values） |
| `--lab-line-faint` | `#667080` | filterチップ枠線 |

### 1.2 Tailwind theme（エクスポートの `@layer theme` 実測）

```
--color-navy-950:#060f21   --color-navy-900:#0a1730   --color-navy-800:#0f2140
--color-navy-700:#142b4e   --color-navy-600:#1c3a63   --color-navy-500:#2c5182
--color-navy-400:#4d74ab   --color-navy-300:#85a3d1   --color-navy-50:#eef2f9
--color-accent-700:#1f38a3 --color-accent-600:#2648cc --color-accent-500:#3763ea
--color-accent-200:#b7ccff --color-accent-100:#dbe6ff
--color-ink:#10182c        --color-paper:#fff         --container-8xl:96rem
```

### 1.3 Typography

```
--font-display : "Hiragino Sans", "Noto Sans CJK JP", "Yu Gothic", sans-serif
--font-label   : Arial, Helvetica, sans-serif   ← 英字ラベル・アウトライン文字専用
```

| 役割 | 指定 |
|---|---|
| Hero h1 (dark) | `clamp(42px, 5.4vw, 86px)` / `weight:900` / `letter-spacing:-.055em` / `line-height:1.36` |
| Hero h1 (light) | `clamp(38px, 4.6vw, 80px)` / `weight:900` / `-.055em` / `1.32` |
| Section h2 | `clamp(24px, 2.6vw, 40px)` / `weight:700` / `-.04em` / `1.45` |
| Card h3 | `1.125rem` / `weight:700` / `1.7` |
| `.lab-label` | `--font-label` / `.875rem` / `weight:600` / `letter-spacing:.12em` |
| `.lab-label`(hero) | `letter-spacing:.16em` / 色 `#d4dded` / 先頭にライム罫線 `32×2px` |
| 本文 | `1rem` / `line-height:1.9`（dark面）・`1.8〜2.0`（light面） |
| meta / 補助 | `.875rem`、figcaption `.75rem` / `letter-spacing:.1〜.15em` |

**日本語の詰め**: 見出しは必ず負のletter-spacing（`-.04em`〜`-.055em`）。英字ラベルは正の`+.12em`〜`.16em`。この対比がブランドの指紋。

### 1.4 Spacing / Layout

```
セクション余白  : padding: 72px 5vw          （SP: 44px 6vw）
Hero copy      : clamp(68px,7vw,116px) 0 100px 5vw
scroll-margin  : 85px（固定ヘッダー分）
Header高さ     : 64px (h-16) / md以上 80px (h-20)
最大幅         : max-w-8xl = 96rem
Hero grid      : 1.12fr 1fr（dark）/ 1.1fr 1fr（light）
Stories grid   : repeat(4, minmax(0,1fr)) / gap 24px
```

### 1.5 Breakpoints（実測・厳守）

| 帯 | 条件 | 方針 |
|---|---|---|
| Desktop | `1101px〜` | フルレイアウト |
| Tablet | `761〜1100px` | grid維持・gap縮小・Hero下部padding増 |
| Mobile | `〜760px` | 1カラム化・横スクロール+snap・ornament縮小 |

---

## 2. Visual Language（このサイトの「未来感」の実体）

グラデーション/ガラス/ネオンは**一切使われていない**。未来感は次の6要素で作られている。

### 2.1 斜めの面（Diagonal Plane）
```css
.lab-hero-future:before{
  background:#2855ed; width:56%; height:110%;
  top:0; right:-8%; transform:skew(-15deg);
}
```
SPでは `width:94%; height:420px; top:270px; right:-30%; skew(-17deg)`。
→ **下層ページHeroでも同じ`skew(-15deg)`のブルー面を右側に置く**のが統一の核。

### 2.2 切り欠き（Clip-path）
```css
/* Hero画像 PC */ clip-path: polygon(22% 0, 100% 0, 100% 82%, 82% 100%, 0 100%, 0 32%);
/* Hero画像 SP */ clip-path: polygon(15% 0, 100% 0, 100% 80%, 85% 100%, 0 100%, 0 20%);
/* CTAボタン   */ clip-path: polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 0 100%);
```
角丸ではなく**角を斜めに落とす**。`rounded-2xl`は使わない。

### 2.3 細いグリッド
```css
background-image:
  linear-gradient(#a6bcff0c 1px, transparent 1px),
  linear-gradient(90deg, #a6bcff0c 1px, transparent 1px);
background-size: 88px 88px;
mask-image: linear-gradient(110deg, #000, transparent 72%);
```
透明度`0c`（約5%）。**maskで片側へフェード**させるのが肝。

`#stories`（light面）では縦罫線のみ:
```css
background: linear-gradient(90deg, transparent calc(100% - 1px), #1c3b7110 1px) 0 0/25% 100%, #f7f9fc;
```

### 2.4 楕円軌道（Orbit）
```css
.lab-orbit    { border:1px solid #c5d7ff50; border-radius:50%; aspect-ratio:1;
                width:85%; top:3%; right:-22%; transform:rotate(-28deg) scaleY(.56); }
.lab-orbit-two{ border-color:#abc5ff24; width:110%; top:-5%; right:-27%; }
```
`scaleY(.56)`で潰した円 + `rotate(-28deg)`。これが「軌道」の見え方を決めている。

`.lab-finder:before` は別種の円（`650×650`、`box-shadow: 0 0 0 65px #ffffff04, 0 0 0 130px #ffffff03` で多重リング）。

### 2.5 アウトライン文字
```css
.lab-future-word{
  color:transparent; -webkit-text-stroke:1px #dce7ff38;
  font:900 clamp(100px,18.4vw,310px)/0.9 Arial, Helvetica, sans-serif;
  letter-spacing:-.06em; position:absolute; bottom:60px; left:3.5vw;
}
```
SP: `font-size:24vw; bottom:150px; left:-1vw`。
`.lab-orbit-backdrop` は `-webkit-text-stroke:1px #b9d0ff20` / `clamp(40px,7vw,110px)`。
→ **下層ページは `COMPANIES` / `INTERVIEWS` / `EVENTS` / `KNOWHOW` / `ABOUT` / `FOR COMPANY` を同じ処方で配置**。

### 2.6 写真の扱い
```css
.lab-hero-image img        { filter: saturate(.4) contrast(1.07); }  /* dark面 */
.lab-hero .lab-hero-image img { filter: saturate(.65); }              /* light面 */
.lab-story:hover img       { transform: scale(1.035); transition: transform .5s; }
```
dark面の画像には必ず二重オーバーレイ:
```css
background: linear-gradient(#12264f00 45%, #080f1dcb),
            linear-gradient(100deg, #1c43c058, #15369308);
```

---

## 3. Components（既存クラス → 下層ページへの展開指針）

| 既存クラス | 役割 | 下層展開 |
|---|---|---|
| `.lab-label` + `.lab-label-rule` | 英字ラベル＋ライム罫線 | `SectionLabel` としてそのまま全ページ |
| `.lab-hero-future` | dark Hero一式 | `PageHero` の親。斜め面・grid・orbit・outline語を継承 |
| `.lab-section` / `.lab-section-head` | セクション枠・見出し行 | 全下層共通。h2 + 右端にテキストリンク |
| `.lab-button` | CTA（切り欠き付き） | `PrimaryButton`。dark面=lime背景/navy文字、light面=ink背景/白文字 |
| `.lab-story` / `.lab-story-photo` / `.lab-story-arrow` | 4:5写真カード＋右下arrow | `InterviewCard` / `CompanyCard` / `ArticleCard` の基底 |
| `.lab-filter-row` / `.lab-industries` | dark面フィルタ（角型チップ・罫線区切り） | `/companies` フィルタはこれを正とする |
| `.lab-connect` | 2カラム＋中央縦罫線 | `PageCTA` / 関連セクション |
| `.lab-carousel` 一式 | 3Dメリーゴーランド | **触らない**（§4） |
| `.lab-about-hero` / `.lab-values` / `.lab-process` | 既に存在するabout用CSS | `/about` は既存クラスを拡張する形で |

**既に `/about` 用のCSS（`.lab-about-hero` `.lab-about-intro` `.lab-values` `.lab-process` `.lab-contact`）がglobal CSSに存在する**ため、`/about`は新規作成ではなく既存の延長として扱うこと。

### ボタンの2系統
```css
/* light面 */ .lab-button        { background:#121722; color:#fff; }
              .lab-button:hover  { background:var(--lab-blue); }
/* dark面  */ .lab-hero-future .lab-button       { background:#b9f55e; color:#080f1d; font-weight:700;
                                                   clip-path:polygon(0 0,calc(100% - 14px) 0,100% 14px,100% 100%,0 100%); }
              .lab-hero-future .lab-button:hover { background:#fff; }
```
共通: `display:inline-flex; justify-content:space-between; gap:44px; padding:18px 24px;`
→ **文字とarrowが左右に離れる**のが特徴。中央寄せの丸ボタンにしないこと。

---

## 4. 3D メリーゴーランド — 変更禁止の契約

### 4.1 CSS構造
```css
.lab-carousel      { --orbit-radius: clamp(250px,31vw,430px);
                     --orbit-card-width: clamp(155px,15.5vw,220px);
                     --orbit-speed: 65s; }
.lab-orbit-stage   { perspective:1300px; perspective-origin:50% 40%; height:520px; }
.lab-carousel-ring { transform-style:preserve-3d; position:absolute; top:38%; left:50%; }
.lab-orbit-card    { transform: rotateY(var(--card-angle)) translateZ(var(--orbit-radius)); }
.lab-orbit-face    { transform: rotateY(calc(-1 * var(--card-angle))); }  /* 逆回転で正対 */
```
SP: `--orbit-radius:210px; --orbit-card-width:138px; perspective:1000px; height:390px;`

### 4.2 操作方向（最重要・絶対不変）
```js
angle = gesture.angle + dx * (window.innerWidth < 761 ? 0.38 : 0.24);
root.style.setProperty("--orbit-turn", `${angle}deg`);
```
```css
.lab-carousel[data-orbit-interactive] .lab-carousel-ring{
  transform: rotateX(-10deg) rotateY(var(--orbit-turn,0deg)); animation:none!important; }
.lab-carousel[data-orbit-interactive] .lab-orbit-face{
  transform: rotateY(calc(-1 * var(--card-angle) - var(--orbit-turn,0deg))); animation:none!important; }
```
**指を右へ(dx>0) → angle増 → rotateY正方向。この符号を反転させない。** 係数 `0.24`(PC) / `0.38`(SP) も維持。

### 4.3 挙動仕様
- 自動回転: `elapsed * 360 / 65000` deg/ms（= 65秒/周）
- 一時停止条件: `prefers-reduced-motion` / `document.hidden` / チェックボックスoff / ドラッグ中 / マウスhover中 / `:focus-visible` 内包時 / ドラッグ後 `1400ms`
- 方向判定: 移動量8px超で horizontal / vertical を確定。verticalならページスクロールに譲る（`touch-action: pan-y pinch-zoom`）
- ドラッグ後 `500ms` は click を capture 段階で抑止（誤遷移防止）
- 非JS環境: `animation-timeline: scroll()` による横スクロール連動フォールバック（`@supports`内、2160deg = 6周）
- クリーンアップ: `AbortController` + `cancelAnimationFrame`

---

## 5. Motion

| 対象 | 指定 |
|---|---|
| Hero画像ドリフト | `18s ease-in-out infinite alternate` / `scale(1) → scale(1.065) translateY(-1%)` |
| Orbit揺らぎ | `14s ease-in-out infinite alternate` / `rotate(-28deg) scaleY(.56) → rotate(-20deg) scaleY(.6)` |
| カード写真hover | `transform .5s` / `scale(1.035)` |
| ボタンhover | `background .2s` |
| faces hover | `transform .25s` / `translateY(-8px)` |
| ヘッダー | `transition-all duration-300` |

全て `@media (prefers-reduced-motion: no-preference)` でガード済み。**新規モーションも同じガードを付けること。**

---

## 6. Header / Footer

### Header
```
fixed inset-x-0 top-0 z-50 transition-all duration-300
h-16 md:h-20 / px-6 md:px-10 lg:px-16 / max-w-8xl
ロゴ: 36px(md:40px) 円形 + ring-1 ring-white/40
       上段「関西就活ラボ」15px(md:16px) / 下段「KANSAI SHUKATSU LAB」10px tracking-[.2em] （md以上のみ表示）
nav : hidden xl:flex / gap-5 / text-sm / text-white/85 hover:text-white
LINE: rounded-full bg-[#06C755] px-4 py-2.5 text-[13px] font-semibold / hover:scale-[1.03] / md以上
```
nav表示は **`xl`（1280px）以上**。それ未満はハンバーガー。

### Footer / ナビ構成（実測）
```
企業を探す      /companies
インタビュー     /interviews
就活イベント     /events
就活ノウハウ     /knowhow
関西就活ラボについて /about
企業の方へ       /for-companies
公式LINE  https://line.me/R/ti/p/@381flauo
Footer見出し: SITEMAP / OTHERS
Footerコピー : 関西の就活生へ、まだ知らない企業との出会いを。
© 2026 関西就活ラボ
```

---

## 7. 確定しているルート / データ

```
/                         トップ
/companies                一覧（?cat= / ?pref= のクエリフィルタあり）
/companies/[slug]         企業詳細  ← インタビューもここに集約されている
/interviews               インタビュー一覧
/events                   イベント
/knowhow                  ノウハウ
/about                    ラボについて
/for-companies            企業の方へ
```

### `?cat=` 実値（14種）
`IT・SaaS` `メーカー` `建設` `商社` `サービス` `人材` `物流` `金融` `不動産` `小売` `食品` `広告・マーケティング` `コンサル` `その他`

### `?pref=` 実値（7種）
`大阪府` `京都府` `兵庫県` `奈良県` `滋賀県` `和歌山県` `その他の地域`

### 企業 9件（slug / 地域 / 業種 / 取材対象者）
| slug | 地域 | 業種 | 人物 |
|---|---|---|---|
| `yamagata-harness` | 山形県 | メーカー | 代表取締役 水口啓一氏 |
| `shoei-seiki` | 山梨県 | メーカー | 代表取締役 佐藤元章氏 |
| `nagata-reiki` | 熊本県 | 建設 | 経営企画室 永田雄大氏 |
| `chuo-denko` | 静岡県 | 建設 | 代表取締役社長 富岡賢氏 |
| `hatta-keiami` | 福井県 | メーカー | 代表取締役 八田嘉一郎氏 |
| `s-pack` | 山形県 | メーカー | 代表取締役社長 佐藤健太郎氏 |
| `inoue-ribbon` | 福井県 | メーカー | 代表取締役社長 井上博之氏 |
| `osaka-meiban` | 大阪府 | メーカー | 代表取締役社長 山口徹氏 |
| `maru-taka` | 東京都 | 建設 | 代表取締役社長 高沢治世子氏 |

> 注: 「関西就活ラボ」だが掲載企業の所在地は関西外を含む。これは実データのため改変しないこと。

### トップページのセクション文言（実測）
```
Hero      KANSAI SHUKATSU LAB / まだ知らない、自分の未来へ。/ FUTURE
          企業の名前より、そこで働く人の話を。関西の就活生へ届ける、仕事との出会い。
          KANSAI, JAPAN / YOUR NEXT STARTS HERE
Stories   INTERVIEWS / 働く人から、知っていく。/ backdrop: NEXT / PERSPECTIVE
          hint: 左右にスワイプで回転 · タップで記事へ
Finder    FIND YOUR NEXT / 気になる場所、仕事から。/ 地域
Events    EVENTS / 次は、直接話そう。/ 少人数で、企業の人と話せるイベントを準備中。
Connect   KEEP IN TOUCH / 就活のヒントを、日常に。/ イベントのお知らせや就活情報を届けます。
```

---

## 8. 下層ページ Hero 処方（この仕様から導かれる設計）

```
.lab-page-hero  ← .lab-hero-future から継承
├ background: #080f1d
├ :before      斜めブルー面 skew(-15deg) / #2855ed / right:-8% / width:56%
├ .lab-hero-grid   88px細グリッド + mask-image:linear-gradient(110deg,...72%)
├ .lab-orbit ×2    rotate(-28deg) scaleY(.56)
├ .lab-future-word アウトライン英字（COMPANIES / INTERVIEWS / …）
│                  -webkit-text-stroke:1px #dce7ff38
└ .lab-hero-copy
   ├ .lab-label + .lab-label-rule   「COMPANIES / KANSAI SHUKATSU LAB」
   ├ h1   clamp(42px,5.4vw,86px) / 900 / -.055em  一部を #b9f55e で強調
   └ .lab-intro  #ced5e1 / 1rem / 1.9
```
**トップHeroとの差別化**: 高さを `min(880px,100svh)` → `min(560px,70svh)` 程度に抑え、
`.lab-hero-people`（顔写真スタック）は置かない。斜め面の角度と色は共通のまま。

### 読み物ページの原則
詳細ページ（企業詳細 / 記事詳細 / イベント詳細）は
**Heroのみ dark、本文は `#ffffff` / `#f7f9fc` + `#121722` 文字**。
本文最大幅は `--container-3xl`(48rem) 前後、`line-height: 1.9〜2.0`。
