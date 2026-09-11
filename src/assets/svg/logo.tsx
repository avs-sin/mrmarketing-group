// React Imports
import type { SVGAttributes } from 'react'

// Util Imports
import { cn } from '@/lib/utils'

type LogoProps = SVGAttributes<SVGElement> & {
  outerColor?: string
  fillColor?: string
}

const Logo = ({
  className,
  outerColor = 'var(--primary)',
  fillColor = 'var(--primary-foreground)',
  ...props
}: LogoProps) => {
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
      <circle cx='12.7273' cy='19.2727' r='12.7273' fill={outerColor} />
      <path d='M0 0V19.3854C0 24.6955 3.58162 29 8 29V9.61461C8 4.30448 4.41838 0 0 0Z' fill={outerColor} />
      <path
        d='M2 2.5C4 4 5 4.5 6.5 10.5C10 8 13.4819 8.91484 18 10.7556'
        stroke={fillColor}
        strokeWidth='1.5'
        strokeLinecap='round'
      />
      <circle cx='12.8636' cy='18.8636' r='4.86365' fill={fillColor} />
    </svg>
  )
}

export default Logo
