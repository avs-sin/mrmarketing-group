// Third-party Imports
import { IconArrowsExchange2, IconCode, IconPalette, IconPointerCollaboration } from '@tabler/icons-react'

// Type Imports
import type { ServiceWhatWeDoItem } from '@/lib/services'

// Component Imports
import ContentLayout from '@/components/layout/content-layout'
import { Card, CardContent } from '@/components/ui/card'
import { MotionPreset } from '@/components/ui/motion-preset'
import { SectionHeader } from '@/components/ui/section-header'
import Workflow from './workflow'
import WebDevelopment from './web-development'
import { Orbiting } from '@/components/ui/orbiting'

// SVG Imports
import Logo from '@/assets/svg/logo'

// Component Imports
import Logo2 from '@/components/logo'

// SVG Imports
import GridLines from '@/assets/svg/grid-lines'
import AnimatedLogo from '@/assets/svg/animated-logo'

// Component Imports
import HoverText from '@/components/ui/hover-text'

type WhatWeDoProps = {
  badge?: string
  title?: string
  description?: string
  items?: ServiceWhatWeDoItem[]
}

const WhatWeDo = ({ badge, title, description, items = [] }: WhatWeDoProps) => {
  const [uiUxItem, logoItem, webDevItem, testingItem] = items

  return (
    <section className='bg-card py-8 sm:py-16 lg:py-24'>
      <ContentLayout className='space-y-8 sm:space-y-16 lg:space-y-24'>
        <SectionHeader badge={badge} title={title} description={description} />

        <div className='space-y-6'>
          <Card className='from-muted to-card relative h-full border bg-linear-to-r shadow-none ring-0'>
            <MotionPreset
              fade
              slide={{ direction: 'down', offset: 50 }}
              delay={0.1}
              transition={{ duration: 0.45 }}
              className='grid grid-cols-1 items-center gap-5 px-6 lg:grid-cols-3'
            >
              <div className='space-y-4 md:col-span-2'>
                <div className='flex items-center gap-2.5'>
                  <IconPalette />
                  <h2 className='text-2xl font-semibold'>{uiUxItem?.title}</h2>
                </div>
                <p className='text-muted-foreground text-lg'>{uiUxItem?.description}</p>
              </div>
              <div className='flex justify-center'>
                <Workflow />
              </div>
            </MotionPreset>
          </Card>
          <Card className='border shadow-none ring-0'>
            <MotionPreset
              fade
              slide={{ direction: 'down', offset: 50 }}
              delay={0.1}
              transition={{ duration: 0.45 }}
              className='grid grid-cols-1 items-center px-6 lg:grid-cols-2'
            >
              <div className='relative mx-auto h-full min-h-50 w-full max-w-146.5 overflow-hidden'>
                <div className='absolute inset-s-1/2 top-0 flex -translate-x-1/2 flex-col items-center gap-5 sm:top-19'>
                  <AnimatedLogo width={59} height={73} />
                  <HoverText text='MR Marketing Group' />
                  <Logo2 />
                </div>
                <GridLines className='w-full max-sm:hidden' />
                <div className='from-card via-card/80 pointer-events-none absolute inset-y-0 left-0 z-6 w-25 bg-linear-to-r to-transparent' />
                <div className='from-card via-card/80 pointer-events-none absolute inset-y-0 right-0 z-6 w-25 bg-linear-to-l to-transparent' />
              </div>
              <div className='space-y-4'>
                <div className='flex items-center gap-2.5'>
                  <IconPointerCollaboration />
                  <h2 className='text-2xl font-semibold'>{logoItem?.title}</h2>
                </div>
                <p className='text-muted-foreground text-lg'>{logoItem?.description}</p>
              </div>
            </MotionPreset>
          </Card>
          <Card className='from-muted to-card min-h-62.5 border bg-linear-to-l shadow-none ring-0'>
            <CardContent>
              <MotionPreset
                fade
                slide={{ direction: 'down', offset: 50 }}
                delay={0.1}
                transition={{ duration: 0.45 }}
                className='grid grid-cols-1 items-center gap-5 lg:grid-cols-2'
              >
                <div className='space-y-4'>
                  <div className='flex items-center gap-2.5'>
                    <IconCode />
                    <h2 className='text-2xl font-semibold'>{webDevItem?.title}</h2>
                  </div>
                  <p className='text-muted-foreground text-lg'>{webDevItem?.description}</p>
                </div>
                <div className='relative'>
                  <WebDevelopment />
                  <img
                    src='/images/Sample Code Image.webp'
                    alt=''
                    className='absolute left-1/2 -translate-x-1/2 lg:top-40 dark:invert'
                  />
                </div>
              </MotionPreset>
            </CardContent>
          </Card>

          <Card className='h-full gap-10 overflow-hidden border shadow-none ring-0'>
            <MotionPreset
              fade
              slide={{ direction: 'down', offset: 50 }}
              delay={0.1}
              transition={{ duration: 0.45 }}
              className='grid grid-cols-1 items-center overflow-hidden px-6 lg:grid-cols-2'
            >
              <div className='space-y-4'>
                <div className='flex items-center gap-2.5'>
                  <IconArrowsExchange2 />
                  <h2 className='text-2xl font-semibold'>{testingItem?.title}</h2>
                </div>
                <p className='text-muted-foreground text-lg'>{testingItem?.description}</p>
              </div>
              <div className='relative h-68 scale-90 -rotate-6 overflow-hidden'>
                <div className='absolute -top-2 right-0 flex size-130 items-center justify-center max-lg:left-1/2 max-lg:-translate-x-1/2'>
                  <Orbiting duration={30} radius={280}>
                    <span className='bg-background grid size-11 place-content-center overflow-hidden rounded-full border'>
                      <img src='/images/logos/react-logo.webp' alt='React Logo' className='size-7' />
                    </span>
                    <span className='bg-background grid size-11 place-content-center overflow-hidden rounded-full border'>
                      <img src='/images/logos/vue-logo.webp' alt='Vue Logo' className='size-7' />
                    </span>
                    <span className='bg-background grid size-11 place-content-center overflow-hidden rounded-full border'>
                      <img src='/images/logos/react-logo.webp' alt='React Logo' className='size-7' />
                    </span>
                    <span className='bg-background grid size-11 place-content-center overflow-hidden rounded-full border'>
                      <img src='/images/logos/vue-logo.webp' alt='Vue Logo' className='size-7' />
                    </span>
                  </Orbiting>
                  <Orbiting duration={30} radius={220} reverse speed={1.33}>
                    <span className='bg-background grid size-11 place-content-center overflow-hidden rounded-full border'>
                      <img src='/images/logos/figma-logo.webp' alt='Figma Logo' className='size-7' />
                    </span>
                    <span className='bg-background grid size-11 place-content-center overflow-hidden rounded-full border'>
                      <img src='/images/logos/claude-logo.webp' alt='Claude Logo' className='size-7' />
                    </span>
                    <span className='bg-background grid size-11 place-content-center overflow-hidden rounded-full border'>
                      <img src='/images/logos/figma-logo.webp' alt='Figma Logo' className='size-7' />
                    </span>
                    <span className='bg-background grid size-11 place-content-center overflow-hidden rounded-full border'>
                      <img src='/images/logos/claude-logo.webp' alt='Claude Logo' className='size-7' />
                    </span>
                  </Orbiting>
                  <Orbiting duration={30} radius={160} speed={1.67}>
                    <span className='bg-background grid size-11 place-content-center overflow-hidden rounded-full border'>
                      <img src='/images/logos/laravel-logo.webp' alt='Laravel Logo' className='size-7' />
                    </span>
                    <span className='bg-background grid size-11 place-content-center overflow-hidden rounded-full border'>
                      <img src='/images/logos/vue-logo.webp' alt='Vue Logo' className='size-7 dark:invert' />
                    </span>
                    <span className='bg-background grid size-11 place-content-center overflow-hidden rounded-full border'>
                      <img src='/images/logos/laravel-logo.webp' alt='Laravel Logo' className='size-7' />
                    </span>
                    <span className='bg-background grid size-11 place-content-center overflow-hidden rounded-full border'>
                      <img src='/images/logos/vue-logo.webp' alt='Vue Logo' className='size-7 dark:invert' />
                    </span>
                  </Orbiting>
                  <Orbiting duration={30} radius={100} reverse speed={2}>
                    <span className='bg-background grid size-11 place-content-center overflow-hidden rounded-full border'>
                      <img src='/images/logos/next-logo.webp' alt='Next.js Logo' className='size-7 dark:invert' />
                    </span>
                    <span className='bg-background grid size-11 place-content-center overflow-hidden rounded-full border'>
                      <img src='/images/logos/next-logo.webp' alt='Next.js Logo' className='size-7 dark:invert' />
                    </span>
                  </Orbiting>
                  <span className='bg-primary absolute top-1/2 left-1/2 z-10 flex size-18 -translate-x-1/2 -translate-y-[calc(50%+1rem)] items-center justify-center rounded-full'>
                    <Logo className='size-11' fillColor='var(--primary)' outerColor='var(--primary-foreground)' />
                  </span>
                </div>
                <div className='from-card pointer-events-none absolute inset-y-0 left-0 w-30 bg-linear-to-r to-transparent' />
                <div className='from-card pointer-events-none absolute inset-y-0 right-0 w-20 bg-linear-to-l to-transparent' />
                <div className='from-card pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-linear-to-t to-transparent' />
              </div>
            </MotionPreset>
          </Card>
        </div>
      </ContentLayout>
    </section>
  )
}

export default WhatWeDo
