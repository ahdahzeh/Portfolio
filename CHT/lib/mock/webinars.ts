export interface Webinar {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  date: string;
  speaker?: string;
}

export const featuredWebinars: Webinar[] = [
  {
    id: "1",
    title: "Advances in HER2+ Breast Cancer Treatment",
    description: "Exploring the latest developments in targeted therapies",
    thumbnail: "/api/placeholder/400/225",
    duration: "45 min",
    date: "2025-02-15",
    speaker: "Dr. Sarah Mitchell",
  },
  {
    id: "2",
    title: "Biomarker Testing in Clinical Practice",
    description: "Practical guide to implementing biomarker testing",
    thumbnail: "/api/placeholder/400/225",
    duration: "60 min",
    date: "2025-02-20",
    speaker: "Dr. James Chen",
  },
  {
    id: "3",
    title: "Managing Triple Negative Breast Cancer",
    description: "Current strategies and emerging options",
    thumbnail: "/api/placeholder/400/225",
    duration: "50 min",
    date: "2025-02-25",
    speaker: "Dr. Emily Rodriguez",
  },
];
