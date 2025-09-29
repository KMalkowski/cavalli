import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Gallery } from '@/components/product/gallery'
import { ProductProvider } from '@/components/product/product-context'
import { ProductDescription } from '@/components/product/product-description'
import { Suspense } from 'react'
import { api } from '@/convex/_generated/api'
import { fetchQuery } from 'convex/nextjs'
import { Id } from '@/convex/_generated/dataModel'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'

const formatValue = (value: any): string => {
  if (value === null || value === undefined || value === '') {
    return 'Nie podano'
  }

  if (Array.isArray(value)) {
    return value.length > 0 ? value.join(', ') : 'Nie podano'
  }

  if (typeof value === 'object') {
    if (value.lat && value.lng) {
      return `${value.lat.toFixed(4)}, ${value.lng.toFixed(4)}`
    }
    return JSON.stringify(value)
  }

  if (typeof value === 'boolean') {
    return value ? 'Tak' : 'Nie'
  }

  return String(value)
}

export async function generateMetadata(props: {
  params: Promise<{ name: string }>
}): Promise<Metadata> {
  const params = await props.params
  const horse = await fetchQuery(api.horses.getById, {
    id: params.name as Id<'horses'>,
  })

  if (!horse) return notFound()

  return {
    title: horse.name,
    description: horse.description,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
    openGraph: horse.imageUrl
      ? {
          images: [
            {
              url: horse.imageUrl,
              width: 100,
              height: 100,
              alt: horse.name,
            },
          ],
        }
      : null,
  }
}

