'use client'

import { useEffect } from 'react'
import { Preloaded, usePreloadedQuery, useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { HorseCard } from './horse-card'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import {
  parseAsArrayOf,
  parseAsString,
  parseAsInteger,
  useQueryState,
} from 'nuqs'

export default function ProductListItems({
  preloadedHorses,
}: {
  preloadedHorses: Preloaded<typeof api.horses.list>
}) {
  const [breeds] = useQueryState(
    'breeds',
    parseAsArrayOf(parseAsString).withDefault([])
  )
  const [genders] = useQueryState(
    'genders',
    parseAsArrayOf(parseAsString).withDefault([])
  )
  const [purposes] = useQueryState(
    'purposes',
    parseAsArrayOf(parseAsString).withDefault([])
  )
  const [healthStatuses] = useQueryState(
    'healthStatuses',
    parseAsArrayOf(parseAsString).withDefault([])
  )
  const [trainingLevels] = useQueryState(
    'trainingLevels',
    parseAsArrayOf(parseAsString).withDefault([])
  )
  const [priceMin] = useQueryState('priceMin', parseAsInteger.withDefault(0))
  const [priceMax] = useQueryState('priceMax', parseAsInteger.withDefault(0))
  const [heightMin] = useQueryState('heightMin', parseAsInteger.withDefault(0))
  const [heightMax] = useQueryState('heightMax', parseAsInteger.withDefault(0))
  const [ageMin] = useQueryState('ageMin', parseAsInteger.withDefault(0))
  const [ageMax] = useQueryState('ageMax', parseAsInteger.withDefault(0))
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1))

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [page])

  const preloadedHorsesList = usePreloadedQuery(preloadedHorses)

  const ITEMS_PER_PAGE = 10
  const cursor = page > 1 ? ((page - 1) * ITEMS_PER_PAGE).toString() : null

  const horses = useQuery(api.horses.list, {
    paginationOpts: {
      numItems: ITEMS_PER_PAGE,
      cursor: cursor,
    },
    breeds: breeds.length > 0 ? breeds : undefined,
    genders: genders.length > 0 ? genders : undefined,
    purposes: purposes.length > 0 ? purposes : undefined,
    healthStatuses: healthStatuses.length > 0 ? healthStatuses : undefined,
    trainingLevels: trainingLevels.length > 0 ? trainingLevels : undefined,
    minPrice: priceMin > 0 ? priceMin : undefined,
    maxPrice: priceMax > 0 ? priceMax : undefined,
    minHeight: heightMin > 0 ? heightMin : undefined,
    maxHeight: heightMax > 0 ? heightMax : undefined,
    minAge: ageMin > 0 ? ageMin : undefined,
    maxAge: ageMax > 0 ? ageMax : undefined,
  })

  if (horses === undefined) {
    return (
      <>
        {preloadedHorsesList.page.map((horse) => (
          <HorseCard horse={horse} key={horse._id} />
        ))}
      </>
    )
  }

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1)
    }
  }

  const handleNextPage = () => {
    if (!horses.isDone) {
      setPage(page + 1)
    }
  }

  return (
    <>
      {horses.page.map((horse) => (
        <HorseCard horse={horse} key={horse._id} />
      ))}

      {/* Pagination Controls */}
      {(page > 1 || !horses.isDone) && (
        <div className="mt-8 flex items-center justify-center gap-4">
          <Button
            variant="outline"
            onClick={handlePreviousPage}
            disabled={page <= 1}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>

          <span className="text-muted-foreground text-sm">Page {page}</span>

          <Button
            variant="outline"
            onClick={handleNextPage}
            disabled={horses.isDone}
            className="flex items-center gap-2"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </>
  )
}
