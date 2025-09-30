'use node'

import { action, mutation } from './_generated/server'
import { v } from 'convex/values'
import { generateObject } from 'ai'
import { openai } from '@ai-sdk/openai'
import { z } from 'zod'

const horseOfferSchema = z.object({
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
    .optional()
    .describe('Rasa konia'),
  age: z.number().optional().describe('Wiek konia w latach'),
  height: z.number().optional().describe('Wysokość konia w cm'),
  gender: z
    .union([z.literal('ogier'), z.literal('klacz'), z.literal('wałach')])
    .optional()
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
    .optional()
    .describe('Maść konia'),

  price: z.number().describe('Cena'),
  currency: z.string().default('PLN').describe('Waluta'),
  isAvailable: z.boolean().default(true),

  location: z.string().optional().describe('Ogólna lokalizacja'),
  country: z.string().optional().describe('Kraj'),
  region: z.string().optional().describe('Województwo'),
  city: z.string().optional().describe('Miasto'),
  coordinates: z
    .object({
      lat: z.number(),
      lng: z.number(),
    })
    .optional()
    .describe('Współrzędne geograficzne'),

  // Horse details
  purpose: z
    .string()
    .optional()
    .describe('Przeznaczenie konia (sportowy/rekreacyjny/roboczy)'),
  disciplines: z.array(z.string()).optional().describe('Dyscypliny sportowe'),
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
    .optional()
    .describe('Poziom wyszkolenia'),
  healthStatus: z
    .union([
      z.literal('zdrowy'),
      z.literal('chory'),
      z.literal('kontuzjowany'),
      z.literal('niejezdny'),
      z.literal('nieznany'),
    ])
    .optional()
    .describe('Stan zdrowia'),

  // Pedigree information
  father: z.string().optional().describe('Ojciec konia'),
  mother: z.string().optional().describe('Matka konia'),
  pedigree: z.string().optional().describe('Rodowód'),
  registrationNumber: z.string().optional().describe('Numer paszportu'),

  // Source and listing information
  sourceUrl: z.string().describe('URL oryginalnego ogłoszenia'),
  sourceName: z.string().default('OLX').describe('Nazwa źródła'),
  sourceListingId: z.string().optional().describe('ID ogłoszenia w źródle'),

  // Media and descriptions
  description: z.string().describe('Szczegółowy opis konia'),
  imageUrl: z.string().optional().describe('Główne zdjęcie konia'),

  // Technical fields
  hasTUV: z.boolean().default(false).describe('Czy ma badania TUV'),

  // SEO fields
  seoTitle: z.string().optional().describe('Tytuł SEO'),
  seoDescription: z.string().optional().describe('Opis SEO'),

  // Additional extracted data
  negotiable: z.boolean().optional().describe('Czy cena jest do negocjacji'),
  datePosted: z.string().optional().describe('Data dodania ogłoszenia'),
  contactInfo: z
    .object({
      phone: z.string().optional().describe('Numer telefonu'),
      email: z.string().optional().describe('Adres email'),
      name: z.string().optional().describe('Imię sprzedawcy'),
    })
    .optional()
    .describe('Informacje kontaktowe'),
  features: z.array(z.string()).optional().describe('Dodatkowe cechy konia'),
  images: z.array(z.string()).optional().describe('URL-e wszystkich zdjęć'),
})

// Function to extract URLs containing '/oferta/' from markdown content
function extractOfferUrls(markdownContent: string): string[] {
  const urlRegex = /\[([^\]]*)\]\((https?:\/\/[^)]*\/oferta\/[^)]*)\)/g
  const urls: string[] = []
  let match

  while ((match = urlRegex.exec(markdownContent)) !== null) {
    const url = match[2]
    if (!urls.includes(url)) {
      // Avoid duplicates
      urls.push(url)
    }
  }

  return urls
}

