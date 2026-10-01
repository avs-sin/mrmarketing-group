'use client'

import { useRef, useState, useSyncExternalStore } from 'react'

import { flushSync } from 'react-dom'

import Link from 'next/link'
import { IconPlayerPlay } from '@tabler/icons-react'

export type MediaAsset = {
  id: string
  kind: 'image' | 'video'
  src: string
  poster?: string
  captions?: string
  alt: string
  label: string
  sourceFile: string
  sourceSha256: string
  width: number
  height: number
}

const subscribe = () => () => {}

export const MediaCard = ({ asset }: { asset: MediaAsset }) => {
  const ready = useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  )

  const [playing, setPlaying] = useState(false)
  const [failed, setFailed] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Mount the player synchronously and call play() while still inside the tap: iOS Safari only allows
  // unmuted playback that starts within the user gesture, so playing after a later re-render can stall.
  const start = () => {
    flushSync(() => setPlaying(true))
    void videoRef.current?.play().catch(() => {
      /* Native controls remain available if playback is denied. */
    })
  }

  return (
    <article aria-label={asset.label} className='min-w-0'>
      <div data-media-frame className='img-outline relative aspect-9/16 overflow-hidden rounded-2xl bg-black'>
        {!playing || failed ? (
          <>
            <img
              src={asset.poster}
              alt={asset.alt}
              width={asset.width}
              height={asset.height}
              loading='lazy'
              className='size-full object-contain'
            />
            {!failed && (
              <button
                type='button'
                disabled={!ready}
                aria-label={`Play ${asset.label}`}
                onClick={start}
                className='group focus-visible:outline-primary absolute inset-0 flex items-end justify-start bg-gradient-to-t from-black/55 via-transparent to-transparent p-4 transition-colors hover:bg-black/20 focus-visible:outline-4 focus-visible:outline-offset-[-4px]'
              >
                <span className='flex items-center gap-2 rounded-full bg-black/55 py-2 pr-4 pl-2 text-sm font-medium text-white shadow-[0_0_0_1px_oklch(1_0_0/0.3)] backdrop-blur-sm transition-[scale] duration-200 ease-out group-hover:scale-105'>
                  <span className='bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-full'>
                    {/* Optical centering: a triangle's visual centre sits right of its box centre */}
                    <IconPlayerPlay aria-hidden className='size-4 translate-x-px fill-current' />
                  </span>
                  Play film
                </span>
              </button>
            )}
          </>
        ) : (
          <video
            ref={videoRef}
            src={asset.src}
            poster={asset.poster}
            controls
            playsInline
            preload='none'
            aria-label={asset.label}
            onError={() => setFailed(true)}
            className='size-full object-contain'
          >
            <track kind='captions' src={asset.captions} srcLang='en' label='English' />
          </video>
        )}
        {failed && (
          <div role='status' className='absolute inset-x-0 bottom-0 bg-black/90 p-5 text-white'>
            <p>Video unavailable</p>
            <Link href='/contact-us#inquiry' className='mt-2 inline-block underline underline-offset-4'>
              Start a project
            </Link>
          </div>
        )}
      </div>
      <h3 className='mt-4 font-sans text-base font-medium'>{asset.label}</h3>
    </article>
  )
}
