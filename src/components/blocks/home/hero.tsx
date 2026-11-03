import Link from 'next/link'
import { IconArrowDown, IconArrowUpRight } from '@tabler/icons-react'

import { Button } from '@/components/ui/button'
import ContentLayout from '@/components/layout/content-layout'
import { Eyebrow } from './eyebrow'

const HomeHero = () => (
  <section id='home' className='relative overflow-hidden pt-28 pb-12 sm:pt-36 sm:pb-16 lg:pt-32 lg:pb-20 [@media(min-width:1024px)_and_(max-height:820px)]:pt-28'>
    {/* Soft red glow behind the headline; decorative only */}
    <div
      aria-hidden
      className='bg-primary/15 pointer-events-none absolute -top-40 -left-40 size-[36rem] rounded-full blur-3xl'
    />
    <ContentLayout className='relative grid items-center gap-10 md:gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16'>
      <div>
        <Eyebrow>Las Vegas content, social media &amp; events</Eyebrow>
        <h1 className='type-display text-[clamp(3.25rem,14vw,4.5rem)] leading-[0.95] tracking-tight text-balance sm:text-[5.5rem] xl:text-[6.5rem]'>
          Bring your hospitality brand <span className='text-primary'>to life.</span>
        </h1>
        <p className='text-muted-foreground mt-5 max-w-xl text-lg leading-relaxed text-pretty sm:mt-7 sm:text-xl'>
          Cinematic content, social media, creator partnerships, and events for restaurants, venues, and hospitality
          brands. Led by Maria Romano, with a creative approach shaped around your business.
        </p>
        <div className='mt-7 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:items-center sm:gap-6'>
          <Button
            size='lg'
            className='h-12 ps-6 pe-5.5 text-base'
            render={<Link href='/contact-us#inquiry' data-track='cta_book_call' data-track-location='home_hero' />}
            nativeButton={false}
          >
            Tell Maria about your project <IconArrowUpRight aria-hidden className='size-5' />
          </Button>
          <Link
            href='/#work'
            data-track='cta_next_page'
            data-track-location='home_hero_secondary'
            className='group hover:text-primary focus-visible:outline-primary max-sm:shadow-surface inline-flex h-12 items-center justify-center gap-2 rounded-full font-medium transition-[color,scale] duration-150 ease-out focus-visible:outline-2 active:scale-[0.96] sm:justify-start'
          >
            See our work
            <IconArrowDown
              aria-hidden
              className='size-4 transition-[translate] duration-150 ease-out group-hover:translate-y-0.5'
            />
          </Link>
        </div>
        <p className='text-muted-foreground mt-6 max-w-lg text-sm leading-relaxed text-pretty sm:mt-8'>
          Selected work includes restaurant films featuring Tuscan Cove and community event coverage.{' '}
          <Link href='/#work' className='hover:text-foreground underline underline-offset-4'>
            Watch the films
          </Link>
          .
        </p>
      </div>
      <figure className='relative mx-auto w-full max-w-md md:max-w-lg lg:mx-0 lg:w-auto lg:max-w-none lg:justify-self-end'>
        <img
          src='/images/mrmg/refined/founder-960.webp'
          srcSet='/images/mrmg/refined/founder-640.webp 640w, /images/mrmg/refined/founder-960.webp 960w, /images/mrmg/refined/founder-1440.webp 1440w'
          sizes='(min-width: 1024px) 40vw, 90vw'
          alt='Maria Romano smiling in a seated portrait'
          width={960}
          height={1440}
          fetchPriority='high'
          className='img-outline aspect-4/5 w-full rounded-2xl object-cover object-[50%_25%] lg:aspect-2/3 lg:h-[min(calc(100svh-12rem),44rem)] lg:min-h-[32rem] lg:w-auto'
        />
        <figcaption className='absolute bottom-4 left-4 flex items-center gap-3 rounded-full bg-black/65 py-2 pr-5 pl-2 text-white shadow-[0_0_0_1px_oklch(1_0_0/0.15)] backdrop-blur-md'>
          <span
            aria-hidden
            className='bg-primary flex size-9 items-center justify-center rounded-full text-xs font-semibold'
          >
            MR
          </span>
          <span>
            <span className='block text-sm font-medium'>Maria Romano</span>
            <span className='block text-xs text-white/70'>Founder · Las Vegas</span>
          </span>
        </figcaption>
      </figure>
    </ContentLayout>
  </section>
)

export default HomeHero
