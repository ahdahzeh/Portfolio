export interface ContentItem {
  id: string;
  title: string;
  thumbnail: string;
  duration?: string;
  type: "webinar" | "article" | "video";
}

export const contentByCategory: Record<string, { title: string; subcategories?: { name: string; items: ContentItem[] }[]; items?: ContentItem[] }> = {
  "breast-cancer": {
    title: "Breast Cancer",
    subcategories: [
      {
        name: "HER2-",
        items: [
          { id: "bc1", title: "Understanding HER2-Negative Pathways", thumbnail: "", duration: "30 min", type: "webinar" },
          { id: "bc2", title: "Treatment Options for HER2- Disease", thumbnail: "", duration: "45 min", type: "video" },
          { id: "bc3", title: "Clinical Pearls in HER2- Management", thumbnail: "", type: "article" },
        ],
      },
      {
        name: "HER2+",
        items: [
          { id: "bc4", title: "Targeted Therapies for HER2+ Breast Cancer", thumbnail: "", duration: "50 min", type: "webinar" },
          { id: "bc5", title: "Combination Strategies in HER2+ Disease", thumbnail: "", duration: "40 min", type: "video" },
        ],
      },
      {
        name: "Triple Negative",
        items: [
          { id: "bc6", title: "Advances in TNBC Treatment", thumbnail: "", duration: "55 min", type: "webinar" },
          { id: "bc7", title: "Immunotherapy in TNBC", thumbnail: "", type: "article" },
        ],
      },
    ],
  },
  "biomarker-playlists": {
    title: "Biomarker Playlists",
    items: [
      { id: "bp1", title: "Biomarker Testing Fundamentals", thumbnail: "", duration: "35 min", type: "webinar" },
      { id: "bp2", title: "Interpreting Biomarker Results", thumbnail: "", type: "article" },
      { id: "bp3", title: "Biomarker-Guided Treatment Selection", thumbnail: "", duration: "45 min", type: "video" },
    ],
  },
  "covid-19": {
    title: "COVID-19",
    items: [
      { id: "cv1", title: "COVID-19 Treatment Updates", thumbnail: "", duration: "40 min", type: "webinar" },
      { id: "cv2", title: "Vaccination Strategies", thumbnail: "", type: "article" },
    ],
  },
  "weight-loss": {
    title: "Weight Loss",
    items: [
      { id: "wl1", title: "Medical Weight Management", thumbnail: "", duration: "35 min", type: "webinar" },
      { id: "wl2", title: "Nutrition and Lifestyle", thumbnail: "", type: "article" },
    ],
  },
  diabetes: {
    title: "Diabetes",
    items: [
      { id: "db1", title: "Diabetes Management Guidelines", thumbnail: "", duration: "45 min", type: "webinar" },
      { id: "db2", title: "GLP-1 Therapies", thumbnail: "", type: "article" },
    ],
  },
  webinars: {
    title: "Webinars",
    items: [
      { id: "w1", title: "Advances in HER2+ Breast Cancer Treatment", thumbnail: "", duration: "45 min", type: "webinar" },
      { id: "w2", title: "Biomarker Testing in Clinical Practice", thumbnail: "", duration: "60 min", type: "webinar" },
      { id: "w3", title: "Managing Triple Negative Breast Cancer", thumbnail: "", duration: "50 min", type: "webinar" },
    ],
  },
};
