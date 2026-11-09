/**
 * Regenerates PNG + MP4 assets for `/work/community-health-media`.
 *
 * Prerequisites:
 *   CHM frontend: VITE_DISABLE_AUTH=true npm run dev  (default http://localhost:5173)
 *
 * Usage:
 *   CHM_URL=http://localhost:5173 node scripts/capture-chm-assets.cjs
 */
'use strict';

const fs = require('fs');
const path = require('path');
const os = require('os');
const { spawnSync } = require('child_process');

const puppeteer = require('puppeteer');
const ffmpeg = require('ffmpeg-static');

const ROOT = path.join(__dirname, '..');
const OUT_IMG = path.join(ROOT, 'public/images/work/community-health-media');
const OUT_VID = path.join(ROOT, 'public/videos/work/community-health-media');

const BASE = process.env.CHM_URL || 'http://localhost:5173';
const VIEWPORT_PRIMARY = { width: 1728, height: 964, deviceScaleFactor: 1 };
const CARD_VIEWPORT = { width: 1200, height: 675, deviceScaleFactor: 1 };

const SHOTS = [
  ['hero-mockup.png', '/home'],
  ['fourup-featured-videos-crop20l.png', '/catalog?view=playlists'],
  ['fourup-conversations-playlist.png', '/live'],
  ['fourup-content-library-catalogue.png', '/catalog'],
  ['fourup-data-earnings-v3.png', '/app/earnings'],
  ['cht-problem-02-education-landing.png', '/for-hcps'],
  ['cht-solution-01-webinars.png', '/live'],
  ['screen-1.png', '/login'],
  ['cht-two-up-featured-videos.png', '/catalog'],
  ['cht-two-up-about-us.png', '/about'],
  ['cht-two-up-contact.png', '/contact'],
  ['portfolio-app-home.png', '/app/home'],
  ['portfolio-app-catalog.png', '/app/catalog'],
  ['portfolio-app-live.png', '/app/live'],
  ['portfolio-app-surveys.png', '/app/surveys'],
  ['admin-overview.png', '/admin'],
  ['admin-surveys-list.png', '/admin/surveys'],
];

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function screenshotNamed(browser, fileName, urlPath, viewport) {
  const page = await browser.newPage();
  await page.setViewport(viewport);
  const url = new URL(urlPath, BASE.endsWith('/') ? BASE : BASE + '/');
  process.stdout.write(`Capture ${fileName} ← ${url.toString()} … `);
  try {
    await page.goto(url.toString(), { waitUntil: 'networkidle2', timeout: 120000 });
  } catch (_) {
    await page.goto(url.toString(), { waitUntil: 'domcontentloaded', timeout: 120000 });
  }
  await sleep(3200);
  await page.evaluate(() => window.scrollTo(0, 0));
  await sleep(400);
  const out = path.join(OUT_IMG, fileName);
  await page.screenshot({ path: out, type: 'png', fullPage: false });
  await page.close();
  console.log('ok');
}

function copyFile(from, toDir, destName) {
  fs.mkdirSync(toDir, { recursive: true });
  fs.copyFileSync(from, path.join(toDir, destName));
}

function ffmpegSlideshow(orderedPaths, outFile, secPerSlide) {
  if (!ffmpeg) {
    console.warn('ffmpeg-static missing; skipping video', outFile);
    return false;
  }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'chm-slide-'));
  try {
    let i = 1;
    for (const src of orderedPaths) {
      if (!fs.existsSync(src)) continue;
      const dest = path.join(dir, `${String(i).padStart(3, '0')}.png`);
      fs.copyFileSync(src, dest);
      i++;
    }
    const n = fs.readdirSync(dir).filter((f) => f.endsWith('.png')).length;
    if (n < 2) return false;

    fs.mkdirSync(path.dirname(outFile), { recursive: true });
    const vf =
      'fps=fps=30,' +
      'scale=1920:1080:force_original_aspect_ratio=decrease,' +
      'pad=1920:1080:(ow-iw)/2:(oh-ih)/2:color=black,format=yuv420p';

    const r = spawnSync(
      ffmpeg,
      [
        '-y',
        '-framerate',
        `1/${secPerSlide}`,
        '-start_number',
        '1',
        '-i',
        path.join(dir, '%03d.png'),
        '-vf',
        vf,
        '-c:v',
        'libx264',
        '-pix_fmt',
        'yuv420p',
        '-movflags',
        '+faststart',
        outFile,
      ],
      { stdio: 'inherit' }
    );
    return r.status === 0;
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

(async () => {
  fs.mkdirSync(OUT_IMG, { recursive: true });
  fs.mkdirSync(OUT_VID, { recursive: true });

  console.log('Base URL:', BASE);

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1920,1080'],
  });

  try {
    for (const [file, urlp] of SHOTS) {
      await screenshotNamed(browser, file, urlp, VIEWPORT_PRIMARY);
    }

    // Card thumbnail for homepage grid (`/images/work/cht.png`)
    await screenshotNamed(browser, '__card-temp.png', '/home', CARD_VIEWPORT);
    copyFile(path.join(OUT_IMG, '__card-temp.png'), path.join(ROOT, 'public/images/work'), 'cht.png');
    fs.unlinkSync(path.join(OUT_IMG, '__card-temp.png'));

    // Duplicate marketing hero crop for second slot in layout
    copyFile(path.join(OUT_IMG, 'hero-mockup.png'), OUT_IMG, 'cht-marketing-homepage-hero.png');

    console.log('\nRendering MP4 slideshows…');

    const siteFrames = [
      path.join(OUT_IMG, 'hero-mockup.png'),
      path.join(OUT_IMG, 'fourup-content-library-catalogue.png'),
      path.join(OUT_IMG, 'fourup-conversations-playlist.png'),
      path.join(OUT_IMG, 'portfolio-app-home.png'),
      path.join(OUT_IMG, 'portfolio-app-catalog.png'),
      path.join(OUT_IMG, 'portfolio-app-live.png'),
      path.join(OUT_IMG, 'portfolio-app-surveys.png'),
      path.join(OUT_IMG, 'fourup-data-earnings-v3.png'),
    ];

    const brandFrames = [
      path.join(OUT_IMG, 'hero-mockup.png'),
      path.join(OUT_IMG, 'screen-1.png'),
      path.join(OUT_IMG, 'cht-two-up-featured-videos.png'),
      path.join(OUT_IMG, 'portfolio-app-home.png'),
    ];

    const adminFrames = [
      path.join(OUT_IMG, 'admin-overview.png'),
      path.join(OUT_IMG, 'admin-surveys-list.png'),
      path.join(OUT_IMG, 'fourup-data-earnings-v3.png'),
    ];

    ffmpegSlideshow(siteFrames, path.join(OUT_VID, 'site-walkthrough.mp4'), 4.5);
    ffmpegSlideshow(brandFrames, path.join(OUT_VID, 'brand-identity-walkthrough.mp4'), 5);
    ffmpegSlideshow(adminFrames, path.join(OUT_VID, 'admin-dashboard-walkthrough.mp4'), 6);

    console.log('\nDone. Images →', OUT_IMG);
    console.log('Videos →', OUT_VID);
  } finally {
    await browser.close();
  }
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
