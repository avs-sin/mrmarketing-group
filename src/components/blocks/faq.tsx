// Component Imports
import ContentLayout from '@/components/layout/content-layout'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { SectionHeader } from '@/components/ui/section-header'
import Handoff from '@/components/blocks/funnel/handoff'
import { inquiryHref } from '@/lib/funnel'

// Util Imports
import { cn } from '@/lib/utils'

export type FAQs = {
  question: string
  answer: string
}[]

const Faq = ({ faqItems, background }: { faqItems: FAQs; background?: string }) => {
  const halfLength = Math.ceil(faqItems.length / 2)
  const firstHalf = faqItems.slice(0, halfLength)
  const secondHalf = faqItems.slice(halfLength)

  return (
    <section className={cn('py-8 sm:py-16 lg:py-24', background)}>
      <ContentLayout>
        {/* FAQ Header */}

        <SectionHeader
          title='A Few Things to Know'
          description='Straight answers about how Mr. Marketing Group works.'
          className='mb-12 sm:mb-16 lg:mb-24'
        />

        <div className='grid grid-cols-1 gap-x-16 gap-y-6 lg:grid-cols-2'>
          {/* Left Accordion */}
          <div>
            <Accordion
              className='shadow-surface w-full overflow-hidden rounded-lg border-0 [&>*>[data-slot="accordion-content"]]:px-0'
              defaultValue={['item-1']}
            >
              {firstHalf.map((item, index) => (
                <AccordionItem key={index} value={`item-${index + 1}`} className='data-open:bg-transparent'>
                  <AccordionTrigger className='px-2.5 font-sans text-base font-medium sm:text-lg'>
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className='text-muted-foreground px-2.5 text-base'>{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          {/* Right Accordion */}
          <div>
            <Accordion className='shadow-surface w-full overflow-hidden rounded-lg border-0 [&>*>[data-slot="accordion-content"]]:px-0'>
              {secondHalf.map((item, index) => (
                <AccordionItem key={index} value={`item-${index + 1}`}>
                  <AccordionTrigger className='px-2.5 font-sans text-base font-medium sm:text-lg'>
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className='text-muted-foreground px-2.5 text-base'>{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
        <Handoff
          className='mt-12 items-center text-center sm:mt-16 [&>div]:justify-center'
          location='faq'
          lead='Still deciding? Maria can tailor a proposal to your brand.'
          primary={{ label: 'Start a project', href: inquiryHref() }}
          secondary={{ label: 'See our work', href: '/projects' }}
        />
      </ContentLayout>
    </section>
  )
}

export default Faq
