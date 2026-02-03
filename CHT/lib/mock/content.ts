export interface ContentItem {
  id: string;
  title: string;
  category: string;
  thumbnail: string;
  duration?: string;
  type: "webinar" | "article" | "video";
}

export const contentCategories = [
  {
    slug: "breast-cancer",
    title: "Breast Cancer",
    description: "Treatment-specific content and biomarker playlists",
  },
  {
    slug: "biomarker-playlists",
    title: "Biomarker Playlists",
    description: "HER2+, HER2-, Triple Negative, and more",
  },
  {
    slug: "webinars",
    title: "Webinars",
    description: "Live and on-demand educational sessions",
  },
];

export const resources = [
  { id: "1", title: "Clinical Guidelines", icon: "document", href: "#" },
  { id: "2", title: "Patient Resources", icon: "user", href: "#" },
  { id: "3", title: "Research Updates", icon: "chart", href: "#" },
  { id: "4", title: "Treatment Tools", icon: "tool", href: "#" },
];
