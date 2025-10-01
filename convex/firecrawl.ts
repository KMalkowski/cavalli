'use node'

import { internalAction } from './_generated/server'
import { v } from 'convex/values'
import { generateObject } from 'ai'
import { openai } from '@ai-sdk/openai'
import { z } from 'zod'
import Firecrawl from '@mendable/firecrawl-js'
import { internal } from './_generated/api'
import { Doc } from './_generated/dataModel'

const horseOfferSchema = z.object({
  type: z.union([z.literal('horse'), z.literal('something else')]),
  name: z.string().describe('Nazwa/tytuł konia'),
  breed: z
    .union([
      z.literal('Achałtekińska'),
      z.literal('American Paint Horse'),
      z.literal('Andaluzyjska'),
      z.literal('Ane Grand Noir du Berry'),
      z.literal('Appaloosa'),
      z.literal('Arden francuski'),
      z.literal('Arden polski'),
      z.literal('Arden szwedzki'),
      z.literal('Ardenofiord'),
      z.literal('Ardeńska'),
      z.literal('Austriacki koń gorącokrwisty'),
      z.literal('Baudet Poitou'),
      z.literal('Bawarska'),
      z.literal('Beberbecka'),
      z.literal('Belgijska'),
      z.literal('Berberyjska'),
      z.literal('Brandenburska'),
      z.literal('Bretońska'),
      z.literal('Budionowska'),
      z.literal('Bulońska'),
      z.literal('Cheval de selle'),
      z.literal('Clydesdale'),
      z.literal('Cob normandzki'),
      z.literal('Comtois'),
      z.literal('Czeska'),
      z.literal('Duńska'),
      z.literal('Europees Stamboek'),
      z.literal('Fallabella'),
      z.literal('Fiordzka'),
      z.literal('Francuski kuc wierzchowy'),
      z.literal('Freiberger'),
      z.literal('Fryderyksborska'),
      z.literal('Fryzyjska'),
      z.literal('Furioso'),
      z.literal('Gudbrandsdalska'),
      z.literal('Gypsy cob'),
      z.literal('Hackney'),
      z.literal('Haflinger'),
      z.literal('Hanowerska'),
      z.literal('Heska'),
      z.literal('Holsztyńska'),
      z.literal('Huculska'),
      z.literal('Irish Cob'),
      z.literal('Irlandzki koń sportowy'),
      z.literal('Kabardyńska'),
      z.literal('Katalońska'),
      z.literal('Kazachska'),
      z.literal('Kladrubska'),
      z.literal('Kłusak'),
      z.literal('Konik biłgorajski'),
      z.literal('Konik polski'),
      z.literal('Koń anglo-doński'),
      z.literal('Koń anglo-normandzki'),
      z.literal('Koń arabski'),
      z.literal('Koń arabski chowany w czystości krwi'),
      z.literal('Koń doński'),
      z.literal('Koń graditzki'),
      z.literal('Koń Jutlandzki'),
      z.literal('Koń lidzbarski'),
      z.literal('Koń mazurski'),
      z.literal('Koń norycki'),
      z.literal('Koń pinto'),
      z.literal('Koń pomorski'),
      z.literal('Koń poznański'),
      z.literal('Koń Przewalskiego'),
      z.literal('Koń sokólski'),
      z.literal('Koń sztumski'),
      z.literal('Koń trakeński'),
      z.literal('Koń wschodniopruski'),
      z.literal('Księga stadna Zangersheide'),
      z.literal('Kuc angielski'),
      z.literal('Kuc connemara'),
      z.literal('Kuc dartmoor'),
      z.literal('Kuc exmoor'),
      z.literal('Kuc Feliński'),
      z.literal('Kuc Fell'),
      z.literal('Kuc highland'),
      z.literal('Kuc islandzki'),
      z.literal('Kuc Lewitzer'),
      z.literal('Kuc new forest'),
      z.literal('Kuc niemiecki'),
      z.literal('Kuc szetlandzki'),
      z.literal('Kuc walijski'),
      z.literal('Kuc wierzchowy'),
      z.literal('Kustyjska'),
      z.literal('KWPN'),
      z.literal('LA SILLA'),
      z.literal('Le cheval de sport Belge'),
      z.literal('Lewitzer'),
      z.literal('Lipicańska'),
      z.literal('Litewska'),
      z.literal('Luksemburska gorącokrwista'),
      z.literal('Lusitano'),
      z.literal('Łotewska'),
      z.literal('Małopolska'),
      z.literal('Maremmano'),
      z.literal('Meckenburska'),
      z.literal('Missouri Fox Trotter'),
      z.literal('Morgan'),
      z.literal('Mur insulan'),
      z.literal('Nederlandse Appaloosa Stamboek'),
      z.literal('Niemiecka wierzchowa'),
      z.literal('Niemiecki koń sportowy'),
      z.literal('NWP'),
      z.literal('Oldenburska'),
      z.literal('Oryginalny arab'),
      z.literal('Pełna krew angielska'),
      z.literal('Perszeron'),
      z.literal('Polski koń szlachetny półkrwi'),
      z.literal('Polski koń zimnokrwisty'),
      z.literal('Polski kuc szetlandzki'),
      z.literal('Półkrew angielska'),
      z.literal('Półkrew angloarabska'),
      z.literal('Półkrew arabska'),
      z.literal('Północno-szwedzka'),
      z.literal('Pura Raza Espanola'),
      z.literal('Quarter horse'),
      z.literal('Reńska'),
      z.literal('Saksońska'),
      z.literal('Schweres warmblud'),
      z.literal('Selle francais'),
      z.literal('Shagya'),
      z.literal('Shire'),
      z.literal('Słowacki koń gorącokrwisty'),
      z.literal('Szwajcarska'),
      z.literal('Szwedzka'),
      z.literal('Śląska'),
      z.literal('SP'),
      z.literal('Tennessee Walking Horse'),
      z.literal('Tierska'),
      z.literal('Tinker'),
      z.literal('Toryjska'),
      z.literal('Trakeńska'),
      z.literal('Turyngijska'),
      z.literal('Typ koń mały'),
      z.literal('Typ kuc'),
      z.literal('Typ pogrubiony'),
      z.literal('Typ prymitywny'),
      z.literal('Typ szlachetny'),
      z.literal('Typ zimnokrwisty'),
      z.literal('Ukraińska'),
      z.literal('Warmblutschecke'),
      z.literal('Westfalska'),
      z.literal('Węgierska półkrew'),
      z.literal('Wielkopolska'),
      z.literal('Wirtemberska'),
      z.literal('Włoska wierzchowa'),
      z.literal('Wschodniofryzyjska'),
      z.literal('Žemaitukai'),
      z.literal('Zimnokrwista'),
      z.literal('Zweibrücker'),
      z.literal('Rasa nieznana'),
    ])
    .nullish()
    .describe('Rasa konia'),
  age: z.number().nullish().describe('Wiek konia w latach'),
  height: z.number().nullish().describe('Wysokość konia w cm'),
  gender: z
    .union([z.literal('ogier'), z.literal('klacz'), z.literal('wałach')])
    .nullish()
    .describe('Płeć konia'),
  color: z
    .union([
      z.literal('Gniada'),
      z.literal('Kasztanowata'),
      z.literal('Siwa'),
      z.literal('Ciemnogniada'),
      z.literal('Kara'),
      z.literal('Skarogniada'),
      z.literal('Srokata'),
      z.literal('Bułana'),
      z.literal('Myszata'),
      z.literal('Tarantowata'),
      z.literal('Izabelowata'),
      z.literal('Dereszowata'),
    ])
    .nullish()
    .describe('Maść konia'),

  price: z.number().describe('Cena'),
  currency: z.string().default('PLN').describe('Waluta'),
  isAvailable: z.boolean().default(true),

  location: z.string().nullish().describe('Ogólna lokalizacja'),
  country: z.string().nullish().describe('Kraj'),
  region: z.string().nullish().describe('Województwo'),
  city: z.string().nullish().describe('Miasto'),
  coordinates: z
    .object({
      lat: z.number(),
      lng: z.number(),
    })
    .nullish()
    .describe('Współrzędne geograficzne'),

  // Horse details
  purpose: z
    .string()
    .nullish()
    .describe('Przeznaczenie konia (sportowy/rekreacyjny/roboczy)'),
  disciplines: z.array(z.string()).nullish().describe('Dyscypliny sportowe'),
  trainingLevel: z
    .union([
      z.literal('Surowy'),
      z.literal('Lonżowany'),
      z.literal('Zajeżdżony'),
      z.literal('Klasa L'),
      z.literal('Klasa P'),
      z.literal('Klasa N'),
      z.literal('Klasa C'),
      z.literal('Klasa CC'),
    ])
    .nullish()
    .describe('Poziom wyszkolenia'),
  healthStatus: z
    .union([
      z.literal('zdrowy'),
      z.literal('chory'),
      z.literal('kontuzjowany'),
      z.literal('niejezdny'),
      z.literal('nieznany'),
    ])
    .nullish()
    .describe('Stan zdrowia'),

  // Pedigree information
  father: z.string().nullish().describe('Ojciec konia'),
  mother: z.string().nullish().describe('Matka konia'),
  pedigree: z.string().nullish().describe('Rodowód'),
  registrationNumber: z.string().nullish().describe('Numer paszportu'),

  // Source and listing information
  sourceUrl: z.string().describe('URL oryginalnego ogłoszenia'),
  sourceName: z.string().default('OLX').describe('Nazwa źródła'),
  sourceListingId: z.string().nullish().describe('ID ogłoszenia w źródle'),

  // Media and descriptions
  description: z.string().describe('Szczegółowy opis konia'),
  imageUrl: z.string().nullish().describe('Główne zdjęcie konia'),

  // Technical fields
  hasTUV: z.boolean().default(false).describe('Czy ma badania TUV'),

  // SEO fields
  seoTitle: z.string().nullish().describe('Tytuł SEO'),
  seoDescription: z.string().nullish().describe('Opis SEO'),

  // Additional extracted data
  datePosted: z.string().nullish().describe('Data dodania ogłoszenia'),
  contactInfo: z
    .object({
      phone: z.string().nullish().describe('Numer telefonu'),
      email: z.string().nullish().describe('Adres email'),
      name: z.string().nullish().describe('Imię sprzedawcy'),
    })
    .nullish()
    .describe('Informacje kontaktowe'),
  features: z.array(z.string()).nullish().describe('Dodatkowe cechy konia'),
  images: z.array(z.string()).nullish().describe('URL-e wszystkich zdjęć'),
})

