import { Suspense } from 'react'

import Link from 'next/link'

import EmailMaria, { EmailMariaPanel } from './email-maria'

const ContactForm = () => (
  <div className='min-w-0 space-y-8'>
    <div>
      <p className='text-primary mb-3 text-sm tracking-widest uppercase'>Let’s connect</p>
      <h2 className='type-display text-4xl text-balance sm:text-5xl'>Tell Maria about your brand.</h2>
      <p className='text-muted-foreground mt-5 leading-relaxed text-pretty'>
        The simplest way to start is an email to Maria. Share what you are working on, and she can reply with the
        right next step.
      </p>
    </div>

    {/* Static render shows the general topic; the URL's ?service= fills in once the page hydrates */}
    <Suspense fallback={<EmailMariaPanel />}>
      <EmailMaria />
    </Suspense>

    {/* Not ready yet: keep them moving through the site instead of losing them */}
    <nav aria-label='Not ready yet?' className='border-border border-t pt-7'>
      <h3 className='font-medium'>Not ready yet?</h3>
      <ul className='text-muted-foreground mt-3 flex flex-wrap gap-x-6 gap-y-2'>
        <li>
          <Link
            href='/projects'
            className='hover:text-foreground inline-flex min-h-11 items-center underline underline-offset-4 transition-colors duration-150'
          >
            See our work
          </Link>
        </li>
        <li>
          <Link
            href='/services'
            className='hover:text-foreground inline-flex min-h-11 items-center underline underline-offset-4 transition-colors duration-150'
          >
            Compare offerings
          </Link>
        </li>
        <li>
          <Link
            href='/about-us'
            className='hover:text-foreground inline-flex min-h-11 items-center underline underline-offset-4 transition-colors duration-150'
          >
            Meet Maria
          </Link>
        </li>
      </ul>
    </nav>
  </div>
)

export default ContactForm
