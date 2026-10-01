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

  await page.evaluate(() => window.scrollTo(0, 0))
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
test('contact_never_claims_unsent_delivery', async ({ page }) => {
  await page.goto('/contact-us', { waitUntil: 'domcontentloaded' })
  const email = page.getByRole('link', { name: 'Email Maria', exact: true })

  await expect(email).toHaveAttribute('href', 'mailto:Maria@mrmarketing-group.com?subject=Discuss%20a%20project')
  await expect(page.getByText('Maria@mrmarketing-group.com', { exact: true }).first()).toBeVisible()
  await expect(page.locator('a[href="tel:+17249710239"]').first()).toBeVisible()

  for (const name of ['Mr. Creative', 'The Mr. Collective', 'Mr. Social', 'Mr. Connected']) {
    const link = page.getByRole('link', { name: `Discuss ${name}`, exact: true })

    await expect(link).toBeVisible()
    expect(decodeURIComponent((await link.getAttribute('href'))!.split('subject=')[1])).toBe(`Discuss ${name}`)
  }

  await expect(page.getByText('Opens your email app. Your inquiry is sent when you send the email.')).toBeVisible()
  await email.focus()
  await expect(email).toBeFocused()
  await expect(page.getByRole('button', { name: 'Subscribe', exact: true })).toHaveCount(0)
  await expect(page.locator('main form')).toHaveCount(0)
  await expect(page.locator('main')).not.toContainText(/inquiry received|Maria will call|you.re booked/i)
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
})

test('all_selected_clips_play_and_captions_load', async ({ page }) => {
  await page.goto('/', { waitUntil: 'load' })

  for (const label of [
    'Restaurant content',
    'Restaurant collaboration',
    'Community event coverage',
    'Maria’s approach'
  ]) {
    const card = page.getByRole('article', { name: label, exact: true })

    await card.getByRole('button', { name: `Play ${label}`, exact: true }).click()
    const video = card.locator('video')

    await expect.poll(() => video.evaluate((el: HTMLVideoElement) => el.currentTime)).toBeGreaterThan(0)
    expect(await video.evaluate((el: HTMLVideoElement) => el.videoWidth / el.videoHeight)).toBeCloseTo(9 / 16)
    await video.evaluate((el: HTMLVideoElement) => {
      el.textTracks[0].mode = 'hidden'
    })
    await expect
      .poll(() => video.evaluate((el: HTMLVideoElement) => el.textTracks[0].cues?.length ?? 0))
      .toBeGreaterThan(0)
    await video.evaluate((el: HTMLVideoElement) => el.pause())
  }
})

test('supporting_pages_load_images_and_fit_viewport', async ({ page }) => {
  for (const route of [
    '/about-us',
    '/teams',
    '/services',
    '/services/the-mr-collective',
    '/contact-us',
    '/projects',
    '/projects/tuscan-cove'
  ]) {
    const errors: string[] = []
    const onError = (e: Error) => errors.push(e.message)

    page.on('pageerror', onError)
    await page.goto(route, { waitUntil: 'load' })
    await expect(page.locator('main h1')).toBeVisible()

    for (const image of await page.locator('main img').all()) {
      await image.scrollIntoViewIfNeeded()
      await expect.poll(() => image.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0)).toBe(true)
    }

    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), route).toBe(true)
    expect(errors, route).toEqual([])
    await page.evaluate(() => window.scrollTo(0, 0))
    await page.screenshot({
      path: `.superpowers/sdd/2026-09-30-mrmarketing-refinement/${route.slice(1).replaceAll('/', '-')}-${page.viewportSize()!.width}.png`,
      fullPage: true
    })
    page.off('pageerror', onError)
  }
})

test('service_detail_has_no_empty_sections_or_template_assets', async ({ page }) => {
  await page.goto('/services/the-mr-collective', { waitUntil: 'load' })
  const headings = await page.locator('main h2, main h3').allTextContents()

  expect(headings.filter(text => !text.trim())).toEqual([])
  await expect(page.locator('main img[src*="/images/logos/"]')).toHaveCount(0)
  await expect(page.locator('main img[src*="Sample Code"]')).toHaveCount(0)
})
