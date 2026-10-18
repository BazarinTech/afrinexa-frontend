"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { RoadVignette, type VignetteVariant } from "@/components/shared/road-scene"

type Stage = {
  variant: VignetteVariant
  /** Photograph, if one has been dropped in. Falls back to the drawn scene. */
  photo: string
  step: string
  title: string
  href: string
}

// Four stages of one hire, in the order they happen. Together they are the
// whole product, told in pictures instead of a paragraph.
const stages: Stage[] = [
  { variant: "forecourt", photo: "/stages/forecourt.jpg", step: "01", title: "Pick a car", href: "/products" },
  { variant: "road", photo: "/stages/road.jpg", step: "02", title: "It goes on hire", href: "/work" },
  { variant: "meter", photo: "/stages/meter.jpg", step: "03", title: "It bills every day", href: "/work" },
  { variant: "payout", photo: "/stages/payout.jpg", step: "04", title: "Cash out", href: "/cashout" },
]

function StageTile({ stage }: { stage: Stage }) {
  const [hasPhoto, setHasPhoto] = useState(true)

  return (
    <Link
      href={stage.href}
      className="bg-hero group relative aspect-[5/4] overflow-hidden rounded-2xl"
    >
      {hasPhoto ? (
        <Image
          src={stage.photo}
          alt=""
          fill
          sizes="(max-width: 640px) 45vw, 220px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          onError={() => setHasPhoto(false)}
        />
      ) : (
        <RoadVignette
          variant={stage.variant}
          className="absolute inset-0 transition-transform duration-500 group-hover:scale-105"
        />
      )}

      <div className="from-ink via-ink/30 absolute inset-0 bg-gradient-to-t to-transparent" />

      <span className="text-eyebrow text-sky absolute top-3 left-3.5 tabular-nums">{stage.step}</span>
      <p className="text-ink-foreground absolute inset-x-3.5 bottom-3 text-sm leading-snug font-semibold">
        {stage.title}
      </p>
    </Link>
  )
}

/**
 * How a hire works, as four pictures.
 *
 * Laid out two by two rather than on a scrolling rail: there are exactly four
 * stages, and a grid shows all of them at once, which is the point.
 */
export function StageGrid() {
  return (
    <section aria-label="How a hire works">
      <h2 className="text-foreground mb-3 text-base font-semibold">How a hire works</h2>
      <div className="grid grid-cols-2 gap-3">
        {stages.map((stage) => (
          <StageTile key={stage.step} stage={stage} />
        ))}
      </div>
    </section>
  )
}
