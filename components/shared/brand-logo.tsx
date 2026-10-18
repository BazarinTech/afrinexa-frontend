import { useId } from "react"
import { cn } from "@/lib/utils"

type MarkProps = {
  /** Rendered width and height in pixels. */
  size?: number
  className?: string
  /** Accessible name. Omit when a visible wordmark sits beside the mark. */
  title?: string
}

/**
 * The Afrinexa mark: an A cut from a road.
 *
 * The two strokes of the letter are the edges of a carriageway running to the
 * horizon, with the crossbar as a lane marking. Inline SVG rather than an
 * image so it stays sharp at every size; app/icon.svg is drawn from the same
 * paths.
 */
export function AfrinexaMark({ size = 32, className, title }: MarkProps) {
  // SVG gradient ids are document-global, so two marks on one page would
  // otherwise share a single definition. useId yields ":r1:"-style ids, and
  // colons are not safe inside url(#...).
  const uid = useId().replace(/:/g, "")

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      className={cn("shrink-0", className)}
    >
      <defs>
        <linearGradient id={`tile-${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3B6FF5" />
          <stop offset="1" stopColor="#1B3A9C" />
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="11" fill={`url(#tile-${uid})`} />

      {/* carriageway: the two strokes of the A, narrowing to the horizon */}
      <path fill="#FFFFFF" d="M21.6 9h4.8l9.1 30h-5.4L24 15.9 17.9 39h-5.4Z" />
      {/* lane marking across the middle */}
      <rect x="18.4" y="26.2" width="11.2" height="3.1" rx="1.55" fill="#B9D0FF" />
      {/* two dashes running away down the centre */}
      <rect x="22.4" y="18.6" width="3.2" height="4.4" rx="1.6" fill="#B9D0FF" opacity=".85" />
      <rect x="22.9" y="33.2" width="2.2" height="3" rx="1.1" fill="#B9D0FF" opacity=".6" />
    </svg>
  )
}

type LogoProps = {
  size?: "sm" | "md" | "lg"
  /** Light text for use on the dark night surfaces. */
  inverse?: boolean
  className?: string
}

const LOGO_SIZES = {
  sm: { mark: 24, text: "text-xs" },
  md: { mark: 30, text: "text-sm" },
  lg: { mark: 40, text: "text-lg" },
} as const

/** Mark plus the wordmark. */
export function AfrinexaLogo({ size = "md", inverse = false, className }: LogoProps) {
  const { mark, text } = LOGO_SIZES[size]

  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <AfrinexaMark size={mark} />
      <span
        className={cn(
          "font-semibold tracking-[0.22em] uppercase",
          text,
          inverse ? "text-ink-foreground" : "text-foreground",
        )}
      >
        Afrinexa
      </span>
    </span>
  )
}
