// Next Imports
import type { MetadataRoute } from 'next'

// Config Imports
import { siteConfig } from '@/configs/site'

// Util Imports
import { getProjects } from '@/lib/projects'
import { getServices } from '@/lib/services'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [services, projects] = await Promise.all([getServices(), getProjects()])

  const routes = [
    '' /* This is equivalent to / */,
    '/about-us',
    '/services',
    '/projects',
    '/teams',
    '/contact-us',
    ...services.map(service => `/services/${service.slug}`),
    ...projects.map(project => `/projects/${project.slug}`)
  ]

  return routes.map(route => ({
    url: `${siteConfig.url}${route}`
  }))
}
