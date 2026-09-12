import { chromium } from 'playwright';

const browser = await chromium.launch(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {});
const results = [];
const check = (name, pass, detail = '') => {
  results.push({ name, pass, detail });
  console.log(`${pass ? 'PASS' : 'FAIL'}  ${name}${detail ? '  — ' + detail : ''}`);
};

const turn = (page) => page.evaluate(() => {
  const el = document.querySelector('.lab-carousel');
  return parseFloat(getComputedStyle(el).getPropertyValue('--orbit-turn')) || 0;
});

// ---------- Desktop ----------
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto('http://localhost:3200/', { waitUntil: 'networkidle' });
  await page.waitForSelector('.lab-carousel[data-orbit-interactive]', { timeout: 10000 });
  check('JS制御が有効 (data-orbit-interactive)', true);

  const cards = await page.locator('.lab-orbit-card').count();
  check('カード枚数が9', cards === 9, `${cards}枚`);

  const angles = await page.evaluate(() =>
    [...document.querySelectorAll('.lab-orbit-card')].map(
      el => el.style.getPropertyValue('--card-angle')));
  check('--card-angle が 40deg 刻み', angles[1] === '40deg' && angles[8] === '320deg', angles.slice(0,3).join(' / '));

  // --- 自動回転 ---
  await page.locator('.lab-orbit-stage').scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  const box = await page.locator('.lab-orbit-stage').boundingBox();
  await page.mouse.move(10, 10); // hoverを外す
  const a0 = await turn(page);
  await page.waitForTimeout(1600);
  const a1 = await turn(page);
  check('自動回転している', a1 !== a0, `${a0.toFixed(2)}° → ${a1.toFixed(2)}°`);

  // --- hoverで停止 ---
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await page.waitForTimeout(300);
  const h0 = await turn(page);
  await page.waitForTimeout(1200);
  const h1 = await turn(page);
  check('hoverで自動回転が止まる', Math.abs(h1 - h0) < 0.01, `${h0.toFixed(2)}° → ${h1.toFixed(2)}°`);

  // --- 右へドラッグ → 角度が増える（操作方向の契約） ---
  const cx = box.x + box.width / 2, cy = box.y + box.height / 2;
  await page.mouse.move(cx, cy);
  await page.mouse.down();
  const before = await turn(page);
  for (let i = 1; i <= 10; i++) await page.mouse.move(cx + i * 20, cy, { steps: 1 });
  const during = await turn(page);
  await page.mouse.up();
  const dx = 200;
  const expected = before + dx * 0.24;
  check('右ドラッグで角度が増加（方向が正しい）', during > before, `${before.toFixed(2)}° → ${during.toFixed(2)}°`);
  check('PC感度 0.24 と一致', Math.abs(during - expected) < 0.5, `実測 ${(during - before).toFixed(2)}° / 期待 ${(dx*0.24).toFixed(2)}°`);

  // --- 左へドラッグ → 減る ---
  await page.mouse.move(cx, cy);
  await page.mouse.down();
  const lb = await turn(page);
  for (let i = 1; i <= 10; i++) await page.mouse.move(cx - i * 20, cy, { steps: 1 });
  const ld = await turn(page);
  await page.mouse.up();
  check('左ドラッグで角度が減少', ld < lb, `${lb.toFixed(2)}° → ${ld.toFixed(2)}°`);

  // --- ドラッグ後1400msは自動回転が再開しない ---
  await page.mouse.move(10, 10);
  const r0 = await turn(page);
  await page.waitForTimeout(700);
  const r1 = await turn(page);
  check('ドラッグ直後は自動回転が再開しない', Math.abs(r1 - r0) < 0.01, `${r0.toFixed(2)}° → ${r1.toFixed(2)}°`);
  await page.waitForTimeout(1400);
  const r2 = await turn(page);
  check('1400ms後に自動回転が再開する', Math.abs(r2 - r1) > 0.01, `${r1.toFixed(2)}° → ${r2.toFixed(2)}°`);

  // --- チェックボックスoffで停止 ---
  await page.locator('.lab-rotation-toggle').uncheck();
  await page.mouse.move(10, 10);
  const c0 = await turn(page);
  await page.waitForTimeout(1200);
  const c1 = await turn(page);
  check('自動回転OFFで停止する', Math.abs(c1 - c0) < 0.01, `${c0.toFixed(2)}° → ${c1.toFixed(2)}°`);

  await ctx.close();
}

// ---------- Mobile (touch) ----------
{
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const page = await ctx.newPage();
  await page.goto('http://localhost:3200/', { waitUntil: 'networkidle' });
  await page.waitForSelector('.lab-carousel[data-orbit-interactive]');

  await page.locator('.lab-orbit-stage').scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  const box = await page.locator('.lab-orbit-stage').boundingBox();
  const cx = box.x + box.width / 2, cy = box.y + box.height / 2;

  // 横スワイプ → 回る（感度0.38）
  const b0 = await turn(page);
  await page.mouse.move(cx, cy);
  await page.mouse.down();
  for (let i = 1; i <= 10; i++) await page.mouse.move(cx + i * 10, cy, { steps: 1 });
  const b1 = await turn(page);
  await page.mouse.up();
  check('SP: 右スワイプで角度が増加', b1 > b0, `${b0.toFixed(2)}° → ${b1.toFixed(2)}°`);
  check('SP感度 0.38 と一致', Math.abs((b1 - b0) - 100 * 0.38) < 0.5, `実測 ${(b1-b0).toFixed(2)}° / 期待 ${(100*0.38).toFixed(2)}°`);

  // 縦スワイプ → 回転せずページがスクロールする
  await page.waitForTimeout(1600);
  await page.locator('.lab-rotation-toggle').uncheck();
  await page.waitForTimeout(200);
  const v0 = await turn(page);
  const sy0 = await page.evaluate(() => window.scrollY);
  await page.mouse.move(cx, cy);
  await page.mouse.down();
  for (let i = 1; i <= 10; i++) await page.mouse.move(cx, cy - i * 12, { steps: 1 });
  const v1 = await turn(page);
  await page.mouse.up();
  check('SP: 縦スワイプでは回転しない', Math.abs(v1 - v0) < 0.01, `${v0.toFixed(2)}° → ${v1.toFixed(2)}°`);

  await ctx.close();
}

// ---------- reduced motion ----------
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  await page.goto('http://localhost:3200/', { waitUntil: 'networkidle' });
  await page.waitForSelector('.lab-carousel[data-orbit-interactive]');
  await page.locator('.lab-orbit-stage').scrollIntoViewIfNeeded();
  await page.mouse.move(10, 10);
  const m0 = await turn(page);
  await page.waitForTimeout(1500);
  const m1 = await turn(page);
  check('prefers-reduced-motion で自動回転しない', Math.abs(m1 - m0) < 0.01, `${m0.toFixed(2)}° → ${m1.toFixed(2)}°`);
  await ctx.close();
}

await browser.close();
const failed = results.filter(r => !r.pass);
console.log(`\n${results.length - failed.length}/${results.length} passed`);
process.exit(failed.length ? 1 : 0);
