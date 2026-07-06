"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface TextRevealProps {
  children: string;
  className?: string;
  delay?: number;
  stagger?: number;
}

export default function TextReveal({
  children,
  className = "",
  delay = 0,
  stagger = 0.03,
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const words = children.split(" ");

  return (
    <div ref={ref} className={`inline ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="inline-block">
          <span className="inline-block overflow-hidden">
            <motion.span
              className="inline-block"
              initial={{ y: "100%", opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: delay + i * stagger, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {word}
            </motion.span>
          </span>
          {i < words.length - 1 && "\u00A0"}
        </span>
      ))}
    </div>
  );
}
