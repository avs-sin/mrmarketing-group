// Third-party Imports
import { IconCalendarEvent, IconUsers } from '@tabler/icons-react'

// Component Imports
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'

// Utils Imports
import { cn } from '@/lib/utils'

const StatisticsSalesOverviewCard = ({ className }: { className?: string }) => {
  return (
    <Card className={cn('shadow-none', className)}>
      <CardHeader className='flex flex-col gap-1'>
        <div className='flex w-full items-center justify-between gap-2'>
          <span className='text-muted-foreground text-base'>Reach Overview</span>
          <span>+18.2%</span>
        </div>
        <span className='text-2xl font-semibold'>38.5k</span>
      </CardHeader>
      <CardContent className='flex flex-col gap-4'>
        <div className='flex justify-between gap-1'>
          <div className='flex flex-1 flex-col gap-6'>
            <div className='flex items-center gap-2'>
              <div className='bg-primary/10 flex size-8 items-center justify-center rounded-sm'>
                <IconCalendarEvent className='text-primary size-4' />
              </div>
              <span className='text-base'>Reservations</span>
            </div>
            <div className='flex flex-col gap-2'>
              <span className='text-xl font-medium'>62.2%</span>
              <span className='text-muted-foreground'>6,440</span>
            </div>
          </div>
          <div className='flex flex-col items-center gap-1'>
            <Separator orientation='vertical' className='h-full max-h-9.25 self-center!' />
            <div className='bg-primary/10 text-primary flex size-8 shrink-0 items-center justify-center rounded-full'>
              <span className='text-muted-foreground'>VS</span>
            </div>
            <Separator orientation='vertical' className='h-full max-h-9.25 self-center!' />
          </div>
          <div className='flex flex-1 flex-col gap-6'>
            <div className='flex items-center justify-end gap-2'>
              <span className='text-base'>Event RSVPs</span>
              <div className='bg-primary/10 flex size-8 items-center justify-center rounded-sm'>
                <IconUsers className='text-primary size-4' />
              </div>
            </div>
            <div className='flex flex-col items-end gap-2'>
              <span className='text-xl font-medium'>25.5%</span>
              <span className='text-muted-foreground'>12,740</span>
            </div>
          </div>
        </div>
        <Progress value={60} className='*:data-[slot=progress-track]:h-1.5' />
      </CardContent>
    </Card>
  )
}

export default StatisticsSalesOverviewCard
