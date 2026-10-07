import { servicePillars } from '@/assets/data/service-pillars'

// Shared by the inquiry form (client) and /api/inquiry (server) so validation and the email body never drift.

export const serviceOptions = [
  ...servicePillars.map(pillar => ({ value: pillar.id as string, label: pillar.name, hint: pillar.descriptor })),
  { value: 'unsure', label: 'Not sure yet', hint: 'Help me find the right fit' }
] as const

// Placeholder ranges for qualifying leads; confirm with Maria before relying on them.
export const budgetOptions = ['Under $2,500', '$2,500 – $5,000', '$5,000 – $10,000', '$10,000+', 'Prefer to discuss']

export const timelineOptions = ['As soon as possible', 'Within 1–3 months', '3+ months out', 'Just exploring']

export type Inquiry = {
  service: string
  budget: string
  timeline: string
  name: string
  email: string
  company: string
  phone: string
  message: string
}

export type InquiryErrors = Partial<Record<keyof Inquiry, string>>

export const emptyInquiry: Inquiry = {
  service: '',
  budget: '',
  timeline: '',
  name: '',
  email: '',
  company: '',
  phone: '',
  message: ''
}

export const limits: Record<keyof Inquiry, number> = {
  service: 40,
  budget: 40,
  timeline: 40,
  name: 120,
  email: 200,
  company: 160,
  phone: 40,
  message: 4000
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const serviceLabel = (value: string) => serviceOptions.find(option => option.value === value)?.label ?? value

/** Fields checked per form step, in order. */
// Every field the server checks belongs to exactly one step, so a server error always maps back to a visible step
export const stepFields: (keyof Inquiry)[][] = [
  ['service'],
  ['budget', 'timeline'],
  ['name', 'email', 'company', 'phone', 'message']
]

export const validateInquiry = (
  inquiry: Inquiry,
  fields: (keyof Inquiry)[] = Object.keys(limits) as (keyof Inquiry)[]
) => {
  const errors: InquiryErrors = {}

  for (const field of fields) {
    const value = inquiry[field].trim()

    if (value.length > limits[field]) errors[field] = 'That’s a little long — please shorten it.'
  }

  const has = (field: keyof Inquiry) => fields.includes(field) && !errors[field]

  if (has('service') && !serviceOptions.some(option => option.value === inquiry.service))
    errors.service = 'Choose the offering you’re interested in.'
  if (has('budget') && !budgetOptions.includes(inquiry.budget)) errors.budget = 'Choose a budget range.'
  if (has('timeline') && !timelineOptions.includes(inquiry.timeline)) errors.timeline = 'Choose a timeline.'
  if (has('name') && !inquiry.name.trim()) errors.name = 'Enter your name.'
  if (has('email') && !emailPattern.test(inquiry.email.trim()))
    errors.email = 'Enter an email address Maria can reply to.'
  if (has('message') && inquiry.message.trim().length < 10)
    errors.message = 'Tell Maria a little about your brand and goals.'

  return errors
}

/** Accepts unknown JSON and returns a trimmed Inquiry with only known string fields. */
export const normalizeInquiry = (input: unknown): Inquiry => {
  const source = (input && typeof input === 'object' ? input : {}) as Record<string, unknown>

  return Object.fromEntries(
    (Object.keys(emptyInquiry) as (keyof Inquiry)[]).map(key => [
      key,
      typeof source[key] === 'string' ? (source[key] as string).trim() : ''
    ])
  ) as Inquiry
}

export const inquirySubject = (inquiry: Inquiry) =>
  `New inquiry: ${serviceLabel(inquiry.service)} — ${inquiry.name}`.replace(/[\r\n]+/g, ' ').slice(0, 180)

export const inquiryText = (inquiry: Inquiry) =>
  [
    `Offering: ${serviceLabel(inquiry.service)}`,
    `Budget: ${inquiry.budget}`,
    `Timeline: ${inquiry.timeline}`,
    '',
    `Name: ${inquiry.name}`,
    `Email: ${inquiry.email}`,
    inquiry.company ? `Company: ${inquiry.company}` : null,
    inquiry.phone ? `Phone: ${inquiry.phone}` : null,
    '',
    inquiry.message
  ]
    .filter(line => line !== null)
    .join('\n')
