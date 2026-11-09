/**
 * Portfolio Data Configuration
 * Edit this file to customize your portfolio content
 */

export const personalInfo = {
  name: "Adaze Oviawe",
  pronunciation: "[ah-dah-zeh oh-vee-ah-weh]",
  location: "New York, NY",
  title: "Product Designer",
  email: "ahdahzeh@gmail.com",
  bio: `I have over 6 years of experience solving problems, designing experiences, and building digital products. I'm currently a product designer at J.P. Morgan and run Cerebral, my studio in New York. I've worked across startups and enterprise teams at Amazon, Block Equity Group, and Omnicom, delivering user-centered solutions that drive measurable results.`,
  bioCompanies: [
    { name: "Amazon", url: "https://www.amazon.com" },
    { name: "Block Equity Group", url: "https://www.blockequitygr.com" },
    { name: "Omnicom", url: "https://www.omnicomhealthgroup.com" },
  ] as const,
  availableForWork: false,
  contactMessage: "I'm always happy to chat and talk shop. Send me a note!",
  /** Video URL (local path e.g. /videos/intro.mp4) shown 50px to the right of Get In Touch. Set to a string to enable. */
  contactVideoUrl: undefined as string | undefined,
};

export const socialLinks = {
  twitter: "",
  linkedin: "https://linkedin.com/in/ahdahzeh",
  instagram: "",
  tiktok: "https://www.tiktok.com/@adxze98",
  github: "",
  email: "mailto:ahdahzeh@gmail.com",
};

export interface WorkItem {
  id: string;
  slug: string;
  company: string;
  role: string;
  period: string;
  description?: string;
  image?: string;
  link?: string;
  color?: string;
  coverStyle?: boolean;
  coverVideo?: string;
  coverImages?: { desktop: string; mobile: string };
  /** Link preview image when image, coverVideo and coverImages don't give one */
  ogImage?: string;
  /** When true, shows a WIP (work in progress) page instead of the full case study */
  wip?: boolean;
  /** When true, hides from the work carousel and appears only in the archive */
  archived?: boolean;
  caseStudy?: {
    title: string;
    subtitle?: string;
    /** Optional hero line (e.g. "Product Designer/UX Engineer") */
    roleDisplay?: string;
    /** Optional hero line (e.g. "Q1 2024") */
    timeline?: string;
    /** Short intro under hero (e.g. Solstice-style deep dive) */
    heroIntro?: string;
    narrative: string;
    /** When set, narrative is split: part1 + optional middle content (e.g. wireframes) + part2 */
    narrativePart1?: string;
    /** Optional closing paragraph for intro (part1), rendered separately and center-aligned */
    narrativePart1Closing?: string;
    narrativePart2?: string;
    /** Optional paragraph for the "Launched Site" section (e.g. Vemlidy case study) */
    launchedSiteNarrative?: string;
    /** Optional video of the current site (Loom/YouTube/Vimeo URL or path to local video; Vemlidy case study) */
    launchedSiteVideoUrl?: string;
    /** Poster frame for launchedSiteVideoUrl when it is a local file */
    launchedSiteVideoPoster?: string;
    /** Optional images for the Launched Site carousel (when using generic work template) */
    launchedSiteImages?: { src: string; alt: string; caption?: string }[];
    images?: { src: string; alt: string; caption?: string }[];
    videoUrl?: string;
    /** Optional video URL for WeChipn case study Problem & Solution section (file path or Loom/YouTube/Vimeo embed) */
    problemSolutionVideoUrl?: string;
    /** Optional video URL for WeChipn case study Mobile View section (file path or Loom/YouTube/Vimeo embed) */
    mobileViewVideoUrl?: string;
    /** Poster frame for mobileViewVideoUrl when it is a local file */
    mobileViewVideoPoster?: string;
    /** Optional sections for rich case studies (e.g. Amazon): title, content, and images per section */
    sections?: { title?: string; content?: string; images?: { src: string; alt: string; caption?: string }[] }[];
    /** Houzz-style meta block: Team, Tools, Year, Role */
    team?: string;
    tools?: string;
    /** Problem/opportunity framing (e.g. "How can we...?") */
    problemStatement?: string;
    /** Takeaways section: learnings at end of case study */
    takeaways?: { title: string; content: string }[];
    /** Optional 4-up grid items (e.g. Featured Videos, Content Library) for CHT case study */
    fourUpItems?: { src: string; alt: string; caption: string; /** e.g. 1.05 = 5% zoom in tile */ imageScale?: number }[];
    /** Industry label for metadata (e.g. "Healthcare & Pharma Tech") */
    industry?: string;
    /** Video for CHT browser frame section (replaces hero image in frame) */
    browserFrameVideo?: string;
    /** CHT overview: bold lead sentence (Framer-style, ~30px) */
    overviewLead?: string;
    /** CHT HTML: Problem sections (badge, title, content, image) */
    chtProblems?: { badge: string; title: string; content: string; image?: string; imageAlt?: string }[];
    /** CHT: approach principles, shown as numbered cards after the problems */
    chtApproach?: { label: string; title: string; intro?: string; items: { title: string; content: string }[] };
    /** CHT: the work in order. Each chapter is a header followed by galleries, feature sections and notes */
    chtChapters?: {
      label: string;
      title: string;
      intro: string;
      blocks: (
        | { kind: 'gallery'; columns?: 2 | 3; aspect?: string; items: { src: string; alt: string; caption: string; tag?: string }[] }
        | { kind: 'feature'; item: { title: string; content: string; imageAlt: string; image?: string; video?: string } }
        | { kind: 'note'; content: string }
      )[];
    }[];
    /** CHT HTML: Solution sections — use `video` for a browser-frame walkthrough, or `image` for a still */
    chtSolutions?: {
      title: string;
      content: string;
      imageAlt: string;
      image?: string;
      /** Optional .mov/.mp4 path under /public (e.g. /videos/.../file.mov) */
      video?: string;
      /** Optional H.264 .mp4 (same clip); browsers that can't play .mov will use this first */
      videoMp4?: string;
    }[];
    /** CHT HTML: Two-up screenshot pairs */
    chtTwoUpPairs?: { left: { src: string; alt: string; caption: string }; right: { src: string; alt: string; caption: string } }[];
    /** CHT: beta launch chapter (header, launch film, feature sections, team credit) */
    chtBeta?: {
      label: string;
      title: string;
      intro: string;
      film?: { src: string; poster?: string; caption?: string };
      items: { title: string; content: string; imageAlt: string; image?: string; video?: string }[];
      credit?: string;
    };
    /** CHT HTML: Outcome/impact cards */
    chtOutcomes?: { title: string; content: string }[];
    /** CHT HTML: Tools used (e.g. Figma, Cursor) */
    chtTools?: string[];
  };
}

