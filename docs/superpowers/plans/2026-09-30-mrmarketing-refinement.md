# Mr. Marketing Group Content and Media Refinement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refine the existing site with the supplied agency/founder bios, four branded offerings and selected real media, with an honest contact path.

**Architecture:** Retain the current app and MDX service loader. Use one typed pillar dataset across home, services and navigation; use a small lazy-video component for authentic portrait work. Keep supporting-page changes limited to factual and branding consistency.

**Tech Stack:** Existing Next.js 16.2.6, React 19.2.6, Tailwind 4.3.0, TypeScript, MDX, pnpm; FFmpeg and Pillow for offline assets; Node built-in tests for asset contracts and Playwright for behavioral checks.

**Spec:** `docs/superpowers/specs/2026-09-30-mrmarketing-refinement-design.md`; media selections: `docs/superpowers/specs/2026-09-30-mrmarketing-media-review.md`. The user selected executing-plans for local implementation. Publishing is not requested.

## Global Constraints

- Preserve the existing Next.js/React/Tailwind stack; no runtime dependency additions.
- Keep all existing service and project URLs working.
- Use supplied bio as the source of business facts; no invented prices, metrics, testimonials or guarantees.
- Retain logo assets; use “Mr. Marketing Group” in prose and “The Mr. Collective” for the creator offering.
- Videos are poster-first, user-initiated, 9:16, and never autoplay.
- Do not publish or push this refinement before the user reviews the plan and selects execution.
- Preserve the pre-existing `.gitignore` edit; do not stage it or revert it.

## Review Focus

1. Cold/slow connection: work clips must not download until Play, and posters must reserve stable 9:16 space (Task 3 browser test).
2. Failed media request: poster, label and contact route remain usable with “Video unavailable” feedback (Task 3 browser test).
3. Keyboard/reduced-motion visitor: Play is labeled and keyboard operable; no automatic playback (Task 3 browser test).
4. Existing bookmarked routes: legacy service/project paths still resolve; Collective joins the sitemap (Task 2/5 route check).
5. No mail application configured: visitor can copy the visible email and is never told an unsent inquiry was received (Task 4 browser test).

---

## File structure and ownership

- `src/assets/data/service-pillars.ts`: shared four-pillar identity and route mapping.
- `src/assets/data/media-manifest.json`: selected web media paths, identifiers and descriptive labels.
- `public/images/mrmg/refined/`, `public/videos/mrmg/`, `public/captions/mrmg/`: selected optimized derivatives only.
- `src/components/blocks/home/work-gallery.tsx`: gallery composition.
- `src/components/blocks/home/media-card.tsx`: lazy, accessible playback and error fallback.
- Existing home/founder/About components: copy/layout edits, no unrelated component rewrite.
- Existing MDX services: factual content and pillar association; new Collective MDX follows their frontmatter schema.
- Existing contact component: replace simulated submission with explicit email/phone contact.
- `tests/media-assets.test.mjs`: asset size, dimensions and deduplication contract.
- `tests/refinement.spec.ts`, `playwright.config.ts`: browser behavior and route regressions.

Raw download and review material lives outside Git at `/Users/lyonx/Downloads/mrmarketing-review-2026-09-30/`. Do not copy its approximately 1 GB archive into the application.

### Task 1: Prepare selected, optimized media

**Files:**
- Create: `src/assets/data/media-manifest.json`
- Create: selected files under `public/images/mrmg/refined/`, `public/videos/mrmg/`, `public/captions/mrmg/`
- Create: `tests/media-assets.test.mjs`

**Interfaces:**
- Consumes: filenames and placement decisions in media review; source `media/` and `inventory.json` outside Git.
- Produces: manifest array `MediaAsset[]`; each entry has `id: string`, `kind: 'image' | 'video'`, `src: string`, `poster?: string`, `captions?: string`, `alt: string`, `label: string`, `sourceFile: string`, `sourceSha256: string`, `width: number`, `height: number`. Video entries always have poster/captions and 720 x 1280 dimensions.
- IDs: `founder`, `founder-alternate`, `recognition`, `recognition-event`, `founder-explainer`, `restaurant-production`, `restaurant-collaboration`, `community-event`.

