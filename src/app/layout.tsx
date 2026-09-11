// React Imports
import type { ReactNode } from 'react'

// Next Imports
import type { Metadata } from 'next'
import { cookies } from 'next/headers'

// Context Imports
import { SettingsProvider, type Settings } from '@/contexts/settingsContext'

// Component Imports
import { ThemeProvider } from '@/components/theme-provider'
import { TooltipProvider } from '@/components/ui/tooltip'

// Config Imports
import themeConfig from '@/configs/themeConfig'
import { siteConfig } from '@/configs/site'

// Util Imports
import { allFonts } from '@/utils/fonts'
import { cn } from '@/lib/utils'
import { getThemeInitAttributes, getThemeInitScript } from '@/utils/theme-script'

// Style Imports
import './globals.css'

// Register every selectable font's CSS variable on <html> so the Theme Customizer can switch between them
const fontVariables = allFonts.map(font => font.variable)

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    template: `%s | ${siteConfig.name}`,
    default: `${siteConfig.name} | Las Vegas Full-Service Marketing Agency`
  },
  description: siteConfig.description,
  robots: 'index,follow',
  keywords: [
    'las vegas marketing agency',
    'hospitality marketing',
    'nightlife marketing',
    'restaurant marketing',
    'event marketing',
    'content creation',
    'brand strategy',
    'MR Marketing Group'
  ],
  authors: [
    {
      name: siteConfig.creator.name,
      url: siteConfig.creator.url
    }
  ],
  creator: siteConfig.creator.name,
  icons: {
    icon: [
      {
        url: '/favicon/favicon.ico',
        sizes: '48x48',
        type: 'image/x-icon'
      },
      {
        url: '/favicon/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png'
      },
      {
        url: '/favicon/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png'
      }
    ],
    apple: [
      {
        url: '/favicon/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png'
      }
    ]
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.brand,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: siteConfig.twitterHandle
  }
}

const RootLayout = async ({ children }: Readonly<{ children: ReactNode }>) => {
  // Seed the settings provider from the cookie so SSR renders the saved theme (no flash of defaults)
  const cookieStore = await cookies()
  const rawSettings = cookieStore.get(themeConfig.settingsCookieName)?.value

  let settingsCookie: Settings | undefined

  try {
    settingsCookie = rawSettings ? (JSON.parse(rawSettings) as Settings) : undefined
  } catch {
    settingsCookie = undefined
  }

  // Render radius/font/scale onto <html> server-side so they're correct on first paint (no flash)
  const themeAttributes = getThemeInitAttributes(settingsCookie)

  return (
    <html
      lang='en'
      className={cn(...fontVariables, 'flex min-h-full w-full scroll-smooth font-sans antialiased')}
      suppressHydrationWarning
      {...themeAttributes}
    >
      <body className='flex min-h-full w-full flex-auto flex-col'>
        {/* Applies the saved theme before first paint to prevent a flash of the default theme */}
        <script dangerouslySetInnerHTML={{ __html: getThemeInitScript(settingsCookie) }} />
        <ThemeProvider>
          <SettingsProvider settingsCookie={settingsCookie}>
            <TooltipProvider>{children}</TooltipProvider>
          </SettingsProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

export default RootLayout
