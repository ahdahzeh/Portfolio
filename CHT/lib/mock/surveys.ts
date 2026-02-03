export interface Survey {
  id: string;
  title: string;
  description: string;
  questions: number;
  estimatedMinutes: number;
  reward?: string;
  status: "available" | "completed" | "expired";
}

export const surveys: Survey[] = [
  {
    id: "1",
    title: "HER2+ Treatment Preferences",
    description: "Share your approach to HER2+ breast cancer treatment selection",
    questions: 12,
    estimatedMinutes: 10,
    reward: "$25",
    status: "available",
  },
  {
    id: "2",
    title: "Biomarker Testing Adoption",
    description: "Understanding barriers and facilitators to biomarker testing",
    questions: 15,
    estimatedMinutes: 12,
    reward: "$30",
    status: "available",
  },
  {
    id: "3",
    title: "Webinar Feedback - Q1 2025",
    description: "Rate and provide feedback on recent educational content",
    questions: 8,
    estimatedMinutes: 5,
    status: "available",
  },
];
