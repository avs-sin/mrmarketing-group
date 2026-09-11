// React Imports
import { type ReactElement } from 'react'

// Component Imports
import ContentLayout from '@/components/layout/content-layout'
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'
import { NumberTicker } from '@/components/ui/number-ticker'
import { SectionHeader } from '@/components/ui/section-header'

export type socialProps = {
  icon: ReactElement
  numbers: string
  subTitle: string
  description: string
}

const SocialProof = ({ socialData }: { socialData: socialProps[] }) => {
  return (
    <section className='bg-card py-8 sm:py-16 lg:py-24'>
      <ContentLayout>
        <SectionHeader
          badge='By the Numbers'
          title='Based in Vegas. Built for the Room.'
          description='Founded by Maria Romano, professional DJ, marketer, and Las Vegas creative. We bring an insider understanding of the city to every project.'
          className='mb-12 sm:mb-16 lg:mb-24'
        />

        <div className='grid grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-4'>
          {socialData.map((data, index) => {
            const numericValue = parseFloat(data.numbers)
            const suffix = data.numbers.replace(/^[\d.,]+/, '')

            return (
              <div key={index} className='flex flex-col gap-6'>
                <Card className='w-full rounded-lg border border-dashed shadow-none ring-0'>
                  <CardContent className='flex flex-col gap-8 lg:flex-row lg:items-center'>
                    <div className='relative [&>svg]:size-10 [&>svg]:stroke-[1.5]'>
                      {data.icon}
                      <span className='bg-primary/10 text-primary absolute -top-2 left-2.5 size-12 rounded-full' />
                    </div>
                    <div className=''>
                      <CardTitle className='text-primary text-4xl font-medium md:text-5xl'>
                        {Number.isNaN(numericValue) ? (
                          data.numbers
                        ) : (
                          <>
                            <NumberTicker value={numericValue} stiffness={150} />
                            {suffix}
                          </>
                        )}
                      </CardTitle>
                      <CardDescription className='text-foreground text-lg font-normal'>{data.subTitle}</CardDescription>
                    </div>
                  </CardContent>
                </Card>
                <p className='text-muted-foreground text-xl'>{data.description}</p>
              </div>
            )
          })}
        </div>
      </ContentLayout>
    </section>
  )
}

export default SocialProof
