// Next Imports
import Link from 'next/link'

// Third-party Imports
import { IconPhoneCall } from '@tabler/icons-react'

// Component Imports
import ContentLayout from '@/components/layout/content-layout'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

// SVG Imports
import Ellips from '@/assets/svg/ellipse'

const CTASection = () => {
  return (
    <section className='bg-card py-8 sm:py-16 lg:py-24'>
      <ContentLayout>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <Card className='bg-muted border-primary/50 relative rounded-[24px] border py-8 shadow-none ring-0 md:py-16 lg:py-24'>
            <CardContent className='relative z-10 px-4 md:px-6 lg:px-8'>
              <div className='flex flex-col items-center gap-4 text-center'>
                <h2 className='text-3xl font-semibold'>Let&apos;s Build Something.</h2>

                <p className='text-muted-foreground max-w-3xl text-base'>
                  Ready to elevate your brand in Las Vegas? Whether you&apos;re a restaurant, venue, or entertainment
                  brand, we&apos;re ready to get to work.
                </p>

                <Button size='lg' render={<Link href='/contact-us' />} nativeButton={false}>
                  Start a Project <IconPhoneCall />
                </Button>
              </div>
            </CardContent>

            <div className='absolute -top-120 -left-86'>
              <Ellips />
            </div>

            <div className='absolute -top-110 -right-110 rotate-20'>
              <Ellips />
            </div>

            <div className='absolute -right-90 -bottom-125 -rotate-200'>
              <Ellips />
            </div>

            <div className='absolute -bottom-115 -left-110 -rotate-135'>
              <Ellips />
            </div>
          </Card>
        </div>
      </ContentLayout>
    </section>
  )
}

export default CTASection
