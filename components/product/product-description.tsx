import Price from '@/components/price'
import { Doc } from '@/convex/_generated/dataModel'
import Prose from '../prose'

export function ProductDescription({ horse }: { horse: Doc<'horses'> }) {
  return (
    <>
      <div className="mb-6 flex flex-col border-b pb-6 dark:border-neutral-700">
        <h1 className="mb-2 text-5xl font-medium">{horse.name}</h1>
        <div className="mr-auto w-auto rounded-full bg-blue-600 p-2 text-sm text-white">
          <Price amount={horse.price.toString()} currencyCode="USD" />
        </div>
      </div>

      {horse.description ? (
        <Prose
          className="mb-6 text-sm leading-tight dark:text-white/[60%]"
          html={horse.description}
        />
      ) : null}
    </>
  )
}
