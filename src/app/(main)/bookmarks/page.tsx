
import React from 'react'
import Bookmarks from './bookmarks'
import TrendsSidebar from '@/components/TrendsSidebar'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "bookmarks"
}

export default function page() {
  return (
    <main className="flex w-full min-w-0 gap-5">
    <div className="w-full min-w-0 space-y-5">
      <div className="rounded-2xl bg-card p-5 shadow-sm">
        <h1 className="text-center text-2xl font-bold">Kaydedilen</h1>
      </div>
      <Bookmarks />
    </div>
    <TrendsSidebar />
  </main>
  )
}
