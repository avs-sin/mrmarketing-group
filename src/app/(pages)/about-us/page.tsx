import type { Metadata } from 'next'

import HeroSection from '@/components/blocks/about-us-page/hero'
import AboutUs from '@/components/blocks/about-component/about'
import Teams from '@/components/blocks/teams'
import ServicesBoard from '@/components/blocks/home/services-board'
import { Recognition } from '@/components/blocks/home/funnel-sections'
import { CTABand } from '@/components/blocks/home/funnel-sections'
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
    <CTABand
      location='about_final'
      eyebrow='Work with Maria'
      headline='Bring a founder-led team to your brand.'
      body='Maria stays closely involved in every engagement. Tell her what you’re building.'
      secondary={{ label: 'See our work', href: '/projects' }}
    />
  </>
)

export default AboutUsPage
