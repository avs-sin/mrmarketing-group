// React Imports
import type { ReactElement } from 'react'

// Component Imports
import ContactForm from '@/components/blocks/contact-us-page/contact-form'
import ContentLayout from '@/components/layout/content-layout'
import { Card, CardContent } from '@/components/ui/card'

type ContactCard = {
  icon: ReactElement
  title: string
  ctaText: string
  ctaLink: string
}[]

const ContactUs = ({ contactCards }: { contactCards: ContactCard }) => {
  return (
    <section className='py-8 sm:py-16 lg:py-24'>
      <ContentLayout className='space-y-3'>
        <Card className='bg-background shadow-none ring-0'>
          <CardContent className='grid grid-cols-1 gap-8 md:grid-cols-3'>
            {contactCards.map((card, i) => {
              return (
                <div key={i} className='flex gap-8 lg:items-center'>
                  <div className='relative'>
                    {card.icon}
                    <span className='bg-primary/10 text-primary absolute -top-2 left-2.5 size-10 rounded-full' />
                  </div>
                  <div className='space-y-1'>
                    <h4 className='text-lg font-medium'>{card.title}</h4>
                    <p className='text-muted-foreground text-sm'>{card.ctaText}</p>
                    <p className='text-muted-foreground text-sm'>{card.ctaLink}</p>
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>

        <Card className='border shadow-none ring-0'>
          <CardContent className='grid gap-9 md:grid-cols-2'>
            <ContactForm />

            {/* Map Section */}
            <div className='rounded-xl border'>
              <iframe
                className='size-full min-h-100 rounded-xl'
                src='https://maps.google.com/maps?hl=en&q=Las%20Vegas%2C%20NV&t=&z=11&ie=UTF8&iwloc=B&output=embed'
                title='Google Maps'
              />
            </div>
          </CardContent>
        </Card>

        {/* Contact Cards */}
      </ContentLayout>
    </section>
  )
}

export default ContactUs
