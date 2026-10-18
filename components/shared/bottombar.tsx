"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { DashboardSquare01Icon, Car03Icon, Invoice01Icon, UserGroupIcon, UserSquareIcon } from "hugeicons-react"
import { cn } from "@/lib/utils"

// The language of a hire desk: the board, the cars, what they have billed,
// the people you brought in, and your own file.
const navItems = [
  { label: "Board", href: "/home", icon: DashboardSquare01Icon },
  { label: "Fleet", href: "/products", icon: Car03Icon },
  { label: "Earnings", href: "/work", icon: Invoice01Icon },
  { label: "Network", href: "/team", icon: UserGroupIcon },
  { label: "Account", href: "/mine", icon: UserSquareIcon },
]

/**
 * The bottom bar.
 *
 * White ground, blue for the tab you are on: a pale blue panel behind the
 * whole column with a blue rule across the top of it. Every tab keeps its
 * label, and each one is a full-height column of equal width, so the target
 * is the size of a thumb rather than the size of the icon.
 *
 * It renders a spacer in normal flow ahead of itself, so pages lay out
 * relative to the bar and nothing ends up underneath it. The spacer is the
 * bar's height plus a gap: flush to the pixel, a button at the end of a page
 * looks wedged under the bar even though it clears it.
 */
export function BottomNav() {
  const pathname = usePathname()

  return (
    <>
      <div aria-hidden style={{ height: "calc(4.5rem + 1.5rem + env(safe-area-inset-bottom))" }} />

      <nav
        className="border-border bg-background/95 fixed inset-x-0 bottom-0 z-50 border-t backdrop-blur-lg"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <div className="mx-auto flex h-[4.5rem] max-w-md items-stretch gap-1 px-2 py-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "relative flex flex-1 flex-col items-center justify-center gap-1.5 rounded-xl transition-colors",
                  isActive
                    ? "bg-accent text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground active:bg-muted",
                )}
              >
                {isActive && (
                  <span className="bg-primary absolute inset-x-3 top-0 h-[3px] rounded-full" />
                )}
                <Icon size={22} strokeWidth={isActive ? 2 : 1.5} />
                <span className={cn("text-[0.6875rem] leading-none", isActive ? "font-semibold" : "font-medium")}>
                  {item.label}
                </span>
              </Link>
            )
          })}
        </div>
      </nav>
    </>
  )
}
