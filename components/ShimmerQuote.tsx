"use client";

import { useEffect, useRef, useState } from "react";

const DODGE_RADIUS = 160; // ab wann reagiert der Text auf die Maus
const DODGE_STRENGTH = 60; // wie weit er maximal ausweicht

export default function ShimmerQuote({ text }: { text: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    function handleMouseMove(e: MouseEvent) {
      const el = ref.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = centerX - e.clientX;
      const dy = centerY - e.clientY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < DODGE_RADIUS) {
        const factor = (DODGE_RADIUS - distance) / DODGE_RADIUS;
        setOffset({
          x: (dx / distance) * DODGE_STRENGTH * factor,
          y: (dy / distance) * DODGE_STRENGTH * factor,
        });
      } else {
        setOffset({ x: 0, y: 0 });
      }
    }

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={ref}
      className="text-center max-w-4xl transition-transform duration-300 ease-out"
      style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
    >
      <div className="accent-bar mx-auto mb-8" />
      <p className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight shimmer-text">
        &bdquo;{text}&ldquo;
      </p>
      <div className="accent-bar mx-auto mt-8" />
    </div>
  );
}
