// React Imports
import type { SVGProps } from 'react'

const ToggleSwitch = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='22' height='11' viewBox='0 0 22 11' fill='none' {...props}>
      <g filter='url(#filter0_i_38136_15426)'>
        <rect y='0.400024' width='21' height='10' rx='5' fill='#49A186' />
      </g>
      <g filter='url(#filter1_d_38136_15426)'>
        <circle cx='16' cy='5.40002' r='4' fill='#DCE3F1' />
      </g>
      <line x1='5.5' y1='3.40002' x2='5.5' y2='7.40002' stroke='#DEE5F4' />
      <defs>
        <filter
          id='filter0_i_38136_15426'
          x='0'
          y='0.400024'
          width='21'
          height='10'
          filterUnits='userSpaceOnUse'
          colorInterpolationFilters='sRGB'
        >
          <feFlood floodOpacity='0' result='BackgroundImageFix' />
          <feBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape' />
          <feColorMatrix
            in='SourceAlpha'
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            result='hardAlpha'
          />
          <feMorphology radius='1' operator='erode' in='SourceAlpha' result='effect1_innerShadow_38136_15426' />
          <feOffset />
          <feGaussianBlur stdDeviation='0.5' />
          <feComposite in2='hardAlpha' operator='arithmetic' k2='-1' k3='1' />
          <feColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.03 0' />
          <feBlend mode='normal' in2='shape' result='effect1_innerShadow_38136_15426' />
        </filter>
        <filter
          id='filter1_d_38136_15426'
          x='10.6'
          y='2.44379e-05'
          width='10.8'
          height='10.8'
          filterUnits='userSpaceOnUse'
          colorInterpolationFilters='sRGB'
        >
          <feFlood floodOpacity='0' result='BackgroundImageFix' />
          <feColorMatrix
            in='SourceAlpha'
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            result='hardAlpha'
          />
          <feOffset />
          <feGaussianBlur stdDeviation='0.7' />
          <feComposite in2='hardAlpha' operator='out' />
          <feColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0' />
          <feBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_38136_15426' />
          <feBlend mode='normal' in='SourceGraphic' in2='effect1_dropShadow_38136_15426' result='shape' />
        </filter>
      </defs>
    </svg>
  )
}

export default ToggleSwitch
