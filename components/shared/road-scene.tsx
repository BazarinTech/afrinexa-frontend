import { cn } from "@/lib/utils"

/**
 * The drawn forecourt used behind dark surfaces.
 *
 * A carriageway running to the horizon under a low city glow. Drawn rather
 * than photographed so it stays crisp at any size, weighs nothing and
 * recolours with the theme.
 */
export function RoadScene({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      className={cn("pointer-events-none h-full w-full", className)}
      viewBox="0 0 360 200"
      preserveAspectRatio="xMidYMax slice"
    >
      <defs>
        {/* The glow over the horizon reads as light, not as a sticker. */}
        <radialGradient id="road-glow">
          <stop offset="0" stopColor="currentColor" stopOpacity="0.6" />
          <stop offset="0.55" stopColor="currentColor" stopOpacity="0.2" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="road-face" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="currentColor" stopOpacity="0.32" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0.04" />
        </linearGradient>
      </defs>

      <g className="text-sky">
        <ellipse cx="248" cy="118" rx="130" ry="46" fill="url(#road-glow)" />
      </g>

      {/* skyline, far back */}
      <g className="text-chrome" fill="currentColor" opacity="0.2">
        <rect x="28" y="92" width="22" height="30" />
        <rect x="56" y="80" width="14" height="42" />
        <rect x="76" y="100" width="26" height="22" />
        <rect x="286" y="86" width="18" height="36" />
        <rect x="310" y="98" width="28" height="24" />
      </g>

      {/* the carriageway */}
      <path d="M126 122h108l96 78H30Z" className="text-chrome" fill="url(#road-face)" />
      <path d="M126 122h108l96 78H30Z" className="text-sky" stroke="currentColor" strokeOpacity="0.18" fill="none" />

      {/* centre line, dashes shortening towards the horizon */}
      <g className="text-sky" fill="currentColor" opacity="0.55">
        <rect x="176" y="186" width="9" height="14" rx="4" />
        <rect x="177.5" y="162" width="6.5" height="10" rx="3" />
        <rect x="178.6" y="144" width="4.8" height="7" rx="2.4" />
        <rect x="179.4" y="131" width="3.4" height="5" rx="1.7" />
      </g>
    </svg>
  )
}

/**
 * A car, in silhouette, seen from the side.
 *
 * Stands in for the photograph at public/car.jpg until that file exists, so
 * the home display never renders empty.
 */
export function CarSilhouette({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 200 84" className={cn("h-full w-auto", className)}>
      {/* One path, evenodd: the glass is a hole in the body, so it reads at
          any size and against any backdrop. */}
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M12 58c0-9 5-15 14-17l18-4 20-14c5-3 11-5 17-5h29c8 0 15 3 21 9l14 14 29 6c6 1 10 6 10 12v8c0 4-3 7-7 7h-13a21 21 0 0 0-42 0H75a21 21 0 0 0-42 0H19c-4 0-7-3-7-7Zm46-23 16-11c3-2 7-3 11-3h10v14Zm45 0V21h17c5 0 10 2 14 6l8 8Z"
      />
      <circle cx="54" cy="70" r="13" fill="currentColor" />
      <circle cx="54" cy="70" r="5.5" className="text-ink" fill="currentColor" />
      <circle cx="138" cy="70" r="13" fill="currentColor" />
      <circle cx="138" cy="70" r="5.5" className="text-ink" fill="currentColor" />
    </svg>
  )
}

/**
 * Portrait artwork for the story cards.
 *
 * Four stages of one hire, drawn from the same road and city glow so the row
 * reads as a sequence rather than four stock photographs. Each is replaced by
 * a real photograph the moment one is dropped at the matching path.
 */
export type VignetteVariant = "forecourt" | "road" | "meter" | "payout"

