import { Grid } from '@/components/grid/grid'
import ProductGridItems from '@/components/layout/product-grid-items'
import { api } from '@/convex/_generated/api'
import { defaultSort, sorting } from '@/lib/constants'
import { fetchQuery } from 'convex/nextjs'
import ProductListItems from '@/components/layout/product-list-items'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { SidebarInset } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/layout/app-sidebar/app-sidebar'
import { Separator } from '@/components/ui/separator'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import AuthControl from '@/components/layout/navbar/auth-control'
import Footer from '@/components/layout/footer'

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
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="bg-background sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>October 2024</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <Link href="/new-listing-form" className="ml-auto">
            <Button>
              <Plus />
            </Button>
          </Link>
          <AuthControl />
        </header>

        <div className="mx-auto flex max-w-(--breakpoint-xl) flex-col gap-8 px-4 py-4 pb-4 text-black md:flex-row dark:text-white">
          <div className="order-last min-h-screen w-full md:order-none">
            {searchValue ? (
              <p className="mb-4">
                {horses.page.length === 0
                  ? 'There are no products that match '
                  : `Showing ${horses.page.length} ${resultsText} for `}
                <span className="font-bold">&quot;{searchValue}&quot;</span>
              </p>
            ) : null}

            {horses.page.length > 0 ? (
              <ProductListItems horses={horses.page} />
            ) : null}
          </div>
        </div>
        <Footer />
      </SidebarInset>
    </SidebarProvider>
  )
}
