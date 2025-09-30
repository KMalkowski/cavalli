'use client'

import { useQuery, Authenticated, Unauthenticated } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { HorseCard } from '@/components/layout/horse-card'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { FavoritesButton } from '@/components/layout/navbar/favorites-button'
import AuthControl from '@/components/layout/navbar/auth-control'
import { Plus } from 'lucide-react'

function FavoritesContent() {
  const favorites = useQuery(api.favorites.getUserFavorites, {})

  if (favorites === undefined) {
    return <FavoritesSkeleton />
  }

  return (
    <>
      <header className="bg-background sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <Link href="/" className="hover:text-primary text-sm font-medium">
          ← Powrót do listy
        </Link>

        <div className="ml-auto flex items-center gap-2">
          <FavoritesButton />
          <Link href="/new-listing-form">
            <Button>
              <Plus />
            </Button>
          </Link>
          <AuthControl />
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-8">
        <h1 className="mb-8 text-3xl font-bold">
          Ulubione konie ({favorites.length})
        </h1>

        {favorites.length === 0 ? (
          <div className="text-center">
            <p className="text-muted-foreground">
              Nie masz jeszcze żadnych ulubionych koni. Dodaj je, klikając
              serduszko przy koniu.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {favorites
              .filter((horse) => horse !== null)
              .map((horse) => (
                <HorseCard key={horse._id} horse={horse} />
              ))}
          </div>
        )}
      </div>
    </>
  )
}

function FavoritesSkeleton() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <Skeleton className="mb-8 h-8 w-48" />
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="rounded-lg border p-4 md:p-6">
            <div className="flex flex-col gap-4 md:flex-row md:gap-6">
              <Skeleton className="h-48 w-full md:h-64 md:w-64 md:shrink-0" />
              <div className="flex-1 space-y-4">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
                <div className="flex flex-wrap gap-2">
                  <Skeleton className="h-6 w-16" />
                  <Skeleton className="h-6 w-20" />
                  <Skeleton className="h-6 w-24" />
                </div>
                <div className="flex justify-end gap-2">
                  <Skeleton className="h-8 w-8 shrink-0" />
                  <Skeleton className="h-8 w-20 md:w-24" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function UnauthenticatedContent() {
  return (
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
  )
}

export default function FavoritesClientContent() {
  return (
    <>
      <Authenticated>
        <FavoritesContent />
      </Authenticated>
      <Unauthenticated>
        <UnauthenticatedContent />
      </Unauthenticated>
    </>
  )
}
