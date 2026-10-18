import Link from "next/link"
import { AfrinexaLogo } from "@/components/shared/brand-logo"

type Props = {
  title: string
  subtitle: string
  children: React.ReactNode
  /** The line under the card -- "Already have an account?" and the like. */
  footer?: React.ReactNode
  /** Where the logo leads. Sign-in and sign-up point at each other's start. */
  home?: string
}

// The three things a member is actually signing up for, stated once.
const assurances = ["Daily hire income", "M-Pesa in and out", "Three partner levels"]

/**
 * The frame every sign-in screen sits in.
 *
 * One card, centred on a stitched grey ground, with a dark header band for
 * the brand and the heading and the form on white below it -- the shape of a
 * counter agreement rather than a landing page. The card holds its width on
 * a desktop instead of stretching, so the screen reads the same everywhere.
 */
export function AuthShell({ title, subtitle, children, footer, home = "/login" }: Props) {
  return (
    <div className="bg-muted/60 bg-stitch flex min-h-dvh flex-col items-center justify-center px-4 py-10">
      <div className="border-border bg-card w-full max-w-sm overflow-hidden rounded-2xl border shadow-premium">
        <div className="bg-hero relative px-6 pt-6 pb-7">
          <div className="bg-stitch-dark absolute inset-0 opacity-60" />
          <div className="relative">
            <Link href={home} aria-label="Afrinexa">
              <AfrinexaLogo size="sm" inverse />
            </Link>
            <h1 className="text-ink-foreground mt-6 text-2xl leading-tight font-semibold">{title}</h1>
            <p className="text-ink-foreground/60 mt-1.5 text-sm">{subtitle}</p>
          </div>
          <div className="brand-hairline absolute inset-x-0 bottom-0" />
        </div>

        <div className="px-6 py-6 [&_input]:h-12 [&_input]:rounded-lg">{children}</div>
      </div>

      {footer && <p className="text-muted-foreground mt-5 text-center text-sm">{footer}</p>}

      <ul className="text-muted-foreground mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs">
        {assurances.map((line) => (
          <li key={line} className="flex items-center gap-1.5">
            <span className="bg-primary size-1 rounded-full" />
            {line}
          </li>
        ))}
      </ul>
    </div>
  )
}
