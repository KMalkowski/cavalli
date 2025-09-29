import { GridItem } from "@/components/grid/grid";
import { GridTileImage } from "@/components/grid/tile";
import { Doc } from "@/convex/_generated/dataModel";
import Link from "next/link";
import { Card } from "../ui/card";
import { Button } from "../ui/button";

export default function ProductListItems({
  horses,
}: {
  horses: Doc<"horses">[];
}) {
  return (
    <>
      {horses.map((horse) => (
        <Card key={horse._id} className="mb-4">        
          <div className="bg-background relative md:flex flex-1 gap-8 px-6">
            <div className="bg-muted relative md:h-32 md:w-32 w-full h-64 shrink-0 overflow-hidden rounded-lg">
              <img 
                src={horse.imageUrl || ""} 
                alt={horse.name} 
                className="object-cover w-full h-full md:w-32 md:h-32"
                style={{ width: "100%", height: "100%" }}
              />
            </div>
            <div className='mt-4 md:mt-0 min-w-0 flex-1'>
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-lg font-medium">{horse.name}</h3>
                <div className="hidden md:block text-lg font-medium whitespace-nowrap">
                  {horse.price} {horse.currency}
                </div>
              </div>
              <div className="text-muted-foreground my-2 text-sm">
                <p>Wiek: {horse.age ? `${horse.age} lat` : "N/A"}</p>
                <p>Rasa: {horse.breed}</p>
                <p>A ile taki pedał ma w kłębie: {horse.height ? `${horse.height} cm` : "N/A"}</p>
              </div>
              <div className="md:hidden text-lg font-medium whitespace-nowrap mb-2 md:mb-0">
                  {horse.price} {horse.currency}
                </div>
              <Button asChild className="w-full md:w-auto">
                <Link href={`/horse/${horse._id}`}>
                  View
                </Link>
              </Button>
            </div>
          </div>  
        </Card>
      ))}
    </>
  );
}
