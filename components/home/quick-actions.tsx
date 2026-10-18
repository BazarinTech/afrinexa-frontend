'use client'

import {
  Wallet01Icon,
  Download01Icon,
  Invoice01Icon,
  InformationCircleIcon,
  MarketingIcon,
  GiftIcon,
  WhatsappIcon,
  TelegramIcon,
} from "hugeicons-react"
import { useRouter } from "next/navigation"

const actions = [
  { icon: Wallet01Icon, label: "Top up", link: "/recharge" },
  { icon: Download01Icon, label: "Cash out", link: "/cashout" },
  { icon: GiftIcon, label: "Rewards", link: "/bonus" },
  { icon: MarketingIcon, label: "Partner", link: "/incentive" },
  { icon: Invoice01Icon, label: "Statements", link: "/records" },
  { icon: InformationCircleIcon, label: "About", link: "/company" },
  { icon: WhatsappIcon, label: "WhatsApp", link: process.env.NEXT_PUBLIC_WHATSAPP_GROUP ?? "" },
  { icon: TelegramIcon, label: "Telegram", link: process.env.NEXT_PUBLIC_TELEGRAM_CHANNEL ?? "" }
]

/**
 * The desk: one swipeable row of controls.
 *
 * A four-by-two grid of tiles took a whole screenful and gave every control
 * the same weight. On a rail the first few sit in reach of a thumb and the
 * rest are a swipe away.
 */
export function QuickActions() {
  const router = useRouter()
  return (
    <section aria-label="Quick actions">
      <div className="scrollbar-hide -mx-4 flex gap-2 overflow-x-auto px-4">
        {actions.map((action) => {
          const Icon = action.icon
          return (
            <button
              key={action.label}
              onClick={() => router.push(action.link)}
              className="border-border bg-card text-foreground hover:border-primary/40 hover:bg-accent flex h-11 shrink-0 items-center gap-2 rounded-full border px-4 text-sm font-medium transition-colors active:scale-95"
            >
              <Icon className="text-primary size-[1.125rem]" strokeWidth={1.7} />
              {action.label}
            </button>
          )
        })}
      </div>
    </section>
  )
}
