// Next Imports
import Link from 'next/link'

// Third-party Imports
import { IconArrowRight, IconPhoneCall } from '@tabler/icons-react'

// Component Imports
import ContentLayout from '@/components/layout/content-layout'
import { Button } from '@/components/ui/button'
import { SectionHeader } from '@/components/ui/section-header'
import BeamRays from '@/components/ui/beam-rays'

const HeroSection = () => {
  return (
    <section className='bg-card pt-36 sm:pt-44 lg:pt-52'>
      <ContentLayout>
        <div className='relative space-y-4 text-center'>
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
            badge='About Us'
            title='Beyond Content. Built for Culture.'
            description='A Las Vegas full-service marketing agency built at the intersection of nightlife, hospitality, and creator culture.'
            badgeClassName='bg-card z-1'
          />
          <div className='space-x-4'>
            <Button size='lg' render={<Link href='/contact-us' />} nativeButton={false}>
              Start a Project <IconPhoneCall />
            </Button>
            <Button
              size='lg'
              variant='secondary'
              render={<Link href='/projects' />}
              nativeButton={false}
              className='group'
            >
              Our Work
              <IconArrowRight className='transition-transform duration-200 group-hover:translate-x-0.5' />
            </Button>
          </div>
        </div>
        <div className='mt-24 grid grid-cols-1 max-sm:gap-y-6 md:grid-cols-5 md:gap-6'>
          <div className='col-span-2'>
            <img src='/images/mrmg/svc-event-marketing.webp' alt='' className='h-94 w-full rounded-xl object-cover' />
          </div>
          <div className='col-span-3'>
            <img src='/images/mrmg/about-founder.webp' alt='' className='h-94 w-full rounded-xl object-cover' />
          </div>
          <div className='col-span-3'>
            <img src='/images/mrmg/client-creator-event.webp' alt='' className='h-97 w-full rounded-xl object-cover' />
          </div>
          <div className='col-span-2'>
            <img src='/images/mrmg/client-rnb-party.webp' alt='' className='h-97 w-full rounded-xl object-cover' />
          </div>
        </div>
      </ContentLayout>
    </section>
  )
}

export default HeroSection
