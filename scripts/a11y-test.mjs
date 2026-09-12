import { chromium } from 'playwright';
const BASE = process.env.BASE ?? 'http://localhost:3000';
const b = await chromium.launch(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {});
let fails = 0;
const check = (ok, msg, extra='') => { if(!ok) fails++; console.log(`${ok?'PASS':'FAIL'}  ${msg}${extra?'  — '+extra:''}`); };

const ctx = await b.newContext({ viewport:{width:1440,height:900} });

// 1. alt / semantic / heading
for (const route of ['/','/companies','/interviews','/events','/knowhow','/about','/for-companies','/companies/yamagata-harness']) {
  const p = await ctx.newPage();
  await p.goto(BASE+route, { waitUntil:'networkidle' });
  const r = await p.evaluate(() => {
    const imgs = [...document.querySelectorAll('img')];
    const noAlt = imgs.filter(i => i.getAttribute('alt') === null).length;
    const h1 = document.querySelectorAll('h1').length;
    // ボタン用途に <a> を使っていないか（href なし a）
    const hrefless = [...document.querySelectorAll('a')].filter(a => !a.getAttribute('href')).length;
    const main = document.querySelectorAll('main').length;
    return { imgs: imgs.length, noAlt, h1, hrefless, main };
  });
  check(r.noAlt === 0, `alt 属性 ${route}`, `img ${r.imgs}件 / alt無し ${r.noAlt}件`);
  check(r.h1 === 1, `h1 が1つ ${route}`, `${r.h1}個`);
  check(r.hrefless === 0, `href の無い <a> が無い ${route}`, `${r.hrefless}件`);
  await p.close();
}

// 2. キーボード操作：Tab でヘッダーナビに到達し、focus-visible の輪郭が出るか
{
  const p = await ctx.newPage();
  await p.goto(BASE+'/', { waitUntil:'networkidle' });
  await p.keyboard.press('Tab');
  const f1 = await p.evaluate(() => {
    const el = document.activeElement;
    const cs = getComputedStyle(el);
    return { tag: el.tagName, href: el.getAttribute('href'), outline: cs.outlineWidth + ' ' + cs.outlineColor };
  });
  check(f1.tag === 'A', '最初の Tab でリンクにフォーカス', `${f1.tag} href=${f1.href}`);
  check(parseFloat(f1.outline) > 0, 'focus-visible の輪郭が出る', f1.outline);

  // ナビ全項目にTabで到達できるか
  let reached = 0;
  for (let i = 0; i < 20; i++) {
    await p.keyboard.press('Tab');
    const inNav = await p.evaluate(() => !!document.activeElement.closest('.lab-nav'));
    if (inNav) reached++;
  }
  check(reached >= 6, 'ナビ6項目すべてにTabで到達', `${reached}項目`);
  await p.close();
}

// 3. ハンバーガー：aria-expanded と Escape
{
  const ctx2 = await b.newContext({ viewport:{width:390,height:844}, isMobile:true, hasTouch:true });
  const p = await ctx2.newPage();
  await p.goto(BASE+'/', { waitUntil:'networkidle' });
  const burger = p.locator('.lab-burger');
  check(await burger.getAttribute('aria-expanded') === 'false', 'ハンバーガー初期 aria-expanded=false');
  await burger.click();
  await p.waitForTimeout(300);
  check(await burger.getAttribute('aria-expanded') === 'true', '開いたら aria-expanded=true');
  check(await p.locator('.lab-drawer').isVisible(), 'ドロワーが表示される');
  const bodyOverflow = await p.evaluate(() => getComputedStyle(document.body).overflow);
  check(bodyOverflow === 'hidden', '開いている間は背面がスクロールしない', bodyOverflow);
  await p.keyboard.press('Escape');
  await p.waitForTimeout(300);
  check(await p.locator('.lab-drawer').count() === 0, 'Escape で閉じる');
  await p.close(); await ctx2.close();
}

// 4. カルーセルのリンクがキーボードで辿れる
{
  const p = await ctx.newPage();
  await p.goto(BASE+'/', { waitUntil:'networkidle' });
  const faces = await p.locator('.lab-orbit-face').count();
  const focusable = await p.evaluate(() =>
    [...document.querySelectorAll('.lab-orbit-face')].filter(a => a.tagName === 'A' && a.href).length);
  check(faces === focusable && faces === 9, 'カルーセルの9枚すべてがリンク', `${focusable}/${faces}`);
  await p.close();
}

await ctx.close(); await b.close();
console.log(fails === 0 ? '\nアクセシビリティ検証 全項目パス' : `\n${fails} 件の不備`);
