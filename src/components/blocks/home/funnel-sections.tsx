// Next Imports
import Link from 'next/link'

// Third-party Imports
import { IconClock, IconHandStop, IconFileOff } from '@tabler/icons-react'

// Component Imports
import { Button } from '@/components/ui/button'
import ContentLayout from '@/components/layout/content-layout'

// Config Imports
import { siteConfig } from '@/configs/site'

// PLACEHOLDER: confirm with Maria before launch.
export const FIRST_EVENT_PRICE = 'from $1,500'

const track = (event: string, location: string) => ({ 'data-track': event, 'data-track-location': location })

/* 2. Trust strip: no outcome claims, only verifiable facts */
export const TrustStrip = () => (
  <section className='border-border border-b'>
    <ContentLayout>
      <ul className='text-muted-foreground grid grid-cols-2 gap-x-8 gap-y-3 py-5 text-sm sm:grid-cols-4'>
        <li>Based in Las Vegas</li>
        <li>Founder is a working DJ</li>
        <li>Guest on the Vegas Circle Podcast</li>
        <li>Top 40 Under 40, Deluxe Version Magazine</li>
      </ul>
    </ContentLayout>
  </section>
)

/* 3. Big Domino and named enemy */
export const BigDomino = () => (
  <section className='bg-primary text-primary-foreground py-16 sm:py-24'>
    <ContentLayout className='max-w-4xl'>
      <p className='type-display text-5xl leading-[0.95] sm:text-7xl'>
        Most agencies post about nightlife. Maria works in it.
      </p>
      <p className='mt-8 max-w-2xl text-lg leading-relaxed text-white/85'>
        A packed room does not come from a content calendar built in an office across town. It comes from someone who
        knows the promoters, the liquor reps, and the regulars by name. That is the whole difference, and it is the only
        reason to hire us.
      </p>
    </ContentLayout>
  </section>
)

/* 4. Attractive character */
export const Founder = () => (
  <section className='py-16 sm:py-24'>
    <ContentLayout className='grid items-center gap-12 lg:grid-cols-2'>
      <img
        src='/images/mrmg/about-founder.webp'
        alt='Maria Romano at the DJ decks'
        className='aspect-4/5 w-full rounded-2xl object-cover'
      />
      <div>
        <h2 className='type-display text-5xl leading-none sm:text-6xl'>Maria Romano</h2>
        <p className='text-muted-foreground mt-2 text-base'>Founder. DJ. Marketer.</p>
        <div className='mt-8 space-y-5 text-lg leading-relaxed'>
          <p>
            Maria started behind the decks at Las Vegas brunches and lounges. The venues she played asked her to fix
            their flyers. Then their social. Then their events. MR Marketing Group is what that became.
          </p>
          <p>
            Today the agency runs content, events, and partnerships for restaurants, lounges, and hotels across the
            city, and produces MADE, an invite-only creator night.
          </p>
          <p className='border-primary border-l-4 pl-5 font-medium'>
            We only take hospitality, nightlife, and the brands that live inside them. If you sell software, we are the
            wrong call, and we will tell you so.
          </p>
        </div>
      </div>
    </ContentLayout>
  </section>
)

/* 5. Epiphany story: one client, before and after */
export const ClientStory = () => (
  <section className='bg-card py-16 sm:py-24'>
    <ContentLayout className='grid gap-12 lg:grid-cols-[1fr_1.2fr]'>
      <div>
        <p className='text-primary text-base font-medium'>One night, start to finish</p>
        <h2 className='type-display mt-2 text-5xl leading-none sm:text-6xl'>March Madness at Tuscan Cove</h2>
      </div>
      <div className='space-y-6 text-lg leading-relaxed'>
        <p>
          Tuscan Cove had a patio, a bar full of TVs, and a tournament nobody was coming in to watch. The owner had
          posted the schedule. Nothing moved.
        </p>
        <p>
          We treated it like an event, not a post. A flyer built for Instagram Stories. A liquor partner, Telson
          Tequila, brought in to sponsor the nights and put product on the tables. A push through the accounts and group
          chats that actually reach people who go out on a weeknight.
        </p>
        <p>
          The watch parties ran through the tournament. The same playbook now runs their executive dinners and brand
          activations.
        </p>
        <Link
          href='/projects/tuscan-cove'
          className='text-primary inline-block font-medium underline-offset-4 hover:underline'
        >
          Read the full case
        </Link>
      </div>
    </ContentLayout>
  </section>
)

