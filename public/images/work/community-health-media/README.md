# CHT HCP Content Platform — case study screens

Screens for the Community Health Media case study scroll-card sequence.

## Source

Figma: [CHT-HCP-Content-Platform](https://www.figma.com/design/qjuy0FxbbwsZuxdKyfc0MS/CHT-HCP-Content-Platform?node-id=172-19682)

Parent frame node ID: `172:19682` (grid of all screens). Each child frame is one screen.

## Exporting each screen from Figma

1. Open the file and select the parent frame (node 172:19682).
2. In the Figma layer list, expand the frame and note the **node ID** of each child frame (each screen).
3. For each screen you want:
   - Select that frame.
   - Right-click → **Export** (or use the Export section in the right panel).
   - Choose PNG (or 2x for retina).
   - Save as `screen-1.png`, `screen-2.png`, … in this folder, matching the order in `src/data/portfolio.ts`:
     - screen-1.png — Content Hub (home)
     - screen-2.png — HCP Platform overview
     - screen-3.png — Breast Cancer / disease topic
     - screen-4.png — Webinar Catalogue
     - screen-5.png — Survey Catalogue
     - screen-6.png — Admin Dashboard
     - screen-7.png — Content Upload
     - screen-8.png — Webinar Scheduler

Replacing the placeholder images here will update the case study at `/work/community-health-media` automatically.

## Case-study–specific assets

- **`hero-mockup.png`** — Laptop + phone device mockup (teal backdrop); used as the **large hero image** under the case study title.
- **`cht-marketing-homepage-hero.png`** — Flat full-width homepage capture; used in the **first two-up** pair on the left (with featured content on the right).
- **`fourup-content-library-catalogue.png`** — **Content library / catalogue** screen (e.g. “Explore our Catalogue”) for the **four-up grid** and Problem 01 browser tile. Paths in `portfolio.ts` point here; use a new filename if you replace the file to bust Next.js image cache.

- **`fourup-featured-videos-crop20l.png`** — Used in the **four-up grid** only (1004×557 after trimming 20px from the left of the export). Re-export from Figma into a working file, then re-apply the crop if needed.

- **`fourup-data-earnings-v3.png`** — **Four-up** “Data & Reporting” tile (e.g. Your Earnings / activity dashboard).

- **`cht-two-up-featured-videos.png`** — **Cropped** variant for the **first two-up** row (right column) only, so you can trim edges (e.g. stray lines) without changing the four-up tile.

- **`cht-two-up-about-us.png`** / **`cht-two-up-contact.png`** — **Second two-up** row (About Us and Contact / “Let’s connect”); paths in `portfolio.ts` `chtTwoUpPairs[1]`.

Do not use the marketing homepage art for the content-library slot (they are different messages).
