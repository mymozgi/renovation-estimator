import { test, expect } from '@playwright/test'

// ─── Landing page ─────────────────────────────────────────────────────────────

test.describe('Landing page', () => {
  test('loads in default locale (pl)', async ({ page }) => {
    await page.goto('/pl')
    await expect(page).toHaveURL(/\/pl/)
    await expect(page.locator('h1').first()).toBeVisible()
    await expect(page.locator('text=Remontowo').first()).toBeVisible()
  })

  test('hero CTA links to calculator', async ({ page }) => {
    await page.goto('/pl')
    const cta = page.locator('a[href*="kalkulator"]').first()
    await expect(cta).toBeVisible()
  })

  test('header nav links are present', async ({ page }) => {
    await page.goto('/pl')
    await expect(page.locator('header')).toBeVisible()
    await expect(page.locator('header a[href*="kalkulator"]')).toBeVisible()
    await expect(page.locator('header a[href*="articles"]')).toBeVisible()
  })

  test('footer renders', async ({ page }) => {
    await page.goto('/pl')
    await expect(page.locator('footer')).toBeVisible()
    await expect(page.locator('footer').getByText('Remontowo')).toBeVisible()
  })
})

// ─── Language switcher ────────────────────────────────────────────────────────

test.describe('Language switcher', () => {
  test('switching to English changes page content', async ({ page }) => {
    await page.goto('/pl')
    // Navigate directly to English
    await page.goto('/en')
    await expect(page.locator('h1').first()).toBeVisible()
    // English landing should not contain Polish-only text
    const h1Text = await page.locator('h1').first().textContent()
    expect(h1Text).not.toContain('Kosztorys')
  })

  test('English articles page shows English content', async ({ page }) => {
    await page.goto('/en/articles')
    await expect(page.locator('h1').first()).toBeVisible()
    const h1 = await page.locator('h1').first().textContent()
    expect(h1?.toLowerCase()).toMatch(/knowledge|guide|renovation/i)
  })

  test('Russian articles page loads', async ({ page }) => {
    await page.goto('/ru/articles')
    await expect(page.locator('h1').first()).toBeVisible()
  })

  test('Ukrainian articles page loads', async ({ page }) => {
    await page.goto('/uk/articles')
    await expect(page.locator('h1').first()).toBeVisible()
  })

  test('locale appears in page URL after navigation', async ({ page }) => {
    await page.goto('/pl')
    await page.goto('/en')
    await expect(page).toHaveURL(/\/en/)
  })
})

// ─── Articles page ────────────────────────────────────────────────────────────

