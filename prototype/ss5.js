const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  const tmp = 'C:/Users/Oleg/AppData/Local/Temp/claude';

  // Full home page
  await page.goto('http://localhost:3000/pl', { waitUntil: 'networkidle', timeout: 15000 });
  await page.screenshot({ path: tmp + '/qa-home.png', fullPage: true });
  console.log('home');

  // Navigate to result page by clicking through all steps
  await page.goto('http://localhost:3000/pl/kalkulator', { waitUntil: 'networkidle', timeout: 15000 });
  await page.click('button:has-text("Stan developerski")');
  await page.waitForTimeout(400);

  // City
  await page.click('button:has-text("Warszawa")');
  await page.waitForTimeout(200);
  await page.click('button:has-text("Dalej")');
  await page.waitForTimeout(400);

  // Standard
  await page.click('button:has-text("Ekonomiczny")');
  await page.waitForTimeout(200);
  await page.click('button:has-text("Dalej")');
  await page.waitForTimeout(400);

  // Property condition
  await page.click('button:has-text("Do odświeżenia")');
  await page.waitForTimeout(200);
  await page.click('button:has-text("Dalej")');
  await page.waitForTimeout(400);

  // Property type
  await page.click('button:has-text("Mieszkanie")');
  await page.waitForTimeout(200);
  await page.click('button:has-text("Dalej")');
  await page.waitForTimeout(400);

  // Rooms list — select salon
  await page.click('button:has-text("Salon")');
  await page.waitForTimeout(200);
  await page.click('button:has-text("Dalej")');
  await page.waitForTimeout(600);

  // Room wizard sub-steps (3 sub-steps x 1 room)
  await page.click('button:has-text("Dalej")'); // sub-step 1
  await page.waitForTimeout(400);
  await page.click('button:has-text("Dalej")'); // sub-step 2
  await page.waitForTimeout(400);
  await page.click('button:has-text("Dalej")'); // sub-step 3
  await page.waitForTimeout(800);

  await page.screenshot({ path: tmp + '/qa-result.png', fullPage: true });
  console.log('result');

  await browser.close();
})();
