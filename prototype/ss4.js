const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  const tmp = 'C:/Users/Oleg/AppData/Local/Temp/claude';

  // Blog
  await page.goto('http://localhost:3000/pl/articles', { waitUntil: 'networkidle', timeout: 15000 });
  await page.screenshot({ path: tmp + '/v4-blog.png', fullPage: true });
  console.log('blog');

  // Standard step
  await page.goto('http://localhost:3000/pl/kalkulator', { waitUntil: 'networkidle', timeout: 15000 });
  await page.click('button:has-text("Stan developerski")');
  await page.waitForTimeout(400);
  await page.click('button:has-text("Warszawa")');
  await page.waitForTimeout(200);
  await page.click('button:has-text("Dalej")');
  await page.waitForTimeout(800);
  await page.screenshot({ path: tmp + '/v4-standard.png', fullPage: false });
  console.log('standard');

  await browser.close();
})();
