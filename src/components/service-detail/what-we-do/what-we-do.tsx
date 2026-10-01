import type { ServiceWhatWeDoItem } from '@/lib/services'
import ContentLayout from '@/components/layout/content-layout'
import { SectionHeader } from '@/components/ui/section-header'

type WhatWeDoProps = { badge?: string; title?: string; description?: string; items?: ServiceWhatWeDoItem[] }

const WhatWeDo = ({ badge, title, description, items = [] }: WhatWeDoProps) => (
  <section className='bg-card py-16 sm:py-24'>
    <ContentLayout>
      <SectionHeader badge={badge} title={title} description={description} />
      <div className='mt-12 grid gap-5 md:grid-cols-3'>
        {items.map((item, index) => (
          <article key={item.title} className='bg-background shadow-surface rounded-2xl p-7'>
            <p className='text-primary text-sm'>0{index + 1}</p>
            <h3 className='mt-5 text-xl font-medium'>{item.title}</h3>
            <p className='text-muted-foreground mt-4 leading-relaxed'>{item.description}</p>
          </article>
        ))}
      </div>
    </ContentLayout>
  </section>
)

export default WhatWeDo
