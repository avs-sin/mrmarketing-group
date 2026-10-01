import { servicePillars, type ServicePillar } from '@/assets/data/service-pillars'

// One source of truth for how pages hand visitors to the inquiry form, so every CTA carries its context.

export type PillarId = ServicePillar['id']

/** Contact page inquiry form, optionally with an offering preselected. */
export const inquiryHref = (pillar?: PillarId | 'unsure' | null) =>
  pillar ? `/contact-us?service=${pillar}#inquiry` : '/contact-us#inquiry'

export const getPillar = (id?: string | null) => servicePillars.find(pillar => pillar.id === id)

// Supporting capability pages roll up to the offering that delivers them
const supportingServices: Record<string, PillarId> = {
  'social-media-management': 'creative',
  'flyers-creative-design': 'creative'
}

export const pillarForServiceSlug = (slug: string): PillarId | null =>
  servicePillars.find(pillar => pillar.href === `/services/${slug}`)?.id ?? supportingServices[slug] ?? null

const pillarIds = new Set<string>(servicePillars.map(pillar => pillar.id))

/** Valid offering ids from a project's `services` frontmatter. */
export const projectPillars = (services: unknown): PillarId[] =>
  Array.isArray(services) ? services.filter((id): id is PillarId => pillarIds.has(id)) : []
