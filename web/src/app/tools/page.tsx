import Link from "next/link";

const tools = [
  {
    title: "VIN",
    href: "/vin",
    icon: "V",
  },
  {
    title: "Deal",
    href: "/negotiator",
    icon: "$",
  },
  {
    title: "Chat",
    href: "/chat",
    icon: "?",
  },
  {
    title: "Garage",
    href: "/history",
    icon: "G",
  },
];

export default function ToolsPage() {
  return (
    <main className="min-h-screen bg-[#05070A] px-5 py-8 text-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <header className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-5xl font-semibold tracking-normal text-slate-950 sm:text-6xl">
              Tools
            </h1>
          </div>
          <Link
            href="/dashboard"
            className="shrink-0 rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-700 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:text-blue-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Dashboard
          </Link>
        </header>

        <section className="motion-fade-up mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {tools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="group flex min-h-48 flex-col justify-between rounded-[2rem] bg-white/90 p-6 ring-1 ring-slate-200/80 backdrop-blur transition duration-500 hover:-translate-y-1 hover:bg-white/95 hover:shadow-[0_28px_80px_rgba(0,0,0,0.24)] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <div className="flex size-12 items-center justify-center rounded-2xl bg-white/10 text-lg font-bold text-slate-300 ring-1 ring-slate-200/80 transition group-hover:bg-blue-600 group-hover:text-white">
                {tool.icon}
              </div>
              <h2 className="text-2xl font-semibold tracking-normal text-slate-950">
                {tool.title}
              </h2>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}
