'use client'

import LogoutAlert from '@/components/alerts/logout-alert'
import { BottomNav } from '@/components/shared/bottombar'
import Topbar from '@/components/shared/topbar'
import { AfrinexaMark } from '@/components/shared/brand-logo'
import { Skeleton } from '@/components/ui/skeleton'
import { useCurrency } from '@/lib/hooks/use-currency'
import { useMainStore } from '@/lib/stores/use-main-store'
import {
  Wallet01Icon,
  Download01Icon,
  BankIcon,
  Ticket02Icon,
  Invoice01Icon,
  InformationSquareIcon,
  LockPasswordIcon,
  CustomerServiceIcon,
  Download02Icon,
  Logout01Icon,
  WhatsappIcon,
  TelegramIcon,
} from "hugeicons-react"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

type MenuItem = {
  icon: typeof Wallet01Icon
  label: string
  href: string
}

// Two blocks of tiles rather than one long list of rows: everything on the
// page can be seen without scrolling past it.
const menuGroups: { label: string; items: MenuItem[] }[] = [
  {
    label: "Your file",
    items: [
      { icon: BankIcon, label: "Payout account", href: "/cashout-wallet" },
      { icon: Invoice01Icon, label: "Statements", href: "/records" },
      { icon: Ticket02Icon, label: "Coupons", href: "/bonus" },
      { icon: LockPasswordIcon, label: "Password", href: "/reset-password" },
    ],
  },
  {
    label: "Help and community",
    items: [
      { icon: CustomerServiceIcon, label: "Support", href: process.env.NEXT_PUBLIC_CUSTOMER_SUPPORT ?? "" },
      { icon: WhatsappIcon, label: "WhatsApp", href: process.env.NEXT_PUBLIC_WHATSAPP_GROUP ?? "" },
      { icon: TelegramIcon, label: "Telegram", href: process.env.NEXT_PUBLIC_TELEGRAM_CHANNEL ?? "" },
      { icon: InformationSquareIcon, label: "About Afrinexa", href: "/company" },
      { icon: Download02Icon, label: "Get the app", href: "https://apk.e-droid.net/apk/app3980533-tdv41u.apk?v=2" },
    ],
  },
]

/**
 * The account page, kept as a member file.
 *
 * The identity and the balance sit together on one card, the way a hire
 * company holds a member on a single sheet; everything else is a tile you can
 * reach without reading a list.
 */
function Page() {
  const router = useRouter()
  const [islogoutAlertOpen, setIslogoutAlertOpen] = useState(false)
  const loginState = useMainStore((state) => state.loginState)
  const mainDetails = useMainStore((state) => state.mainDetails)

  useEffect(() => {
    loginState()
  }, [loginState])

  const loading = !mainDetails
  const wallet = mainDetails?.wallet

  // Formatted before the JSX: useCurrency is a plain function, but calling it
  // inside a ternary trips rules-of-hooks on its "use" prefix.
  const balance = useCurrency(wallet?.balance ?? 0)

  const stats = [
    { label: "Today", value: useCurrency(wallet?.today_income ?? 0) },
    { label: "Active network", value: String(mainDetails?.referral?.active_downlines ?? 0) },
    { label: "Partner income", value: useCurrency(wallet?.invite_income ?? 0) },
  ]

  return (
    <div>
      <Topbar title="Account" caption="Your member file" />

      <main className="mx-auto max-w-md px-4 pt-4">
        {/* The member card */}
        <section className="bg-hero relative isolate overflow-hidden rounded-2xl p-5">
          <div className="bg-stitch-dark absolute inset-0 opacity-70" />

          <div className="relative flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-eyebrow text-sky">Member</p>
              {loading ? (
                <Skeleton className="mt-2 h-6 w-32 bg-white/15" />
              ) : (
                <p className="text-ink-foreground mt-1 truncate text-xl font-semibold">
                  {mainDetails?.user?.username ?? "Member"}
                </p>
              )}
              {loading ? (
                <Skeleton className="mt-2 h-4 w-40 bg-white/15" />
              ) : (
                <p className="text-ink-foreground/55 mt-1 truncate text-sm tabular-nums">
                  No. {mainDetails?.user?.ID} · {mainDetails?.user?.phone}
                </p>
              )}
            </div>
            <div className="flex shrink-0 flex-col items-end gap-2">
              <AfrinexaMark size={34} title="Afrinexa" />
              {!loading && (
                <span className="text-eyebrow text-sky rounded-md bg-white/10 px-2 py-0.5">{wallet?.level}</span>
              )}
            </div>
          </div>

          <div className="lane-dashes relative my-5" />

          <div className="relative flex items-end justify-between gap-4">
            <div className="min-w-0">
              <p className="text-eyebrow text-ink-foreground/50">Wallet balance</p>
              {loading ? (
                <Skeleton className="mt-2 h-8 w-40 bg-white/15" />
              ) : (
                <p className="text-ink-foreground mt-1 truncate text-3xl font-semibold tabular-nums">{balance}</p>
              )}
            </div>
          </div>
        </section>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <button
            onClick={() => router.push('/recharge')}
            className="border-border text-foreground hover:bg-muted flex h-11 items-center justify-center gap-2 rounded-xl border text-sm font-semibold transition-colors"
          >
            <Wallet01Icon size={18} className="text-primary" />
            Top up
          </button>
          <button
            onClick={() => router.push('/cashout')}
            className="bg-primary text-primary-foreground hover:bg-brand-deep flex h-11 items-center justify-center gap-2 rounded-xl text-sm font-semibold transition-colors"
          >
            <Download01Icon size={18} />
            Cash out
          </button>
        </div>

        {/* Three figures, ruled like a statement */}
        <dl className="border-border divide-border bg-card mt-4 grid grid-cols-3 divide-x overflow-hidden rounded-xl border">
          {stats.map((stat) => (
            <div key={stat.label} className="px-2 py-3 text-center">
              {loading ? (
                <Skeleton className="mx-auto h-4 w-14" />
              ) : (
                <dd className="text-foreground truncate text-sm font-semibold tabular-nums">{stat.value}</dd>
              )}
              <dt className="text-muted-foreground mt-0.5 text-[0.6875rem]">{stat.label}</dt>
            </div>
          ))}
        </dl>

        {menuGroups.map((group) => (
          <section key={group.label} className="mt-6">
            <h2 className="text-eyebrow text-muted-foreground mb-2">{group.label}</h2>
            <div className="grid grid-cols-2 gap-3">
              {group.items.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="border-border bg-card hover:border-primary/40 hover:bg-accent group flex items-center gap-3 rounded-xl border px-3.5 py-3 transition-colors"
                >
                  <item.icon size={19} className="text-primary shrink-0" />
                  <span className="text-foreground truncate text-sm font-medium">{item.label}</span>
                </Link>
              ))}
            </div>
          </section>
        ))}

        <button
          type="button"
          onClick={() => setIslogoutAlertOpen(true)}
          className="border-destructive/30 text-destructive hover:bg-destructive/10 mt-6 flex w-full items-center justify-center gap-2 rounded-xl border py-3 text-sm font-semibold transition-colors"
        >
          <Logout01Icon size={18} />
          Sign out
        </button>
      </main>

      <BottomNav />
      <LogoutAlert isOpen={islogoutAlertOpen} onClose={() => setIslogoutAlertOpen(false)} />
    </div>
  )
}

export default Page
