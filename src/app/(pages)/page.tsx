import type { Metadata } from 'next'

import Faq from '@/components/blocks/faq'
import HomeHero from '@/components/blocks/home/hero'
import ServicesBoard from '@/components/blocks/home/services-board'
import { TrustStrip, Founder, Recognition, AudienceAndProcess, CTABand } from '@/components/blocks/home/funnel-sections'
import { WorkGallery } from '@/components/blocks/home/work-gallery'
import { generateMetadata as generateSEOMetadata, combineSchemas, generateWebsiteSchema } from '@/lib/seo'
import { siteConfig } from '@/configs/site'
import { servicePillars } from '@/assets/data/service-pillars'
import { faqItems } from '@/assets/data/faq'

export const metadata: Metadata = generateSEOMetadata({ description: siteConfig.description, url: '/' })

const Home = () => (
  <div>
    <HomeHero />
    <TrustStrip />
    <ServicesBoard services={servicePillars} />
    <WorkGallery />
    <Founder />
    <Recognition />
    <AudienceAndProcess />
    <Faq faqItems={faqItems} />
    <CTABand location='home_final' headline='Let’s build a brand people connect with.' />
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(combineSchemas(generateWebsiteSchema())).replace(/</g, '\u003c')
      }}
    />
  </div>
)

export default Home
