// React Imports
import type { ReactNode } from 'react'

// Util Imports
import { cn } from '@/lib/utils'

/**
 * The single horizontal-width authority for the app shell: centered, max-width content.
 *
 * Owns `mx-auto` + horizontal padding so the header, footer, and main content all
 * line up. Wrap it around the inner content of each (border/background stays on the
 * full-width outer element). Vertical padding is left to the consumer via `className`.
 */
const ContentLayout = ({ children, className }: { children: ReactNode; className?: string }) => {
  return <div className={cn('mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8', className)}>{children}</div>
}

export default ContentLayout
