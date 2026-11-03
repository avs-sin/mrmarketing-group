import type { ReactNode } from 'react'

import type { Metadata } from 'next'
import Link from 'next/link'

import ContentLayout from '@/components/layout/content-layout'
import { siteConfig } from '@/configs/site'
import { emailMariaHref } from '@/lib/contact'
import {
  combineSchemas,
  generateBreadcrumbSchema,
  generateMetadata as generateSEOMetadata,
  generateOrganizationSchema,
  generateWebPageSchema,
  generateWebsiteSchema
} from '@/lib/seo'

const description =
  'How the Mr. Marketing Group website handles your information: no contact forms or tracking scripts, email and phone contact, hosting data, and one display-preference cookie.'

export const metadata: Metadata = generateSEOMetadata({ title: 'Privacy Notice', description, url: '/privacy' })

// Plain description of what this site actually does. Keep it in step with the code: no forms, no analytics or
// advertising scripts, self-hosted fonts and media, and one first-party display-preference cookie.
const sections: { heading: string; body: ReactNode }[] = [
  {
    heading: 'What this website collects',
    body: (
      <>
        <p>
          This website has no contact forms, accounts, newsletter sign-up, or payments. It does not run analytics or
          advertising scripts.
        </p>
        <p>
          Fonts, images, videos, and captions are served from this website. Links to Instagram and TikTok open those
          services, and their own privacy policies apply there.
        </p>
      </>
    )
  },
  {
    heading: 'When you email or call',
    body: (
      <>
        <p>
          The “Email Maria” buttons open your own email app with a message addressed to{' '}
          <span className='text-foreground font-medium break-all'>{siteConfig.email}</span>. Nothing is sent from this
          website, and nothing is sent until you press send in your email app.
        </p>
        <p>
          If you email or call, we receive what you choose to share, such as your name, email address, phone number,
          and details about your business. We use it to reply to you and discuss your inquiry. Email is delivered
          through our business email provider, and calls through the phone carriers involved.
        </p>
      </>
    )
  },
  {
    heading: 'Hosting',
    body: (
      <p>
        This website is hosted by Vercel. Like most web hosts, Vercel processes technical information about each
        visit, such as your IP address, browser type, and the pages requested, to deliver and protect the site. See{' '}
        <a
          href='https://vercel.com/legal/privacy-policy'
          target='_blank'
          rel='noopener noreferrer'
          className='hover:text-foreground underline underline-offset-4'
        >
          Vercel’s privacy policy
        </a>{' '}
        for how Vercel handles that information.
      </p>
    )
  },
  {
    heading: 'Cookies and browser storage',
    body: (
      <p>
        The site stores one first-party cookie, <code className='text-foreground'>mrmg-settings</code>, and a{' '}
        <code className='text-foreground'>theme</code> entry in your browser’s local storage. They only remember display
        settings, such as light or dark mode, so the site looks the same on your next visit. They are not used for
        advertising or tracking. You can clear them in your browser settings at any time.
      </p>
    )
  },
  {
    heading: 'Questions or requests',
    body: (
      <p>
        To ask about information you have sent us, or to ask us to update or delete it, email{' '}
        <a href={emailMariaHref()} className='hover:text-foreground break-all underline underline-offset-4'>
          {siteConfig.email}
        </a>{' '}
        or call{' '}
        <a href={siteConfig.phoneHref} className='hover:text-foreground underline underline-offset-4'>
          {siteConfig.phone}
        </a>
        .
      </p>
    )
  }
]

const PrivacyPage = () => {
  const jsonLd = combineSchemas(
    generateWebsiteSchema(),
    generateOrganizationSchema(),
    generateWebPageSchema({ name: 'Privacy Notice', description, url: '/privacy' }),
    generateBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Privacy Notice', url: '/privacy' }
    ])
  )

  return (
    <section className='pt-36 pb-16 sm:pt-44 sm:pb-24'>
      <ContentLayout className='max-w-3xl'>
        <p className='text-primary mb-5 text-sm tracking-widest uppercase'>Privacy</p>
        <h1 className='type-display text-5xl leading-[1.05] tracking-tight sm:text-7xl'>Privacy notice</h1>
        <p className='text-muted-foreground mt-6 text-lg leading-relaxed text-pretty'>
          This notice explains how the {siteConfig.name} website handles information. Mr. Marketing Group is based in
          Las Vegas, NV.
        </p>
        <p className='text-muted-foreground mt-3 text-sm'>Last updated November 2, 2026.</p>

        <div className='mt-12 space-y-10'>
          {sections.map(section => (
            <div key={section.heading}>
              <h2 className='font-sans text-2xl font-medium'>{section.heading}</h2>
              <div className='text-muted-foreground mt-4 space-y-4 leading-relaxed text-pretty'>{section.body}</div>
            </div>
          ))}
        </div>

        <p className='border-border text-muted-foreground mt-14 border-t pt-8'>
          Ready to talk?{' '}
          <Link href='/contact-us#inquiry' className='hover:text-foreground font-medium underline underline-offset-4'>
            Contact Maria
          </Link>
          .
        </p>
      </ContentLayout>

      <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
    </section>
  )
}

export default PrivacyPage
