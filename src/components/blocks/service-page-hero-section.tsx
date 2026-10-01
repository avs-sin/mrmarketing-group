import Link from 'next/link'

import ContentLayout from '@/components/layout/content-layout'
import { Button } from '@/components/ui/button'
import ServicesBoard from '@/components/blocks/home/services-board'
import { servicePillars } from '@/assets/data/service-pillars'
import type { ServiceMetadata } from '@/lib/services'

const HeroSection = ({ services }: { services: ServiceMetadata[] }) => (
  <>
    <section className='pt-36 pb-16 sm:pt-44 sm:pb-24'>
      <ContentLayout>
        <p className='text-primary mb-5 text-sm tracking-widest uppercase'>What we do</p>
        <h1 className='type-display max-w-4xl text-5xl leading-[1.05] tracking-tight sm:text-7xl'>
          Strategy meets storytelling.
        </h1>
        <p className='text-muted-foreground mt-6 max-w-2xl text-lg leading-relaxed'>
          Creative marketing shaped around your business. Explore our four offerings, from cinematic content to the
          collaborations and experiences that connect people.
        </p>
        <Button size='lg' className='mt-8' render={<Link href='/contact-us' />} nativeButton={false}>
          Start a project
        </Button>
      </ContentLayout>
    </section>
    <ServicesBoard services={servicePillars} />
    <section className='py-16 sm:py-24'>
      <ContentLayout>
        <h2 className='type-display text-3xl'>Supporting capabilities</h2>
        <p className='text-muted-foreground mt-3'>
          Branding, design, and digital advertising support a strategy tailored to your goals.
        </p>
        <div className='mt-8 flex flex-wrap gap-3'>
          {services
            .filter(s =>
              ['brand-strategy', 'social-media-management', 'flyers-creative-design', 'paid-advertising'].includes(
                s.slug
              )
            )
            .map(s => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className='border-border hover:border-primary focus-visible:outline-primary rounded-full border px-5 py-3 focus-visible:outline-2'
              >
                {s.title}
              </Link>
            ))}
        </div>
      </ContentLayout>
    </section>
  </>
)

export default HeroSection
