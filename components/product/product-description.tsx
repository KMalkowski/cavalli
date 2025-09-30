import { Doc } from '@/convex/_generated/dataModel'
import Prose from '../prose'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { HeartButton } from '../ui/heart-button'
import { ExternalLink, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { getGenderBadgeClasses } from '@/lib/horse-utils'

export function ProductDescription({ horse }: { horse: Doc<'horses'> }) {
  return (
    <>
      <div className="mb-6 flex flex-col border-b pb-6 dark:border-neutral-700">
        <h1 className="mb-4 text-2xl font-medium md:text-4xl">{horse.name}</h1>
        <div className="text-lg font-medium whitespace-nowrap md:mb-0 md:text-2xl">
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
          className="mb-6 text-base leading-tight hyphens-none dark:text-white/[60%]"
          html={horse.description}
        />
      ) : null}
      <div className="mb-3 flex gap-2">
        <HeartButton horseId={horse._id} variant="outline" className="flex-1" />
        <Button asChild className="flex-1">
          <Link
            href="#details-section"
            className="flex items-center justify-center gap-2"
          >
            <ChevronDown className="h-4 w-4" />
            Szczegóły ogłoszenia
          </Link>
        </Button>
      </div>
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
