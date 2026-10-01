// Next Imports
import { notFound } from 'next/navigation'

// Third-party Imports
import { IconArrowRight, IconPhoneCall } from '@tabler/icons-react'

// Next Imports
import Link from 'next/link'

import manifest from '@/assets/data/media-manifest.json'

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

  // Preselect this offering in the contact page's inquiry form
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
          <SectionHeader
            headingLevel='h1'
            badge={badge}
            title={title}
            description={description}
            badgeClassName='bg-card z-1'
          />
          <div className='space-x-4'>
            <Button
              size='lg'
              render={<Link href={startHref} data-track='cta_book_call' data-track-location={`service_${slug}_hero`} />}
              nativeButton={false}
            >
              Start a Project <IconPhoneCall data-icon='inline-end' />
            </Button>
            <Button
              size='lg'
              className='group'
              variant='secondary'
              render={<Link href={startHref} />}
              nativeButton={false}
            >
              Discuss your project{' '}
              <IconArrowRight
                data-icon='inline-end'
                className='transition-[translate] duration-150 ease-out group-hover:translate-x-0.5'
              />
            </Button>
          </div>
        </div>
        <Card className='bg-background rounded-[calc(var(--radius)*1.8+1.5rem)] shadow-none ring-0'>
          <CardContent>
            <img
              src={image}
              alt={manifest.find(asset => asset.src === image || asset.poster === image)?.alt ?? title}
              className='img-outline max-h-120 w-full rounded-2xl bg-black object-contain'
            />
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
