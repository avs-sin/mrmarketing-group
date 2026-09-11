'use client'

// React Imports
import { useState } from 'react'

// Component Imports
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

const venueTypes = ['Restaurant', 'Bar or lounge', 'Nightclub', 'Hotel', 'Event or party series', 'Other brand']
const services = ['One event', 'Content and social retainer', 'Full-service agency', 'Not sure yet']
const budgets = ['Under $1,500', '$1,500 to $5,000', '$5,000 to $15,000', 'Over $15,000']

type Step1 = { name: string; phone: string; venueType: string }

/*
 * Two-step application. Step 1 is captured as a partial lead the moment the visitor advances,
 * so an abandoned Step 2 still leaves a callable name and phone.
 * TODO: wire `savePartialLead` and `submitApplication` to a backend (form endpoint, CRM, or email).
 */
const savePartialLead = (lead: Step1) => {
  if (typeof window !== 'undefined') window.dispatchEvent(new CustomEvent('lead:partial', { detail: lead }))
}

const ContactForm = () => {
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [lead, setLead] = useState<Step1>({ name: '', phone: '', venueType: '' })

  const step1Valid = lead.name.trim() && lead.phone.trim() && lead.venueType

  return (
    <form
      className='space-y-6'
      onSubmit={e => {
        e.preventDefault()

        if (step === 1 && step1Valid) {
          savePartialLead(lead)
          setStep(2)

          return
        }

        if (step === 2) setStep(3)
      }}
      data-track='form_apply'
      data-track-location={`contact_step_${step}`}
    >
      <p className='text-muted-foreground text-sm'>Step {Math.min(step, 2)} of 2</p>

      {step === 1 && (
        <>
          <div className='w-full space-y-2'>
            <Label htmlFor='name'>Your name</Label>
            <Input
              id='name'
              className='input-lg'
              required
              value={lead.name}
              onChange={e => setLead({ ...lead, name: e.target.value })}
            />
          </div>
          <div className='w-full space-y-2'>
            <Label htmlFor='phone'>Phone</Label>
            <Input
              id='phone'
              type='tel'
              className='input-lg'
              required
              value={lead.phone}
              onChange={e => setLead({ ...lead, phone: e.target.value })}
            />
          </div>
          <fieldset className='space-y-3'>
            <legend className='font-medium'>What kind of venue?</legend>
            <div className='grid grid-cols-2 gap-2'>
              {venueTypes.map(v => (
                <label
                  key={v}
                  className='has-checked:border-primary has-checked:bg-primary/10 flex cursor-pointer items-center gap-2 rounded-md border p-3 text-sm'
                >
                  <input
                    type='radio'
                    name='venueType'
                    value={v}
                    className='accent-primary'
                    checked={lead.venueType === v}
                    onChange={() => setLead({ ...lead, venueType: v })}
                  />
                  {v}
                </label>
              ))}
            </div>
          </fieldset>
          <Button type='submit' className='w-full' size='lg' disabled={!step1Valid}>
            Continue
          </Button>
          <p className='text-muted-foreground text-center text-sm'>
            Takes about a minute. Reply within one business day.
          </p>
        </>
      )}

      {step === 2 && (
        <>
          <div className='w-full space-y-2'>
            <Label htmlFor='email'>Email</Label>
            <Input id='email' type='email' className='input-lg' required />
          </div>
          <div className='w-full space-y-2'>
            <Label htmlFor='business'>Venue or brand name</Label>
            <Input id='business' className='input-lg' required />
          </div>
          <div className='grid gap-6 sm:grid-cols-2'>
            <div className='space-y-2'>
              <Label htmlFor='service'>What do you need?</Label>
              <select
                id='service'
                className='border-input bg-background h-10 w-full rounded-md border px-3 text-sm'
                required
                defaultValue=''
              >
                <option value='' disabled>
                  Pick one
                </option>
                {services.map(s => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>
            <div className='space-y-2'>
              <Label htmlFor='budget'>Budget range</Label>
              <select
                id='budget'
                className='border-input bg-background h-10 w-full rounded-md border px-3 text-sm'
                required
                defaultValue=''
              >
                <option value='' disabled>
                  Pick one
                </option>
                {budgets.map(b => (
                  <option key={b}>{b}</option>
                ))}
              </select>
            </div>
          </div>
          <div className='w-full space-y-2'>
            <Label htmlFor='eventDate'>Next event date, if you have one</Label>
            <Input id='eventDate' type='date' className='input-lg' />
          </div>
          <div className='w-full space-y-2'>
            <Label htmlFor='message'>Tell us about the room</Label>
            <Textarea
              id='message'
              className='h-28 resize-none'
              placeholder='What is the night, and what is not working yet?'
            />
          </div>
          <Button type='submit' className='w-full' size='lg'>
            Book the 20-minute call
          </Button>
        </>
      )}

      {step === 3 && (
        <div className='bg-card rounded-xl p-8'>
          <p className='type-display text-4xl'>Got it, {lead.name.split(' ')[0]}.</p>
          <p className='text-muted-foreground mt-3'>
            Maria will call {lead.phone} within one business day. If your event is sooner, call or text now.
          </p>
        </div>
      )}
    </form>
  )
}

export default ContactForm
