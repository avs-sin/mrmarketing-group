'use client'

// React Imports
import { useEffect } from 'react'

// Third-party Imports
import { animate, motion, useMotionValue, useTransform } from 'motion/react'

// SVG Imports
import LeftLine from '@/assets/svg/hero-leftline'
import RightLine from '@/assets/svg/hero-rightline'

// Data Imports
import {
  HERO_ORBIT_CENTER,
  HERO_ORBIT_HEIGHT,
  HERO_ORBIT_VISIBLE_TOP,
  HERO_ORBIT_WIDTH,
  LEFT_LINE_WIDTH,
  heroOrbitPaths
} from '@/assets/data/hero-orbit-paths'

export type OrbitItem = {
  id: string
  image: string
  position: { x: number; y: number }
  duration?: number
  delay?: number
}

type OrbitConnectionsProps = {
  centerImage?: React.ReactNode
  items: OrbitItem[]
  width?: number
  height?: number
  itemSize?: number
  centerSize?: number
  className?: string
}

// Sample count baked into hero-orbit-paths.ts — more = smoother perceived motion along the curve
const NUM_SAMPLES = 42
const FADE_IN_END = 0.07
const FADE_OUT_START = 0.85

// How much a logo shrinks as it nears the center logo — tuned so far = 1,
// midway ≈ 0.8, very close ≈ 0.6.
const SCALE_FAR = 1
const SCALE_MID = 0.8
const SCALE_NEAR = 0.6

function buildTimes() {
  const times: number[] = [0, FADE_IN_END]

  for (let i = 1; i <= NUM_SAMPLES; i++) {
    times.push(FADE_IN_END + (1 - FADE_IN_END) * (i / NUM_SAMPLES))
  }

  return times
}

function buildOpacityFrames(times: number[]) {
  const opacity: number[] = [0, 1]

  for (let i = 2; i < times.length; i++) {
    const t = times[i]

    opacity.push(t >= FADE_OUT_START ? Math.max(0, 1 - (t - FADE_OUT_START) / (1 - FADE_OUT_START)) : 1)
  }

  return opacity
}

// Times/opacity only depend on the fade constants above, not on any one
// item's curve, so they're shared across every logo.
const TIMES = buildTimes()
const OPACITY_FRAMES = buildOpacityFrames(TIMES)

type OrbitLogoProps = {
  item: OrbitItem
  itemSize: number
}

const OrbitLogo = ({ item, itemSize }: OrbitLogoProps) => {
  const path = heroOrbitPaths[item.id]

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const opacity = useMotionValue(0)

  const startDistance = Math.hypot(HERO_ORBIT_CENTER.x - path.fromX, HERO_ORBIT_CENTER.y - path.fromY)

  // Live distance from the center logo, derived from the logo's current
  // animated position — this is what drives the dynamic scale below.
  const distance = useTransform([x, y], latest => {
    const [latestX, latestY] = latest as number[]

    return Math.hypot(HERO_ORBIT_CENTER.x - path.fromX - latestX, HERO_ORBIT_CENTER.y - path.fromY - latestY)
  })

  const scale = useTransform(distance, [0, startDistance * 0.5, startDistance], [SCALE_NEAR, SCALE_MID, SCALE_FAR])

  useEffect(() => {
    const transition = {
      duration: item.duration ?? 4,
      delay: item.delay ?? 0,
      repeat: Infinity,
      ease: 'linear' as const,
      times: TIMES
    }

    const controls = [
      animate(x, [0, ...path.dx], transition),
      animate(y, [0, ...path.dy], transition),
      animate(opacity, [0, ...OPACITY_FRAMES], transition)
    ]

    return () => controls.forEach(control => control.stop())
  }, [item.duration, item.delay, path, x, y, opacity])

  return (
    <motion.div
      style={{
        position: 'absolute',
        left: path.fromX - itemSize / 2,
        top: path.fromY - HERO_ORBIT_VISIBLE_TOP - itemSize / 2,
        width: itemSize,
        height: itemSize,
        zIndex: 5,
        x,
        y,
        opacity,
        scale
      }}
    >
      <div className='bg-background flex size-full items-center justify-center rounded-full border p-3 shadow-md'>
        <img src={item.image} alt='' width={itemSize} height={itemSize} className='size-full object-contain' />
      </div>
    </motion.div>
  )
}

const OrbitConnections = ({
  centerImage,
  items,
  width = HERO_ORBIT_WIDTH,
  height = HERO_ORBIT_HEIGHT,
  itemSize = 44,
  centerSize = 100,
  className
}: OrbitConnectionsProps) => {
  return (
    <div className={className} style={{ position: 'relative', width, height, margin: '0 auto' }}>
      {/* Real SVG line art — logos are synced to travel exactly along these curves */}
      <div
        style={{ position: 'absolute', left: 0, top: -HERO_ORBIT_VISIBLE_TOP, pointerEvents: 'none' }}
        aria-hidden='true'
      >
        <LeftLine />
      </div>
      <div
        style={{ position: 'absolute', left: LEFT_LINE_WIDTH, top: -HERO_ORBIT_VISIBLE_TOP, pointerEvents: 'none' }}
        aria-hidden='true'
      >
        <RightLine />
      </div>

      {/* Center image slot */}
      {centerImage && (
        <div
          style={{
            position: 'absolute',
            left: HERO_ORBIT_CENTER.x - centerSize / 2,
            top: HERO_ORBIT_CENTER.y - HERO_ORBIT_VISIBLE_TOP - centerSize / 2,
            width: centerSize,
            height: centerSize,
            zIndex: 10
          }}
        >
          {centerImage}
        </div>
      )}

      {/* Logos travel along the real SVG curves, scaling down as they near the center */}
      {items.map(item => (
        <OrbitLogo key={item.id} item={item} itemSize={itemSize} />
      ))}
    </div>
  )
}

export default OrbitConnections
