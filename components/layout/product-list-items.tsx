'use client'

import { Preloaded, usePreloadedQuery, useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { HorseCard } from './horse-card'
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

  const preloadedHorsesList = usePreloadedQuery(preloadedHorses)

  const horses = useQuery(api.horses.list, {
    paginationOpts: {
      numItems: 10,
      cursor: null,
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
          <HorseCard horse={horse} />
        ))}
      </>
    )
  }

  return (
    <>
      {horses.page.map((horse) => (
        <HorseCard horse={horse} />
      ))}
    </>
  )
}
