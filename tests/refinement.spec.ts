import { test, expect, type Page } from '@playwright/test'

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
  await expect(card.getByRole('link', { name: 'Start a project' })).toHaveAttribute('href', '/contact-us#inquiry')
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
  await expect(page.getByText('Opens your email app. Your inquiry is sent when you send the email.')).toBeVisible()
  await email.focus()
  await expect(email).toBeFocused()
  await expect(page.getByRole('button', { name: 'Subscribe', exact: true })).toHaveCount(0)
  await expect(page.locator('main')).not.toContainText(/inquiry received|sent to maria|Maria will call|you.re booked/i)
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
})

const completeInquiry = async (page: Page) => {
  const form = page.locator('#inquiry')

  await expect(form.getByRole('radio', { name: /^Mr\. Social/ })).toBeChecked()
  await form.getByRole('button', { name: 'Continue' }).click()
  await form.getByRole('button', { name: 'Continue' }).click()
  await expect(form.getByText('Choose a budget range.')).toBeVisible()
  await form.locator('label', { hasText: 'Prefer to discuss' }).click()
  await form.locator('label', { hasText: 'Within 1–3 months' }).click()
  await form.getByRole('button', { name: 'Continue' }).click()
  await form.getByRole('button', { name: 'Send to Maria' }).click()
  await expect(form.getByText('Enter your name.')).toBeVisible()
  await form.getByLabel('Name').fill('Test Visitor')
  await form.getByLabel('Email').fill('visitor@example.com')
  await form.getByLabel('Your brand and goals').fill('Launching a new rooftop bar and want an opening event.')
  await form.getByRole('button', { name: 'Send to Maria' }).click()
}

test('inquiry_form_qualifies_and_falls_back_honestly', async ({ page }) => {
  await page.route('**/api/inquiry', r => r.fulfill({ status: 503, json: { status: 'not_configured' } }))
  await page.goto('/contact-us?service=social#inquiry', { waitUntil: 'load' })
  await completeInquiry(page)
  await expect(page.getByText('has not been sent', { exact: false })).toBeVisible()
  await expect(page.locator('main')).not.toContainText(/sent to maria/i)
  const fallback = page.getByRole('link', { name: 'Open email with my answers' })
  const body = decodeURIComponent((await fallback.getAttribute('href'))!.split('body=')[1])

  expect(body).toContain('Offering: Mr. Social')
  expect(body).toContain('Timeline: Within 1–3 months')
  expect(body).toContain('Launching a new rooftop bar')
})

test('inquiry_form_confirms_only_real_delivery', async ({ page }) => {
  await page.route('**/api/inquiry', r => r.fulfill({ status: 200, json: { status: 'sent' } }))
  await page.goto('/contact-us?service=social#inquiry', { waitUntil: 'load' })
  await completeInquiry(page)
  await expect(page.getByRole('heading', { name: 'Sent to Maria' })).toBeVisible()
})

test('inquiry_api_validates_and_reports_unconfigured', async ({ request }) => {
  expect((await request.post('/api/inquiry', { data: { service: 'social' } })).status()).toBe(400)

  const valid = {
    service: 'social',
    budget: 'Prefer to discuss',
    timeline: 'Just exploring',
    name: 'Test Visitor',
    email: 'visitor@example.com',
    message: 'Hello, testing the inquiry endpoint.'
  }

  if (!process.env.RESEND_API_KEY) {
    const res = await request.post('/api/inquiry', { data: valid })

    expect(res.status()).toBe(503)
    expect((await res.json()).status).toBe('not_configured')
  }

  expect((await (await request.post('/api/inquiry', { data: { ...valid, website: 'spam' } })).json()).status).toBe(
    'sent'
  )
})

