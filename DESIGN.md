# Design

This is the approved look for the Mr. Marketing Group site, approved for the homepage on 2026-11-03.
Use it when you build or change any page.

## Direction

**The films are the stage.** Real client footage leads the page. Type and layout stay quiet so the
work carries the sell. Red is an accent, not a background.

## Color

Dark mode is the default (`src/configs/themeConfig.ts`). The tokens live in `src/app/globals.css`.

| Role           | Token                | Dark value            | Use                                                   |
| -------------- | -------------------- | --------------------- | ----------------------------------------------------- |
| Page           | `--background`       | `oklch(0.13 0 0)`     | Deep black base                                       |
| Raised section | `--card`             | `oklch(0.19 0 0)`     | Alternate sections (`bg-card`): work gallery, founder |
| Accent         | `--primary`          | `oklch(0.62 0.23 28)` | Main buttons, key words, final contact band           |
| Secondary text | `--muted-foreground` | `oklch(0.7 0.005 80)` | Body copy under headings                              |

Rules:

- Use red only for the primary action, one or two key words in a heading, small descriptors, and the closing CTA band.
- Do not fill large areas with red, except the closing band.
- Alternate `bg-background` and `bg-card` to separate sections. Do not use borders or boxes for this.

## Type

| Role               | Font       | Class                                                                |
| ------------------ | ---------- | -------------------------------------------------------------------- |
| Display headings   | Bebas Neue | `type-display`, tight tracking, `leading-[0.95]` to `leading-[1.05]` |
| Body               | DM Sans    | default                                                              |
| Numbers and labels | DM Mono    | `font-mono` where needed                                             |

- The hero H1 runs `clamp(3.25rem,14vw,4.5rem)` on phones, up to `6.5rem` on wide screens.
- Section H2s run `text-5xl` to `text-7xl`.
- Each section opens with an `Eyebrow`, then the H2, then a short muted paragraph.

## Layout

- Wrap content in `ContentLayout` (`max-w-7xl px-4 sm:px-6 lg:px-8`).
- Section padding: `py-16 sm:py-24 lg:py-32`.
- Prefer open lists and columns with hairline `border-t` / `border-b` rules over card grids.
- Offerings use a **big-name list**: one full-width row per service, a large display name, and a stretched link that opens the whole row.
- Process steps are border-top columns with large red numbers. Do not use cards.

## Media

- Video tiles are 9:16, `rounded-2xl`, `img-outline`, and `bg-black`.
- Captions are small pills: `bg-black/65`, `backdrop-blur-md`, white text.
- The hero film wall is one large tile beside two stacked tiles (`grid-cols-[2fr_1fr]`).
- Hero loops (`HeroLoop`, `public/videos/mrmg/loops/`) are silent 6-second cuts, 480 px wide, under 1 MB each.
  They attach after hydration. They do not play under reduced motion or Save-Data; the poster stays.
- Full films (`public/videos/mrmg/*.mp4`) download only when a visitor presses Play. The test
  `does_not_download_video_before_play` enforces this. Only the hero loops are exempt.

## Motion

- Hover and press feedback: 150-200 ms, `ease-out`, color and small translate or `scale-[0.96]`.
- No scroll-triggered reveals. Respect `prefers-reduced-motion`.

## Copy

- Make only claims the site can show: Maria's 10+ years, Deluxe Version Magazine's 40 Under Forty (National Icons of 2026), and the Tuscan Cove films.
- Do not add stats, client counts, testimonials, or prices without written proof from Maria.
