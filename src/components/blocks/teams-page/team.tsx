// Next Imports
import Link from 'next/link'

// Component Imports
import ContentLayout from '@/components/layout/content-layout'
import { Card, CardContent, CardTitle, CardDescription } from '@/components/ui/card'

// SVG Imports
import GithubIcon from '@/assets/svg/github-icon'
import InstagramIcon from '@/assets/svg/instagram-icon'

export type TeamProps = {
  src: string
  title: string
  description: string
  isFeatured: boolean
  href: string
}

const Teams = ({ teamMembers }: { teamMembers: TeamProps[] }) => {
  return (
    <section className='bg-card overflow-hidden py-8 sm:py-16 lg:py-24'>
      <ContentLayout className='space-y-6'>
        {Array.from({ length: Math.ceil(teamMembers.length / 4) }).map((_, index) => (
          <div
            key={index}
            className='bg-background grid grid-cols-1 gap-6 rounded-2xl p-6 md:grid-cols-2 lg:grid-cols-4'
          >
            {teamMembers.slice(index * 4, index * 4 + 4).map((item, i) => (
              <Card
                className='group border-primary/20 hover:border-primary relative h-full border text-base shadow-none ring-0 transition-all duration-300'
                key={i}
              >
                <CardContent className='flex flex-col gap-4'>
                  <div className='group relative flex w-full flex-col items-center justify-end overflow-hidden rounded-xl'>
                    <img
                      src={item.src}
                      alt={item.title}
                      className='h-68 w-full object-cover transition-transform duration-300 group-hover:scale-105'
                    />
                  </div>
                  <div className='flex items-center justify-between'>
                    <div>
                      <CardTitle className='text-lg font-semibold'> {item.title}</CardTitle>
                      <CardDescription className='text-base'>{item.description}</CardDescription>
                    </div>
                    <div className='flex gap-2.5'>
                      <Link href='#'>
                        {' '}
                        <GithubIcon className='size-5 text-black' />{' '}
                      </Link>
                      <Link href='#'>
                        <InstagramIcon className='size-5 text-sky-600' />{' '}
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ))}
      </ContentLayout>
    </section>
  )
}

export default Teams
