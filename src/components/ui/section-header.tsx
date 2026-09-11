import type { ComponentProps } from 'react'

import { Badge } from '@/components/ui/badge'

import { cn } from '@/lib/utils'

type SectionHeaderProps = {
  badge?: string
  title?: string
  description?: string

  className?: string
  badgeClassName?: string
  titleClassName?: string
  descriptionClassName?: string
} & ComponentProps<'section'>

export function SectionHeader({
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

      <h2 className={cn('type-display text-4xl leading-none tracking-wide md:text-5xl lg:text-6xl', titleClassName)}>
        {title}
      </h2>

      {description && (
        <p className={cn('text-muted-foreground max-w-2xl text-lg', descriptionClassName)}>{description}</p>
      )}
    </section>
  )
}
