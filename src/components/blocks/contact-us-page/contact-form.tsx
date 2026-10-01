import Link from 'next/link'

import { siteConfig } from '@/configs/site'
import InquiryForm from './inquiry-form'

const mailto = (subject: string) => `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}`

const ContactForm = () => (
  <div className='min-w-0 space-y-8'>
    <div>
      <p className='text-primary mb-3 text-sm tracking-widest uppercase'>Let’s connect</p>
      <h2 className='type-display text-4xl text-balance sm:text-5xl'>Tell Maria about your brand.</h2>
      <p className='text-muted-foreground mt-5 leading-relaxed text-pretty'>
        Three quick steps: what you need, your budget and timing, and how to reach you. It goes straight to Maria.
      </p>
    </div>

    <InquiryForm />

    <div className='border-border space-y-3 border-t pt-7'>
      <h3 className='font-medium'>Prefer email or phone?</h3>
      <a
        href={mailto('Discuss a project')}
        className='hover:text-primary inline-flex min-h-11 items-center font-medium underline underline-offset-4 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4'
      >
        Email Maria
      </a>
      <p className='text-muted-foreground text-sm'>
        Opens your email app. Your inquiry is sent when you send the email.
      </p>
      <a href={mailto('Discuss a project')} className='block break-all underline underline-offset-4'>
        {siteConfig.email}
      </a>
      <a href={siteConfig.phoneHref} className='inline-block py-2 underline underline-offset-4'>
        {siteConfig.phone}
      </a>
    </div>

    {/* Not ready yet: keep them moving through the site instead of losing them */}
    <nav aria-label='Not ready yet?' className='border-border border-t pt-7'>
      <h3 className='font-medium'>Not ready yet?</h3>
      <ul className='text-muted-foreground mt-3 flex flex-wrap gap-x-6 gap-y-2'>
        <li>
          <Link
            href='/projects'
            className='hover:text-foreground underline underline-offset-4 transition-colors duration-150'
          >
            See our work
          </Link>
        </li>
        <li>
          <Link
            href='/services'
            className='hover:text-foreground underline underline-offset-4 transition-colors duration-150'
          >
            Compare offerings
          </Link>
        </li>
        <li>
          <Link
            href='/about-us'
            className='hover:text-foreground underline underline-offset-4 transition-colors duration-150'
          >
            Meet Maria
          </Link>
        </li>
      </ul>
    </nav>
  </div>
)

export default ContactForm
