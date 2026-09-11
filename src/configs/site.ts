export type SiteConfig = typeof siteConfig

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

export const siteConfig = {
  name: 'MR Marketing Group',
  brand: 'MR Marketing Group',
  description:
    'MR Marketing Group is a Las Vegas-based full-service marketing agency specializing in content creation, event marketing, and brand strategy for restaurants, nightlife venues, and entertainment brands.',
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