export default async function HorsePage(props: {
  params: Promise<{ name: string }>
}) {
  const params = await props.params
  const horse = await fetchQuery(api.horses.getById, {
    id: params.name as Id<'horses'>,
  })

  if (!horse) return notFound()

  // Fetch all images for this horse
  const horseImages = await fetchQuery(api.horses.getImages, {
    horseId: params.name as Id<'horses'>,
  })

  // Prepare images array for Gallery component
  const images =
    horseImages.length > 0
      ? horseImages.map((img) => ({
          src: img.imageUrl,
          altText: img.altText || horse.name,
        }))
      : horse.imageUrl
        ? [{ src: horse.imageUrl, altText: horse.name }]
        : []

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: horse.name,
    description: horse.description,
    image: horse.imageUrl,
    offers: {
      '@type': 'AggregateOffer',
      availability: horse.isAvailable
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      priceCurrency: 'USD',
      highPrice: horse.price,
      lowPrice: horse.price,
    },
  }

  return (
    <ProductProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd),
        }}
      />
      <div className="mx-auto max-w-(--breakpoint-xl)">
        <div className="flex flex-col rounded-lg border border-neutral-200 bg-white p-4 md:p-8 lg:flex-row lg:gap-8 dark:border-neutral-800 dark:bg-black">
          <div className="h-full w-full basis-full lg:basis-4/6">
            <Suspense
              fallback={
                <div className="relative aspect-square h-full max-h-[550px] w-full overflow-hidden" />
              }
            >
              <Gallery images={images} />
            </Suspense>
          </div>

          <div className="mt-[10%] basis-full lg:basis-2/6">
            <Suspense fallback={null}>
              <ProductDescription horse={horse} />
            </Suspense>
          </div>
        </div>

        {/* Detailed Information Table */}
        <div id="details-section" className="mx-auto pt-4 md:mt-8">
          <div className="rounded-lg border border-neutral-200 bg-white p-4 md:p-8 dark:border-neutral-800 dark:bg-black">
            <h2 className="mb-6 text-2xl font-bold">Szczegółowe informacje</h2>
            <Table className="table-fixed">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-1/3 md:w-2/6">Kategoria</TableHead>
                  <TableHead className="w-2/3 md:w-4/6">Wartość</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {/* Podstawowe informacje */}
                <TableRow>
                  <TableCell className="font-medium">Rasa</TableCell>
                  <TableCell>{formatValue(horse.breed)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Wiek</TableCell>
                  <TableCell>
                    {horse.age ? `${horse.age} lat` : 'Nie podano'}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Płeć</TableCell>
                  <TableCell>{formatValue(horse.gender)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Wzrost</TableCell>
                  <TableCell>
                    {horse.height ? `${horse.height} cm` : 'Nie podano'}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Maść</TableCell>
                  <TableCell>{formatValue(horse.color)}</TableCell>
                </TableRow>

                {/* Finansowe */}
                <TableRow>
                  <TableCell className="font-medium">Cena</TableCell>
                  <TableCell>
                    {horse.price} {horse.currency}
                  </TableCell>
                </TableRow>

                {/* Użytkowanie i wyszkolenie */}
                <TableRow>
                  <TableCell className="font-medium">Przeznaczenie</TableCell>
                  <TableCell>{formatValue(horse.purpose)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Dyscypliny</TableCell>
                  <TableCell>{formatValue(horse.disciplines)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">
                    Poziom wyszkolenia
                  </TableCell>
                  <TableCell>{formatValue(horse.trainingLevel)}</TableCell>
                </TableRow>

                {/* Zdrowie i status */}
                <TableRow>
                  <TableCell className="font-medium">Stan zdrowia</TableCell>
                  <TableCell>
                    {horse.healthStatus === 'zdrowy' ? (
                      <Badge className="border-green-500 bg-green-500 text-white">
                        Zdrowy
                      </Badge>
                    ) : horse.healthStatus === 'chory' ? (
                      <Badge className="border-red-500 bg-red-500 text-white">
                        Chory
                      </Badge>
                    ) : horse.healthStatus === 'kontuzjowany' ? (
                      <Badge className="border-yellow-500 bg-yellow-500 text-white">
                        Kontuzjowany
                      </Badge>
                    ) : horse.healthStatus === 'niejezdny' ? (
                      <Badge className="border-orange-500 bg-orange-500 text-white">
                        Niejezdny
                      </Badge>
                    ) : horse.healthStatus === 'nieznany' ? (
                      <Badge className="border-gray-500 bg-gray-500 text-white">
                        Nieznany
                      </Badge>
                    ) : (
                      formatValue(horse.healthStatus)
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Dostępny</TableCell>
                  <TableCell>
                    <Badge
                      className={
                        horse.isAvailable
                          ? 'border-green-500 bg-green-500 text-white'
                          : 'border-red-500 bg-red-500 text-white'
                      }
                    >
                      {horse.isAvailable ? 'Tak' : 'Nie'}
                    </Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Posiada TUV</TableCell>
                  <TableCell>
                    <Badge
                      className={
                        horse.hasTUV
                          ? 'border-blue-500 bg-blue-500 text-white'
                          : 'border-gray-500 bg-gray-500 text-white'
                      }
                    >
                      {horse.hasTUV ? 'Tak' : 'Nie'}
                    </Badge>
                  </TableCell>
                </TableRow>

                {/* Rodowód */}
                <TableRow>
                  <TableCell className="font-medium">Ojciec</TableCell>
                  <TableCell>{formatValue(horse.father)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Matka</TableCell>
                  <TableCell>{formatValue(horse.mother)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Rodowód</TableCell>
                  <TableCell>{formatValue(horse.pedigree)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Numer paszportu</TableCell>
                  <TableCell>{formatValue(horse.registrationNumber)}</TableCell>
                </TableRow>

                {/* Lokalizacja */}
                <TableRow>
                  <TableCell className="font-medium">Lokalizacja</TableCell>
                  <TableCell>{formatValue(horse.location)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Kraj</TableCell>
                  <TableCell>{formatValue(horse.country)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Region</TableCell>
                  <TableCell>{formatValue(horse.region)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Miasto</TableCell>
                  <TableCell>{formatValue(horse.city)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Współrzędne</TableCell>
                  <TableCell>{formatValue(horse.coordinates)}</TableCell>
                </TableRow>

                {/* Źródło i techniczne */}
                <TableRow>
                  <TableCell className="font-medium">Źródło</TableCell>
                  <TableCell>{formatValue(horse.sourceName)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">ID ogłoszenia</TableCell>
                  <TableCell>{formatValue(horse.sourceListingId)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">
                    Email właściciela
                  </TableCell>
                  <TableCell>{formatValue(horse.ownerEmail)}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>

        {/* <RelatedProducts id={horse.id} /> */}
      </div>
    </ProductProvider>
  )
}

// async function RelatedProducts({ id }: { id: string }) {
//   const relatedProducts = await getProductRecommendations(id);

//   if (!relatedProducts.length) return null;

//   return (
//     <div className="py-8">
//       <h2 className="mb-4 text-2xl font-bold">Related Products</h2>
//       <ul className="flex w-full gap-4 overflow-x-auto pt-1">
//         {relatedProducts.map((product: any) => (
//           <li
//             key={product.handle}
//             className="aspect-square w-full flex-none min-[475px]:w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5"
//           >
//             <Link
//               className="relative h-full w-full"
//               href={`/product/${product.handle}`}
//               prefetch={true}
//             >
//               <GridTileImage
//                 alt={product.title}
//                 label={{
//                   title: product.title,
//                   amount: product.priceRange.maxVariantPrice.amount,
//                   currencyCode: product.priceRange.maxVariantPrice.currencyCode,
//                 }}
//                 src={product.featuredImage?.url}
//                 fill
//                 sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw"
//               />
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
