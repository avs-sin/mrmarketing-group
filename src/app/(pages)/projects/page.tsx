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
import { getProjects } from '@/lib/projects'

export const metadata: Metadata = generateSEOMetadata({
  title: 'Projects',
  description:
    "The Las Vegas restaurants, lounges, and event brands we build: Chef's Roma Kitchen, Tuscan Cove, Saffron Lounge, MADE Events, and Past Curfew.",
  url: '/projects',
  keywords: ['projects', 'portfolio', 'case studies', 'work']
})

const ProjectsPage = async () => {
  const projects = await getProjects()

  const jsonLd = combineSchemas(
    generateWebsiteSchema(),
    generateWebPageSchema({
      name: 'Projects',
      description:
        "The Las Vegas restaurants, lounges, and event brands we build: Chef's Roma Kitchen, Tuscan Cove, Saffron Lounge, MADE Events, and Past Curfew.",
      url: '/projects'
    })
  )

  return (
    <>
      <ProjectSection projects={projects} />

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
