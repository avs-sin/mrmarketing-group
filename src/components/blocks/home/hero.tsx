import Link from 'next/link'
import { IconArrowDown, IconArrowUpRight } from '@tabler/icons-react'

import { Button } from '@/components/ui/button'
import ContentLayout from '@/components/layout/content-layout'
import { cn } from '@/lib/utils'
import { Eyebrow } from './eyebrow'
import { HeroLoop } from './hero-loop'

// Short silent cuts of the films in the work section; the first tile is the large one
const loops = [
  { id: 'restaurant-collaboration', label: 'Restaurant collaboration' },
  { id: 'restaurant-production', label: 'Restaurant content' },
  { id: 'community-event', label: 'Community event coverage' }
] as const

const HomeHero = () => (
  <section
    id='home'
    className='relative overflow-hidden pt-28 pb-14 sm:pt-36 sm:pb-20 lg:pt-32 lg:pb-24 [@media(min-width:1024px)_and_(max-height:820px)]:pt-28'
  >
    {/* Soft red glow behind the headline; decorative only */}
    <div
      aria-hidden
      className='bg-primary/15 pointer-events-none absolute -top-40 -left-40 size-[36rem] rounded-full blur-3xl'
    />
    <ContentLayout className='relative grid items-center gap-10 md:gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-14'>
      <div>
        <Eyebrow>Las Vegas content, social media &amp; events</Eyebrow>
        <h1 className='type-display text-[clamp(3.25rem,14vw,4.5rem)] leading-[0.95] tracking-tight text-balance sm:text-[5.5rem] xl:text-[6.5rem]'>
          Give guests a reason to <span className='text-primary'>walk in.</span>
        </h1>
        <p className='text-muted-foreground mt-5 max-w-xl text-lg leading-relaxed text-pretty sm:mt-7 sm:text-xl'>
          Cinematic content, social media, creator partnerships, and events for restaurants, venues, and hospitality
          brands. Led by Maria Romano, with more than a decade in nightlife, hospitality, and dining.
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
          Selected work includes restaurant films featuring Tuscan Cove and community event coverage.
        </p>
      </div>
      {/*
        Film wall: one large tile beside two stacked ones. Widths run 2:1 and every tile is 9:16,
        so the two small tiles together match the large tile's height.
      */}
      <div className='mx-auto grid w-full max-w-xl grid-cols-[2fr_1fr] gap-3 sm:gap-4 lg:max-w-none'>
        {loops.map(({ id, label }, index) => (
          <figure
            key={id}
            className={cn(
              'img-outline relative overflow-hidden rounded-2xl bg-black',
              index === 0 ? 'row-span-2 aspect-9/16' : 'min-h-0'
            )}
          >
            <HeroLoop src={`/videos/mrmg/loops/${id}.mp4`} poster={`/images/mrmg/refined/${id}-loop.webp`} />
            <figcaption
              className={cn(
                'absolute bottom-3 left-3 rounded-full bg-black/65 font-medium text-white shadow-[0_0_0_1px_oklch(1_0_0/0.15)] backdrop-blur-md',

                // Small tiles are too narrow for a caption on phones
                index === 0 ? 'px-3.5 py-1.5 text-sm' : 'max-w-[calc(100%-1.5rem)] truncate px-2.5 py-1 text-xs max-sm:hidden'
              )}
            >
              {label}
            </figcaption>
          </figure>
        ))}
      </div>
    </ContentLayout>
  </section>
)

export default HomeHero
