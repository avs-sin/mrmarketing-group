# Mr. Marketing Group refinement — implementation handoff

## Scope and location

Local implementation on `feat/mrmarketing-refinement`, isolated at `/Users/lyonx/Downloads/mrmarketing-refinement-worktree`.
Original repository: `/Users/lyonx/Downloads/shadcn-nextjs-brandly-maria`.
Base: `302ff30`; implementation head: `2aa9e3c`.
No push, merge, deployment, or external message was performed. The original pre-existing `.gitignore` edit is unchanged.

## What changed

- Authentic founder portrait, four user-initiated portrait clips, English caption tracks, and supplied recognition media.
- Four shared offerings: Mr. Creative, The Mr. Collective, Mr. Social, Mr. Connected.
- PDF-grounded agency and founder bios, broader audience positioning, services, FAQ, metadata and navigation.
- Honest email/phone inquiry panel; no simulated delivery or inert newsletter signup.
- Preserved legacy service/project paths; removed unverified testimonials, case-study outcomes, prices and promises. Neutral portfolio covers replace stock client evidence.

## Verification

- `node --test tests/media-assets.test.mjs`: 3/3 pass.
- `pnpm exec playwright test tests/refinement.spec.ts`: 18/18 pass, desktop 1440 × 900 and mobile 390 × 844.
- `pnpm typecheck`, `pnpm lint`, `pnpm build`, `git diff --check`: pass.
- All 8 service routes and 5 legacy project routes return 200; unknown service returns 404; Collective is in sitemap.
- No MP4 request before deliberate Play. All four clips advance playback and load caption cues. Keyboard/reduced-motion and failed-media fallback checks pass.
- Home, About, founder, services, Collective, contact, projects and Tuscan detail image loading/layout reviewed. No horizontal overflow on checked pages.

Preview: `http://localhost:3108` while the local production server is running.
To restart: `pnpm build` then `pnpm exec next start --port 3108` from the worktree.
Browser checks can start their own production server through `playwright.config.ts`.
Asset tests also require FFmpeg's `ffprobe` on PATH.

Screenshots, test logs and the review diff: `/Users/lyonx/Downloads/mrmarketing-review-2026-09-30/implementation-preview/`.
Source originals remain outside Git; only selected optimized web derivatives are committed.

## Media limitation before publishing

Caption preparation used local Whisper transcription plus burned-in-text frame checks, not a human listening sign-off. One indistinct closing phrase is marked `[unclear]`; review spoken caption wording before publishing. No sales, attendance, charity partnership, sponsorship, or campaign ROI is inferred from these clips.

## Independent review

A fresh-context reviewer independently checked the production preview, source alignment, routes, contact paths, failure handling, keyboard/reduced-motion playback, frame dimensions, network behavior and asset contracts. Review was read-only.

**Verdict:** Ready to merge. No Critical or Important findings. Two non-blocking Minor findings deferred per executing-plans workflow:

1. `src/app/(pages)/page.tsx:29`: JSON-LD replacement does not emit the intended escaped less-than token. Fixed current content is unaffected, but a future configured string containing a script closing boundary would lose the existing safeguard. Follow-up: use `escapeJsonLd()` or an explicit escaped replacement.
2. `src/lib/seo.ts:36`: default absolute homepage title still ends “Las Vegas Full-Service Marketing Agency,” overriding the root’s revised “Creative Marketing Agency.” Follow-up: align the helper's default title.

Items consciously set aside and executor rulings: full human auditory caption review, actual mail/call delivery, production-host/domain behavior, and dev HMR behavior. Their disposition and costs are preserved in the ledger below.

No new review pass is required: there were no blocking fixes. All runtime files remain at the reviewed implementation head.

## Execution ledger

