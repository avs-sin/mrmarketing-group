// Third-party Imports
import fs from 'fs' // Comment this line if using remote fetching

import path from 'path' // Comment this line if using remote fetching

import matter from 'gray-matter'

export type Project = {
  metadata: ProjectMetadata
  content: string
}

export type ProjectMetadata = {
  slug: string
  title?: string
  description?: string
  isFeatured?: boolean
  category?: string
  industry?: string
  timeline?: string
  liveWebsite?: string
  releaseDate?: string
  tools?: string[]
  image?: string
  keywords?: string[]

  /** Offering ids (see service-pillars) behind this work */
  services?: string[]

  /** media-manifest id of a film to play on the project page */
  video?: string
}

// local content directory (comment below line if using remote fetching)
const rootDirectory = path.join(process.cwd(), 'src', 'content', 'project')

// Remote repository details
// const GITHUB_USERNAME = 'yourusername'
// const GITHUB_REPO = 'reponame'
// const GITHUB_BRANCH = 'main'
// const CONTENT_PATH = 'content/project'

export async function getProjectBySlug(slug: string): Promise<Project | null> {
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

export async function getProjects(limit?: number): Promise<ProjectMetadata[]> {
  try {
    // LOCAL LOGIC:
    const files = fs.readdirSync(rootDirectory).filter(file => file.endsWith('.mdx'))
    const projects = await Promise.all(files.map(async (file: any) => await getProjectMetadata(file)))

    // REMOTE LOGIC (commented for reference):
    // const res = await fetch(`https://api.github.com/repos/${GITHUB_USERNAME}/${GITHUB_REPO}/contents/${CONTENT_PATH}`)
    // const files = await res.json()
    // // Filter only .mdx files
    // const mdxFiles = files.filter((file: any) => file.name.endsWith('.mdx'))
    // // Fetch metadata for each file
    // const projects = await Promise.all(mdxFiles.map(async (file: any) => await getProjectMetadata(file.name)))

    // Featured first, then newest release date, then title. A consistent comparator keeps the order stable even
    // when projects have no releaseDate (the old one always returned -1, so order depended on the file system).
    const releaseTime = (project: ProjectMetadata) => {
      const time = Date.parse(project.releaseDate ?? '')

      return Number.isNaN(time) ? 0 : time
    }

    const sortedProjects = projects.sort(
      (a, b) =>
        Number(Boolean(b.isFeatured)) - Number(Boolean(a.isFeatured)) ||
        releaseTime(b) - releaseTime(a) ||
        (a.title ?? a.slug).localeCompare(b.title ?? b.slug)
    )

    if (limit) {
      return sortedProjects.slice(0, limit)
    }

    return sortedProjects
  } catch (error) {
    console.error('Error fetching projects:', error)

    return []
  }
}

export async function getProjectMetadata(filepath: string): Promise<ProjectMetadata> {
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
