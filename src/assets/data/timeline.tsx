// Third-party Imports
import { IconDisc, IconSpeakerphone, IconBuildingStore, IconConfetti } from '@tabler/icons-react'

// Component Imports
import type { TimelineEntry } from '@/components/blocks/about-us-page/timeline-component'
import { Card, CardContent, CardTitle } from '@/components/ui/card'

export const data: TimelineEntry[] = [
  {
    title: 'Chapter 01',
    icon: (
      <div className='bg-background rounded-full p-1.5'>
        <span className='bg-primary/20 inline-flex size-8 items-center justify-center rounded-full'>
          <IconDisc className='text-primary size-4' />
        </span>
      </div>
    ),
    content: (
      <div>
        <Card className='mb-8 overflow-hidden border shadow-none ring-0 md:max-w-135'>
          <CardContent className='space-y-2'>
            <CardTitle className='text-lg font-medium md:text-xl lg:text-2xl'>The DJ Booth</CardTitle>
            <p className='text-muted-foreground text-base'>
              Maria Romano starts behind the decks. Night after night, she learns how Las Vegas nightlife really works:
              the promoters, the venues, the crowds, and what makes a room move. That insider view becomes the
              foundation for everything that follows.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  },
  {
    title: 'Chapter 02',
    icon: (
      <div className='bg-background rounded-full p-1.5'>
        <span className='inline-flex size-8 items-center justify-center rounded-full bg-amber-600/20'>
          <IconSpeakerphone className='size-4 text-amber-600 dark:text-amber-400' />
        </span>
      </div>
    ),
    content: (
      <div>
        <Card className='mb-8 overflow-hidden border shadow-none ring-0 md:max-w-135'>
          <CardContent className='space-y-2'>
            <CardTitle className='text-lg font-medium md:text-xl lg:text-2xl'>First Campaigns</CardTitle>
            <p className='text-muted-foreground text-base'>
              Local venues ask for a flyer. Then a social post. Then a full launch. Flyers and social for local venues
              turn into complete campaigns, and word spreads across the Strip and off it.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  },
  {
    title: 'Chapter 03',
    icon: (
      <div className='bg-background rounded-full p-1.5'>
        <span className='inline-flex size-8 items-center justify-center rounded-full bg-green-600/20 dark:bg-green-400/20'>
          <IconBuildingStore className='size-4 text-green-600 dark:text-green-400' />
        </span>
      </div>
    ),
    content: (
      <div>
        <Card className='mb-8 overflow-hidden border shadow-none ring-0 md:max-w-135'>
          <CardContent className='space-y-2'>
            <CardTitle className='text-lg font-medium md:text-xl lg:text-2xl'>MR Marketing Group</CardTitle>
            <p className='text-muted-foreground text-base'>
              The agency launches as a full-service shop for hospitality and nightlife. Content, events, brand, social,
              partnerships, creative, and paid media, all under one roof, built for Las Vegas restaurants, venues, and
              entertainment brands.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  },
  {
    title: 'Chapter 04',
    icon: (
      <div className='bg-background rounded-full p-1.5'>
        <span className='inline-flex size-8 items-center justify-center rounded-full bg-sky-600/10'>
          <IconConfetti className='size-4 text-sky-600 dark:text-sky-400' />
        </span>
      </div>
    ),
    content: (
      <div>
        <Card className='mb-8 overflow-hidden border shadow-none ring-0 md:max-w-135'>
          <CardContent className='space-y-2'>
            <CardTitle className='text-lg font-medium md:text-xl lg:text-2xl'>MADE Events</CardTitle>
            <p className='text-muted-foreground text-base'>
              Invite-only creator networking events, produced under the agency. MADE brings creators, venues, and brands
              into the same room and turns introductions into collaborations.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }
]