# SDD ledger — plan: docs/superpowers/plans/2026-09-30-mrmarketing-refinement.md
Branch: feat/mrmarketing-refinement; merge base: 302ff30
Ruling: Native worktree creation cannot address the Downloads repository from the current mission-control task; use external Git worktree at /Users/lyonx/Downloads/mrmarketing-refinement-worktree — isolates approved work without modifying original .gitignore — cost if wrong: worktree requires manual lifecycle management.
Pre-flight: Tasks 1→3/5: media JSON consumed by typed component; align optional image fields and required video poster/captions; no conflict.
Pre-flight: Tasks 2→3/4/5: readonly pillar data and hrefs consumed by home/nav/contact; no conflict.
Pre-flight: Tasks 3→4/5: shared browser runner required for route checks; execute Task 2 route checks when runner exists, as plan permits.
Pre-flight: Tasks 4→5: shared FAQ/CTA remove promises consistently; no conflict.
Todo: Task 1 assets; Task 2 positioning; Task 3 homepage; Task 4 contact; Task 5 supporting pages.
Baseline: typecheck, lint and production build passed on 302ff30.
Task 1: Ruling: system FFmpeg has no WebP encoder; extract lossless PNG frames and encode WebP with Pillow — same visual/size contract — cost if wrong: poster quality requires reinspection.
Ruling: Bring test runner setup forward to Task 2 and use isolated port 3108 — prove new/legacy routes immediately without colliding with other local previews — cost if wrong: test setup moves between commits, no production effect.
Ruling: Finish independent service-copy work while offline media transcription/compression runs; Task 1 remains incomplete until checks pass — avoids idle time without changing shared interfaces — cost if wrong: track two task bases carefully.
Task 2 RED: new Collective route returns 404; legacy services resolve.
Task 2: Ruling: Update service-detail pricing CTA too — homepage pricing is removed, so its old anchor would be dead — cost if wrong: visitors contact Maria instead of seeing draft prices.
Task 1: Ruling: Use offline full-clip speech recognition plus original-caption frame checks for audio review — no audio-listening tool is available; mark one indistinct phrase [unclear] instead of guessing — cost if wrong: a human may correct caption wording before publishing.
Task 1: complete (commits 302ff30..101db12, tests: node --test tests/media-assets.test.mjs → ℹ duration_ms 127.975542)
Task 2: complete (commits 302ff30..567b353, tests: pnpm exec playwright test tests/refinement.spec.ts →   2 passed (6.9s))
Task 3: Ruling: Use Webpack for local browser-test preview after interrupted Turbopack left a hung task-owned server — production build remains unchanged — cost if wrong: local preview compiler differs, production build is still verified.
Task 3: Initial three RED checks hit preview navigation timeout, not feature failure; rerun against actual Task 2 page after preview recovery to obtain meaningful RED evidence.
Task 3 debugging: reproduced first click before hydration leaving 0 video elements; second click after hydration creates player. Disable Play until client hydration via useSyncExternalStore; meaningful interaction tests caught actual lost-click bug, not attribute serialization.
Task 3: Ruling: Run browser verification against the production server instead of dev HMR — Next dev intermittently dispatches a router action before initialization and loops reloads; production build and all 10 checks pass — cost if wrong: tests do not cover HMR-only behavior, not shipped behavior.
Task 3 verification: production build, typecheck, lint, 3 asset contracts and 10 browser checks pass. Screenshot scroll-through confirms loaded images rather than lazy offscreen placeholders.
Task 3: complete (commits 567b353..8ce75ab, tests: pnpm exec playwright test tests/refinement.spec.ts →   10 passed (3.8s))
Task 4: Ruling: Remove the footer’s inert Subscribe controls and replace with four pillar links — no newsletter delivery exists, and the shared footer needs truthful interactions — cost if wrong: newsletter capture requires a separate working integration.
Task 4 RED: contact_never_claims_unsent_delivery fails on missing Email Maria link before contact implementation.
Task 4: complete (commits 8ce75ab..2e7223a, tests: pnpm exec playwright test -g contact_never →   2 passed (825ms))
Task 5: Ruling: Replace unverified portfolio stock photos with typographic covers (Tuscan uses its real supplied reel poster), keep original named routes and neutral category descriptions — avoid representing stock scenes as client evidence; remove unsupported sponsorship/date/outcome narratives — cost if wrong: historical case-study detail is reduced until Maria supplies verified project evidence.
Task 5: Ruling: Fix the remaining project pricing anchor and root/PWA metadata — the anchor is now dead and metadata contradicts the supplied broader agency bio — cost if wrong: visitors see creative-services positioning instead of narrow hospitality wording.
Task 5: Ruling: Give each supporting-page hero an h1 through an optional SectionHeader headingLevel (default stays h2) — browser verification found the existing template pages had no page-level heading — cost if wrong: accessibility semantics change, visual style does not.
Task 5 RED: supporting_pages_load_images_and_fit_viewport fails on missing /teams h1; the existing reusable section heading only rendered h2. Hero-specific h1 addresses it without altering other section headings.
Task 5: Ruling: Replace generic software-development service artwork and fixed four-slot cards with actual capability data — existing template showed coding logos and a blank fourth heading for each three-item offering; source-grounded service presentation is required — cost if wrong: elaborate template animation is removed in favor of readable editorial cards.
Task 5 RED: service_detail_has_no_empty_sections_or_template_assets reproduces the empty capability heading on Collective.
Task 5: Ruling: Replace the blank external map embed with Maria’s supplied alternate portrait and remove unverified reply-speed/on-site-location promises from contact cards — screenshot review found a large empty panel and copy outside PDF facts — cost if wrong: no embedded map; the agency’s Las Vegas location and contact channels remain visible.
Task 5: complete (commits 2e7223a..2aa9e3c, tests: pnpm exec playwright test tests/refinement.spec.ts →   18 passed (27.4s))

Final review: independent fresh-context reviewer; read-only range 302ff30..2aa9e3c; no Critical or Important findings. Ready to merge with non-blocking minor cleanup recommended.
Final: minor (deferred): homepage JSON-LD replacement uses a literal < instead of a backslash-u escape; current fixed content is unaffected, future configured script-boundary content loses the safeguard.
Final: minor (deferred): SEO helper overrides root metadata with the old Full-Service Marketing Agency suffix; visible title/social-title positioning remains slightly inconsistent.
Final: Ruling: No human auditory sign-off — retain disclosed machine-assisted captions and [unclear] phrase for local review, require a listening pass before publishing — cost if wrong: spoken wording/timing may need correction.
Final: Ruling: Do not test inquiry delivery by sending email or placing calls — the panel opens a mail app and explicitly says the visitor must send; no dispatch backend exists — cost if wrong: delivery depends on the visitor's mail service and action.
Final: Ruling: Leave production domain/hosting delivery verification to requested publishing — local production acceptance is verified, no deployment authorized — cost if wrong: host-specific caching/delivery behavior is untested until deployment review.
Final: Ruling: Leave development HMR instability outside shipping acceptance — independent production preview passed all visitor checks — cost if wrong: local hot-reload development may remain unreliable.
