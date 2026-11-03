import { servicePillars } from '@/assets/data/service-pillars'
import { siteConfig } from '@/configs/site'

// One source of truth for the "Email Maria" action, so every mailto link carries the same encoded outline.

export type ContactTopic = (typeof servicePillars)[number]['id'] | 'unsure'

export const contactTopics: { id: ContactTopic; label: string; descriptor: string }[] = [
  ...servicePillars.map(pillar => ({ id: pillar.id, label: pillar.name, descriptor: pillar.descriptor })),
  { id: 'unsure', label: 'Not sure yet', descriptor: 'Help choosing the right offering' }
]

export const getContactTopic = (id?: string | null) => contactTopics.find(topic => topic.id === id)

export const emailSubject = (topicId?: string | null) => {
  const topic = getContactTopic(topicId)

  if (!topic) return 'Project inquiry'
  if (topic.id === 'unsure') return 'Project inquiry: help choosing an offering'

  return `Project inquiry: ${topic.label} (${topic.descriptor})`
}

// RFC 6068: line breaks in a mailto body are CRLF, percent-encoded as %0D%0A
const CRLF = '\r\n'

export const emailBody = (topicId?: string | null) => {
  const topic = getContactTopic(topicId)

  const interest = !topic
    ? null
    : topic.id === 'unsure'
      ? 'I am not sure which offering fits yet.'
      : `I am interested in ${topic.label} (${topic.descriptor}).`

  return [
    'Hi Maria,',
    '',
    ...(interest ? [interest, ''] : []),
    'My business or brand:',
    '',
    'What I need help with:',
    '',
    'Timing:',
    '',
    'Best way to reach me:',
    '',
    'Thanks,'
  ].join(CRLF)
}

/** Prefilled mailto link to Maria; nothing is sent until the visitor presses send in their own email app. */
export const emailMariaHref = (topicId?: string | null) =>
  `mailto:${siteConfig.email}?subject=${encodeURIComponent(emailSubject(topicId))}&body=${encodeURIComponent(emailBody(topicId))}`
