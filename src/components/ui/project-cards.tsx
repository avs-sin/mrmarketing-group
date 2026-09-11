// Next Imports
import type { ComponentProps } from 'react'

import Link from 'next/link'

import { IconArrowRight } from '@tabler/icons-react'

import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'
import { Cursor, CursorFollow, CursorProvider } from '@/components/ui/cursor'

import { cn } from '@/lib/utils'

export type ProjectCardProps = {
  title: string
  description: string
  image: string

  href?: string

  className?: string
  imageClassName?: string
  titleClassName?: string
  descriptionClassName?: string
} & ComponentProps<'div'>

export function ProjectCard({
  title,
  description,
  image,
  href,
  className,
  imageClassName,
  titleClassName,
  descriptionClassName,
  ...props
}: ProjectCardProps) {
  const card = (
    <Card
      className={cn(
        'group bg-background relative h-full overflow-hidden overflow-visible shadow-none ring-0',
        className
      )}
      {...props}
    >
      <CursorProvider>
        <Cursor>
          <svg className='text-primary size-6' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'>
            <path
              fill='currentColor'
              d='M1.8 4.4 7 36.2c.3 1.8 2.6 2.3 3.6.8l3.9-5.7c1.7-2.5 4.5-4.1 7.5-4.3l6.9-.5c1.8-.1 2.5-2.4 1.1-3.5L5 2.5c-1.4-1.1-3.5 0-3.3 1.9Z'
            />
          </svg>
        </Cursor>

        <CursorFollow>
          <div className='bg-primary text-primary-foreground flex items-center gap-1.5 rounded-lg px-2 py-1 text-sm text-nowrap shadow-lg'>
            View More <IconArrowRight className='size-4' />
          </div>
        </CursorFollow>

        <CardContent className='flex flex-col gap-6'>
          <div className='overflow-hidden rounded-xl'>
            <img src={image} alt={title} className={cn('w-full rounded-xl object-cover object-top', imageClassName)} />
          </div>

          <div className='space-y-4'>
            <CardTitle className={cn('text-2xl font-semibold', titleClassName)}>{title}</CardTitle>

            <CardDescription className={cn('text-lg', descriptionClassName)}>{description}</CardDescription>
          </div>
        </CardContent>
      </CursorProvider>
    </Card>
  )

  if (!href) return card

  return (
    <Link href={href} target='_blank' rel='noopener noreferrer' className='block'>
      {card}
    </Link>
  )
}
