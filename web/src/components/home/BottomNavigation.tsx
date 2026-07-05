"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CarLensLogo } from "@/components/brand/CarLensLogo";

const navItems = [
  { label: "Home", href: "/dashboard", icon: HomeIcon },
  { label: "Scan", href: "/scan", icon: ScanIcon },
  { label: "Tools", href: "/tools", icon: NegotiatorIcon },
  { label: "Garage", href: "/history", icon: HistoryIcon },
  { label: "Profile", href: "/profile", icon: ProfileIcon },
];

const toolRoutes = ["/tools", "/vin", "/negotiator", "/chat"];

export function BottomNavigation() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Primary navigation"
      className="fixed inset-x-0 bottom-0 z-20 border-t border-slate-800/80 bg-black/80 px-3 pb-4 pt-3 shadow-[0_-24px_70px_rgba(0,0,0,0.55)] backdrop-blur-xl sm:px-5 md:hidden"
    >
      <div className="mx-auto grid max-w-lg grid-cols-5 gap-1.5 sm:gap-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === "/dashboard"
              ? pathname === "/dashboard"
              : item.href === "/tools"
                ? toolRoutes.some((route) => pathname.startsWith(route))
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.label}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={`flex min-h-14 flex-col items-center justify-center gap-1 rounded-2xl px-1 text-[11px] font-bold transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:text-xs ${
                isActive
                  ? "bg-blue-600 text-white shadow-[0_14px_34px_rgba(37,99,235,0.38)]"
                  : "text-slate-500 hover:-translate-y-0.5 hover:bg-white/10 hover:text-slate-100"
              }`}
            >
              <Icon />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

function HomeIcon() {
  return <CarLensLogo variant="icon" className="size-5" />;
}

function ScanIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 8V5h3M16 5h3v3M19 16v3h-3M8 19H5v-3" />
    </svg>
  );
}

function NegotiatorIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h6" />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 19.5V6a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H8.5L5 19.5Z"
      />
    </svg>
  );
}

function HistoryIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v5l3 2" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 7a8 8 0 1 1-1 9" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v4h4" />
    </svg>
  );
}

function ProfileIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 21a7 7 0 0 1 14 0" />
    </svg>
  );
}
