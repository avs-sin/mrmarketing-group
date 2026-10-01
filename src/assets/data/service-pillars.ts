export type ServicePillar = {
  id: 'creative' | 'collective' | 'social' | 'connected'
  name: string
  descriptor: string
  href: string
  description: string
}

export const servicePillars: readonly ServicePillar[] = [
  {
    id: 'creative',
    name: 'Mr. Creative',
    descriptor: 'Content Production & Social Media Management',
    href: '/services/content-creation',
    description:
      'Cinematic video, photography, and a thoughtfully managed social presence, from concept to publication.'
  },
  {
    id: 'collective',
    name: 'The Mr. Collective',
    descriptor: 'UGC & Influencer Marketing',
    href: '/services/the-mr-collective',
    description: 'Authentic stories and elevated content, made with creators who fit your brand and audience.'
  },
  {
    id: 'social',
    name: 'Mr. Social',
    descriptor: 'Events & Experiences',
    href: '/services/event-marketing',
    description:
      'Launch parties, private dinners, community gatherings, and brand activations that bring people together.'
  },
  {
    id: 'connected',
    name: 'Mr. Connected',
    descriptor: 'Brand Partnerships',
    href: '/services/sponsorship-partnerships',
    description: 'Purposeful sponsorships and collaborations that connect brands, venues, and organizations.'
  }
]
