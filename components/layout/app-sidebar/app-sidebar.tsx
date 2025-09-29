'use client'
import * as React from 'react'
import { X } from 'lucide-react'

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
  SidebarSeparator,
} from '@/components/ui/sidebar'
import { SidebarSelectFilter } from './sidebar-select-filter'
import { SidebarRangeFilter } from './sidebar-range-filter'
import { Button } from '@/components/ui/button'
import { useRouter, useSearchParams } from 'next/navigation'

const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  calendars: [
    {
      name: 'My Calendars',
      items: ['Personal', 'Work', 'Family'],
    },
    {
      name: 'Favorites',
      items: ['Holidays', 'Birthdays'],
    },
    {
      name: 'Other',
      items: ['Travel', 'Reminders', 'Deadlines'],
    },
  ],
  purposes: {
    name: 'Przeznaczenie',
    items: ['Zaprzęgi', 'Wyścigi', 'Skoki', 'Rajdy', 'Rekreacja'],
  },
  breeds: {
    name: 'Rasy koni',
    items: [
      'Koń arabski',
      'Koń fryzyjski',
      'Koń andaluzyjski',
      'Koń hanowerski',
      'Koń holsztyński',
      'Koń wielkopolski',
      'Koń śląski',
      'Koń małopolski',
      'Koń huculski',
      'Koń konik polski',
      'Koń trakeński',
      'Koń oldenburski',
      'Koń lipicański',
      'Koń fiordzki',
      'Koń belgijski',
      'Koń szetlandzki',
      'Koń angloarabski',
      'Koń pełnej krwi angielskiej',
      'Koń appaloosa',
      'Koń quarter horse',
      'Koń lusitano',
      'Koń fiński',
      'Koń norweski',
      'Koń czystej krwi arabskiej',
      'Koń tinker',
      'Koń achał-tekiński',
      'Koń camargue',
      'Koń islandzki',
      'Koń haflinger',
      'Koń przewalskiego',
      'Koń mustang',
    ],
  },
  genders: {
    name: 'Płeć',
    items: ['Klacz', 'Ogier', 'Wałach'],
  },
  healthStatuses: {
    name: 'Stan zdrowia',
    items: ['Zdrowy', 'Kontuzjowany', 'Niezdatny do jazdy', 'Nieznany'],
  },
  trainingLevels: {
    name: 'Edukacja',
    items: [
      'Surowy',
      'Lonżowany',
      'Zajeżdżony',
      'Klasa L',
      'Klasa P',
      'Klasa N',
      'Klasa C',
      'Klasa CC',
    ],
  },
  ages: {
    name: 'Wiek',
    items: [
      '1-3 lata',
      '3-5 lat',
      '5-7 lat',
      '7-10 lat',
      '10-15 lat',
      '15-20 lat',
      '20-25 lat',
      '25-30 lat',
      '30-35 lat',
      '35-40 lat',
      '40-45 lat',
      '45-50 lat',
      '50-55 lat',
      '55-62 lat',
    ],
  },
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const router = useRouter()
  const [searchParams] = useSearchParams()

  const anyActive = !!searchParams

  return (
    <Sidebar {...props}>
      <SidebarHeader className="border-sidebar-border h-16 border-b">
        <div className="flex items-center justify-between">
          <h1 className="my-auto pl-2 text-xl font-semibold">Filtruj</h1>
          {anyActive && (
            <Button
              variant="outline"
              size="icon"
              className="mr-2"
              onClick={() => {
                router.push('/')
              }}
            >
              <X />
            </Button>
          )}
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarSeparator className="mx-0" />
        <SidebarSelectFilter
          name={data.breeds.name}
          items={data.breeds.items}
          paramKey="breeds"
          defaultOpen={true}
        />
        <SidebarSelectFilter
          name={data.genders.name}
          items={data.genders.items}
          paramKey="genders"
        />
        <SidebarSelectFilter
          name={data.purposes.name}
          items={data.purposes.items}
          paramKey="purposes"
          defaultOpen={false}
        />
        <SidebarRangeFilter
          name="Cena"
          minParamKey="priceMin"
          maxParamKey="priceMax"
          placeholderMin="Min"
          placeholderMax="Max"
          defaultOpen={false}
          integer={true}
        />
        <SidebarSelectFilter
          name={data.healthStatuses.name}
          items={data.healthStatuses.items}
          paramKey="healthStatuses"
          defaultOpen={false}
        />
        <SidebarRangeFilter
          name="Wysokość"
          minParamKey="heightMin"
          maxParamKey="heightMax"
          placeholderMin="Min"
          placeholderMax="Max"
          defaultOpen={false}
          integer={true}
        />
        <SidebarSelectFilter
          name={data.trainingLevels.name}
          items={data.trainingLevels.items}
          paramKey="trainingLevels"
          defaultOpen={false}
        />
        <SidebarSelectFilter
          name={data.ages.name}
          items={data.ages.items}
          paramKey="ages"
          defaultOpen={false}
        />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
