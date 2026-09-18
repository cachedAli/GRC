"use client";

import { useEffect, useState } from "react";

const MIN_HEIGHT = 760;

export default function AssuranceEmbed() {
  const [height, setHeight] = useState(MIN_HEIGHT);

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;
      if (event.data?.type !== "compliverse-assurance-height") return;
      const nextHeight = Number(event.data.height);
      if (Number.isFinite(nextHeight)) setHeight(Math.max(MIN_HEIGHT, nextHeight));
    };

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  return (
    <iframe
      title="CompliVerse Cybersecurity Assurance"
      src="/compliverse-cybersecurity-assurance.html"
      style={{ height }}
      className="block w-full border-0 bg-[#0b1220]"
    />
  );
}