export const workHistory: WorkItem[] = [
  {
    id: "12",
    slug: "wtv",
    company: "WTV",
    role: "Design Engineer",
    period: "2026",
    description: "NYC block intelligence — native iOS app for hyperlocal city data",
    coverVideo: "/videos/work/wtv/hero.mp4",
    ogImage: "/videos/work/wtv/feed.png",
    color: "#E85D3A",
    archived: true,
    caseStudy: {
      title: "WTV",
      subtitle: "NYC Block Intelligence — Native iOS",
      roleDisplay: "Design Engineer",
      timeline: "2026",
      narrative: "WTV is a native iOS app built in SwiftUI that gives New Yorkers a live block-level intelligence layer: curated spots, restaurant grades, live events, transit crowding, traffic incidents, rat activity, and pothole conditions. One app, every layer of the block.",
    },
  },
  {
    id: "11",
    slug: "scour",
    company: "Scour",
    role: "Design Engineer",
    period: "2025–2026",
    description: "AI shopping agent for luxury and streetwear secondary market",
    image: "/images/work/scour/hero.png",
    coverVideo: "/videos/work/scour/iphone-mockup.mp4",
    color: "#00FF66",
    link: "https://scour-app.vercel.app",
    caseStudy: {
      title: "SCOUR",
      subtitle: "AI Shopping Agent — Luxury & Streetwear",
      roleDisplay: "Design Engineer",
      timeline: "2025–2026",
      videoUrl: "/videos/work/scour/promo.mp4",
      narrative: `Scour is a personal project I designed and built from scratch—an AI-powered shopping agent for the luxury and streetwear secondary market. The idea came from my own frustration: finding the best price on a pair of Margiela Replicas or a Bottega bag means checking Grailed, GOAT, StockX, eBay, Vestiaire, and dozens of Shopify stores one by one. Scour aggregates 30+ sources into a single search, scores every listing, and tells you whether you're overpaying—before you buy.

I own every layer of this product: product strategy, UX/UI design, design system, frontend engineering, backend architecture, and deployment. Built with Next.js, TypeScript, Tailwind CSS, Supabase, Vercel AI SDK, and Claude API. Deployed on Vercel as a mobile-first PWA.

The design language sits at the intersection of SSense's editorial brutalism (stark white, product-as-hero, restrained typography) and StockX's financial data motifs (deal scores, sparklines, price ranges). The core design challenge was balancing data density with editorial appeal—each listing carries 7+ data points that need to be legible at a glance without overwhelming the browsing experience.

I prototyped four distinct card system directions—Editorial Cards, Data-Forward Cards, Minimal Object, and a hybrid Carousel + Cards approach—before landing on the final direction. This systematic exploration was how I compensated for designing without a team: multiple directions, honest evaluation, then commit.`,
    }
  },
  {
    id: "2",
    slug: "community-health-media",
    company: "Community Health Media (CHT)",
    role: "Product Designer",
    period: "2026",
    description: "Product design for community health platform",
    image: "/images/work/community-health-media/site-walkthrough-2026-poster.jpg",
    coverVideo: "/videos/work/community-health-media/site-walkthrough-2026-card.mp4",
    color: "#ea580c",
    wip: false,
    link: "https://communityhealth.media/",
    caseStudy: {
      title: "Community Health Media",
      subtitle: "Designing a digital platform that transforms how pharma educates and engages healthcare professionals.",
      roleDisplay: "Product Design\nDesign Engineering",
      timeline: "Dec 2025 – Present",
      team: "AO, DE",
      problemStatement: "Designing the future of healthcare education with no roadmap to follow",
      /** Short intro under the hero - matches HTML reference */
      heroIntro: "Community Health Technologies is redefining how pharma reaches healthcare audiences. I joined as the sole designer in December 2025, when the product was an idea and the public site was a WordPress video blog. Over eleven months I took it from wireframes to a revised brand, a public site rebuilt on WordPress, and a web app for clinicians, designing in Figma first and then more and more in code alongside the engineers. Both shipped in October 2026: the new communityhealth.media, and a Friends & Family beta where HCPs register for live sessions, join, give feedback and get paid in one place.",
      /** Bold lead sentence for overview (Framer-style) */
      overviewLead: "Community Health Technologies is redefining how pharma reaches healthcare audiences.",
      narrative: `At Community Health Media (CHT), I am the product designer on the HCP Content Platform: a public site for oncology education and a web app where healthcare professionals join live sessions, answer surveys and get paid for their time.

The work ran from wireframes in January 2026 to a first coded release in the spring, a brand revision and four builds of the homepage in the summer, a WordPress rebuild of communityhealth.media, and a Friends & Family beta of the app in October 2026.`,
      sections: [
        {
          title: "Overview",
          content: "",
          images: [
            {
              src: "/images/work/community-health-media/site-hero-2026.webp",
              alt: "The communityhealth.media homepage: a gallery of oncology video tiles under the line Medicine Moves Through Shared Knowledge",
              caption: "",
            },
          ],
        },
      ],
      images: [],
      industry: "Healthcare &\nPharma Tech",
      /** Video walkthrough for browser frame section (replaces hero image) */
      browserFrameVideo: "/videos/work/community-health-media/site-walkthrough-2026.mp4",
      chtProblems: [
        { badge: "Problem 01", title: "A video blog, not a platform", content: "communityhealth.media ran on an off-the-shelf WordPress video theme. Hundreds of expert sessions were filed under 44 overlapping categories (her2 and p-her2, hr and p-hr), so the same topic lived in two places and nothing told a clinician where to start. There was no real precedent to copy either: CME portals and conference tools don't match how HCPs fit learning into a working day.", image: "/images/work/community-health-media/legacy-site.webp", imageAlt: "The previous communityhealth.media homepage on a WordPress video theme, May 2026" },
        { badge: "Problem 02", title: "The business ran on email and Zoom", content: "Every interaction between pharma partners, HCPs and content was coordinated by hand: email threads, calendar invites, Zoom links, and honoraria paid through Bill.com. There was no data layer and no way to see what was working. The product had to host the content, run the live-session loop end to end, and make engagement measurable." },
      ],
      chtApproach: {
        label: "Approach",
        title: "How I worked",
        intro: "There was no product to benchmark against, so the method mattered more than any single screen. Four rules held from the first wireframe to launch.",
        items: [
          { title: "Organize around clinical questions", content: "Clinicians look for a disease state first, then a subtype, then a trial. Every surface follows that order, from the homepage to the library filters: breast cancer, then HER2+, HR+ or triple negative, then DESTINY-Breast09." },
          { title: "One recording, three formats", content: "CHM records one expert conversation and publishes it as video, podcast and editorial. The design treats those as one piece of content with three ways in, not three separate libraries." },
          { title: "Explore wide in real code, then converge", content: "Every big decision got several working versions before one was picked: three brand directions, four builds of the homepage, three ways to render the hero, two layouts for the faculty profile. Building them in code meant stakeholders reacted to something they could click." },
          { title: "One design system across both products", content: "The WordPress theme and the React app read the same design tokens, copied across unchanged, so the public site and the signed-in product can't drift apart." },
        ],
      },
      chtChapters: [
        {
          label: "Chapter 01 · Dec 2025 – Jan 2026",
          title: "Wireframes before anything had a name",
          intro: "I started with structure, not style: what an HCP needs to find, and in what order. Wireframes 2.0 laid out the homepage as a run of jobs (browse by treatment type, watch, register for the next live webinar with its faculty, find resources). The first high-fidelity pass turned each disease into a page of biomarker playlists, HER2+, HR+, triple negative, HER2-low and high risk, the idea the whole library is still built on.",
          blocks: [
            {
              kind: "gallery",
              items: [
                { src: "/images/work/community-health-media/wf-home.webp", alt: "Grayscale homepage wireframe with a hero, treatment type carousel and video carousel", tag: "Wireframes 2.0 · Jan 2026", caption: "The homepage as a sequence of jobs: discover by treatment type, watch, then register for what is live." },
                { src: "/images/work/community-health-media/hifi-disease.webp", alt: "High-fidelity breast cancer page with featured video, webinar and biomarker playlists", tag: "High fidelity · Jan 2026", caption: "Breast cancer as biomarker playlists, the first version of browsing by disease state." },
              ],
            },
          ],
        },
        {
          label: "Chapter 02 · Apr – Jul 2026",
          title: "Version one, in code",
          intro: "Engineering built the first release from the Figma files, and in April I moved into the codebase myself to close the gap between design and build: syncing screens to the reviewed designs, fixing dark-mode contrast, evening out the content cards and moving search into the header. Living with the real product exposed the next problem. Orange was carrying the logo, every button, payments, live states and the warm moments all at once, so nothing stood out. In July I rebuilt the color layer as design tokens, with teal as the primary and orange as a sparing accent, which set up the brand work that followed.",
          blocks: [
            {
              kind: "gallery",
              columns: 3,
              items: [
                { src: "/images/work/community-health-media/v1-home.webp", alt: "First public homepage with a full-bleed hero and featured videos", tag: "v1 · Apr 2026", caption: "The first public homepage: a full-bleed hero and a strip of featured videos." },
                { src: "/images/work/community-health-media/v1-catalog.webp", alt: "First catalog page with a featured session and tag and doctor filters", tag: "v1 · Apr 2026", caption: "The catalog led with one featured session, filtered by tag and by doctor." },
                { src: "/images/work/community-health-media/v1-app-explore.webp", alt: "First in-app Explore page with best match, live, video and survey tabs", tag: "v1 · Apr 2026", caption: "In the app, Explore sorted opportunities by best match, live, video and survey." },
              ],
            },
          ],
        },
        {
          label: "Chapter 03 · Aug 2026",
          title: "Three brand directions, then a revision",
          intro: "Before redesigning the site, CHM needed a sharper brand. I explored three directions, each with its own palette, type and motion: ATLAS framed CHM as an evidence layer, SIGNAL as a live broadcast network, and VITAL as a living network of experts. All three were set aside for a revision of the existing identity. The logo and typeface stay, and the palette tightens to four colors on one ground, each with exactly one job. Orange left the core palette, and each of its old jobs got a clearer owner.",
          blocks: [
            {
              kind: "gallery",
              columns: 3,
              aspect: "40 / 27",
              items: [
                { src: "/images/work/community-health-media/brand-atlas.webp", alt: "ATLAS brand direction: knowledge graph, specification sheet and Klein blue palette", tag: "Direction 01 · ATLAS", caption: "The evidence layer: knowledge graphs, spec sheets and an academic serif." },
                { src: "/images/work/community-health-media/brand-signal.webp", alt: "SIGNAL brand direction: dark broadcast look with an on-air badge and phosphor green", tag: "Direction 02 · SIGNAL", caption: "A broadcast network: on-air badges, waveforms and timecodes." },
                { src: "/images/work/community-health-media/brand-vital.webp", alt: "VITAL brand direction: fuchsia network of expert nodes on cream", tag: "Direction 03 · VITAL", caption: "A living network: experts as nodes, warm and saturated." },
              ],
            },
            {
              kind: "gallery",
              columns: 3,
              aspect: "1600 / 1076",
              items: [
                { src: "/images/work/community-health-media/brand-guide-colors.webp", alt: "Brand guide page showing four colors on one ground", tag: "Brand guide v2", caption: "Knowledge Blue, Deep Expertise, Amber and Precision Ink on Base White." },
                { src: "/images/work/community-health-media/brand-guide-orange.webp", alt: "Brand guide page reassigning each job orange used to do", tag: "Brand guide v2", caption: "Every job orange was doing, handed to a clearer owner." },
                { src: "/images/work/community-health-media/brand-guide-wild.webp", alt: "Brand guide page applying the palette to thumbnails, a poster, the app and avatars", tag: "Brand guide v2", caption: "The same system on thumbnails, posters, the app and avatars." },
              ],
            },
          ],
        },
        {
          label: "Chapter 04 · Aug – Sep 2026",
          title: "Four builds of one homepage",
          intro: "With the brand settled, I designed the new public site directly in code so each direction could be clicked through end to end. I built the homepage four times, from a light editorial shelf to a dark build, then tested section orders A, B and C and a bento variant inside the app before order C became the homepage. The hero went through the same loop: a CSS 3D room, a Canvas 2D version and a WebGL cylinder, ending in the gallery of video tiles that ships today.",
          blocks: [
            {
              kind: "gallery",
              columns: 3,
              items: [
                { src: "/images/work/community-health-media/dir-shelf.webp", alt: "Shelf homepage build with Chillax headline and stacked session cards", tag: "Build · Shelf", caption: "Chillax display type, stacked session cards and a tab for each tumor track." },
                { src: "/images/work/community-health-media/dir-editorial-light.webp", alt: "Light editorial homepage build with a large headline over faded session tiles", tag: "Build · Editorial, light", caption: "Large, tight type over a field of session tiles." },
                { src: "/images/work/community-health-media/dir-editorial-dark.webp", alt: "Dark editorial homepage build with a blue primary button", tag: "Build · Editorial, dark", caption: "The same structure in dark mode, with one electric blue action." },
              ],
            },
            {
              kind: "gallery",
              columns: 3,
              items: [
                { src: "/images/work/community-health-media/hero-proto-css.webp", alt: "Hero prototype with session cards angled in a CSS 3D room", tag: "Hero · CSS 3D", caption: "Session and disease-state cards angled around the viewer with CSS transforms." },
                { src: "/images/work/community-health-media/hero-proto-canvas.webp", alt: "Hero prototype redrawn on canvas with flat session cards", tag: "Hero · Canvas 2D", caption: "The same room redrawn on canvas, flatter and easier to keep smooth." },
                { src: "/images/work/community-health-media/site-hero-2026.webp", alt: "Shipped hero: a curved gallery of video tiles", tag: "Hero · Shipped", caption: "The live gallery: video tiles in a curved room that pauses under the pointer." },
              ],
            },
          ],
        },
        {
          label: "Chapter 05 · Sep – Oct 2026",
          title: "Moving the public site onto WordPress",
          intro: "The new design first lived in the React app, but CHM's content already lived in WordPress: more than 500 posts, 44 categories and dozens of KOL series, with a webhook feeding the app's content hub. Rendering the public site from WordPress removed a layer instead of adding one, and the content team kept publishing the way they already did. I wrote the launch brief, ported the design into a custom theme, and split the build into four parallel workstreams (homepage, content library, KOL network and site pages) that I reviewed and merged.",
          blocks: [
            {
              kind: "gallery",
              items: [
                { src: "/images/work/community-health-media/wp-formats.webp", alt: "Homepage formats row with video, podcast and editorial cards above featured content", tag: "Homepage", caption: "One recording, three formats: the content library, the podcast network, and news and insights." },
                { src: "/images/work/community-health-media/wp-disease.webp", alt: "Explore by disease state grid and This Moment in Medicine episodes", tag: "Homepage", caption: "Explore by disease state, then This Moment in Medicine, the live episode series." },
                { src: "/images/work/community-health-media/wp-kols-row.webp", alt: "Meet the experts row with four faculty cutout portraits", tag: "Homepage", caption: "Meet the experts: the KOL row, rebuilt with cutout portraits." },
                { src: "/images/work/community-health-media/wp-podcasts.webp", alt: "CHM podcast network with four show cards", tag: "Homepage", caption: "The podcast network: four shows, each with its own color." },
                { src: "/images/work/community-health-media/wp-catalog.webp", alt: "Content library with a featured episode, search, format filters and sort", tag: "Content library", caption: "Search, format filters and sort across every session, podcast and article." },
                { src: "/images/work/community-health-media/wp-kol-directory.webp", alt: "KOL network directory with search by name, state and institution", tag: "KOL network", caption: "A faculty directory you can search by name, state and institution." },
              ],
            },
            { kind: "note", content: "Under the hood, the theme reads the app's design tokens unchanged and renders every page on the server, so it works with JavaScript off. Every post kept its URL, categories moved under /catalog/ with 301 redirects from the old paths, and no page scrolls sideways on a 375px phone. It went live on communityhealth.media in October 2026." },
          ],
        },
        {
          label: "Chapter 06 · Sep – Oct 2026",
          title: "The app clinicians sign in to",
          intro: "The signed-in product moved to the same design language. I rebuilt the dashboard around what an HCP needs next: the next live session, earnings and required surveys. The content library follows the public site's disease-state structure, the KOL directory leads with large portraits and bios, and each podcast has its own channel page. For the internal team I also designed admin tools, including a post-production studio that cuts clips, thumbnails and social posts from each recording.",
          blocks: [
            {
              kind: "gallery",
              items: [
                { src: "/images/work/community-health-media/beta-dashboard.webp", alt: "Dashboard", tag: "Dashboard", caption: "The next live session, earnings and required surveys at a glance." },
                { src: "/images/work/community-health-media/beta-library.webp", alt: "Content Library", tag: "Content library", caption: "Browse by disease state: TNBC, HER2+ and more." },
                { src: "/images/work/community-health-media/beta-kol-network.webp", alt: "KOL Network", tag: "KOL network", caption: "Leading oncology faculty, each with a profile and their sessions." },
                { src: "/images/work/community-health-media/beta-podcasts.webp", alt: "Podcasts", tag: "Podcasts", caption: "Four shows in one network, with the latest episodes up front." },
              ],
            },
          ],
        },
      ],
      chtBeta: {
        label: "Chapter 07 · Launch · October 2026",
        title: "From prototype to a live beta",
        intro: "The Friends & Family beta put the platform in front of practicing clinicians for the first time. Its first session tested the whole loop: sign in, register, join the webinar, answer the survey, and confirm payout details. After launch I redesigned the two steps between finishing a session and getting paid.",
        film: {
          src: "/videos/work/community-health-media/chm-beta-walkthrough.mp4",
          poster: "/images/work/community-health-media/chm-beta-walkthrough-poster.jpg",
          caption: "The walkthrough I made for invited HCPs: sign-in to payout in two minutes, shown with test data.",
        },
        items: [
          {
            title: "Post-event steps as one guided path",
            content: "Finishing a session used to mean a requirements checklist, a survey, and a separate Payments page to find on your own. I turned it into a four-step map (attend, survey, payment info, done) at the top of the session page that opens a drawer wizard. Teal marks where you are, orange marks what needs attention, and the step labels stay readable on a phone. Survey answers save as a draft, so closing the drawer never loses work.",
            imageAlt: "Post-event steps: survey, payment info, and confirmation in the drawer wizard",
            video: "/videos/work/community-health-media/beta-post-event-steps.mp4",
          },
          {
            title: "Payout setup as one bank card",
            content: "Getting paid used to start with W-9 and payout forms on their own page. Now payout setup is a single card inside the flow, with 1-2-3 guidance for connecting a bank through Stripe. Once connected, HCPs see a masked card with the account holder, method, and last four digits, and confirm it in one click. The platform keeps only a reference and the masked value, never the account number.",
            imageAlt: "Confirm payment information step with the connected bank card",
            image: "/images/work/community-health-media/beta-payout-card.webp",
          },
        ],
        credit: "Alongside these, the engineering team shipped an honorarium pipeline that lets finance release or hold payouts, an admin survey workspace, role-based admin access, a beta feedback survey, and beta terms and invitations.",
      },
      chtOutcomes: [
        { title: "Live with clinicians", content: "The Friends & Family beta opened on October 20, 2026. Clinicians register, join, give feedback and get paid without leaving the platform." },
        { title: "Payouts without the paperwork", content: "Honoraria moved from Bill.com and email follow-ups to in-app Stripe payouts, with a pipeline finance can filter, release or hold." },
        { title: "A public site the team can run", content: "communityhealth.media now renders from WordPress, where the content already lived, with every post at its old URL and the app's design system carried over unchanged." },
      ],
      chtTools: ["Figma", "Cursor", "Claude Code", "React", "Vite", "Tailwind", "WordPress", "PHP", "Supabase", "AWS", "Stripe", "Zoom"],
    }
  },
  {
    id: "14",
    slug: "morton-salt",
    company: "Morton Salt",
    role: "Product Designer",
    period: "Feb 2026",
    description: "Full website redesign, consumer product pages, B2B food service and manufacturing funnels, animated mascot system",
    ogImage: "/images/work/morton-salt.png",
    color: "#0034BA",
    caseStudy: {
      title: "Morton Salt",
      subtitle: "Website Redesign, Cerebral",
      roleDisplay: "Product Designer",
      timeline: "February 2026",
      narrative: "Full redesign of mortonssalt.com at Cerebral, covering seven distinct page templates across consumer and B2B audiences. Built a rigged Figma character system for the Morton Girl mascot with Smart Animate prototyping between three distinct poses.",
    },
  },
  {
    id: "13",
    slug: "lockdin",
    company: "LOCKDIN",
    role: "Design Engineer",
    period: "2026",
    description: "Native iOS ADHD management app — Dynamic Island coaching, AI brain dump, focus mode with procedural ambient audio",
    image: "/images/work/lockdin/cover-padlock.png",
    coverVideo: "/videos/work/lockdin/cover-padlock.mp4",
    color: "#6741D9",
    caseStudy: {
      title: "LOCKDIN",
      subtitle: "ADHD Productivity App",
      roleDisplay: "Product Designer / iOS Developer",
      timeline: "2026",
      narrative: "Native iOS ADHD management app built in Swift 6/SwiftUI. Dynamic Island coaching, AI brain dump with lane sorting, Focus mode with procedural ambient audio and CoreHaptics breathing patterns. First Swift project, shipped in under 24 hours using Claude as a coding partner.",
    }
  },
  {
    id: "12",
    slug: "autopilot",
    company: "Job Pilot Automation",
    role: "Design Engineer",
    period: "2025",
    description: "AI-powered job application pipeline that automates discovery, qualification, resume tailoring, and submission",
    image: "/images/work/autopilot/cover.png",
    coverVideo: "/videos/work/autopilot/cover.mp4",
    color: "#534AB7",
    caseStudy: {
      title: "JOB PILOT",
      subtitle: "AI Job Application Automation",
      roleDisplay: "Design Engineer",
      timeline: "2025",
      videoUrl: "/videos/work/autopilot/promo.mp4",
      narrative: `Job Pilot Automation is a personal tool I built to solve a real problem: the modern job search is broken. Applying to 50+ roles a week means hours of repetitive work—finding listings, checking qualifications, tailoring resumes, writing cover letters. I built an end-to-end AI pipeline that automates the entire workflow while maintaining quality that passes human review.

The system runs a 4-stage pipeline: Discovery (scraping job boards), Qualification (AI scoring against my profile), Tailoring (Claude-powered resume and cover letter generation), and Submission (automated form filling). Each stage has guardrails, fallbacks, and human-in-the-loop checkpoints.

Built with TypeScript, Puppeteer, Claude API, and a custom orchestration layer. The AI tailoring engine uses structured prompts with anti-hallucination guardrails—it can only use experiences that actually exist in my master resume, rearranging and emphasizing rather than fabricating.`
    }
  },
  {
    id: "1",
    slug: "morton-salt",
    company: "Morton Salt",
    role: "UX Designer",
    period: "2026",
    description: "UX design for Morton Salt digital experiences",
    image: "/images/work/morton-salt.png",
    color: "#fbbf24",
    wip: true,
    archived: true,
    caseStudy: {
      title: "MORTON SALT",
      subtitle: "Digital Experience Design",
      narrative: `Currently working as a UX Designer on Morton Salt's digital initiatives, creating user-centered experiences for one of America's most iconic brands.`
    }
  },
  {
    id: "8",
    slug: "amazon",
    company: "Amazon",
    role: "UX Designer",
    period: "2023",
    description: "Design system for Amazon Inspire and Shop By Interest",
    color: "#f59e0b",
    image: "/images/work/amazon.png",
    coverStyle: true,
    caseStudy: {
      title: "AMAZON",
      subtitle: "Inspirational Shopping",
      roleDisplay: "UX Designer",
      timeline: "2023",
      narrative: `Working at Amazon was my first experience designing at true scale. I joined the team working on Amazon Inspire and Shop By Interest—experimental shopping experiences aimed at helping customers discover products they didn't know they wanted.

The challenge was fascinating: Amazon has millions of products, but traditional search and category navigation only work when you know what you're looking for. What about inspiration-driven shopping? What about the customer who's just browsing, open to discovering something new?

I worked within a cross-functional team of product managers, engineers, and data scientists. My role focused on the design system and interaction patterns that would power these new discovery experiences. We were essentially creating a visual, feed-based shopping experience—think social media meets e-commerce.

The process was heavily data-driven. We ran constant A/B tests, sometimes testing micro-interactions to see how small changes affected engagement. I learned to balance design intuition with empirical evidence—sometimes the data surprised us, sometimes it confirmed our hypotheses.

I contributed to component libraries that needed to scale across different product categories while maintaining consistency with Amazon's broader design language. It was a lesson in systems thinking—every component I designed would be used by other teams, so documentation and flexibility were crucial.

The work reached millions of customers. But beyond the scale, what I took away was an understanding of how large organizations ship product. The collaboration required, the processes that enable speed without chaos, the importance of clear communication across distributed teams.`,
      sections: [
        // Add more sections from your PDF. Each section can have title, content, and images.
        // Example: { title: "Design system", content: "Paste text from PDF...", images: [{ src: "/images/work/amazon/page-1.png", alt: "Description", caption: "Optional caption" }] }
      ],
    }
  },
  {
    id: "3",
    slug: "vemlidy",
    company: "Vemlidy",
    role: "Senior UX Designer",
    period: "2025",
    description: "Patient engagement platform for hepatitis B treatment",
    color: "#6366f1",
    coverImages: {
      desktop: "/images/work/vemlidy/desktop.png",
      mobile: "/images/work/vemlidy/mobile.png"
    },
    caseStudy: {
      title: "VEMLIDY",
      subtitle: "Hepatitis B Patient Engagement",
      roleDisplay: "Senior UX Designer",
      timeline: "2025",
      narrative: `Vemlidy is a hepatitis B treatment by Gilead Sciences. I led the UX design for the patient engagement platform, working closely with medical, legal, and regulatory teams to ensure everything met compliance standards while still feeling human and approachable.

Healthcare UX is a unique challenge. You're designing for patients who may be dealing with difficult diagnoses, for clinicians who are already overwhelmed with administrative burden, and for clients who operate under strict regulatory requirements. Every design decision carries weight.`,
      narrativePart2: `My approach was rooted in research. I conducted empathy interviews with patients to understand their daily struggles with medication adherence. These insights directly informed the interfaces I designed—medication reminder systems that actually fit into people's lives, resources that help patients understand their condition.

The work focused on accessibility and health literacy, ensuring patients from all backgrounds could navigate the platform with ease.`,
      launchedSiteNarrative: `The site launched with separate experiences for healthcare providers (HCP) and patients. On the HCP side, I designed the efficacy and safety experience—pivotal and long-term data, trials, and guidelines—so clinicians could quickly find what they need. My contribution was end-to-end UX from wireframes through launch: defining structure, content hierarchy, and interactions while working with medical, legal, and regulatory to keep everything compliant and on-brand. The live site reflects that—one experience for the moments that matter to patients, and one for the evidence that matters to clinicians.`,
      launchedSiteVideoUrl: "/videos/work/vemlidy/vemlidy-site.mp4",
      launchedSiteVideoPoster: "/images/work/vemlidy/vemlidy-site-poster.jpg",
    }
  },
  {
    id: "4",
    slug: "block-equity-group",
    company: "Block Equity Group",
    role: "Product Designer",
    period: "2024",
    description: "Founded UX vision and led design for small business financing portal",
    color: "#f59e0b",
    image: "/images/work/block-equity-group/cover.png",
    link: "https://www.blockequitygr.com/",
    caseStudy: {
      title: "BLOCK EQUITY GROUP",
      subtitle: "Small Business Financing Platform",
      roleDisplay: "Product Designer",
      timeline: "2024",
      narrative: `Block Equity Group brought me on as their first Product Designer to build their small business financing platform from scratch. It was the kind of opportunity where you get to shape everything—not just the UI, but the entire product vision and design system.

Small business financing is, frankly, a mess. Applications involve mountains of paperwork, endless back-and-forth between borrowers and lenders, and timelines that stretch into weeks or months. Block Equity wanted to digitize and streamline the process—offering term loans, revenue-based financing, lines of credit, bridge loans, SBA loans, invoice factoring, and more through a single, easy-to-use experience.

I started with discovery. Spent weeks interviewing small business owners, loan officers, and partners to understand their pain points. The insights were clear: people were drowning in document management, had no visibility into application status, and lacked trust in the process because everything felt opaque.

From there, I mapped the entire lending journey and identified opportunities for intervention. I designed an intelligent document management system that could automatically categorize and validate uploads. I created a real-time application tracker that gave borrowers visibility at every stage. For the team, I built dashboards that display all the most important information the sales broker would need—application status, deal pipeline, document status, and communication history in one place so brokers can move deals forward without hunting across tools.

The platform I designed acted as a connecting point between lenders and lendees, allowing both parties to see every step they're in within the process. It also enables the team to have better data collection, more accurate communication, and faster response times—which leads to closed deals.

I also established the design system from the ground up—50+ reusable components that ensured consistency as the platform grew. This was crucial for a startup where speed matters but you can't afford to accumulate design debt.

The platform launched successfully. Block Equity Group continues to help small businesses access working capital—fast, simple, and trusted financing.`,
      narrativePart1: `Block Equity Group brought me on as their first Product Designer to build their small business financing platform from scratch. It was the kind of opportunity where you get to shape everything—not just the UI, but the entire product vision and design system.

Small business financing is, frankly, a mess. Applications involve mountains of paperwork, endless back-and-forth between borrowers and lenders, and timelines that stretch into weeks or months. Block Equity wanted to digitize and streamline the process—offering term loans, revenue-based financing, lines of credit, bridge loans, SBA loans, invoice factoring, and more through a single, easy-to-use experience.`,
      narrativePart1Closing: `I started with discovery. Spent weeks interviewing small business owners, loan officers, and partners to understand their pain points. The insights were clear: people were drowning in document management, had no visibility into application status, and lacked trust in the process because everything felt opaque.`,
      narrativePart2: `From there, I mapped the entire lending journey and identified opportunities for intervention. I designed an intelligent document management system that could automatically categorize and validate uploads. I created a real-time application tracker that gave borrowers visibility at every stage. For the team, I built dashboards that display all the most important information the sales broker would need—application status, deal pipeline, document status, and communication history in one place so brokers can move deals forward without hunting across tools.

The platform I designed acted as a connecting point between lenders and lendees, allowing both parties to see every step they're in within the process. It also enables the team to have better data collection, more accurate communication, and faster response times—which leads to closed deals.

I also established the design system from the ground up—50+ reusable components that ensured consistency as the platform grew. This was crucial for a startup where speed matters but you can't afford to accumulate design debt.

The platform launched successfully. Block Equity Group continues to help small businesses access working capital—fast, simple, and trusted financing.`,
      videoUrl: "https://www.loom.com/share/0c65d435e0da4b86ba43a42e06cf911f",
      images: [
        { src: "/images/work/block-equity-group/admin-console.png", alt: "Admin Console", caption: "Admin Console — User Manager, Partner Manager, Access Logs" },
        { src: "/images/work/block-equity-group/dashboard-overview.png", alt: "Dashboard overview", caption: "Dashboard — Active Tasks, Notifications, Monthly Statistics, Commission Tracker" },
        { src: "/images/work/block-equity-group/commission-tracker.png", alt: "Monthly Submission + Commission Tracker", caption: "Commission Tracker — broker points bar chart" },
        { src: "/images/work/block-equity-group/file-request-detail.png", alt: "File request detail", caption: "File Requests — expanded request with client info and requested files" },
        { src: "/images/work/block-equity-group/submit-application-partners.png", alt: "Submit Application — API partners", caption: "Submit Application — Setup step, API partner selection" },
        { src: "/images/work/block-equity-group/submit-application-files.png", alt: "Submit Application — Files", caption: "Submit Application — Files step, signed application uploads" },
        { src: "/images/work/block-equity-group/applications-table.png", alt: "Applications table", caption: "Applications — recent applications table view" },
        { src: "/images/work/block-equity-group/file-requests-dashboard.png", alt: "File Requests dashboard", caption: "File Requests — recent file requests list" },
        { src: "/images/work/block-equity-group/applications-expanded.png", alt: "Applications with expanded row", caption: "Applications — expanded application details and document list" },
        { src: "/images/work/block-equity-group/application-details-modal.png", alt: "Application Details modal", caption: "Application Details — primary applicant, broker reassignment, documents" }
      ]
    }
  },
  {
    id: "7",
    slug: "wechipn",
    company: "WeChipn",
    role: "Product Designer",
    period: "2024",
    description: "Product design for collaborative platform",
    archived: true,
    color: "#14b8a6",
    coverImages: {
      desktop: "/images/work/wechipn/desktop.png",
      mobile: "/images/work/wechipn/mobile.png"
    },
    caseStudy: {
      title: "WECHIPN",
      subtitle: "UX Design (Mobile/Web App)",
      roleDisplay: "Product Designer/UX Engineer",
      timeline: "Q1 2024",
      narrative: `WeChipn is a social organization in partnership with Live Nation that pushes for social action and community building. Their mission is to catalyze One Billion actions worldwide by 2028, empowering a global community of forward-thinkers and activists. I served as a UX/UI designer on this project designing all screens myself and aiding with some front end code.

The Old Experience

WeChipn's old interface was confusing for users to maneuver and was not engaging for their target audience.

Problem

WeChipn struggled to retain users as they could not properly engage their customer base due to complicated and outdated design patterns. This restricted their opportunity to grow and had the potential of at least 50% increase in user retention.

Solution

This case study addresses a highly complex issue with significant business impact. I made design decisions based on direct user feedback, estimated conversion rates, and considerations for design scalability. I iterated fast with rapid feedback.

The new landing page featured large copy and engaging CTAs that appealed to an audience that cares about the community while also being privy to style and taste. As the user scrolls, the many features of the company are presented with bold engaging CTAs and photos from real community events and engagement, giving a sense of identity to the company and their plans.

The Rewards Center and Actions pages are key parts of the WeChipn program. The benefit of the program is the user's ability to earn reward points to go to different concerts and events by performing actions in their community. The pages feature large text CTAs and also have built-in filtering based on their location. The filtering buttons have filled and unfilled options and the actions and rewards change in each location.

The entire webapp is responsive and the mobile optimization was done to keep the same level of engagement and interaction at the user's fingertips. The menu CTAs were condensed into a hamburger menu and the 3-column structure was condensed into a 1-column image-focused card.

Key takeaways: If more time was allotted for the project I would have loved to continue testing even after the project was completed to see how well users are engaging with the app. Working on the code side by side with the engineer made for a more seamless and efficient process—I knew the proper way all my designs should be translated.`,
      problemSolutionVideoUrl: "/videos/work/wechipn/problem-solution-1.mp4",
      mobileViewVideoUrl: "/videos/work/wechipn/mobile-view.mp4",
      mobileViewVideoPoster: "/images/work/wechipn/mobile-view-poster.jpg"
    }
  },
  {
    id: "5",
    slug: "abilify",
    company: "Abilify",
    role: "Senior UX Designer",
    period: "2025",
    description: "Mental health patient support platform",
    color: "#8b5cf6",
    image: "/images/work/abilify/cover.png",
    coverStyle: true,
    archived: true,
    caseStudy: {
      title: "ABILIFY",
      subtitle: "Mental Health Patient Support",
      narrative: `Abilify is a mental health medication used to treat conditions like schizophrenia, bipolar disorder, and depression. I designed the patient support platform, focusing on creating a calming, supportive digital experience for users managing mental health conditions.

The design challenge was unique—creating interfaces that feel reassuring rather than clinical, while still meeting strict pharmaceutical compliance requirements. I worked closely with mental health advocates and medical teams to ensure the tone and functionality supported patients' emotional needs.

The platform includes medication tracking, appointment reminders, and educational resources—all designed with sensitivity to the mental health context.`,
      launchedSiteNarrative: `The site launched with a patient-focused experience that prioritizes clarity and emotional support. On the patient side, I designed the core experience—medication tracking, appointment reminders, and educational resources—so users could manage their care without feeling overwhelmed. My contribution was end-to-end UX from wireframes through launch: defining structure, content hierarchy, and interactions while working with mental health advocates and medical teams to keep the tone reassuring and compliant. The live site reflects that—one experience built for the moments that matter to people managing mental health conditions.`,
      launchedSiteImages: [
        { src: "/images/work/abilify/1.png", alt: "Abilify launched site", caption: "Patient support platform — key screens." },
        { src: "/images/work/abilify/2.png", alt: "Abilify launched site", caption: "Patient support platform — resources and tracking." },
      ],
    }
  },
  {
    id: "6",
    slug: "miebo",
    company: "Miebo",
    role: "Senior UX Designer",
    period: "2025",
    description: "Dry eye treatment patient engagement platform",
    color: "#ec4899",
    image: "/images/work/meibo/cover.png",
    coverStyle: true,
    archived: true,
    caseStudy: {
      title: "MIEBO",
      subtitle: "Dry Eye Treatment Launch",
      narrative: `Miebo is a dry eye treatment by Bausch + Lomb. I led the UX design for the patient engagement platform, working closely with medical, legal, and regulatory teams to ensure everything met compliance standards while still feeling human and approachable.

This project won a MM+M Awards GOLD for Product Launch, which was a proud moment for the team. The platform helps patients understand their condition, track their treatment progress, and connect with healthcare providers.

My approach focused on simplicity and clarity—dry eye patients often experience screen fatigue, so every interface decision was made with their comfort in mind.`,
      launchedSiteNarrative: `The site launched with a patient engagement experience that puts clarity and comfort first. I designed the patient-facing experience—condition education, treatment progress, and connection to healthcare providers—so users could understand their care without added visual strain. My contribution was end-to-end UX from wireframes through launch: defining structure, content hierarchy, and interactions while working with medical, legal, and regulatory to keep everything compliant and on-brand. The live site reflects that—one experience for the moments that matter to patients, and this project went on to win a MM+M Awards GOLD for Product Launch.`,
      launchedSiteImages: [
        { src: "/images/work/meibo/desktop.png", alt: "Miebo launched site — desktop", caption: "Miebo patient engagement — desktop experience." },
        { src: "/images/work/meibo/mobile.png", alt: "Miebo launched site — mobile", caption: "Miebo patient engagement — mobile experience." },
      ],
    }
  },
  {
    id: "9",
    slug: "swank-studio",
    company: "Swank Studio",
    role: "Digital Designer",
    period: "2023",
    description: "Digital and print assets for brands like Broccoli City",
    color: "#ec4899",
    image: "/images/work/swank-studio/cover.png",
    coverStyle: true,
    archived: true,
    caseStudy: {
      title: "SWANK STUDIO",
      subtitle: "Broccoli City & Culture-Forward Brands",
      narrative: `Swank Studio was where I cut my teeth on brand and visual design. As a Digital Designer, I created assets for entertainment and lifestyle brands—the most notable being Broccoli City, one of DC's largest music festivals and cultural events.

This work was different from product design. Here, it was about capturing energy, emotion, and cultural relevance. Every social media graphic, every piece of event signage, every merchandise design needed to resonate with an audience that could smell inauthenticity from a mile away.

For Broccoli City, I designed comprehensive visual campaigns spanning everything from Instagram posts to massive stage banners. The festival celebrates Black culture and community, so the design work needed to reflect that—bold, vibrant, unapologetic. I worked closely with the marketing team to understand each campaign's goals and then translated those into visual systems that could flex across dozens of touchpoints.

I learned the importance of design systems in a different context here. When you're producing 100+ assets per campaign, you need templates and patterns that maintain consistency while allowing for creative variation. I built flexible systems that the team could use long after specific campaigns ended.

The work reached over 50,000 festival attendees and drove significant social media engagement. But more than metrics, this role taught me how design can serve culture—how visual identity can make people feel seen and represented.`
    }
  },
  {
    id: "10",
    slug: "eki-express",
    company: "Eki Express",
    role: "Product Designer",
    period: "2022",
    description: "Mobile app design for African Market e-commerce startup",
    color: "#14b8a6",
    image: "/images/work/eki-express/cover.png",
    coverStyle: true,
    archived: true,
    caseStudy: {
      title: "EKI EXPRESS",
      subtitle: "African Marketplace E-commerce",
      narrative: `Eki Express was my introduction to startup product design. The company was building a mobile-first e-commerce platform to connect African diaspora communities with authentic African marketplace products—think specialty foods, traditional clothing, and artisanal goods.

The user base presented unique design challenges. We were serving a diaspora community spread across the US and Europe, with varying levels of tech literacy and different cultural expectations around shopping. Many users were more familiar with physical marketplace haggling than e-commerce checkout flows.

I conducted user interviews across multiple diaspora communities to understand their needs and hesitations. Trust was a recurring theme—people wanted assurance that products were authentic, that international shipping was reliable, that their money was safe. These insights shaped every design decision.

I designed the mobile app from the ground up, prioritizing clarity and simplicity. Product categorization was organized by regional markets—Nigerian, Ghanaian, Ethiopian—reflecting how users actually thought about these goods. I integrated currency conversion so users could see prices in their local currency. Delivery tracking was prominent because shipping transparency was a major trust factor.

We launched the MVP to over 1,000 early adopters and achieved a 4.5-star app store rating. Cart abandonment dropped by 35% after UX improvements. The platform successfully facilitated transactions across 15 countries.

This experience taught me that good design often means getting out of the way—removing friction, building trust, and letting users accomplish their goals without thinking about the interface.`
    }
  },
];

