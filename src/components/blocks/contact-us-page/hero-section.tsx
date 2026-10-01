// Component Imports
import ContentLayout from '@/components/layout/content-layout'
import BeamRays from '@/components/ui/beam-rays'
import { SectionHeader } from '@/components/ui/section-header'

const HeroSection = () => {
  return (
    <section className='bg-card pt-36 sm:pt-44 lg:pt-52'>
      <ContentLayout>
        <div className='relative pb-6'>
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
            badge='Contact Us'
            title='Start a Project.'
            description='Creative support built around your brand — from content and creator partnerships to events and meaningful collaborations.'
            badgeClassName='bg-card z-1'
          />
        </div>
      </ContentLayout>
    </section>
  )
}

export default HeroSection
