// Next Imports
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

// Component Imports
import HeroSection from '@/components/service-detail/hero-section'
import WhatWeDo from '@/components/service-detail/what-we-do/what-we-do'
import Process from '@/components/service-detail/process'
import Faq from '@/components/blocks/faq'
import CTASection from '@/components/blocks/cta-section'

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
      <Faq faqItems={faqItems} background='bg-card' />
      <CTASection />

      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
    </div>
  )
}

export default ServiceDetailsPage
