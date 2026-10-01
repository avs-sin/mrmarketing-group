import { IconArrowUpRight } from '@tabler/icons-react'

import ContentLayout from '@/components/layout/content-layout'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import type { FAQs } from '@/components/blocks/faq'
import { siteConfig } from '@/configs/site'
import { Eyebrow } from './eyebrow'

/** Homepage FAQ: editorial split layout with one accordion, matching the rest of the page's left-aligned rhythm. */
export const HomeFaq = ({ faqItems }: { faqItems: FAQs }) => (
  <section className='py-16 sm:py-24 lg:py-32'>
    <ContentLayout className='grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24'>
      <div className='lg:sticky lg:top-32 lg:self-start'>
        <Eyebrow>Questions</Eyebrow>
        <h2 className='type-display text-5xl tracking-tight text-balance sm:text-7xl'>A few things to know.</h2>
        <p className='text-muted-foreground mt-5 max-w-sm text-lg text-pretty'>
          Straight answers about how Mr. Marketing Group works.
        </p>
        <a
          href={`mailto:${siteConfig.email}?subject=${encodeURIComponent('A question for Maria')}`}
          className='group hover:text-primary focus-visible:outline-primary mt-6 inline-flex items-center gap-2 rounded-md py-2 font-medium underline underline-offset-8 transition-colors focus-visible:outline-2'
        >
          Ask Maria directly
          <IconArrowUpRight
            aria-hidden
            className='size-5 transition-[translate] duration-150 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5'
          />
        </a>
      </div>
      <Accordion
        className='rounded-none border-0 border-t [&_[data-slot=accordion-content]]:px-0'
        defaultValue={['faq-0']}
      >
        {faqItems.map((item, index) => (
          <AccordionItem key={item.question} value={`faq-${index}`} className='border-b data-open:bg-transparent'>
            <AccordionTrigger className='hover:text-primary py-6 pr-0 pl-0 font-sans text-lg font-medium hover:no-underline **:data-[slot=accordion-trigger-icon]:size-5 sm:text-xl'>
              {item.question}
            </AccordionTrigger>
            <AccordionContent className='text-muted-foreground max-w-2xl pb-6 text-base leading-relaxed'>
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </ContentLayout>
  </section>
)
