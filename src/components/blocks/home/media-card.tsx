'use client'

import { useState, useSyncExternalStore } from 'react'

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

  return (
    <article aria-label={asset.label} className='min-w-0'>
      <div data-media-frame className='border-border relative aspect-9/16 overflow-hidden rounded-2xl border bg-black'>
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
                onClick={() => setPlaying(true)}
                className='group focus-visible:outline-primary absolute inset-0 flex items-center justify-center bg-black/10 transition-colors hover:bg-black/25 focus-visible:outline-4 focus-visible:outline-offset-[-4px]'
              >
                <span className='flex size-16 items-center justify-center rounded-full border border-white/50 bg-black/50 text-white backdrop-blur-sm'>
                  <IconPlayerPlay aria-hidden className='size-7' />
                </span>
              </button>
            )}
          </>
        ) : (
          <video
            ref={node => {
              if (node)
                void node.play().catch(() => {
                  /* Native controls remain available if playback is denied. */
                })
            }}
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
            <Link href='/contact-us' className='mt-2 inline-block underline underline-offset-4'>
              Start a project
            </Link>
          </div>
        )}
      </div>
      <h3 className='mt-5 text-lg font-medium'>{asset.label}</h3>
    </article>
  )
}
