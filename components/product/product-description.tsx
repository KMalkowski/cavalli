import { Doc } from '@/convex/_generated/dataModel'
import Prose from '../prose'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { ExternalLink, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { getGenderBadgeClasses } from '@/lib/horse-utils'

export function ProductDescription({ horse }: { horse: Doc<'horses'> }) {
  return (
    <>
      <div className="mb-6 flex flex-col border-b pb-6 dark:border-neutral-700">
        <h1 className="mb-4 text-3xl font-medium md:text-5xl">{horse.name}</h1>
        <div className="text-xl font-medium whitespace-nowrap md:mb-0 md:text-3xl">
          <h2>
            {horse.price} {horse.currency}
          </h2>
        </div>
      </div>
      <div className="mb-6">
        <div className="flex flex-wrap items-center gap-2">
          {horse.gender && (
            <Badge
              className={`text-xs ${getGenderBadgeClasses(horse.gender)} mr-2`}
            >
              {horse.gender}
            </Badge>
          )}
          {horse.age && horse.age > 0 ? (
            <Badge variant="outline">{`${horse.age} lat`}</Badge>
          ) : null}
          {horse.breed && horse.breed.trim() !== '' ? (
            <Badge variant="outline">{horse.breed}</Badge>
          ) : null}
          {horse.color && horse.color.trim() !== '' ? (
            <Badge variant="outline">{horse.color}</Badge>
          ) : null}
          {horse.height && horse.height > 0 ? (
            <Badge variant="outline">{`${horse.height} cm`}</Badge>
          ) : null}
          {horse.disciplines && horse.disciplines.length > 0 ? (
            <Badge variant="outline">{horse.disciplines.join(', ')}</Badge>
          ) : null}
          {horse.purpose && horse.purpose.trim() !== '' ? (
            <Badge variant="outline">{horse.purpose}</Badge>
          ) : null}
        </div>
      </div>
      {horse.description ? (
        <Prose
          className="mb-6 text-base leading-tight dark:text-white/[60%]"
          html={horse.description}
        />
      ) : null}
      <Button asChild className="mb-3 w-full">
        <Link href="#details-section" className="flex items-center gap-2">
          <ChevronDown className="h-4 w-4" />
          Szczegóły ogłoszenia
        </Link>
      </Button>
      {horse.sourceUrl && (
        <Button asChild variant="outline" className="w-full">
          <Link
            href={horse.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2"
          >
            <ExternalLink className="h-4 w-4" />
            Zobacz oryginalne ogłoszenie
          </Link>
        </Button>
      )}
    </>
  )
}
