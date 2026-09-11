// Next Imports
import type { Metadata } from 'next'

// Component Imports
import SocialProof from '@/components/blocks/social-proof'
import AboutUs from '@/components/blocks/about-component/about'
import TestimonialsComponent from '@/components/blocks/testimonials'
import Teams from '@/components/blocks/teams'
import Faq from '@/components/blocks/faq'
import CTASection from '@/components/blocks/cta-section'
import HeroSection from '@/components/blocks/about-us-page/hero'
import JourneyTimeline from '@/components/blocks/about-us-page/timeline-component'

// Util Imports
import { generateMetadata as generateSEOMetadata, combineSchemas, generateWebsiteSchema } from '@/lib/seo'

// Data Imports
import { data } from '@/assets/data/timeline'
import { faqItems } from '@/assets/data/faq'
import { teamMembers } from '@/assets/data/team-members'
import { testimonials } from '@/assets/data/testimonial'
import { socialData } from '@/assets/data/social-proof'

export const metadata: Metadata = generateSEOMetadata({
  title: 'About Us',
  description:
    'MR Marketing Group is a Las Vegas full-service marketing agency founded by Maria Romano, built at the intersection of nightlife, hospitality, and creator culture.',
  url: '/about-us'
})

const AboutUsPage = () => {
  const jsonLd = combineSchemas(generateWebsiteSchema())

  const featuredTeamMembers = teamMembers.filter(member => {
    return member.isFeatured === true
  })

  return (
    <div>
      <HeroSection />
      <SocialProof socialData={socialData} />
      <AboutUs />
      <JourneyTimeline data={data} />
      <TestimonialsComponent testimonials={testimonials} />
      <Teams teamMembers={featuredTeamMembers} />
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

export default AboutUsPage
