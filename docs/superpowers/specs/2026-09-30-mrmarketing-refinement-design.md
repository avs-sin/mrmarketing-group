# Mr. Marketing Group refinement — proposed design

Status: proposed for user review; no product code or deployment authorized by this artifact.

## Intent and scope

Refine the existing marketing site using the supplied bio and real media. Present a founder-led Las Vegas creative agency with hospitality roots and a broader business audience. Preserve the current Next.js app, dark editorial styling, display typography, red accents and existing logo assets. Shorten the homepage and replace generic nightlife stock with people and demonstrable creative work.

This is an existing-site refinement; the user explicitly requested a written implementation plan. Supporting pages receive consistency edits, not a new website architecture. No new CMS, creator application portal, CRM, booking calendar, or analytics vendor. Inquiry backend integration is a separate project; this refinement uses honest email/phone contact instead of the existing non-delivering form.

## Evidence

Read and rendered all three pages of the user-supplied `Mr marketing group website bio and info.pdf`; original attachment path: `/tmp/codex-remote-attachments/01a0f538-067e-7a52-a641-8b01680ca496/C3F95476-4C41-4DB3-AEED-49C219BBE36D/1-Mr-marketing-group-website-bio-and-info.pdf`. Archive and visual review: `2026-09-30-mrmarketing-media-review.md` beside this file. Current behavior inspected in local source at commit `302ff30`; no live-render parity or baseline performance claim is made.

The PDF supplies agency/founder bios, more than a decade of industry experience, open-format DJ background, restaurants/luxury real estate/hospitality/healthcare/professional services audiences, and four branded offerings. Media visibly supports the recognition graphic and examples of restaurant content and event coverage. It does not establish campaign results, client contracts or ROI.

## Proposed copy and hierarchy

Use “Mr. Marketing Group” in prose and accessible brand text, following the PDF. Retain the existing stylized MR logo. Use full “The Mr. Collective” when naming the creator offering; do not rename it MADE or treat the two as synonymous.

Homepage order:
1. **Hero:** eyebrow “Las Vegas creative marketing agency”; headline “Distinctive brands. Meaningful connections.”; summary “Strategy, cinematic content, social media, creators, and experiences — tailored to your brand.” Primary CTA “Start a project” to `/contact-us`; secondary “Explore our work” to `/#work`. Smiling Maria portrait in a split layout, not a stock crowd or an autoplay video.
2. **Credibility strip:** “Las Vegas-based”, “More than a decade of industry experience”, “Founder-led creative direction”. Short recognition feature separately with the supplied award graphic.
3. **Four service pillars:** branded names, plain-language category, concise scope and service links (mapping below).
4. **Selected work:** three portrait video cards for restaurant production, restaurant collaboration and community event coverage. Native controls, no autoplay; posters before loading clips; labels describe what is visible rather than inventing outcomes.
5. **Founder:** title “Maria Romano”; subtitle “Founder. Entrepreneur. Open-format DJ.” PDF-grounded short bio; one play-on-demand explainer (“Maria Reel 1”). Link to `/about-us` for full bios.
6. **Recognition:** full 2026 award graphic and short caption “Deluxe Version Magazine — 40 Under Forty, National Icons of 2026”. No invented ranking, award date or judging explanation.
7. **Audience + process:** restaurants, luxury real estate, hospitality, healthcare and professional services; describe capabilities, not unprovided client logos or case studies. Process: understand the brand, shape the creative direction, execute and refine.
8. **FAQ + final CTA:** explain scope, creator coordination, existing-team collaboration and custom proposals. Final headline “Let’s build a brand people connect with.” CTA “Start a project”. No invented prices, deadline promises or guarantee.

## Service mapping

| Display name | Descriptor | Existing/new route | PDF-grounded scope |
|---|---|---|---|
| Mr. Creative | Content Production & Social Media Management | `/services/content-creation` | Cinematic video, photography, short-form reels; concepts, shoots, editing, captions, scheduling and community engagement |
| The Mr. Collective | UGC & Influencer Marketing | `/services/the-mr-collective` (new MDX) | Creator matching, creative direction, coordination and campaign execution |
| Mr. Social | Events & Experiences | `/services/event-marketing` | Concepts, venues, entertainment, outreach and promotion; launches, private dinners, gatherings and activations |
| Mr. Connected | Brand Partnerships | `/services/sponsorship-partnerships` | Partner outreach, sponsorships, joint campaigns, placements and experiences |

Keep every existing service URL working. Brand strategy, paid advertising and creative design remain supporting capabilities, not additional named sub-brands. The service overview emphasizes four pillars; existing detail pages are rewritten for audience/copy consistency. The sitemap already enumerates MDX files, so the new Collective page should be included without a hardcoded route.

## Content consistency

Update homepage, About and founder pages, metadata/site config, footer, service navigation, FAQ and service descriptions. Remove current hospitality-only exclusion, speculative “empty room” client story, draft $1,500 packages, response-time/no-contract promises and invented founder milestones. Remove press headlines rendered as client testimonials unless source links are verified separately; supplied award can stand alone. Existing project URLs remain available with neutral descriptions of documented creative work; do not claim restaurant reels prove attendance or sales uplift. Preserve historical MADE project if documented, without conflating it with the Collective. Do not ship an empty carousel or placeholder testimonials.

## Media and interaction contract

Use selected originals from the media review. Founder portrait: responsive WebP variants (640/960/1440 wide), full source retained outside repo; all variants <=300 KiB. Gallery posters <=150 KiB. Recognition image <=300 KiB with full wording intact. Encode three work clips and the primary founder reel as H.264 MP4, max 720 x 1280, AAC audio, fast-start; each <=12 MiB. Do not commit 95–315 MB source clips. Never crop portrait clips to landscape. Each work card preserves a 9:16 frame with object-contain; captions and faces remain visible.

Videos have no autoplay, use `preload="none"`, `playsInline` and native controls. Do not attach the video source until the user activates that card’s labeled Play button. Do not enforce muted audio on user-initiated playback. Provide a reviewed WebVTT caption track for selected spoken clips; burned-in text does not substitute for an accessible track. On load error, show “Video unavailable” and keep the poster/caption and contact link usable. Reduced-motion users receive the same static poster-first experience. Add no continuous carousel.

## Honest contact

Replace the simulated two-step lead form with a simple contact panel: email, phone and four pillar-specific “Discuss …” email links. All email links use the configured address and encoded subject; CTA text says “Email Maria”, not “Submit” or “Booked”. Show the address visibly for visitors without a mail app. Explain “Opens your email app. Your inquiry is sent when you send the email.” No browser event or local step change counts as lead delivery. Backend lead capture is separately scoped if requested.

## Global constraints

- Preserve the existing Next.js/React/Tailwind stack; no runtime dependency additions.
- Keep all existing service and project URLs working.
- Use supplied bio as the source of business facts; no invented prices, metrics, testimonials or guarantees.
- Retain logo assets; use “Mr. Marketing Group” in prose and “The Mr. Collective” for the creator offering.
- Videos are poster-first, user-initiated, 9:16, and never autoplay.
- Do not publish or push this refinement before the user reviews the plan and selects execution.
- Preserve the pre-existing `.gitignore` edit; do not stage it or revert it.

## Acceptance

At 390px and 1440px the page has no horizontal overflow; portrait media remains uncropped; CTAs and all service links work. No MP4 request occurs before Play. Media errors leave a useful fallback. All original service routes return successfully; new Collective is in sitemap. Contact makes no false send claim. Source/bio review, typecheck, lint and production build pass; review failures against a recorded baseline rather than sweeping unrelated fixes into scope.
