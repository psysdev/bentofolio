import path from "node:path";
import { fileURLToPath } from "node:url";
import fs from "fs-extra";
import chalk from "chalk";
import { importFromGitHub } from "./github.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CLI_ROOT = path.resolve(__dirname, "../..");
const TEMPLATE_DIR = path.join(CLI_ROOT, "template");

interface InitOptions {
  github?: string;
}

function generateProfileTS(data: {
  name: string;
  handle: string;
  avatar: string;
  bio: string;
  headline: string;
  location: string;
  socials: { platform: string; url: string; icon: string }[];
  projects: { title: string; description: string; image: string; tags: string[]; stars: number; url: string }[];
}): string {
  const projectEntries = data.projects
    .map(
      (p, i) => `    {
      id: "p${i + 1}",
      title: ${JSON.stringify(p.title)},
      description: ${JSON.stringify(p.description)},
      image: ${JSON.stringify(p.image)},
      tags: ${JSON.stringify(p.tags)},
      stars: ${p.stars},
      url: ${JSON.stringify(p.url)},
    }`
    )
    .join(",\n");

  const socialEntries = data.socials
    .map(
      (s) => `    { platform: ${JSON.stringify(s.platform)}, url: ${JSON.stringify(s.url)}, icon: ${JSON.stringify(s.icon)} }`
    )
    .join(",\n");

  const feedEntries = data.projects
    .slice(0, 3)
    .map((p, i) => `    { id: "f${i + 1}", type: "shipped" as const, content: ${JSON.stringify(p.description)}, timestamp: new Date().toISOString() }`)
    .join(",\n");

  return `export const profile = {
  name: ${JSON.stringify(data.name)},
  handle: ${JSON.stringify(data.handle)},
  avatar: ${JSON.stringify(data.avatar)},
  bio: ${JSON.stringify(data.bio)},
  headline: ${JSON.stringify(data.headline)},
  location: ${JSON.stringify(data.location)},
  availability: "available" as const,
  socials: [
${socialEntries}
  ],
  projects: [
${projectEntries}
  ],
  feed: [
${feedEntries}
  ],
  status: { emoji: "🚀", text: "Building" },
};

export const navCards = [
  { title: "Thoughts", subtitle: "Blog & tutorials", path: "blog", icon: "📝" },
  { title: "Projects", subtitle: "Things I've built", path: "projects", icon: "⚡" },
  { title: "Resume", subtitle: "Experience", path: "resume", icon: "📄" },
];

export const layoutConfig = [
  { id: "hero", widget: "HeroWidget" as const, colSpan: 2, rowSpan: 2 },
  { id: "feed", widget: "FeedWidget" as const, colSpan: 1, rowSpan: 2 },
  { id: "project-1", widget: "ProjectCard" as const, colSpan: 1, rowSpan: 1 },
  { id: "project-2", widget: "ProjectCard" as const, colSpan: 1, rowSpan: 1 },
  { id: "project-3", widget: "ProjectCard" as const, colSpan: 1, rowSpan: 1 },
  { id: "status", widget: "StatusWidget" as const, colSpan: 1, rowSpan: 1 },
];
`;
}

export async function init(projectDir: string, options: InitOptions) {
  const targetPath = path.resolve(process.cwd(), projectDir);

  // Check if directory exists
  if (fs.existsSync(targetPath)) {
    console.error(chalk.red(`Error: Directory "${projectDir}" already exists.`));
    process.exit(1);
  }

  // Check template exists
  if (!fs.existsSync(TEMPLATE_DIR)) {
    console.error(chalk.red(`Error: Template not found at ${TEMPLATE_DIR}`));
    process.exit(1);
  }

  // Step 1: Copy template
  console.log(chalk.cyan(`\n  Creating new BentoFolio project in ${chalk.bold(projectDir)}...\n`));
  await fs.copy(TEMPLATE_DIR, targetPath, {
    filter: (src) => {
      const basename = path.basename(src);
      return !basename.startsWith(".") || basename === ".gitignore";
    },
  });

  // Step 2: Optionally import GitHub data
  if (options.github) {
    try {
      console.log(chalk.cyan(`  Fetching GitHub data for ${chalk.bold(options.github)}...`));
      const data = await importFromGitHub(options.github);
      const profileContent = generateProfileTS(data);
      await fs.writeFile(
        path.join(targetPath, "src", "config", "profile.ts"),
        profileContent,
        "utf-8"
      );
      console.log(chalk.green(`  ✓ Imported ${data.projects.length} repos from GitHub`));
    } catch (err) {
      console.error(chalk.yellow(`  Warning: Could not fetch GitHub data: ${(err as Error).message}`));
      console.log(chalk.yellow("  A sample profile will be used instead."));
    }
  }

  // Step 3: Update package.json
  const pkgPath = path.join(targetPath, "package.json");
  if (fs.existsSync(pkgPath)) {
    const pkg = await fs.readJson(pkgPath);
    pkg.name = projectDir;
    pkg.version = "0.1.0";
    pkg.description = `BentoFolio portfolio — ${options.github || projectDir}`;
    delete pkg.private; // Allow publishing
    await fs.writeJson(pkgPath, pkg, { spaces: 2 });
  }

  // Step 4: Install dependencies
  console.log(chalk.cyan("\n  Installing dependencies...\n"));
  const { execSync } = await import("node:child_process");
  try {
    execSync("npm install", { cwd: targetPath, stdio: "inherit" });
  } catch {
    console.log(chalk.yellow("\n  Could not auto-install dependencies. Run:"));
    console.log(chalk.white(`  cd ${projectDir} && npm install`));
  }

  // Done
  console.log(chalk.green("\n  ✓ BentoFolio project created!\n"));
  console.log(chalk.white("  Next steps:"));
  console.log(chalk.white(`  cd ${projectDir}`));
  console.log(chalk.white("  npm run dev"));
  console.log();

  if (!options.github) {
    console.log(chalk.gray("  Tip: Edit src/config/profile.ts with your data."));
    console.log(chalk.gray("  Or re-run with --github to import your GitHub profile."));
    console.log();
  }
}
