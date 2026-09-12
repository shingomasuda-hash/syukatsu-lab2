import { chromium } from 'playwright';
const BASE = process.env.BASE ?? 'http://localhost:3000';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
let fails = 0;
// 装飾要素が実レイアウトを占有していないか（= 常に position:absolute のままか）を全ページで検査
for (const [w,h,n] of [[1920,1080,'1920'],[1440,900,'1440'],[390,844,'390']]) {
  const ctx = await b.newContext({ viewport:{width:w,height:h}, isMobile:n==='390', hasTouch:n==='390' });
  for (const route of ['/','/companies','/companies/yamagata-harness','/interviews','/events','/events/osaka-meetup-09','/knowhow','/knowhow/how-to-start','/about','/for-companies']) {
    const p = await ctx.newPage();
    await p.goto(BASE+route,{waitUntil:'networkidle'});
    const bad = await p.evaluate(() => {
      const out = [];
      for (const el of document.querySelectorAll('.lab-orbit, .lab-hero-grid, .lab-future-word, .lab-orbit-floor, .lab-orbit-halo, .lab-orbit-backdrop')) {
        const cs = getComputedStyle(el);
        if (cs.position !== 'absolute') {
          out.push(`${el.className.split(' ')[0]}:${cs.position}`);
        }
      }
      return out;
    });
    // セクションが異常に高くないか
    // モバイルは一覧が縦積みになるため、しきい値を広く取る
    const limit = n === '390' ? 6000 : 2600;
    const tall = await p.evaluate((limit) => {
      const out = [];
      for (const el of document.querySelectorAll('section, header.lab-detail-hero')) {
        const r = el.getBoundingClientRect();
        if (r.height > limit) out.push(`${(el.className||'').split(' ').slice(0,2).join('.')}=${Math.round(r.height)}px`);
      }
      return out;
    }, limit);
    const ok = bad.length === 0 && tall.length === 0;
    if (!ok) fails++;
    console.log(`${ok?'PASS':'FAIL'}  ${n.padEnd(5)} ${route}${bad.length?'  装飾がflow内: '+bad.join(', '):''}${tall.length?'  過大セクション: '+tall.join(', '):''}`);
    await p.close();
  }
  await ctx.close();
}
await b.close();
console.log(fails===0 ? '\n装飾要素はすべて absolute、過大セクションなし' : `\n${fails}件の不備`);
