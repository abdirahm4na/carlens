"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Home", href: "/", icon: HomeIcon },
  { label: "Scan", href: "/scan", icon: ScanIcon },
  { label: "History", href: "/history", icon: HistoryIcon },
  { label: "Profile", href: "/profile", icon: ProfileIcon },
];

export function BottomNavigation() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Primary navigation"
      className="fixed inset-x-0 bottom-0 z-20 border-t border-slate-200 bg-white/95 px-5 pb-5 pt-3 shadow-[0_-12px_30px_rgba(15,23,42,0.08)] backdrop-blur"
    >
      <div className="mx-auto grid max-w-md grid-cols-4 gap-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.label}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={`flex min-h-14 flex-col items-center justify-center gap-1 rounded-2xl text-xs font-bold transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                isActive
                  ? "bg-blue-50 text-blue-700"
                  : "text-slate-400 hover:bg-slate-50 hover:text-slate-700"
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
  return (
    <svg
      aria-hidden="true"
      className="size-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="m4 11 8-7 8 7" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 10v10h12V10" />
    </svg>
  );
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
