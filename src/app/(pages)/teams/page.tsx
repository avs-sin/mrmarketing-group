// Next Imports
import type { Metadata } from 'next'

// Component Imports
import HeroSection from '@/components/blocks/teams-page'
import Teams from '@/components/blocks/teams-page/team'

// Util Imports
import {
  generateMetadata as generateSEOMetadata,
  combineSchemas,
  generateWebsiteSchema,
  generateWebPageSchema
} from '@/lib/seo'

// Data Imports
import { CTABand } from '@/components/blocks/home/funnel-sections'
import { teamMembers } from '@/assets/data/team-members'

export const metadata: Metadata = generateSEOMetadata({
  title: 'Founder',
  description: 'Meet Maria Romano, founder of Mr. Marketing Group, entrepreneur and open-format DJ.',
  url: '/teams',
  keywords: ['Maria Romano', 'founder', 'open-format DJ', 'Las Vegas']
})

const TeamsPage = () => {
  const jsonLd = combineSchemas(
    generateWebsiteSchema(),
    generateWebPageSchema({
      name: 'Founder',
      description: 'Meet Maria Romano, founder of Mr. Marketing Group, entrepreneur and open-format DJ.',
      url: '/teams'
    })
  )

  return (
    <>
      <div>
        <HeroSection />
        <Teams teamMembers={teamMembers} />
        <CTABand
          location='teams_final'
          eyebrow='Work with Maria'
          headline='Put Maria’s perspective on your brand.'
          secondary={{ label: 'Explore our offerings', href: '/services' }}
        />
      </div>

      {/* Add JSON-LD to your page */}
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c')
        }}
      />
    </>
  )
}

export default TeamsPage
