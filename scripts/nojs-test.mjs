import { chromium } from 'playwright';
const BASE = process.env.BASE ?? 'http://localhost:3000';
const browser = await chromium.launch(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {});
const ctx = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 1440, height: 900 } });
for (const route of ['/about','/for-companies','/events','/interviews','/companies']) {
  const page = await ctx.newPage();
  await page.goto(BASE+route, { waitUntil: 'domcontentloaded' });
  // reveal 配下のテキストが見えているか
  const hidden = await page.evaluate(() => {
    const els = [...document.querySelectorAll('.lab-reveal')];
    return els.filter(el => parseFloat(getComputedStyle(el).opacity) < 0.5).length;
  });
  const total = await page.locator('.lab-reveal').count();
  console.log(`${hidden === 0 ? 'PASS' : 'FAIL'}  ${route}  reveal要素 ${total}件中 非表示 ${hidden}件`);
  await page.close();
}
await ctx.close(); await browser.close();
