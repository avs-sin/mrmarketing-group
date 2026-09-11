'use client'

// React Imports
import { useState } from 'react'

// Next Imports
import Link from 'next/link'

// Third-party Imports
import { IconArrowUpRight } from '@tabler/icons-react'

// Component Imports
import ContentLayout from '@/components/layout/content-layout'

// Util Imports
import { cn } from '@/lib/utils'

export type ServiceRow = {
  slug: string
  title: string
  description: string
  image: string
}

const ServicesBoard = ({ services }: { services: ServiceRow[] }) => {
  const [active, setActive] = useState(0)

  return (
    <section id='services' className='bg-card py-16 sm:py-24'>
      <ContentLayout>
        <div className='mb-12 max-w-2xl'>
          <h2 className='type-display text-5xl leading-none sm:text-7xl'>Full-service. Zero excuses.</h2>
          <p className='text-muted-foreground mt-4 text-lg'>
            Everything a venue needs to be seen, from the flyer to the paid campaign. Pick one or hand us the whole
            thing.
          </p>
        </div>

        <div className='grid gap-10 lg:grid-cols-[1fr_minmax(0,28rem)]'>
          <ul className='border-border border-t'>
            {services.map((s, i) => (
              <li key={s.slug} className='border-border border-b'>
                <Link
                  href={`/services/${s.slug}`}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className={cn(
                    'group focus-visible:ring-primary flex items-baseline justify-between gap-6 py-6 outline-none focus-visible:ring-2',
                    active === i ? 'text-foreground' : 'text-foreground/70'
                  )}
                >
                  <span className='flex min-w-0 flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-6'>
                    <span className='type-display text-3xl leading-none sm:text-5xl'>{s.title}</span>
                    <span className='text-muted-foreground max-w-md text-sm leading-snug sm:text-base'>
                      {s.description}
                    </span>
                  </span>
                  <IconArrowUpRight
                    className={cn(
                      'size-6 shrink-0 self-center transition-opacity',
                      active === i ? 'text-primary opacity-100' : 'opacity-40'
                    )}
                  />
                </Link>
              </li>
            ))}
          </ul>

          <div className='sticky top-28 hidden aspect-4/5 self-start overflow-hidden rounded-2xl lg:block'>
            {services.map((s, i) => (
              <img
                key={s.slug}
                src={s.image}
                alt=''
                className={cn(
                  'absolute inset-0 size-full object-cover transition-opacity duration-500 motion-reduce:transition-none',
                  active === i ? 'opacity-100' : 'opacity-0'
                )}
              />
            ))}
          </div>
        </div>
      </ContentLayout>
    </section>
  )
}

export default ServicesBoard
