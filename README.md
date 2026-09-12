# 関西就活ラボ

関西の就活生へ、まだ知らない企業との出会いを届ける就活メディア。

トップページのビジュアル言語をサイト全体のデザインシステムとして再定義し、
全下層ページ・詳細ページへ展開した Next.js 実装です。

## 技術構成

- Next.js 15 (App Router) / React 19 / TypeScript
- Tailwind CSS v4 + `src/app/globals.css` のデザインシステム
- アニメーションライブラリなし（CSS と Web API のみ）

## 開発

```bash
npm install
npm run dev        # http://localhost:3000
npm run build
```

## ルート

| パス | 内容 |
|---|---|
| `/` | トップ。3Dインタビュー・カルーセル |
| `/companies` | 企業一覧（`?cat=` 業種 / `?pref=` 地域で絞り込み） |
| `/companies/[slug]` | 企業インタビュー詳細 |
| `/interviews` | インタビュー一覧 |
| `/events` `/events/[slug]` | イベント |
| `/knowhow` `/knowhow/[slug]` | 就活ノウハウ |
| `/about` | 関西就活ラボについて |
| `/for-companies` | 企業の方へ |

## デザインシステム

`DESIGN-SYSTEM.md` に、トップページから実測抽出したトークンと共通言語をまとめています。

要点だけ挙げると、このサイトの「未来感」は次の6つで構成されていて、
**グラデーション・ガラスモーフィズム・ネオンは一切使っていません。**

1. 斜めの面 — `transform: skew(-15deg)` のブルー面
2. 切り欠き — 角丸ではなく `clip-path` で角を斜めに落とす
3. 細いグリッド — 88px、`mask-image` で片側へフェード
4. 楕円軌道 — `rotate(-28deg) scaleY(.56)`
5. アウトライン文字 — `-webkit-text-stroke: 1px`
6. 低彩度写真 — `saturate(.4) contrast(1.07)`

日本語見出しは負の字詰め（`-.04em`〜`-.055em`）、英字ラベルは正の字送り（`+.12em`〜`.16em`）。
この対比がブランドの指紋です。

DARK（ネイビー/ブルー/ライム）と LIGHT（白/`#f7f9fc`/ネイビー文字）を
ページ内で交互に切り替えてリズムを作ります。長文は必ず LIGHT 面に置きます。

## 3D インタビュー・カルーセル

`src/components/InterviewCarousel.tsx` は挙動の契約が多いコンポーネントです。
**変更前に必ず `npm run verify:carousel` を通してください。**

特に次は変更しないこと。

- 指を右へ動かす（`dx > 0`）と `--orbit-turn` が増え、視覚的にも右へ回る
- 感度 PC `0.24` / SP(`<761px`) `0.38`
- 自動回転 65秒/周
- 停止条件: reduced-motion / タブ非表示 / チェックボックス off / ドラッグ中 / hover / focus-visible 内包 / ドラッグ後 1400ms
- 横8px以上動いたときだけ回転に入り、縦はページスクロールに譲る
- ドラッグ直後 500ms のクリック抑止

## 検証

Playwright を使ったブラウザ検証を用意しています（dev server を起動した状態で実行）。

```bash
npm run dev                 # 別ターミナルで :3000 を起動
npm run verify              # 全ルート × Desktop/Mobile：ステータス・console error・横スクロール
npm run verify:carousel     # 3Dカルーセルの挙動15項目
npm run verify:a11y         # alt / h1 / キーボード / focus-visible / ドロワー
npm run verify:nojs         # JS無効時にコンテンツが消えないこと
npm run verify:overlap      # アウトライン文字が本文に掛からないこと
npm run verify:ornament     # 装飾要素がレイアウトを占有していないこと（下記）
npm run verify:index        # /knowhow の目次が幅ごとに正しい形になること
npm run shots               # 全景スクリーンショットを .screenshots/ に出力
```

`BASE`（既定 `http://localhost:3000`）と `CHROME_PATH` で上書きできます。

### `verify:ornament` について

`.lab-orbit` は `aspect-ratio: 1` と `width: 110%` を持つため、
`position: absolute` が外れると **2,000px 以上の空白としてレイアウトを占有します。**

これは `.lab-detail-hero > *` や `.lab-feature-stage > *` のような
直接子セレクタで `position: relative` を当てると起きます。
装飾要素を除外するため、必ず `> :not([aria-hidden="true"])` を使ってください。

同じ事故を2回起こしているので、装飾まわりのCSSを触ったら必ずこのテストを通してください。

## コンテンツ

`CONTENT-TODO.md` に、実データと仮テキストの区別および差し替え箇所をまとめています。
**公開前に必ず確認してください。**