// Function to extract URLs containing '/oferta/' from markdown content
function extractOfferUrls(markdownContent: string): string[] {
  const urlRegex = /\[([^\]]*)\]\((https?:\/\/[^)]*\/oferta\/[^)]*)\)/g
  const urls: string[] = []
  let match

  while ((match = urlRegex.exec(markdownContent)) !== null) {
    const url = match[2]
    if (!urls.includes(url)) {
      urls.push(url)
    }
  }

  return urls
}

export const scrapeOlxListings = internalAction({
  args: {
    startAtPage: v.number(),
    maxPage: v.number(),
  },
  handler: async (ctx, args) => {
    const apiKey = process.env.FIRECRAWL_API_KEY
    if (!apiKey) {
      throw new Error('Missing FIRECRAWL_API_KEY env var in Convex')
    }

    const firecrawl = new Firecrawl({ apiKey: apiKey })

    const listingPagesScrapePromises = Array.from(
      { length: args.maxPage - args.startAtPage },
      (_, i) =>
        firecrawl.scrape(
          `https://www.olx.pl/zwierzeta/konie/?page=${i + args.startAtPage}&search%5Border%5D=created_at%3Adesc`,
          {
            formats: ['markdown'],
            maxAge: 86400000,
            onlyMainContent: true,
            timeout: 120000,
          }
        )
    )

    const listingPagesScrapeResults = await Promise.all(
      listingPagesScrapePromises
    )

    const offerUrls = listingPagesScrapeResults.flatMap((result) =>
      extractOfferUrls(result?.markdown || '')
    )

    const batches = Math.ceil(offerUrls.length / 10)

    for (let i = 0; i < batches; i++) {
      await ctx.scheduler.runAfter(
        (i + 1) * 60 * 1000,
        internal.firecrawl.scrapeOlxHorseOffer,
        {
          offerUrl: offerUrls.slice(i * 10, (i + 1) * 10),
        }
      )
    }
  },
})

