const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  const items = [
    ['http://localhost:3000/pl', 'home'],
    ['http://localhost:3000/pl/kalkulator', 'kalkulator'],
    ['http://localhost:3000/pl/articles', 'blog'],
    ['http://localhost:3000/pl/regulamin', 'regulamin'],
  ];
  const tmpDir = 'C:/Users/Oleg/AppData/Local/Temp/claude';
  for (const [url, name] of items) {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 20000 });
    await page.screenshot({ path: tmpDir + '/current-' + name + '.png', fullPage: true });
    console.log('OK: ' + name);
  }
  await browser.close();
})();
