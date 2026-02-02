# Amazon case study images

Export images from your PDF and save them here (e.g. `page-1.png`, `page-2.png`).
Then add sections in `src/data/portfolio.ts` under the Amazon case study `sections` array.

Each section can have:
- `title` — optional section heading
- `content` — optional paragraph text (paste from PDF)
- `images` — optional array: `{ src: "/images/work/amazon/your-file.png", alt: "description", caption: "optional caption" }`