export const fetchTestData = action({
  args: {
    url: v.string(),
  },
  returns: v.any(),
  handler: async (ctx, args) => {
    console.log('Starting Firecrawl scrape for URL:', args.url)
    const apiKey = process.env.FIRECRAWL_API_KEY
    if (!apiKey) {
      throw new Error('Missing FIRECRAWL_API_KEY env var in Convex')
    }

    // Validate and clean the URL
    let cleanUrl = args.url.trim()

    // Try to create a URL object to validate the URL format
    try {
      const urlObj = new URL(cleanUrl)
      cleanUrl = urlObj.toString()
    } catch (error) {
      throw new Error(`Invalid URL format: ${cleanUrl}`)
    }

    console.log('Response received, status:', 'preparing request')
    console.log('Clean URL:', cleanUrl)

    const response = await fetch('https://api.firecrawl.dev/v1/scrape', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: cleanUrl,
        formats: ['markdown'],
        onlyMainContent: true,
      }),
    })

    console.log('Response received, status:', response.status)

    if (!response.ok) {
      const text = await response.text()
      console.error('Firecrawl API error:', response.status, text)
      throw new Error(
        `Firecrawl request failed: Firecrawl error ${response.status}: ${text}`
      )
    }

    const data = await response.json()

    // Extract URLs containing '/oferta/' from markdown content
    const offerUrls = extractOfferUrls(data?.data?.markdown || '')

    return {
      originalData: data,
      offerUrls: offerUrls,
      totalOffers: offerUrls.length,
    }
  },
})

export const scrapeOfferDetails = action({
  args: {
    offerUrl: v.string(),
  },
  handler: async (ctx, args) => {
    console.log('Starting scrape of individual offer:', args.offerUrl)
    const apiKey = process.env.FIRECRAWL_API_KEY
    if (!apiKey) {
      throw new Error('Missing FIRECRAWL_API_KEY env var in Convex')
    }

    // Validate and clean the URL
    let cleanUrl = args.offerUrl.trim()

    try {
      const urlObj = new URL(cleanUrl)
      cleanUrl = urlObj.toString()
    } catch (error) {
      throw new Error(`Invalid URL format: ${cleanUrl}`)
    }

    console.log('Clean offer URL:', cleanUrl)

    const response = await fetch('https://api.firecrawl.dev/v1/scrape', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: cleanUrl,
        formats: ['markdown'],
        onlyMainContent: true,
      }),
    })

    console.log('Offer scrape response status:', response.status)

    if (!response.ok) {
      const text = await response.text()
      console.error('Firecrawl offer API error:', response.status, text)
      throw new Error(
        `Firecrawl offer request failed: Firecrawl error ${response.status}: ${text}`
      )
    }

    const data = await response.json()
    console.log('Offer scraped successfully')

    return {
      offerUrl: cleanUrl,
      markdownContent: data?.data?.markdown || '',
      metadata: data?.data?.metadata || {},
      success: true,
    }
  },
})

export const generateStructuredData = action({
  args: {
    markdownContent: v.string(),
    offerUrl: v.string(),
  },
  handler: async (ctx, args) => {
    console.log('Generating structured data for offer:', args.offerUrl)

    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) {
      throw new Error('Missing OPENAI_API_KEY env var in Convex')
    }

    try {
      const { object } = await generateObject({
        model: openai('gpt-5-mini'),
        schema: horseOfferSchema,
        system: `
        Jesteś ekspertem w dziedzinie sprzedaży koni.
        Masz za zadanie wyciągnąć wszystkie istotne informacje zgodnie ze schematem.
        WAŻNE: Jeśli informacja nie jest dostępna, pozostaw pole puste lub użyj wartości domyślnych.
        `,
        prompt: `
        Treść ogłoszenia: ${args.markdownContent}
        `,
        providerOptions: {
          openai: {
            structuredOutputs: true,
          },
        },
      })

      console.log('Structured data generated successfully')
      return {
        structuredData: object,
        success: true,
      }
    } catch (error) {
      console.error('Error generating structured data:', error)
      return { structuredData: null, success: false }
    }
  },
})
