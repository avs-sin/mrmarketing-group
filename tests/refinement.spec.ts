import { test, expect } from '@playwright/test'

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
