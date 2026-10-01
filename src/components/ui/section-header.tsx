import type { ComponentProps } from 'react'

import { Badge } from '@/components/ui/badge'

import { cn } from '@/lib/utils'

type SectionHeaderProps = {
  headingLevel?: 'h1' | 'h2'
  badge?: string
  title?: string
  description?: string

  className?: string
  badgeClassName?: string
  titleClassName?: string
  descriptionClassName?: string
} & ComponentProps<'section'>

export function SectionHeader({
  headingLevel: Heading = 'h2',
  badge,
  title,
  description,
  className,
  badgeClassName,
  titleClassName,
  descriptionClassName,
  ...props
}: SectionHeaderProps) {
  return (
    <section className={cn('flex flex-col items-center gap-4 text-center', className)} {...props}>
      {badge && (
        <Badge variant='outline' className={cn('border-primary h-auto border text-sm font-normal', badgeClassName)}>
          {badge}
        </Badge>
      )}

      <Heading
        className={cn('type-display text-4xl leading-none tracking-wide md:text-5xl lg:text-6xl', titleClassName)}
      >
        {title}
      </Heading>

      {description && (
        <p className={cn('text-muted-foreground max-w-2xl text-lg', descriptionClassName)}>{description}</p>
      )}
    </section>
  )
}
