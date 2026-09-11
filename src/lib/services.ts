// Third-party Imports
import fs from 'fs' // Comment this line if using remote fetching

import path from 'path' // Comment this line if using remote fetching

import matter from 'gray-matter'

export type Service = {
  metadata: ServiceMetadata
  content: string
}

export type ServiceWhatWeDoItem = {
  icon?: 'palette' | 'pointer-collaboration' | 'code'
  title: string
  description: string
}

export type ServiceProcessStep = {
  id: string
  title: string
  content: string
}

export type ServiceMetadata = {
  slug: string
  title?: string
  description?: string
  category?: string
  image?: string
  heroBadge?: string
  heroTitle?: string
  heroDescription?: string
  heroImage?: string
  whatWeDoBadge?: string
  whatWeDoTitle?: string
  whatWeDoDescription?: string
  whatWeDoItems?: ServiceWhatWeDoItem[]
  process?: ServiceProcessStep[]
  keywords?: string[]
}

// local content directory (comment below line if using remote fetching)
const rootDirectory = path.join(process.cwd(), 'src', 'content', 'services')

// Remote repository details
// const GITHUB_USERNAME = 'yourusername'
// const GITHUB_REPO = 'reponame'
// const GITHUB_BRANCH = 'main'
// const CONTENT_PATH = 'content/services'

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  try {
    // LOCAL LOGIC:
    const filePath = path.join(rootDirectory, `${slug}.mdx`)
    const fileContent = fs.readFileSync(filePath, { encoding: 'utf8' })

    // REMOTE LOGIC (commented for reference):
    // const res = await fetch(
    //   `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${GITHUB_REPO}/refs/heads/${GITHUB_BRANCH}/${CONTENT_PATH}/${slug}.mdx`
    // )
    // const fileContent = await res.text()

    const { data, content } = matter(fileContent)

    return { metadata: { ...data, slug }, content }
  } catch {
    return null
  }
}

export async function getServices(limit?: number): Promise<ServiceMetadata[]> {
  try {
    // LOCAL LOGIC:
    const files = fs.readdirSync(rootDirectory).filter(file => file.endsWith('.mdx'))
    const services = await Promise.all(files.map(async (file: any) => await getServiceMetadata(file)))

    // REMOTE LOGIC (commented for reference):
    // const res = await fetch(`https://api.github.com/repos/${GITHUB_USERNAME}/${GITHUB_REPO}/contents/${CONTENT_PATH}`)
    // const files = await res.json()
    // // Filter only .mdx files
    // const mdxFiles = files.filter((file: any) => file.name.endsWith('.mdx'))
    // // Fetch metadata for each file
    // const services = await Promise.all(mdxFiles.map(async (file: any) => await getServiceMetadata(file.name)))

    if (limit) {
      return services.slice(0, limit)
    }

    return services
  } catch (error) {
    console.error('Error fetching services:', error)

    return []
  }
}

export async function getServiceMetadata(filepath: string): Promise<ServiceMetadata> {
  try {
    const slug = filepath.replace(/\.mdx$/, '')

    // LOCAL LOGIC:
    const filePath = path.join(rootDirectory, filepath)
    const fileContent = fs.readFileSync(filePath, { encoding: 'utf8' })

    // REMOTE LOGIC (commented for reference):
    // const res = await fetch(
    //   `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${GITHUB_REPO}/refs/heads/${GITHUB_BRANCH}/${CONTENT_PATH}/${filepath}`
    // )
    // const fileContent = await res.text()

    const { data } = matter(fileContent)

    return { ...data, slug }
  } catch (error) {
    console.error(`Error fetching metadata for ${filepath}:`, error)

    return { slug: filepath.replace(/\.mdx$/, '') }
  }
}
