import Link from 'next/link'
import { IconArrowRight } from '@tabler/icons-react'

import ContentLayout from '@/components/layout/content-layout'
import { Eyebrow } from '@/components/blocks/home/eyebrow'
import type { ServicePillar } from '@/assets/data/service-pillars'
import { inquiryHref } from '@/lib/funnel'
import { cn } from '@/lib/utils'

/** Cross-links between offerings: learn more, or jump straight into the inquiry with that offering preselected. */
const PillarLinks = ({
  eyebrow,
  title,
  description,
  pillars,
  location,
  className
}: {
  eyebrow: string
  title: string
  description?: string
  pillars: readonly ServicePillar[]
  location: string
  className?: string
}) => {
  if (!pillars.length) return null

  return (
    <section className={cn('py-16 sm:py-24', className)}>
      <ContentLayout>
        <div className='mb-10 max-w-2xl'>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className='type-display text-4xl tracking-tight text-balance sm:text-6xl'>{title}</h2>
          {description && <p className='text-muted-foreground mt-4 text-lg text-pretty'>{description}</p>}
        </div>
        <ul className={cn('grid gap-4', pillars.length > 2 ? 'md:grid-cols-3' : 'md:grid-cols-2')}>
          {pillars.map(pillar => (
            <li key={pillar.id} className='bg-background shadow-surface flex flex-col rounded-2xl p-6 sm:p-8'>
              <h3 className='type-display text-3xl tracking-tight'>{pillar.name}</h3>
              <p className='text-primary mt-2 text-sm font-medium'>{pillar.descriptor}</p>
              <p className='text-muted-foreground mt-3 leading-relaxed text-pretty'>{pillar.description}</p>
              <div className='mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-6 text-sm font-medium'>
                <Link
                  href={pillar.href}
                  data-track='cta_next_page'
                  data-track-location={`${location}_${pillar.id}_learn`}
                  className='hover:text-primary rounded-md underline underline-offset-4 transition-colors duration-150'
                >
                  Explore {pillar.name}
                </Link>
                <Link
                  href={inquiryHref(pillar.id)}
                  data-track='cta_book_call'
                  data-track-location={`${location}_${pillar.id}`}
                  className='text-primary inline-flex items-center gap-1.5 rounded-md underline underline-offset-4'
                >
                  Start a project <IconArrowRight aria-hidden className='size-4' />
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </ContentLayout>
    </section>
  )
}

export default PillarLinks
