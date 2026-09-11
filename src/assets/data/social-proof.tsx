// Third-party Imports
import { IconBuildingStore, IconMapPin, IconGlassCocktail, IconKey } from '@tabler/icons-react'

// Component Imports
import type { socialProps } from '@/components/blocks/social-proof'

export const socialData: socialProps[] = [
  {
    icon: <IconBuildingStore />,
    numbers: '3+',
    subTitle: 'Active Clients',
    description: 'Restaurants, hotels, event brands, and local businesses on retainer right now.'
  },
  {
    icon: <IconMapPin />,
    numbers: 'LV',
    subTitle: 'Based & Connected',
    description: 'Born in Las Vegas. Plugged into the venues, promoters, and creators that move the city.'
  },
  {
    icon: <IconGlassCocktail />,
    numbers: '7',
    subTitle: 'Services, One Roof',
    description:
      'Restaurants, lounges, and events are our core. We also work with hotels, real estate, and local professionals.'
  },
  {
    icon: <IconKey />,
    numbers: '∞',
    subTitle: 'Industry Access',
    description: 'Liquor brands, local creators, and industry players, one text away.'
  }
]
