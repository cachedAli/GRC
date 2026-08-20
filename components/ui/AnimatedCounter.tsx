"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, animate } from "framer-motion";

interface AnimatedCounterProps {
  target: number;
  suffix?: string;
  prefix?: string;
}

export default function AnimatedCounter({
  target,
  suffix = "",
  prefix = "",
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (isInView) {
      const controls = animate(motionValue, target, {
        duration: 2.2,
        ease: [0.22, 1, 0.36, 1],
        onUpdate(value) {
          if (ref.current) {
            ref.current.textContent =
              prefix + Math.round(value).toString() + suffix;
          }
        },
      });
      return controls.stop;
    }
  }, [isInView, motionValue, target, suffix, prefix]);

  return (
    <span ref={ref}>
      {prefix}0{suffix}
    </span>
  );
}
