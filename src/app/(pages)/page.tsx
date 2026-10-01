import type { Metadata } from 'next'

import HomeHero from '@/components/blocks/home/hero'
import ServicesBoard from '@/components/blocks/home/services-board'
import { TrustStrip, Founder, Recognition, AudienceAndProcess, CTABand } from '@/components/blocks/home/funnel-sections'
import { WorkGallery } from '@/components/blocks/home/work-gallery'
import { HomeFaq } from '@/components/blocks/home/home-faq'
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
    <HomeFaq faqItems={faqItems} />
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
