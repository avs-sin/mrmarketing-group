# Homepage UX elevation — mobile, tablet, desktop

Status: approved by the user's request to plan and implement in one pass.

## Audit (baseline at 390 / 820 / 1440 wide, dark theme)

| # | Finding | Viewport | Severity |
|---|---|---|---|
| 1 | Footer wordmark `MR MARKETING` is fixed at `text-[10rem]` from `md`, so the page scrolls horizontally by ~126px between 768 and 1023px | Tablet | Bug |
| 2 | Work gallery stacks three full-width 9:16 cards (~650px each). Together with the founder reel, the mobile page is ~10,800px tall | Mobile | High |
| 3 | Anchored sections (`#work`, `#services`) have no scroll margin, so "Explore our work" lands under the fixed header. `main > *:scroll-mt-20` targets the page wrapper, not the sections | All | Medium |
| 4 | The trust strip is three lines of small grey text. It's the first proof point and reads like a footnote | All | Medium |
| 5 | Section eyebrows mix `font-medium` and regular weights. Headings have no `text-balance`, so lines orphan (e.g. "WITH." on the final CTA at 390px) | All | Medium |
| 6 | FAQ uses the centered generic `SectionHeader`, which breaks the left-aligned editorial rhythm. Its two accordions use different question sizes (`text-lg` vs `text-base`), and the questions render in the condensed display face, which is hard to read in small sizes | All | Medium |
| 7 | Industries are buried in a paragraph. The process steps are visually faint | All | Low |
| 8 | The hero portrait is a full-width 2:3 image on mobile (~535px). On desktop it runs past the 900px fold, and the caption panel covers part of the photo | Mobile, Desktop | Low |
| 9 | Service cards have no hover motion beyond a background tint. The arrow is static | Desktop | Low |

## Design principles

- Keep the established language: dark editorial, condensed display type, red accent, rounded 2xl frames.
- Proof before persuasion. Lead with facts from the supplied bio only, and invent no metrics.
- Mobile is a separate composition, not a squeezed desktop page: reduce scroll cost and keep thumb-reachable CTAs.
- Respect the media contract: videos stay poster-first, user-initiated, 9:16 and uncropped, with no autoplay and no auto-advancing carousel.

## Changes

1. **Footer wordmark.** Scale it with the viewport (`text-[clamp(...)]`, using `vw`) and clip it, which fixes #1.
2. **Hero**
   - Tighten the desktop composition so the portrait fits the fold (`max-h` set by viewport height).
   - Use a 4:5 cover crop on mobile so the portrait is shorter. The photo is not a clip; the face stays anchored at the top.
   - Make the CTAs taller to give a thumb-sized target (≥44px).
   - Turn the trust line into a compact proof row.
3. **Credentials strip.** Rebuild it as a three-up row with a display-type lead and a supporting label: "10+ years" / "LV-based" / "Founder-led". On mobile use dividers, not wrapping text.
4. **Services board.** Add hover lift and an arrow nudge, show an explicit "Explore" affordance, and use `text-balance` on headings.
5. **Work gallery**
   - Mobile and small tablet: a horizontal scroll-snap rail with peeking cards (~78% width) and a swipe hint. This is a manual-scroll list, not a carousel.
   - `md` and up: keep the three-column grid.
   - Add scroll margin to the section.
6. **Founder.** Keep the layout. Unify the eyebrow, and add a quiet signature list (Founder / Entrepreneur / Open-format DJ) as chips.
7. **Recognition.** Pair the award graphic with a tighter editorial layout and a hairline frame. The about page shares this component, so check it renders there too.
8. **Audience + process**
   - Show industries as chips.
   - Make the process steps large numbered cards with a connecting rule.
9. **FAQ (home only).** A split layout: a sticky left heading with a "still have questions? Email Maria" link, and a single accordion on the right with consistent sans-serif question sizes. The shared `Faq` block stays unchanged for the other pages.
10. **Final CTA**
    - Add `text-balance`.
    - Give the email link the same weight as the phone link.
    - Stack the buttons full-width on mobile.
11. **Shared eyebrow.** A small `Eyebrow` component in `blocks/home` gives sections one typographic treatment.

## Out of scope

Global navigation IA (the duplicate "Start a Project" nav item next to "Let's Talk"), supporting-page redesigns and new media.

## Verification

- Screenshots at 390 / 820 / 1440 before and after.
- A no-overflow check at 390 / 768 / 820 / 1024 / 1440.
- `pnpm typecheck`, `pnpm lint` and `pnpm build`.
- The existing Playwright suite for both desktop and mobile projects (video poster-first, captions, overflow, routes).
