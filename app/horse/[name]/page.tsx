import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { GridTileImage } from "@/components/grid/tile";
import Footer from "@/components/layout/footer";
import { Gallery } from "@/components/product/gallery";
import { ProductProvider } from "@/components/product/product-context";
import { ProductDescription } from "@/components/product/product-description";
import Link from "next/link";
import { Suspense } from "react";
import { api } from "@/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";
import { Id } from "@/convex/_generated/dataModel";

export async function generateMetadata(props: {
  params: Promise<{ name: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const horse = await fetchQuery(api.horses.getById, {
    id: params.name as Id<"horses">,
  });

  if (!horse) return notFound();

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
  };
}

export default async function HorsePage(props: {
  params: Promise<{ name: string }>;
}) {
  const params = await props.params;
  const horse = await fetchQuery(api.horses.getById, {
    id: params.name as Id<"horses">,
  });

  if (!horse) return notFound();

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: horse.name,
    description: horse.description,
    image: horse.imageUrl,
    offers: {
      "@type": "AggregateOffer",
      availability: horse.isAvailable
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      priceCurrency: "USD",
      highPrice: horse.price,
      lowPrice: horse.price,
    },
  };

  return (
    <ProductProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd),
        }}
      />
      <div className="mx-auto max-w-(--breakpoint-2xl) px-4">
        <div className="flex flex-col rounded-lg border border-neutral-200 bg-white p-8 md:p-12 lg:flex-row lg:gap-8 dark:border-neutral-800 dark:bg-black">
          <div className="h-full w-full basis-full lg:basis-4/6">
            <Suspense
              fallback={
                <div className="relative aspect-square h-full max-h-[550px] w-full overflow-hidden" />
              }
            >
              <Gallery
                images={[
                  {
                    src: horse.imageUrl || "",
                    altText: horse.name,
                  },
                ]}
              />
            </Suspense>
          </div>

          <div className="basis-full lg:basis-2/6">
            <Suspense fallback={null}>
              <ProductDescription horse={horse} />
            </Suspense>
          </div>
        </div>
        {/* <RelatedProducts id={horse.id} /> */}
      </div>
      <Footer />
    </ProductProvider>
  );
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
