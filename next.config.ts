import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  basePath: process.env.BASEPATH ?? '',
  reactStrictMode: true,

  // The site uses plain <img>/<video> only; no next/image. Turning the optimizer off removes /_next/image.
  images: { unoptimized: true },
  pageExtensions: ['js', 'jsx', 'ts', 'tsx']
}

export default nextConfig
