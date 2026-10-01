import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

/** One typographic treatment for every homepage section label. */
export const Eyebrow = ({ children, className }: { children: ReactNode; className?: string }) => (
  <p
    className={cn(
      'text-primary mb-5 flex items-center gap-3 text-xs font-medium tracking-[0.14em] uppercase sm:text-sm sm:tracking-[0.2em]',
      className
    )}
  >
    <span aria-hidden className='bg-primary h-px w-6' />
    {children}
  </p>
)
