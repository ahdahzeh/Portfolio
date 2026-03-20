# CHT case study videos

- **`site-walkthrough.mov`** — main browser-frame walkthrough (top of page).
- **`admin-dashboard-walkthrough.mov`** / **`.mp4`** — **Solution 3** (internal admin / operations). H.264 `.mp4` is listed first in the page via `videoMp4`.
- **`brand-identity-walkthrough.mov`** — **Solution 2** fallback / QuickTime source.
- **`brand-identity-walkthrough.mp4`** — **H.264** copy for Chrome; `portfolio.ts` uses **`videoMp4`** so this `<source>` is tried first.

**Add your recording (pick one):**

1. In Finder, copy your screen recording into this folder as **`brand-identity-walkthrough.mov`**, or  
2. From the project root: `./scripts/copy-brand-identity-video.sh "/path/to/recording.mov"`  
3. For Chrome: also place **`brand-identity-walkthrough.mp4`** (H.264 export) — already wired via `videoMp4` in `portfolio.ts`.

**Chrome / Firefox:** QuickTime `.mov` is often **HEVC**. If the player is black, the **`.mp4`** source above fixes it.
