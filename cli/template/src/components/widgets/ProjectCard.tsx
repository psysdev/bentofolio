"use client";

import CardHover from "@/components/ui/CardHover";
import LiquidBubble from "@/components/ui/LiquidBubble";
import { motion } from "framer-motion";
import { profile } from "@/config/profile";

interface ProjectCardProps {
  id: string;
}

const idToProjectId: Record<string, string> = {
  "project-1": "p1",
  "project-2": "p2",
  "project-3": "p3",
};

const projectLookup: Record<string, typeof profile.projects[0]> = {};
profile.projects.forEach((p) => {
  projectLookup[p.id] = p;
});

export default function ProjectCard({ id }: ProjectCardProps) {
  const projectId = idToProjectId[id];
  const project = projectId ? projectLookup[projectId] : null;

  if (!project) {
    return (
      <div className="bg-stone-900/50 backdrop-blur-md border border-stone-800/80 rounded-3xl p-6 transition-all duration-300">
        <p className="font-mono text-xs text-stone-600">[null]</p>
      </div>
    );
  }

  return (
    <LiquidBubble color="rgba(0, 255, 50, 0.05)" intensity={0.4}>
      <CardHover glowColor="rgba(0, 255, 50, 0.15)">
        <div className="relative h-full bg-stone-900/50 backdrop-blur-md border border-stone-800/80 rounded-3xl p-5 transition-all duration-300">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="relative mb-3 overflow-hidden rounded-xl border border-stone-800/60 aspect-video"
          >
            <img src={project.image} alt={project.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent" />
          </motion.div>

          <div className="flex items-start justify-between gap-2">
            <h3 className="text-xs font-semibold text-stone-200">{project.title}</h3>
            <div className="flex shrink-0 items-center gap-1 rounded-md border border-amber-500/15 bg-amber-500/[0.03] px-1.5 py-0.5">
              <span className="text-[9px] text-amber-400/80">★</span>
              <span className="font-mono text-[9px] text-amber-400/70">{project.stars}</span>
            </div>
          </div>

          <p className="mt-2 text-[10px] leading-relaxed text-stone-500">{project.description}</p>

          <div className="mt-3 flex flex-wrap gap-1">
            {project.tags.map((tag) => (
              <span key={tag} className="font-mono text-[8px] rounded-md border border-stone-800/50 bg-stone-800/30 px-1.5 py-0.5 text-stone-500">
                {tag}
              </span>
            ))}
          </div>

          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-1 font-mono text-[9px] text-emerald-400/60 transition-colors duration-200 hover:text-emerald-400"
          >
            ❯ view on github
          </a>
        </div>
      </CardHover>
    </LiquidBubble>
  );
}
