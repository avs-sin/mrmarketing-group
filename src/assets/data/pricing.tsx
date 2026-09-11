// Third-party Imports
import { IconRocket, IconBolt, IconCrown } from '@tabler/icons-react'

// Component Imports
import type { Plans } from '@/components/blocks/pricing'

// DRAFT COPY: package structure is a proposal. Confirm pricing and inclusions with Maria before launch.
export const plans: Plans = [
  {
    icon: <IconRocket className='size-6' />,
    title: 'One Event',
    description: 'One night, start to finish. No contract.',
    price: 1500,
    currency: '$',
    period: '/Starting From',
    buttonText: 'Start a Project',
    features: [
      'Event or campaign strategy',
      'Flyer and creative design',
      'On-site content shoot',
      'Social promotion across Instagram and TikTok',
      'Day-of execution support'
    ]
  },
  {
    icon: <IconBolt className='size-6' />,
    title: 'Retainer',
    description: 'Ideal for venues that need a full-time presence.',
    price: 'Custom',
    buttonText: 'Book a Call',
    features: [
      'Everything in Launch',
      'Monthly content calendar and posting',
      'Community engagement and growth strategy',
      'Monthly event or activation',
      'Performance reporting'
    ],
    extraFeatures: ['Best for restaurants, bars, and lounges that want to stay top of mind every week.'],
    isPopular: true
  },
  {
    icon: <IconCrown className='size-6' />,
    title: 'Full-Service Agency',
    description: 'For brands and groups with multiple locations or concepts.',
    price: 'Custom',
    buttonText: 'Request a Proposal',
    features: [
      'Everything in Retainer',
      'Brand strategy and positioning',
      'Sponsorship and liquor brand partnerships',
      'Paid advertising management',
      'Multi-location and multi-concept coverage',
      'Dedicated agency lead'
    ]
  }
]
