// Next Imports
import type { Metadata } from 'next'

// Component Imports
import ProjectSection from '@/components/projects/project-section/project-section'

// Util Imports
import {
  generateMetadata as generateSEOMetadata,
  combineSchemas,
  generateWebsiteSchema,
  generateWebPageSchema
} from '@/lib/seo'
import { CTABand } from '@/components/blocks/home/funnel-sections'
import PillarLinks from '@/components/blocks/funnel/pillar-links'
import { servicePillars } from '@/assets/data/service-pillars'
import { getProjects } from '@/lib/projects'

export const metadata: Metadata = generateSEOMetadata({
  title: 'Projects',
  description: 'Selected creative work and portfolio entries from Mr. Marketing Group.',
  url: '/projects',
  keywords: ['projects', 'portfolio', 'case studies', 'work']
})

const ProjectsPage = async () => {
  const projects = await getProjects()

  const jsonLd = combineSchemas(
    generateWebsiteSchema(),
    generateWebPageSchema({
      name: 'Projects',
      description: 'Selected creative work and portfolio entries from Mr. Marketing Group.',
      url: '/projects'
    })
  )

  return (
    <>
      <ProjectSection projects={projects} />
      <PillarLinks
        eyebrow='How we made it'
        title='Four ways to connect.'
        description='Every project here started with one of these offerings.'
        pillars={servicePillars}
        location='projects_offerings'
        className='bg-card'
      />
      <CTABand
        location='projects_final'
        eyebrow='Your brand next'
        headline='Like what you see? Let’s make yours.'
        secondary={{ label: 'Explore our offerings', href: '/services' }}
      />

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

export default ProjectsPage
