// Next Imports
import Link from 'next/link'

// Component Imports
import { Button } from '@/components/ui/button'
import ContentLayout from '@/components/layout/content-layout'

// Config Imports
import { siteConfig } from '@/configs/site'

const HomeHero = () => {
  return (
    <section id='home' className='relative isolate min-h-[92svh] overflow-hidden'>
      <img
        src='/images/mrmg/svc-event-marketing.webp'
        alt='Red lasers over a packed Las Vegas nightclub crowd'
        className='absolute inset-0 -z-20 size-full object-cover'
      />
      <div className='from-background via-background/70 absolute inset-0 -z-10 bg-linear-to-t to-transparent' />
      <div className='from-background/90 absolute inset-0 -z-10 bg-linear-to-r via-transparent to-transparent' />

      <ContentLayout className='flex min-h-[92svh] flex-col justify-end pt-40 pb-16 sm:pb-24'>
        <p className='text-foreground/80 mb-6 text-base font-medium sm:text-lg'>
          For Las Vegas restaurants, lounges, and venues
        </p>
        <h1 className='type-display max-w-5xl text-[15vw] leading-[0.88] tracking-tight text-balance sm:text-[11vw] lg:text-[8.5rem]'>
          Your room should
          <br />
          be this full on a Tuesday.
        </h1>
        <div className='mt-10 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between'>
          <p className='text-foreground/80 max-w-md text-lg leading-relaxed'>
            Content, events, and partnerships run by someone who is already inside the scene. Beyond content. Built for
            culture.
          </p>
          <div className='flex flex-col gap-3'>
            <div className='flex gap-3'>
              <Button
                size='lg'
                render={<Link href='/contact-us' data-track='cta_book_call' data-track-location='home_hero' />}
                nativeButton={false}
              >
                Book the 20-minute call
              </Button>
              <Button size='lg' variant='outline' render={<Link href='/projects' />} nativeButton={false}>
                See the clients
              </Button>
            </div>
            <a
              href={siteConfig.phoneHref}
              data-track='cta_call_phone'
              data-track-location='home_hero_hyperactive'
              className='text-foreground/80 text-sm underline-offset-4 hover:underline'
            >
              Event this week? Call or text Maria at {siteConfig.phone}.
            </a>
          </div>
        </div>
      </ContentLayout>
    </section>
  )
}

export default HomeHero
