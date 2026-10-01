import Link from 'next/link'
import { IconArrowUpRight, IconMail, IconPhone } from '@tabler/icons-react'

import ContentLayout from '@/components/layout/content-layout'
import { Button } from '@/components/ui/button'
import { siteConfig } from '@/configs/site'
import manifest from '@/assets/data/media-manifest.json'
import { cn } from '@/lib/utils'
import { Eyebrow } from './eyebrow'
import { MediaCard } from './media-card'

const credentials = [
  { lead: '10+', label: 'Years across nightlife, hospitality, and entertainment' },
  { lead: 'LV', label: 'Las Vegas-based and culturally connected' },
  { lead: '4', label: 'Ways to connect, under one creative team' },
  { lead: '1', label: 'Founder, closely involved with every client' }
]

export const TrustStrip = () => (
  <section aria-label='Why Mr. Marketing Group' className='border-border border-y'>
    <ContentLayout>
      <ul className='divide-border grid grid-cols-2 lg:grid-cols-4 lg:divide-x'>
        {credentials.map(({ lead, label }, i) => (
          <li
            key={lead}
            className={cn(
              'flex flex-col gap-2 py-6 sm:py-8 lg:px-8 lg:first:pl-0',
              i % 2 === 0 ? 'pr-4' : 'border-border border-l pl-4 lg:border-l-0',
              i < 2 && 'border-border border-b lg:border-b-0'
            )}
          >
            <span className='type-display text-primary text-4xl leading-none sm:text-5xl'>{lead}</span>
            <span className='text-muted-foreground text-sm leading-snug text-pretty'>{label}</span>
          </li>
        ))}
      </ul>
    </ContentLayout>
  </section>
)

export const Founder = () => {
  const explainer = manifest.find(item => item.id === 'founder-explainer')

  return (
    <section className='bg-card py-16 sm:py-24 lg:py-32'>
      <ContentLayout className='grid items-center gap-12 md:grid-cols-[1.3fr_0.7fr] md:gap-12 lg:gap-24'>
        <div>
          <Eyebrow>The person behind the perspective</Eyebrow>
          <h2 className='type-display text-5xl tracking-tight text-balance sm:text-7xl'>Maria Romano</h2>
          <ul className='mt-5 flex flex-wrap gap-2' aria-label='Roles'>
            {['Founder', 'Entrepreneur', 'Open-format DJ'].map(role => (
              <li key={role} className='shadow-surface rounded-full px-3 py-1 text-sm font-medium'>
                {role}
              </li>
            ))}
          </ul>
          <div className='text-muted-foreground mt-7 max-w-xl space-y-5 text-lg leading-relaxed text-pretty'>
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
            className='group hover:text-primary focus-visible:outline-primary mt-8 inline-flex items-center gap-2 rounded-md py-2 font-medium underline underline-offset-8 transition-colors focus-visible:outline-2'
          >
            Meet Maria and the agency
            <IconArrowUpRight
              aria-hidden
              className='size-5 transition-[translate] duration-150 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5'
            />
          </Link>
        </div>
        <div className='mx-auto w-full max-w-[17rem] sm:max-w-xs'>
          {explainer && <MediaCard asset={{ ...explainer, kind: 'video' }} />}
        </div>
      </ContentLayout>
    </section>
  )
}

export const Recognition = () => (
  <section className='py-16 sm:py-24 lg:py-32'>
    <ContentLayout className='grid items-center gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-12 lg:gap-24'>
      <div className='bg-card shadow-surface mx-auto w-full max-w-[18rem] rounded-[calc(var(--radius)*1.8+0.75rem)] p-3 sm:max-w-sm'>
        <img
          src='/images/mrmg/refined/recognition.webp'
          alt='Deluxe Version Magazine graphic naming Maria Romano among the 40 Under Forty National Icons of 2026'
          width={960}
          height={1200}
          loading='lazy'
          className='img-outline w-full rounded-2xl'
        />
      </div>
      <div>
        <Eyebrow>Recognition</Eyebrow>
        <h2 className='type-display max-w-2xl text-5xl leading-[1.05] tracking-tight text-balance sm:text-7xl'>
          A creative voice.
          <br />A recognized perspective.
        </h2>
        <dl className='border-border mt-8 grid max-w-md grid-cols-[auto_1fr] gap-x-6 gap-y-3 border-t pt-6 text-base'>
          <dt className='text-muted-foreground'>Publication</dt>
          <dd className='font-medium'>Deluxe Version Magazine</dd>
          <dt className='text-muted-foreground'>Honor</dt>
          <dd className='font-medium'>40 Under Forty, National Icons of 2026</dd>
        </dl>
      </div>
    </ContentLayout>
  </section>
)

