import { Grid } from '@/components/grid/grid'
import ProductGridItems from '@/components/layout/product-grid-items'
import { api } from '@/convex/_generated/api'
import { defaultSort, sorting } from '@/lib/constants'
import { fetchQuery } from 'convex/nextjs'
import Horses from './horses'
import ProductListItems from '@/components/layout/product-list-items'

export const metadata = {
  title: 'Search',
  description: 'Search for products in the store.',
}

export default async function SearchPage(props: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const searchParams = await props.searchParams
  const { sort, q: searchValue } = searchParams as { [key: string]: string }
  const { sortKey, reverse } =
    sorting.find((item) => item.slug === sort) || defaultSort

  const horses = await fetchQuery(api.horses.list, {
    paginationOpts: {
      numItems: 10,
      cursor: null,
    },
    breed: searchValue,
    minPrice: searchValue ? parseInt(searchValue) : undefined,
    maxPrice: searchValue ? parseInt(searchValue) : undefined,
    minHeight: searchValue ? parseInt(searchValue) : undefined,
    maxHeight: searchValue ? parseInt(searchValue) : undefined,
  })

  const resultsText = horses.page.length > 1 ? 'results' : 'result'

  return (
    <>
      {searchValue ? (
        <p className="mb-4">
          {horses.page.length === 0
            ? 'There are no products that match '
            : `Showing ${horses.page.length} ${resultsText} for `}
          <span className="font-bold">&quot;{searchValue}&quot;</span>
        </p>
      ) : null}

      {/* {horses.page.length > 0 ? (
        <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <ProductGridItems horses={horses.page} />
        </Grid>
      ) : null} */}

      {horses.page.length > 0 ? (
        <ProductListItems horses={horses.page} />
      ) : null}

      {/* Temporary tester for Firecrawl → remove when done */}
      {/* <FirecrawlTester /> */}
      {/* <Horses /> */}
    </>
  )
}