export interface TikTokVideo {
  id: string;
  title: string;
  description?: string;
  url: string;
  date: string;
  thumbnail?: string;
}

export const tiktokVideos: TikTokVideo[] = [
  {
    id: "1",
    title: "Video 1",
    url: "https://www.tiktok.com/@adxze98/video/7572364587446684983",
    date: "2025",
  },
  {
    id: "2",
    title: "Video 2",
    url: "https://www.tiktok.com/@adxze98/video/7595747959392783671",
    date: "2025",
  },
  {
    id: "3",
    title: "Video 3",
    url: "https://www.tiktok.com/@adxze98/video/7553057147970407735",
    date: "2025",
  },
  {
    id: "4",
    title: "Video 4",
    url: "https://www.tiktok.com/@adxze98/video/7556465369423170871",
    date: "2025",
  },
  {
    id: "5",
    title: "Video 5",
    url: "https://www.tiktok.com/@adxze98/video/7570129157217193230",
    date: "2025",
  },
  {
    id: "6",
    title: "Video 6",
    url: "https://www.tiktok.com/@adxze98/video/7499687486713531694",
    date: "2025",
  },
  {
    id: "7",
    title: "Video 7",
    url: "https://www.tiktok.com/@adxze98/video/7545635509188513079",
    date: "2025",
  },
  {
    id: "8",
    title: "Video 8",
    url: "https://www.tiktok.com/@adxze98/video/7568659508273204493",
    date: "2025",
  },
];

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  link: string;
  excerpt?: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Becoming',
    date: '2026',
    link: 'https://open.substack.com/pub/ahdahzeh/p/becoming',
  },
  {
    id: '2',
    title: 'Well Engineered Samples',
    date: '2026',
    link: 'https://substack.com/@ahdahzeh/note/c-249076448?utm_source=notes-share-action&r=18j0k6',
  },
  {
    id: '3',
    title: 'Self Awareness as Guidance',
    date: '2026',
    link: 'https://open.substack.com/pub/ahdahzeh/p/self-awareness-is-guidance',
  },
];

