import type { ReactElement } from 'react'

// Third-party Imports
import { IconBrandInstagram, IconMail, IconPhone } from '@tabler/icons-react'

import { siteConfig } from '@/configs/site'
import { emailMariaHref } from '@/lib/contact'

export type ContactCard = {
  icon: ReactElement
  title: string
  label: string
  href: string
  note: string
  external?: boolean
}

export const contactCards: ContactCard[] = [
  {
    icon: <IconMail className='size-10 stroke-1' />,
    title: 'Email Maria',
    label: siteConfig.email,
    href: emailMariaHref(),
    note: 'Opens your email app. Nothing is sent until you press send.'
  },
  {
    icon: <IconPhone className='size-10 stroke-1' />,
    title: 'Call Maria',
    label: siteConfig.phone,
    href: siteConfig.phoneHref,
    note: 'Based in Las Vegas, NV.'
  },
  {
    icon: <IconBrandInstagram className='size-10 stroke-1' />,
    title: 'Follow the work',
    label: '@wearemrmarketing',
    href: siteConfig.links.instagram,
    note: 'Instagram',
    external: true
  }
]
