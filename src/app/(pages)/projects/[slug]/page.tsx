// React Imports
import type { ComponentType, SVGProps } from 'react'

import Link from 'next/link'

// Next Imports
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

// Third-party Imports
import { IconEye, IconPhoneCall } from '@tabler/icons-react'

import { Button } from '@/components/ui/button'

// Component Imports
import MDXContent from '@/components/mdx-content'
import RelatedProjectSection from '@/components/projects/related-project-section/related-project-section'
import ContentLayout from '@/components/layout/content-layout'
import { Card, CardContent } from '@/components/ui/card'
import { CTABand } from '@/components/blocks/home/funnel-sections'
import PillarLinks from '@/components/blocks/funnel/pillar-links'
import MediaFeature from '@/components/blocks/media-feature'
import { getPillar, inquiryHref, projectPillars } from '@/lib/funnel'
import { servicePillars } from '@/assets/data/service-pillars'
import { SectionHeader } from '@/components/ui/section-header'
import Faq from '@/components/blocks/faq'
import BeamRays from '@/components/ui/beam-rays'

// Util Imports
import { getProjectBySlug, getProjects } from '@/lib/projects'
import {
  generateMetadata as generateSEOMetadata,
  combineSchemas,
  generateWebsiteSchema,
  generateWebPageSchema,
  generateBreadcrumbSchema
} from '@/lib/seo'

// Data Imports
import FigmaIcon from '@/assets/svg/figma-icon'
import FrammerIcon from '@/assets/svg/frammer-icon'
import GithubIcon from '@/assets/svg/github-icon'
import NotionIcon from '@/assets/svg/notion-icon'
import MiroIcon from '@/assets/svg/miro-icon'
import { faqItems } from '@/assets/data/faq'

const toolIcons: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  Figma: FigmaIcon,
  Framer: FrammerIcon,
  GitHub: GithubIcon,
  Notion: NotionIcon,
  Miro: MiroIcon
}

export async function generateStaticParams() {
  const projects = await getProjects()

  return projects.map(project => ({ slug: project.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params

  const project = await getProjectBySlug(slug)

  if (!project) {
    return {}
  }

  const { metadata } = project

  return generateSEOMetadata({
    title: metadata.title,
    description: metadata.description,
    url: `/projects/${metadata.slug}`,
    keywords: metadata.keywords,
    type: 'article',
    image: metadata.image
  })
}

export const dynamicParams = false

const ProjectDetailsPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params
  const projects = await getProjects()

  const project = await getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  const { metadata, content } = project

  const pillarIds = projectPillars(metadata.services)
  const primaryPillar = getPillar(pillarIds[0])

  // Prefer related work that shares an offering with this project
  const others = projects.filter(project => project.slug !== slug)

  const sharesOffering = (project: (typeof projects)[number]) =>
    projectPillars(project.services).some(id => pillarIds.includes(id))

  const relatedProjects = [...others.filter(sharesOffering), ...others.filter(p => !sharesOffering(p))].slice(0, 2)

  const jsonLd = combineSchemas(
    generateWebsiteSchema(),
    generateWebPageSchema({
      name: metadata.title ?? '',
      description: metadata.description ?? '',
      url: `/projects/${metadata.slug}`
    }),
    generateBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Projects', url: '/projects' },
      { name: metadata.title ?? '', url: `/projects/${metadata.slug}` }
    ])
  )

  return (
    <>
      <section className='bg-card grid w-full grid-cols-1 gap-8 pt-36 pb-8 sm:pt-44 sm:pb-16 lg:pt-52 lg:pb-24'>
        <ContentLayout className='space-y-10'>
          <div className='relative mb-8 space-y-4 text-center sm:mb-16 md:mb-24'>
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
              badge={metadata.slug}
              title={metadata.title}
              description={metadata.description}
              badgeClassName='bg-card z-1'
            />
            <div className='space-x-4'>
              {metadata.liveWebsite && (
                <Button size='lg' render={<Link target='_blank' href={metadata.liveWebsite} />} nativeButton={false}>
                  Preview <IconEye data-icon='inline-end' />
                </Button>
              )}
              <Button
                size='lg'
                variant='secondary'
                render={
                  <Link
                    href={inquiryHref(primaryPillar?.id)}
                    data-track='cta_book_call'
                    data-track-location={`project_${slug}_hero`}
                  />
                }
                nativeButton={false}
              >
                Start a Project <IconPhoneCall data-icon='inline-end' />
              </Button>
            </div>
          </div>
          <Card className='bg-background shadow-surface ring-0'>
            <CardContent className='grid grid-cols-2 justify-items-center gap-4 sm:grid-cols-2'>
              <div className='flex flex-col items-center'>
                <div className='text-base font-medium'>Industry</div>
                <div className='text-muted-foreground text-sm'>{metadata.industry}</div>
              </div>
              <div className='flex flex-col items-center'>
                <div className='text-base font-medium'>Category</div>
                <div className='text-muted-foreground text-sm'>{metadata.category}</div>
              </div>
            </CardContent>
          </Card>

          <div className='bg-background rounded-[calc(var(--radius)*1.4+1rem)] p-4 sm:rounded-[calc(var(--radius)*1.4+1.5rem)] sm:p-6 md:p-10'>
            <MediaFeature image={metadata.image} video={metadata.video} alt={metadata.title ?? ''} />
          </div>

          {metadata.tools && metadata.tools.length > 0 && (
            <Card className='bg-background shadow-surface ring-0'>
              <CardContent className='flex flex-wrap items-center gap-6'>
                <span className='text-base font-semibold'>Tools:</span>
                {metadata.tools.map(tool => {
                  const Icon = toolIcons[tool]

                  return (
                    <span key={tool} className='flex items-center gap-1.5 text-sm font-medium'>
                      {Icon && <Icon className='size-6' />} {tool}
                    </span>
                  )
                })}
              </CardContent>
            </Card>
          )}

          <div>
            <MDXContent source={content} />
          </div>
        </ContentLayout>
      </section>
      <PillarLinks
        eyebrow='Behind this work'
        title='The offerings we used.'
        description='Each one can be the start of your project.'
        pillars={servicePillars.filter(pillar => pillarIds.includes(pillar.id))}
        location={`project_${slug}_offerings`}
      />
      <RelatedProjectSection
        projects={relatedProjects}
        badge='More work'
        title='Similar brands we’ve worked with.'
        description='More Las Vegas restaurants, lounges, and events.'
        service={primaryPillar?.id}
        location={`project_${slug}_related`}
      />
      <Faq faqItems={faqItems} background='bg-card' />
      <CTABand
        location={`project_${slug}_final`}
        eyebrow='Your brand next'
        headline='Want work like this for your brand?'
        body='Tell Maria what you’re building. The form starts with the offering behind this project; change it any time.'
        service={primaryPillar?.id}
        secondary={primaryPillar ? { label: `Explore ${primaryPillar.name}`, href: primaryPillar.href } : undefined}
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

export default ProjectDetailsPage
