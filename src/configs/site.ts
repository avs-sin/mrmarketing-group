export type SiteConfig = typeof siteConfig

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

export const siteConfig = {
  name: 'Mr. Marketing Group',
  brand: 'Mr. Marketing Group',
  description:
    'Mr. Marketing Group is a Las Vegas creative marketing agency combining strategy, cinematic content, social media, creator partnerships, and events.',
  url: baseUrl,
  ogImage: `${baseUrl}/images/og-image.png`,
  twitterHandle: '@wearemrmarketing',
  email: 'Maria@mrmarketing-group.com',
  phone: '+1 (724) 971-0239',
  phoneHref: 'tel:+17249710239',
  location: 'Las Vegas, NV',
  links: {
    instagram: 'https://www.instagram.com/wearemrmarketing',
    tiktok: 'https://www.tiktok.com/@iammariaromano',
    founderInstagram: 'https://www.instagram.com/iammariaromano'
  },
  creator: {
    name: 'Maria Romano',
    url: 'https://www.instagram.com/wearemrmarketing'
  }
}
