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
import { teamMembers } from '@/assets/data/team-members'

export const metadata: Metadata = generateSEOMetadata({
  title: 'Teams',
  description: 'Meet Maria Romano, founder of MR Marketing Group: professional DJ, marketer, and Las Vegas creative.',
  url: '/teams',
  keywords: ['team', 'people', 'about', 'culture', 'careers']
})

const TeamsPage = () => {
  const jsonLd = combineSchemas(
    generateWebsiteSchema(),
    generateWebPageSchema({
      name: 'Teams',
      description:
        'Meet Maria Romano, founder of MR Marketing Group: professional DJ, marketer, and Las Vegas creative.',
      url: '/teams'
    })
  )

  return (
    <>
      <div>
        <HeroSection />
        <Teams teamMembers={teamMembers} />
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