- [ ] **Step 1: Listen to and inspect complete selected clips.** Review the primary founder explainer and three work clips, recording any unsuitable frame/audio issue in the media review. Confirm the review’s descriptive labels; do not add client/partner/result claims. Office parody spots stay excluded. Prepare accurate captions for the four selected spoken clips.
- [ ] **Step 2: Write asset-contract tests.** Use Node `node:test`, `assert/strict`, `fs` and `ffprobe` child process; test names `selected_assets_are_small_and_readable`, `portrait_videos_keep_their_frame`, `duplicate_originals_are_not_published`. Assert every manifest path exists, every image <=300 KiB, every poster <=150 KiB, every video <=12 MiB, each video is 720 x 1280, every caption file starts `WEBVTT`, and `sourceSha256` is unique across entries.
- [ ] **Step 3: Run `node --test tests/media-assets.test.mjs`.** Expect failure because the manifest or assets do not exist.
- [ ] **Step 4: Generate selected derivatives and manifest.** Primary portrait source is `Photo Sep 18 2026, 4 26 44 PM (1).jpg`; alternate `(2).jpg`; recognition graphic `Photo Sep 18 2026, 10 03 32 AM.png`; event portrait `Photo Jun 12 2026, 9 02 09 PM.jpg`. Use descriptive filenames. Generate primary portrait at 640, 960 and 1440 width and reference the 960 variant as manifest `src`. Record the full source hash only on its one manifest entry. Preserve the whole award graphic. Encode selected videos with `ffmpeg -i INPUT -vf scale=720:1280 -c:v libx264 -crf 26 -preset medium -pix_fmt yuv420p -c:a aac -b:a 96k -movflags +faststart OUTPUT`; if >12 MiB, increase CRF and re-review legibility until budget passes. Generate a representative poster from each selected clip and create its WebVTT file. Never trim/crop captioned content simply to fit a layout.
- [ ] **Step 5: Verify assets.** Run Node tests; expect all PASS. Inspect optimized portrait, recognition image and four video samples visually; play the clips and check caption timing, text legibility and synchronized sound. Originals remain untouched.
- [ ] **Step 6: Commit only new manifest, selected derivatives and asset tests.** Message: `feat: prepare authentic Maria and campaign media`.

### Task 2: Replace contradictory positioning and establish service pillars

**Files:**
- Create: `src/assets/data/service-pillars.ts`, `src/content/services/the-mr-collective.mdx`
- Modify: `src/configs/site.ts`, `src/components/logo.tsx`
- Modify: all seven existing files under `src/content/services/`
- Modify: `src/components/blocks/home/services-board.tsx`, `src/app/(pages)/services/page.tsx`, `src/components/blocks/service-page-hero-section.tsx`
- Modify: `src/app/(pages)/layout.tsx` (owns `navigationData`), `src/components/layout/footer.tsx`
- Test: `tests/refinement.spec.ts` route checks; configure runner in Task 3 before executing browser checks.

**Interfaces:**
- Produces: `ServicePillar = { id: 'creative' | 'collective' | 'social' | 'connected'; name: string; descriptor: string; href: string; description: string }`; export `servicePillars: readonly ServicePillar[]`.
- Consumes: route/name/descriptor/scope mapping verbatim from spec. Keep `getServiceBySlug`/`getServices` signatures unchanged and all existing MDX filenames in place.

