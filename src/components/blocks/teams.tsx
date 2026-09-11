// Next Imports
import Link from 'next/link'

// Third-party Imports
import { IconArrowRight } from '@tabler/icons-react'

// Component Imports
import ContentLayout from '@/components/layout/content-layout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardTitle, CardDescription } from '@/components/ui/card'
import { SectionHeader } from '@/components/ui/section-header'

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
      <ContentLayout>
        {/* Header */}
        <div className='mb-12 space-y-4 text-center sm:mb-16 lg:mb-24'>
          <SectionHeader
            title='Meet Maria'
            description='Professional DJ, marketer, and Las Vegas creative. Maria Romano built MR Marketing Group from inside the nightlife and hospitality scene she serves. Follow her at @iammariaromano.'
          />
          <Button size='lg' render={<Link href='/teams' />} nativeButton={false} className='group text-base'>
            View All Members
            <IconArrowRight className='transition-transform duration-200 group-hover:translate-x-0.5' />
          </Button>
        </div>

        <div className='bg-background grid grid-cols-1 gap-6 rounded-xl p-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {teamMembers.map((item, i) => (
            <Card
              className='group border-primary/20 hover:border-primary relative h-full border text-base shadow-none ring-0 transition-all duration-300'
              key={i}
            >
              <CardContent className='flex flex-col gap-4'>
                <div className='group relative flex w-full flex-col overflow-hidden rounded-xl'>
                  <img
                    src={item.src}
                    alt={item.title}
                    className='h-68 w-full object-cover transition-transform duration-300 group-hover:scale-105'
                  />
                </div>
                <div className='flex items-center justify-between gap-2'>
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
      </ContentLayout>
    </section>
  )
}

export default Teams
