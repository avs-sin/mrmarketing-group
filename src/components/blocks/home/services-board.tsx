import Link from 'next/link'
import { IconArrowUpRight } from '@tabler/icons-react'

import ContentLayout from '@/components/layout/content-layout'
import type { ServicePillar } from '@/assets/data/service-pillars'

const ServicesBoard = ({ services }: { services: readonly ServicePillar[] }) => (
  <section id='services' className='border-border bg-card border-y py-16 sm:py-24'>
    <ContentLayout>
      <div className='mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end'>
        <div>
          <p className='text-primary mb-4 text-sm font-medium tracking-widest uppercase'>
            One agency. Four ways to connect.
          </p>
          <h2 className='type-display max-w-3xl text-5xl leading-[1.05] tracking-tight sm:text-7xl'>
            Built around your brand.
          </h2>
        </div>
        <p className='text-muted-foreground max-w-sm text-lg'>
          From the story you tell to the people you bring together. Choose a focus, or let us connect the pieces.
        </p>
      </div>
      <div className='border-border bg-border grid gap-px overflow-hidden rounded-2xl border md:grid-cols-2'>
        {services.map((service, index) => (
          <Link
            key={service.id}
            href={service.href}
            className='group bg-background hover:bg-muted focus-visible:outline-primary p-7 transition-colors focus-visible:outline-2 focus-visible:outline-offset-[-4px] sm:p-10'
          >
            <div className='text-primary mb-10 flex items-center justify-between'>
              <span className='text-sm'>0{index + 1}</span>
              <IconArrowUpRight aria-hidden className='size-6' />
            </div>
            <h3 className='type-display text-3xl tracking-tight sm:text-4xl'>{service.name}</h3>
            <p className='mt-3 text-sm font-medium'>{service.descriptor}</p>
            <p className='text-muted-foreground mt-5 max-w-lg leading-relaxed'>{service.description}</p>
          </Link>
        ))}
      </div>
    </ContentLayout>
  </section>
)

export default ServicesBoard
