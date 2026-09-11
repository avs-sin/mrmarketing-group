// Next Imports
import type { Metadata } from 'next'

// Config Imports
import { siteConfig } from '@/configs/site'

type SEOProps = {
  title?: string
  description?: string
  image?: string
  url?: string
  keywords?: string[]
  noIndex?: boolean
  type?: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string
  author?: string
}

/**
 * Generate metadata for pages with SEO optimization
 */
export function generateMetadata({
  title,
  description = siteConfig.description,
  image = siteConfig.ogImage,
  url = '',
  keywords = [],
  noIndex = false,
  type = 'website'
}: SEOProps): Metadata {
  const pageUrl = url ? `${siteConfig.url}${url}` : siteConfig.url

  const pageTitle = title
    ? `${title} | ${siteConfig.name}`
    : `${siteConfig.name} | Las Vegas Full-Service Marketing Agency`

  return {
    // A string title flows through the layout's `%s | …` template; when a page omits its own
    // title (e.g. the homepage), emit the absolute product + author title instead of inheriting.
    title: title ?? { absolute: pageTitle },
    description,
    keywords: keywords.length > 0 ? keywords : undefined,
    robots: noIndex ? 'noindex,nofollow' : 'index,follow',
    alternates: {
      canonical: pageUrl
    },
    openGraph: {
      type,
      url: pageUrl,
      title: pageTitle,
      description,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: pageTitle
        }
      ],
      siteName: siteConfig.brand
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description,
      images: [image],
      creator: siteConfig.twitterHandle
    }
  }
}

/**
 * Generate Website Schema for JSON-LD
 */
export function generateWebsiteSchema() {
  return {
    '@type': 'WebSite',
    '@id': `${siteConfig.url}#website`,
    name: siteConfig.brand,
    description: siteConfig.description,
    url: siteConfig.url,
    inLanguage: 'en-US'
  }
}

/**
 * Generate WebPage Schema for JSON-LD
 */
export function generateWebPageSchema({ name, description, url }: { name: string; description: string; url: string }) {
  return {
    '@type': 'WebPage',
    '@id': `${siteConfig.url}${url}#webpage`,
    name,
    description,
    url: `${siteConfig.url}${url}`,
    isPartOf: {
      '@id': `${siteConfig.url}#website`
    },
    inLanguage: 'en-US'
  }
}

/**
 * Generate Article Schema for blog posts
 */
export function generateArticleSchema({
  title,
  description,
  url,
  image,
  publishedTime,
  modifiedTime,
  author
}: {
  title: string
  description: string
  url: string
  image?: string
  publishedTime?: string
  modifiedTime?: string
  author?: {
    name: string
    image?: string
  }
}) {
  return {
    '@type': 'Article',
    '@id': `${siteConfig.url}${url}#article`,
    headline: title,
    description,
    url: `${siteConfig.url}${url}`,
    image: image || siteConfig.ogImage,
    datePublished: publishedTime,
    dateModified: modifiedTime || publishedTime,
    author: author
      ? {
          '@type': 'Person',
          name: author.name,
          image: author.image
        }
      : {
          '@type': 'Organization',
          name: siteConfig.brand
        },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.brand,
      logo: {
        '@type': 'ImageObject',
        url: siteConfig.ogImage
      }
    },
    inLanguage: 'en-US'
  }
}

/**
 * Generate BreadcrumbList Schema for JSON-LD
 */
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.url}`
    }))
  }
}

/**
 * Combine multiple schemas into a JSON-LD graph
 */
export function combineSchemas(...schemas: Array<Record<string, unknown>>) {
  return {
    '@context': 'https://schema.org',
    '@graph': schemas
  }
}

/**
 * Escape JSON-LD for safe rendering in script tags
 */
export function escapeJsonLd(jsonLd: Record<string, unknown>): string {
  return JSON.stringify(jsonLd).replace(/</g, '\\u003c')
}
