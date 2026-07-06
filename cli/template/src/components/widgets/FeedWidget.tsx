"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { profile } from "@/config/profile";

interface FeedWidgetProps {
  id: string;
}

type Tab = "all" | "shipped" | "log";

const tabs: { key: Tab; label: string }[] = [
  { key: "all", label: "all" },
  { key: "shipped", label: "shipped" },
  { key: "log", label: "log" },
];

export default function FeedWidget({ id: _id }: FeedWidgetProps) {
  const [activeTab, setActiveTab] = useState<Tab>("all");
  const feedEntries = profile.feed;

  const filteredFeed =
    activeTab === "all" ? feedEntries : feedEntries.filter((entry) => entry.type === activeTab);

  return (
    <div className="flex h-full flex-col bg-stone-900/50 backdrop-blur-md border border-stone-800/80 rounded-3xl p-6 transition-all duration-300">
      <div className="mb-4 flex items-center justify-between border-b border-stone-800/60 pb-3">
        <h2 className="font-mono text-xs font-semibold text-stone-400">
          <span className="text-emerald-400/80">~</span> /build-log
        </h2>
        <span className="font-mono text-[10px] text-stone-700">{filteredFeed.length} entries</span>
      </div>

      <div className="mb-3 flex gap-1 rounded-lg border border-stone-800/60 bg-stone-900/80 p-0.5">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`relative flex-1 rounded-md px-2.5 py-1 font-mono text-[10px] transition-colors duration-200 ${
              activeTab === tab.key ? "text-emerald-300" : "text-stone-600 hover:text-stone-400"
            }`}
          >
            {activeTab === tab.key && (
              <motion.div
                layoutId="feed-tab"
                className="absolute inset-0 rounded-md border border-emerald-500/20 bg-emerald-500/[0.04]"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10">
              {activeTab === tab.key && <span className="text-emerald-400/60">❯ </span>}
              {tab.label}
            </span>
          </button>
        ))}
      </div>

      <div className="flex-1 space-y-2 overflow-y-auto pr-1">
        <AnimatePresence mode="popLayout">
          {filteredFeed.map((entry, index) => (
            <motion.div
              key={entry.id}
              layout
              initial={{ opacity: 0, y: 15, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.97 }}
              transition={{ duration: 0.25, delay: index * 0.04 }}
              className="group rounded-xl border border-stone-800/50 bg-stone-800/20 p-3 transition-all duration-200 hover:border-emerald-500/15"
            >
              <div className="flex items-start gap-2.5">
                <div className="mt-0.5 font-mono text-[10px] shrink-0">
                  {entry.type === "shipped" ? (
                    <span className="text-emerald-500/60">[+]</span>
                  ) : (
                    <span className="text-amber-500/50">[*]</span>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] leading-relaxed text-stone-400 group-hover:text-stone-300 transition-colors">{entry.content}</p>
                  <span className="mt-1.5 block font-mono text-[9px] text-stone-700">{getTimeAgo(new Date(entry.timestamp))}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

function getTimeAgo(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);
  if (diffMins < 1) return "just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}
