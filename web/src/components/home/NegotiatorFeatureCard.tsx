import Link from "next/link";

export function NegotiatorFeatureCard() {
  return (
    <Link
      href="/negotiator"
      className="group flex items-center gap-4 rounded-[1.75rem] bg-white/90 p-4 shadow-[0_14px_34px_rgba(15,23,42,0.06)] ring-1 ring-slate-200/80 backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_44px_rgba(15,23,42,0.09)] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    >
      <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 transition group-hover:bg-blue-100">
        <MessageIcon />
      </span>

      <span className="min-w-0 flex-1">
        <span className="block text-base font-bold text-slate-950">
          Listing Negotiator
        </span>
        <span className="mt-1 block text-sm leading-5 text-slate-500">
          Analyze seller screenshots and draft your offer.
        </span>
      </span>

      <span className="text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-blue-500">
        <ChevronRightIcon />
      </span>
    </Link>
  );
}

function MessageIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-6"
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

function ChevronRightIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="m9 18 6-6-6-6" />
    </svg>
  );
}
