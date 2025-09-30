import { Suspense } from 'react'
import FavoritesClientContent from '@/components/favorites/favorites-content'
import { Skeleton } from '@/components/ui/skeleton'

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

export default function FavoritesPage() {
  return (
    <Suspense fallback={<FavoritesSkeleton />}>
      <FavoritesClientContent />
    </Suspense>
  )
}
