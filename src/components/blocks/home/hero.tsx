import Link from 'next/link'
import { IconArrowUpRight } from '@tabler/icons-react'

import { Button } from '@/components/ui/button'
import ContentLayout from '@/components/layout/content-layout'

const HomeHero = () => (
  <section id='home' className='overflow-hidden pt-32 pb-14 sm:pt-40 sm:pb-20'>
    <ContentLayout className='grid items-center gap-12 lg:grid-cols-[1.25fr_1fr] lg:gap-16'>
      <div>
        <p className='text-primary mb-7 text-sm font-medium tracking-widest uppercase'>
          Las Vegas creative marketing agency
        </p>
        <h1 className='type-display text-[3.9rem] leading-[0.98] tracking-tight sm:text-[6rem] xl:text-[7rem]'>
          Distinctive brands.
          <br />
          <span className='text-primary'>Meaningful connections.</span>
        </h1>
        <p className='text-muted-foreground mt-8 max-w-lg text-lg leading-relaxed sm:text-xl'>
          Strategy, cinematic content, social media, creators, and experiences — tailored to your brand.
        </p>
        <div className='mt-9 flex flex-wrap items-center gap-4'>
          <Button
            size='lg'
            render={<Link href='/contact-us' data-track='cta_book_call' data-track-location='home_hero' />}
            nativeButton={false}
          >
            Start a project <IconArrowUpRight aria-hidden />
          </Button>
          <Link
            href='/#work'
            className='focus-visible:outline-primary rounded-md px-2 py-3 font-medium underline underline-offset-8 focus-visible:outline-2'
          >
            Explore our work
          </Link>
        </div>
        <p className='text-muted-foreground mt-10 text-sm'>Founder-led. Strategy-driven. Connected to culture.</p>
      </div>
      <figure className='relative mx-auto w-full max-w-md lg:max-w-none'>
        <img
          src='/images/mrmg/refined/founder-960.webp'
          srcSet='/images/mrmg/refined/founder-640.webp 640w, /images/mrmg/refined/founder-960.webp 960w, /images/mrmg/refined/founder-1440.webp 1440w'
          sizes='(min-width: 1024px) 40vw, 90vw'
          alt='Maria Romano smiling in a seated portrait'
          width={960}
          height={1440}
          fetchPriority='high'
          className='aspect-2/3 w-full rounded-2xl object-contain'
        />
        <figcaption className='absolute inset-x-4 bottom-4 flex items-end justify-between gap-4 rounded-xl border border-white/20 bg-black/70 px-5 py-4 text-white backdrop-blur-md'>
          <div>
            <p className='text-lg font-medium'>Maria Romano</p>
            <p className='mt-1 text-xs text-white/75'>Founder, Mr. Marketing Group</p>
          </div>
          <span className='text-xs tracking-widest'>LAS VEGAS</span>
        </figcaption>
      </figure>
    </ContentLayout>
  </section>
)

export default HomeHero
