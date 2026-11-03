import Link from 'next/link'
import { IconArrowRight, IconArrowUpRight, IconMail, IconPhone } from '@tabler/icons-react'

import ContentLayout from '@/components/layout/content-layout'
import { Button } from '@/components/ui/button'
import { siteConfig } from '@/configs/site'
import manifest from '@/assets/data/media-manifest.json'
import { getPillar, inquiryHref, type PillarId } from '@/lib/funnel'
import { emailMariaHref } from '@/lib/contact'
import Handoff from '@/components/blocks/funnel/handoff'
import { Eyebrow } from './eyebrow'
import { MediaCard } from './media-card'

// Only facts the site can show: Maria's bio, the magazine honor, and the client films in the work section
const proof = [
  { lead: '10+ years', label: 'Maria’s experience in nightlife, hospitality, and dining' },
  { lead: '40 Under Forty', label: 'Deluxe Version Magazine, National Icons of 2026' },
  { lead: 'Tuscan Cove', label: 'Restaurant films, featured in the work below' }
]

export const TrustStrip = () => (
  <section aria-label='Why Mr. Marketing Group' className='border-border border-y'>
    <ContentLayout>
      <ul className='divide-border grid divide-y sm:grid-cols-3 sm:divide-x sm:divide-y-0'>
        {proof.map(({ lead, label }) => (
          <li key={lead} className='flex flex-col gap-2 py-6 sm:px-6 sm:py-8 sm:first:pl-0 lg:px-10'>
            <span className='type-display text-3xl leading-none tracking-tight sm:text-4xl'>{lead}</span>
            <span className='text-muted-foreground text-sm leading-snug text-pretty'>{label}</span>
          </li>
        ))}
      </ul>
    </ContentLayout>
  </section>
)

export const Founder = () => {
  const explainer = manifest.find(item => item.id === 'founder-explainer')

  // id='about' keeps the old site's /#about links landing on Maria's story
  return (
    <section id='about' className='bg-card scroll-mt-28 py-16 sm:py-24 lg:py-32'>
      <ContentLayout className='grid items-start gap-12 md:grid-cols-[0.9fr_1.1fr] lg:gap-20'>
        <figure className='relative mx-auto w-full max-w-md md:sticky md:top-28 md:max-w-none'>
          <img
            src='/images/mrmg/refined/founder-960.webp'
            srcSet='/images/mrmg/refined/founder-640.webp 640w, /images/mrmg/refined/founder-960.webp 960w, /images/mrmg/refined/founder-1440.webp 1440w'
            sizes='(min-width: 768px) 42vw, 90vw'
            alt='Maria Romano smiling in a seated portrait'
            width={960}
            height={1440}
            loading='lazy'
            className='img-outline aspect-4/5 w-full rounded-2xl object-cover object-[50%_25%]'
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
          {/* Recognition and Maria's own film, side by side under her story */}
          <div className='mt-10 grid grid-cols-2 gap-4 sm:gap-6'>
            <figure>
              <img
                src='/images/mrmg/refined/recognition.webp'
                alt='Deluxe Version Magazine graphic naming Maria Romano among the 40 Under Forty National Icons of 2026'
                width={960}
                height={1200}
                loading='lazy'
                className='img-outline aspect-9/16 w-full rounded-2xl bg-black object-contain'
              />
              <figcaption className='mt-4'>
                <span className='block text-base font-medium'>40 Under Forty, National Icons of 2026</span>
                <span className='text-muted-foreground block text-sm'>Deluxe Version Magazine</span>
              </figcaption>
            </figure>
            {explainer && <MediaCard asset={{ ...explainer, kind: 'video' }} />}
          </div>
          <Handoff
            className='mt-10'
            location='home_founder'
            primary={{ label: 'Start a project with Maria', href: inquiryHref() }}
            secondary={{ label: 'Meet Maria and the agency', href: '/about-us' }}
          />
        </div>
      </ContentLayout>
    </section>
  )
}

/** Used on the About page; the homepage shows the honor inside the founder section. */
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

const steps = [
  ['Understand the brand', 'Your audience, your identity, and what makes your business special.'],
  ['Shape the creative direction', 'Strategy and storytelling, brought together around your goals.'],
  ['Execute and refine', 'Consistent creative work with a clear purpose behind every campaign.']
] as const

