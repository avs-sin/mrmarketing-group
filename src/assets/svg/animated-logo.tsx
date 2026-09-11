'use client'

// React Imports
import { useId } from 'react'
import type { SVGAttributes } from 'react'

// Third-party Imports
import { motion } from 'motion/react'

// Util Imports
import { cn } from '@/lib/utils'

type AnimatedLogoProps = SVGAttributes<SVGElement> & {
  outerColor?: string
  fillColor?: string
}

const AnimatedLogo = ({
  className,
  outerColor = 'var(--primary)',
  fillColor = 'var(--primary-foreground)',
  ...props
}: AnimatedLogoProps) => {
  const id = useId()
  const maskId = `${id}-logo-silhouette-mask`

  return (
    <svg
      width='26'
      height='32'
      viewBox='0 0 26 32'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={cn('shrink-0', className)}
      {...props}
    >
      <defs>
        <mask id={maskId} maskUnits='userSpaceOnUse' x='0' y='0' width='26' height='32'>
          <circle cx='12.7273' cy='19.2727' r='12.7273' fill='white' />
          <path d='M0 0V19.3854C0 24.6955 3.58162 29 8 29V9.61461C8 4.30448 4.41838 0 0 0Z' fill='white' />
          <path
            d='M2 2.5C4 4 5 4.5 6.5 10.5C10 8 13.4819 8.91484 18 10.7556'
            stroke='white'
            strokeWidth='1.5'
            strokeLinecap='round'
          />
          <circle cx='12.8636' cy='18.8636' r='4.86365' fill='white' />
        </mask>
      </defs>
      <g mask={`url(#${maskId})`}>
        <circle cx='12.7273' cy='19.2727' r='12.7273' fill={outerColor} />
        <path d='M0 0V19.3854C0 24.6955 3.58162 29 8 29V9.61461C8 4.30448 4.41838 0 0 0Z' fill={outerColor} />
        <path
          d='M2 2.5C4 4 5 4.5 6.5 10.5C10 8 13.4819 8.91484 18 10.7556'
          stroke={fillColor}
          strokeWidth='1.5'
          strokeLinecap='round'
        />
        <circle cx='12.8636' cy='18.8636' r='4.86365' fill={fillColor} />
        <motion.rect
          y='0'
          height='32'
          fill='var(--background)'
          initial={{ x: 0, width: 26 }}
          whileInView={{ x: 26, width: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: 'easeInOut' }}
        />
      </g>
    </svg>
  )
}

export default AnimatedLogo
