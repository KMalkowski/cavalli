import { api } from '@/convex/_generated/api'
import { preloadQuery } from 'convex/nextjs'
import ProductListItems from '@/components/layout/product-list-items'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { SidebarInset } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/layout/app-sidebar/app-sidebar'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import AuthControl from '@/components/layout/navbar/auth-control'
import Footer from '@/components/layout/footer'
import ResetFiltersButton from '@/components/layout/app-sidebar/reset-filters-button'
import { FavoritesButton } from '@/components/layout/navbar/favorites-button'

export const metadata = {
  title: 'Look for a horse',
  description: 'Search for horses on the polish market.',
}

export default async function SearchPage() {
  const horses = await preloadQuery(api.horses.list, {
    paginationOpts: {
      numItems: 10,
      cursor: null,
    },
    breed: undefined,
    minPrice: undefined,
    maxPrice: undefined,
    minHeight: undefined,
    maxHeight: undefined,
  })

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

          <ResetFiltersButton />
          <div className="ml-auto">
            <FavoritesButton />
          </div>
          <Link href="/new-listing-form">
            <Button>
              <Plus />
            </Button>
          </Link>
          <AuthControl />
        </header>

        <div className="mx-auto flex max-w-(--breakpoint-xl) flex-col gap-8 px-4 py-4 pb-4 text-black md:flex-row dark:text-white">
          <div className="order-last min-h-screen w-full md:order-none">
            <ProductListItems preloadedHorses={horses} />
          </div>
        </div>
        <Footer />
      </SidebarInset>
    </SidebarProvider>
  )
}
