import Link from 'next/link'
import { IconArrowUpRight, IconCircleCheck } from '@tabler/icons-react'

import ContentLayout from '@/components/layout/content-layout'
import { Eyebrow } from '@/components/blocks/home/eyebrow'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type ServiceFitProps = {
  name: string
  bestFor?: string[]
  askAbout?: string[]
  scopeNote?: string
  contactHref: string
  location: string
}

/** Buyer guidance: who the service suits, and what to put in the first email so Maria can reply usefully. */
const ServiceFit = ({ name, bestFor = [], askAbout = [], scopeNote, contactHref, location }: ServiceFitProps) => {
  if (!bestFor.length && !askAbout.length) return null

  return (
    <section className='py-16 sm:py-24'>
      <ContentLayout className='grid gap-6 md:grid-cols-2 [&>*]:min-w-0'>
        {bestFor.length > 0 && (
          <div className='bg-card shadow-surface rounded-2xl p-6 sm:p-8'>
            <Eyebrow>Who it suits</Eyebrow>
            <h2 className='type-display text-3xl tracking-tight text-balance sm:text-4xl'>A good fit for</h2>
            <ul className='mt-6 space-y-4'>
              {bestFor.map(item => (
                <li key={item} className='flex gap-3 leading-relaxed'>
                  <IconCircleCheck aria-hidden className='text-primary mt-0.5 size-5 shrink-0' />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            {scopeNote && (
              <p className='text-muted-foreground border-border mt-6 border-t pt-5 text-sm leading-relaxed'>
                {scopeNote}
              </p>
            )}
          </div>
        )}
        {askAbout.length > 0 && (
          <div className='bg-card shadow-surface flex flex-col rounded-2xl p-6 sm:p-8'>
            <Eyebrow>Before you email</Eyebrow>
            <h2 className='type-display text-3xl tracking-tight text-balance sm:text-4xl'>Helpful to mention</h2>
            <ul className='text-muted-foreground mt-6 list-disc space-y-3 ps-5 leading-relaxed'>
              {askAbout.map(item => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className='text-muted-foreground mt-6 text-sm'>
              Don’t have every answer yet? That’s fine. Scope, timing, and pricing are discussed for each project.
            </p>
            <div className='mt-auto pt-6'>
              <Link
                href={contactHref}
                data-track='cta_book_call'
                data-track-location={location}
                className={cn(
                  buttonVariants({ size: 'lg' }),
                  'h-auto min-h-11 max-w-full py-2.5 ps-5 pe-4.5 text-base whitespace-normal active:scale-[0.96]'
                )}
              >
                Email Maria about {name} <IconArrowUpRight aria-hidden className='size-5' />
              </Link>
            </div>
          </div>
        )}
      </ContentLayout>
    </section>
  )
}

export default ServiceFit