export interface Thought {
  id: string;
  /** "post" = a full Substack article, "note" = a short Substack Note. */
  kind: "post" | "note";
  title: string;
  excerpt: string;
  date: string;
  link: string;
}

/**
 * Substack articles + notes — "Thoughts and Notions" section on the home page.
 * The first item is the FEATURED essay rendered as the large card on the
 * left; the rest render as the editorial index on the right.
 */
export const thoughts: Thought[] = [
  {
    id: "becoming",
    kind: "post",
    title: "Becoming",
    excerpt:
      "On the transformative journey that started with an unfulfilling design job, ran through a layoff, and turned into a commitment to growth — landing real design clients and shipping multiple apps along the way.",
    date: "Apr 21, 2026",
    link: "https://ahdahzeh.substack.com/p/becoming",
  },
  {
    id: "self-awareness-is-guidance",
    kind: "post",
    title: "Self Awareness is Guidance",
    excerpt:
      "Without self-awareness, it's hard to live with any intentionality. You can set an intention, make a plan, but if it has no real context of your life, you'll always fail.",
    date: "Apr 25, 2026",
    link: "https://ahdahzeh.substack.com/p/self-awareness-is-guidance",
  },
  {
    id: "wellengineered-jewelry-sample",
    kind: "note",
    title: "Sampling jewelry for wellengineered.co",
    excerpt: "Some new jewelry I'm sampling for wellengineered.co.",
    date: "Apr 25, 2026",
    link: "https://substack.com/@ahdahzeh/note/c-249076448",
  },
];

