# TESTING

Goal:

Write a test suite that validates calculation correctness, form behavior, and the full wizard flow end-to-end.

Business logic:

If the calculation engine has a bug and shows 4 000 PLN instead of 40 000 PLN, users make wrong financial decisions. The estimate is the core product promise. Tests are the guarantee that the ±10–15% precision claim is true and stays true as the codebase evolves.

---

## Setup

```bash
npm install -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/user-event
npm install -D @playwright/test
```

Add to `package.json`:

```json
"scripts": {
  "test":     "vitest",
  "test:e2e": "playwright test"
}
```

---

## Part 1 — Calculation Engine (Vitest)

File: `src/lib/calculations.test.ts`

### Area formula tests

```typescript
test('floor area = width × length', () => {
  expect(calcAreas({ width: 4, length: 5, ...defaults }).floor).toBe(20)
})
test('wall area deducts windows and doors', () => {
  // 4×5×2.7m room, 1 window (1.5m²), 1 door (2.0m²)
  // perimeter = 2×(4+5)×2.7 = 48.6, minus 3.5 = 45.1
  expect(calcAreas({ width:4, length:5, height:2.7, windows:1, doors:1 }).wall).toBeCloseTo(45.1)
})
test('zero windows and doors = full perimeter wall area', () => { ... })
test('ceiling area = floor area', () => { ... })
```

### Material cost tests

```typescript
test('economy paint wall costs less than premium', () => {
  const eco = calcRoomEstimate({ ...room, wallFinish:'paint', qualityTier:'economy' }, 'other')
  const pre = calcRoomEstimate({ ...room, wallFinish:'paint', qualityTier:'premium' }, 'other')
  expect(pre.materials.min).toBeGreaterThan(eco.materials.min)
})
test('tile floor costs more than laminate at same tier', () => { ... })
```

### Regional multiplier tests

```typescript
test('Warsaw estimate is 20% higher than Other city', () => {
  const warsaw = calcRoomEstimate(room, 'warsaw')
  const other  = calcRoomEstimate(room, 'other')
  expect(warsaw.total.min / other.total.min).toBeCloseTo(1.20, 1)
})
test('Kraków multiplier is 1.10', () => { ... })
```

### Preparation cost tests

```typescript
test('ready walls add zero preparation cost', () => {
  const est = calcRoomEstimate({ ...room, wallCondition: 'ready' }, 'other')
  expect(est.preparation.min).toBe(0)
})
test('full_prep adds positive preparation cost', () => {
  const est = calcRoomEstimate({ ...room, wallCondition: 'full_prep' }, 'other')
  expect(est.preparation.min).toBeGreaterThan(0)
})
```

### Range sanity tests

```typescript
test('min is always less than or equal to max', () => {
  ALL_ROOM_CONFIGS.forEach((config) => {
    const est = calcRoomEstimate(config, 'warsaw')
    expect(est.total.min).toBeLessThanOrEqual(est.total.max)
  })
})
test('estimate range spread does not exceed 50%', () => {
  // max should not be more than 150% of min (validates ±10-15% claim)
  const est = calcRoomEstimate(standardRoom, 'warsaw')
  expect(est.total.max / est.total.min).toBeLessThanOrEqual(1.5)
})
```

---

## Part 2 — API Route (Vitest)

File: `src/app/api/send-report/route.test.ts`

```typescript
test('rejects empty email with 400', async () => { ... })
test('rejects invalid email format with 400', async () => { ... })
test('rejects empty rooms array with 400', async () => { ... })
test('rejects room with invalid type with 400', async () => { ... })
test('rejects dimension out of range with 400', async () => { ... })
test('returns NOT_CONFIGURED when RESEND_API_KEY missing', async () => { ... })
```

---

## Part 3 — E2E Wizard Flow (Playwright)

File: `e2e/wizard.spec.ts`

```typescript
test('full flow: landing → settings → rooms → report', async ({ page }) => {
  await page.goto('/pl')
  await page.click('text=Zacznij bezpłatny kosztorys')

  // General settings
  await page.click('text=Mieszkanie')
  await page.click('text=Nowe budownictwo')
  await page.click('text=Generalny remont')
  await page.click('text=Warszawa')
  await page.click('text=Zacznij bezpłatny kosztorys')

  // Add room
  await page.click('text=Dodaj pokój')
  await page.click('text=Kuchnia')
  await page.click('text=Kontynuuj')
  // ... fill dimensions, conditions, finishes
  await page.click('text=Zapisz pokój')

  // Verify room card appears
  await expect(page.locator('text=Kuchnia')).toBeVisible()
  await expect(page.locator('text=PLN')).toBeVisible()

  // Go to report
  await page.click('text=Zobacz pełny kosztorys')
  await expect(page.locator('text=Twój kosztorys')).toBeVisible()
  await expect(page.locator('text=Warszawa')).toBeVisible()
})

test('back navigation preserves entered data', async ({ page }) => { ... })
test('remove room updates running estimate', async ({ page }) => { ... })
test('language switcher changes UI language mid-wizard', async ({ page }) => { ... })
```

---

## Part 4 — Responsive (Playwright)

```typescript
test('no horizontal scroll at 390px', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  for (const route of ['/pl', '/pl/estimate', '/pl/rooms', '/pl/report']) {
    await page.goto(route)
    const scrollWidth  = await page.evaluate(() => document.body.scrollWidth)
    const clientWidth  = await page.evaluate(() => document.body.clientWidth)
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1)
  }
})
```

---

Output:

Vitest unit tests for calculations, API validation; Playwright E2E for full wizard flow and responsive check

Validation:

all tests pass; calculation spread ≤ 50%; regional multipliers verified; API rejects bad input; wizard flow runs in all 5 locales
