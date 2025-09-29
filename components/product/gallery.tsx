'use client'

import Image from 'next/image'
import { useState, useRef } from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel'
import { cn } from '@/lib/utils'

export function Gallery({
  images,
}: {
  images: { src: string; altText: string }[]
}) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [api, setApi] = useState<CarouselApi>()

  if (!images || images.length === 0) {
    return (
      <div className="relative flex aspect-square h-full max-h-[550px] w-full items-center justify-center overflow-hidden bg-gray-100">
        <p className="text-gray-500">Brak obrazów</p>
      </div>
    )
  }

  const handleThumbnailClick = (index: number) => {
    if (api) {
      api.scrollTo(index)
    }
  }

  return (
    <div className="w-full">
      {/* Main Carousel */}
      <Carousel
        className="w-full"
        opts={{
          align: 'start',
        }}
        setApi={(carouselApi) => {
          setApi(carouselApi)
          if (carouselApi) {
            carouselApi.on('select', () => {
              setCurrentIndex(carouselApi.selectedScrollSnap())
            })
          }
        }}
      >
        <CarouselContent className="aspect-square">
          {images.map((image, index) => (
            <CarouselItem key={image.src}>
              <div className="relative aspect-square h-full max-h-[550px] w-full content-center overflow-hidden rounded-lg md:max-h-none">
                <img
                  src={image.src}
                  alt={image.altText}
                  className="object-contain"
                  sizes="(min-width: 1024px) 66vw, 100vw"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {images.length > 1 && (
          <>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </>
        )}
      </Carousel>

      {/* Thumbnail Navigation */}
      {images.length > 1 && (
        <div className="mt-4 flex justify-center">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {images.map((image, index) => (
              <button
                key={image.src}
                onClick={() => handleThumbnailClick(index)}
                className={cn(
                  'relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2 transition-all hover:opacity-80',
                  currentIndex === index
                    ? 'border-blue-500 ring-2 ring-blue-200'
                    : 'border-gray-200'
                )}
              >
                <img
                  src={image.src}
                  alt={image.altText}
                  className="object-cover"
                  sizes="64px"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
