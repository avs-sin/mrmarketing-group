import Link from 'next/link'

import ContentLayout from '@/components/layout/content-layout'

const AboutUs = () => (
  <section className='py-16 sm:py-24'>
    <ContentLayout className='grid items-center gap-12 lg:grid-cols-[1.3fr_0.7fr]'>
      <div>
        <p className='text-primary mb-4 text-sm tracking-widest uppercase'>The agency</p>
        <h2 className='type-display text-5xl sm:text-6xl'>Strategy meets storytelling.</h2>
        <div className='text-muted-foreground mt-7 max-w-2xl space-y-5 text-lg leading-relaxed'>
          <p>
            Mr. Marketing Group is a Las Vegas-based creative marketing agency helping businesses build distinctive
            brands, connect with their audiences, and grow. We bring strategy and storytelling together through social
            media management, cinematic content production, branding, influencer partnerships, digital advertising, and
            events.
          </p>
          <p>
            Founded by Maria Romano, MMG draws on more than a decade of experience in hospitality, nightlife, dining,
            and entertainment. That experience shapes our approach: understand the audience, capture what makes a
            business special, and create experiences people remember.
          </p>
          <p>
            From restaurants and luxury real estate to hospitality, healthcare, and professional services, we tailor
            every strategy to the brand behind it. We work as an extension of your team, bringing creative direction,
            consistent execution, and a clear purpose to every campaign.
          </p>
        </div>
        <Link href='/contact-us' className='mt-8 inline-block py-2 font-medium underline underline-offset-4'>
          Work with us
        </Link>
      </div>
      <img
        src='/images/mrmg/refined/recognition-event.webp'
        alt='Maria Romano at a recognition event'
        width={960}
        height={1344}
        loading='lazy'
        className='img-outline mx-auto w-full max-w-sm rounded-2xl'
      />
    </ContentLayout>
  </section>
)

export default AboutUs
