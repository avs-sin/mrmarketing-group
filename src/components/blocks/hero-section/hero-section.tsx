'use client'

// React Imports
import { useEffect, useRef, useState } from 'react'

// Next Imports
import Link from 'next/link'

// Third-party Imports
import { IconArrowRight, IconPhoneCall } from '@tabler/icons-react'
import { motion } from 'motion/react'

// Component Imports
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import StatisticsSalesOverviewCard from '@/components/blocks/about-component/statistics-sales-overview-card'
import StatisticsActivityCard from '@/components/blocks/about-component/statistics-activity-card'
import OrbitConnections from './orbit-connections'
import type { OrbitItem } from './orbit-connections'
import TextFlip from './text-flip'

// Data Imports
import { HERO_ORBIT_HEIGHT, HERO_ORBIT_WIDTH } from '@/assets/data/hero-orbit-paths'

export type AvatarItem = {
  src: string
  name: string
  fallback: string
}

type HeroSectionProps = {
  orbitItems: OrbitItem[]
}

// Below this, the orbit logos/lines shrink past legibility — clamp scale-down
// here and let the wrapper crop the outer edges instead.
const ORBIT_MIN_SCALE = 0.6

const BrandlyLogo = () => <img src='/images/mr-mark-white.png' alt='MR Marketing Group' className='size-14' />

const CenterLogo = () => (
  <div className='bg-primary flex size-full items-center justify-center rounded-2xl shadow-lg'>
    <BrandlyLogo />
  </div>
)

const HeroSection = ({ orbitItems }: HeroSectionProps) => {
  // Orbit lines + logo paths are baked in fixed pixel coordinates (see
  // hero-orbit-paths.ts), so they can't reflow on their own — scale the
  // whole thing down to fit narrower viewports instead of hiding it.
  const orbitContainerRef = useRef<HTMLDivElement>(null)
  const [orbitScale, setOrbitScale] = useState(0)

  useEffect(() => {
    if (!orbitContainerRef.current) return

    const container = orbitContainerRef.current

    const updateScale = () => {
      setOrbitScale(Math.min(1, Math.max(ORBIT_MIN_SCALE, container.clientWidth / HERO_ORBIT_WIDTH)))
    }

    updateScale()

    const observer = new ResizeObserver(updateScale)

    observer.observe(container)
    window.addEventListener('resize', updateScale)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', updateScale)
    }
  }, [])

  return (
    <section className='overflow-x-hidden pt-30 pb-8 sm:pt-38 sm:pb-16 lg:pt-46 lg:pb-24'>
      {/* Hero text + CTA — constrained to max-w-7xl */}
      <div className='relative z-1 mx-auto flex max-w-7xl flex-col items-center gap-7 px-4 text-center sm:px-6 lg:px-8'>
        <div className='bg-muted flex items-center gap-2.5 rounded-full border p-2 text-sm'>
          <Badge>Las Vegas</Badge>
          <span className='text-muted-foreground'>Full-Service Marketing Agency</span>
        </div>

        <h1 className='text-3xl leading-[1.29167] font-bold text-balance sm:text-4xl lg:text-5xl'>
          Beyond Content.
          <br />
          Built for{' '}
          <span>
            <TextFlip />
          </span>
        </h1>

        <p className='text-muted-foreground mx-auto max-w-xl text-base'>
          We build brands, events, and digital experiences for Las Vegas&apos;s hospitality, nightlife, and restaurant
          industries.
        </p>

        <p className='text-muted-foreground text-sm'>Trusted by Las Vegas restaurants, lounges, hotels & events</p>

        <div className='space-x-4'>
          <Button size='lg' render={<Link href='/contact-us' />} nativeButton={false}>
            Start a Project <IconPhoneCall data-icon='inline-end' />
          </Button>
          <Button
            size='lg'
            variant='secondary'
            className='group'
            render={<Link href='/projects' />}
            nativeButton={false}
          >
            Our Work
            <IconArrowRight
              data-icon='inline-end'
              className='transition-[translate] duration-150 ease-out group-hover:translate-x-0.5'
            />
          </Button>
        </div>

        {/* Floating stat cards */}
        <motion.div
          animate={{ y: [0, -16, 0], opacity: 1 }}
          transition={{
            y: { duration: 2.1, repeat: Infinity, ease: 'easeOut', delay: 1 },
            opacity: { duration: 0.5, delay: 1 }
          }}
          className='absolute top-35 -left-24 scale-35 rotate-[-19deg] xl:top-20 xl:-left-30 xl:scale-50'
        >
          <StatisticsActivityCard className='max-lg:hidden' />
        </motion.div>

        <motion.div
          animate={{ y: [0, -16, 0], opacity: 1 }}
          transition={{
            y: { duration: 2.1, repeat: Infinity, ease: 'easeOut', delay: 1 },
            opacity: { duration: 0.5, delay: 1 }
          }}
          className='absolute top-30 right-4 scale-35 rotate-15 xl:right-0 xl:scale-50'
        >
          <StatisticsSalesOverviewCard className='max-lg:hidden' />
        </motion.div>
      </div>

      {/* Orbit connections — outside max-w-7xl so beams can stretch */}
      <div
        ref={orbitContainerRef}
        className='relative -mt-28 w-full overflow-hidden'
        style={{ height: HERO_ORBIT_HEIGHT * orbitScale }}
      >
        <div
          className='absolute top-0 left-1/2'
          style={{
            width: HERO_ORBIT_WIDTH,
            transform: `translateX(-50%) scale(${orbitScale})`,
            transformOrigin: 'top center'
          }}
        >
          <OrbitConnections items={orbitItems} centerImage={<CenterLogo />} itemSize={44} centerSize={100} />

          {/* Fade the animated lines out before they hit the section edges */}
          <div className='pointer-events-none absolute -inset-x-10 -inset-y-15 mx-auto max-w-425'>
            <div className='from-background via-background/80 pointer-events-none absolute inset-y-0 left-0 z-6 w-24 bg-linear-to-r to-transparent sm:w-32 lg:w-48' />
            <div className='from-background via-background/80 pointer-events-none absolute inset-y-0 right-0 z-6 w-24 bg-linear-to-l to-transparent sm:w-32 lg:w-48' />
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
