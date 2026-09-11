'use client'

// React Imports
import React, { useEffect, useRef, useState } from 'react'

// Third-party Imports
import { useMotionValueEvent, useScroll, useTransform, motion } from 'motion/react'

// Component Imports
import { SectionHeader } from '@/components/ui/section-header'

export interface TimelineEntry {
  id: string
  title: string
  content: string
}

const Process = ({ data }: { data: TimelineEntry[] }) => {
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
      <div className='relative mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 md:grid-cols-2 lg:px-8'>
        <div>
          <SectionHeader
            className='sticky top-28 items-start pt-2 text-start'
            badge='Process'
            title='Our Process'
            description='From strategy to execution, our process ensures we create customized marketing plans that drive results. We understand your goals, tailor our approach, and execute with precision to deliver measurable success.'
          />
        </div>
        <div ref={ref} className='relative'>
          {data.map((item, index) => {
            const isActive = index <= activeIndex

            return (
              <div key={index} data-timeline-item className={`flex items-start`}>
                {/* Dot and Line Section */}
                <div className='bg-card z-20 rounded-full p-2'>
                  <div className='bg-background relative flex size-14 flex-col items-center justify-center rounded-full border'>
                    <div
                      data-timeline-dot
                      className={`text-2xl font-semibold ${isActive ? '' : 'text-muted-foreground'}`}
                    >
                      {item.id}
                    </div>
                  </div>
                </div>
                {/* Content Section */}
                <div className={`w-full px-8 pt-2 md:flex md:flex-1 ${index === data.length - 1 ? 'mb-0' : 'mb-43.5'}`}>
                  <div className='space-y-2.5'>
                    <h3 className='text-2xl font-semibold'>{item.title}</h3>
                    <p className='text-muted-foreground text-base'>{item.content}</p>
                  </div>
                </div>
              </div>
            )
          })}
          <div
            style={{
              height: `${lineHeight}px`,
              top: `${firstItemOffset}px`
            }}
            className='bg-border absolute left-9 z-0 w-0.5 overflow-hidden'
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

export default Process
