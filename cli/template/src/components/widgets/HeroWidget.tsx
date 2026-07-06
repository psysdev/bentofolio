"use client";

import { profile, navCards } from "@/config/profile";
import TypingEffect from "@/components/ui/TypingEffect";
import LiquidBubble from "@/components/ui/LiquidBubble";
import { motion } from "framer-motion";

interface HeroWidgetProps {
  id: string;
}

const taglines = [
  "Building things that matter.",
  "Code. Design. Ship.",
  "Learning in public.",
  "Break things. Learn. Rebuild.",
];

export default function HeroWidget({ id: _id }: HeroWidgetProps) {
  const { name, handle, avatar, bio, headline, location, socials } = profile;

  return (
    <div className="relative flex h-full flex-col bg-stone-900/50 backdrop-blur-md border border-stone-800/80 rounded-3xl p-6 transition-all duration-300 overflow-hidden">
      <div className="pointer-events-none absolute -top-20 -right-20 h-40 w-40 rounded-full bg-emerald-500/5 blur-3xl" />

      <div className="relative z-10 flex items-center justify-between border-b border-stone-800/60 pb-3">
        <div className="flex items-center gap-2">
          <div className="flex h-5 w-5 items-center justify-center rounded border border-emerald-500/30 bg-emerald-500/5">
            <span className="text-[10px] font-mono font-bold text-emerald-400">~</span>
          </div>
          <span className="font-mono text-xs text-stone-500">
            <span className="text-emerald-400">visitor</span>
            <span className="text-stone-600">:</span>
            <span className="text-stone-500">~$</span>
          </span>
        </div>
        <div className="flex gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-red-500/40" />
          <div className="h-2.5 w-2.5 rounded-full bg-amber-500/40" />
          <div className="h-2.5 w-2.5 rounded-full bg-emerald-500/40" />
        </div>
      </div>

      <div className="relative z-10 mt-4 flex flex-1 flex-col">
        <div className="flex items-start gap-4">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="h-14 w-14 shrink-0 overflow-hidden rounded-2xl border border-stone-700/50 bg-stone-800"
          >
            <img src={avatar} alt={name} className="h-full w-full object-cover" width={56} height={56} />
          </motion.div>
          <div className="min-w-0">
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="text-2xl font-bold tracking-tight text-stone-100"
            >
              {name}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.25 }}
              className="text-xs text-stone-500 font-mono"
            >
              {handle}
            </motion.p>
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mt-3 text-sm font-medium text-stone-400"
        >
          {headline}
        </motion.p>

        <div className="mt-2 font-mono text-xs text-emerald-400/80">
          <span className="text-stone-600">$ </span>
          <TypingEffect texts={taglines} speed={50} deleteSpeed={25} pauseDuration={2500} cursor={true} />
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-3 text-xs leading-relaxed text-stone-500"
        >
          {bio}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-2 text-[10px] text-stone-600 font-mono"
        >
          <span className="text-emerald-400/60">$ echo</span> {location}
        </motion.p>

        <div className="mt-4 grid grid-cols-3 gap-2">
          {navCards.map((card, i) => (
            <LiquidBubble key={card.title} color="rgba(0, 255, 50, 0.06)" intensity={0.3}>
              <motion.a
                href={`#${card.path}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.7 + i * 0.1 }}
                className="group flex flex-col items-center gap-1.5 rounded-2xl border border-stone-800/60 bg-stone-800/30 p-3 text-center transition-all duration-200 hover:border-emerald-500/30 hover:bg-emerald-500/[0.03]"
              >
                <span className="text-lg">{card.icon}</span>
                <span className="text-xs font-medium text-stone-300 group-hover:text-emerald-400 transition-colors">{card.title}</span>
                <span className="text-[9px] text-stone-600 leading-tight">{card.subtitle}</span>
              </motion.a>
            </LiquidBubble>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="mt-3 flex items-center gap-2"
        >
          {socials.map((social) => (
            <a
              key={social.platform}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-7 w-7 items-center justify-center rounded-lg bg-stone-800/50 border border-stone-800/60 text-stone-600 transition-all duration-200 hover:border-emerald-500/30 hover:text-emerald-400 hover:bg-emerald-500/[0.03]"
              title={social.platform}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
                <path d={social.icon} />
              </svg>
            </a>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
