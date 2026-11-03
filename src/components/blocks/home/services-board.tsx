import Link from 'next/link'
import { IconArrowRight, IconArrowUpRight } from '@tabler/icons-react'

import ContentLayout from '@/components/layout/content-layout'
import type { ServicePillar } from '@/assets/data/service-pillars'
import { inquiryHref } from '@/lib/funnel'
import { Eyebrow } from './eyebrow'

const ServicesBoard = ({ services }: { services: readonly ServicePillar[] }) => (
  <section id='services' className='scroll-mt-28 py-16 sm:py-24 lg:py-32'>
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
      {/* One full-width row per offering: the name carries the row, the whole row opens its page */}
      <ul className='border-border border-t'>
        {services.map((service, index) => (
          <li
            key={service.id}
            className='group border-border relative grid gap-x-8 gap-y-3 border-b py-8 sm:py-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)_auto] lg:items-center lg:py-12'
          >
            <div className='flex items-baseline gap-4 sm:gap-6'>
              <span className='text-muted-foreground w-7 shrink-0 text-sm tabular-nums'>0{index + 1}</span>
              <h3 className='type-display text-5xl leading-none tracking-tight transition-[color,translate] duration-200 ease-out group-hover:text-primary sm:text-7xl lg:group-hover:translate-x-2 xl:text-[5.25rem]'>
                {/* Stretched link: the whole row opens the service page */}
                <Link
                  href={service.href}
                  className='focus-visible:after:outline-primary after:absolute after:inset-0 focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-2'
                >
                  {service.name}
                </Link>
              </h3>
            </div>
            <div className='ps-11 sm:ps-13 lg:ps-0'>
              <p className='text-primary text-sm font-medium'>{service.descriptor}</p>
              <p className='text-muted-foreground mt-2 max-w-md leading-relaxed text-pretty'>{service.description}</p>
              {/* Shortcut straight to the Email Maria panel, layered above the stretched link */}
              <Link
                href={inquiryHref(service.id)}
                data-track='cta_book_call'
                data-track-location={`services_board_${service.id}`}
                className='hover:text-primary focus-visible:outline-primary relative z-10 mt-4 inline-flex items-center gap-1.5 rounded-md text-sm font-medium underline underline-offset-4 transition-colors duration-150 focus-visible:outline-2'
              >
                Start with {service.name}
                <IconArrowRight aria-hidden className='size-4' />
              </Link>
            </div>
            <span
              aria-hidden
              className='shadow-surface group-hover:bg-primary group-hover:text-primary-foreground text-primary hidden size-14 items-center justify-center rounded-full transition-colors duration-150 ease-out lg:flex'
            >
              <IconArrowUpRight className='size-6 transition-[translate] duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5' />
            </span>
          </li>
        ))}
      </ul>
    </ContentLayout>
  </section>
)

export default ServicesBoard
