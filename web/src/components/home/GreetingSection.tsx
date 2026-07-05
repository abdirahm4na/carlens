import Link from "next/link";

type GreetingSectionProps = {
  greeting: string;
  userName: string;
};

export function GreetingSection({ greeting, userName }: GreetingSectionProps) {
  return (
    <section className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-slate-500">{greeting}</p>
        <h1 className="mt-1 text-3xl font-bold tracking-normal text-slate-950">
          {userName}
        </h1>
      </div>

      <Link
        href="/profile"
        aria-label="Open profile"
        className="flex size-12 items-center justify-center rounded-full bg-white text-sm font-bold text-blue-700 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        {userName.slice(0, 1).toUpperCase()}
      </Link>
    </section>
  );
}
