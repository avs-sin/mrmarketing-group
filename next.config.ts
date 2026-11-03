import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  basePath: process.env.BASEPATH ?? '',
  reactStrictMode: true,

  // The site uses plain <img>/<video> only; no next/image. `unoptimized` turns the optimizer off under
  // `next start`, and a local pattern that matches no real path makes Vercel's image service reject every request.
  images: {
    unoptimized: true,
    localPatterns: [{ pathname: '/__image-optimization-disabled__', search: '' }]
  },
  pageExtensions: ['js', 'jsx', 'ts', 'tsx']
}

export default nextConfig
