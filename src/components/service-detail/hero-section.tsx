// Next Imports
import { notFound } from 'next/navigation'

// Third-party Imports
import { IconArrowDown, IconMail } from '@tabler/icons-react'

// Next Imports
import Link from 'next/link'

import MediaFeature from '@/components/blocks/media-feature'

// Component Imports
import ContentLayout from '@/components/layout/content-layout'
import { SectionHeader } from '@/components/ui/section-header'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import BeamRays from '@/components/ui/beam-rays'
import MDXContent from '@/components/mdx-content'

// Util Imports
import { getServiceBySlug } from '@/lib/services'
import { inquiryHref, pillarForServiceSlug } from '@/lib/funnel'

type HeroSectionProps = {
  badge?: string
  title?: string
  description?: string
  image?: string
  slug: string
}

const HeroSection = async ({ badge, title, description, image, slug }: HeroSectionProps) => {
  const service = await getServiceBySlug(slug)

  // Carry this offering to the contact page as the email topic
  const startHref = inquiryHref(pillarForServiceSlug(slug))

  if (!service) notFound()

  const { content } = service

  return (
    <section className='bg-card pt-36 sm:pt-44 lg:pt-52'>
      <ContentLayout>
        <div className='relative mb-8 space-y-4 text-center sm:mb-16 lg:mb-24'>
          <BeamRays
            className='absolute inset-x-0 -top-20 max-sm:hidden'
            beamCount={3}
            beamColor='var(--primary)'
            beamRaysColor='var(--primary)'
            beamRayStroke={3}
            opacity={0.18}
            duration={3}
          />
          {/* The H1 pairs the offering's brand name with its plain-language service label */}
          <SectionHeader
            headingLevel='h1'
            title={
              <>
                {title}
                {badge && (
                  <span className='text-primary mt-4 block font-sans text-lg font-medium tracking-normal sm:text-xl'>
                    {badge}
                  </span>
                )}
              </>
            }
            description={description}
          />
          <div className='flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4'>
            <Button
              size='lg'
              className='h-auto min-h-10 max-w-full py-2 whitespace-normal'
              render={<Link href={startHref} data-track='cta_book_call' data-track-location={`service_${slug}_hero`} />}
              nativeButton={false}
            >
              Email Maria about {title} <IconMail data-icon='inline-end' />
            </Button>
            <Button
              size='lg'
              className='group'
              variant='secondary'
              render={<Link href='#work' data-track='cta_next_page' data-track-location={`service_${slug}_hero_work`} />}
              nativeButton={false}
            >
              See related work
              <IconArrowDown
                data-icon='inline-end'
                className='transition-[translate] duration-150 ease-out group-hover:translate-y-0.5'
              />
            </Button>
          </div>
        </div>
        <Card className='bg-background rounded-[calc(var(--radius)*1.8+1.5rem)] shadow-none ring-0'>
          <CardContent>
            <MediaFeature image={image} alt={title ?? ''} />
          </CardContent>
        </Card>
        <div className='mt-10'>
          <MDXContent source={content} />
        </div>
      </ContentLayout>
    </section>
  )
}

export default HeroSection
