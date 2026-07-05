"use client";

import { type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { BottomNavigation } from "@/components/home/BottomNavigation";
import { AppTopNavigation } from "./AppTopNavigation";

export function AppChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isLandingPage = pathname === "/";

  if (isLandingPage) {
    return <>{children}</>;
  }

  return (
    <>
      <AppTopNavigation />
      <div className="pb-28 md:pb-0 md:pt-20">{children}</div>
      <BottomNavigation />
    </>
  );
}
