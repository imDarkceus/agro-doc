export type NavigationItem = {
  name: string;
  href: string;
  icon: React.ElementType;
  current?: boolean;
};

export type DiagnosisEntry = {
  id: string;
  imageName?: string;
  imageDataUri?: string; // To display the image if needed
  diseaseName: string;
  cause: string;
  solution: string;
  summary: string;
  date: string;
};

export type CropCalendarEntry = {
  month: string;
  activities: {
    crop: string;
    task: string;
    details?: string;
  }[];
};

export type AgriSupportCenter = {
  id: string;
  name: string;
  type: string; // e.g., "কৃষি অফিস", "সার ডিলার"
  address: string;
  contact?: string;
  latitude?: number; // For future map integration
  longitude?: number; // For future map integration
};

export type CropGuide = {
  id: string;
  title: string;
  category: 'fertilizers' | 'irrigation' | 'pest-control';
  content: string; // Can be markdown or HTML string
  icon?: React.ElementType;
};
