'use client'

import { useEffect, useState } from 'react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { IconArrowUpRight } from '@tabler/icons-react'

import { inquiryHref, pillarForServiceSlug } from '@/lib/funnel'
import { cn } from '@/lib/utils'

/** Mobile-only "Start a project" bar: appears after the first screen, hides near the footer and on /contact-us. */
const MobileCTA = () => {
  const pathname = usePathname()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const update = () => {
      const pastHero = window.scrollY > window.innerHeight * 0.8
      const nearEnd = window.scrollY + window.innerHeight > document.documentElement.scrollHeight - 480

      setVisible(pastHero && !nearEnd)
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)

    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [pathname])

  if (pathname.startsWith('/contact-us')) return null

  // On a service page, carry that offering into the form
  const serviceSlug = pathname.match(/^\/services\/([^/]+)/)?.[1]
  const href = inquiryHref(serviceSlug ? pillarForServiceSlug(serviceSlug) : null)

  return (
    <div
      aria-hidden={!visible}
      inert={!visible}
      className={cn(
        'fixed inset-x-0 bottom-0 z-40 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] transition-[translate,opacity] duration-200 ease-out md:hidden',
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
      )}
    >
      <Link
        href={href}
        data-track='cta_book_call'
        data-track-location='mobile_sticky'
        className='bg-primary text-primary-foreground flex h-12 items-center justify-center gap-2 rounded-full font-medium shadow-lg transition-[scale] duration-150 ease-out active:scale-[0.96]'
      >
        Start a project <IconArrowUpRight aria-hidden className='size-5' />
      </Link>
    </div>
  )
}

export default MobileCTA
