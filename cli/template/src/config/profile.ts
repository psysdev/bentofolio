export interface Profile {
  name: string;
  handle: string;
  avatar: string;
  bio: string;
  headline: string;
  location: string;
  availability: "available" | "busy" | "away";
  socials: { platform: string; url: string; icon: string }[];
  projects: {
    id: string;
    title: string;
    description: string;
    image: string;
    tags: string[];
    stars: number;
    url: string;
  }[];
  feed: {
    id: string;
    type: "shipped" | "log";
    content: string;
    timestamp: string;
  }[];
  status: { emoji: string; text: string };
}

export interface LayoutItem {
  id: string;
  widget: "HeroWidget" | "FeedWidget" | "ProjectCard" | "StatusWidget";
  colSpan: number;
  rowSpan: number;
}

export const profile: Profile = {
  name: "Your Name",
  handle: "@username",
  avatar: "https://api.dicebear.com/9.x/notionists/svg?seed=Default",
  bio: "Edit src/config/profile.ts with your bio.",
  headline: "Developer · Designer · Dreamer",
  location: "Your Location",
  availability: "available",
  socials: [
    { platform: "GitHub", url: "https://github.com", icon: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" },
  ],
  projects: [
    {
      id: "p1",
      title: "Sample Project",
      description: "Edit src/config/profile.ts to add your projects here.",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop",
      tags: ["Next.js", "TypeScript"],
      stars: 0,
      url: "https://github.com",
    },
  ],
  feed: [
    { id: "f1", type: "shipped", content: "Your first build log entry. Edit src/config/profile.ts to customize.", timestamp: new Date().toISOString() },
  ],
  status: { emoji: "🚀", text: "Building" },
};

export const navCards = [
  { title: "Thoughts", subtitle: "Blog & tutorials", path: "blog", icon: "📝" },
  { title: "Projects", subtitle: "Things I've built", path: "projects", icon: "⚡" },
  { title: "Resume", subtitle: "Experience", path: "resume", icon: "📄" },
];

export const layoutConfig: LayoutItem[] = [
  { id: "hero", widget: "HeroWidget", colSpan: 2, rowSpan: 2 },
  { id: "feed", widget: "FeedWidget", colSpan: 1, rowSpan: 2 },
  { id: "project-1", widget: "ProjectCard", colSpan: 1, rowSpan: 1 },
  { id: "project-2", widget: "ProjectCard", colSpan: 1, rowSpan: 1 },
  { id: "project-3", widget: "ProjectCard", colSpan: 1, rowSpan: 1 },
  { id: "status", widget: "StatusWidget", colSpan: 1, rowSpan: 1 },
];
