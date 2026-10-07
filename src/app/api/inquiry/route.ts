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
// Best-effort per-IP limit on emails actually sent. Serverless instances don't share memory, so this slows a
// flood rather than guaranteeing a cap; pair it with a Vercel Firewall rate-limit rule on /api/inquiry.
const SEND_LIMIT = 5
const SEND_WINDOW_MS = 10 * 60 * 1000
const recentSends = new Map<string, number[]>()

const clientIp = (request: Request) =>
  request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown'

const overSendLimit = (ip: string) => {
  const now = Date.now()
  const sends = (recentSends.get(ip) ?? []).filter(time => now - time < SEND_WINDOW_MS)

  if (sends.length >= SEND_LIMIT) return true

  sends.push(now)
  recentSends.set(ip, sends)

  // Keep memory bounded on long-lived instances
  if (recentSends.size > 5000) recentSends.delete(recentSends.keys().next().value as string)

  return false
}

/** Browsers always send Origin on POST; a different site's origin means a cross-site submission. */
const isCrossSite = (request: Request) => {
  const origin = request.headers.get('origin')

  if (!origin) return false

  try {
    const originHost = new URL(origin).host
    const allowed = [request.headers.get('x-forwarded-host'), request.headers.get('host'), new URL(siteConfig.url).host]

    return !allowed.includes(originHost)
  } catch {
    return true
  }
}

export const POST = async (request: Request) => {
  // Only JSON: a cross-site page can't send application/json without a CORS preflight, which this route never grants
  if (!request.headers.get('content-type')?.toLowerCase().startsWith('application/json')) {
    return NextResponse.json({ status: 'unsupported_media_type' }, { status: 415 })
  }

  if (isCrossSite(request)) return NextResponse.json({ status: 'forbidden' }, { status: 403 })

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

  if (overSendLimit(clientIp(request))) return NextResponse.json({ status: 'rate_limited' }, { status: 429 })

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
