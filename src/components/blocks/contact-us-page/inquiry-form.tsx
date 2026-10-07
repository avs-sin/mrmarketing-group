'use client'

import { useEffect, useRef, useState, useSyncExternalStore, type FormEvent } from 'react'

import { IconArrowLeft, IconArrowRight, IconCheck, IconCircleCheck, IconMail } from '@tabler/icons-react'

import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { siteConfig } from '@/configs/site'
import {
  budgetOptions,
  emptyInquiry,
  inquirySubject,
  limits,
  inquiryText,
  serviceOptions,
  stepFields,
  timelineOptions,
  validateInquiry,
  type Inquiry,
  type InquiryErrors
} from '@/lib/inquiry'
import { cn } from '@/lib/utils'

const steps = ['Your focus', 'Budget & timing', 'About you']

type Outcome = { kind: 'sent' } | { kind: 'fallback'; reason: 'not_configured' | 'failed' }

const optionClass =
  'shadow-surface has-checked:bg-primary/5 has-checked:shadow-[0_0_0_2px_var(--primary)] has-focus-visible:outline-primary relative flex cursor-pointer items-start rounded-xl py-3.5 ps-4 pe-9 transition-[box-shadow,background-color] duration-150 ease-out has-focus-visible:outline-2 has-focus-visible:outline-offset-2'

const ChoiceGroup = ({
  name,
  legend,
  options,
  value,
  error,
  onChange,
  columns
}: {
  name: keyof Inquiry
  legend: string
  options: readonly { value: string; label: string; hint?: string }[]
  value: string
  error?: string
  onChange: (value: string) => void
  columns: string
}) => (
  <fieldset aria-describedby={error ? `${name}-error` : undefined} aria-invalid={Boolean(error)}>
    <legend className='mb-3 font-medium'>{legend}</legend>
    <div className={cn('grid gap-3', columns)}>
      {options.map(option => (
        <label key={option.value} className={optionClass}>
          <input
            type='radio'
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={() => onChange(option.value)}
            className='sr-only'
          />
          <span className='min-w-0 flex-1'>
            <span className='block text-sm font-medium'>{option.label}</span>
            {option.hint && <span className='text-muted-foreground mt-1 block text-sm'>{option.hint}</span>}
          </span>
          {/* Static selected cue alongside the ring */}
          <IconCheck
            aria-hidden
            className={cn(
              'text-primary absolute top-4 right-3.5 size-4 transition-opacity duration-150',
              value !== option.value && 'opacity-0'
            )}
          />
        </label>
      ))}
    </div>
    {error && (
      <p id={`${name}-error`} className='text-destructive mt-2 text-sm'>
        {error}
      </p>
    )}
  </fieldset>
)

const subscribe = () => () => {}

// Links like /contact-us?service=social#inquiry preselect an offering (read without a hydration mismatch)
const readPrefill = () => {
  const service = new URLSearchParams(window.location.search).get('service') ?? ''

  return serviceOptions.some(option => option.value === service) ? service : ''
}