/* 6. The stack: what the first call includes */
const stack = [
  ['Content audit', 'We look at your last 30 days of posts and tell you what is working and what is noise.'],
  ['Event calendar review', 'Which nights deserve a push, which ones do not, and what is missing.'],
  ['One flyer concept', 'A direction for your next promotion, sketched on the call.'],
  ['Partner shortlist', 'Two or three liquor brands or creators who fit your room.'],
  ['A written next step', 'One page. What we would do first and what it costs.']
]

export const TheStack = () => (
  <section className='py-16 sm:py-24'>
    <ContentLayout className='grid gap-12 lg:grid-cols-[minmax(0,26rem)_1fr]'>
      <div>
        <h2 className='type-display text-5xl leading-none sm:text-6xl'>What the first call covers</h2>
        <p className='text-muted-foreground mt-4 text-lg'>Twenty minutes with Maria. No deck, no pitch.</p>
        <p className='mt-8 text-lg font-medium'>Free. A first event package starts {FIRST_EVENT_PRICE}.</p>
      </div>
      <ol className='border-border border-t'>
        {stack.map(([title, body], i) => (
          <li key={title} className='border-border grid gap-2 border-b py-5 sm:grid-cols-[3rem_14rem_1fr] sm:gap-6'>
            <span className='type-display text-primary text-3xl leading-none'>{i + 1}</span>
            <span className='text-lg font-medium'>{title}</span>
            <span className='text-muted-foreground'>{body}</span>
          </li>
        ))}
      </ol>
    </ContentLayout>
  </section>
)

/* 7. Risk reversal: three operational promises */
const promises = [
  {
    icon: IconClock,
    title: 'One business day',
    body: 'Send the form before 5 pm and Maria replies the same or next business day.'
  },
  {
    icon: IconHandStop,
    title: 'The ten-minute honest answer',
    body: 'If your venue is not a fit, we say so in the first ten minutes and point you somewhere better.'
  },
  {
    icon: IconFileOff,
    title: 'No contract on the first event',
    body: 'Your first package is one night. If it fills the room, we talk about a retainer. If not, you owe nothing more.'
  }
]

export const RiskReversal = () => (
  <section className='bg-card py-16 sm:py-24'>
    <ContentLayout>
      <h2 className='type-display text-5xl leading-none sm:text-6xl'>What we promise before you sign anything</h2>
      <div className='mt-10 grid gap-6 md:grid-cols-3'>
        {promises.map(p => (
          <div key={p.title} className='bg-background rounded-2xl p-6'>
            <p.icon className='text-primary size-7' />
            <p className='mt-4 text-xl font-medium'>{p.title}</p>
            <p className='text-muted-foreground mt-2 leading-relaxed'>{p.body}</p>
          </div>
        ))}
      </div>
    </ContentLayout>
  </section>
)

/* 8 and 13. CTA bands */
export const CTABand = ({ location, headline }: { location: string; headline: string }) => (
  <section className='py-16 sm:py-24'>
    <ContentLayout className='flex flex-col items-start gap-6'>
      <h2 className='type-display max-w-3xl text-5xl leading-[0.95] sm:text-7xl'>{headline}</h2>
      <div className='flex flex-wrap gap-3'>
        <Button
          size='lg'
          render={<Link href='/contact-us' {...track('cta_book_call', location)} />}
          nativeButton={false}
        >
          Book the 20-minute call
        </Button>
        <Button
          size='lg'
          variant='outline'
          render={<a href={siteConfig.phoneHref} {...track('cta_call_phone', `${location}_phone`)} />}
          nativeButton={false}
        >
          Call {siteConfig.phone}
        </Button>
      </div>
      <p className='text-muted-foreground text-sm'>Reply within one business day. No contract on the first event.</p>
    </ContentLayout>
  </section>
)
