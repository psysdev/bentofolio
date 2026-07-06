"use client";

import { useState, useEffect, useCallback } from "react";

interface TypingEffectProps {
  texts: string[];
  className?: string;
  speed?: number;
  deleteSpeed?: number;
  pauseDuration?: number;
  cursor?: boolean;
}

export default function TypingEffect({
  texts,
  className = "",
  speed = 60,
  deleteSpeed = 30,
  pauseDuration = 2000,
  cursor = true,
}: TypingEffectProps) {
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [displayText, setDisplayText] = useState("");

  const tick = useCallback(() => {
    const currentText = texts[textIndex];
    if (isDeleting) {
      setDisplayText(currentText.substring(0, charIndex - 1));
      setCharIndex((prev) => prev - 1);
    } else {
      setDisplayText(currentText.substring(0, charIndex + 1));
      setCharIndex((prev) => prev + 1);
    }
  }, [textIndex, charIndex, isDeleting, texts]);

  useEffect(() => {
    const currentText = texts[textIndex];
    if (!isDeleting && charIndex === currentText.length) {
      setTimeout(() => setIsDeleting(true), pauseDuration);
      return;
    }
    if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setTextIndex((prev) => (prev + 1) % texts.length);
      return;
    }
    const timeout = setTimeout(tick, isDeleting ? deleteSpeed : speed);
    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, textIndex, texts, tick, speed, deleteSpeed, pauseDuration]);

  return (
    <span className={className}>
      {displayText}
      {cursor && <span className="inline-block h-[1em] w-[2px] animate-pulse bg-emerald-400 ml-0.5 align-middle" />}
    </span>
  );
}
