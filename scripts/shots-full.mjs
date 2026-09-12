import { chromium } from 'playwright';
const SP = process.env.SP ?? '.screenshots';
const browser = await chromium.launch(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {});
const targets = [['/events','events'],['/about','about'],['/for-companies','for-companies'],['/companies','companies'],['/knowhow','knowhow'],['/interviews','interviews'],['/companies/yamagata-harness','company-detail']];
for (const vp of [{n:'desktop',w:1440,h:1000},{n:'mobile',w:390,h:844}]) {
  const ctx = await browser.newContext({ viewport:{width:vp.w,height:vp.h}, isMobile: vp.n==='mobile', hasTouch: vp.n==='mobile' });
  for (const [route,name] of targets) {
    const page = await ctx.newPage();
    await page.goto('http://localhost:3100'+route, { waitUntil:'networkidle' });
    // hydration 完了（observer 設置）を待つ。data-js は hydration 前に付くので目印にならない。
    await page.waitForTimeout(1500);
    // scroll reveal を全部発火させる
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 400) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 60)); }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(900);
    // reveal が残っていたらもう一度流す
    const stillHidden = await page.evaluate(() =>
      [...document.querySelectorAll('.lab-reveal')].filter(el => el.dataset.shown !== 'true').length);
    if (stillHidden > 0) {
      await page.evaluate(async () => {
        for (let y = 0; y < document.body.scrollHeight; y += 300) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 90)); }
        window.scrollTo(0, 0);
      });
      await page.waitForTimeout(900);
    }
    // 撮影用に残りを確定表示させる（reveal の実挙動は reveal-test.mjs で別途検証済み）
    await page.evaluate(() =>
      document.querySelectorAll('.lab-reveal').forEach(el => { el.dataset.shown = 'true'; }));
    await page.waitForTimeout(700);
    await page.screenshot({ path: `${SP}/full-${vp.n}-${name}.png`, fullPage: true });
    await page.close();
    console.log('shot', vp.n, route);
  }
  await ctx.close();
}
await browser.close();
