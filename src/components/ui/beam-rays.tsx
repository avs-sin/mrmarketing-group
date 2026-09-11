'use client'

import { useId, useState } from 'react'

import { motion } from 'motion/react'

import { cn } from '@/lib/utils'

export type BeamRaysProps = {
  className?: string
  beamCount?: number
  beamColor?: string
  beamRaysColor?: string
  strokeWidth?: number
  beamRayStroke?: number
  opacity?: number
  duration?: number
  reverseAlternate?: boolean
}

const VIEWBOX_WIDTH = 1512
const VIEWBOX_HEIGHT = 430
const EDGE_BLEED = 250 // how far each arc extends past the left/right edges (then gets clipped by overflow-hidden)
const TOP_INSET = 30 // outermost beam's peak distance from the top
const GLOW_SPAN = 10 // width (in % of the path) of the traveling highlight
const DEAD_ZONE_TIME_FRACTION = 0.0 // share of `duration` spent parked off-path before/after the visible sweep

const CURVE_SCALE = 0.4
const BEAM_SPACING = 40 // vertical gap between each beam's peak, independent of its curvature

const BEAM_DIAMETERS = [
  { width: 1280, height: 493 * CURVE_SCALE },
  { width: 1112, height: 429 * CURVE_SCALE },
  { width: 948, height: 365 * CURVE_SCALE },
  { width: 780, height: 301 * CURVE_SCALE }
]

// fade actually completes well before `start`, instead of trailing off gradually the whole way).
const EDGE_FADE_CONFIG = [
  { start: 27, ramp: 50 }, // beam 1 — unchanged, original gradual fade
  { start: 29, ramp: 17 }, // beam 2 — fades out before the heading text begins
  { start: 34, ramp: 20 }, // beam 3 — only visible near the content above
  { start: 40, ramp: 30 } // beam 4 — narrowest, barely visible past center
]

const getBeamPath = (index: number) => {
  const { width, height } = BEAM_DIAMETERS[index % BEAM_DIAMETERS.length]
  const peakY = TOP_INSET + index * BEAM_SPACING
  const edgeY = peakY + height
  const midX = VIEWBOX_WIDTH / 2
  const halfWidth = width / 2

  // A quadratic curve's rendered apex sits halfway between the control point and the
  // edges, not at the control point itself — so the control point must overshoot the
  // true apex (peakY) by that same gap to land the visible peak there.
  const controlY = peakY - height

  return `M ${midX - halfWidth - EDGE_BLEED} ${edgeY} Q ${midX} ${controlY} ${midX + halfWidth + EDGE_BLEED} ${edgeY}`
}

const getGradientRange = (isReversed: boolean) => {
  const x2Keyframes = isReversed ? [100 + GLOW_SPAN, 100, 0, -GLOW_SPAN] : [-GLOW_SPAN, 0, 100, 100 + GLOW_SPAN]

  const gap = isReversed ? -GLOW_SPAN : GLOW_SPAN

  return {
    x1: x2Keyframes.map(value => `${value + gap}%`),
    x2: x2Keyframes.map(value => `${value}%`),
    times: [0, DEAD_ZONE_TIME_FRACTION, 1 - DEAD_ZONE_TIME_FRACTION, 1]
  }
}

