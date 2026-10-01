import type { ReactNode } from 'react'

import { servicePillars } from '@/assets/data/service-pillars'

// React Imports

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
      ...servicePillars.map(pillar => ({ title: pillar.name, href: pillar.href, description: pillar.descriptor })),
      { title: 'All services', href: '/services', description: 'Explore our offerings and supporting capabilities.' }
    ]
  },
  {
    title: 'Our work',
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
