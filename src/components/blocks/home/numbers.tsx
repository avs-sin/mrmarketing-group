// Component Imports
import ContentLayout from '@/components/layout/content-layout'

const numbers = [
  { value: '3+', label: 'clients on retainer', note: 'Restaurants, hotels, and event brands right now.' },
  {
    value: 'LV',
    label: 'based and connected',
    note: 'Plugged into the venues, promoters, and creators that move the city.'
  },
  {
    value: '7',
    label: 'services, one team',
    note: 'Content, events, brand, social, partnerships, creative, and paid media.'
  },
  { value: '1', label: 'founder in the booth', note: 'Maria Romano, professional DJ and marketer, on every project.' }
]

const Numbers = () => {
  return (
    <section className='py-16 sm:py-24'>
      <ContentLayout>
        <div className='border-border grid grid-cols-2 border-t lg:grid-cols-4'>
          {numbers.map(n => (
            <div key={n.label} className='border-border border-t py-8 pr-6 lg:border-t-0 lg:pt-8'>
              <p className='type-display text-primary text-6xl leading-none sm:text-7xl'>{n.value}</p>
              <p className='mt-3 text-lg font-medium'>{n.label}</p>
              <p className='text-muted-foreground mt-2 text-sm leading-relaxed'>{n.note}</p>
            </div>
          ))}
        </div>
      </ContentLayout>
    </section>
  )
}

export default Numbers
