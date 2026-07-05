"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CarLensLogo } from "@/components/brand/CarLensLogo";

const navItems = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Scan", href: "/scan" },
  { label: "Tools", href: "/tools" },
  { label: "Garage", href: "/history" },
];

const toolRoutes = ["/tools", "/vin", "/negotiator", "/chat"];

export function AppTopNavigation() {
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-0 z-30 hidden border-b border-slate-800/80 bg-black/72 px-6 backdrop-blur-xl md:block">
      <nav
        aria-label="Primary navigation"
        className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-8"
      >
        <Link
          href="/dashboard"
          className="flex items-center gap-3 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black"
        >
          <CarLensLogo variant="icon" size="lg" className="-my-2" />
          <span>
            <CarLensLogo variant="wordmark" size="lg" />
            <span className="block text-xs font-semibold text-slate-500">
              AI automotive intelligence
            </span>
          </span>
        </Link>

        <div className="flex items-center gap-1 rounded-full bg-white/5 p-1 ring-1 ring-white/10">
          {navItems.map((item) => {
            const isActive =
              item.href === "/dashboard"
                ? pathname === "/dashboard"
                : item.href === "/tools"
                  ? toolRoutes.some((route) => pathname.startsWith(route))
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`rounded-full px-4 py-2 text-sm font-bold transition focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isActive
                    ? "bg-blue-600 text-white shadow-[0_10px_26px_rgba(37,99,235,0.32)]"
                    : "text-slate-400 hover:bg-white/10 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <Link
          href="/profile"
          className="rounded-full bg-white/10 px-4 py-2 text-sm font-bold text-slate-100 ring-1 ring-white/10 transition hover:-translate-y-0.5 hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Profile
        </Link>
      </nav>
    </header>
  );
}
