'use client'
import { FleetHero } from '@/components/home/fleet-hero'
import { NoticeRail } from '@/components/home/notice-rail'
import { QuickActions } from '@/components/home/quick-actions'
import { StageGrid } from '@/components/home/stage-grid'
import { WelcomeModal } from '@/components/home/welcome-modal'
import { BottomNav } from '@/components/shared/bottombar'
import { Reveal } from '@/components/shared/reveal'
import Topbar from '@/components/shared/topbar'
import { useMainStore } from '@/lib/stores/use-main-store'
import React, { useEffect } from 'react'


function Page() {
  const loginState = useMainStore((state) => state.loginState)
  // `user?.` as well as `mainDetails?.`: when the API rejects a session it
  // answers with an error body, which the store keeps as mainDetails as-is.
  const username = useMainStore((state) => state.mainDetails?.user?.username)
  useEffect(() => {
    loginState()
  }, [loginState])

  return (
    <div>
      <Topbar title="Afinexa" brand />

      {/* The board, top to bottom: where you stand and the one thing to do
          next, the controls within thumb reach, word from the desk, then how
          a hire works for anyone still deciding. */}
      <main className="mx-auto flex w-full max-w-md flex-col gap-6 px-4 pt-4">
        <Reveal>
          <FleetHero name={username} />
        </Reveal>

        <Reveal delay={0.08}>
          <QuickActions />
        </Reveal>

        <Reveal delay={0.14}>
          <NoticeRail />
        </Reveal>

        <Reveal delay={0.2}>
          <StageGrid />
        </Reveal>
      </main>

      <WelcomeModal />
      <BottomNav />
    </div>
  )
}

export default Page
