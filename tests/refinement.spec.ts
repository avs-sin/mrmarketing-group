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
const EMAIL = 'Maria@mrmarketing-group.com'

const parseMailto = (href: string) => {
  const [address, query] = href.replace(/^mailto:/, '').split('?')

  const params = Object.fromEntries(
    query.split('&').map(pair => {
      const [key, value] = pair.split('=')

      return [key, decodeURIComponent(value)]
    })
  )

  return { address, subject: params.subject, body: params.body }
}

test('contact_email_maria_is_prefilled_and_honest', async ({ page }) => {
  await page.goto('/contact-us?service=creative#inquiry', { waitUntil: 'load' })
  const panel = page.locator('#inquiry')
  const email = panel.getByRole('link', { name: 'Email Maria', exact: true })

  await expect(panel.getByText('Mr. Creative · Content Production & Social Media Management')).toBeVisible()
  const href = (await email.getAttribute('href'))!

  // Encoded per RFC 6068: CRLF line breaks, no raw spaces, and the address untouched
  expect(href.startsWith(`mailto:${EMAIL}?subject=`)).toBe(true)
  expect(href).toContain('%0D%0A')
  expect(href).not.toMatch(/\s/)
  const mail = parseMailto(href)

  expect(mail.address).toBe(EMAIL)
  expect(mail.subject).toBe('Project inquiry: Mr. Creative (Content Production & Social Media Management)')
  expect(mail.body).toContain('I am interested in Mr. Creative (Content Production & Social Media Management).')
  expect(mail.body).toContain('\r\nMy business or brand:\r\n')

  await expect(panel.getByText('Nothing is sent until you press send in your email app.')).toBeVisible()
  await expect(panel.getByText(EMAIL, { exact: true })).toBeVisible()
  await expect(panel.locator('a[href="tel:+17249710239"]')).toBeVisible()
  await expect(panel.getByRole('link', { name: 'privacy notice' })).toHaveAttribute('href', '/privacy')

  // The old multi-step form, its fields, and delivery promises are gone
  await expect(page.locator('main form, main input, main textarea')).toHaveCount(0)
  await expect(page.locator('main')).not.toContainText(/step \d of|inquiry received|sent to maria|in maria.s inbox/i)
  await email.focus()
  await expect(email).toBeFocused()
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
})

test('contact_topic_follows_the_link_and_can_change', async ({ page }) => {
  await page.goto('/contact-us', { waitUntil: 'load' })
  const panel = page.locator('#inquiry')
  const email = panel.getByRole('link', { name: 'Email Maria', exact: true })

  expect(parseMailto((await email.getAttribute('href'))!).subject).toBe('Project inquiry')
  await panel.getByRole('link', { name: 'Mr. Social', exact: true }).click()
  await expect(page).toHaveURL(/service=social/)
  await expect
    .poll(async () => parseMailto((await email.getAttribute('href'))!).subject)
    .toBe('Project inquiry: Mr. Social (Events & Experiences)')
  expect(await email.getAttribute('href')).toContain('%26')
  await panel.getByRole('link', { name: 'Not sure yet', exact: true }).click()
  await expect
    .poll(async () => parseMailto((await email.getAttribute('href'))!).subject)
    .toBe('Project inquiry: help choosing an offering')
})

test('copy_address_works_and_falls_back_to_selection', async ({ page, context, browserName }) => {
  test.skip(browserName !== 'chromium', 'clipboard permissions are Chromium-only')
  await context.grantPermissions(['clipboard-read', 'clipboard-write'])
  await page.goto('/contact-us#inquiry', { waitUntil: 'load' })
  await page.getByRole('button', { name: 'Copy email address' }).click()
  await expect(page.getByText('Email address copied.')).toBeVisible()
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(EMAIL)

  // Blocked clipboard: the address is selected for a manual copy instead
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: () => Promise.reject(new Error('blocked')) },
      configurable: true
    })
  })
  await page.reload({ waitUntil: 'load' })
  await page.getByRole('button', { name: 'Copy email address' }).click()
  await expect(page.getByText(/The address is selected/)).toBeVisible()
  expect(await page.evaluate(() => window.getSelection()?.toString())).toBe(EMAIL)
})

test('obsolete_inquiry_endpoint_is_removed', async ({ request }) => {
  const res = await request.post('/api/inquiry', { data: { name: 'Test' } })

  expect(res.status()).toBe(404)
})

test('legacy_hash_links_land_on_matching_sections', async ({ page }) => {
  await page.goto('/', { waitUntil: 'load' })

  for (const id of ['home', 'about', 'services', 'work', 'contact']) {
    await expect(page.locator(`[id="${id}"]`), id).toHaveCount(1)
  }

  await page.goto('/#contact', { waitUntil: 'load' })
  const contact = page.locator('#contact')

  await expect(contact).toBeInViewport()
  await expect(contact.getByRole('link', { name: 'Email Maria' })).toHaveAttribute('href', /^mailto:Maria@/)
  await page.goto('/#about', { waitUntil: 'load' })
  await expect(page.locator('#about').getByRole('heading', { name: 'Maria Romano' })).toBeInViewport()
})