export const AudienceAndProcess = () => (
  <section className='py-16 sm:py-24 lg:py-32'>
    <ContentLayout>
      <div className='grid gap-8 lg:grid-cols-2 lg:gap-16'>
        <div>
          <Eyebrow>How we work</Eyebrow>
          <h2 className='type-display text-5xl tracking-tight text-balance sm:text-7xl'>
            Your world.
            <br />
            Our creative lens.
          </h2>
        </div>
        <p className='text-muted-foreground text-lg leading-relaxed text-pretty lg:pt-12'>
          Our selected work so far centers on Las Vegas restaurants, bars, and events. We tailor every strategy to the
          brand behind it, working as an extension of your team.
        </p>
      </div>
      <ol className='mt-14 grid gap-10 md:grid-cols-3 md:gap-8 lg:mt-20'>
        {steps.map(([title, body], i) => (
          <li key={title} className='border-border border-t pt-6'>
            <span aria-hidden className='type-display text-primary text-6xl leading-none'>
              0{i + 1}
            </span>
            <h3 className='mt-5 font-sans text-xl font-medium'>
              <span className='sr-only'>Step {i + 1}: </span>
              {title}
            </h3>
            <p className='text-muted-foreground mt-3 leading-relaxed'>{body}</p>
          </li>
        ))}
      </ol>
      <Handoff
        className='mt-12 lg:mt-16'
        location='home_process'
        lead='Step 01 starts with a short email to Maria.'
        primary={{ label: 'Tell us about your brand', href: inquiryHref() }}
        secondary={{ label: 'Explore our offerings', href: '/services' }}
      />
    </ContentLayout>
  </section>
)

type CTABandProps = {

  /** Optional anchor, e.g. 'contact' so the old site's /#contact links still land on a contact action */
  id?: string
  location: string
  headline: string
  eyebrow?: string
  body?: string

  /** Offering to use as the email topic on the contact page */
  service?: PillarId | 'unsure' | null
  ctaLabel?: string

  /** One onward page for visitors who aren't ready yet (keeps them in the funnel) */
  secondary?: { label: string; href: string }
}

const outlineOnRed =
  'inline-flex h-12 items-center justify-center gap-2 rounded-full ps-5.5 pe-6 font-medium shadow-[0_0_0_1px_oklch(1_0_0/0.4)] transition-[background-color,scale] duration-150 ease-out hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-white active:scale-[0.96]'

const textOnRed =
  'inline-flex h-12 items-center justify-center gap-2 rounded-full px-2 font-medium underline underline-offset-4 transition-[scale] duration-150 ease-out focus-visible:outline-2 focus-visible:outline-white active:scale-[0.96]'

/** The "next step" that closes every page: context-aware headline, prefilled inquiry, one onward route. */
export const CTABand = ({
  id,
  location,
  headline,
  eyebrow = 'Let’s connect',
  body = 'Tell Maria about your brand, your goals, and the services you have in mind.',
  service,
  ctaLabel,
  secondary
}: CTABandProps) => {
  const pillar = getPillar(service)

  return (
    <section id={id} className='scroll-mt-28 py-16 sm:py-24'>
      <ContentLayout>
        <div className='bg-primary text-primary-foreground relative overflow-hidden rounded-3xl px-6 py-10 sm:p-12 lg:p-16'>
          <div
            aria-hidden
            className='pointer-events-none absolute -right-24 -bottom-32 size-96 rounded-full bg-black/15 blur-3xl'
          />
          <div className='relative'>
            <p className='mb-5 text-xs font-medium tracking-[0.2em] uppercase sm:text-sm'>{eyebrow}</p>
            <h2 className='type-display max-w-4xl text-5xl leading-[1.02] tracking-tight text-balance sm:text-7xl'>
              {headline}
            </h2>
            <p className='mt-5 max-w-lg text-lg text-pretty text-white/85'>{body}</p>
            <div className='mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4'>
              <Button
                size='lg'
                variant='secondary'
                className='h-12 ps-6 pe-5.5 text-base'
                render={<Link href={inquiryHref(service)} data-track='cta_book_call' data-track-location={location} />}
                nativeButton={false}
              >
                {ctaLabel ?? (pillar ? `Start with ${pillar.name}` : 'Start a project')}{' '}
                <IconArrowUpRight aria-hidden className='size-5' />
              </Button>
              {secondary ? (
                <Link
                  href={secondary.href}
                  data-track='cta_next_page'
                  data-track-location={`${location}_secondary`}
                  className={outlineOnRed}
                >
                  {secondary.label}
                  <IconArrowRight aria-hidden className='size-5' />
                </Link>
              ) : (
                <a
                  href={emailMariaHref(service)}
                  data-track='cta_email'
                  data-track-location={`${location}_email`}
                  className={outlineOnRed}
                >
                  <IconMail aria-hidden className='size-5' />
                  Email Maria
                </a>
              )}
              <a
                href={siteConfig.phoneHref}
                data-track='cta_call_phone'
                data-track-location={`${location}_phone`}
                className={textOnRed}
              >
                <IconPhone aria-hidden className='size-5' />
                Call {siteConfig.phone}
              </a>
            </div>
          </div>
        </div>
      </ContentLayout>
    </section>
  )
}
