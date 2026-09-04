"use client";

import { useEffect, useState } from "react";

interface Bread {
  id: number;
  left: number;
  duration: number;
  size: number;
  delay: number;
}

export default function BreadRain() {
  const [breads, setBreads] = useState<Bread[]>([]);

  useEffect(() => {
    let idCounter = 0;

    const spawnBread = () => {
      const newBread: Bread = {
        id: idCounter++,
        left: Math.random() * 100,
        duration: 3 + Math.random() * 2,
        size: 24 + Math.random() * 24,
        delay: 0,
      };
      setBreads((prev) => [...prev, newBread]);

      setTimeout(() => {
        setBreads((prev) => prev.filter((b) => b.id !== newBread.id));
      }, newBread.duration * 1000);
    };

    const interval = setInterval(spawnBread, 400);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-50">
      {breads.map((bread) => (
        <span
          key={bread.id}
          style={{
            position: "absolute",
            left: `${bread.left}%`,
            top: "-50px",
            fontSize: `${bread.size}px`,
            animation: `fall ${bread.duration}s linear forwards`,
          }}
        >
          🍞
        </span>
      ))}
      <style jsx>{`
        @keyframes fall {
          from {
            transform: translateY(0) rotate(0deg);
          }
          to {
            transform: translateY(110vh) rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}