test('public_pages_have_no_theme_customizer', async ({ page }) => {
  await page.goto('/', { waitUntil: 'load' })
  await expect(page.locator('header button').filter({ hasText: /theme|customi/i })).toHaveCount(0)
  await expect(page.locator('header [aria-label*="theme" i], header [aria-label*="customi" i]')).toHaveCount(0)
  const before = await page.evaluate(() => document.documentElement.className)

  await page.keyboard.press('d')
  await page.waitForTimeout(300)
  expect(await page.evaluate(() => document.documentElement.className)).toBe(before)
})

test('privacy_notice_is_linked_and_indexed', async ({ page, request }) => {
  await page.goto('/privacy', { waitUntil: 'load' })
  await expect(page.getByRole('heading', { level: 1, name: 'Privacy notice' })).toBeVisible()
  await expect(page.locator('main')).toContainText('does not run analytics or advertising scripts')
  await expect(page.locator('footer').getByRole('link', { name: 'Privacy' })).toHaveAttribute('href', '/privacy')
  expect(await (await request.get('/sitemap.xml')).text()).toContain('/privacy</loc>')
})

test('structured_data_is_valid_and_supported', async ({ request }) => {
  for (const route of ['/', '/contact-us', '/services/content-creation', '/projects/tuscan-cove', '/privacy']) {
    const html = await (await request.get(route)).text()
    const blocks = [...html.matchAll(/<script type="application\/ld\+json">([^<]*)<\/script>/g)].map(m => m[1])

    expect(blocks.length, route).toBeGreaterThan(0)
    const graph = blocks.flatMap(block => JSON.parse(block)['@graph'])
    const org = graph.find(node => node['@type'] === 'Organization')

    if (route !== '/projects/tuscan-cove') expect(org, route).toBeTruthy()

    if (org) {
      expect(org.address.streetAddress).toBeUndefined()
      expect(org.aggregateRating).toBeUndefined()
    }

    if (route.startsWith('/services/')) expect(graph.some(node => node['@type'] === 'Service')).toBe(true)
  }
})

test('share_previews_use_raster_images', async ({ request }) => {
  for (const slug of ['chefs-roma-kitchen', 'made-events', 'saffron-lounge', 'tuscan-cove', 'past-curfew']) {
    const html = await (await request.get(`/projects/${slug}`)).text()
    const image = html.match(/<meta property="og:image" content="([^"]+)"/)?.[1]

    expect(image, slug).toMatch(/\.(png|jpe?g|webp)$/)
    expect((await request.get(new URL(image!).pathname)).status(), slug).toBe(200)
  }
})

test('service_pages_explain_fit_and_link_to_on_page_work', async ({ page }) => {
  await page.goto('/services/content-creation', { waitUntil: 'load' })
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Mr. Creative')
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Content Production & Social Media Management')
  await expect(page.getByRole('heading', { name: 'Content production', exact: true })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Social media management', exact: true })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'A good fit for' })).toBeVisible()
  await expect(page.getByRole('link', { name: 'See related work' })).toHaveAttribute('href', '#work')
  await expect(page.locator('#work')).toHaveCount(1)
  await expect(page).toHaveTitle('Mr. Creative: Content Production & Social Media Management | Mr. Marketing Group')

  // Hero actions no longer point to the same destination twice
  const heroLinks = await page.locator('main section').first().locator('a[data-track]').evaluateAll(links =>
    links.map(link => link.getAttribute('href'))
  )

  expect(new Set(heroLinks).size).toBe(heroLinks.length)
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
    '/privacy',
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

test('mobile_menu_opens_navigates_and_closes', async ({ page }) => {
  test.skip(page.viewportSize()!.width >= 1024, 'mobile menu only')
  await page.goto('/', { waitUntil: 'load' })
  const trigger = page.getByRole('button', { name: 'Menu' })

  await trigger.click()
  const sheet = page.getByRole('dialog')

  await expect(sheet.getByRole('link', { name: 'Contact Maria' })).toHaveAttribute('href', '/contact-us#inquiry')
  await page.keyboard.press('Escape')
  await expect(sheet).toBeHidden()
  await trigger.click()
  await sheet.getByRole('button', { name: 'Services' }).click()
  await sheet.getByRole('link', { name: 'Mr. Creative' }).click()
  await expect(page).toHaveURL(/\/services\/content-creation$/)
  await expect(page.getByRole('dialog')).toBeHidden()
})
