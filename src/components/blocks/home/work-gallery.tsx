import ContentLayout from '@/components/layout/content-layout'
import manifest from '@/assets/data/media-manifest.json'
import { MediaCard } from './media-card'

export const WorkGallery = () => (
  <section id='work' className='py-16 sm:py-24'>
    <ContentLayout>
      <div className='mb-12 flex flex-col justify-between gap-6 sm:flex-row sm:items-end'>
        <div>
          <p className='text-primary mb-4 text-sm tracking-widest uppercase'>Selected work</p>
          <h2 className='type-display text-5xl tracking-tight sm:text-7xl'>Work you can see.</h2>
        </div>
        <p className='text-muted-foreground max-w-sm leading-relaxed'>
          Real people. Real places. Stories shaped for the way audiences watch and connect.
        </p>
      </div>
      <div className='grid gap-8 md:grid-cols-3'>
        {['restaurant-production', 'restaurant-collaboration', 'community-event'].map(id => {
          const asset = manifest.find(item => item.id === id)

          return asset ? <MediaCard key={id} asset={{ ...asset, kind: 'video' }} /> : null
        })}
      </div>
      <p className='text-muted-foreground mt-8 text-sm'>Selected past work. Play a film to hear the story.</p>
    </ContentLayout>
  </section>
)
