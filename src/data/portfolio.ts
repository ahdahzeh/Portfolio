/**
 * Portfolio Data Configuration
 * Edit this file to customize your portfolio content
 */

export const personalInfo = {
  name: "Adaze Oviawe",
  pronunciation: "[ah-dah-zeh oh-vee-ah-weh]",
  location: "New York, NY",
  title: "UX Designer",
  email: "ahdahzeh@gmail.com",
  bio: `I have over 6 years of experience solving problems, designing experiences, and building digital products. I've worked with both startups and enterprise teams at companies like Amazon, Block Equity Group, and Omnicom, delivering user-centered solutions that drive measurable results.`,
  bioCompanies: [
    { name: "Amazon", url: "https://www.amazon.com" },
    { name: "Block Equity Group", url: "https://www.blockequitygr.com" },
    { name: "Omnicom", url: "https://www.omnicomhealthgroup.com" },
  ] as const,
  availableForWork: true,
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
  coverImages?: { desktop: string; mobile: string };
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
    narrative: string;
    /** When set, narrative is split: part1 + optional middle content (e.g. wireframes) + part2 */
    narrativePart1?: string;
    narrativePart2?: string;
    /** Optional paragraph for the "Launched Site" section (e.g. Vemlidy case study) */
    launchedSiteNarrative?: string;
    /** Optional video of the current site (Loom/YouTube/Vimeo URL or path to local video; Vemlidy case study) */
    launchedSiteVideoUrl?: string;
    /** Optional images for the Launched Site carousel (when using generic work template) */
    launchedSiteImages?: { src: string; alt: string; caption?: string }[];
    images?: { src: string; alt: string; caption?: string }[];
    videoUrl?: string;
    /** Optional video URL for WeChipn case study Problem & Solution section (file path or Loom/YouTube/Vimeo embed) */
    problemSolutionVideoUrl?: string;
    /** Optional video URL for WeChipn case study Mobile View section (file path or Loom/YouTube/Vimeo embed) */
    mobileViewVideoUrl?: string;
    /** Optional sections for rich case studies (e.g. Amazon): title, content, and images per section */
    sections?: { title?: string; content?: string; images?: { src: string; alt: string; caption?: string }[] }[];
  };
}

export const workHistory: WorkItem[] = [
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
    id: "2",
    slug: "community-health-media",
    company: "Community Health Media (CHT)",
    role: "Product Designer",
    period: "2026",
    description: "Product design for community health platform",
    image: "/images/work/cht.png",
    color: "#10b981",
    wip: true,
    caseStudy: {
      title: "COMMUNITY HEALTH MEDIA",
      subtitle: "Health Communication Platform",
      narrative: `Working as a Product Designer at Community Health Media (CHT), designing digital products that help connect communities with vital health information and resources.`
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
      launchedSiteVideoUrl: "/videos/work/vemlidy/Vemlidy%20crop.mp4",
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

Small business financing is, frankly, a mess. Applications involve mountains of paperwork, endless back-and-forth between borrowers and lenders, and timelines that stretch into weeks or months. Block Equity wanted to digitize and streamline the process—offering term loans, revenue-based financing, lines of credit, bridge loans, SBA loans, invoice factoring, and more through a single, easy-to-use experience.

I started with discovery. Spent weeks interviewing small business owners, loan officers, and partners to understand their pain points. The insights were clear: people were drowning in document management, had no visibility into application status, and lacked trust in the process because everything felt opaque.`,
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
      mobileViewVideoUrl: "/videos/work/wechipn/ScreenRecording_02-01-2026%2017-40-46_1.mp4"
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
    url: "https://www.tiktok.com/@adxze98/video/7553057147970407735",
    date: "2025",
  },
  {
    id: "3",
    title: "Video 3",
    url: "https://www.tiktok.com/@adxze98/video/7570129157217193230",
    date: "2025",
  },
  {
    id: "4",
    title: "Video 4",
    url: "https://www.tiktok.com/@adxze98/video/7499687486713531694",
    date: "2025",
  },
  {
    id: "5",
    title: "Video 5",
    url: "https://www.tiktok.com/@adxze98/video/7545635509188513079",
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

export const blogPosts: BlogPost[] = [];

export interface ArchiveProject {
  id: string;
  name: string;
  role: string;
  year: string;
  link?: string;
}

export const archiveProjects: ArchiveProject[] = [
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
