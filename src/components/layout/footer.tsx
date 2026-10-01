// Next Imports
import Link from 'next/link'

// Third-party Imports
import { IconBrandInstagram, IconBrandTiktok } from '@tabler/icons-react'

// Component Imports
import ContentLayout from '@/components/layout/content-layout'
import Logo from '@/components/logo'
import { Separator } from '@/components/ui/separator'

// Config Imports
import { servicePillars } from '@/assets/data/service-pillars'

import { siteConfig } from '@/configs/site'

const Footer = () => {
  return (
    <footer className='bg-card p-4 sm:p-6'>
      <div className='bg-background rounded-4xl py-8 sm:py-16'>
        <ContentLayout className='flex flex-col gap-16'>
          <div>
            <div aria-hidden className='overflow-hidden max-md:hidden'>
              <p className='text-foreground/5 mb-8 text-[clamp(5rem,12.5vw,10rem)] leading-none font-bold tracking-tight whitespace-nowrap select-none'>
                MR MARKETING
              </p>
            </div>
            <div className='grid grid-cols-6 gap-6'>
              <div className='col-span-full flex flex-col items-start gap-4 lg:col-span-2'>
                <Link href='/'>
                  <Logo variant='white' />
                </Link>
                <p className='text-muted-foreground'>
                  A Las Vegas creative marketing agency. Strategy, storytelling, and experiences tailored to your brand.
                </p>
                <div className='flex items-center gap-4'>
                  <Link
                    href={siteConfig.links.instagram}
                    target='_blank'
                    rel='noopener noreferrer'
                    aria-label='Instagram'
                  >
                    <IconBrandInstagram className='text-primary size-5' />
                  </Link>
                  <Link
                    href={siteConfig.links.tiktok}
                    target='_blank'
                    rel='noopener noreferrer'
                    aria-label='Maria Romano on TikTok'
                  >
                    <IconBrandTiktok className='text-primary size-5' />
                  </Link>
                  <Link
                    href={siteConfig.links.founderInstagram}
                    target='_blank'
                    rel='noopener noreferrer'
                    aria-label='Maria Romano on Instagram'
                  >
                    <IconBrandInstagram className='text-muted-foreground size-5' />
                  </Link>
                </div>
              </div>
              <div className='col-span-full grid grid-cols-2 gap-6 sm:grid-cols-4 lg:col-span-4 lg:gap-8'>
                <div className='flex flex-col gap-5'>
                  <div className='text-lg font-medium'>Agency</div>
                  <ul className='text-muted-foreground space-y-3'>
                    <li>
                      <Link href='/' className='hover:text-foreground transition-colors duration-150 ease-out'>
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link href='/services' className='hover:text-foreground transition-colors duration-150 ease-out'>
                        Services
                      </Link>
                    </li>
                    <li>
                      <Link href='/projects' className='hover:text-foreground transition-colors duration-150 ease-out'>
                        Our work
                      </Link>
                    </li>
                    <li>
                      <Link href='/about-us' className='hover:text-foreground transition-colors duration-150 ease-out'>
                        About
                      </Link>
                    </li>
                    <li>
                      <Link
                        href='/contact-us#inquiry'
                        className='hover:text-foreground transition-colors duration-150 ease-out'
                      >
                        Start a Project
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className='flex flex-col gap-5'>
                  <div className='text-lg font-medium'>Contact</div>
                  <ul className='text-muted-foreground space-y-3'>
                    <li>
                      <a
                        href={`mailto:${siteConfig.email}`}
                        className='hover:text-foreground break-all transition-colors duration-150 ease-out'
                      >
                        {siteConfig.email}
                      </a>
                    </li>
                    <li>
                      <a
                        href={siteConfig.phoneHref}
                        className='hover:text-foreground transition-colors duration-150 ease-out'
                      >
                        {siteConfig.phone}
                      </a>
                    </li>
                    <li>{siteConfig.location}</li>
                    <li>
                      <Link href='/teams' className='hover:text-foreground transition-colors duration-150 ease-out'>
                        Founder
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className='col-span-full flex flex-col gap-5 sm:col-span-2'>
                  <div>
                    <p className='mb-3 text-lg font-medium'>Our offerings</p>
                    <ul className='text-muted-foreground grid gap-3 sm:grid-cols-2'>
                      {servicePillars.map(pillar => (
                        <li key={pillar.id}>
                          <Link
                            href={pillar.href}
                            className='hover:text-foreground transition-colors duration-150 ease-out'
                          >
                            {pillar.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Separator />
                  <p className='text-muted-foreground text-sm'>
                    © {new Date().getFullYear()} Mr. Marketing Group · Las Vegas, NV · All rights reserved
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ContentLayout>
      </div>
    </footer>
  )
}

export default Footer
