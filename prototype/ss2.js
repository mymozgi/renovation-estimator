const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  const tmp = 'C:/Users/Oleg/AppData/Local/Temp/claude';

  await page.goto('http://localhost:3000/pl/articles', { waitUntil: 'networkidle', timeout: 15000 });
  await page.screenshot({ path: tmp + '/final-blog.png', fullPage: true });
  console.log('blog');

  await page.goto('http://localhost:3000/pl/kalkulator', { waitUntil: 'networkidle', timeout: 15000 });
  await page.screenshot({ path: tmp + '/calc-step1.png', fullPage: false });
  console.log('calc step1');

  await page.click('button:has-text("Stan developerski")');
  await page.waitForTimeout(600);
  await page.screenshot({ path: tmp + '/calc-city.png', fullPage: false });
  console.log('calc city');

  await page.click('button:has-text("Warszawa")');
  await page.waitForTimeout(300);
  await page.click('button:has-text("Dalej")');
  await page.waitForTimeout(600);
  await page.screenshot({ path: tmp + '/calc-standard-step.png', fullPage: false });
  console.log('calc standard');

  await browser.close();
})();
