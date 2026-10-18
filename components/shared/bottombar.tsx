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
 * A dark rail against the pale app, fixed on the bottom edge. Labels are not
 * printed under every icon: the tab you are on opens into a blue pill with
 * its name beside the icon, and the rest stay as plain marks, so the bar
 * reads as one object rather than five columns.
 *
 * It renders a spacer of its own height in normal flow ahead of itself, so
 * pages lay out relative to the bar and nothing ends up underneath it.
 */
export function BottomNav() {
  const pathname = usePathname()

  return (
    <>
      <div aria-hidden style={{ height: "calc(4.25rem + env(safe-area-inset-bottom))" }} />

      <nav
        className="bg-ink fixed inset-x-0 bottom-0 z-50"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <div className="lane-dashes" />
        <div className="mx-auto flex h-[4.25rem] max-w-md items-center justify-between gap-1 px-3">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                aria-label={item.label}
                className={cn(
                  "flex h-11 items-center justify-center gap-2 rounded-full transition-all duration-200",
                  isActive
                    ? "bg-primary text-primary-foreground flex-1 px-4"
                    : "text-ink-foreground/55 hover:text-ink-foreground w-11 shrink-0 active:scale-95",
                )}
              >
                <Icon size={21} strokeWidth={isActive ? 2 : 1.5} />
                {isActive && (
                  <span className="text-[0.8125rem] font-semibold whitespace-nowrap">{item.label}</span>
                )}
              </Link>
            )
          })}
        </div>
      </nav>
    </>
  )
}
