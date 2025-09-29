import { GridItem } from '@/components/grid/grid'
import { GridTileImage } from '@/components/grid/tile'
import { Doc } from '@/convex/_generated/dataModel'
import Link from 'next/link'

export default function ProductGridItems({
  horses,
}: {
  horses: Doc<'horses'>[]
}) {
  return (
    <>
      {horses.map((horse) => (
        <GridItem key={horse.name} className="animate-fadeIn">
          <Link
            className="relative inline-block h-full w-full"
            href={`/horse/${horse._id}`}
            prefetch={true}
          >
            <GridTileImage
              alt={horse.name}
              label={{
                title: horse.name,
                amount: horse.price.toString(),
                currencyCode: 'USD',
              }}
              src={horse.imageUrl || ''}
              fill
              sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
            />
          </Link>
        </GridItem>
      ))}
    </>
  )
}
