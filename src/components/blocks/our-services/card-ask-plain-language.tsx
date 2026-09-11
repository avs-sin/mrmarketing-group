'use client'

// Next Imports
import Link from 'next/link'

// Third-party Imports
import { IconSparkles } from '@tabler/icons-react'
import Autoplay from 'embla-carousel-autoplay'

// Component Imports
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { MotionPreset } from '@/components/ui/motion-preset'

// Util Imports
import { cn } from '@/lib/utils'

const chats = [
  'Can you cover our happy hour launch on Stories?',
  'Posting the March Madness flyer now. Check DMs.',
  'Need a Reel for Friday. Shoot at 6?',
  'Liquor partner confirmed for the watch party.',
  'Content calendar for next month is ready.',
  'Can you cover our happy hour launch on Stories?',
  'Posting the March Madness flyer now. Check DMs.',
  'Need a Reel for Friday. Shoot at 6?',
  'Liquor partner confirmed for the watch party.',
  'Content calendar for next month is ready.'
]

type CardAskPlainLanguageProps = {
  title?: string
  description?: string
  href?: string
}

const CardAskPlainLanguage = ({
  title = 'Search Engine Optimization (SEO)',
  description = "Improve your rankings, drive organic traffic, and increase your site's authority with proven SEO strategies and techniques that generate measurable results while supporting sustainable business growth.",
  href
}: CardAskPlainLanguageProps) => {
  const content = (
    <Card className='bg-muted h-full overflow-hidden border pt-0 shadow-none ring-0'>
      <MotionPreset fade slide={{ direction: 'down', offset: 50 }} delay={0.5} transition={{ duration: 0.45 }}>
        <CardContent>
          <Carousel
            opts={{
              align: 'center',
              loop: true,
              slidesToScroll: 1
            }}
            plugins={[Autoplay({ delay: 1500, stopOnInteraction: false })]}
            orientation='vertical'
            className='relative w-full'
          >
            <CarouselContent className='-mt-6 max-h-98'>
              {chats.map((chat, index) => (
                <CarouselItem
                  key={index}
                  className={cn('flex px-1 pt-6', index % 2 === 0 ? 'justify-start' : 'justify-end')}
                >
                  <div className='bg-card flex w-full max-w-4/5 items-start gap-4 rounded-xl p-5 shadow-lg'>
                    <IconSparkles className='size-6 shrink-0' />
                    <span className='text-lg'>{chat}</span>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className='from-muted pointer-events-none absolute inset-x-0 top-0 h-30 bg-linear-to-b from-10% to-transparent' />
            <div className='from-muted pointer-events-none absolute inset-x-0 bottom-0 h-30 bg-linear-to-t from-10% to-transparent' />
          </Carousel>
        </CardContent>
      </MotionPreset>
      <CardHeader className='flex flex-1 flex-col justify-end gap-4'>
        <MotionPreset fade slide={{ direction: 'down', offset: 50 }} delay={0.65} transition={{ duration: 0.45 }}>
          <CardTitle className='text-2xl font-semibold'>{title}</CardTitle>
        </MotionPreset>
        <MotionPreset fade slide={{ direction: 'down', offset: 50 }} delay={0.8} transition={{ duration: 0.45 }}>
          <CardDescription className='text-lg'>{description}</CardDescription>
        </MotionPreset>
      </CardHeader>
    </Card>
  )

  return href ? (
    <Link href={href} className='block h-full'>
      {content}
    </Link>
  ) : (
    content
  )
}

export default CardAskPlainLanguage