const InquiryForm = () => {
  const [step, setStep] = useState(0)
  const [answers, setInquiry] = useState<Inquiry>(emptyInquiry)
  const [errors, setErrors] = useState<InquiryErrors>({})
  const [submitting, setSubmitting] = useState(false)
  const [outcome, setOutcome] = useState<Outcome | null>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const moved = useRef(false)
  const prefill = useSyncExternalStore(subscribe, readPrefill, () => '')
  const inquiry: Inquiry = { ...answers, service: answers.service || prefill }

  // Move focus to the new step's heading so screen readers announce it (skip the initial render)
  useEffect(() => {
    if (moved.current) headingRef.current?.focus()
  }, [step, outcome])

  const update = (field: keyof Inquiry) => (value: string) => {
    setInquiry(current => ({ ...current, [field]: value }))
    setErrors(current => ({ ...current, [field]: undefined }))
  }

  const goTo = (next: number) => {
    moved.current = true
    setStep(next)
  }

  const checkStep = () => {
    const stepErrors = validateInquiry(inquiry, stepFields[step])

    setErrors(stepErrors)

    if (Object.keys(stepErrors).length) {
      document.getElementById(`${Object.keys(stepErrors)[0]}-field`)?.focus()

      return false
    }

    return true
  }

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!checkStep()) return
    if (step < steps.length - 1) return goTo(step + 1)

    const honeypot = new FormData(event.currentTarget).get('website')

    setSubmitting(true)

    try {
      const response = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...inquiry, website: honeypot })
      })

      const data = (await response.json().catch(() => ({}))) as { status?: string; errors?: InquiryErrors }

      moved.current = true

      if (response.ok && data.status === 'sent') setOutcome({ kind: 'sent' })
      else if (response.status === 400 && data.errors && Object.keys(data.errors).length) {
        setErrors(data.errors)

        // Never land on a step that doesn't exist (which used to strand the visitor on an empty form)
        setStep(
          Math.max(
            0,
            stepFields.findIndex(fields => fields.some(field => data.errors?.[field]))
          )
        )
      } else setOutcome({ kind: 'fallback', reason: data.status === 'not_configured' ? 'not_configured' : 'failed' })
    } catch {
      moved.current = true
      setOutcome({ kind: 'fallback', reason: 'failed' })
    } finally {
      setSubmitting(false)
    }
  }

  const mailtoWithAnswers = `mailto:${siteConfig.email}?subject=${encodeURIComponent(inquirySubject(inquiry))}&body=${encodeURIComponent(inquiryText(inquiry))}`

  if (outcome?.kind === 'sent') {
    return (
      <div role='status' className='bg-background shadow-surface rounded-2xl p-6 sm:p-8'>
        <IconCircleCheck aria-hidden className='text-primary size-10' />
        <h3 ref={headingRef} tabIndex={-1} className='mt-5 font-sans text-2xl font-medium outline-none'>
          Sent to Maria
        </h3>
        <p className='text-muted-foreground mt-3 leading-relaxed'>
          Thanks, {inquiry.name.split(' ')[0]}. Your inquiry is in Maria’s inbox, and she’ll reply to{' '}
          <span className='text-foreground font-medium break-all'>{inquiry.email}</span>.
        </p>
      </div>
    )
  }

  if (outcome?.kind === 'fallback') {
    return (
      <div role='status' className='bg-background shadow-surface rounded-2xl p-6 sm:p-8'>
        <h3 ref={headingRef} tabIndex={-1} className='font-sans text-2xl font-medium outline-none'>
          Send it from your email instead
        </h3>
        <p className='text-muted-foreground mt-3 leading-relaxed'>
          {outcome.reason === 'not_configured'
            ? 'Online sending isn’t switched on yet, so your inquiry has not been sent.'
            : 'We couldn’t send your inquiry just now, so it has not been sent.'}{' '}
          Open it in your email app with your answers already filled in, then press send.
        </p>
        <div className='mt-6 flex flex-col gap-3 sm:flex-row sm:items-center'>
          {/* A real link (not role=button) so it is announced as opening email */}
          <a
            href={mailtoWithAnswers}
            data-track='inquiry_fallback_email'
            className={cn(buttonVariants({ size: 'lg' }), 'h-12 ps-5.5 pe-6 text-base active:scale-[0.96]')}
          >
            <IconMail aria-hidden className='size-5' /> Open email with my answers
          </a>
          <button
            type='button'
            onClick={() => setOutcome(null)}
            className='text-muted-foreground hover:text-foreground h-12 rounded-full px-2 text-sm underline underline-offset-4 transition-colors duration-150'
          >
            Back to the form
          </button>
        </div>
        <p className='text-muted-foreground mt-5 text-sm'>
          Or email Maria directly:
          <span className='text-foreground mt-1 block'>{siteConfig.email}</span>
        </p>
      </div>
    )
  }

  return (
    <form
      id='inquiry'
      noValidate
      onSubmit={onSubmit}
      aria-labelledby='inquiry-step-heading'
      className='bg-background shadow-surface relative scroll-mt-28 rounded-2xl p-4 sm:p-8'
    >
      <div className='mb-6'>
        <p className='text-muted-foreground text-sm'>
          Step {step + 1} of {steps.length}
        </p>
        <ol aria-hidden className='mt-3 grid grid-cols-3 gap-2'>
          {steps.map((label, i) => (
            <li key={label}>
              <span
                className={cn(
                  'block h-1 rounded-full transition-[background-color] duration-200',
                  i <= step ? 'bg-primary' : 'bg-border'
                )}
              />
              <span
                className={cn('mt-2 hidden text-xs sm:block', i === step ? 'font-medium' : 'text-muted-foreground')}
              >
                {label}
              </span>
            </li>
          ))}
        </ol>
        <h3
          id='inquiry-step-heading'
          ref={headingRef}
          tabIndex={-1}
          className='mt-5 font-sans text-xl font-medium outline-none sm:text-2xl'
        >
          {['What can Maria help with?', 'Budget and timing', 'How can Maria reach you?'][step]}
        </h3>
      </div>

      {step === 0 && (
        <ChoiceGroup
          name='service'
          legend='Choose an offering'
          options={serviceOptions}
          value={inquiry.service}
          error={errors.service}
          onChange={update('service')}
          columns='sm:grid-cols-2'
        />
      )}

      {step === 1 && (
        <div className='space-y-7'>
          <ChoiceGroup
            name='budget'
            legend='Approximate budget'
            options={budgetOptions.map(value => ({ value, label: value }))}
            value={inquiry.budget}
            error={errors.budget}
            onChange={update('budget')}
            columns='grid-cols-2 sm:grid-cols-3'
          />
          <ChoiceGroup
            name='timeline'
            legend='When would you like to start?'
            options={timelineOptions.map(value => ({ value, label: value }))}
            value={inquiry.timeline}
            error={errors.timeline}
            onChange={update('timeline')}
            columns='sm:grid-cols-2'
          />
        </div>
      )}

      {step === 2 && (
        <div className='grid gap-5 sm:grid-cols-2'>
          {(
            [
              ['name', 'Name', 'text', 'name', true],
              ['email', 'Email', 'email', 'email', true],
              ['company', 'Business or brand', 'text', 'organization', false],
              ['phone', 'Phone', 'tel', 'tel', false]
            ] as const
          ).map(([field, label, type, autoComplete, required]) => (
            <div key={field} className='space-y-2'>
              <Label htmlFor={`${field}-field`}>
                {label}
                {!required && <span className='text-muted-foreground font-normal'>(optional)</span>}
              </Label>
              <Input
                id={`${field}-field`}
                type={type}
                maxLength={limits[field]}
                autoComplete={autoComplete}
                value={inquiry[field]}
                onChange={event => update(field)(event.target.value)}
                aria-required={required}
                aria-invalid={Boolean(errors[field])}
                aria-describedby={errors[field] ? `${field}-error` : undefined}
                className='h-11'
              />
              {errors[field] && (
                <p id={`${field}-error`} className='text-destructive text-sm'>
                  {errors[field]}
                </p>
              )}
            </div>
          ))}
          <div className='space-y-2 sm:col-span-2'>
            <Label htmlFor='message-field'>Your brand and goals</Label>
            <Textarea
              id='message-field'
              maxLength={limits.message}
              rows={4}
              value={inquiry.message}
              onChange={event => update('message')(event.target.value)}
              placeholder='What you’re building, who you want to reach, and what success looks like.'
              aria-required
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? 'message-error' : undefined}
              className='min-h-28'
            />
            {errors.message && (
              <p id='message-error' className='text-destructive text-sm'>
                {errors.message}
              </p>
            )}
          </div>
          {/* Honeypot for bots; hidden from people and assistive tech */}
          <div aria-hidden className='absolute -left-[9999px] h-px w-px overflow-hidden'>
            <label htmlFor='website-field'>Website</label>
            <input id='website-field' name='website' type='text' tabIndex={-1} autoComplete='off' />
          </div>
        </div>
      )}

      <div className='mt-8 flex items-center justify-between gap-3'>
        {step > 0 ? (
          <Button type='button' variant='ghost' size='lg' className='h-12 ps-3.5 pe-4' onClick={() => goTo(step - 1)}>
            <IconArrowLeft aria-hidden data-icon='inline-start' /> Back
          </Button>
        ) : (
          <span />
        )}
        <Button
          type='submit'
          size='lg'
          disabled={submitting}
          data-track={step === steps.length - 1 ? 'inquiry_submit' : `inquiry_step_${step + 1}_continue`}
          className='h-12 ps-6 pe-5.5 text-base'
        >
          {step === steps.length - 1 ? (submitting ? 'Sending…' : 'Send to Maria') : 'Continue'}
          {!submitting && <IconArrowRight aria-hidden className='size-5' />}
        </Button>
      </div>
    </form>
  )
}

export default InquiryForm
