// React Imports
import type { ReactElement } from 'react'

// Next Imports
import Link from 'next/link'

// Third-party Imports
import { IconCheck, IconCircle, IconPhoneCall } from '@tabler/icons-react'

// Component Imports
import ContentLayout from '@/components/layout/content-layout'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { NumberTicker } from '@/components/ui/number-ticker'
import { SectionHeader } from '@/components/ui/section-header'
import { Separator } from '@/components/ui/separator'

// Util Imports
import { cn } from '@/lib/utils'

export type Plans = {
  icon: ReactElement
  title: string
  description: string
  price: number | string
  currency?: string
  period?: string
  buttonText: string
  features: string[]
  extraFeatures?: string[]
  isPopular?: boolean
}[]

const Pricing = ({ plans }: { plans: Plans }) => {
  return (
    <section className='bg-card relative overflow-hidden py-8 sm:py-16 lg:py-24' id='pricing'>
      <ContentLayout>
        <SectionHeader
          title='Pick Your Level of Loud.'
          description='From a single event to a full-service retainer. Every package is scoped to your venue, your calendar, and your goals.'
          className='mb-12 text-center sm:mb-16 lg:mb-24'
        />

        <div className='grid grid-cols-1 justify-center gap-6 *:h-fit md:grid-cols-2 lg:grid-cols-3'>
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={cn(
                'mx-auto w-full max-w-lg rounded-xl p-2 pb-4 shadow-none',
                index === plans.length - 1 && 'md:col-span-2 md:justify-self-center lg:col-span-1',
                {
                  'bg-muted': plan.isPopular
                }
              )}
            >
              <CardContent
                className={cn('bg-muted flex flex-col gap-6 rounded-xl p-6', {
                  'bg-card relative overflow-hidden': plan.isPopular
                })}
              >
                <div className={cn({ 'flex items-start justify-between': plan.isPopular })}>
                  <Avatar className='bg-primary/10 size-12 rounded-md after:hidden'>
                    <AvatarFallback
                      className={`${plan.isPopular ? 'bg-muted text-foreground' : 'bg-white text-black'} rounded-md`}
                    >
                      {plan.icon}
                    </AvatarFallback>
                  </Avatar>
                  {plan.isPopular && (
                    <Badge variant='destructive' className='z-10 h-auto'>
                      Trending
                    </Badge>
                  )}
                </div>

                <div className='flex-1 space-y-2.5'>
                  <h3 className='text-2xl font-semibold'>{plan.title}</h3>
                  <p className='text-base'>{plan.description}</p>
                </div>

                <p className='text-primary text-5xl font-bold'>
                  <span>{plan.currency}</span>
                  {typeof plan.price === 'number' ? <NumberTicker value={plan.price} /> : <span>{plan.price}</span>}
                  <span className='text-muted-foreground ml-0.75 text-lg font-normal'>{plan.period}</span>
                </p>

                <Button
                  size='lg'
                  render={<Link href='/contact-us' />}
                  variant={plan.isPopular ? 'default' : 'outline'}
                  className='w-full rounded-full'
                  nativeButton={false}
                >
                  {plan.buttonText}
                  {plan.isPopular && <IconPhoneCall />}
                </Button>
              </CardContent>
              <div className='space-y-6'>
                <ul className='space-y-1.5 px-4'>
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className='flex items-center gap-2 py-1 text-base'>
                      <IconCheck className='text-primary size-3.5 shrink-0' />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {plan.extraFeatures && plan.extraFeatures.length > 0 && (
                  <>
                    <Separator />
                    <ul className='px-4'>
                      {plan.extraFeatures.map((feature, featureIndex) => (
                        <li key={featureIndex} className='flex gap-2 py-1 text-base'>
                          <IconCircle className='fill-primary text-primary mt-2 size-2 shrink-0' />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </Card>
          ))}
        </div>
      </ContentLayout>
    </section>
  )
}

export default Pricing