- [ ] **Step 1: Record route baseline.** Inventory every file in `src/content/services/` and `src/content/project/`; list expected original URLs in browser test `legacy_routes_and_collective_resolve`. Expected after implementation: each returns HTTP 200; Collective is present in `/sitemap.xml`.
- [ ] **Step 2: Add shared pillar data.** Use the four names and hrefs from the spec; descriptions are a one-sentence condensation of each supplied PDF service section. Do not create a fifth sub-brand for advertising or branding.
- [ ] **Step 3: Update service content.** Rework `content-creation.mdx`, `event-marketing.mdx` and `sponsorship-partnerships.mdx` as the three named pillars at their existing URLs. Add Collective frontmatter and scope using the existing `ServiceMetadata` fields. Update `social-media-management.mdx`, `brand-strategy.mdx`, `flyers-creative-design.mdx`, `paid-advertising.mdx` as supporting capabilities; remove hospitality-only limits and unsupported outcomes/rights promises. Do not delete legacy routes.
- [ ] **Step 4: Wire pillar presentation.** Homepage `ServicesBoard` accepts `{ services: readonly ServicePillar[] }` and renders links from `href`, not reconstructed slugs. Use a four-item editorial grid with descriptors always visible, including mobile. Services overview renders these same pillars, with secondary capability links below. Build the four-item dropdown from `servicePillars` in `src/app/(pages)/layout.tsx`, where `navigationData` is defined, plus “All services”; footer links agree. Leave the generic desktop/mobile navigation renderer unchanged.
- [ ] **Step 5: Update shared brand/metadata.** Site prose follows PDF naming; logo images remain unchanged but alt/screen-reader text changes. Description: “Mr. Marketing Group is a Las Vegas creative marketing agency combining strategy, cinematic content, social media, creator partnerships, and events.” Keep configured email, phone and social URLs; no new domain assumption.
- [ ] **Step 6: Verify content/routes.** Run `pnpm typecheck`; expect exit 0. After Task 3 adds browser runner, run the route test and expect all original paths plus Collective 200 and sitemap inclusion. Review four pillars side-by-side against PDF; no static-copy unit tests needed.
- [ ] **Step 7: Commit exact changed files.** Message: `feat: align services with Maria's supplied agency positioning`.

### Task 3: Refine homepage with authentic, accessible media

**Files:**
- Create: `src/components/blocks/home/media-card.tsx`, `src/components/blocks/home/work-gallery.tsx`
- Create: `playwright.config.ts`, `tests/refinement.spec.ts`
- Modify: `package.json`, `pnpm-lock.yaml` (test-only Playwright dependency)
- Modify: `src/app/(pages)/page.tsx`, `src/components/blocks/home/hero.tsx`, `src/components/blocks/home/funnel-sections.tsx`

**Interfaces:**
- Consumes: Task 1 manifest, Task 2 `servicePillars`.
- Produces: `MediaCard({ asset }: { asset: MediaAsset }): React.JSX.Element` and `WorkGallery(): React.JSX.Element`; `MediaAsset` type mirrors Task 1 schema, declared/exported from `media-card.tsx`.
- Preserve `CTABand({ location, headline }: { location: string; headline: string })` and tracking attribute names, but use approved generic CTA text without operational promises.

