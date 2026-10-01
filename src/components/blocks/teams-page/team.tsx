import Link from 'next/link'

import ContentLayout from '@/components/layout/content-layout'
import type { TeamProps } from '@/components/blocks/teams'

const Teams = ({ teamMembers }: { teamMembers: TeamProps[] }) => (
  <section className='bg-card py-16 sm:py-24'>
    <ContentLayout>
      {teamMembers.map(member => (
        <div key={member.title} className='grid items-center gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20'>
          <img
            src={member.src}
            alt='Maria Romano seated, smiling at the camera'
            width={960}
            height={1440}
            loading='lazy'
            className='mx-auto w-full max-w-sm rounded-2xl'
          />
          <div>
            <p className='text-primary mb-4 text-sm tracking-widest uppercase'>Our founder</p>
            <h2 className='type-display text-5xl sm:text-7xl'>{member.title}</h2>
            <p className='mt-4 text-lg font-medium'>{member.description}</p>
            <div className='text-muted-foreground mt-7 max-w-2xl space-y-5 text-lg leading-relaxed'>
              <p>
                Maria Romano is the founder of Mr. Marketing Group, a creative marketing agency based in Las Vegas. With
                more than a decade of experience in nightlife, hospitality, dining, and entertainment, she brings a
                firsthand understanding of what draws people to a brand - and keeps them coming back.
              </p>
              <p>
                As an entrepreneur and open-format DJ, Maria has built her career around connecting with people. Her
                ability to read an audience shapes her approach to marketing, combining thoughtful strategy, cinematic
                content, and experiences that give brands a distinct identity.
              </p>
              <p>
                Through Mr. Marketing Group and its creator program, The Mr. Collective, Maria brings businesses and
                creatives together to tell compelling stories. She stays closely involved in the creative process,
                helping turn each client&#x27;s vision into a brand presence that feels authentic, polished, and
                memorable.
              </p>
            </div>
            <Link
              href={member.href}
              target='_blank'
              rel='noopener noreferrer'
              className='mt-7 inline-block py-2 underline underline-offset-4'
            >
              Maria on Instagram
            </Link>
          </div>
        </div>
      ))}
    </ContentLayout>
  </section>
)

export default Teams
