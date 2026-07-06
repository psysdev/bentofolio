"use client";

import { useRef, useCallback, useEffect } from "react";

interface LiquidBubbleProps {
  children: React.ReactNode;
  className?: string;
  color?: string;
  intensity?: number;
}

export default function LiquidBubble({
  children,
  className = "",
  color = "rgba(0, 255, 50, 0.08)",
  intensity = 0.6,
}: LiquidBubbleProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const bubbleRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!containerRef.current || !bubbleRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      bubbleRef.current.style.setProperty("--bubble-x", `${x}%`);
      bubbleRef.current.style.setProperty("--bubble-y", `${y}%`);

      const distX = e.clientX - rect.left - rect.width / 2;
      const distY = e.clientY - rect.top - rect.height / 2;
      const maxDist = Math.sqrt(rect.width ** 2 + rect.height ** 2) / 2;
      const dist = Math.sqrt(distX ** 2 + distY ** 2) / maxDist;

      const scale = 1 + (1 - dist) * 0.05 * intensity;
      containerRef.current.style.transform = `scale(${scale})`;
    },
    [intensity]
  );

  const handleMouseLeave = useCallback(() => {
    if (!containerRef.current) return;
    containerRef.current.style.transform = "scale(1)";
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave]);

  return (
    <div ref={containerRef} className={`group transition-transform duration-200 ease-out ${className}`}>
      <div className="relative">
        <div
          ref={bubbleRef}
          className="pointer-events-none absolute -inset-4 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: `radial-gradient(300px circle at var(--bubble-x, 50%) var(--bubble-y, 50%), ${color}, transparent 60%)`,
          }}
        />
        {children}
      </div>
    </div>
  );
}