test('mobile_sticky_cta_appears_after_hero', async ({ page }) => {
  test.skip(page.viewportSize()!.width >= 768, 'mobile only')
  await page.goto('/', { waitUntil: 'load' })
  const bar = page.locator('a[data-track-location="mobile_sticky"]')
  const wrapper = bar.locator('..')

  // Hidden bars stay in the DOM but are inert and hidden from assistive tech
  await expect(wrapper).toHaveAttribute('aria-hidden', 'true')
  await page.evaluate(() => window.scrollTo(0, window.innerHeight * 1.5))
  await expect(wrapper).toHaveAttribute('aria-hidden', 'false')
  await expect(bar).toBeInViewport()
  await expect(bar).toHaveAttribute('href', '/contact-us#inquiry')
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

test('every_page_routes_into_the_inquiry_funnel', async ({ request }) => {
  const routes = [
    '/',
    '/about-us',
    '/teams',
    '/services',
    '/projects',
    '/services/content-creation',
    '/services/brand-strategy',
    '/projects/tuscan-cove',
    '/projects/made-events',
    '/not-a-page'
  ]

  for (const route of routes) {
    const html = await (await request.get(route)).text()
    const main = html.split('<main')[1]?.split('</main>')[0] ?? html

    expect(main, `${route} has an inquiry CTA`).toMatch(/href="\/contact-us(\?service=\w+)?#inquiry"/)
    expect(main, `${route} has an onward page`).toMatch(/href="\/(projects|services|about-us)/)
  }
})

test('service_and_project_pages_preselect_their_offering', async ({ request }) => {
  const expectations: [string, string][] = [
    ['/services/content-creation', 'creative'],
    ['/services/the-mr-collective', 'collective'],
    ['/services/event-marketing', 'social'],
    ['/services/sponsorship-partnerships', 'connected'],
    ['/services/social-media-management', 'creative'],
    ['/projects/saffron-lounge', 'creative'],
    ['/projects/made-events', 'social']
  ]

  for (const [route, service] of expectations) {
    const html = await (await request.get(route)).text()

    expect(html, route).toContain(`href="/contact-us?service=${service}#inquiry"`)
  }
})

test('video_stills_only_appear_as_playable_films', async ({ page }) => {
  for (const route of [
    '/',
    '/services',
    '/projects',
    '/services/content-creation',
    '/services/the-mr-collective',
    '/services/event-marketing',
    '/services/social-media-management',
    '/projects/tuscan-cove'
  ]) {
    await page.goto(route, { waitUntil: 'domcontentloaded' })

    // A poster frame anywhere else looks like a video that can't be played
    const orphanStills = await page.evaluate(() =>
      [...document.querySelectorAll('img')]
        .filter(img => /-poster\.webp/.test(img.src))
        .filter(img => !img.closest('article')?.querySelector('button[aria-label^="Play"]'))
        .map(img => img.src)
    )

    expect(orphanStills, route).toEqual([])
  }

  await page.goto('/services/event-marketing', { waitUntil: 'load' })
  await expect(page.getByRole('button', { name: 'Play Community event coverage', exact: true })).toBeVisible()
})

test('server_field_errors_land_on_a_visible_step', async ({ page }) => {
  await page.route('**/api/inquiry', r =>
    r.fulfill({
      status: 400,
      json: { status: 'invalid', errors: { company: 'That’s a little long — please shorten it.' } }
    })
  )
  await page.goto('/contact-us?service=social#inquiry', { waitUntil: 'load' })
  await completeInquiry(page)
  const form = page.locator('#inquiry')

  // Previously this stranded the visitor on an empty "Step 0 of 3"
  await expect(form.getByText('Step 3 of 3')).toBeVisible()
  await expect(form.getByText('That’s a little long — please shorten it.')).toBeVisible()
  await expect(form.getByLabel('Business or brand')).toHaveAttribute('maxlength', '160')
})

test('inquiry_api_rejects_cross_site_and_non_json_posts', async ({ request, baseURL }) => {
  const valid = {
    service: 'social',
    budget: 'Prefer to discuss',
    timeline: 'Just exploring',
    name: 'Test Visitor',
    email: 'visitor@example.com',
    message: 'Hello, testing the inquiry endpoint.'
  }

  const plain = await request.post('/api/inquiry', {
    headers: { 'content-type': 'text/plain' },
    data: JSON.stringify(valid)
  })

  expect(plain.status()).toBe(415)

  const crossSite = await request.post('/api/inquiry', { headers: { origin: 'https://evil.example' }, data: valid })

  expect(crossSite.status()).toBe(403)

  const sameSite = await request.post('/api/inquiry', { headers: { origin: baseURL! }, data: valid })

  expect([200, 503]).toContain(sameSite.status())
})

test('links_are_not_announced_as_buttons', async ({ request }) => {
  for (const route of ['/', '/services/content-creation', '/projects/tuscan-cove', '/teams']) {
    const html = await (await request.get(route)).text()

    expect(html.match(/<a\b[^>]*role="button"/g) ?? [], route).toEqual([])
  }
})

test('projects_list_in_a_stable_featured_first_order', async ({ request }) => {
  const html = await (await request.get('/projects')).text()
  const order = ['Chef&#x27;s Roma Kitchen', 'MADE Events', 'Saffron Lounge', 'Tuscan Cove Bar + Patio', 'Past Curfew']
  const positions = order.map(title => html.indexOf(title))

  expect(positions.every(position => position > -1)).toBe(true)
  expect([...positions].sort((a, b) => a - b)).toEqual(positions)
})
