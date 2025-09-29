'use node'

import { action, mutation } from './_generated/server'
import { v } from 'convex/values'
import { generateObject } from 'ai'
import { openai } from '@ai-sdk/openai'
import { z } from 'zod'

// Zod schema for horse offer data - matching the database schema
const horseOfferSchema = z.object({
  // Basic horse information
  name: z.string().describe('Nazwa/tytuł konia'),
  breed: z.string().optional().describe('Rasa konia'),
  age: z.number().optional().describe('Wiek konia w latach'),
  height: z.number().optional().describe('Wysokość konia w cm'),
  gender: z
    .string()
    .optional()
    .describe('Płeć konia (Ogier/Klacz/Wałach/Źrebak/Źrebica)'),
  color: z.string().optional().describe('Maść konia'),

  // Pricing and availability
  price: z.number().describe('Cena w złotych'),
  currency: z.string().default('PLN').describe('Waluta'),
  isAvailable: z.boolean().default(true).describe('Czy koń jest dostępny'),

  // Location information
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
  trainingLevel: z.string().optional().describe('Poziom wyszkolenia'),
  healthStatus: z
    .enum(['healthy', 'injured', 'unrideable', 'unknown'])
    .optional()
    .describe('Stan zdrowia'),

  // Pedigree information
  father: z.string().optional().describe('Ojciec konia'),
  mother: z.string().optional().describe('Matka konia'),
  pedigree: z.string().optional().describe('Rodowód'),
  registrationNumber: z.string().optional().describe('Numer rejestracyjny'),

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
  returns: v.any(),
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
  returns: v.any(),
  handler: async (ctx, args) => {
    console.log('Generating structured data for offer:', args.offerUrl)

    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) {
      throw new Error('Missing OPENAI_API_KEY env var in Convex')
    }

    try {
      const { object } = await generateObject({
        model: openai('gpt-4o'),
        schema: horseOfferSchema,
        prompt: `Przeanalizuj poniższą treść ogłoszenia o sprzedaży konia z OLX i wyciągnij z niej wszystkie istotne informacje zgodnie ze schematem bazy danych.

        Treść ogłoszenia (markdown):
        ${args.markdownContent}
        
        URL ogłoszenia: ${args.offerUrl}
        
        INSTRUKCJE WYCIĄGANIA DANYCH:
        
        PODSTAWOWE INFORMACJE:
        - name: tytuł/nazwa konia z ogłoszenia
        - breed: rasa konia (np. "Arabski", "Fryzyjski", "Śląski", "Zimnokrwisty")
        - age: wiek w latach (tylko liczba)
        - height: wysokość w cm (tylko liczba)
        - gender: płeć - Ogier/Klacz/Wałach
        - color: maść konia (np. "kasztanowy", "siwy", "gniady")
        
        CENY I DOSTĘPNOŚĆ:
        - price: cena w złotych (tylko liczba)
        - currency: "PLN"
        - isAvailable: true (domyślnie)
        - negotiable: true jeśli jest "do negocjacji"
        
        LOKALIZACJA:
        - city: miasto
        - region: województwo
        - country: "Polska" (domyślnie)
        - location: ogólny opis lokalizacji
        
        SZCZEGÓŁY KONIA:
        - purpose: przeznaczenie (sportowy/rekreacyjny/roboczy/zaprzęgowy)
        - disciplines: dyscypliny sportowe (skoki/ujeżdżenie/rajdy)
        - trainingLevel: poziom wyszkolenia
        - healthStatus: zdrowy/ranny/niezdatny do jazdy/nieznany
        - hasTUV: czy ma badania (true/false)
        
        RODOWÓD:
        - father: imię ojca jeśli podane
        - mother: imię matki jeśli podane
        - pedigree: informacje o rodowodzie
        - registrationNumber: numer rejestracyjny
        
        ŹRÓDŁO:
        - sourceUrl: URL ogłoszenia
        - sourceName: "OLX"
        - sourceListingId: wyciągnij ID z URL-a
        
        MEDIA I OPISY:
        - description: pełny opis konia
        - imageUrl: główne zdjęcie (pierwsze)
        - images: wszystkie URL-e zdjęć
        
        SEO:
        - seoTitle: tytuł SEO (może być taki sam jak name)
        - seoDescription: krótki opis SEO
        
        DODATKOWE:
        - contactInfo: informacje kontaktowe jeśli dostępne
        - features: dodatkowe cechy konia
        - datePosted: data dodania ogłoszenia
        
        WAŻNE: Jeśli informacja nie jest dostępna, pozostaw pole puste lub użyj wartości domyślnych.
        `,
      })

      console.log('Structured data generated successfully')
      return {
        structuredData: object,
        success: true,
      }
    } catch (error) {
      console.error('Error generating structured data:', error)
      throw new Error(`Failed to generate structured data: ${error}`)
    }
  },
})