/** Substack publication name + URL — the masthead and "see all" link target. */
export const SUBSTACK_NAME = "Groundwork";
export const SUBSTACK_URL = "https://ahdahzeh.substack.com";

export interface ArchiveProject {
  id: string;
  name: string;
  role: string;
  year: string;
  link?: string;
}

export const archiveProjects: ArchiveProject[] = [
  { id: "32", name: "WTV — What's the Vibe", role: "Design Engineer", year: "2026", link: "/work/wtv" },
  { id: "31", name: "Job Pilot Automation", role: "Design Engineer", year: "2025", link: "/work/autopilot" },
  { id: "30", name: "Scour", role: "Design Engineer", year: "2025–2026", link: "/work/scour" },
  { id: "29", name: "Morton Salt", role: "UX Design", year: "2026", link: "/work/morton-salt" },
  { id: "1", name: "Patients and Purpose", role: "UX Design", year: "2025" },
  { id: "2", name: "Block Equity Group", role: "UX Design", year: "2024", link: "/work/block-equity-group" },
  { id: "3", name: "Nova One Technology", role: "UX Design", year: "2024" },
  { id: "4", name: "Well Engineered Website", role: "3D/UX Design", year: "2024" },
  { id: "5", name: "WeChipn", role: "UX Design", year: "2024", link: "/work/wechipn" },
  { id: "6", name: "Body By Raven Tracy", role: "3D Design", year: "2024" },
  { id: "7", name: "Well Engineered", role: "Apparel Design", year: "2024" },
  { id: "8", name: "Poise By Amelia J", role: "Web Design", year: "2024" },
  { id: "9", name: "Seanevell Portfolio", role: "Web Design", year: "2024" },
  { id: "10", name: "Freelance Design", role: "Apparel Design", year: "2024" },
  { id: "11", name: "Manny Omitto Portfolio", role: "Web Design", year: "2024" },
  { id: "12", name: "Davido (MSG)", role: "Apparel Design", year: "2024" },
  { id: "13", name: "Playhouse Worldwide", role: "Web Design", year: "2024" },
  { id: "14", name: "Mikewest NYC", role: "3D/Web Design", year: "2024" },
  { id: "15", name: "Swank Studios", role: "Design", year: "2024", link: "/work/swank-studio" },
  { id: "16", name: "Manifested Luck", role: "Web Design", year: "2024" },
  { id: "17", name: "Freelance Design", role: "Lead Design", year: "2023" },
  { id: "18", name: "Amazon", role: "UX Design", year: "2023", link: "/work/amazon" },
  { id: "19", name: "Blacktooth Publishing", role: "Web Design", year: "2023" },
  { id: "20", name: "Renauthentics", role: "Web Design", year: "2023" },
  { id: "21", name: "Better School", role: "UX Design", year: "2023" },
  { id: "22", name: "Well Engineered", role: "Creative Direction", year: "2022" },
  { id: "23", name: "ADP List", role: "Web Design", year: "2022" },
  { id: "24", name: "Eki Express", role: "UX Design", year: "2022", link: "/work/eki-express" },
  { id: "25", name: "Malcolm X Shabazz Center", role: "Creative Direction/Graphic", year: "2022" },
  { id: "26", name: "Tech Packs", role: "Design", year: "2021" },
  { id: "27", name: "Career Path", role: "Design", year: "2021" },
  { id: "28", name: "Building Better Money Habits", role: "Creative Direction", year: "2021" },
];

