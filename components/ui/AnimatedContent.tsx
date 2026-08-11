"use client";

import {
  motion,
  type HTMLMotionProps,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { type ReactNode, useRef } from "react";

type AnimatedContentProps = Omit<HTMLMotionProps<"div">, "children"> & {
  children: ReactNode;
  distance?: number;
  direction?: "vertical" | "horizontal";
  reverse?: boolean;
  duration?: number;
  initialOpacity?: number;
  scale?: number;
  threshold?: number;
  delay?: number;
};

// Adapted from ReactBits Animated Content through the ReactBits MCP.
// This version uses the project's existing Framer Motion dependency and
// respects reduced-motion preferences without adding GSAP.
export default function AnimatedContent({
  children,
  distance = 24,
  direction = "vertical",
  reverse = false,
  duration = 0.45,
  initialOpacity = 0,
  scale = 0.99,
  threshold = 0.15,
  delay = 0,
  className,
  ...props
}: AnimatedContentProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: threshold, once: true });
  const prefersReducedMotion = useReducedMotion();
  const offset = reverse ? -distance : distance;
  const initial = prefersReducedMotion
    ? false
    : direction === "horizontal"
      ? { x: offset, opacity: initialOpacity, scale }
      : { y: offset, opacity: initialOpacity, scale };

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={inView ? { x: 0, y: 0, opacity: 1, scale: 1 } : undefined}
      transition={{ duration: prefersReducedMotion ? 0 : duration, delay: prefersReducedMotion ? 0 : delay, ease: "easeOut" }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
