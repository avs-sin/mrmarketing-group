'use client'

// React Imports
import { useEffect, useState } from 'react'

// Next Imports
import Link from 'next/link'

// Third-party Imports
import { IconArrowUpRight } from '@tabler/icons-react'

import ThemeCustomizer from './ThemeCustomizer'

// Component Imports
import { Button } from '@/components/ui/button'
import { HeaderNavigation, HeaderNavigationSmallScreen, type Navigation } from '@/components/layout/header-navigation'
import Logo from '@/components/logo'

// Util Imports
import { cn } from '@/lib/utils'

type HeaderProps = {
  navigationData: Navigation[]
  className?: string
}

const Header = ({ navigationData }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 56)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <header className='fixed inset-x-0 top-6 z-50 flex justify-center px-4 sm:px-6 lg:px-8'>
      <div
        className={cn(
          'bg-primary mx-auto w-full max-w-7xl rounded-full px-4 transition-[max-width] duration-700 ease-out',
          isScrolled && 'max-w-4xl'
        )}
      >
        {/* Logo */}
        <div className='text-primary-foreground flex items-center justify-between gap-8 py-3.5'>
          <Link href='/#home'>
            <Logo variant='white' />
          </Link>
          <HeaderNavigation navigationData={navigationData} navigationClassName='grow' />
          {/* Actions */}
          <div className='flex items-center justify-center gap-3'>
            <ThemeCustomizer />
            <Button
              className='text-primary bg-primary-foreground hover:bg-primary-foreground/80 max-md:hidden'
              render={<Link href='/contact-us#inquiry' data-track='cta_book_call' data-track-location='header' />}
              nativeButton={false}
            >
              Let&apos;s Talk
            </Button>

            <Button
              className='text-primary bg-primary-foreground hover:bg-primary-foreground/80 md:hidden'
              render={<Link href='/contact-us#inquiry' />}
              nativeButton={false}
              size='icon'
              aria-label='Contact us'
            >
              <IconArrowUpRight data-icon='inline-end' />
            </Button>
            <HeaderNavigationSmallScreen navigationData={navigationData} />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
