// Next Imports
import Link from 'next/link'

// Third-party Imports
import { IconArrowRight, IconPhoneCall } from '@tabler/icons-react'

// Component Imports
import { Button } from '@/components/ui/button'
import { SectionHeader } from '@/components/ui/section-header'
import ContentLayout from '@/components/layout/content-layout'
import { ProjectCard } from '@/components/ui/project-cards'
import { inquiryHref } from '@/lib/funnel'

export type ProjectsProp = {
  slug: string
  title?: string
  description?: string
  isFeatured?: boolean
  category?: string
  industry?: string
  timeline?: string
  liveWebsite?: string
  releaseDate?: string
  tools?: string[]
  image?: string
  keywords?: string[]
}

const RecentProjects = ({ projectData }: { projectData: ProjectsProp[] }) => {
  return (
    <section className='bg-card overflow-hidden py-8 sm:py-16 lg:py-24'>
      <ContentLayout>
        {/* Header */}
        <div className='mb-12 space-y-4 text-center sm:mb-16 lg:mb-24'>
          <SectionHeader
            title='Selected Portfolio.'
            description='Explore selected content, creative, and event portfolio entries.'
          />
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
              render={<Link href={inquiryHref()} data-track='cta_book_call' data-track-location='recent_projects' />}
              nativeButton={false}
            >
              Start a Project <IconPhoneCall data-icon='inline-end' />
            </Button>
          </div>
        </div>

        <div className='grid grid-cols-1 gap-6 rounded-xl md:grid-cols-2'>
          {projectData.map(project => (
            <Link key={project.slug} href={`/projects/${project.slug}`}>
              <ProjectCard
                title={project.title ?? ''}
                description={project.description ?? ''}
                image={project.image ?? ''}
                imageClassName='rounded-md bg-black object-contain md:h-75 md:w-full'
              />
            </Link>
          ))}
        </div>
      </ContentLayout>
    </section>
  )
}

export default RecentProjects
