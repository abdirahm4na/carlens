import { useId } from "react";

type CarLensLogoVariant = "full" | "icon" | "wordmark";
type CarLensLogoSize = "sm" | "md" | "lg";

type CarLensLogoProps = {
  variant?: CarLensLogoVariant;
  size?: CarLensLogoSize;
  className?: string;
};

const sizeClassNames: Record<
  CarLensLogoSize,
  { wrapper: string; icon: string; text: string }
> = {
  sm: {
    wrapper: "gap-2.5",
    icon: "size-8",
    text: "text-sm",
  },
  md: {
    wrapper: "gap-3",
    icon: "size-10",
    text: "text-base",
  },
  lg: {
    wrapper: "gap-4",
    icon: "size-14",
    text: "text-2xl",
  },
};

export function CarLensLogo({
  variant = "full",
  size = "md",
  className = "",
}: CarLensLogoProps) {
  const sizeClassName = sizeClassNames[size];

  if (variant === "icon") {
    return <LogoIcon className={`${sizeClassName.icon} ${className}`} />;
  }

  if (variant === "wordmark") {
    return <Wordmark className={`${sizeClassName.text} ${className}`} />;
  }

  return (
    <span
      className={`inline-flex items-center ${sizeClassName.wrapper} ${className}`}
      aria-label="CarLens"
    >
      <LogoIcon className={sizeClassName.icon} />
      <Wordmark className={sizeClassName.text} />
    </span>
  );
}

function LogoIcon({ className }: { className: string }) {
  const id = useId().replace(/:/g, "");
  const cGradientId = `${id}-c-gradient`;
  const cHighlightId = `${id}-c-highlight`;
  const lensBodyId = `${id}-lens-body`;
  const glassId = `${id}-glass`;
  const glareId = `${id}-glare`;
  const maskId = `${id}-c-cut`;

  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 96 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={cGradientId} x1="24" y1="13" x2="70" y2="83">
          <stop stopColor="#22D3EE" />
          <stop offset="0.34" stopColor="#2563EB" />
          <stop offset="0.68" stopColor="#104DE8" />
          <stop offset="1" stopColor="#7C3AED" />
        </linearGradient>
        <linearGradient id={cHighlightId} x1="26" y1="14" x2="43" y2="30">
          <stop stopColor="#67E8F9" stopOpacity="0.95" />
          <stop offset="1" stopColor="#2563EB" stopOpacity="0" />
        </linearGradient>
        <radialGradient
          id={lensBodyId}
          cx="0"
          cy="0"
          r="1"
          gradientTransform="translate(46 44) rotate(64) scale(27)"
        >
          <stop stopColor="#1E293B" />
          <stop offset="0.45" stopColor="#030712" />
          <stop offset="1" stopColor="#000000" />
        </radialGradient>
        <radialGradient
          id={glassId}
          cx="0"
          cy="0"
          r="1"
          gradientTransform="translate(41 38) rotate(45) scale(26)"
        >
          <stop stopColor="#8B5CF6" />
          <stop offset="0.2" stopColor="#2563EB" stopOpacity="0.65" />
          <stop offset="0.58" stopColor="#020617" stopOpacity="0.95" />
          <stop offset="1" stopColor="#000000" />
        </radialGradient>
        <radialGradient
          id={glareId}
          cx="0"
          cy="0"
          r="1"
          gradientTransform="translate(38 34) rotate(45) scale(9)"
        >
          <stop stopColor="#FFFFFF" />
          <stop offset="0.45" stopColor="#8B5CF6" />
          <stop offset="1" stopColor="#2563EB" stopOpacity="0" />
        </radialGradient>
        <mask id={maskId}>
          <rect width="96" height="96" fill="white" />
          <path d="M59.5 36.5L78 18H96V78H78L59.5 59.5V36.5Z" fill="black" />
        </mask>
      </defs>

      <g mask={`url(#${maskId})`}>
        <circle
          cx="48"
          cy="48"
          r="34"
          stroke={`url(#${cGradientId})`}
          strokeWidth="19"
        />
        <path
          d="M47.8 14C35 14.1 23.6 21.2 17.8 32"
          stroke={`url(#${cHighlightId})`}
          strokeWidth="4"
          strokeLinecap="round"
          opacity="0.8"
        />
      </g>

      <circle cx="43.5" cy="48" r="24" fill="#05070A" />
      <circle cx="43.5" cy="48" r="21" fill={`url(#${lensBodyId})`} />
      <circle cx="43.5" cy="48" r="20.2" stroke="#94A3B8" strokeOpacity="0.28" strokeWidth="2" />
      <circle cx="43.5" cy="48" r="16.4" stroke="#1E293B" strokeWidth="3.2" />
      <circle cx="43.5" cy="48" r="13" fill={`url(#${glassId})`} />
      <circle cx="43.5" cy="48" r="10.4" stroke="#0F172A" strokeWidth="3" />
      <circle cx="43.5" cy="48" r="6.2" fill="#020617" />
      <path
        d="M29.5 48C29.5 40.8 35.8 34.3 43.7 34.3"
        stroke="#A78BFA"
        strokeWidth="3.6"
        strokeLinecap="round"
        opacity="0.78"
      />
      <path
        d="M54.6 36.8C58.5 41.7 59 49.1 55.4 54.8"
        stroke="#64748B"
        strokeWidth="2.2"
        strokeLinecap="round"
        opacity="0.72"
      />
      <circle cx="36.6" cy="37.2" r="5.7" fill={`url(#${glareId})`} />
      <circle cx="44.3" cy="43.6" r="2.8" fill="#22D3EE" fillOpacity="0.86" />
      <circle cx="39.2" cy="34.4" r="1.7" fill="#FFFFFF" fillOpacity="0.86" />
      <circle cx="43.5" cy="48" r="23.2" stroke="#000000" strokeOpacity="0.62" strokeWidth="3" />
    </svg>
  );
}

function Wordmark({ className }: { className: string }) {
  return (
    <span
      className={`font-bold tracking-normal text-white drop-shadow-[0_2px_14px_rgba(255,255,255,0.12)] ${className}`}
    >
      CarLens
    </span>
  );
}
