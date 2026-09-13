/**
 * 主要テキストに、意図したスタイルが実際に当たっているかを検証する。
 *
 * CSS を書いても、セレクタが DOM と噛み合っていなければ黙って既定値のままになる。
 * 実際 `.lab-prose > p` は章立ての <section> 越しに当たらず、
 * 本文が 16px / 行間1.5 / 段落間0 のまま公開されていた。
 * 見た目の崩れとして現れないため、計算済みスタイルで検査する。
 *
 * 1行あたりの全角文字数は「幅 ÷ font-size」で近似している。
 */
import { chromium } from 'playwright';

const BASE = process.env.BASE ?? 'http://localhost:3000';

// [ルート, セレクタ, 名前, {fontSize:[最小,最大], lineHeight:[最小,最大], cpl:[最小,最大]}]
const CASES = [
  ['/knowhow/how-to-start', '.lab-prose p:not(.lab-pullquote)', '記事本文',
    { fontSize: [16.5, 18], lineHeight: [1.9, 2.2], cpl: [30, 46] }],
  ['/companies/yamagata-harness', '.lab-prose p:not(.lab-pullquote)', '企業詳細の本文',
    { fontSize: [16.5, 18], lineHeight: [1.9, 2.2], cpl: [30, 46] }],
  ['/events/osaka-meetup-09', '.lab-prose p:not(.lab-pullquote)', 'イベント詳細の本文',
    { fontSize: [16.5, 18], lineHeight: [1.9, 2.2], cpl: [30, 46] }],
  ['/companies/yamagata-harness', '.lab-prose h2', '本文見出し',
    { fontSize: [21, 30], lineHeight: [1.4, 1.8] }],
  ['/knowhow', '.lab-index-row h3', '記事タイトル',
    { fontSize: [17, 24], lineHeight: [1.5, 1.8] }],
  ['/', '.lab-intro', 'Heroリード',
    { fontSize: [15, 17], lineHeight: [1.8, 2.0] }],
];

const b = await chromium.launch(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {});
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
let fails = 0;

for (const [route, sel, name, want] of CASES) {
  const p = await ctx.newPage();
  await p.goto(BASE + route, { waitUntil: 'networkidle' });
  const got = await p.evaluate((sel) => {
    const el = document.querySelector(sel);
    if (!el) return null;
    const cs = getComputedStyle(el);
    const fs = parseFloat(cs.fontSize);
    return {
      fontSize: fs,
      lineHeight: (parseFloat(cs.lineHeight) || fs * 1.2) / fs,
      cpl: el.getBoundingClientRect().width / fs,
      marginBottom: parseFloat(cs.marginBottom),
    };
  }, sel);
  await p.close();

  if (!got) { fails++; console.log(`MISS  ${name}（${sel} が見つからない）`); continue; }

  const bad = [];
  for (const [key, [lo, hi]] of Object.entries(want)) {
    const v = got[key];
    if (v < lo || v > hi) bad.push(`${key}=${v.toFixed(2)} (期待 ${lo}〜${hi})`);
  }
  if (bad.length) { fails++; console.log(`FAIL  ${name}: ${bad.join(', ')}`); }
  else {
    console.log(`PASS  ${name.padEnd(18)} ${got.fontSize.toFixed(1)}px / 行間 ${got.lineHeight.toFixed(2)}`
      + (want.cpl ? ` / ${Math.round(got.cpl)}全角` : ''));
  }
}
// 本文見出しの前の間隔が章ごとに揃っているか。
// `.lab-prose h2:first-child` のような指定は各 <section> の先頭 h2 に当たり、
// 章間の間隔だけ静かに潰れる。見た目の崩れにならないので計測で拾う。
for (const route of ['/companies/yamagata-harness', '/knowhow/how-to-start']) {
  const p = await ctx.newPage();
  await p.goto(BASE + route, { waitUntil: 'networkidle' });
  const gaps = await p.evaluate(() => {
    // .lab-profile など別ブロックの見出しは対象外
    const hs = [...document.querySelectorAll('.lab-prose h2')].filter(h => !h.closest('.lab-profile'));
    const all = [...document.querySelectorAll('.lab-prose p, .lab-prose h2')].filter(e => !e.closest('.lab-profile'));
    const out = [];
    for (const h of hs) {
      const top = h.getBoundingClientRect().top;
      let best = -1e9;
      for (const e of all) {
        if (e === h) continue;
        const b = e.getBoundingClientRect().bottom;
        if (b <= top + 1 && b > best) best = b;
      }
      if (best > -1e9) out.push(Math.round(top - best));
    }
    return out;
  }, );
  await p.close();
  const spread = gaps.length ? Math.max(...gaps) - Math.min(...gaps) : 0;
  if (spread > 12) { fails++; console.log(`FAIL  見出し前の間隔が不揃い ${route}: ${gaps.join(', ')}px`); }
  else console.log(`PASS  見出し前の間隔          ${route} → ${gaps.join(', ')}px`);
}

await ctx.close(); await b.close();
console.log(fails === 0 ? '\n本文タイポグラフィ 全項目パス' : `\n${fails}件が意図と違う`);
process.exit(fails === 0 ? 0 : 1);
