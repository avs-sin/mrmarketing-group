'use client'

// React Imports
import React, { useEffect, useRef, useState } from 'react'

// Third-party Imports
import { useMotionValueEvent, useScroll, useTransform, motion } from 'motion/react'

// Component Imports
import { Badge } from '@/components/ui/badge'
import { SectionHeader } from '@/components/ui/section-header'

// Util Imports
import { cn } from '@/lib/utils'

export interface TimelineEntry {
  title: string
  icon: React.ReactNode
  content: React.ReactNode
}

const JourneyTimeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(0)
  const [activeIndex, setActiveIndex] = useState(0)
  const [firstItemOffset, setFirstItemOffset] = useState(0)
  const [lineHeight, setLineHeight] = useState(0)

  useEffect(() => {
    if (!ref.current) return

    const calculate = () => {
      const container = ref.current!
      const rect = container.getBoundingClientRect()
      const dots = container.querySelectorAll('[data-timeline-dot]')

      if (!dots.length) return

      const firstRect = (dots[0] as HTMLElement).getBoundingClientRect()
      const lastRect = (dots[dots.length - 1] as HTMLElement).getBoundingClientRect()

      const firstOffset = firstRect.top + firstRect.height / 2 - rect.top
      const lastOffset = lastRect.top + lastRect.height / 2 - rect.top

      setFirstItemOffset(firstOffset)
      setLineHeight(lastOffset - firstOffset)
      setHeight(rect.height)
    }

    calculate()

    const observer = new ResizeObserver(calculate)

    observer.observe(ref.current)

    window.addEventListener('resize', calculate)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', calculate)
    }
  }, [ref])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0%', 'end 100%']
  })

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height])
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1])

  useMotionValueEvent(scrollYProgress, 'change', latest => {
    const totalItems = data.length
    const newIndex = Math.min(Math.floor(latest * totalItems), totalItems - 1)

    setActiveIndex(newIndex)
  })

  return (
    <div className='bg-card py-8 sm:py-16 lg:py-24' ref={containerRef}>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='mb-12 space-y-4 text-center md:mb-16 lg:mb-24'>
          <SectionHeader
            badge='Achievements'
            title='Our Recent Achievements'
            description='We take pride in our growth, consistently delivering innovative solutions and earning recognition
for excellence in every project.'
          />
        </div>
        <div ref={ref} className='relative mx-auto max-w-7xl space-y-4'>
          {data.map((item, index) => {
            const isEven = index % 2 === 0
            const isActive = index <= activeIndex

            return (
              <div
                key={index}
                data-timeline-item
                className={`flex items-start ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                {/* Title Section */}
                <div
                  className={`text-muted-foreground hidden w-full md:flex md:flex-1 md:items-start ${isEven ? 'md:justify-end' : 'md:justify-start'}`}
                >
                  {item.title}
                </div>
                {/* Dot and Line Section */}
                <div className='relative flex flex-col items-center pr-4 md:px-4'>
                  <div data-timeline-dot className='sticky top-40 z-10 flex items-center justify-center'>
                    {item.icon}
                  </div>
                </div>
                {/* Content Section */}
                <div className={`w-full md:flex md:flex-1 ${isEven ? 'md:justify-start' : 'md:justify-end'}`}>
                  <Badge
                    className={cn(
                      'mb-4 block transform rounded-sm text-left font-medium transition-colors duration-300 md:hidden',
                      isActive ? 'bg-primary text-primary-foreground' : 'bg-primary/10 text-primary'
                    )}
                  >
                    {item.title}
                  </Badge>
                  {item.content}
                </div>
              </div>
            )
          })}
          <div
            style={{
              height: `${lineHeight}px`,
              top: `${firstItemOffset}px`
            }}
            className='bg-border absolute left-5 z-0 w-0.5 overflow-hidden md:left-1/2 md:-translate-x-1/2'
          >
            <motion.div
              style={{
                height: heightTransform,
                opacity: opacityTransform
              }}
              className='bg-primary absolute inset-x-0 top-0 w-0.5 rounded-full'
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default JourneyTimeline
