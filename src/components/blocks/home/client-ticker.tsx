// Component Imports
import { Marquee } from '@/components/ui/marquee'

const clients = [
  "Chef's Roma Kitchen",
  'Tuscan Cove Bar + Patio',
  'Saffron Lounge',
  'MADE Events',
  'Past Curfew',
  'Otonomus Hotel',
  'Las Vegas Nightlife'
]

const ClientTicker = () => {
  return (
    <div className='bg-primary text-primary-foreground border-y border-black/20' aria-label='Clients'>
      <Marquee duration={36} gap={0} repeat={3} className='p-0 py-3'>
        {clients.map(name => (
          <span
            key={name}
            className='type-display flex items-center gap-6 px-3 text-2xl tracking-wide whitespace-nowrap'
          >
            {name}
            <span aria-hidden className='text-base'>
              ✦
            </span>
          </span>
        ))}
      </Marquee>
    </div>
  )
}

export default ClientTicker
