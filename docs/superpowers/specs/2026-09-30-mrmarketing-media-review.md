# Supplied media review

Downloaded September 30, 2026 from the user-provided Dropbox folder to `/Users/lyonx/Downloads/mrmarketing-review-2026-09-30/`.

## Method and limits

Archive downloaded successfully (approximately 957 MiB); all 16 files extracted. All 8 photographs inspected in a labeled contact sheet; video metadata inspected and six frames sampled across each unique clip. Seven unique videos; `2026-0620_MR-MARKETING-2A (1).mp4` is byte-identical to the unnumbered file. This is a visual selection review, not full audiovisual playback or audio transcription. Listen to each selected clip during implementation before publishing; do not infer spoken claims from filenames or isolated subtitles. All videos contain audio and are 9:16. No unambiguous luxury-real-estate or healthcare portfolio examples appear in the reviewed samples.

## Placement decisions

| Source filename | Observed content | Decision |
|---|---|---|
| Photo Sep 18 2026, 4 26 44 PM (1).jpg | Smiling, seated Maria portrait; 2400 x 3600 | Primary homepage/founder portrait; accurate alt text, not “at DJ decks” |
| Photo Sep 18 2026, 4 26 44 PM (2).jpg | Similar seated portrait, neutral expression | About page portrait alternate |
| Photo Sep 18 2026, 4 26 44 PM.jpg | Wider seated portrait showing interior | Secondary About image if needed; do not repeat all three |
| Photo Jun 12 2026, 9 02 09 PM.jpg | Maria at Deluxe Version recognition event, award sign and skyline | Recognition supporting photo |
| Photo Jun 12 2026, 9 01 43 PM.jpg | Wider recognition-event photo | Archive alternate; do not duplicate visually |
| Photo Sep 18 2026, 10 03 32 AM.png | Named award graphic: Maria Romano, 40 Under Forty, National Icons of 2026 | Recognition graphic, preserve full frame and wording |
| Photo Jun 16 2026, 3 32 54 PM.png | Instagram screenshot of recognition event | Evidence only; exclude phone chrome from site by using supplied originals instead |
| Photo Jun 16 2026, 3 32 58 PM.png | Instagram screenshot of award photo | Evidence only; redundant |
| Maria Reel 1.mp4 | 12.30s; Maria discussing personalized branding; burned-in subtitles | Founder / approach reel; primary explainer |
| Maria reel 2.mp4 | 13.43s; branding consistency explainer; burned-in subtitles | About / approach alternate; keep off initial homepage gallery to avoid repetition |
| 2026-0620_MR-MARKETING (1).mp4 | 24.90s; darker office brand spot, red display text and logo | Secondary editorial spot; not hero; review spoken tone first |
| 2026-0620_MR-MARKETING-2A.mp4 | 26.82s; humorous office brand spot with profanity in visible text | Hold out of initial polished homepage; optional later social showcase |
| 2026-0620_MR-MARKETING-2A (1).mp4 | Exact duplicate | Exclude |
| 2026-0624_TUSCAN-ANTONIONWINGS.mp4 | 54.05s; kitchen, wings preparation and tasting, people on camera | Mr. Creative work example; label “Restaurant content” unless attribution confirmed |
| 2026-0708_BULLETHEAD-3-TASTETEST.mp4 | 77.49s; burger taste test; Tuscan Cove sign visible | The Mr. Collective example; label “Restaurant collaboration,” not measured campaign results |
| 2026-0830_MOMOFOUNDATION-A.mp4 | 32.63s; Maria, dogs, rescue-related shirt, gathering, food/drink | Mr. Social example; label “Community event coverage”; do not infer charity partnership or fundraising totals |

## Files retained outside Git

- `dropbox-media.zip`: untouched source archive.
- `media/`: extracted originals.
- `inventory.json`: sizes, video dimensions/duration/audio and SHA-256 hashes.
- `photos-contact-sheet.jpg` and `*-sheet.jpg`: visual review sheets.
- `bio.txt` and `bio-1.png` through `bio-3.png`: extracted and rendered PDF review.

Do not add the raw archive, originals, frame sheets, or PDF rendering artifacts to Git. Only optimized, selected web assets belong in `public/` at execution time.

## Execution review

Selected audio was transcribed locally with Whisper small.en/medium.en and compared with supplied burned-in captions at ambiguous segments. Caption tracks correct obvious proper-name/dish recognition errors and label music instead of inventing speech. One indistinct restaurant-production closing phrase is explicitly marked [unclear]; no synthetic words were substituted. This machine-assisted review is not a human listening sign-off. Originals, model downloads and transcript review artifacts remain outside Git. Selected web videos preserve original duration and audio and use 720 x 1280 H.264/AAC fast-start encodes; production/collaboration needed CRF 30/33 to meet the 12 MiB budget. All selected posters and portraits visually reviewed.
