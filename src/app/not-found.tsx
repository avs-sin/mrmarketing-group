// Next Imports
import Link from 'next/link'

import { servicePillars } from '@/assets/data/service-pillars'
import { buttonVariants } from '@/components/ui/button'
import { inquiryHref } from '@/lib/funnel'
import { cn } from '@/lib/utils'

// A dead end is a lost lead: offer the main funnel routes instead of only "home"
export default function NotFound() {
  return (
    <div className='flex min-h-screen items-center justify-center px-6 py-16'>
      <div className='max-w-xl text-center'>
        <h1 className='mb-4 text-6xl font-bold'>404</h1>
        <h2 className='mb-4 text-2xl font-semibold'>Page Not Found</h2>
        <p className='text-muted-foreground mb-8 text-lg'>
          Sorry, we couldn&apos;t find the page you&apos;re looking for. Here&apos;s where most people head next.
        </p>
        <div className='flex flex-wrap items-center justify-center gap-3'>
          <Link
            href={inquiryHref()}
            data-track='cta_book_call'
            data-track-location='not_found'
            className={cn(buttonVariants({ size: 'lg' }), 'h-11 px-6 active:scale-[0.96]')}
          >
            Start a project
          </Link>
          <Link href='/projects' className={cn(buttonVariants({ size: 'lg', variant: 'secondary' }), 'h-11 px-6')}>
            See our work
          </Link>
          <Link href='/' className={cn(buttonVariants({ size: 'lg', variant: 'ghost' }), 'h-11 px-6')}>
            Go Home
          </Link>
        </div>
        <ul className='text-muted-foreground mt-10 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm'>
          {servicePillars.map(pillar => (
            <li key={pillar.id}>
              <Link href={pillar.href} className='hover:text-foreground underline underline-offset-4'>
                {pillar.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
