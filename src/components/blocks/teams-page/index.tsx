// Next Imports
import Link from 'next/link'

// Third-party Imports
import { IconArrowRight } from '@tabler/icons-react'

// Component Imports
import ContentLayout from '@/components/layout/content-layout'
import { Button } from '@/components/ui/button'
import { SectionHeader } from '@/components/ui/section-header'
import BeamRays from '@/components/ui/beam-rays'

const HeroSection = () => {
  return (
    <section className='bg-card pt-36 text-center sm:pt-44 lg:pt-52'>
      <ContentLayout>
        <div className='relative space-y-6'>
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
            badge='Founder'
            title='The Person Behind the Brands'
            description='Mr. Marketing Group is led by Maria Romano, an entrepreneur and open-format DJ with more than a decade of industry experience.'
            badgeClassName='bg-card z-1'
          />
          <Button size='lg' className='group' render={<Link href='/contact-us' />} nativeButton={false}>
            Work With Us
            <IconArrowRight className='transition-transform duration-200 group-hover:translate-x-0.5' />
          </Button>
        </div>
      </ContentLayout>
    </section>
  )
}

export default HeroSection
