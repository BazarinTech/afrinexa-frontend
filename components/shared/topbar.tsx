"use client"
import { useRouter } from "next/navigation"
import { ArrowLeft01Icon } from "hugeicons-react"
import { cn } from "@/lib/utils"
import { AfinexaLogo } from "./brand-logo"

type Props = {
  className?: string
  title: string
  backBtn?: boolean
  /** Show the Afinexa logo in place of the text title. `title` stays as the accessible name. */
  brand?: boolean
  /** Optional second line under the title -- a route, a count, a state. */
  caption?: string
}

/**
 * The top bar.
 *
 * Everything sits to the left, the way a hire agreement is headed: the title
 * in small caps with its caption beneath, the back control as a bordered
 * square rather than a bare chevron, and a lane marking closing the bar off
 * from the page.
 */
function Topbar({ className, title, backBtn, brand, caption }: Props) {
  const router = useRouter()

  return (
    <header
      className={cn(
        "bg-background/90 sticky top-0 z-50 w-full backdrop-blur-lg",
        className,
      )}
    >
      <div className="mx-auto flex h-16 max-w-md items-center gap-3 px-4">
        {backBtn && (
          <button
            onClick={() => router.back()}
            className="border-border text-foreground hover:bg-muted flex size-9 shrink-0 items-center justify-center rounded-xl border transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft01Icon size={19} />
          </button>
        )}

        {brand ? (
          <>
            <h1 className="sr-only">{title}</h1>
            <AfinexaLogo size="sm" />
          </>
        ) : (
          <div className="min-w-0">
            <h1 className="text-foreground truncate text-[0.9375rem] font-semibold tracking-[0.08em] uppercase">
              {title}
            </h1>
            {caption && <p className="text-muted-foreground truncate text-xs">{caption}</p>}
          </div>
        )}
      </div>
      <div className="via-primary/35 h-px bg-gradient-to-r from-transparent to-transparent" />
    </header>
  )
}

export default Topbar
