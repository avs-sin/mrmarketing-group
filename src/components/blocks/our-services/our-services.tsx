// Next Imports
import Link from 'next/link'

// Third-party Imports
import { IconTable, IconPalette, IconMessage, IconFileCode2, IconArrowRight } from '@tabler/icons-react'

// Component Imports
import CardAskPlainLanguage from '@/components/blocks/our-services/card-ask-plain-language'
import CardParticles from '@/components/blocks/our-services/card-particles'
import CommitItem from '@/components/blocks/our-services/commit-item'
import ContentLayout from '@/components/layout/content-layout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { MotionPreset } from '@/components/ui/motion-preset'
import { Orbiting } from '@/components/ui/orbiting'
import { SectionHeader } from '@/components/ui/section-header'

// SVG Imports
import ShadcnLogo from '@/assets/svg/shadcn-logo'

const OurServices = () => {
  return (
    <section className='py-8 sm:py-16 lg:py-24'>
      <ContentLayout>
        <MotionPreset fade blur slide={{ direction: 'down', offset: 75 }} transition={{ duration: 0.45 }}>
          <div className='mb-24 space-y-4 text-center'>
            <SectionHeader
              badge='What We Do'
              title='Full-Service. Zero Excuses.'
              description='Content, events, brand, social, partnerships, creative, and paid media for Las Vegas restaurants, venues, and entertainment brands.'
            />
            <Button size='lg' className='group' render={<Link href='/services' />} nativeButton={false}>
              All Services
              <IconArrowRight
                data-icon='inline-end'
                className='transition-[translate] duration-150 ease-out group-hover:translate-x-0.5'
              />
            </Button>
          </div>
        </MotionPreset>
        <div className='grid grid-cols-1 gap-6 lg:grid-cols-5'>
          <MotionPreset
            fade
            blur
            slide={{ direction: 'down', offset: 75 }}
            transition={{ duration: 0.45 }}
            className='overflow-hidden lg:col-span-2'
          >
            <Card className='bg-muted h-full gap-10 overflow-hidden border pt-0 shadow-none ring-0'>
              <MotionPreset
                fade
                slide={{ direction: 'down', offset: 50 }}
                delay={0.1}
                transition={{ duration: 0.45 }}
                className='relative flex h-80 justify-center overflow-hidden'
              >
                <div className='relative flex size-151 flex-col items-center justify-center'>
                  <Orbiting duration={30} radius={280}>
                    <span className='bg-card grid size-11 place-content-center overflow-hidden rounded-full'>
                      <img src='/images/logos/react-logo.webp' alt='React Logo' className='size-7' />
                    </span>
                    <span className='bg-card grid size-11 place-content-center overflow-hidden rounded-full'>
                      <img src='/images/logos/vue-logo.webp' alt='Vue Logo' className='size-7' />
                    </span>
                    <span className='bg-card grid size-11 place-content-center overflow-hidden rounded-full'>
                      <img src='/images/logos/react-logo.webp' alt='React Logo' className='size-7' />
                    </span>
                    <span className='bg-card grid size-11 place-content-center overflow-hidden rounded-full'>
                      <img src='/images/logos/vue-logo.webp' alt='Vue Logo' className='size-7' />
                    </span>
                  </Orbiting>
                  <Orbiting duration={30} radius={220} reverse speed={1.33}>
                    <span className='bg-card grid size-11 place-content-center overflow-hidden rounded-full'>
                      <img src='/images/logos/figma-logo.webp' alt='Figma Logo' className='size-7' />
                    </span>
                    <span className='bg-card grid size-11 place-content-center overflow-hidden rounded-full'>
                      <img src='/images/logos/claude-logo.webp' alt='Claude Logo' className='size-7' />
                    </span>
                    <span className='bg-card grid size-11 place-content-center overflow-hidden rounded-full'>
                      <img src='/images/logos/figma-logo.webp' alt='Figma Logo' className='size-7' />
                    </span>
                    <span className='bg-card grid size-11 place-content-center overflow-hidden rounded-full'>
                      <img src='/images/logos/claude-logo.webp' alt='Claude Logo' className='size-7' />
                    </span>
                  </Orbiting>
                  <Orbiting duration={30} radius={160} speed={1.67}>
                    <span className='bg-card grid size-11 place-content-center overflow-hidden rounded-full'>
                      <img src='/images/logos/laravel-logo.webp' alt='Laravel Logo' className='size-7' />
                    </span>
                    <span className='bg-card grid size-11 place-content-center overflow-hidden rounded-full'>
                      <img src='/images/logos/vue-logo.webp' alt='Vue Logo' className='size-7 dark:invert' />
                    </span>
                    <span className='bg-card grid size-11 place-content-center overflow-hidden rounded-full'>
                      <img src='/images/logos/laravel-logo.webp' alt='Laravel Logo' className='size-7' />
                    </span>
                    <span className='bg-card grid size-11 place-content-center overflow-hidden rounded-full'>
                      <img src='/images/logos/vue-logo.webp' alt='Vue Logo' className='size-7 dark:invert' />
                    </span>
                  </Orbiting>
                  <Orbiting duration={30} radius={100} reverse speed={2}>
                    <span className='bg-card grid size-11 place-content-center overflow-hidden rounded-full'>
                      <img src='/images/logos/next-logo.webp' alt='Next.js Logo' className='size-7 dark:invert' />
                    </span>
                    <span className='bg-card grid size-11 place-content-center overflow-hidden rounded-full'>
                      <img src='/images/logos/next-logo.webp' alt='Next.js Logo' className='size-7 dark:invert' />
                    </span>
                  </Orbiting>
                  <ShadcnLogo className='absolute top-1/2 left-1/2 z-10 size-16 -translate-x-1/2 -translate-y-[calc(50%+1rem)]' />
                </div>
                <div className='from-muted pointer-events-none absolute inset-x-0 top-0 h-20 bg-linear-to-b from-20% to-transparent' />
                <div className='from-muted pointer-events-none absolute inset-y-0 right-0 w-10 bg-linear-to-l to-transparent' />
                <div className='from-muted pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-20% to-transparent' />
                <div className='from-muted pointer-events-none absolute inset-y-0 left-0 w-10 bg-linear-to-r to-transparent' />
              </MotionPreset>
              <CardHeader className='gap-4'>
                <MotionPreset
                  fade
                  slide={{ direction: 'down', offset: 50 }}
                  delay={0.25}
                  transition={{ duration: 0.45 }}
                >
                  <CardTitle className='text-2xl font-semibold'>Content Creation</CardTitle>
                </MotionPreset>
                <MotionPreset
                  fade
                  slide={{ direction: 'down', offset: 50 }}
                  delay={0.4}
                  transition={{ duration: 0.45 }}
                >
                  <CardDescription className='text-lg'>
                    Short-form video, photography, Reels, TikToks, and social assets shot on-site. We make your brand
                    look like a main event.
                  </CardDescription>
                </MotionPreset>
              </CardHeader>
            </Card>
          </MotionPreset>
          <MotionPreset
            fade
            blur
            slide={{ direction: 'down', offset: 75 }}
            delay={0.2}
            transition={{ duration: 0.45 }}
            className='overflow-hidden lg:col-span-3'
          >
            <Card className='bg-muted h-full border shadow-none ring-0'>
              <CardContent className='flex-1'>
                <div className='flex gap-6 overflow-x-auto px-1 py-7 max-md:flex-col'>
                  <MotionPreset
                    fade
                    slide={{ direction: 'down', offset: 50 }}
                    delay={0.3}
                    transition={{ duration: 0.45 }}
                    className='flex-1'
                  >
                    <Card className='h-full min-w-50 shadow-lg'>
                      <CardContent className='flex flex-col items-start gap-4 text-base'>
                        <img src='/images/logos/figma-logo.webp' alt='Figma Logo' className='size-7' />
                        <div className='bg-muted flex items-center gap-3 rounded-sm p-2'>
                          <IconTable className='size-5 shrink-0' />
                          <span>Reels & TikToks</span>
                        </div>
                        <div className='bg-muted flex items-center gap-3 rounded-sm p-2'>
                          <IconTable className='size-5 shrink-0' />
                          <span>On-site photography</span>
                        </div>
                        <div className='bg-muted flex items-center gap-3 rounded-sm p-2'>
                          <IconTable className='size-5 shrink-0' />
                          <span>Story assets</span>
                        </div>
                      </CardContent>
                    </Card>
                  </MotionPreset>
                  <MotionPreset
                    fade
                    slide={{ direction: 'down', offset: 50 }}
                    delay={0.45}
                    transition={{ duration: 0.45 }}
                    className='flex-1'
                  >
                    <Card className='h-full min-w-50 pb-0 shadow-lg'>
                      <CardContent className='flex flex-1 flex-col gap-4 px-4'>
                        <div className='flex gap-2'>
                          <img src='/images/logos/claude-logo.webp' alt='Claude Logo' className='size-7' />
                          <img src='/images/logos/github-logo.webp' alt='GitHub Logo' className='size-7 dark:invert' />
                        </div>
                        <div className='relative flex h-full max-h-46 flex-col gap-4 overflow-hidden pt-4 pl-7.5'>
                          <span className='bg-border absolute inset-y-0 left-2.75 w-0.5 rounded-full' />
                          <CommitItem message='Executive dinner, Tuscan Cove' />
                          <CommitItem message='March Madness watch party' />
                          <CommitItem message='MADE creator night' />
                          <div className='from-card absolute inset-x-0 top-0 h-4 bg-linear-to-b to-transparent' />
                          <div className='from-card absolute inset-x-0 bottom-0 h-4 bg-linear-to-t to-transparent' />
                        </div>
                      </CardContent>
                    </Card>
                  </MotionPreset>
                  <MotionPreset
                    fade
                    slide={{ direction: 'down', offset: 50 }}
                    delay={0.6}
                    transition={{ duration: 0.45 }}
                    className='flex-1'
                  >
                    <Card className='h-full min-w-50 overflow-hidden shadow-lg'>
                      <CardContent className='flex h-full flex-col gap-4'>
                        <div className='flex gap-2'>
                          <ShadcnLogo className='size-7 shrink-0' />
                          <img src='/images/logos/instagram-logo.webp' alt='instagram Logo' className='size-7' />
                          <img src='/images/logos/x-logo.webp' alt='x Logo' className='size-7' />
                        </div>
                        <div className='grid h-full min-h-27 place-content-center'>
                          <div className='relative z-1 flex h-full flex-col items-center justify-center'>
                            <span className='bg-muted absolute top-1/2 left-0 grid size-9 -translate-x-full -translate-y-1/2 place-content-center rounded-sm'>
                              <IconPalette className='size-5 shrink-0' />
                              <span className='outline-border bg-primary absolute top-1/2 right-0 size-1.5 translate-x-1/2 -translate-y-1/2 rounded-full outline-1 outline-offset-1' />
                            </span>
                            <svg
                              width='80'
                              height='45'
                              viewBox='0 0 80 45'
                              fill='none'
                              xmlns='http://www.w3.org/2000/svg'
                            >
                              <path
                                d='M0.5 44.5H11.5941C18.9211 44.5 25.7672 40.8523 29.854 34.771L46.3467 10.2289C50.4335 4.14757 57.2796 0.499893 64.6066 0.499893H79.5007'
                                stroke='var(--border)'
                                strokeLinecap='round'
                              />
                            </svg>
                            <svg
                              width='80'
                              height='45'
                              viewBox='0 0 80 45'
                              fill='none'
                              xmlns='http://www.w3.org/2000/svg'
                              className='-z-1 rotate-x-180'
                            >
                              <path
                                d='M0.5 44.5H11.5941C18.9211 44.5 25.7672 40.8523 29.854 34.771L46.3467 10.2289C50.4335 4.14757 57.2796 0.499893 64.6066 0.499893H79.5007'
                                stroke='var(--border)'
                                strokeLinecap='round'
                              />
                            </svg>
                            <span className='bg-muted absolute top-0 right-0 grid size-9 translate-x-full -translate-y-1/2 place-content-center rounded-sm'>
                              <IconMessage className='size-5 shrink-0' />
                              <span className='outline-border bg-primary absolute top-1/2 left-0 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full outline-1 outline-offset-1' />
                              <span className='outline-border bg-primary absolute top-1/2 right-0 size-1.5 translate-x-1/2 -translate-y-1/2 rounded-full outline-1 outline-offset-1' />
                              <span className='bg-border absolute top-1/2 right-0 -z-1 h-px w-8 translate-x-full -translate-y-1/2' />
                            </span>
                            <span className='bg-muted absolute right-0 bottom-0 grid size-9 translate-x-full translate-y-1/2 place-content-center rounded-sm'>
                              <IconFileCode2 className='size-5 shrink-0' />
                              <span className='outline-border bg-primary absolute top-1/2 left-0 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full outline-1 outline-offset-1' />
                              <span className='outline-border bg-primary absolute top-1/2 right-0 size-1.5 translate-x-1/2 -translate-y-1/2 rounded-full outline-1 outline-offset-1' />
                              <span className='bg-border absolute top-1/2 right-0 -z-1 h-px w-8 translate-x-full -translate-y-1/2' />
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </MotionPreset>
                  <div className='from-muted pointer-events-none absolute inset-y-0 left-0 hidden w-24 bg-linear-to-r to-transparent lg:max-xl:block' />
                  <div className='from-muted pointer-events-none absolute inset-y-0 right-0 hidden w-24 bg-linear-to-l to-transparent lg:max-xl:block' />
                </div>
              </CardContent>
              <CardHeader className='gap-4'>
                <MotionPreset
                  fade
                  slide={{ direction: 'down', offset: 50 }}
                  delay={0.75}
                  transition={{ duration: 0.45 }}
                >
                  <CardTitle className='text-2xl font-semibold'>Event Marketing</CardTitle>
                </MotionPreset>
                <MotionPreset
                  fade
                  slide={{ direction: 'down', offset: 50 }}
                  delay={0.9}
                  transition={{ duration: 0.45 }}
                >
                  <CardDescription className='text-lg'>
                    From executive dinners to large-scale creator events: strategy, promotion, flyers, and day-of
                    execution.
                  </CardDescription>
                </MotionPreset>
              </CardHeader>
            </Card>
          </MotionPreset>
          <MotionPreset
            fade
            blur
            slide={{ direction: 'down', offset: 75 }}
            delay={0.4}
            transition={{ duration: 0.45 }}
            className='overflow-hidden lg:col-span-3'
          >
            <CardAskPlainLanguage
              title='Social Media Management'
              description='Full-service management of your Instagram, TikTok, and Facebook. Content calendars, posting, engagement, and growth strategy included.'
              href='/services/social-media-management'
            />
          </MotionPreset>
          <MotionPreset
            fade
            blur
            slide={{ direction: 'down', offset: 75 }}
            delay={0.6}
            transition={{ duration: 0.45 }}
            className='overflow-hidden lg:col-span-2'
          >
            <CardParticles
              title='Brand Strategy'
              description='Positioning, voice, identity, and messaging built to stand out in one of the most competitive markets in the world.'
              href='/services/brand-strategy'
            />
          </MotionPreset>
        </div>
      </ContentLayout>
    </section>
  )
}

export default OurServices
