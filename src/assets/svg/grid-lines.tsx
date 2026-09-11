// React Imports
import type { SVGProps } from 'react'

const GridLines = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg width='586' height='293' viewBox='0 0 586 293' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <g clipPath='url(#clip0_44364_15802)'>
        <rect width='586' height='293' fill='var(--card)' />
        <line x1='586' y1='154.5' x2='-2.61068e-05' y2='154.5' stroke='var(--border)' />
        <line x1='586' y1='68.5' x2='-2.61068e-05' y2='68.5' stroke='var(--border)' />
        <line x1='586' y1='217.5' x2='-2.61068e-05' y2='217.5' stroke='var(--border)' />
        <line x1='381.5' y1='293' x2='381.5' y2='-1.3077e-05' stroke='var(--border)' />
        <line x1='202.5' y1='293' x2='202.5' y2='-1.3077e-05' stroke='var(--border)' />
      </g>
      <defs>
        <clipPath id='clip0_44364_15802'>
          <rect width='586' height='293' fill='white' />
        </clipPath>
      </defs>
    </svg>
  )
}

export default GridLines
