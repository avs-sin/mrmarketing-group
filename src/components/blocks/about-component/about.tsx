// Next Imports
import Link from 'next/link'

// Third-party Imports
import { IconArrowRight } from '@tabler/icons-react'

// Component Imports
import { Button } from '@/components/ui/button'
import { SectionHeader } from '@/components/ui/section-header'
import ContentLayout from '@/components/layout/content-layout'

const AboutUs = () => {
  return (
    <section className='overflow-x-hidden py-8 sm:py-16 lg:py-24'>
      <ContentLayout>
        <div className='grid grid-cols-1 items-center gap-16 xl:h-130 xl:grid-cols-2'>
          <div className='max-w-2xl space-y-8 sm:space-y-16 lg:space-y-24'>
            <div className='space-y-4'>
              <SectionHeader
                title='We Are MR Marketing Group'
                description='MR Marketing Group is a Las Vegas-based full-service marketing agency built at the intersection of nightlife, hospitality, and creator culture. We work with restaurants, nightlife venues, and entertainment brands to build real presence, online and in the room. From flyers to full campaigns, we make brands impossible to ignore.'
                className='items-start text-left'
              />

              <div className='flex gap-4'>
                <Button className='group' size='lg' render={<Link href='/about-us' />} nativeButton={false}>
                  Work With Us
                  <IconArrowRight className='transition-transform duration-200 group-hover:translate-x-0.5' />
                </Button>
              </div>
            </div>
          </div>
          <div className='relative h-full max-xl:h-130'>
            <div className='relative mx-auto w-fit'>
              <img
                src='/images/mrmg/about-founder.webp'
                alt='DJ decks under red light'
                className='pointer-events-none relative h-120 w-full rounded-3xl object-cover'
              />
            </div>
          </div>
        </div>
      </ContentLayout>
    </section>
  )
}

export default AboutUs
