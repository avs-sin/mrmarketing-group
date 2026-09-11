'use client'

// React Imports
import { useRef } from 'react'

// Component Imports
import { AnimatedBeam } from '@/components/ui/animated-beam'

// SVG Imports
import Logo from '@/assets/svg/logo'
import ToggleSwitch from '@/assets/svg/toggle-switch'
import ContentCard from '@/assets/svg/content-card'

const Workflow = () => {
  // Vars
  const containerRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLSpanElement>(null)
  const span1Ref = useRef<HTMLSpanElement>(null)
  const span2Ref = useRef<HTMLSpanElement>(null)
  const span3Ref = useRef<HTMLSpanElement>(null)
  const span4Ref = useRef<HTMLSpanElement>(null)
  const span5Ref = useRef<HTMLSpanElement>(null)
  const span6Ref = useRef<HTMLSpanElement>(null)

  return (
    <div ref={containerRef} className='relative z-1 flex w-full max-w-87.5 flex-col justify-center gap-9.5'>
      <div className='mx-9.5 flex items-center justify-between gap-6'>
        <span ref={span1Ref} className='bg-card flex size-8 items-center justify-center rounded-full border'>
          <img src='/images/logos/logo-01.webp' alt='Figma logo' className='size-5' />
        </span>
        <span ref={span4Ref} className='bg-card flex size-8 items-center justify-center rounded-full border'>
          <ContentCard />
        </span>
      </div>
      <div className='flex items-center justify-between gap-6'>
        <span ref={span2Ref} className='bg-card flex size-8 items-center justify-center rounded-full border'>
          <ToggleSwitch />
        </span>
        {/* <span className='bg-muted rounded-full p-2.5'> */}
        <span
          ref={logoRef}
          className='border-primary/20 bg-muted flex size-14 items-center justify-center rounded-full border'
        >
          <Logo className='size-7' />
        </span>
        {/* </span> */}
        <span ref={span5Ref} className='bg-card flex size-8 items-center justify-center rounded-full border'>
          <img src='/images/logos/figma-logo.webp' alt='Figma logo' className='size-5' />
        </span>
      </div>
      <div className='mx-9.5 flex items-center justify-between gap-6'>
        <span ref={span3Ref} className='bg-card flex size-8 items-center justify-center rounded-full border'>
          <img src='/images/logos/logo-05.webp' alt='Figma logo' className='size-5' />
        </span>
        <span ref={span6Ref} className='bg-card flex size-8 items-center justify-center rounded-full border'>
          <img src='/images/logos/logo-02.webp' alt='Figma logo' className='size-5 dark:invert' />
        </span>
      </div>
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={span1Ref}
        toRef={logoRef}
        className='text-primary -z-1'
        duration={3}
        curvature={25}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={span2Ref}
        toRef={logoRef}
        className='text-primary -z-1'
        duration={3}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={span3Ref}
        toRef={logoRef}
        className='text-primary -z-1'
        duration={3}
        curvature={-25}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={span4Ref}
        toRef={logoRef}
        className='text-primary -z-1'
        duration={3}
        curvature={25}
        reverse
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={span5Ref}
        toRef={logoRef}
        className='text-primary -z-1'
        duration={3}
        reverse
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={span6Ref}
        toRef={logoRef}
        className='text-primary -z-1'
        duration={3}
        curvature={-25}
        reverse
      />
    </div>
  )
}

export default Workflow
