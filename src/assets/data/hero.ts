// Component Imports
import type { AvatarItem } from '@/components/blocks/hero-section/hero-section'
import type { OrbitItem } from '@/components/blocks/hero-section/orbit-connections'

export const avatars: AvatarItem[] = [
  {
    src: '/images/avatars/avatar-04.webp',
    name: "Chef's Roma Kitchen",
    fallback: 'CR'
  },
  {
    src: '/images/avatars/avatar-03.webp',
    name: 'Tuscan Cove Bar + Patio',
    fallback: 'TC'
  },
  {
    src: '/images/avatars/avatar-02.webp',
    name: 'Saffron Lounge',
    fallback: 'SL'
  },
  {
    src: '/images/avatars/avatar-01.webp',
    name: 'MADE Events',
    fallback: 'ME'
  }
]

/*
 * All logos on a side share one duration so their relative phase never
 * drifts, and delays are set to the offsets (simulated/optimized against the
 * actual curve data) that keep every pair of logos on that side as far
 * apart as possible throughout the whole cycle, so none ever visually
 * collide. The same offsets are reused on the right side (mirrored curves).
 */
export const orbitItems: OrbitItem[] = [
  // ── Left side ──────────────────────────────────────────────────────
  {
    id: 'next',
    image: '/images/platforms/tiktok.svg',
    position: { x: -580, y: -140 },
    duration: 9.6,
    delay: 8.39
  },
  {
    id: 'figma',
    image: '/images/platforms/instagram.svg',
    position: { x: -580, y: -47 },
    duration: 9.6,
    delay: 6.77
  },
  {
    id: 'react',
    image: '/images/platforms/facebook.svg',
    position: { x: -580, y: 47 },
    duration: 9.6,
    delay: 3.47
  },
  {
    id: 'github',
    image: '/images/platforms/youtube.svg',
    position: { x: -580, y: 140 },
    duration: 9.6,
    delay: 1.66
  },
  {
    id: 'icon1',
    image: '/images/platforms/spotify.svg',
    position: { x: -580, y: -301.8 },
    duration: 9.6,
    delay: 0
  },
  {
    id: 'icon2',
    image: '/images/platforms/meta.svg',
    position: { x: -580, y: 227 },
    duration: 9.6,
    delay: 5.13
  },

  // ── Right side ─────────────────────────────────────────────────────
  {
    id: 'laravel',
    image: '/images/platforms/x.svg',
    position: { x: 580, y: -140 },
    duration: 9.6,
    delay: 8.39
  },
  {
    id: 'vue',
    image: '/images/platforms/google.svg',
    position: { x: 580, y: -47 },
    duration: 9.6,
    delay: 6.77
  },
  {
    id: 'claude',
    image: '/images/platforms/threads.svg',
    position: { x: 580, y: 47 },
    duration: 9.6,
    delay: 3.47
  },
  {
    id: 'x',
    image: '/images/platforms/tiktok.svg',
    position: { x: 580, y: 140 },
    duration: 9.6,
    delay: 1.66
  },
  {
    id: 'icon3',
    image: '/images/platforms/instagram.svg',
    position: { x: 580, y: -301.8 },
    duration: 9.6,
    delay: 0
  },
  {
    id: 'instagram',
    image: '/images/platforms/facebook.svg',
    position: { x: 580, y: 227 },
    duration: 9.6,
    delay: 5.13
  }
]
