import Link from 'next/link'
import { IconArrowRight, IconArrowUpRight } from '@tabler/icons-react'

import ContentLayout from '@/components/layout/content-layout'
import type { ServicePillar } from '@/assets/data/service-pillars'
import { inquiryHref } from '@/lib/funnel'
import { Eyebrow } from './eyebrow'

const ServicesBoard = ({ services }: { services: readonly ServicePillar[] }) => (
  <section id='services' className='bg-card scroll-mt-28 py-16 sm:py-24 lg:py-32'>
    <ContentLayout>
      <div className='mb-10 flex flex-col justify-between gap-6 sm:mb-14 lg:flex-row lg:items-end'>
        <div>
          <Eyebrow>One agency. Four ways to connect.</Eyebrow>
          <h2 className='type-display max-w-3xl text-5xl leading-[1.05] tracking-tight text-balance sm:text-7xl'>
            Built around your brand.
          </h2>
        </div>
        <p className='text-muted-foreground max-w-sm text-lg text-pretty'>
          From the story you tell to the people you bring together. Choose a focus, or let us connect the pieces.
        </p>
      </div>
      <ul className='grid gap-4 md:grid-cols-2 md:gap-5'>
        {services.map((service, index) => (
          <li
            key={service.id}
            className='group bg-background shadow-surface hover:shadow-surface-hover relative flex h-full flex-col rounded-2xl p-6 transition-[box-shadow,translate] duration-200 ease-out sm:p-10 lg:hover:-translate-y-1 lg:hover:shadow-[var(--surface-shadow-hover),0_24px_48px_-24px_color-mix(in_oklch,var(--primary)_45%,transparent)]'
          >
            <div className='mb-8 flex items-center justify-between sm:mb-12'>
              <span className='text-muted-foreground text-sm tabular-nums'>
                0{index + 1} / 0{services.length}
              </span>
              <span
                aria-hidden
                className='shadow-surface group-hover:bg-primary group-hover:text-primary-foreground text-primary flex size-10 items-center justify-center rounded-full transition-colors duration-150 ease-out'
              >
                <IconArrowUpRight className='size-5 transition-[translate] duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5' />
              </span>
            </div>
            <h3 className='type-display text-4xl tracking-tight sm:text-5xl'>
              {/* Stretched link: the whole card opens the service page */}
              <Link
                href={service.href}
                className='focus-visible:after:outline-primary after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-2'
              >
                {service.name}
              </Link>
            </h3>
            <p className='text-primary mt-3 text-sm font-medium'>{service.descriptor}</p>
            <p className='text-muted-foreground mt-4 max-w-lg leading-relaxed text-pretty'>{service.description}</p>
            {/* Shortcut straight into the inquiry form, layered above the stretched link */}
            <Link
              href={inquiryHref(service.id)}
              data-track='cta_book_call'
              data-track-location={`services_board_${service.id}`}
              className='hover:text-primary focus-visible:outline-primary relative z-10 mt-auto inline-flex items-center gap-1.5 self-start rounded-md pt-8 text-sm font-medium underline underline-offset-4 transition-colors duration-150 focus-visible:outline-2'
            >
              Start with {service.name}
              <IconArrowRight aria-hidden className='size-4' />
            </Link>
          </li>
        ))}
      </ul>
    </ContentLayout>
  </section>
)

export default ServicesBoard
