import Link from 'next/link'
import { IconArrowUpRight } from '@tabler/icons-react'

import ContentLayout from '@/components/layout/content-layout'
import { Button } from '@/components/ui/button'
import { siteConfig } from '@/configs/site'
import manifest from '@/assets/data/media-manifest.json'
import { MediaCard } from './media-card'

export const TrustStrip = () => (
  <section className='border-border border-y'>
    <ContentLayout>
      <ul className='text-muted-foreground grid gap-4 py-6 text-sm sm:grid-cols-3'>
        <li>Las Vegas-based</li>
        <li>More than a decade of industry experience</li>
        <li>Founder-led creative direction</li>
      </ul>
    </ContentLayout>
  </section>
)

export const Founder = () => {
  const explainer = manifest.find(item => item.id === 'founder-explainer')

  return (
    <section className='bg-card py-16 sm:py-24'>
      <ContentLayout className='grid items-center gap-12 lg:grid-cols-[1.3fr_0.7fr] lg:gap-24'>
        <div>
          <p className='text-primary mb-4 text-sm tracking-widest uppercase'>The person behind the perspective</p>
          <h2 className='type-display text-5xl tracking-tight sm:text-7xl'>Maria Romano</h2>
          <p className='mt-4 text-lg font-medium'>Founder. Entrepreneur. Open-format DJ.</p>
          <div className='text-muted-foreground mt-7 max-w-xl space-y-5 text-lg leading-relaxed'>
            <p>
              More than a decade in nightlife, hospitality, dining, and entertainment has given Maria a firsthand
              understanding of what draws people to a brand — and keeps them coming back.
            </p>
            <p>
              Her ability to read an audience shapes a creative approach built on thoughtful strategy, cinematic
              content, and meaningful experiences. She stays closely involved, helping each client’s vision become a
              brand presence that feels authentic, polished, and memorable.
            </p>
          </div>
          <Link
            href='/about-us'
            className='focus-visible:outline-primary mt-8 inline-flex items-center gap-2 rounded-md py-2 font-medium underline underline-offset-8 focus-visible:outline-2'
          >
            Meet Maria and the agency <IconArrowUpRight aria-hidden className='size-5' />
          </Link>
        </div>
        <div className='mx-auto w-full max-w-xs'>
          {explainer && <MediaCard asset={{ ...explainer, kind: 'video' }} />}
        </div>
      </ContentLayout>
    </section>
  )
}

export const Recognition = () => (
  <section className='py-16 sm:py-24'>
    <ContentLayout className='grid items-center gap-12 md:grid-cols-[0.7fr_1.3fr] lg:gap-24'>
      <img
        src='/images/mrmg/refined/recognition.webp'
        alt='Deluxe Version Magazine graphic naming Maria Romano among the 40 Under Forty National Icons of 2026'
        width={960}
        height={1200}
        loading='lazy'
        className='mx-auto w-full max-w-sm rounded-2xl'
      />
      <div>
        <p className='text-primary mb-4 text-sm tracking-widest uppercase'>Recognition</p>
        <h2 className='type-display max-w-2xl text-5xl leading-[1.05] tracking-tight sm:text-7xl'>
          A creative voice.
          <br />A recognized perspective.
        </h2>
        <p className='text-muted-foreground mt-6 max-w-md text-lg leading-relaxed'>
          Deluxe Version Magazine — 40 Under Forty, National Icons of 2026.
        </p>
      </div>
    </ContentLayout>
  </section>
)

export const AudienceAndProcess = () => (
  <section className='bg-card py-16 sm:py-24'>
    <ContentLayout>
      <div className='grid gap-8 lg:grid-cols-2'>
        <h2 className='type-display text-5xl tracking-tight sm:text-7xl'>
          Your world.
          <br />
          Our creative lens.
        </h2>
        <div>
          <p className='text-muted-foreground text-lg leading-relaxed'>
            From restaurants and luxury real estate to hospitality, healthcare, and professional services, we tailor
            every strategy to the brand behind it.
          </p>
          <p className='mt-5 text-lg'>We work as an extension of your team.</p>
        </div>
      </div>
      <ol className='border-border mt-14 grid gap-8 border-t pt-10 md:grid-cols-3'>
        {[
          ['Understand the brand', 'Your audience, your identity, and what makes your business special.'],
          ['Shape the creative direction', 'Strategy and storytelling, brought together around your goals.'],
          ['Execute and refine', 'Consistent creative work with a clear purpose behind every campaign.']
        ].map(([title, body], i) => (
          <li key={title}>
            <span className='text-primary text-sm'>0{i + 1}</span>
            <h3 className='mt-4 text-xl font-medium'>{title}</h3>
            <p className='text-muted-foreground mt-3 leading-relaxed'>{body}</p>
          </li>
        ))}
      </ol>
    </ContentLayout>
  </section>
)

export const CTABand = ({ location, headline }: { location: string; headline: string }) => (
  <section className='py-16 sm:py-24'>
    <ContentLayout>
      <div className='bg-primary text-primary-foreground rounded-2xl p-7 sm:p-12'>
        <p className='mb-5 text-sm tracking-widest uppercase'>Let’s connect</p>
        <h2 className='type-display max-w-4xl text-5xl leading-[1.05] tracking-tight sm:text-7xl'>{headline}</h2>
        <div className='mt-8 flex flex-wrap items-center gap-5'>
          <Button
            size='lg'
            variant='secondary'
            render={<Link href='/contact-us' data-track='cta_book_call' data-track-location={location} />}
            nativeButton={false}
          >
            Start a project <IconArrowUpRight aria-hidden />
          </Button>
          <a
            href={siteConfig.phoneHref}
            data-track='cta_call_phone'
            data-track-location={`${location}_phone`}
            className='rounded-md py-3 underline underline-offset-4 focus-visible:outline-2'
          >
            Call {siteConfig.phone}
          </a>
        </div>
      </div>
    </ContentLayout>
  </section>
)
