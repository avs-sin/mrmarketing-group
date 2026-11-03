// Component Imports
import ContactForm from '@/components/blocks/contact-us-page/contact-form'
import ContentLayout from '@/components/layout/content-layout'
import { Card, CardContent } from '@/components/ui/card'
import type { ContactCard } from '@/assets/data/contact-us'

const ContactUs = ({ contactCards }: { contactCards: ContactCard[] }) => {
  return (
    <section className='py-8 sm:py-16 lg:py-24'>
      <ContentLayout className='space-y-3'>
        <Card className='bg-background shadow-none ring-0'>
          <CardContent>
            <ul className='grid grid-cols-1 gap-8 md:grid-cols-3'>
              {contactCards.map(card => (
                <li key={card.title} className='flex gap-8 lg:items-center'>
                  <div aria-hidden className='relative'>
                    {card.icon}
                    <span className='bg-primary/10 text-primary absolute -top-2 left-2.5 size-10 rounded-full' />
                  </div>
                  <div className='min-w-0 space-y-1'>
                    <h2 className='font-sans text-lg font-medium'>{card.title}</h2>
                    <a
                      href={card.href}
                      {...(card.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className='hover:text-primary inline-block py-1 text-sm font-medium break-all underline underline-offset-4 transition-colors duration-150'
                    >
                      {card.label}
                    </a>
                    <p className='text-muted-foreground text-sm'>{card.note}</p>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className='shadow-surface ring-0'>
          <CardContent className='grid gap-9 md:grid-cols-2'>
            <ContactForm />

            <figure className='mx-auto w-full max-w-sm self-center'>
              <img
                src='/images/mrmg/refined/founder-alternate.webp'
                alt='Maria Romano seated in a bright interior'
                width={960}
                height={1440}
                loading='lazy'
                className='img-outline w-full rounded-xl'
              />
              <figcaption className='text-muted-foreground mt-4 text-sm'>
                Maria Romano · Founder, Mr. Marketing Group
              </figcaption>
            </figure>
          </CardContent>
        </Card>
      </ContentLayout>
    </section>
  )
}

export default ContactUs
