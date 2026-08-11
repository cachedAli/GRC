"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { type MouseEvent, type PropsWithChildren, useRef, useState } from "react";

type TiltedSurfaceProps = PropsWithChildren<{
  className?: string;
  rotateAmplitude?: number;
  scaleOnHover?: number;
  spotlightColor?: string;
}>;

const spring = { damping: 28, stiffness: 160, mass: 0.8 };

// Adapted from ReactBits Tilted Card + Spotlight Card via the ReactBits MCP.
// It accepts semantic UI instead of requiring a decorative image.
export default function TiltedSurface({
  children,
  className = "",
  rotateAmplitude = 7,
  scaleOnHover = 1.025,
  spotlightColor = "rgba(18, 216, 255, 0.2)",
}: TiltedSurfaceProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const rotateX = useSpring(useMotionValue(0), spring);
  const rotateY = useSpring(useMotionValue(0), spring);
  const scale = useSpring(1, spring);
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50, opacity: 0 });

  const handlePointerMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!ref.current || prefersReducedMotion) return;
    const rect = ref.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const centeredX = x - rect.width / 2;
    const centeredY = y - rect.height / 2;

    rotateX.set((centeredY / (rect.height / 2)) * -rotateAmplitude);
    rotateY.set((centeredX / (rect.width / 2)) * rotateAmplitude);
    setSpotlight({ x: (x / rect.width) * 100, y: (y / rect.height) * 100, opacity: 1 });
  };

  const reset = () => {
    rotateX.set(0);
    rotateY.set(0);
    scale.set(1);
    setSpotlight((value) => ({ ...value, opacity: 0 }));
  };

  return (
    <div
      ref={ref}
      className={`tilted-surface ${className}`}
      onMouseMove={handlePointerMove}
      onMouseEnter={() => !prefersReducedMotion && scale.set(scaleOnHover)}
      onMouseLeave={reset}
    >
      <motion.div
        className="tilted-surface-plane"
        style={{ rotateX, rotateY, scale, transformStyle: "preserve-3d" }}
      >
        <span
          className="tilted-surface-light"
          aria-hidden="true"
          style={{
            opacity: spotlight.opacity,
            background: `radial-gradient(circle at ${spotlight.x}% ${spotlight.y}%, ${spotlightColor}, transparent 58%)`,
          }}
        />
        <div className="tilted-surface-content">{children}</div>
      </motion.div>
    </div>
  );
}
