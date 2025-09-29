import { GridTileImage } from '@/components/grid/tile'
import Link from 'next/link'
import { Doc } from '@/convex/_generated/dataModel'
import { api } from '@/convex/_generated/api'
import { fetchQuery } from 'convex/nextjs'

function ThreeItemGridItem({
  item,
  size,
  priority,
}: {
  item: Doc<'horses'>
  size: 'full' | 'half'
  priority?: boolean
}) {
  return (
    <div
      className={
        size === 'full'
          ? 'md:col-span-4 md:row-span-2'
          : 'md:col-span-2 md:row-span-1'
      }
    >
      <Link
        className="relative block aspect-square h-full w-full"
        href={`/product/${item.name}`}
        prefetch={true}
      >
        <GridTileImage
          src={item.imageUrl || ''}
          fill
          sizes={
            size === 'full'
              ? '(min-width: 768px) 66vw, 100vw'
              : '(min-width: 768px) 33vw, 100vw'
          }
          priority={priority}
          alt={item.name}
          label={{
            position: size === 'full' ? 'center' : 'bottom',
            title: item.name as string,
            amount: item.price.toString(),
            currencyCode: 'USD',
          }}
        />
      </Link>
    </div>
  )
}

export async function ThreeItemGrid() {
  // Collections that start with `hidden-*` are hidden from the search page.
  const homepageItems = await fetchQuery(api.horses.list, {
    paginationOpts: {
      numItems: 3,
      cursor: null,
    },
  })

  if (
    !homepageItems.page[0] ||
    !homepageItems.page[1] ||
    !homepageItems.page[2]
  )
    return null

  const [firstProduct, secondProduct, thirdProduct] = homepageItems.page

  return (
    <section className="mx-auto grid max-w-(--breakpoint-2xl) gap-4 px-4 pb-4 md:grid-cols-6 md:grid-rows-2 lg:max-h-[calc(100vh-200px)]">
      <ThreeItemGridItem size="full" item={firstProduct} priority={true} />
      <ThreeItemGridItem size="half" item={secondProduct} priority={true} />
      <ThreeItemGridItem size="half" item={thirdProduct} />
    </section>
  )
}
