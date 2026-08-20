"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Navbar";

export default function ConditionalNavbar() {
  const pathname = usePathname();
  const showNavbar = pathname !== "/";

  if (!showNavbar) {
    return null;
  }

  return (
    <>
      <Navbar key={pathname} moveLogo={true} />
      <div className="h-20 md:h-24" aria-hidden="true" />
    </>
  );
}
