// Next Imports
import Link from 'next/link'

// Third-party Imports
import { IconArrowRight, IconPhoneCall } from '@tabler/icons-react'

// Component Imports
import ContentLayout from '@/components/layout/content-layout'
import { Button } from '@/components/ui/button'
import { ProjectCard } from '@/components/ui/project-cards'
import { SectionHeader } from '@/components/ui/section-header'
import BeamRays from '@/components/ui/beam-rays'

// Type Imports
import type { ProjectMetadata } from '@/lib/projects'

const ProjectSection = ({ projects }: { projects: ProjectMetadata[] }) => {
  return (
    <section className='bg-card pt-36 pb-8 sm:pt-44 sm:pb-16 lg:pt-52 lg:pb-24'>
      <ContentLayout>
        {/* Header */}
        <div className='relative space-y-4 text-center'>
          <BeamRays
            className='absolute inset-x-0 -top-20 max-sm:hidden'
            beamCount={3}
            beamColor='var(--primary)'
            beamRaysColor='var(--primary)'
            beamRayStroke={3}
            opacity={0.18}
            duration={3}
          />
          <SectionHeader
            headingLevel='h1'
            badge='Selected work'
            title='Stories. People. Experiences.'
            description='Explore real content from our latest media, alongside selected portfolio entries.'
            badgeClassName='z-1 bg-card'
          />
          <div className='space-x-4'>
            <Button size='lg' render={<Link href='/contact-us' />} nativeButton={false}>
              Start a Project <IconPhoneCall data-icon='inline-end' />
            </Button>
            <Button
              size='lg'
              className='group'
              variant='secondary'
              render={<Link href='/#work' />}
              nativeButton={false}
            >
              Watch selected work
              <IconArrowRight
                data-icon='inline-end'
                className='transition-[translate] duration-150 ease-out group-hover:translate-x-0.5'
              />
            </Button>
          </div>
        </div>

        {/* Project Grid */}
        <div className='grid grid-cols-1 gap-6 rounded-xl pt-8 sm:pt-16 md:grid-cols-2 lg:pt-24'>
          {projects.map(project => (
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

export default ProjectSection
