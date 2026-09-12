import { chromium } from 'playwright';

const ROUTES = [
  ['/', 'home'],
  ['/companies', 'companies'],
  ['/companies?pref=%E5%A4%A7%E9%98%AA%E5%BA%9C', 'companies-filtered'],
  ['/companies/yamagata-harness', 'company-detail'],
  ['/interviews', 'interviews'],
  ['/events', 'events'],
  ['/events/osaka-meetup-09', 'event-detail'],
  ['/knowhow', 'knowhow'],
  ['/knowhow/how-to-start', 'article-detail'],
  ['/about', 'about'],
  ['/for-companies', 'for-companies'],
  ['/no-such-page', '404'],
];

const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'mobile', width: 390, height: 844 },
];

const base = process.env.BASE ?? 'http://localhost:3000';
const OUT = process.env.SP ?? '.screenshots';
const browser = await chromium.launch(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {});
let problems = 0;

for (const vp of VIEWPORTS) {
  const ctx = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: 1,
    isMobile: vp.name === 'mobile',
    hasTouch: vp.name === 'mobile',
  });
  for (const [route, name] of ROUTES) {
    const page = await ctx.newPage();
    const msgs = [];
    // 404 ルートは遷移そのものが 404 を返すので、その1件は期待どおり
    const ignore = t => name === '404' && t.includes('404 (Not Found)');
    page.on('console', m => {
      if ((m.type() === 'error' || m.type() === 'warning') && !ignore(m.text())) {
        msgs.push(`${m.type()}: ${m.text()}`);
      }
    });
    page.on('pageerror', e => msgs.push(`pageerror: ${e.message}`));

    const resp = await page.goto(base + route, { waitUntil: 'networkidle', timeout: 45000 });
    await page.waitForTimeout(700);

    const status = resp ? resp.status() : 0;
    const expected = name === '404' ? 404 : 200;

    // 横スクロール検出
    const overflow = await page.evaluate(() => {
      const de = document.documentElement;
      return { scrollW: de.scrollWidth, clientW: de.clientWidth };
    });
    const overflows = overflow.scrollW > overflow.clientW + 1;

    // 画面外にはみ出す要素を特定
    let culprits = [];
    if (overflows) {
      culprits = await page.evaluate(() => {
        const w = document.documentElement.clientWidth;
        const out = [];
        for (const el of document.querySelectorAll('body *')) {
          const r = el.getBoundingClientRect();
          if (r.width > 0 && r.right > w + 1) {
            const cs = getComputedStyle(el);
            if (cs.position === 'absolute' || cs.position === 'fixed') continue;
            out.push(`${el.tagName.toLowerCase()}.${(el.className || '').toString().split(' ')[0]} right=${Math.round(r.right)}`);
          }
        }
        return out.slice(0, 6);
      });
    }

    await page.screenshot({ path: `${OUT}/${vp.name}-${name}.png`, fullPage: false });

    const bad = status !== expected || overflows || msgs.length > 0;
    if (bad) problems++;
    console.log(`${bad ? 'NG' : 'ok'}  ${vp.name.padEnd(7)} ${route}`);
    if (status !== expected) console.log(`      status ${status} (expected ${expected})`);
    if (overflows) console.log(`      overflow-x: scrollW=${overflow.scrollW} clientW=${overflow.clientW} :: ${culprits.join(' | ')}`);
    for (const m of msgs.slice(0, 4)) console.log(`      ${m}`);
    await page.close();
  }
  await ctx.close();
}
await browser.close();
console.log(problems === 0 ? '\nALL CLEAN' : `\n${problems} route/viewport combos with issues`);
