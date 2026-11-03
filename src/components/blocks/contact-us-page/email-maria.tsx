'use client'

import { useRef, useState } from 'react'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { IconCheck, IconCopy, IconMail, IconPhone } from '@tabler/icons-react'

import { buttonVariants } from '@/components/ui/button'
import { siteConfig } from '@/configs/site'
import { contactTopics, emailMariaHref, getContactTopic } from '@/lib/contact'
import { cn } from '@/lib/utils'

type CopyState = 'idle' | 'copied' | 'manual'

/** The contact action itself. `topic` comes from ?service= so service-page CTAs keep their context. */
export const EmailMariaPanel = ({ topic: topicId }: { topic?: string | null }) => {
  const topic = getContactTopic(topicId)
  const [copy, setCopy] = useState<CopyState>('idle')
  const addressRef = useRef<HTMLSpanElement>(null)

  const selectAddress = () => {
    const node = addressRef.current
    const selection = window.getSelection()

    if (!node || !selection) return

    const range = document.createRange()

    range.selectNodeContents(node)
    selection.removeAllRanges()
    selection.addRange(range)
  }

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.email)
      setCopy('copied')
    } catch {
      // Clipboard can be blocked (permissions, older browsers): select the address so a manual copy is one step
      selectAddress()
      setCopy('manual')
    }
  }

  return (
    <div
      id='inquiry'
      aria-labelledby='email-maria-heading'
      role='region'
      className='bg-background shadow-surface scroll-mt-28 rounded-2xl p-5 sm:p-8'
    >
      <h3 id='email-maria-heading' className='font-sans text-xl font-medium sm:text-2xl'>
        Email Maria about your project
      </h3>
      <p className='text-muted-foreground mt-3 leading-relaxed text-pretty'>
        Tell her about your business, what you need, and your timing. A rough idea is enough to start the
        conversation.
      </p>

      <p className='mt-5 text-sm' aria-live='polite'>
        {topic ? (
          <>
            <span className='text-muted-foreground'>Topic: </span>
            <span className='font-medium'>
              {topic.id === 'unsure' ? 'Help choosing an offering' : `${topic.label} · ${topic.descriptor}`}
            </span>
          </>
        ) : (
          <span className='text-muted-foreground'>Topic: general project inquiry</span>
        )}
      </p>

      <a
        href={emailMariaHref(topic?.id)}
        data-track='cta_email'
        data-track-location='contact_primary'
        className={cn(
          buttonVariants({ size: 'lg' }),
          'mt-4 h-12 w-full ps-5.5 pe-6 text-base active:scale-[0.96] sm:w-auto'
        )}
      >
        <IconMail aria-hidden className='size-5' /> Email Maria
      </a>
      <p className='text-muted-foreground mt-3 text-sm leading-relaxed text-pretty'>
        This opens your email app with a short outline filled in. Nothing is sent until you press send in your email
        app.
      </p>

      <div className='border-border mt-6 space-y-2 border-t pt-5'>
        <p className='text-sm font-medium'>No email app? Copy the address and write from any account.</p>
        <div className='flex flex-wrap items-center gap-x-4 gap-y-2'>
          <span ref={addressRef} className='font-medium break-all select-all'>
            {siteConfig.email}
          </span>
          <button
            type='button'
            onClick={copyAddress}
            className='hover:text-primary focus-visible:outline-primary inline-flex min-h-11 items-center gap-1.5 rounded-md text-sm font-medium underline underline-offset-4 transition-colors duration-150 focus-visible:outline-2'
          >
            {copy === 'copied' ? (
              <IconCheck aria-hidden className='size-4' />
            ) : (
              <IconCopy aria-hidden className='size-4' />
            )}
            Copy email address
          </button>
        </div>
        <p role='status' className='text-muted-foreground min-h-5 text-sm'>
          {copy === 'copied' && 'Email address copied.'}
          {copy === 'manual' && 'The address is selected. Press Ctrl+C (or ⌘C on a Mac) to copy it.'}
        </p>
      </div>

      <div className='border-border mt-4 border-t pt-5'>
        <p className='text-sm font-medium'>Prefer to talk?</p>
        <a
          href={siteConfig.phoneHref}
          data-track='cta_call_phone'
          data-track-location='contact_primary'
          className='hover:text-primary mt-1 inline-flex min-h-11 items-center gap-2 font-medium underline underline-offset-4 transition-colors duration-150'
        >
          <IconPhone aria-hidden className='size-5' /> Call {siteConfig.phone}
        </a>
      </div>

      <nav aria-label='Change the email topic' className='border-border mt-4 border-t pt-5'>
        <p className='text-sm font-medium'>Asking about something else?</p>
        <ul className='mt-3 flex flex-wrap gap-2'>
          {contactTopics.map(item => (
            <li key={item.id}>
              <Link
                href={`/contact-us?service=${item.id}#inquiry`}
                scroll={false}
                replace
                aria-current={item.id === topic?.id ? 'true' : undefined}
                className={cn(
                  'shadow-surface inline-flex min-h-10 items-center rounded-full px-3.5 text-sm transition-[background-color,box-shadow] duration-150',
                  item.id === topic?.id
                    ? 'bg-primary/10 font-medium shadow-[0_0_0_2px_var(--primary)]'
                    : 'hover:bg-primary/5'
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <p className='text-muted-foreground mt-6 text-sm'>
        How we handle your email:{' '}
        <Link href='/privacy' className='hover:text-foreground underline underline-offset-4'>
          privacy notice
        </Link>
        .
      </p>
    </div>
  )
}

/** Reads the offering from the URL (`/contact-us?service=creative#inquiry`). */
const EmailMaria = () => {
  const params = useSearchParams()

  return <EmailMariaPanel topic={params.get('service')} />
}

export default EmailMaria
