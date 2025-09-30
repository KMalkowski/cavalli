'use client'

import { Suspense } from 'react'
import { useQuery, Authenticated, Unauthenticated } from 'convex/react'
import { api } from '@/convex/_generated/api'
// import ProductListItems from '@/components/layout/product-list-items'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

function FavoritesContent() {
  const favorites = useQuery(api.favorites.getUserFavorites, {})

  if (favorites === undefined) {
    return <FavoritesSkeleton />
  }

  if (favorites.length === 0) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="text-center">
          <h1 className="mb-4 text-3xl font-bold">Ulubione konie</h1>
          <p className="text-muted-foreground">
            Nie masz jeszcze żadnych ulubionych koni. Dodaj je, klikając
            serduszko przy koniu.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">
        Ulubione konie ({favorites.length})
      </h1>
      {/* <ProductListItems preloadedHorses={favorites.filter((horse) => horse !== null)} /> */}
    </div>
  )
}

function FavoritesSkeleton() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <Skeleton className="mb-8 h-8 w-48" />
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="rounded-lg border p-6">
            <div className="flex gap-6">
              <Skeleton className="h-64 w-64 shrink-0" />
              <div className="flex-1 space-y-4">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
                <div className="flex gap-2">
                  <Skeleton className="h-6 w-16" />
                  <Skeleton className="h-6 w-20" />
                  <Skeleton className="h-6 w-24" />
                </div>
                <Skeleton className="h-8 w-24" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function FavoritesPage() {
  return (
    <Suspense fallback={<FavoritesSkeleton />}>
      <Authenticated>
        <FavoritesContent />
      </Authenticated>
      <Unauthenticated>
        <div className="mx-auto max-w-6xl px-4 py-8">
          <div className="text-center">
            <h1 className="mb-4 text-3xl font-bold">Ulubione konie</h1>
            <p className="text-muted-foreground mb-6">
              Musisz być zalogowany, aby przeglądać swoje ulubione konie.
            </p>
            <Link href="/">
              <Button>Przejdź do strony głównej</Button>
            </Link>
          </div>
        </div>
      </Unauthenticated>
    </Suspense>
  )
}
