"use client";

interface SectionDividerProps {
  variant: "rule" | "diamonds" | "dots";
}

export default function SectionDivider({ variant }: SectionDividerProps) {
  if (variant === "rule") {
    return (
      <div className="w-full px-8 py-2">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-[#C8CAFF] to-transparent" />
      </div>
    );
  }

  if (variant === "diamonds") {
    return (
      <div className="flex justify-center items-center gap-3 py-8">
        <span className="text-[#F5A623] text-xs">◆</span>
        <span className="text-[#8B8FE8] text-xs">◆</span>
        <span className="text-[#93C5FD] text-xs">◆</span>
      </div>
    );
  }

  // dots
  return (
    <div className="relative w-full h-6 overflow-hidden">
      <svg
        className="absolute inset-0 w-full h-full opacity-20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="dot-grid"
            x="0"
            y="0"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="2" cy="2" r="1" fill="#1F2740" />
          </pattern>
          <radialGradient id="fade" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <mask id="dot-mask">
            <rect width="100%" height="100%" fill="url(#fade)" />
          </mask>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill="url(#dot-grid)"
          mask="url(#dot-mask)"
        />
      </svg>
    </div>
  );
}
