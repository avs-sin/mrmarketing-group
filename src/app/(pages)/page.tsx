// Next Imports
import type { Metadata } from 'next'

// Component Imports
import Faq from '@/components/blocks/faq'
import HomeHero from '@/components/blocks/home/hero'
import ClientTicker from '@/components/blocks/home/client-ticker'
import ServicesBoard from '@/components/blocks/home/services-board'
import {
  BigDomino,
  ClientStory,
  CTABand,
  Founder,
  RiskReversal,
  TheStack,
  TrustStrip
} from '@/components/blocks/home/funnel-sections'
import Pricing from '@/components/blocks/pricing'
import RecentProjects from '@/components/blocks/recent-projects'
import Testimonials from '@/components/blocks/testimonials'

// Util Imports
import { generateMetadata as generateSEOMetadata, combineSchemas, generateWebsiteSchema } from '@/lib/seo'
import { getProjects } from '@/lib/projects'
import { servicePillars } from '@/assets/data/service-pillars'

// Data Imports
import { faqItems } from '@/assets/data/faq'
import { plans } from '@/assets/data/pricing'
import { testimonials } from '@/assets/data/testimonial'

export const metadata: Metadata = generateSEOMetadata({
  description:
    'MR Marketing Group is a Las Vegas-based full-service marketing agency specializing in content creation, event marketing, and brand strategy for restaurants, nightlife venues, and entertainment brands.',
  url: '/'
})

const Home = async () => {
  const projects = await getProjects()

  const jsonLd = combineSchemas(generateWebsiteSchema())

  const featuredProjects = projects.filter(project => {
    return project.isFeatured === true
  })

  return (
    <div>
      <HomeHero />
      <ClientTicker />
      <TrustStrip />
      <BigDomino />
      <Founder />
      <ClientStory />
      <TheStack />
      <RiskReversal />
      <CTABand location='home_mid' headline='Book the call. Bring your event calendar.' />
      <ServicesBoard services={servicePillars} />
      <RecentProjects projectData={featuredProjects} />
      <Testimonials testimonials={testimonials} />
      <Pricing plans={plans} />
      <Faq faqItems={faqItems} />
      <CTABand location='home_final' headline='Your room should be full on a Tuesday. Let us start with one night.' />

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

export default Home
