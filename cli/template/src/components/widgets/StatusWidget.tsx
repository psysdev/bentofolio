"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface StatusWidgetProps {
  id: string;
}

const statusList = [
  { emoji: "🚀", text: "Building" },
  { emoji: "⚡", text: "Shipping" },
  { emoji: "☕", text: "Caffeinating" },
  { emoji: "🐛", text: "Debugging" },
  { emoji: "📖", text: "Learning" },
  { emoji: "🔬", text: "Experimenting" },
];

export default function StatusWidget({ id: _id }: StatusWidgetProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const current = statusList[currentIndex];

  const cycleStatus = () => {
    setCurrentIndex((prev) => (prev + 1) % statusList.length);
  };

  return (
    <div className="relative h-full bg-stone-900/50 backdrop-blur-md border border-stone-800/80 rounded-3xl p-6 transition-all duration-300">
      <div className="border-b border-stone-800/60 pb-2.5">
        <h3 className="font-mono text-[10px] text-stone-500">
          <span className="text-emerald-400/60">~</span> /status
        </h3>
      </div>

      <div className="mt-4 flex flex-col items-center justify-center gap-3">
        <motion.button
          onClick={cycleStatus}
          className="group flex flex-col items-center gap-2.5"
          whileTap={{ scale: 0.95 }}
        >
          <motion.span
            key={current.emoji}
            initial={{ scale: 0.5, rotate: -20, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="text-4xl"
          >
            {current.emoji}
          </motion.span>
          <motion.span
            key={current.text}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="font-mono text-xs text-stone-400"
          >
            {current.text}
          </motion.span>
        </motion.button>

        <div className="mt-2 animate-pulse font-mono text-[9px] text-stone-700">
          <span className="text-emerald-400/30">$</span> ./cycle-status.sh
        </div>
      </div>
    </div>
  );
}