- [ ] **Step 1: Add browser checks before component changes.** Add `@playwright/test` as dev dependency and local config `webServer.command='pnpm dev'`, `baseURL='http://localhost:3000'`, Chromium, viewport 390 x 844 and desktop 1440 x 900. Tests: `does_not_download_video_before_play` collects `.mp4` requests and asserts zero on initial homepage load; then activate “Play Restaurant content” and assert a source is assigned. `keyboard_and_reduced_motion_playback` emulates reduced motion, focuses the labeled Play button and presses Enter, asserting native controls/track exist and autoplay is absent. `failed_video_keeps_poster_and_contact` aborts selected MP4 and asserts “Video unavailable”, image/label and “Start a project” link remain visible. `portrait_layout_has_no_overflow` asserts document scrollWidth <= viewport width and gallery player width/height ratio approximately 9/16 at both viewport sizes.
- [ ] **Step 2: Run `pnpm exec playwright test tests/refinement.spec.ts`.** Install the Chromium test browser if absent. Expect gallery-specific tests to fail against the current app; retain route baseline observations, do not mask failures.
- [ ] **Step 3: Implement lazy playback.** `MediaCard` initially renders poster and labeled native button; only on activation attach native video `src`, controls, playsInline, preload none and captions track. Request playback from that user gesture; gracefully handle rejected `play()` with controls still usable. Preserve poster/caption on media `onError`, show explicit error text and contact link. Fixed portrait aspect ratio, object-contain. No autoplay attribute or background clip; use native controls instead of a custom player library.
- [ ] **Step 4: Compose homepage in exact spec order.** Split portrait/text hero using supplied headline/summary and two CTA links. Four service pillars above the work gallery. Gallery contains three work IDs from Task 1. Founder uses PDF-grounded short bio plus explainer card. Recognition uses whole supplied award graphic with exact observed label. Remove `BigDomino`, speculative `ClientStory`, `TheStack`, `RiskReversal`, `Pricing` and unverified `Testimonials` mounts from home; preserve exports still used elsewhere until Task 5 resolves them. Replace trust strip and final CTA per spec. Do not create a second stock-client carousel to fill space.
- [ ] **Step 5: Run browser tests and asset contract.** Expect all PASS. Inspect desktop/mobile screenshots, full recognition wording, face positioning, hero contrast, text wrapping and playable reels. No MP4 request before deliberate activation; no off-screen media downloads. Run `pnpm typecheck` and `pnpm lint`; compare any failures with baseline.
- [ ] **Step 6: Commit only homepage/media components and test changes.** Message: `feat: refresh homepage with founder and authentic work`.

### Task 4: Replace simulated inquiry success with honest contact

**Files:**
- Modify: `src/components/blocks/contact-us-page/contact-form.tsx`, `src/components/blocks/contact-us-page/hero-section.tsx`, `src/components/blocks/contact-us-page/contact-us-page.tsx`
- Modify: `src/assets/data/faq.ts`, `src/components/blocks/cta-section.tsx`
- Test: `tests/refinement.spec.ts`

**Interfaces:**
- Consumes: shared email/phone config and four service pillars.
- Produces: default `ContactForm(): React.JSX.Element` remains import-compatible but becomes a contact panel; no lead dispatch or pretend submission.

- [ ] **Step 1: Write `contact_never_claims_unsent_delivery`.** Assert `/contact-us` has visible email `Maria@mrmarketing-group.com`, telephone `tel:+17249710239`, an “Email Maria” mailto link, four pillar-specific email subjects and the email-app explanation. Decode href subjects and compare with `Discuss {pillar name}`. Assert no “received”, “booked” or “Maria will call” success state after contact-panel interaction; email address remains visible without needing to launch a mail app.
- [ ] **Step 2: Run this test against the current contact page.** Expect FAIL because the current form uses simulated completion and does not provide the specified explicit contact panel.
- [ ] **Step 3: Replace the simulated form.** Keep its default export/import contract; remove step state, `lead:partial`, required inputs and budget/venue-only selectors. Email href is `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}`. Use spec explanation verbatim; show email and phone as plain visible text plus links. Do not create an endpoint or send any messages during testing.
- [ ] **Step 4: Align FAQ and CTAs.** Replace price/contract/deadline promises with scope-based questions and answers grounded in the PDF: services, audiences, creator coordination, collaboration with internal teams, custom proposals. Shared CTA invites restaurants, property, hospitality, healthcare and professional-service brands without implying existing clients in each category.
- [ ] **Step 5: Run contact test, typecheck and lint.** Expected PASS/exit 0. Check keyboard links and long email wrapping at 390px. No external message is sent by test.
- [ ] **Step 6: Commit exact contact/FAQ/CTA changes.** Message: `fix: make agency inquiry contact truthful and usable`.

### Task 5: Align supporting pages and verify the complete refinement

