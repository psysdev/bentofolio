"use client";

import { useRef, useCallback, useEffect } from "react";

interface CardHoverProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}

export default function CardHover({
  children,
  className = "",
  glowColor = "rgba(0, 255, 50, 0.2)",
}: CardHoverProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    cardRef.current.style.setProperty("--mouse-x", `${x}%`);
    cardRef.current.style.setProperty("--mouse-y", `${y}%`);
  }, []);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    card.addEventListener("mousemove", handleMouseMove);
    return () => card.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  return (
    <div ref={cardRef} className={`group relative ${className}`}>
      <div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(500px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${glowColor}, transparent 50%)`,
        }}
      />
      <div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(300px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(0, 255, 50, 0.3), transparent 50%)`,
          maskImage: "linear-gradient(transparent, black 30%, black 70%, transparent)",
          WebkitMaskImage: "linear-gradient(transparent, black 30%, black 70%, transparent)",
        }}
      />
      {children}
    </div>
  );
}
