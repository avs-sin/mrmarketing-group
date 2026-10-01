import { NextResponse } from 'next/server'

import { siteConfig } from '@/configs/site'
import { inquirySubject, inquiryText, normalizeInquiry, validateInquiry } from '@/lib/inquiry'

/**
 * Receives a homepage/contact inquiry and emails it to Maria through Resend.
 *
 * Until RESEND_API_KEY and INQUIRY_FROM_EMAIL are configured this returns 503 `not_configured`, and the form
 * falls back to opening the visitor's email app with their answers filled in. It never reports delivery it
 * did not make.
 */
export const POST = async (request: Request) => {
  let body: unknown

  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ status: 'invalid', errors: {} }, { status: 400 })
  }

  // Honeypot: real visitors never see or fill this field. Answer like a success so bots learn nothing.
  if (body && typeof body === 'object' && 'website' in body && (body as { website: unknown }).website) {
    return NextResponse.json({ status: 'sent' })
  }

  const inquiry = normalizeInquiry(body)
  const errors = validateInquiry(inquiry)

  if (Object.keys(errors).length) return NextResponse.json({ status: 'invalid', errors }, { status: 400 })

  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.INQUIRY_FROM_EMAIL

  if (!apiKey || !from) return NextResponse.json({ status: 'not_configured' }, { status: 503 })

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to: [process.env.INQUIRY_TO_EMAIL || siteConfig.email],
        reply_to: inquiry.email,
        subject: inquirySubject(inquiry),
        text: inquiryText(inquiry)
      }),
      signal: AbortSignal.timeout(10_000)
    })

    if (!response.ok) {
      console.error('Resend rejected inquiry', response.status, await response.text().catch(() => ''))

      return NextResponse.json({ status: 'failed' }, { status: 502 })
    }

    return NextResponse.json({ status: 'sent' })
  } catch (error) {
    console.error('Inquiry delivery failed', error)

    return NextResponse.json({ status: 'failed' }, { status: 502 })
  }
}
