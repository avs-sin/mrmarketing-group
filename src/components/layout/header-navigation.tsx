'use client'

// React Imports
import { useEffect, useState, type ReactNode } from 'react'

// Next Imports
import { usePathname } from 'next/navigation'
import Link from 'next/link'

// Third-party Imports
import { useMedia } from 'react-use'
import { IconChevronRight, IconCircle, IconMenu2 } from '@tabler/icons-react'

// Component Imports
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from '@/components/ui/sheet'

import Logo from '@/components/logo'

// Util Imports
import { cn } from '@/lib/utils'

// Component Imports
import { Button } from '@/components/ui/button'

type NavigationSection = {
  type: 'section'
  title: string
  items: NavigationItem[]
}

type NavigationItem = {
  title: string
  href: string
  icon?: ReactNode
  badge?: ReactNode
  description?: string
}

type Navigation = {
  title: string
  contentClassName?: string
} & (
  | {
      items: NavigationSection[]
      splitItems: true
      href?: never
    }
  | {
      items: NavigationItem[]
      splitItems?: never | false
      href?: never
    }
  | {
      items?: never
      splitItems?: never
      href: string
    }
)

// ---- Active-state helpers (route/pathname based) ----

// Route portion of an href, ignoring any hash (e.g. '/#home' -> '/', '/projects/' -> '/projects')
const getRoutePath = (href: string) => {
  const path = href.split('#')[0]

  if (!path || path === '/') return '/'

  return path.replace(/\/+$/, '') || '/'
}

// A link is active when the current path equals its route, or is nested under it.
// The root '/' matches only exactly — otherwise it would match every path.
const isPathActive = (href: string, pathname: string | null) => {
  if (!pathname) return false

  const route = getRoutePath(href)

  if (route === '/') return pathname === '/'

  return pathname === route || pathname.startsWith(`${route}/`)
}

// Flatten a dropdown section's leaf hrefs (handles split and plain item lists)
const getLeafHrefs = (navItem: Navigation): string[] => {
  if (!navItem.items) return []

  return navItem.splitItems
    ? navItem.items.flatMap(section => section.items.map(item => item.href))
    : navItem.items.map(item => item.href)
}

// Longest shared path prefix of a set of hrefs (e.g. all '/services/*' -> '/services')
const getSharedBase = (hrefs: string[]) => {
  if (hrefs.length === 0) return ''

  const segments = hrefs.map(href => getRoutePath(href).split('/').filter(Boolean))
  const [first] = segments

  let base = ''

  for (let i = 0; i < first.length; i++) {
    const segment = first[i]

    if (segments.every(parts => parts[i] === segment)) {
      base += `/${segment}`
    } else {
      break
    }
  }

  return base
}

// A dropdown section is active when the current path sits under its shared base
// (e.g. any '/services' or '/services/*' page), or matches one of its child routes.
const isSectionActive = (navItem: Navigation, pathname: string | null) => {
  const hrefs = getLeafHrefs(navItem)
  const base = getSharedBase(hrefs)
  const withinBase = base ? pathname === base || Boolean(pathname?.startsWith(`${base}/`)) : false

  return withinBase || hrefs.some(href => isPathActive(href, pathname))
}