export const scrapeOlxHorseOffer = internalAction({
  args: {
    offerUrl: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    const existingHorsesPromises: Promise<Doc<'horses'> | null>[] =
      args.offerUrl.map((offerUrl) =>
        ctx.runQuery(internal.horses.getBySourceUrl, {
          sourceUrl: offerUrl,
        })
      )

    const existingHorses = await Promise.all(existingHorsesPromises)

    const horsesToScrape = args.offerUrl.filter(
      (offerUrl) =>
        !existingHorses.some((horse) => horse?.sourceUrl === offerUrl)
    )

    const apiKey = process.env.FIRECRAWL_API_KEY
    if (!apiKey) {
      throw new Error('Missing FIRECRAWL_API_KEY env var in Convex')
    }
    const firecrawl = new Firecrawl({ apiKey: apiKey })

    const scrapePromises = horsesToScrape.map(async (offerUrl) => {
      try {
        return await firecrawl.scrape(offerUrl, {
          formats: ['markdown'],
          maxAge: 86400000,
          onlyMainContent: true,
          timeout: 120000,
        })
      } catch (error) {
        console.error('Error scraping offer:', error)
        return null
      }
    })

    const scrapeResults = await Promise.all(scrapePromises)

    const objectPromises = scrapeResults
      .filter((v) => v !== null)
      .map(async (scrapeResult) => {
        try {
          return await generateObject({
            model: openai('gpt-5-mini'),
            schema: horseOfferSchema,
            system: `
        Jesteś ekspertem w dziedzinie sprzedaży koni.
        Masz za zadanie wyciągnąć wszystkie istotne informacje zgodnie ze schematem.
        WAŻNE: Jeśli informacja nie jest dostępna, pozostaw pole puste lub użyj wartości domyślnych.
        `,
            prompt: `
        Treść ogłoszenia: ${scrapeResult?.markdown}
        `,
            providerOptions: {
              openai: {
                structuredOutputs: true,
              },
            },
          })
        } catch (error) {
          return null
        }
      })

    const generatedObjects = await Promise.all(objectPromises)

    const savePromises = generatedObjects
      .filter((v) => v !== null)
      .map((v) => {
        if (v.object.type === 'horse') {
          return ctx.runMutation(internal.horses.saveFromScraping, {
            horseData: v.object,
          })
        } else {
          console.log('Skipping non-horse object:', v.object)
          return null
        }
      })

    await Promise.all(savePromises.filter((v) => v !== null))

    console.log('Horses saved to database')
  },
})
