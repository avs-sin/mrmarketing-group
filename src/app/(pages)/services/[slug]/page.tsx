// Next Imports
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

// Component Imports
import HeroSection from '@/components/service-detail/hero-section'
import WhatWeDo from '@/components/service-detail/what-we-do/what-we-do'
import Process from '@/components/service-detail/process'
import Faq from '@/components/blocks/faq'
import { CTABand } from '@/components/blocks/home/funnel-sections'
import PillarLinks from '@/components/blocks/funnel/pillar-links'
import RelatedProjectSection from '@/components/projects/related-project-section/related-project-section'
import { servicePillars } from '@/assets/data/service-pillars'
import { getPillar, pillarForServiceSlug, projectPillars } from '@/lib/funnel'
import { getProjects } from '@/lib/projects'

// Util Imports
import { getServiceBySlug, getServices } from '@/lib/services'
import {
  generateMetadata as generateSEOMetadata,
  combineSchemas,
  generateWebsiteSchema,
  generateWebPageSchema,
  generateBreadcrumbSchema
} from '@/lib/seo'

// Data Imports
import { faqItems } from '@/assets/data/faq'

export async function generateStaticParams() {
  const services = await getServices()

  return services.map(service => ({ slug: service.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const service = await getServiceBySlug(slug)

  if (!service) return {}

  const { metadata } = service

  return generateSEOMetadata({
    title: metadata.title,
    description: metadata.description,
    url: `/services/${metadata.slug}`,
    keywords: metadata.keywords,
    type: 'article',
    image: metadata.image
  })
}

export const dynamicParams = false

const ServiceDetailsPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params
  const service = await getServiceBySlug(slug)

  if (!service) notFound()

  const { metadata } = service
  const pillarId = pillarForServiceSlug(slug)
  const pillar = getPillar(pillarId)
  const projects = await getProjects()

  // Work that used this offering first, then other recent work, so the section is never empty
  const relatedWork = [
    ...projects.filter(project => pillarId && projectPillars(project.services).includes(pillarId)),
    ...projects.filter(project => !pillarId || !projectPillars(project.services).includes(pillarId))
  ].slice(0, 2)

  const jsonLd = combineSchemas(
    generateWebsiteSchema(),
    generateWebPageSchema({
      name: metadata.title ?? '',
      description: metadata.description ?? '',
      url: `/services/${metadata.slug}`
    }),
    generateBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Services', url: '/services' },
      { name: metadata.title ?? '', url: `/services/${metadata.slug}` }
    ])
  )

  return (
    <div>
      <HeroSection
        badge={metadata.heroBadge}
        title={metadata.heroTitle}
        description={metadata.heroDescription}
        image={metadata.heroImage}
        slug={slug}
      />

      <WhatWeDo
        badge={metadata.whatWeDoBadge}
        title={metadata.whatWeDoTitle}
        description={metadata.whatWeDoDescription}
        items={metadata.whatWeDoItems}
      />
      <Process data={metadata.process ?? []} />
      <RelatedProjectSection
        projects={relatedWork}
        badge='Selected work'
        title={pillar ? `${pillar.name} in action.` : 'See the work.'}
        description='Real people and places from our portfolio.'
        service={pillarId}
        location={`service_${slug}_work`}
      />
      <PillarLinks
        eyebrow={pillar ? 'Pair it with' : 'Our offerings'}
        title={pillar ? 'Other ways we connect.' : 'Four ways to connect.'}
        description='Most brands combine offerings. Start with one, or let us connect the pieces.'
        pillars={servicePillars.filter(item => item.id !== pillarId)}
        location={`service_${slug}_crosslink`}
      />
      <Faq faqItems={faqItems} background='bg-card' />
      <CTABand
        location={`service_${slug}_final`}
        eyebrow={metadata.heroBadge ?? 'Let’s connect'}
        headline={pillar ? `Ready to start with ${pillar.name}?` : 'Let’s shape the right scope.'}
        body='Three quick steps and your inquiry is with Maria: what you need, your budget and timing, and how to reach you.'
        service={pillarId}
        secondary={{ label: 'See our work', href: '/projects' }}
      />

      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
    </div>
  )
}

export default ServiceDetailsPage
