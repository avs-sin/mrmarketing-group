import { siteConfig } from '@/configs/site'
import { servicePillars } from '@/assets/data/service-pillars'

const mailto = (subject: string) => `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}`

const ContactForm = () => (
  <div className='min-w-0 space-y-8'>
    <div>
      <p className='text-primary mb-3 text-sm tracking-widest uppercase'>Let’s connect</p>
      <h2 className='type-display text-4xl sm:text-5xl'>Tell Maria about your brand.</h2>
      <p className='text-muted-foreground mt-5 leading-relaxed'>
        Share what you’re building, the audience you want to reach, and the kind of support you’re looking for.
      </p>
    </div>
    <a
      href={mailto('Discuss a project')}
      className='bg-primary text-primary-foreground inline-flex min-h-12 items-center rounded-lg px-6 font-medium focus-visible:outline-2 focus-visible:outline-offset-4'
    >
      Email Maria
    </a>
    <p className='text-muted-foreground text-sm'>Opens your email app. Your inquiry is sent when you send the email.</p>
    <div className='space-y-3'>
      <a href={mailto('Discuss a project')} className='block break-all underline underline-offset-4'>
        {siteConfig.email}
      </a>
      <a href={siteConfig.phoneHref} className='inline-block py-2 underline underline-offset-4'>
        {siteConfig.phone}
      </a>
      <p className='text-muted-foreground text-sm'>
        You can also copy the email address and contact Maria from your preferred email service.
      </p>
    </div>
    <div className='border-border border-t pt-7'>
      <h3 className='mb-4 font-medium'>Have a particular offering in mind?</h3>
      <ul className='grid gap-3 sm:grid-cols-2'>
        {servicePillars.map(pillar => (
          <li key={pillar.id}>
            <a
              href={mailto(`Discuss ${pillar.name}`)}
              className='shadow-surface block rounded-lg p-4 transition-[box-shadow] duration-150 ease-out hover:shadow-[0_0_0_1px_var(--primary)] focus-visible:outline-2 focus-visible:outline-offset-2'
            >
              Discuss {pillar.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  </div>
)

export default ContactForm
