'use client'
import { ProductCard } from '@/components/products/product-card'
import { BottomNav } from '@/components/shared/bottombar'
import NoList from '@/components/shared/no-list'
import Topbar from '@/components/shared/topbar'
import { Skeleton } from '@/components/ui/skeleton'
import { useMainStore } from '@/lib/stores/use-main-store'
import React from 'react'

function ProductCardSkeleton() {
  return (
    <div className="border-border bg-card overflow-hidden rounded-2xl border">
      <div className="flex gap-4 p-4 pt-5">
        <Skeleton className="h-24 w-28 shrink-0 rounded-xl" />
        <div className="flex-1 space-y-3 py-1">
          <div className="flex justify-between"><Skeleton className="h-5 w-28" /><Skeleton className="h-5 w-14 rounded-md" /></div>
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-7 w-24" />
        </div>
      </div>
      <div className="border-border grid grid-cols-3 border-t">
        {[0, 1, 2].map((i) => (
          <div key={i} className="space-y-2 px-2 py-3">
            <Skeleton className="mx-auto h-3 w-12" />
            <Skeleton className="mx-auto h-4 w-16" />
          </div>
        ))}
      </div>
      <div className="border-border border-t p-4"><Skeleton className="h-11 w-full rounded-xl" /></div>
    </div>
  )
}

function Page() {
  const mainDetails = useMainStore((state) => state.mainDetails)
  const isMainFetching = useMainStore((state) => state.isMainFetching)
  const available = mainDetails?.products?.length ?? 0

  return (
    <div>
      <Topbar title="The Fleet" caption={available ? `${available} cars available for hire` : "Cars available for hire"} />

      <main className="mx-auto max-w-md px-4 pt-4">
        <div className="space-y-4">
          {isMainFetching && !mainDetails && (
            <>
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
            </>
          )}
          {!isMainFetching && mainDetails?.products.map((product) => (
            <ProductCard
              key={product.name}
              name={product.name}
              image={product.image}
              image_url={product.image_url}
              max={product.max}
              duration={product.duration}
              returns={product.returns}
              order_limit={product.order_limit}
              ID={product.ID}
              tier={product.tier}
              description={product.description}
              status={product.status}
            />
          ))}
          {mainDetails?.products.length === 0 && (
            <NoList title='No cars available' description='Please reach our customer support for help'/>
          )}
        </div>
      </main>

      <BottomNav />
    </div>
  )
}

export default Page