export function RoadVignette({ variant, className }: { variant: VignetteVariant; className?: string }) {
  return (
    <svg
      aria-hidden
      className={cn("pointer-events-none h-full w-full", className)}
      viewBox="0 0 200 280"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <radialGradient id={`vig-glow-${variant}`}>
          <stop offset="0" stopColor="currentColor" stopOpacity="0.55" />
          <stop offset="0.6" stopColor="currentColor" stopOpacity="0.16" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0" />
        </radialGradient>
      </defs>

      <g className="text-sky">
        <ellipse cx={variant === "road" ? 100 : 128} cy="96" rx="96" ry="54" fill={`url(#vig-glow-${variant})`} />
      </g>

      {/* ground */}
      <path d="M0 212h200v68H0Z" className="text-chrome" fill="currentColor" opacity="0.22" />
      <path d="M0 212h200" className="text-sky" stroke="currentColor" strokeOpacity="0.25" />

      {variant === "forecourt" && (
        <g className="text-ink-foreground" opacity="0.82">
          {/* three cars nose-on, the middle one pulled forward */}
          {[14, 72, 132].map((x, i) => (
            <g key={x} transform={`translate(${x} ${160 + (i % 2) * 18}) scale(1.08)`}>
              <path d="M2 30c0-6 3-10 8-11l6-9c2-3 5-4 8-4h12c3 0 6 1 8 4l6 9c5 1 8 5 8 11v8H2Z" fill="currentColor" />
              <circle cx="12" cy="40" r="4.5" fill="currentColor" />
              <circle cx="46" cy="40" r="4.5" fill="currentColor" />
            </g>
          ))}
        </g>
      )}

      {variant === "road" && (
        <>
          <path d="M72 212h56l48 68H24Z" className="text-chrome" fill="currentColor" opacity="0.22" />
          <g className="text-sky" fill="currentColor" opacity="0.6">
            <rect x="94" y="258" width="11" height="18" rx="5" />
            <rect x="96" y="232" width="8" height="13" rx="4" />
            <rect x="97.5" y="216" width="5.5" height="9" rx="2.7" />
          </g>
          <g className="text-ink-foreground" opacity="0.85" transform="translate(50 146) scale(0.5)">
            <path d="M12 58c0-9 5-15 14-17l18-4 20-14c5-3 11-5 17-5h29c8 0 15 3 21 9l14 14 29 6c6 1 10 6 10 12v8c0 4-3 7-7 7H19c-4 0-7-3-7-7Z" fill="currentColor" />
            <circle cx="54" cy="70" r="13" fill="currentColor" />
            <circle cx="138" cy="70" r="13" fill="currentColor" />
          </g>
        </>
      )}

      {variant === "meter" && (
        <g transform="translate(100 168)">
          <circle r="52" className="text-ink-foreground" fill="none" stroke="currentColor" strokeOpacity="0.2" strokeWidth="3" />
          {/* the sweep, as far as a good day takes it */}
          <path d="M-45 24A52 52 0 0 1 36 -38" className="text-sky" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
          {[-140, -110, -80, -50, -20].map((deg) => (
            <rect
              key={deg}
              x="-1.5"
              y="-50"
              width="3"
              height="10"
              rx="1.5"
              className="text-ink-foreground"
              fill="currentColor"
              opacity="0.45"
              transform={`rotate(${deg + 90})`}
            />
          ))}
          <path d="M0 4 34-28" className="text-beam" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
          <circle r="7" className="text-ink-foreground" fill="currentColor" opacity="0.8" />
        </g>
      )}

      {variant === "payout" && (
        <g className="text-ink-foreground" opacity="0.85">
          {/* a handset, paid */}
          <rect x="62" y="118" width="76" height="118" rx="14" fill="currentColor" opacity="0.45" />
          <rect x="70" y="128" width="60" height="86" rx="7" className="text-ink" fill="currentColor" opacity="0.55" />
          <path d="M82 170l13 14 24-27" className="text-sky" fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
          <g className="text-beam" fill="currentColor">
            <ellipse cx="52" cy="226" rx="17" ry="6" />
            <ellipse cx="52" cy="217" rx="17" ry="6" opacity="0.8" />
            <ellipse cx="148" cy="230" rx="14" ry="5" opacity="0.7" />
          </g>
        </g>
      )}
    </svg>
  )
}