const ListItem = (props: {
  title: NavigationItem['title']
  href: NavigationItem['href']
  icon?: NavigationItem['icon']
  badge?: NavigationItem['badge']
  description?: NavigationItem['description']
  splitItems?: boolean
  pathname?: string | null
}) => {
  const { title, href, icon, badge, description, splitItems, pathname } = props

  const isActive = isPathActive(href, pathname ?? null)

  return (
    <li className={cn({ 'h-19.5': description && splitItems })}>
      <NavigationMenuLink
        href={href}
        data-active={isActive}
        closeOnClick
        className={cn(
          'data-[active=true]:bg-muted/80 data-[active=true]:hover:bg-muted/80 data-[active=true]:focus:bg-muted/80',
          {
            'flex flex-row items-start gap-2': icon
          }
        )}
        render={
          <Link href={href}>
            {icon && (
              <span className='bg-popover [&>svg]:text-popover-foreground! flex aspect-square size-7 shrink-0 items-center justify-center rounded-sm border [&>svg]:size-4'>
                {icon}
              </span>
            )}
            {description ? (
              <div className='space-y-0.5'>
                <div className={cn('font-medium', { 'flex items-center gap-1.5': badge })}>
                  {title}
                  {badge}
                </div>
                <p className='text-muted-foreground line-clamp-2'>{description}</p>
              </div>
            ) : (
              <div className={cn('font-medium', { 'flex items-center gap-1.5': badge })}>
                {title}
                {badge}
              </div>
            )}
          </Link>
        }
      ></NavigationMenuLink>
    </li>
  )
}

