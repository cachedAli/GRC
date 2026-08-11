"use client";

import { type HTMLAttributes, type ReactNode, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

type MagnetProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  padding?: number;
  strength?: number;
  innerClassName?: string;
};

// Adapted from ReactBits Magnet via the ReactBits MCP.
export default function Magnet({
  children,
  padding = 70,
  strength = 7,
  className = "",
  innerClassName = "",
  ...props
}: MagnetProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (prefersReducedMotion) return;

    const handlePointerMove = (event: PointerEvent) => {
      const element = ref.current;
      if (!element) return;
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distanceX = event.clientX - centerX;
      const distanceY = event.clientY - centerY;
      const inRange =
        Math.abs(distanceX) < rect.width / 2 + padding &&
        Math.abs(distanceY) < rect.height / 2 + padding;

      setPosition(inRange ? { x: distanceX / strength, y: distanceY / strength } : { x: 0, y: 0 });
    };

    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [padding, prefersReducedMotion, strength]);

  return (
    <div ref={ref} className={className} {...props}>
      <div
        className={innerClassName}
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
          transition: "transform 420ms cubic-bezier(0.22, 1, 0.36, 1)",
          willChange: "transform",
        }}
      >
        {children}
      </div>
    </div>
  );
}
