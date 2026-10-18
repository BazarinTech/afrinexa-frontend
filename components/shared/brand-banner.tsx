import { cn } from "@/lib/utils"
import { AfinexaLogo } from "./brand-logo"
import { RoadScene } from "./road-scene"

type Props = {
  eyebrow?: string
  title: string
  subtitle?: string
  size?: "sm" | "lg"
  /** Show the logo in the top-left corner. */
  showLogo?: boolean
  className?: string
  children?: React.ReactNode
}

/**
 * The night banner: the forecourt after dark, closed with a lane marking.
 *
 * The scene is drawn, not photographed -- it stays crisp at any size, weighs
 * nothing, and recolours with the theme.
 */
export function BrandBanner({
  eyebrow,
  title,
  subtitle,
  size = "sm",
  showLogo = true,
  className,
  children,
}: Props) {
  const large = size === "lg"

  return (
    <div
      className={cn(
        "bg-hero relative isolate w-full overflow-hidden rounded-2xl",
        large ? "min-h-72 p-7 sm:p-10" : "min-h-44 p-5",
        className,
      )}
    >
      {/* The road behind the words. */}
      <RoadScene className="absolute inset-0 -z-10" />

      <div className={cn("relative flex h-full flex-col", large ? "gap-6" : "gap-4")}>
        {showLogo && <AfinexaLogo size={large ? "md" : "sm"} inverse />}

        <div className={cn("max-w-md", large ? "mt-auto pt-10" : "mt-auto pt-4")}>
          {eyebrow && <p className="text-eyebrow text-sky">{eyebrow}</p>}
          <h2
            className={cn(
              "mt-1.5 font-semibold text-balance text-ink-foreground",
              large ? "text-3xl sm:text-4xl" : "text-xl",
            )}
          >
            {title}
          </h2>
          {subtitle && (
            <p className={cn("mt-2 text-ink-foreground/70 text-pretty", large ? "text-base" : "text-sm")}>
              {subtitle}
            </p>
          )}
          {children}
        </div>
      </div>

      <div className="brand-hairline absolute inset-x-0 bottom-0" />
    </div>
  )
}
