import type { Metadata } from 'next'

import HeroSection from '@/components/blocks/about-us-page/hero'
import AboutUs from '@/components/blocks/about-component/about'
import Teams from '@/components/blocks/teams'
import ServicesBoard from '@/components/blocks/home/services-board'
import { Recognition } from '@/components/blocks/home/funnel-sections'
import CTASection from '@/components/blocks/cta-section'
import { teamMembers } from '@/assets/data/team-members'
import { servicePillars } from '@/assets/data/service-pillars'
import { generateMetadata as generateSEOMetadata } from '@/lib/seo'

export const metadata: Metadata = generateSEOMetadata({
  title: 'About Us',
  description:
    'Meet Mr. Marketing Group and founder Maria Romano, bringing strategy, storytelling, and more than a decade of industry experience to distinctive brands.',
  url: '/about-us'
})

const AboutUsPage = () => (
  <>
    <HeroSection />
    <AboutUs />
    <Teams teamMembers={teamMembers} />
    <ServicesBoard services={servicePillars} />
    <Recognition />
    <CTASection />
  </>
)

export default AboutUsPage
