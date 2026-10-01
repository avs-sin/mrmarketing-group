// Next Imports
import Link from 'next/link'

// Third-party Imports
import { IconArrowRight, IconPhoneCall } from '@tabler/icons-react'

// Component Imports
import ContentLayout from '@/components/layout/content-layout'
import { Button } from '@/components/ui/button'
import { ProjectCard } from '@/components/ui/project-cards'
import { SectionHeader } from '@/components/ui/section-header'

// Type Imports
import type { ProjectMetadata } from '@/lib/projects'
import { inquiryHref, type PillarId } from '@/lib/funnel'

type RelatedProjectSectionProps = {
  projects: ProjectMetadata[]
  badge?: string
  title?: string
  description?: string

  /** Offering to preselect when the visitor starts a project from here */
  service?: PillarId | null
  location?: string
}

const RelatedProjectSection = ({
  projects,
  badge = 'More Clients',
  title = 'More Brands We Build.',
  description = 'More Las Vegas restaurants, lounges, and events we work with.',
  service,
  location = 'related_projects'
}: RelatedProjectSectionProps) => {
  if (!projects.length) return null

  return (
    <section className='bg-card py-8 sm:py-16 lg:py-24'>
      <ContentLayout className='space-y-8 lg:space-y-16'>
        {/* Header */}
        <div className='space-y-4 text-center'>
          <SectionHeader badge={badge} title={title} description={description} />
          <div className='space-x-4'>
            <Button size='lg' className='group' render={<Link href='/projects' />} nativeButton={false}>
              View More
              <IconArrowRight
                data-icon='inline-end'
                className='transition-[translate] duration-150 ease-out group-hover:translate-x-0.5'
              />
            </Button>
            <Button
              size='lg'
              variant='secondary'
              render={<Link href={inquiryHref(service)} data-track='cta_book_call' data-track-location={location} />}
              nativeButton={false}
            >
              Start a Project <IconPhoneCall data-icon='inline-end' />
            </Button>
          </div>
        </div>

        {/* Project Grid */}
        <div className='grid grid-cols-1 gap-6 rounded-xl md:grid-cols-2'>
          {projects.map(project => (
            <Link key={project.slug} href={`/projects/${project.slug}`}>
              <ProjectCard
                title={project.title ?? ''}
                description={project.description ?? ''}
                image={project.image ?? ''}
                imageClassName='aspect-video w-full rounded-md object-cover'
              />
            </Link>
          ))}
        </div>
      </ContentLayout>
    </section>
  )
}

export default RelatedProjectSection
