'use client'

// React Imports
import { useEffect, useState } from 'react'

// Third-party Imports
import Autoplay from 'embla-carousel-autoplay'

// Component Imports
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi
} from '@/components/ui/carousel'
import { SectionHeader } from '@/components/ui/section-header'

// Util Imports
import { cn } from '@/lib/utils'

export type TestimonialItem = {
  avatar: string
  name: string
  role: string
  company: string
  content: string
  className: string
}

const TestimonialsComponent = ({ testimonials }: { testimonials: TestimonialItem[] }) => {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!api) {
      return
    }

    const handleResize = () => {
      setCount(api.scrollSnapList().length)
    }

    window.addEventListener('resize', handleResize)
    handleResize()
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrent(api.selectedScrollSnap())

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap())
    })

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [api])

  return (
    <section className='py-8 sm:py-16 lg:py-24'>
      <Carousel
        className='mx-auto max-w-7xl space-y-12 px-4 sm:space-y-16 sm:px-6 lg:space-y-24 lg:px-8'
        opts={{
          align: 'start'
        }}
        plugins={[
          Autoplay({
            delay: 2000,
            stopOnInteraction: false,
            stopOnFocusIn: false
          })
        ]}
        setApi={setApi}
      >
        <div className='flex justify-between gap-4 gap-x-11 max-sm:flex-col sm:items-center'>
          <SectionHeader
            title='As Seen and Heard In'
            description='Coverage of Maria Romano and MR Marketing Group across Las Vegas media and podcasts.'
            className='items-start text-left'
          />

          <div className='flex items-center gap-7'>
            <CarouselPrevious
              size='icon-lg'
              variant='default'
              className='disabled:bg-primary/10 disabled:text-primary static translate-y-0 disabled:opacity-100'
            />
            <CarouselNext
              size='icon-lg'
              variant='default'
              className='disabled:bg-primary/10 disabled:text-primary static translate-y-0 disabled:opacity-100'
            />
          </div>
        </div>

        {/* Right Testimonial Carousel */}

        <CarouselContent className='py-3'>
          {testimonials.map((testimonial, index) => (
            <CarouselItem key={index} className='sm:basis-1/2 sm:pl-6 md:basis-1/3 lg:basis-1/4'>
              <Card
                className={cn(
                  'h-full py-6 shadow-none ring-0 transition-all duration-300',
                  testimonial.className,
                  index % 2 === 0 ? 'hover:rotate-0 sm:-rotate-2' : 'hover:rotate-0 sm:rotate-1'
                )}
              >
                <CardContent className='space-y-6 px-6'>
                  <div className='flex gap-2'>
                    <Avatar size='lg'>
                      <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                      <AvatarFallback className='text-xs'>{testimonial.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className='space-y-0.5'>
                      <h4 className='text-base font-medium'>{testimonial.name}</h4>
                      <p className='text-muted-foreground text-xs'>
                        {testimonial.role} at{' '}
                        <span className='text-card-foreground font-semibold'>{testimonial.company}</span>
                      </p>
                    </div>
                  </div>
                  <p className='text-muted-foreground text-base'>&quot;{testimonial.content}&quot;</p>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className='flex items-center justify-center gap-1'>
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              className={cn(
                'size-2.5 cursor-pointer rounded-full transition-colors',
                index === current ? 'bg-primary' : 'bg-primary/20'
              )}
              onClick={() => api?.scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </Carousel>
    </section>
  )
}

export default TestimonialsComponent