const BeamRays = ({
  className,
  beamCount = 4,
  beamColor = 'currentColor',
  beamRaysColor = beamColor,
  strokeWidth = 1.5,
  beamRayStroke = strokeWidth + 0.5,
  opacity = 0.18,
  duration = 3,
  reverseAlternate = true
}: BeamRaysProps) => {
  const idPrefix = useId()
  const edgeFadeId = `${idPrefix}-edge-fade`
  const glowFilterId = `${idPrefix}-glow-filter`

  // Only one beam's glow travels at a time — it starts, completes one full pass, then
  // hands off to the next beam (wrapping back to the first after the last).
  const [activeIndex, setActiveIndex] = useState(0)
  const currentIndex = activeIndex % beamCount

  // Slightly different pass durations per beam for a natural, non-mechanical feel.
  const durations = Array.from({ length: beamCount }, (_, index) => duration * (1 + index * 0.08))

  const bottomFadeMask = 'linear-gradient(to bottom, black 0%, black 45%, transparent 75%)'
  const sideFadeMask = 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)'

  return (
    <div
      className={cn('pointer-events-none w-full overflow-hidden', className)}
      style={{
        maskImage: sideFadeMask,
        WebkitMaskImage: sideFadeMask
      }}
    >
      <div
        className='w-full'
        style={{
          aspectRatio: `${VIEWBOX_WIDTH} / ${VIEWBOX_HEIGHT}`,
          maskImage: bottomFadeMask,
          WebkitMaskImage: bottomFadeMask
        }}
      >
        <svg
          className='size-full'
          viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
          preserveAspectRatio='xMidYMin slice'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <defs>
            {EDGE_FADE_CONFIG.map(({ start, ramp }, index) => (
              <linearGradient key={start} id={`${edgeFadeId}-${index}`} x1='0' x2='1' y1='0' y2='0'>
                <stop offset='0%' stopColor={beamRaysColor} stopOpacity='0' />
                <stop offset={`${start - ramp}%`} stopColor={beamRaysColor} stopOpacity='0' />
                <stop offset={`${start}%`} stopColor={beamRaysColor} stopOpacity='1' />
                <stop offset={`${100 - start}%`} stopColor={beamRaysColor} stopOpacity='1' />
                <stop offset={`${100 - start + ramp}%`} stopColor={beamRaysColor} stopOpacity='0' />
                <stop offset='100%' stopColor={beamRaysColor} stopOpacity='0' />
              </linearGradient>
            ))}

            {EDGE_FADE_CONFIG.map((_, index) => (
              <mask key={index} id={`${edgeFadeId}-mask-${index}`} maskContentUnits='objectBoundingBox'>
                <rect x='0' y='0' width='1' height='1' fill={`url(#${edgeFadeId}-${index})`} />
              </mask>
            ))}

            <filter id={glowFilterId} x='-75%' y='-75%' width='250%' height='250%'>
              <feGaussianBlur in='SourceGraphic' stdDeviation={beamRayStroke} result='blur' />
              <feMerge>
                <feMergeNode in='blur' />
                <feMergeNode in='SourceGraphic' />
              </feMerge>
            </filter>
          </defs>

          {Array.from({ length: beamCount }, (_, index) => {
            const id = `${idPrefix}-beam-${index}`
            const isReversed = reverseAlternate && index % 2 === 1
            const d = getBeamPath(index)
            const isActive = index === currentIndex
            const edgeFadeIndex = index % EDGE_FADE_CONFIG.length

            return (
              <g key={id}>
                <path
                  d={d}
                  stroke={`url(#${edgeFadeId}-${edgeFadeIndex})`}
                  strokeWidth={strokeWidth}
                  strokeOpacity={opacity}
                  strokeLinecap='round'
                />
                {isActive && (
                  <path
                    d={d}
                    stroke={`url(#${id})`}
                    strokeWidth={beamRayStroke}
                    strokeLinecap='round'
                    filter={`url(#${glowFilterId})`}
                    mask={`url(#${edgeFadeId}-mask-${edgeFadeIndex})`}
                  />
                )}
                {isActive && (
                  <defs>
                    <ActiveGradient
                      id={id}
                      beamColor={beamColor}
                      duration={durations[index]}
                      isReversed={isReversed}
                      onDone={() => setActiveIndex(current => current + 1)}
                    />
                  </defs>
                )}
              </g>
            )
          })}
        </svg>
      </div>
    </div>
  )
}

type ActiveGradientProps = {
  id: string
  beamColor: string
  duration: number
  isReversed: boolean
  onDone: () => void
}

const ActiveGradient = ({ id, beamColor, duration, isReversed, onDone }: ActiveGradientProps) => {
  const range = getGradientRange(isReversed)

  return (
    <motion.linearGradient
      id={id}
      gradientUnits='userSpaceOnUse'
      initial={{ x1: range.x1[0], x2: range.x2[0], y1: '0%', y2: '0%' }}
      animate={{ x1: range.x1, x2: range.x2, y1: '0%', y2: '0%' }}
      transition={{ duration, ease: 'linear', times: range.times }}
      onAnimationComplete={onDone}
    >
      <stop offset='0%' stopColor={beamColor} stopOpacity='0' />
      <stop offset='35%' stopColor={beamColor} stopOpacity='1' />
      <stop offset='55%' stopColor={beamColor} stopOpacity='1' />
      <stop offset='75%' stopColor={beamColor} stopOpacity='1' />
      <stop offset='100%' stopColor={beamColor} stopOpacity='0' />
    </motion.linearGradient>
  )
}

export default BeamRays
