/**
 * 掲載画像の顔が、実際に使われる全コンテナ比率で枠内に収まるかを検証する。
 *
 * object-fit: cover は片方の軸しか切らないため、コンテナの比率ごとに
 * 効いてくる軸が変わる。focus（object-position）を1つで使い回している以上、
 * 全コンテナを同時に満たしているかを機械的に確かめる必要がある。
 *
 * 画像を差し替えたとき、または focus / コンテナ比率を変えたときに実行する。
 * HEAD の値（頭頂とアゴの位置）は画像を差し替えたら測り直すこと。
 */
import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

// 画像高に対する [頭頂, アゴ] の位置
const HEAD = {
  'chuo-denko': [0.10, 0.24], 'hatta-keiami': [0.12, 0.28],
  'inoue-ribbon': [0.08, 0.25], 'maru-taka': [0.07, 0.22],
  'nagata-reiki': [0.33, 0.43], 'osaka-meiban': [0.12, 0.33],
  's-pack': [0.14, 0.30], 'shoei-seiki': [0.14, 0.30],
  'yamagata-harness': [0.10, 0.26],
};

// 実際に使われているコンテナ（幅, 高さ）
const CONTAINERS = [
  ['カルーセルカード', 220, 300],
  ['StoryCard 4:5', 320, 400],
  ['Hero顔スタック', 64, 76],
  ['Stagger 4:3', 500, 375],
  ['詳細figure 5:3', 1100, 660],
  ['PageHero図', 640, 400],
];

// companies.ts から slug と focus を読む
const src = readFileSync('src/data/companies.ts', 'utf8');
const entries = [...src.matchAll(/slug: "([^"]+)"[\s\S]*?focus: "([\d.]+)% ([\d.]+)%"/g)]
  .map(m => ({ slug: m[1], x: parseFloat(m[2]) / 100, y: parseFloat(m[3]) / 100 }));

// 画像の実寸を取得
function size(slug) {
  const out = execFileSync('python3', ['-c',
    `from PIL import Image;im=Image.open("public/images/${slug}.jpg");print(im.size[0],im.size[1])`
  ]).toString().trim().split(' ');
  return { w: +out[0], h: +out[1] };
}

let cut = 0, checked = 0;
for (const { slug, x, y } of entries) {
  const head = HEAD[slug];
  if (!head) { console.log(`SKIP  ${slug}（HEAD 未登録）`); continue; }
  const { w, h } = size(slug);
  const [top, chin] = head;
  for (const [name, cw, ch] of CONTAINERS) {
    const scale = Math.max(cw / w, ch / h);
    const sh = h * scale, sw = w * scale;
    const oy = (sh - ch) * y, ox = (sw - cw) * x;
    const topPx = top * sh - oy, chinPx = chin * sh - oy;
    checked++;
    if (topPx < -2 || chinPx > ch + 2) {
      cut++;
      console.log(`CUT   ${slug} @ ${name}: 頭頂 ${topPx.toFixed(0)} / アゴ ${chinPx.toFixed(0)} （枠 0..${ch}）`);
    }
  }
}
console.log(cut === 0
  ? `\n${entries.length}枚 × ${CONTAINERS.length}コンテナ = ${checked}通り、顔の切れなし`
  : `\n${cut}件で顔が枠から出ている`);
process.exit(cut === 0 ? 0 : 1);