export interface NowPlayingTrack {
  id: string;
  title: string;
  artist: string;
  url: string;
  albumArt: string;
}

export const nowPlayingTracks: NowPlayingTrack[] = [
  { id: "1", title: "Melo", artist: "Roc Marciano", url: "https://music.apple.com/us/album/melo/1870984094?i=1870984106", albumArt: "/images/albums/656.png" },
  { id: "2", title: "What You Saying", artist: "Lil Uzi Vert", url: "https://music.apple.com/us/album/what-you-saying-single/1863528316", albumArt: "/images/albums/what-you-saying.png" },
  { id: "3", title: "Lead Da Way", artist: "Iyrus", url: "https://music.apple.com/us/album/lead-da-way/1868702712?i=1868702717", albumArt: "/images/albums/ii.png" },
  { id: "4", title: "Blame U", artist: "Odeal", url: "https://music.apple.com/us/album/blame-u/1777741383?i=1777741395", albumArt: "/images/albums/lustropolis.png" },
];

export const awards = [
  {
    id: "1",
    title: "MM+M Awards GOLD: Product Launch",
    project: "Bausch + Lomb Miebo",
    organization: "Patients & Purpose, Omnicom",
  },
];

export const education = [
  { id: "1", school: "The City College of New York", degree: "Bachelor's, Biochemistry" },
  { id: "2", school: "Flatiron School", degree: "UX/UI Product Design Bootcamp" },
  { id: "3", school: "Grow with Google", degree: "Machine Learning and AI Essentials" },
  { id: "4", school: "IBM", degree: "Enterprise Design Thinking Practitioner" },
];

export const skills = {
  design: ["Wire-Framing", "Prototyping", "Interaction Design", "Information Architecture", "Strategy Workshop Facilitation"],
  research: ["Empathy Interviews", "Usability Testing", "Card Sorting", "Tree Testing", "Heuristic Review"],
  tools: ["Figma", "Sketch", "FigJam", "Adobe Creative Suite", "Optimal Workshop", "UserTesting.com", "Claude AI", "Midjourney"],
};
