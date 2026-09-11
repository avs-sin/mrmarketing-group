'use client'

// React Imports
import { useRef } from 'react'

// Third-party Imports
import { IconBrandFigma, IconCode } from '@tabler/icons-react'

// Component Imports
import { AnimatedBeam } from '@/components/ui/animated-beam'

// SVG Imports
import Logo from '@/assets/svg/logo'

const WebDevelopment = () => {
  // Vars
  const containerRef = useRef<HTMLDivElement>(null)
  const span1Ref = useRef<HTMLSpanElement>(null)
  const span2Ref = useRef<HTMLSpanElement>(null)
  const span3Ref = useRef<HTMLSpanElement>(null)
  const span4Ref = useRef<HTMLSpanElement>(null)
  const span5Ref = useRef<HTMLSpanElement>(null)
  const span6Ref = useRef<HTMLSpanElement>(null)
  const span7Ref = useRef<HTMLSpanElement>(null)
  const span10Ref = useRef<HTMLSpanElement>(null)

  return (
    <div ref={containerRef} className='relative z-10 flex shrink-0 flex-col items-center gap-20 lg:-top-5'>
      <span ref={span1Ref} className='bg-muted border-primary/20 flex items-center gap-1 rounded-full border p-2.5'>
        <span className='bg-muted flex items-center justify-center rounded-full'>
          <Logo className='size-7' />
        </span>
      </span>
      <div className='flex items-center gap-54'>
        <span
          ref={span7Ref}
          className='bg-muted border-primary/20 flex size-11 items-center justify-center overflow-hidden rounded-full border'
        >
          <IconBrandFigma className='text-foreground size-5' />
        </span>

        <span
          ref={span10Ref}
          className='bg-muted border-primary/20 flex size-11 items-center justify-center overflow-hidden rounded-full border'
        >
          <IconCode className='text-foreground size-5' />
        </span>
      </div>
      <span ref={span2Ref} className='absolute top-1/2 left-1/2 size-0.5 -translate-x-px translate-y-1.25' />
      <span ref={span3Ref} className='absolute top-1/2 left-1/2 size-0.5 -translate-x-32.5 translate-y-1.25' />
      <span ref={span4Ref} className='absolute top-1/2 left-1/2 size-0.5 -translate-x-11 translate-y-1.25' />
      <span ref={span5Ref} className='absolute top-1/2 right-1/2 size-0.5 translate-x-11 translate-y-1.25' />
      <span ref={span6Ref} className='absolute top-1/2 right-1/2 size-0.5 translate-x-32.5 translate-y-1.25' />

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={span1Ref}
        toRef={span2Ref}
        className='text-primary -z-1'
        duration={4}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={span3Ref}
        toRef={span2Ref}
        className='text-primary -z-1'
        duration={4}
        reverse
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={span2Ref}
        toRef={span6Ref}
        className='text-primary -z-1'
        duration={4}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={span3Ref}
        toRef={span7Ref}
        className='text-primary -z-1'
        duration={4}
        reverse
      />

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={span6Ref}
        toRef={span10Ref}
        className='text-primary -z-1'
        duration={4}
      />
    </div>
  )
}

export default WebDevelopment