const industries = ['Restaurants', 'Luxury real estate', 'Hospitality', 'Healthcare', 'Professional services']

const steps = [
  ['Understand the brand', 'Your audience, your identity, and what makes your business special.'],
  ['Shape the creative direction', 'Strategy and storytelling, brought together around your goals.'],
  ['Execute and refine', 'Consistent creative work with a clear purpose behind every campaign.']
] as const

export const AudienceAndProcess = () => (
  <section className='bg-card py-16 sm:py-24 lg:py-32'>
    <ContentLayout>
      <div className='grid gap-8 lg:grid-cols-2 lg:gap-16'>
        <div>
          <Eyebrow>Who we work with</Eyebrow>
          <h2 className='type-display text-5xl tracking-tight text-balance sm:text-7xl'>
            Your world.
            <br />
            Our creative lens.
          </h2>
        </div>
        <div className='lg:pt-12'>
          <p className='text-muted-foreground text-lg leading-relaxed text-pretty'>
            We tailor every strategy to the brand behind it, working as an extension of your team.
          </p>
          <ul className='mt-6 flex flex-wrap gap-2' aria-label='Industries'>
            {industries.map(industry => (
              <li key={industry} className='bg-background shadow-surface rounded-full px-4 py-2 text-sm font-medium'>
                {industry}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <ol className='mt-14 grid gap-4 md:grid-cols-3 md:gap-6 lg:mt-20'>
        {steps.map(([title, body], i) => (
          <li key={title} className='bg-background shadow-surface relative rounded-2xl p-6 sm:p-8'>
            <span aria-hidden className='type-display text-primary text-5xl leading-none'>
              0{i + 1}
            </span>
            <h3 className='mt-6 font-sans text-xl font-medium'>
              <span className='sr-only'>Step {i + 1}: </span>
              {title}
            </h3>
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
      <div className='bg-primary text-primary-foreground relative overflow-hidden rounded-3xl px-6 py-10 sm:p-12 lg:p-16'>
        <div
          aria-hidden
          className='pointer-events-none absolute -right-24 -bottom-32 size-96 rounded-full bg-black/15 blur-3xl'
        />
        <div className='relative'>
          <p className='mb-5 text-xs font-medium tracking-[0.2em] uppercase sm:text-sm'>Let’s connect</p>
          <h2 className='type-display max-w-4xl text-5xl leading-[1.02] tracking-tight text-balance sm:text-7xl'>
            {headline}
          </h2>
          <p className='mt-5 max-w-lg text-lg text-pretty text-white/85'>
            Tell Maria about your brand, your goals, and the services you have in mind.
          </p>
          <div className='mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4'>
            <Button
              size='lg'
              variant='secondary'
              className='h-12 ps-6 pe-5.5 text-base'
              render={<Link href='/contact-us' data-track='cta_book_call' data-track-location={location} />}
              nativeButton={false}
            >
              Start a project <IconArrowUpRight aria-hidden className='size-5' />
            </Button>
            <a
              href={siteConfig.phoneHref}
              data-track='cta_call_phone'
              data-track-location={`${location}_phone`}
              className='inline-flex h-12 items-center justify-center gap-2 rounded-full ps-5.5 pe-6 font-medium shadow-[0_0_0_1px_oklch(1_0_0/0.4)] transition-[background-color,scale] duration-150 ease-out hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-white active:scale-[0.96]'
            >
              <IconPhone aria-hidden className='size-5' />
              Call {siteConfig.phone}
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              data-track='cta_email'
              data-track-location={`${location}_email`}
              className='inline-flex h-12 items-center justify-center gap-2 rounded-full px-2 font-medium underline underline-offset-4 transition-[scale] duration-150 ease-out focus-visible:outline-2 focus-visible:outline-white active:scale-[0.96]'
            >
              <IconMail aria-hidden className='size-5' />
              Email Maria
            </a>
          </div>
        </div>
      </div>
    </ContentLayout>
  </section>
)
