import { Doc } from '@/convex/_generated/dataModel'
import Link from 'next/link'
import { Card } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Heart } from 'lucide-react'

const getGenderBadgeClasses = (gender: string) => {
  switch (gender.toLowerCase()) {
    case 'ogier':
      return 'bg-blue-500 text-white border-blue-500'
    case 'klacz':
      return 'bg-pink-500 text-white border-pink-500'
    case 'wałach':
      return 'bg-gray-200 text-gray-800 border-gray-300'
    default:
      return 'bg-gray-100 text-gray-600 border-gray-200'
  }
}

export default function ProductListItems({
  horses,
}: {
  horses: Doc<'horses'>[]
}) {
  return (
    <>
      {horses.map((horse) => (
        <Card
          key={horse._id}
          className="mb-4 transition-all duration-300 ease-out hover:ring-2 hover:ring-blue-500/20 hover:ring-offset-2 hover:brightness-105"
        >
          <div className="bg-background relative flex-1 gap-8 px-6 md:flex">
            <div className="bg-muted group relative h-64 w-full shrink-0 overflow-hidden rounded-lg md:h-64 md:w-64">
              <img
                src={horse.imageUrl || ''}
                alt={horse.name}
                className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-105 md:h-64 md:w-64"
                style={{ width: '100%', height: '100%' }}
              />
            </div>
            <div className="mt-4 flex min-w-0 flex-1 flex-col justify-between md:mt-0">
              <div>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-medium">{horse.name}</h3>
                  </div>
                </div>
                <div className="text-muted-foreground my-2 text-sm">
                  <p className="mb-2 line-clamp-3">{horse.description}</p>
                  <div className="flex flex-wrap items-center gap-2 text-xs">
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
                  </div>
                </div>
                <div className="mb-2 text-lg font-medium whitespace-nowrap md:mb-0">
                  {horse.price} {horse.currency}
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" size="icon" className="shrink-0">
                  <Heart className="h-4 w-4" />
                </Button>
                <Button asChild className="w-full md:w-auto">
                  <Link href={`/horse/${horse._id}`}>Szczegóły</Link>
                </Button>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </>
  )
}
