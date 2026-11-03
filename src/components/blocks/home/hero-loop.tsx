'use client'

import { useEffect, useRef } from 'react'

import { cn } from '@/lib/utils'

/**
 * Silent, looping preview cut from a client film. It is decoration only: the full film with sound
 * plays in the work section. The source is attached after hydration, so the server HTML carries only
 * the poster. Visitors who prefer reduced motion or ask to save data keep the poster and download nothing.
 */
export const HeroLoop = ({ src, poster, className }: { src: string; poster: string; className?: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current

    if (!video) return

    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData

    const sync = () => {
      if (motion.matches || saveData) {
        video.pause()

        return
      }

      if (!video.getAttribute('src')) video.src = src
      void video.play().catch(() => {
        /* Autoplay can be refused (e.g. low-power mode); the poster stays visible. */
      })
    }

    sync()
    motion.addEventListener('change', sync)

    return () => motion.removeEventListener('change', sync)
  }, [src])

  return (
    <video
      ref={videoRef}
      poster={poster}
      muted
      loop
      playsInline
      preload='none'
      aria-hidden
      tabIndex={-1}
      className={cn('size-full object-cover', className)}
    />
  )
}
