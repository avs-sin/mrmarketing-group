// Next Imports
import Link from 'next/link'

// Third-party Imports
import { IconArrowRight, IconPhoneCall, IconTable, IconPalette, IconMessage, IconFileCode2 } from '@tabler/icons-react'

// Type Imports
import type { ServiceMetadata } from '@/lib/services'

// Component Imports
import BeamRays from '@/components/ui/beam-rays'
import CardAskPlainLanguage from '@/components/blocks/our-services/card-ask-plain-language'
import CardParticles from '@/components/blocks/our-services/card-particles'
import CommitItem from '@/components/blocks/our-services/commit-item'
import ContentLayout from '@/components/layout/content-layout'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { MotionPreset } from '@/components/ui/motion-preset'
import { Orbiting } from '@/components/ui/orbiting'
import { SectionHeader } from '@/components/ui/section-header'

// SVG Imports
import ShadcnLogo from '@/assets/svg/shadcn-logo'

type HeroSectionProps = {
  services?: ServiceMetadata[]
}

const HeroSection = ({ services = [] }: HeroSectionProps) => {
  // Preferred display order. Any service not listed here is appended in file order.
  const orderedSlugs = [
    'content-creation',
    'event-marketing',
    'brand-strategy',
    'social-media-management',
    'sponsorship-partnerships',
    'flyers-creative-design',
    'paid-advertising'
  ]

  const orderedServices = [
    ...orderedSlugs.map(slug => services.find(service => service.slug === slug)).filter(Boolean),
    ...services.filter(service => !orderedSlugs.includes(service.slug))
  ] as ServiceMetadata[]

  // The first four services fill the featured layout slots; the rest render in a simple grid below.
  const [contentService, eventsService, brandService, socialService, ...remainingServices] = orderedServices

  return (
    <section className='bg-card pt-36 sm:pt-44 lg:pt-52'>
      <ContentLayout>
        <MotionPreset fade blur slide={{ direction: 'down', offset: 75 }} transition={{ duration: 0.45 }}>
          <div className='relative space-y-4 text-center'>
            <BeamRays
              className='absolute inset-x-0 -top-20 max-sm:hidden'
              beamCount={3}
              beamColor='var(--primary)'
              beamRaysColor='var(--primary)'
              beamRayStroke={3}
              opacity={0.18}
              duration={3}
            />
            <SectionHeader
              badge='What We Do'
              title='Full-Service. Zero Excuses.'
              description='Content, events, brand, social, partnerships, creative, and paid media for Las Vegas restaurants, venues, and entertainment brands.'
              badgeClassName='bg-card z-1'
            />
            <div className='space-x-4'>
              <Button size='lg' render={<Link href='/contact-us' />} nativeButton={false}>
                Start a Project <IconPhoneCall />
              </Button>
              <Button
                size='lg'
                className='group'
                variant='secondary'
                render={<Link href='/#pricing' />}
                nativeButton={false}
              >
                View Pricing{' '}
                <IconArrowRight className='transition-transform duration-200 group-hover:translate-x-0.5' />
              </Button>
            </div>
          </div>
        </MotionPreset>
        <div className='mt-10 space-y-6'>
          <div className='flex flex-col gap-6'>
            <MotionPreset
              fade
              blur
              slide={{ direction: 'down', offset: 75 }}
              transition={{ duration: 0.45 }}
              className='overflow-hidden'
            >
              <Link href={`/services/${contentService?.slug}`} className='block'>
                <Card className='bg-muted h-full gap-10 overflow-hidden shadow-none ring-0'>
                  <MotionPreset
                    fade
                    slide={{ direction: 'down', offset: 50 }}
                    delay={0.1}
                    transition={{ duration: 0.45 }}
                  >
                    <CardContent className='relative grid grid-cols-1 items-center overflow-hidden lg:grid-cols-2'>
                      <div className='space-y-4'>
                        <h2 className='text-2xl font-semibold'>{contentService?.title}</h2>
                        <p className='text-muted-foreground text-lg'>{contentService?.description}</p>
                      </div>
                      <div className='relative h-85 overflow-hidden'>
                        <div className='absolute top-14 right-0 flex size-130 items-center justify-center max-lg:left-1/2 max-lg:-translate-x-1/2'>
                          <Orbiting duration={30} radius={260}>
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
                          <Orbiting duration={30} radius={200} reverse speed={1.33}>
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
                          <Orbiting duration={30} radius={140} speed={1.67}>
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
                          <Orbiting duration={30} radius={80} reverse speed={2}>
                            <span className='bg-card grid size-11 place-content-center overflow-hidden rounded-full'>
                              <img
                                src='/images/logos/next-logo.webp'
                                alt='Next.js Logo'
                                className='size-7 dark:invert'
                              />
                            </span>
                            <span className='bg-card grid size-11 place-content-center overflow-hidden rounded-full'>
                              <img
                                src='/images/logos/next-logo.webp'
                                alt='Next.js Logo'
                                className='size-7 dark:invert'
                              />
                            </span>
                          </Orbiting>
                          <ShadcnLogo className='absolute top-1/2 left-1/2 z-10 size-16 -translate-x-1/2 -translate-y-[calc(50%+1rem)]' />
                        </div>
                      </div>
                    </CardContent>
                  </MotionPreset>
                </Card>
              </Link>
            </MotionPreset>
            <MotionPreset
              fade
              blur
              slide={{ direction: 'down', offset: 75 }}
              delay={0.2}
              transition={{ duration: 0.45 }}
              className='overflow-hidden rounded-4xl'
            >
              <Link href={`/services/${eventsService?.slug}`} className='block overflow-hidden rounded-4xl'>
                <Card className='bg-muted h-full shadow-none ring-0'>
                  <CardContent className='flex flex-col items-center justify-center gap-6 lg:flex-row'>
                    <div className='flex gap-6 px-1 py-7 max-md:flex-col'>
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
                              <span>Authentication</span>
                            </div>
                            <div className='bg-muted flex items-center gap-3 rounded-sm p-2'>
                              <IconTable className='size-5 shrink-0' />
                              <span>Desktop size</span>
                            </div>
                            <div className='bg-muted flex items-center gap-3 rounded-sm p-2'>
                              <IconTable className='size-5 shrink-0' />
                              <span>Payments</span>
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
                              <img
                                src='/images/logos/github-logo.webp'
                                alt='GitHub Logo'
                                className='size-7 dark:invert'
                              />
                            </div>
                            <div className='relative flex h-full max-h-46 flex-col gap-4 overflow-hidden pt-4 pl-7.5'>
                              <span className='bg-border absolute inset-y-0 left-2.75 w-0.5 rounded-full' />
                              <CommitItem message='Commits on 28, APR' />
                              <CommitItem message='Commits on 04, APR' />
                              <CommitItem message='Commits on 23, MAR' />
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
                    <div className='space-y-4'>
                      <h2 className='text-2xl font-semibold'>{eventsService?.title}</h2>
                      <p className='text-muted-foreground text-lg lg:max-w-[384px]'>{eventsService?.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </MotionPreset>
          </div>
          <div className='grid gap-6 lg:grid-cols-5'>
            <MotionPreset
              fade
              blur
              slide={{ direction: 'down', offset: 75 }}
              delay={0.4}
              transition={{ duration: 0.45 }}
              className='overflow-hidden lg:col-span-3'
            >
              <CardAskPlainLanguage
                title={brandService?.title}
                description={brandService?.description}
                href={`/services/${brandService?.slug}`}
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
                title={socialService?.title}
                description={socialService?.description}
                href={`/services/${socialService?.slug}`}
              />
            </MotionPreset>
          </div>
          {remainingServices.length > 0 && (
            <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
              {remainingServices.map((service, index) => (
                <MotionPreset
                  key={service.slug}
                  fade
                  blur
                  slide={{ direction: 'down', offset: 75 }}
                  delay={0.2 + index * 0.15}
                  transition={{ duration: 0.45 }}
                  className='overflow-hidden'
                >
                  <Link href={`/services/${service.slug}`} className='block h-full'>
                    <Card className='bg-muted h-full shadow-none ring-0'>
                      <CardContent className='space-y-4'>
                        <h2 className='text-2xl font-semibold'>{service.title}</h2>
                        <p className='text-muted-foreground text-lg'>{service.description}</p>
                      </CardContent>
                    </Card>
                  </Link>
                </MotionPreset>
              ))}
            </div>
          )}
        </div>
      </ContentLayout>
    </section>
  )
}

export default HeroSection
