"use client"

import Image from "next/image"
import { ArrowRight01Icon, Loading01Icon } from "hugeicons-react"
import { useCurrency } from "@/lib/hooks/use-currency"
import { useState } from "react";
import { toast } from "sonner";
import { makeInvestment } from "@/lib/backend/actions";
import { useMainStore } from "@/lib/stores/use-main-store";
import { productImageUrl } from "@/lib/media/image-url";

/**
 * A car on the hire sheet.
 *
 * Reads like the top of a rental agreement: the vehicle and its class on one
 * line with the daily rate beside it, the terms ruled off in a row beneath,
 * and the signature line last. Squared corners and a rule between every
 * section, because this is a contract, not a poster.
 */
export function ProductCard({ID, name, image, image_url, max, duration, returns, order_limit, tier }: Product) {
  const token = useMainStore((state) => state.token);
  const fetchMainDetails = useMainStore((state) => state.fetchMainDetails);
  const [isLoading, setLoading] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // The backend resolves this now -- it is the only side that knows whether
  // images sit on disk, in a public bucket, or behind a presigned URL.
  const src = productImageUrl(image_url, image);

  const handleBuyProduct = async () => {
    setLoading(true);
    try {
      const response = await makeInvestment({userID: token, prodID: ID, amount: String(max)});
      if(response.status === "Success") {
        toast.success(response.message || "Car added to your fleet.");
        fetchMainDetails(token);
      } else {
        toast.error(response.message || "Could not reserve this car. Please try again.");
      }
    } catch (error) {
      console.error("Error buying product:", error);
      toast.error("Could not reserve this car. Please try again.");
    }finally {
      setLoading(false);
    }
  };

  return (
    <article className="border-border bg-card relative overflow-hidden rounded-2xl border">
      <div className="bg-primary absolute inset-x-0 top-0 h-1" />

      <div className="flex gap-4 p-4 pt-5">
        <div className="bg-hero relative h-24 w-28 shrink-0 overflow-hidden rounded-xl">
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loading01Icon className="text-sky/60 size-5 animate-spin" />
            </div>
          )}
          <Image
            src={src || "/placeholder.svg"}
            alt={name}
            fill
            sizes="112px"
            className={`object-cover transition-opacity duration-300 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
            onLoad={() => setImageLoaded(true)}
          />
        </div>

        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-foreground truncate text-base font-semibold">{name}</h3>
            {tier && (
              <span className="text-eyebrow bg-accent text-accent-foreground shrink-0 rounded-md px-2 py-1">
                Class {tier}
              </span>
            )}
          </div>

          <p className="text-eyebrow text-muted-foreground mt-auto">Daily hire</p>
          <p className="text-primary truncate text-2xl font-semibold tabular-nums">{useCurrency(returns)}</p>
        </div>
      </div>

      <dl className="border-border divide-border bg-muted/40 grid grid-cols-3 divide-x border-t text-center">
        <div className="px-2 py-3">
          <dt className="text-muted-foreground text-[0.6875rem]">Deposit</dt>
          <dd className="text-foreground mt-0.5 truncate text-sm font-semibold tabular-nums">{useCurrency(max)}</dd>
        </div>
        <div className="px-2 py-3">
          <dt className="text-muted-foreground text-[0.6875rem]">Term</dt>
          <dd className="text-foreground mt-0.5 text-sm font-semibold tabular-nums">{duration} days</dd>
        </div>
        <div className="px-2 py-3">
          <dt className="text-muted-foreground text-[0.6875rem]">Total hire</dt>
          <dd className="text-foreground mt-0.5 truncate text-sm font-semibold tabular-nums">
            {useCurrency(Number(returns) * Number(duration))}
          </dd>
        </div>
      </dl>

      <div className="border-border border-t p-4">
        <button
          className="bg-primary text-primary-foreground hover:bg-brand-deep flex h-11 w-full items-center justify-center gap-2 rounded-xl text-sm font-semibold transition-colors disabled:opacity-60"
          disabled={isLoading}
          onClick={handleBuyProduct}
        >
          {isLoading ? (
            <>Reserving... <Loading01Icon className="size-4 animate-spin" /></>
          ) : (
            <>Put this car on the road <ArrowRight01Icon className="size-4" /></>
          )}
        </button>
        <p className="text-muted-foreground mt-2.5 text-center text-xs">Up to {order_limit} per member</p>
      </div>
    </article>
  )
}