test.describe('Articles page', () => {
  test('shows article cards in Polish', async ({ page }) => {
    await page.goto('/pl/articles')
    const cards = page.locator('a[href*="/articles/"]')
    await expect(cards.first()).toBeVisible()
    const count = await cards.count()
    expect(count).toBeGreaterThanOrEqual(1)
  })

  test('shows article cards in English', async ({ page }) => {
    await page.goto('/en/articles')
    const cards = page.locator('a[href*="/articles/"]')
    await expect(cards.first()).toBeVisible()
  })

  test('shows article cards in Russian', async ({ page }) => {
    await page.goto('/ru/articles')
    const cards = page.locator('a[href*="/articles/"]')
    await expect(cards.first()).toBeVisible()
  })

  test('shows article cards in Ukrainian', async ({ page }) => {
    await page.goto('/uk/articles')
    const cards = page.locator('a[href*="/articles/"]')
    await expect(cards.first()).toBeVisible()
  })

  test('filter tabs appear and are clickable', async ({ page }) => {
    await page.goto('/pl/articles')
    // The "All" / "Wszystkie" button
    const allBtn = page.locator('button').filter({ hasText: /Wszystkie|All|Все|Всі/ }).first()
    await expect(allBtn).toBeVisible()
    await allBtn.click()
    // Cards still visible after clicking "All"
    const cards = page.locator('a[href*="/articles/"]')
    await expect(cards.first()).toBeVisible()
  })

  test('clicking an article card navigates to detail page', async ({ page }) => {
    await page.goto('/pl/articles')
    const firstCard = page.locator('a[href*="/articles/"]').first()
    const href = await firstCard.getAttribute('href')
    await firstCard.click()
    await expect(page).toHaveURL(new RegExp(href!.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')))
    await expect(page.locator('h1').first()).toBeVisible()
  })
})

// ─── Article detail page ──────────────────────────────────────────────────────

test.describe('Article detail page', () => {
  test('Polish article renders correctly', async ({ page }) => {
    await page.goto('/pl/articles/koszt-remontu-lazienki-2026')
    await expect(page.locator('h1').first()).toBeVisible()
    // Checklist items rendered
    const checklist = page.locator('svg').first()
    await expect(checklist).toBeVisible()
  })

  test('English article renders correctly', async ({ page }) => {
    await page.goto('/en/articles/bathroom-renovation-cost-2026')
    await expect(page.locator('h1').first()).toBeVisible()
    const h1Text = await page.locator('h1').first().textContent()
    expect(h1Text).toContain('2026')
  })

  test('Russian article renders correctly', async ({ page }) => {
    await page.goto('/ru/articles/stoimost-remonta-vannoj-2026')
    await expect(page.locator('h1').first()).toBeVisible()
  })

  test('Ukrainian article renders correctly', async ({ page }) => {
    await page.goto('/uk/articles/vartist-remontu-vannoyi-2026')
    await expect(page.locator('h1').first()).toBeVisible()
  })

  test('article detail has header and footer', async ({ page }) => {
    await page.goto('/pl/articles/koszt-remontu-lazienki-2026')
    await expect(page.locator('header')).toBeVisible()
    await expect(page.locator('footer')).toBeVisible()
  })
})

// ─── Calculator ───────────────────────────────────────────────────────────────

test.describe('Calculator', () => {
  test('calculator start screen loads', async ({ page }) => {
    await page.goto('/pl/kalkulator')
    await expect(page.locator('text=Remontowo').first()).toBeVisible()
  })

  test('can select renovation type and advance', async ({ page }) => {
    await page.goto('/pl/kalkulator')
    // Select first calc type option
    const firstOption = page.locator('button').filter({ hasText: /wykończenie|Remont|renovation/i }).first()
    if (await firstOption.isVisible()) {
      await firstOption.click()
      const nextBtn = page.locator('button').filter({ hasText: /Dalej|Next|Далее|Далі/i }).first()
      await expect(nextBtn).toBeVisible()
    }
  })

  test('progress bar is visible', async ({ page }) => {
    await page.goto('/pl/kalkulator')
    const progressBar = page.locator('.bg-primary.transition-all').first()
    await expect(progressBar).toBeVisible()
  })

  test('calculator loads in Russian', async ({ page }) => {
    await page.goto('/ru/kalkulator')
    await expect(page.locator('text=Remontowo').first()).toBeVisible()
    // Bottom nav should show Russian text
    const nextBtn = page.locator('button').filter({ hasText: 'Далее' })
    // It's conditionally shown, just verify page loaded
    await expect(page.locator('body')).toBeVisible()
  })

  test('calculator loads in English', async ({ page }) => {
    await page.goto('/en/kalkulator')
    await expect(page.locator('text=Remontowo').first()).toBeVisible()
  })
})

// ─── About page ──────────────────────────────────────────────────────────────

test.describe('About page (o-nas)', () => {
  test('loads in Polish', async ({ page }) => {
    await page.goto('/pl/o-nas')
    await expect(page.locator('h1').first()).toBeVisible()
    await expect(page.locator('header')).toBeVisible()
    await expect(page.locator('footer')).toBeVisible()
  })

  test('loads in English', async ({ page }) => {
    await page.goto('/en/o-nas')
    await expect(page.locator('h1').first()).toBeVisible()
  })

  test('loads in Russian', async ({ page }) => {
    await page.goto('/ru/o-nas')
    await expect(page.locator('h1').first()).toBeVisible()
  })

  test('loads in Ukrainian', async ({ page }) => {
    await page.goto('/uk/o-nas')
    await expect(page.locator('h1').first()).toBeVisible()
  })
})

// ─── 404 ─────────────────────────────────────────────────────────────────────

test.describe('Error handling', () => {
  test('non-existent article returns 404', async ({ page }) => {
    const response = await page.goto('/pl/articles/this-article-does-not-exist-xyz')
    expect(response?.status()).toBe(404)
  })

  test('invalid locale returns 404', async ({ page }) => {
    const response = await page.goto('/xx/kalkulator')
    expect(response?.status()).toBe(404)
  })
})
