// React Imports
import type { ReactNode } from 'react'

// Component Imports
import Footer from '@/components/layout/footer'
import Header from '@/components/layout/header'
import type { Navigation } from '@/components/layout/header-navigation'

const navigationData: Navigation[] = [
  {
    title: 'Home',
    href: '/#home'
  },
  {
    title: 'Services',
    contentClassName: 'w-80!',
    items: [
      {
        title: 'Content Creation',
        href: '/services/content-creation',
        description: 'Short-form video, photography, Reels, and TikToks shot on-site.'
      },
      {
        title: 'Event Marketing',
        href: '/services/event-marketing',
        description: 'Strategy, promotion, flyers, and day-of execution.'
      },
      {
        title: 'Brand Strategy',
        href: '/services/brand-strategy',
        description: 'Positioning, voice, identity, and messaging.'
      },
      {
        title: 'Social Media Management',
        href: '/services/social-media-management',
        description: 'Instagram, TikTok, and Facebook, fully managed.'
      },
      {
        title: 'Sponsorship & Partnerships',
        href: '/services/sponsorship-partnerships',
        description: 'Liquor brands, local creators, and industry players.'
      },
      {
        title: 'Flyers & Creative Design',
        href: '/services/flyers-creative-design',
        description: 'Promo materials for Stories, print, and everywhere else.'
      },
      {
        title: 'Paid Advertising',
        href: '/services/paid-advertising',
        description: 'Meta and Instagram Ads that drive foot traffic and bookings.'
      }
    ]
  },
  {
    title: 'Clients',
    href: '/projects'
  },
  {
    title: 'About',
    href: '/about-us'
  },
  {
    title: 'Start a Project',
    href: '/contact-us'
  }
]

/**
 * Marketing Layout
 * This layout wraps all public marketing pages with header and footer
 * Used for: Landing, Blog, Contact, etc.
 */
export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <div className='flex h-full w-full min-w-0 flex-col'>
      {/* Header Section */}
      <Header navigationData={navigationData} />

      {/* Main Content */}
      <main className='flex-1 *:scroll-mt-20'>{children}</main>

      {/* Footer Section */}
      <Footer />
    </div>
  )
}
