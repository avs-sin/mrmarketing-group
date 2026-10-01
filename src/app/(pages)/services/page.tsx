// Next Imports
import type { Metadata } from 'next'

// Component Imports
import CTASection from '@/components/blocks/cta-section'
import Faq from '@/components/blocks/faq'
import HeroSection from '@/components/blocks/service-page-hero-section'
import RecentProjects from '@/components/blocks/recent-projects'

// Util Imports
import { generateMetadata as generateSEOMetadata, combineSchemas, generateWebsiteSchema } from '@/lib/seo'
import { getProjects } from '@/lib/projects'
import { getServices } from '@/lib/services'

// Data Imports
import { faqItems } from '@/assets/data/faq'

export const metadata: Metadata = generateSEOMetadata({
  title: 'Services',
  description:
    'Explore Mr. Creative, The Mr. Collective, Mr. Social, and Mr. Connected: content, social media, creators, experiences, and partnerships.',
  url: '/services'
})

const Services = async () => {
  const projects = await getProjects()
  const services = await getServices()
  const jsonLd = combineSchemas(generateWebsiteSchema())

  const featuredProjects = projects.filter(project => {
    return project.isFeatured === true
  })

  return (
    <div>
      <HeroSection services={services} />
      <RecentProjects projectData={featuredProjects} />
      <Faq faqItems={faqItems} background='bg-card' />
      <CTASection />
      {/* Add JSON-LD to your page */}
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c')
        }}
      />
    </div>
  )
}

export default Services
