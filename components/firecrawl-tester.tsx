'use client'

import { useAction, useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { Button } from '@/components/ui/button'

export default function FirecrawlTester() {
  const fetchTestData = useAction(api.firecrawl.fetchTestData)
  const scrapeOfferDetails = useAction(api.firecrawl.scrapeOfferDetails)
  const generateStructuredData = useAction(api.firecrawl.generateStructuredData)
  const saveFromScraping = useMutation(api.horses.saveFromScraping)

  const onRun = async () => {
    try {
      // Scrape the horse listings from OLX
      const url =
        'https://www.olx.pl/zwierzeta/konie/?page=2&search%5Border%5D=created_at%3Adesc'
      const data = await fetchTestData({ url })

      // Log the extracted offer URLs
      if (data?.offerUrls && data.offerUrls.length > 0) {
        console.log('Total offers found:', data.totalOffers)

        // Scrape the first offer URL
        const firstOfferUrl = data.offerUrls[0]
        console.log('Scraping first offer:', firstOfferUrl)

        const offerDetails = await scrapeOfferDetails({
          offerUrl: firstOfferUrl,
        })

        // Generate structured data from the markdown content
        console.log('Generating structured data...')
        const structuredData = await generateStructuredData({
          markdownContent: offerDetails.markdownContent,
          offerUrl: firstOfferUrl,
        })

        console.log('Structured data:', structuredData.structuredData)

        // Save structured data to database
        console.log('Saving to database...')
        const horseId = await saveFromScraping({
          horseData: structuredData.structuredData,
        })

        console.log('Horse saved to database with ID:', horseId)
      }
    } catch (e: any) {
      console.error('Scrape error:', e)
    }
  }

  return (
    <div className="my-6 space-y-2">
      <Button onClick={onRun}>Scrape OLX Horse Listings</Button>
    </div>
  )
}
