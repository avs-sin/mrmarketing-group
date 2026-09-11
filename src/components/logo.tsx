// Util Imports
import { cn } from '@/lib/utils'

type LogoComponentProps = {
  className?: string
  variant?: 'black' | 'white'
}

const Logo = ({ className, variant = 'black' }: LogoComponentProps) => {
  return (
    <div className={cn('flex items-center', className)}>
      <img
        src={variant === 'white' ? '/images/mr-marketing-logo-white.png' : '/images/mr-marketing-logo.png'}
        alt='MR Marketing Group'
        className='h-7 w-auto'
      />
      <span className='sr-only'>MR Marketing Group</span>
    </div>
  )
}

export default Logo
