import { chromium } from 'playwright';
const BASE = process.env.BASE ?? 'http://localhost:3000';
const browser = await chromium.launch(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {});
const routes = ['/companies','/interviews','/events','/knowhow','/about','/for-companies'];
let fails = 0;
for (const vp of [{n:'desktop',w:1440,h:900},{n:'mobile',w:390,h:844}]) {
  const ctx = await browser.newContext({ viewport:{width:vp.w,height:vp.h}, isMobile: vp.n==='mobile', hasTouch: vp.n==='mobile' });
  for (const route of routes) {
    const page = await ctx.newPage();
    await page.goto(BASE+route, { waitUntil:'networkidle' });
    await page.waitForTimeout(500);
    // アウトライン文字と、本文/見出し/指標行の矩形が重なっていないか
    const r = await page.evaluate(() => {
      const word = document.querySelector('.lab-page-hero .lab-future-word');
      if (!word) return null;
      const w = word.getBoundingClientRect();
      const targets = ['.lab-page-hero h1', '.lab-page-hero .lab-intro', '.lab-page-hero .lab-label'];
      const hits = [];
      for (const sel of targets) {
        const el = document.querySelector(sel);
        if (!el) continue;
        const t = el.getBoundingClientRect();
        const overlap = !(w.right < t.left || w.left > t.right || w.bottom < t.top || w.top > t.bottom);
        if (overlap) hits.push(sel);
      }
      return { hits, word: { top: Math.round(w.top), bottom: Math.round(w.bottom) } };
    });
    const ok = r && r.hits.length === 0;
    if (!ok) fails++;
    console.log(`${ok ? 'PASS' : 'FAIL'}  ${vp.n.padEnd(7)} ${route}${ok ? '' : '  重なり: ' + r.hits.join(', ')}`);
    await page.close();
  }
  await ctx.close();
}
await browser.close();
console.log(fails === 0 ? '\nアウトライン文字は本文に掛かっていない' : `\n${fails} 件で重なりあり`);
