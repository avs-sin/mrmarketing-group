import { test, expect } from '@playwright/test'

test('does_not_download_video_before_play', async ({ page }) => {
  const requests: string[] = []

  page.on('request', r => {
    if (r.url().includes('.mp4')) requests.push(r.url())
  })
  await page.goto('/', { waitUntil: 'domcontentloaded' })
  await expect(page.getByRole('heading', { name: 'Work you can see.' })).toBeVisible()
  await page.locator('#work').scrollIntoViewIfNeeded()
  expect(requests).toHaveLength(0)
  await expect(page.getByRole('button', { name: 'Play Restaurant content', exact: true })).toBeVisible()
  await page.getByRole('button', { name: 'Play Restaurant content', exact: true }).click()
  await expect(page.locator('#work video')).toHaveAttribute('src', '/videos/mrmg/restaurant-production.mp4')
  await expect.poll(() => requests.length).toBeGreaterThan(0)
  await expect
    .poll(() => page.locator('#work video').evaluate((el: HTMLVideoElement) => el.currentTime))
    .toBeGreaterThan(0)
})

test('keyboard_and_reduced_motion_playback', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/', { waitUntil: 'domcontentloaded' })
  const button = page.getByRole('button', { name: 'Play Restaurant content', exact: true })

  await expect(button).toBeVisible()
  await expect(button).toBeEnabled()
  await button.focus()
  await page.keyboard.press('Enter')
  const player = page.locator('#work video')

  await expect(player).toHaveAttribute('controls', '')
  await expect(player).not.toHaveAttribute('autoplay')
  await expect(player.locator('track')).toHaveAttribute('kind', 'captions')
  await expect(player).toHaveAttribute('preload', 'none')
})

test('failed_video_keeps_poster_and_contact', async ({ page }) => {
  await page.route('**/videos/mrmg/restaurant-production.mp4', r => r.abort())
  await page.goto('/', { waitUntil: 'domcontentloaded' })
  await expect(page.getByRole('button', { name: 'Play Restaurant content', exact: true })).toBeVisible()
  await page.getByRole('button', { name: 'Play Restaurant content', exact: true }).click()
  const card = page.getByRole('article', { name: 'Restaurant content', exact: true })

  await expect(card.getByText('Video unavailable', { exact: true })).toBeVisible()
  await expect(card.getByRole('img')).toBeVisible()
  await expect(card.getByRole('link', { name: 'Start a project' })).toHaveAttribute('href', '/contact-us')
})

test('portrait_layout_has_no_overflow', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' })
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
  const frame = page.locator('#work [data-media-frame]').first()

  await expect(frame).toBeVisible()
  const box = await frame.boundingBox()

  expect(box).not.toBeNull()
  expect(box!.width / box!.height).toBeCloseTo(9 / 16, 2)

  for (const image of await page.locator('img').filter({ visible: true }).all()) {
    await image.scrollIntoViewIfNeeded()
    await expect.poll(() => image.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0)).toBe(true)
  }

  await page.screenshot({
    path: `.superpowers/sdd/2026-09-30-mrmarketing-refinement/home-${page.viewportSize()!.width}.png`,
    fullPage: true
  })
})

test('legacy_routes_and_collective_resolve', async ({ request }) => {
  const routes = [
    'content-creation',
    'event-marketing',
    'brand-strategy',
    'social-media-management',
    'sponsorship-partnerships',
    'flyers-creative-design',
    'paid-advertising',
    'the-mr-collective'
  ]

  for (const slug of routes) expect((await request.get(`/services/${slug}`)).status(), slug).toBe(200)

  for (const slug of ['chefs-roma-kitchen', 'made-events', 'saffron-lounge', 'tuscan-cove', 'past-curfew']) {
    expect((await request.get(`/projects/${slug}`)).status(), slug).toBe(200)
  }

  expect((await request.get('/services/not-a-real-service')).status()).toBe(404)
  expect(await (await request.get('/sitemap.xml')).text()).toContain('/services/the-mr-collective')
})
