"use client"

import { useState, useSyncExternalStore } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight01Icon, Car03Icon } from "hugeicons-react"
import { useMainStore } from "@/lib/stores/use-main-store"
import { AfinexaLogo } from "@/components/shared/brand-logo"
import { RoadScene, CarSilhouette } from "@/components/shared/road-scene"

const HOURS = [
  { from: 5, greeting: "Good morning" },
  { from: 12, greeting: "Good afternoon" },
  { from: 17, greeting: "Good evening" },
  { from: 21, greeting: "Good night" },
]

function indexForHour(hour: number) {
  if (hour < HOURS[0].from) return HOURS.length - 1
  return HOURS.reduce((acc, h, i) => (hour >= h.from ? i : acc), 0)
}

// The clock is outside React, and the server has no business guessing the
// reader's. Subscribing to nothing renders the morning line on the server and
// the true hour the moment the page hydrates -- no state, no mismatch.
const subscribeToNothing = () => () => {}

/**
 * The board at the top of the home screen.
 *
 * It states the position rather than the balance: how many of your cars are
 * out earning, and the one thing to do next. The money is kept on the account
 * page, one tap away.
 *
 * The photograph loads from /car.jpg. Drop one in and it is used with no code
 * change; until then the drawn forecourt stands in.
 */
export function FleetHero({ name }: { name?: string }) {
  const [hasPhoto, setHasPhoto] = useState(true)
  const onRoad = useMainStore((s) => s.mainDetails?.user_investments?.filter((o) => o.status === "Active").length ?? 0)
  const greeting = HOURS[
    useSyncExternalStore(subscribeToNothing, () => indexForHour(new Date().getHours()), () => 0)
  ].greeting

  const firstName = name?.trim().split(/\s+/)[0]

  return (
    <section className="bg-hero relative isolate overflow-hidden rounded-2xl">
      <div className="bg-stitch-dark absolute inset-0 opacity-70" />

      {/* The car sits behind the words, running off the right edge. */}
      <div className="pointer-events-none absolute inset-y-0 right-0 w-[68%]">
        {hasPhoto ? (
          <Image
            src="/car.jpg"
            alt=""
            fill
            priority
            sizes="(max-width: 640px) 60vw, 288px"
            className="object-cover opacity-45"
            onError={() => setHasPhoto(false)}
          />
        ) : (
          <>
            <RoadScene className="absolute inset-0 opacity-80" />
            <CarSilhouette className="text-sky/70 absolute right-[-8%] bottom-6 h-16" />
          </>
        )}
      </div>

      {/* One wash across the whole card, so the picture has no edge of its own. */}
      <div className="from-ink via-ink/75 pointer-events-none absolute inset-0 bg-gradient-to-r to-transparent" />

      <div className="relative px-5 pt-5 pb-6">
        <AfinexaLogo size="sm" inverse />

        <p className="text-ink-foreground/55 mt-6 text-sm">
          {greeting}{firstName ? `, ${firstName}` : ""}
        </p>
        <h2 className="text-ink-foreground mt-1 max-w-[13rem] text-2xl leading-tight font-semibold">
          {onRoad > 0 ? "Your cars are earning" : "Put a car on the road"}
        </h2>

        <p className="text-ink-foreground/60 mt-2 flex items-center gap-2 text-sm">
          <Car03Icon size={16} className="text-sky" />
          {onRoad > 0 ? `${onRoad} on hire right now` : "Nothing on hire yet"}
        </p>

        <Link
          href="/products"
          className="bg-primary text-primary-foreground hover:bg-brand-deep mt-5 inline-flex h-11 items-center gap-2 rounded-full px-5 text-sm font-semibold transition-colors"
        >
          {onRoad > 0 ? "Add another car" : "Browse the fleet"}
          <ArrowRight01Icon size={16} />
        </Link>
      </div>

      <div className="brand-hairline absolute inset-x-0 bottom-0" />
    </section>
  )
}
