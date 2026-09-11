// Next Imports
import Link from 'next/link'

// Component Imports
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { MotionPreset } from '@/components/ui/motion-preset'
import { Particles } from '@/components/ui/particles'

// SVG Imports
import Rocket from '@/assets/svg/rocket'
import ShadcnLogo from '@/assets/svg/shadcn-logo'

type CardParticlesProps = {
  title?: string
  description?: string
  href?: string
}

const CardParticles = ({
  title = 'Boost Your Online Visibility',
  description = "Improve your rankings, drive traffic, and enhance your website's performance with proven SEO techniques results.",
  href
}: CardParticlesProps) => {
  const content = (
    <Card className='bg-muted h-full border shadow-none ring-0'>
      <CardContent className='py-4'>
        <MotionPreset
          fade
          slide={{ direction: 'down', offset: 50 }}
          delay={0.7}
          transition={{ duration: 0.45 }}
          className='relative flex flex-1 justify-center'
        >
          <Rocket />
          <Particles className='absolute inset-0 z-0' quantity={25} staticity={75} size={1.2} color='#808080' refresh />
          <div className='absolute bottom-18 flex items-center gap-6'>
            <span className='bg-card grid size-12 place-content-center overflow-hidden rounded-full border shadow-[4px_15px_32px_0_rgba(0,0,0,0.40)]'>
              <ShadcnLogo className='size-8' />
            </span>
            <span className='bg-card grid size-12 place-content-center overflow-hidden rounded-full border shadow-[4px_15px_32px_0_rgba(0,0,0,0.40)]'>
              <img src='/images/logos/instagram-logo.webp' alt='instagram Logo' className='size-8' />
            </span>
            <span className='bg-card grid size-12 place-content-center overflow-hidden rounded-full border shadow-[4px_15px_32px_0_rgba(0,0,0,0.40)]'>
              <img src='/images/logos/x-logo.webp' alt='x Logo' className='size-8' />
            </span>
          </div>
        </MotionPreset>
      </CardContent>
      <CardHeader className='gap-4'>
        <MotionPreset fade slide={{ direction: 'down', offset: 50 }} delay={0.85} transition={{ duration: 0.45 }}>
          <CardTitle className='text-2xl font-semibold'>{title}</CardTitle>
        </MotionPreset>
        <MotionPreset fade slide={{ direction: 'down', offset: 50 }} delay={1} transition={{ duration: 0.45 }}>
          <CardDescription className='text-lg'>{description}</CardDescription>
        </MotionPreset>
      </CardHeader>
    </Card>
  )

  return href ? (
    <Link href={href} className='block h-full'>
      {content}
    </Link>
  ) : (
    content
  )
}

export default CardParticles
