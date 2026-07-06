export interface GitHubUser {
  name: string | null;
  login: string;
  avatar_url: string;
  bio: string | null;
  location: string | null;
  twitter_username: string | null;
  blog: string | null;
}

export interface GitHubRepo {
  name: string;
  description: string | null;
  stargazers_count: number;
  topics: string[];
  language: string | null;
  html_url: string;
  fork: boolean;
}

export interface ImportedProfile {
  name: string;
  handle: string;
  avatar: string;
  bio: string;
  headline: string;
  location: string;
  socials: { platform: string; url: string; icon: string }[];
  projects: {
    title: string;
    description: string;
    image: string;
    tags: string[];
    stars: number;
    url: string;
  }[];
}

const GITHUB_API = "https://api.github.com";

async function fetchJSON<T>(url: string): Promise<T> {
  const res = await fetch(url, {
    headers: {
      "User-Agent": "bentofolio-cli",
      Accept: "application/vnd.github.v3+json",
    },
  });

  if (!res.ok) {
    throw new Error(`GitHub API error: ${res.status} ${res.statusText} for ${url}`);
  }

  return res.json() as Promise<T>;
}

function getSocialIcon(platform: string): string {
  const icons: Record<string, string> = {
    twitter:
      "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
    github:
      "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z",
    linkedin:
      "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  };
  return icons[platform] ?? "";
}

function guessSocialLinks(user: GitHubUser): { platform: string; url: string; icon: string }[] {
  const links: { platform: string; url: string; icon: string }[] = [];

  links.push({
    platform: "GitHub",
    url: `https://github.com/${user.login}`,
    icon: getSocialIcon("github"),
  });

  if (user.twitter_username) {
    links.push({
      platform: "Twitter",
      url: `https://twitter.com/${user.twitter_username}`,
      icon: getSocialIcon("twitter"),
    });
  }

  if (user.blog) {
    links.push({
      platform: "Website",
      url: user.blog.startsWith("http") ? user.blog : `https://${user.blog}`,
      icon: "",
    });
  }

  return links;
}

function repoImage(repoName: string): string {
  // Use a consistent set of Unsplash images based on repo name hash
  const images = [
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=300&fit=crop",
  ];
  const hash = repoName.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return images[hash % images.length];
}

export async function importFromGitHub(handle: string): Promise<ImportedProfile> {
  const [user, repos] = await Promise.all([
    fetchJSON<GitHubUser>(`${GITHUB_API}/users/${handle}`),
    fetchJSON<GitHubRepo[]>(`${GITHUB_API}/users/${handle}/repos?type=owner&sort=updated&per_page=20`),
  ]);

  const topRepos = repos
    .filter((r) => !r.fork)
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 6);

  const projects = topRepos.map((repo) => ({
    title: repo.name.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    description: repo.description ?? "No description provided.",
    image: repoImage(repo.name),
    tags: [
      ...(repo.language ? [repo.language] : []),
      ...repo.topics.slice(0, 3),
    ],
    stars: repo.stargazers_count,
    url: repo.html_url,
  }));

  return {
    name: user.name ?? user.login,
    handle: `@${user.login}`,
    avatar: user.avatar_url,
    bio: user.bio ?? "Developer.",
    headline: `${repos.filter((r) => !r.fork).length} public repos · ${topRepos.reduce((s, r) => s + r.stargazers_count, 0)} stars`,
    location: user.location ?? "",
    socials: guessSocialLinks(user),
    projects,
  };
}
