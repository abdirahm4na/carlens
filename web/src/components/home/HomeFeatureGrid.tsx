import Link from "next/link";

const features = [
  {
    title: "Scan a Car",
    description: "Identify a vehicle from photos.",
    href: "/scan",
    icon: ScanIcon,
  },
  {
    title: "Listing Negotiator",
    description: "Analyze seller screenshots.",
    href: "/negotiator",
    icon: MessageIcon,
  },
  {
    title: "Saved History",
    description: "Review past AI reports.",
    href: "/history",
    icon: HistoryIcon,
  },
  {
    title: "VIN Decoder",
    description: "Decode factory details.",
    href: "/vin",
    icon: VinIcon,
  },
  {
    title: "Ask AI",
    description: "Chat about a vehicle.",
    href: "/chat",
    icon: ChatIcon,
  },
];

export function HomeFeatureGrid() {
  return (
    <section className="mt-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {features.map((feature) => {
          const Icon = feature.icon;

          return (
            <Link
              key={feature.href}
              href={feature.href}
              className="group min-h-44 rounded-[1.75rem] bg-white/90 p-5 shadow-[0_18px_44px_rgba(0,0,0,0.22)] ring-1 ring-slate-200/80 backdrop-blur transition duration-300 hover:-translate-y-1 hover:shadow-[0_26px_60px_rgba(37,99,235,0.14)] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <span className="flex size-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
                <Icon />
              </span>
              <h2 className="mt-5 text-base font-bold leading-5 text-slate-950">
                {feature.title}
              </h2>
              <p className="mt-2 text-sm leading-5 text-slate-500">
                {feature.description}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

function ScanIcon() {
  return (
    <svg aria-hidden="true" className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 8V5h3M16 5h3v3M19 16v3h-3M8 19H5v-3" />
    </svg>
  );
}

function MessageIcon() {
  return (
    <svg aria-hidden="true" className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h6" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 19.5V6a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H8.5L5 19.5Z" />
    </svg>
  );
}

function HistoryIcon() {
  return (
    <svg aria-hidden="true" className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v5l3 2" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 7a8 8 0 1 1-1 9" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v4h4" />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg aria-hidden="true" className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h8M8 14h5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a8 8 0 1 1-3.2-6.4L21 4v8Z" />
    </svg>
  );
}

function VinIcon() {
  return (
    <svg aria-hidden="true" className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h10M7 12h10M7 17h6" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" />
    </svg>
  );
}
