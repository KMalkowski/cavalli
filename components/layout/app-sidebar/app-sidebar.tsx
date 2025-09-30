'use client'

import * as React from 'react'
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
  SidebarSeparator,
} from '@/components/ui/sidebar'
import { SidebarSelectFilter } from './sidebar-select-filter'
import { SidebarRangeFilter } from './sidebar-range-filter'

export const filters = {
  purposes: {
    name: 'Przeznaczenie',
    items: ['Zaprzęgi', 'Wyścigi', 'Skoki', 'Rajdy', 'Rekreacja'],
  },
  breeds: {
    name: 'Rasy koni',
    items: [
      'Achałtekińska',
      'American Paint Horse',
      'Andaluzyjska',
      'Ane Grand Noir du Berry',
      'Appaloosa',
      'Arden francuski',
      'Arden polski',
      'Arden szwedzki',
      'Ardenofiord',
      'Ardeńska',
      'Austriacki koń gorącokrwisty',
      'Baudet Poitou',
      'Bawarska',
      'Beberbecka',
      'Belgijska',
      'Berberyjska',
      'Brandenburska',
      'Bretońska',
      'Budionowska',
      'Bulońska',
      'Cheval de selle',
      'Clydesdale',
      'Cob normandzki',
      'Comtois',
      'Czeska',
      'Duńska',
      'Europees Stamboek',
      'Fallabella',
      'Fiordzka',
      'Francuski kuc wierzchowy',
      'Freiberger',
      'Fryderyksborska',
      'Fryzyjska',
      'Furioso',
      'Gudbrandsdalska',
      'Gypsy cob',
      'Hackney',
      'Haflinger',
      'Hanowerska',
      'Heska',
      'Holsztyńska',
      'Huculska',
      'Irish Cob',
      'Irlandzki koń sportowy',
      'Kabardyńska',
      'Katalońska',
      'Kazachska',
      'Kladrubska',
      'Kłusak',
      'Konik biłgorajski',
      'Konik polski',
      'Koń anglo-doński',
      'Koń anglo-normandzki',
      'Koń arabski',
      'Koń arabski chowany w czystości krwi',
      'Koń doński',
      'Koń graditzki',
      'Koń Jutlandzki',
      'Koń lidzbarski',
      'Koń mazurski',
      'Koń norycki',
      'Koń pinto',
      'Koń pomorski',
      'Koń poznański',
      'Koń Przewalskiego',
      'Koń sokólski',
      'Koń sztumski',
      'Koń trakeński',
      'Koń wschodniopruski',
      'Księga stadna Zangersheide',
      'Kuc angielski',
      'Kuc connemara',
      'Kuc dartmoor',
      'Kuc exmoor',
      'Kuc Feliński',
      'Kuc Fell',
      'Kuc highland',
      'Kuc islandzki',
      'Kuc Lewitzer',
      'Kuc new forest',
      'Kuc niemiecki',
      'Kuc szetlandzki',
      'Kuc walijski',
      'Kuc wierzchowy',
      'Kustyjska',
      'KWPN',
      'LA SILLA',
      'Le cheval de sport Belge',
      'Lewitzer',
      'Lipicańska',
      'Litewska',
      'Luksemburska gorącokrwista',
      'Lusitano',
      'Łotewska',
      'Małopolska',
      'Maremmano',
      'Meckenburska',
      'Missouri Fox Trotter',
      'Morgan',
      'Mur insulan',
      'Nederlandse Appaloosa Stamboek',
      'Niemiecka wierzchowa',
      'Niemiecki koń sportowy',
      'NWP',
      'Oldenburska',
      'Oryginalny arab',
      'Pełna krew angielska',
      'Perszeron',
      'Polski koń szlachetny półkrwi',
      'Polski koń zimnokrwisty',
      'Polski kuc szetlandzki',
      'Półkrew angielska',
      'Półkrew angloarabska',
      'Półkrew arabska',
      'Północno-szwedzka',
      'Pura Raza Espanola',
      'Quarter horse',
      'Reńska',
      'Saksońska',
      'Schweres warmblud',
      'Selle francais',
      'Shagya',
      'Shire',
      'Słowacki koń gorącokrwisty',
      'Szwajcarska',
      'Szwedzka',
      'Śląska',
      'Tennessee Walking Horse',
      'Tierska',
      'Tinker',
      'Toryjska',
      'Trakeńska',
      'Turyngijska',
      'Typ koń mały',
      'Typ kuc',
      'Typ pogrubiony',
      'Typ prymitywny',
      'Typ szlachetny',
      'Typ zimnokrwisty',
      'Ukraińska',
      'Warmblutschecke',
      'Westfalska',
      'Węgierska półkrew',
      'Wielkopolska',
      'Wirtemberska',
      'Włoska wierzchowa',
      'Wschodniofryzyjska',
      'Žemaitukai',
      'Zimnokrwista',
      'Zweibrücker',
      'Rasa nieznana',
    ],
  },
  colors: {
    name: 'Maść',
    items: [
      'Gniada',
      'Kasztanowata',
      'Siwa',
      'Ciemnogniada',
      'Kara',
      'Skarogniada',
      'Srokata',
      'Bułana',
      'Myszata',
      'Tarantowata',
      'Izabelowata',
      'Dereszowata',
    ],
  },
  genders: {
    name: 'Płeć',
    items: ['Klacz', 'Ogier', 'Wałach'],
  },
  healthStatuses: {
    name: 'Stan zdrowia',
    items: ['zdrowy', 'chory', 'kontuzjowany', 'niejezdny', 'nieznany'],
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
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader className="border-sidebar-border h-16 justify-center border-b">
        <div className="flex items-center justify-between px-2">
          <h1 className="text-xl font-semibold">Filtruj</h1>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarSeparator className="mx-0" />
        <SidebarSelectFilter
          name={filters.breeds.name}
          items={filters.breeds.items}
          paramKey="breeds"
          defaultOpen={true}
        />
        <SidebarSelectFilter
          name={filters.genders.name}
          items={filters.genders.items}
          paramKey="genders"
        />
        <SidebarSelectFilter
          name={filters.colors.name}
          items={filters.colors.items}
          paramKey="colors"
        />
        <SidebarSelectFilter
          name={filters.purposes.name}
          items={filters.purposes.items}
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
          name={filters.healthStatuses.name}
          items={filters.healthStatuses.items}
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
          name={filters.trainingLevels.name}
          items={filters.trainingLevels.items}
          paramKey="trainingLevels"
          defaultOpen={false}
        />
        <SidebarRangeFilter
          name="Wiek"
          minParamKey="ageMin"
          maxParamKey="ageMax"
          placeholderMin="Min"
          placeholderMax="Max"
          integer={true}
          defaultOpen={false}
        />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