const HeaderNavigation = ({
  navigationData,
  navigationClassName
}: {
  navigationData: Navigation[]
  navigationClassName?: string
}) => {
  const pathname = usePathname()

  return (
    <NavigationMenu align='center' className={cn('hidden lg:block', navigationClassName)}>
      <NavigationMenuList className='h-fit gap-6'>
        {navigationData.map(navItem => {
          if (navItem.href) {
            // Root link item
            const isActive = isPathActive(navItem.href, pathname)

            return (
              <NavigationMenuItem key={navItem.title}>
                <NavigationMenuLink
                  href={navItem.href}
                  data-active={isActive}
                  className={cn(navigationMenuTriggerStyle(), 'link-animated h-auto bg-transparent! p-0! text-base')}
                  render={<Link href={navItem.href}>{navItem.title}</Link>}
                ></NavigationMenuLink>
              </NavigationMenuItem>
            )
          }

          // Section with dropdown — active when the current route is one of its children
          const hasActiveChild = isSectionActive(navItem, pathname)

          return (
            <NavigationMenuItem key={navItem.title}>
              <NavigationMenuTrigger
                data-active={hasActiveChild}
                className='link-animated h-6 bg-transparent! p-0! text-base [&_svg]:size-4'
              >
                {navItem.title}
              </NavigationMenuTrigger>
              <NavigationMenuContent className='w-auto shadow-lg!'>
                {navItem.splitItems ? (
                  <div className={cn('grid grid-cols-1 gap-2', navItem.contentClassName)}>
                    {navItem.items.map(section => (
                      <div key={section.title} className='grid grid-cols-1 gap-2'>
                        <div className='text-muted-foreground px-2 text-sm'>{section.title}</div>
                        <ul
                          className={cn('grid grid-cols-1 gap-0.5', {
                            'gap-1': section.items.find(item => item.description)
                          })}
                        >
                          {section.items.map((item, index) => (
                            <ListItem
                              key={index}
                              icon={item.icon}
                              title={item.title}
                              description={item.description}
                              href={item.href}
                              badge={item.badge}
                              splitItems={navItem.splitItems}
                              pathname={pathname}
                            />
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                ) : (
                  <ul
                    className={cn(
                      'grid grid-cols-1 gap-0.5',
                      { 'gap-1': navItem.items?.find(item => item.description) },
                      navItem.contentClassName
                    )}
                  >
                    {navItem.items?.map((item, index) => (
                      <ListItem
                        key={index}
                        icon={item.icon}
                        title={item.title}
                        description={item.description}
                        href={item.href}
                        badge={item.badge}
                        pathname={pathname}
                      />
                    ))}
                  </ul>
                )}
              </NavigationMenuContent>
            </NavigationMenuItem>
          )
        })}
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const HeaderNavigationSmallScreen = ({
  navigationData,
  triggerClassName,
  screenSize = 1023
}: {
  navigationData: Navigation[]
  triggerClassName?: string
  screenSize?: number
}) => {
  const [open, setOpen] = useState(false)
  const isMobile = useMedia(`(max-width: ${screenSize}px)`, false)

  const pathname = usePathname()

  const handleLinkClick = () => {
    setOpen(false)
  }

  useEffect(() => {
    if (!isMobile) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setOpen(false)
    }
  }, [isMobile])

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button
            size='icon'
            className={cn(
              'text-primary bg-primary-foreground hover:bg-primary-foreground/80 lg:hidden',
              triggerClassName
            )}
          />
        }
      >
        <IconMenu2 />
        <span className='sr-only'>Menu</span>
      </SheetTrigger>
      <SheetContent side='left' className='w-75 gap-0 p-0'>
        <SheetHeader className='p-4'>
          <SheetTitle hidden />
          <SheetDescription hidden />
          <Link href='/#home' onClick={handleLinkClick} className='self-start'>
            <Logo />
          </Link>
        </SheetHeader>
        <div className='space-y-0.5 overflow-y-auto p-2'>
          {navigationData.map((navItem, index) => {
            if (navItem.href) {
              const isActive = isPathActive(navItem.href, pathname)

              return (
                <Link
                  key={navItem.title}
                  href={navItem.href}
                  data-active={isActive}
                  className='hover:bg-accent data-[active=true]:bg-accent flex items-center gap-2 rounded-sm px-3 py-2 text-sm data-[active=true]:font-medium'
                  onClick={handleLinkClick}
                >
                  {navItem.title}
                </Link>
              )
            }

            // Section with dropdown — active when the current route is one of its children
            const hasActiveChild = isSectionActive(navItem, pathname)

            return (
              <Collapsible key={index} className='w-full'>
                <CollapsibleTrigger
                  data-active={hasActiveChild}
                  className='hover:bg-accent group data-[active=true]:bg-accent flex w-full items-center justify-between rounded-sm px-3 py-2 text-sm data-[active=true]:font-medium'
                >
                  <div className='flex items-center gap-2'>{navItem.title}</div>
                  <IconChevronRight className='size-4 shrink-0 stroke-[1.5] transition-[rotate] duration-150 ease-out group-data-panel-open:rotate-90' />
                </CollapsibleTrigger>
                <CollapsibleContent className='h-(--collapsible-panel-height) overflow-hidden transition-[height] duration-200 ease-out data-ending-style:h-0 data-starting-style:h-0'>
                  {navItem.splitItems
                    ? navItem.items.map((item, i) => (
                        <div key={i} className='mt-1.5'>
                          <div className='text-muted-foreground mb-1 pl-4.5 text-xs font-medium'>{item.title}</div>
                          {item.items.map((subItem, j) => {
                            const isActive = isPathActive(subItem.href, pathname)

                            return (
                              <Link
                                key={j}
                                href={subItem.href}
                                data-active={isActive}
                                className='hover:bg-accent data-[active=true]:text-primary ml-4.5 flex items-center gap-2 rounded-sm px-3 py-2 text-sm data-[active=true]:font-medium'
                                onClick={handleLinkClick}
                              >
                                {subItem.icon ? subItem.icon : <IconCircle className='size-3 stroke-[1.5]' />}
                                {subItem.title}
                              </Link>
                            )
                          })}
                        </div>
                      ))
                    : navItem.items?.map(item => {
                        const isActive = isPathActive(item.href, pathname)

                        return (
                          <Link
                            key={item.title}
                            href={item.href}
                            data-active={isActive}
                            className='hover:bg-accent data-[active=true]:text-primary ml-3 flex items-center gap-2 rounded-sm px-3 py-2 text-sm data-[active=true]:font-medium'
                            onClick={handleLinkClick}
                          >
                            {item.icon ? item.icon : <IconCircle className='size-3 stroke-[1.5]' />}
                            {item.title}
                          </Link>
                        )
                      })}
                </CollapsibleContent>
              </Collapsible>
            )
          })}
        </div>
      </SheetContent>
    </Sheet>
  )
}

export { HeaderNavigation, HeaderNavigationSmallScreen, type Navigation, type NavigationItem, type NavigationSection }
