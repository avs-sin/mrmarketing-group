import Link from 'next/link'

import ContentLayout from '@/components/layout/content-layout'

const HeroSection = () => (
  <section className='bg-card pt-36 pb-14 sm:pt-44 lg:pt-52'>
    <ContentLayout>
      <p className='text-primary mb-5 text-sm tracking-widest uppercase'>About Mr. Marketing Group</p>
      <h1 className='type-display max-w-4xl text-6xl leading-[1.05] sm:text-8xl'>
        Built on connection.
        <br />
        Driven by creative.
      </h1>
      <p className='text-muted-foreground mt-6 max-w-2xl text-lg leading-relaxed'>
        A Las Vegas creative marketing agency, founded by Maria Romano.
      </p>
      <Link href='/contact-us#inquiry' className='mt-7 inline-block py-3 font-medium underline underline-offset-4'>
        Start a project
      </Link>
    </ContentLayout>
  </section>
)

export default HeroSection
