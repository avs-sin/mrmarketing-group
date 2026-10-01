import Link from 'next/link'
import { IconArrowUpRight } from '@tabler/icons-react'

import ContentLayout from '@/components/layout/content-layout'
import type { ServicePillar } from '@/assets/data/service-pillars'
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
          <li key={service.id}>
            <Link
              href={service.href}
              className='group bg-background border-border hover:border-primary/60 focus-visible:outline-primary relative flex h-full flex-col overflow-hidden rounded-2xl border p-6 transition-[border-color,transform,box-shadow] duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 sm:p-10 lg:hover:-translate-y-1 lg:hover:shadow-[0_24px_48px_-24px_color-mix(in_oklch,var(--primary)_45%,transparent)]'
            >
              <div className='mb-8 flex items-center justify-between sm:mb-12'>
                <span className='text-muted-foreground text-sm tabular-nums'>
                  0{index + 1} / 0{services.length}
                </span>
                <span className='border-border group-hover:bg-primary group-hover:border-primary group-hover:text-primary-foreground text-primary flex size-10 items-center justify-center rounded-full border transition-colors duration-300'>
                  <IconArrowUpRight
                    aria-hidden
                    className='size-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5'
                  />
                </span>
              </div>
              <h3 className='type-display text-4xl tracking-tight sm:text-5xl'>{service.name}</h3>
              <p className='text-primary mt-3 text-sm font-medium'>{service.descriptor}</p>
              <p className='text-muted-foreground mt-4 max-w-lg leading-relaxed text-pretty'>{service.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </ContentLayout>
  </section>
)

export default ServicesBoard