**Files:**
- Modify: `src/app/(pages)/about-us/page.tsx`, `src/app/(pages)/teams/page.tsx`, `src/components/blocks/about-us-page/hero.tsx`, `src/components/blocks/about-component/about.tsx`
- Modify: `src/components/blocks/teams-page/index.tsx`, `src/components/blocks/teams-page/team.tsx`, `src/components/blocks/teams.tsx`, `src/assets/data/team-members.ts`
- Modify: `src/assets/data/social-proof.tsx`, `src/assets/data/timeline.tsx` (only if still rendered)
- Modify: `src/content/project/tuscan-cove.mdx` and other existing project MDX only where stock/unsupported assertions require factual cleanup
- Modify: existing `src/app/(pages)/services/[slug]/page.tsx`, `src/app/(pages)/projects/page.tsx`, `src/app/(pages)/projects/[slug]/page.tsx` only to remove unverified testimonial mounts if present
- Test: all `tests/refinement.spec.ts`, `tests/media-assets.test.mjs`

**Interfaces:**
- Consumes: PDF bios, selected portraits, service pillar data and unchanged existing routes/loaders.
- Produces: factual consistency on all existing public pages; no new API interfaces.

- [ ] **Step 1: Update About and founder content.** Publish the supplied two bios with typographic subdivision, selected portraits and links to four pillars. Founder is an entrepreneur/open-format DJ with more than a decade of stated industry experience; do not invent early-career milestones. Remove unsupported timeline and numerical social-proof sections rather than invent replacements. Existing team array still has one real founder, not fabricated staff.
- [ ] **Step 2: Clean up project/proof presentation.** Existing project URLs stay intact; labels describe documented content/events. Remove unsupported before/after/attendance claims. Do not infer sponsorship from a branded shirt. Remove press-as-client-testimonial mounts from supporting pages; do not claim press quotes were verified. Supplied recognition stands alone. MADE is historical work, not the new Collective identity.
- [ ] **Step 3: Run full checks.** `node --test tests/media-assets.test.mjs`, `pnpm exec playwright test tests/refinement.spec.ts`, `pnpm typecheck`, `pnpm lint`, `pnpm build`. Expected all PASS/exit 0; report any baseline-only unrelated failure distinctly. Browser route test includes every original service/project route and `/services/the-mr-collective`, and sitemap contains the new route. Test unknown `/services/not-a-real-service` returns 404.
- [ ] **Step 4: Review in browser and against sources.** At 390px/1440px inspect home, About, services, Collective and contact; play every selected clip with audio/captions, test media-error fallback and keyboard navigation. Review all business statements against the PDF/media review; no $1,500, no hospitality-only exclusion, no invented client outcomes or service guarantees. Check metadata/site name consistency and image alt text describes actual image content.
- [ ] **Step 5: Commit exact remaining changes and prepare review handoff.** Message: `feat: align supporting pages with supplied agency bio`. Provide screenshots, preview instructions, file diff and verification output. Do not push or deploy: existing push-to-main automation deploys externally.

## Execution setup and handoff

At execution time read using-git-worktrees and the selected execution skill. Create/reuse isolated workspace through native worktree tooling; preserve current `.gitignore` edit. Carry these reviewed docs into that workspace. Record baseline `pnpm typecheck`, `pnpm lint`, `pnpm build` before changes so pre-existing failures are distinguishable. Dependency install/browser setup is local execution preparation, not a task deliverable.

Recommend **Native** execution: five closely connected refinement tasks in one existing app, no new backend subsystem. It minimizes context overhead; use one independent whole-branch review at the end per skill. Subagent-driven is available if the user prefers per-task implementation/review gates.

## Self-review result

All supplied PDF sections map to Tasks 2 and 5; every selected media type maps to Task 1/3; homepage conversion/unsupported claims map to Tasks 3/4/5. Five review-focus risks are assigned explicit checks. Pillar and manifest field names agree across task interfaces. Static copy edits use source/visual review rather than redundant unit tests; behavioral and media-contract checks protect meaningful failures. No implementation, push, deployment, form delivery, or full audio review has been performed by writing this plan.
