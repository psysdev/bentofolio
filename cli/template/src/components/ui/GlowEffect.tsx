"use client";

import { useEffect, useRef, useCallback } from "react";

interface GlowEffectProps {
  children: React.ReactNode;
  className?: string;
  color?: string;
  size?: number;
}

export default function GlowEffect({
  children,
  className = "",
  color = "rgba(99, 102, 241, 0.15)",
  size = 300,
}: GlowEffectProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    containerRef.current.style.setProperty("--glow-x", `${x}px`);
    containerRef.current.style.setProperty("--glow-y", `${y}px`);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.addEventListener("mousemove", handleMouseMove);
    return () => container.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={{
        background: `radial-gradient(${size}px circle at var(--glow-x, 50%) var(--glow-y, 50%), ${color}, transparent 70%)`,
      }}
    >
      {children}
    </div>
  );
}
