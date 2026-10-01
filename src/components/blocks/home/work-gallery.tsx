import ContentLayout from '@/components/layout/content-layout'
import manifest from '@/assets/data/media-manifest.json'
import { Eyebrow } from './eyebrow'
import { MediaCard } from './media-card'

const workIds = ['restaurant-production', 'restaurant-collaboration', 'community-event']

export const WorkGallery = () => (
  <section id='work' className='scroll-mt-28 py-16 sm:py-24 lg:py-32'>
    <ContentLayout>
      <div className='mb-8 flex flex-col justify-between gap-5 sm:mb-12 lg:flex-row lg:items-end'>
        <div>
          <Eyebrow>Selected work</Eyebrow>
          <h2 className='type-display text-5xl tracking-tight text-balance sm:text-7xl'>Work you can see.</h2>
        </div>
        <p className='text-muted-foreground max-w-sm leading-relaxed text-pretty'>
          Real people. Real places. Stories shaped for the way audiences watch and connect.
        </p>
      </div>
    </ContentLayout>
    {/*
      Below md the films sit in a manual scroll-snap rail (peeking next card) instead of stacking three
      full-height portrait frames. Nothing auto-advances. md and up returns to a three-column grid.
    */}
    <div className='mx-auto w-full max-w-7xl md:px-6 lg:px-8'>
      <ul
        aria-label='Selected films'
        className='flex snap-x snap-mandatory scroll-px-4 [scrollbar-width:none] gap-4 overflow-x-auto px-4 pb-4 sm:scroll-px-6 sm:px-6 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0 md:pb-0 lg:gap-8 [&::-webkit-scrollbar]:hidden'
      >
        {workIds.map(id => {
          const asset = manifest.find(item => item.id === id)

          return asset ? (
            <li key={id} className='w-[72vw] max-w-[18rem] shrink-0 snap-start md:w-auto md:max-w-none'>
              <MediaCard asset={{ ...asset, kind: 'video' }} />
            </li>
          ) : null
        })}
      </ul>
    </div>
    <ContentLayout>
      <p className='text-muted-foreground mt-4 text-sm text-pretty md:mt-8'>
        <span className='md:hidden'>Swipe for more films. </span>Selected past work. Play a film to hear the story.
      </p>
    </ContentLayout>
  </section>
)
