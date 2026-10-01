import Link from 'next/link'
import { IconArrowRight, IconArrowUpRight } from '@tabler/icons-react'

import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type Target = { label: string; href: string }

/** Inline handoff to the next funnel step: a primary "start" link plus an optional onward page. */
const Handoff = ({
  primary,
  secondary,
  location,
  lead,
  className
}: {
  primary: Target
  secondary?: Target
  location: string
  lead?: string
  className?: string
}) => (
  <div className={cn('flex flex-col gap-4', className)}>
    {lead && <p className='text-lg font-medium text-balance'>{lead}</p>}
    <div className='flex flex-wrap items-center gap-x-6 gap-y-3'>
      {/* Styled as a button but kept a link, so it is announced as navigation */}
      <Link
        href={primary.href}
        data-track='cta_book_call'
        data-track-location={location}
        className={cn(buttonVariants({ size: 'lg' }), 'h-11 ps-5 pe-4.5 text-base active:scale-[0.96]')}
      >
        {primary.label} <IconArrowUpRight aria-hidden className='size-5' />
      </Link>
      {secondary && (
        <Link
          href={secondary.href}
          data-track='cta_next_page'
          data-track-location={`${location}_secondary`}
          className='group hover:text-primary focus-visible:outline-primary inline-flex items-center gap-1.5 rounded-md py-2 font-medium underline underline-offset-8 transition-colors duration-150 focus-visible:outline-2'
        >
          {secondary.label}
          <IconArrowRight
            aria-hidden
            className='size-4 transition-[translate] duration-150 ease-out group-hover:translate-x-0.5'
          />
        </Link>
      )}
    </div>
  </div>
)

export default Handoff
