import { chromium } from 'playwright';
const BASE = process.env.BASE ?? 'http://localhost:3000';
const b = await chromium.launch({ executablePath: process.env.CHROME_PATH });
let fails = 0;
const check=(ok,m,x='')=>{if(!ok)fails++;console.log(`${ok?'PASS':'FAIL'}  ${m}${x?'  — '+x:''}`);};

// 目次のカテゴリ nav が、幅ごとに正しい形になるか
for (const [w,h,tag,expect] of [[1440,900,'1440','grid'],[1000,900,'1000','grid'],[880,900,'880','flex'],[390,844,'390','flex']]) {
  const ctx = await b.newContext({ viewport:{width:w,height:h}, isMobile: tag==='390', hasTouch: tag==='390' });
  const p = await ctx.newPage();
  await p.goto(BASE+'/knowhow',{waitUntil:'networkidle'});
  const r = await p.evaluate(()=>{
    const nav=document.querySelector('.lab-index-nav');
    const aside=document.querySelector('.lab-index-aside');
    const layout=document.querySelector('.lab-index-layout');
    return { display:getComputedStyle(nav).display, position:getComputedStyle(aside).position,
             cols:getComputedStyle(layout).gridTemplateColumns.split(' ').length,
             links:nav.querySelectorAll('a').length };
  });
  check(r.display===expect, `${tag}px: カテゴリ nav が ${expect}`, r.display);
  check(r.links===7, `${tag}px: カテゴリ7件（重複DOMなし）`, `${r.links}件`);
  if (tag==='1440'||tag==='1000') check(r.position==='sticky', `${tag}px: 左カラムが sticky`, r.position);
  await p.close(); await ctx.close();
}

// 目次行に横方向の死に空白ができていないか（タイトルとメタが同じ塊に収まる）
{
  const ctx = await b.newContext({ viewport:{width:1000,height:900} });
  const p = await ctx.newPage();
  await p.goto(BASE+'/knowhow',{waitUntil:'networkidle'});
  const gap = await p.evaluate(()=>{
    const row=document.querySelector('.lab-index-row');
    const body=row.querySelector('div');
    const h3=row.querySelector('h3');
    return { rowRight: Math.round(row.getBoundingClientRect().right),
             titleRight: Math.round(h3.getBoundingClientRect().right),
             bodyRight: Math.round(body.getBoundingClientRect().right) };
  });
  // メタが右端に飛んでいた旧実装では row と title の差が 400px 超だった
  check(gap.rowRight - gap.titleRight < 420, '目次行に極端な横の空白が無い', `右端との差 ${gap.rowRight-gap.titleRight}px`);
  await p.close(); await ctx.close();
}
await b.close();
console.log(fails===0?'\n目次レイアウト 全項目パス':`\n${fails}件の不備`);
