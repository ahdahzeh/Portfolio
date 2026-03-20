# Community Health Media Case Study — Houzz-Style Reorganization Plan

Reference: [Soyoung Lee – Houzz case study](https://www.soyoungllee.com/Houzz)

---

## Houzz page structure (what we’re mirroring)

| Order | Element | Houzz example |
|-------|--------|----------------|
| 1 | **Hero title** | “Building a Multi-Brand Design System & Product Marketing” |
| 2 | **Meta block** | TEAM · Tools · Year · Role (label: value grid) |
| 3 | **Company intro** | Short “About Houzz” / what the product is |
| 4 | **My role** | “As the brand & marketing designer, I oversaw…” |
| 5 | **Optional** | NDA note, quick links (About Houzz, About Houzz Pro) |
| 6 | **Problem/opportunity** | “How can we create a design system for Houzz Pro?” |
| 7 | **Sections** | Bold heading → short copy → images/carousel; some with bullets or CTAs |
| 8 | **Takeaways** | Bold subheads + short paragraphs (learnings) |
| 9 | **Testimonials** (optional) | Quote cards from colleagues |
| 10 | **CTA** | “View Figma prototype” (we already have this) |

---

## What we’ll do for CHT

### 1. Data (`src/data/portfolio.ts`)

- **Meta block (new)**  
  Add optional `team`, `tools`, `year` (or keep using `timeline`), `role` (we have `roleDisplay`).  
  Example:  
  `Team: Brand & Product` · `Tools: Figma` · `Year: 2026` · `Role: Product Designer`

- **Project title (optional)**  
  Optional short “project line” (e.g. “HCP Content Platform — Design & Operations”) in addition to title/subtitle.

- **Company intro + my role**  
  Keep/refine `heroIntro` or split into:  
  - One short “About CHT / the platform” paragraph.  
  - One “My role” paragraph (what you oversaw, scope).

- **Problem/opportunity line**  
  Add one optional line (e.g. “How can we give HCPs a clear, scalable content hub?”) before or inside the first section.

- **Sections (existing, lightly restructured)**  
  - Keep: Overview, Content Hub & Discovery, Webinars & Surveys, Admin & Operations.  
  - Make headings more Houzz-like: clear question or statement (e.g. “An intuitive content hub for healthcare professionals”).  
  - Where relevant: short bullet list (e.g. key tools/features) and optional “Visit [link]” CTA per section.

- **Takeaways (new)**  
  New optional `takeaways` on the case study: array of `{ title: string; content: string }` (e.g. “Scaling content for HCPs”, “Design system consistency”). Rendered as a final section before CTA.

- **Testimonials (optional)**  
  If you want them later: `testimonials: { quote: string; name: string; role: string }[]`. Can be phase 2.

### 2. Component (`src/components/CommunityHealthCaseStudy.tsx`)

- **Hero**  
  Keep “Deep Dive” + title + subtitle. Optionally show project line under subtitle.

- **Meta block (new)**  
  Under the hero: grid or row of **TEAM** · **Tools** · **Year** · **Role** (only render if provided). Styling: small caps or label style, values in body text.

- **Company intro + my role**  
  One or two short paragraphs under meta (from `heroIntro` or new fields). Same typography as current hero intro.

- **Problem/opportunity**  
  Optional block (e.g. italic or lead paragraph) before the first section: “How can we…?”

- **Sections**  
  Keep current section layout (title → content → images). Add optional per-section CTA (e.g. “Visit HCP Platform” link) when provided in data.

- **Takeaways**  
  New section at the end (before Screens or after Screens, your choice). Bold subhead per takeaway, then body copy. Reuse existing section styling for consistency.

- **Screens**  
  Keep existing scroll-card gallery (full screen set).

- **CTA**  
  Keep “View Figma prototype” at the bottom.

- **Testimonials**  
  Omit for initial implementation; add in phase 2 if you want quote cards.

### 3. Type updates

- In `portfolio.ts` (or a shared type file), extend the CHT case study type to include:
  - `team?: string`
  - `tools?: string`
  - `problemStatement?: string` (the “How can we…?” line)
  - `takeaways?: { title: string; content: string }[]`
  - Optional: `sectionLinks?: { label: string; url: string }[]` for section-level CTAs.

(If only CHT uses these, they can live on the case study object for `community-health-media` and be passed into `CommunityHealthCaseStudy`.)

---

## Implementation order

1. **Types + data**  
   Add optional fields to the CHT case study in `portfolio.ts` and fill in meta (team, tools, year, role), problem statement, and takeaways. Optionally add one section CTA.

2. **CommunityHealthCaseStudy.tsx**  
   - Add meta block under hero.  
   - Add problem/opportunity block.  
   - Render takeaways section.  
   - Add optional CTA link per section if you provide sectionLinks.

3. **Copy pass**  
   Tighten section titles and body copy to match Houzz tone (clear headings, short paragraphs, bullets where useful).

4. **Optional phase 2**  
   Testimonials component + data when you have quotes.

---

## Summary

- We keep your current CHT content and screens; we reorganize the page to follow the Houzz flow: **hero → meta → company/role → problem → sections → takeaways → screens → CTA**.
- New pieces: **meta block**, **problem statement**, **takeaways**, and optional **section CTAs** and (later) **testimonials**.

If you want to proceed, next step is implementing step 1 (types + data) and step 2 (component changes) so the CHT page matches this structure.
