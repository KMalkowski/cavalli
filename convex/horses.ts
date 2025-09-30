import { query, mutation } from './_generated/server'
import { v } from 'convex/values'
import { paginationOptsValidator } from 'convex/server'
import { authComponent } from './auth'

// Validator for horse data from LLM scraping
const horseDataValidator = v.object({
  // Basic horse information
  name: v.string(),
  breed: v.optional(v.string()),
  age: v.optional(v.number()),
  height: v.optional(v.number()),
  gender: v.optional(v.string()),
  color: v.optional(v.string()),

  // Pricing and availability
  price: v.number(),
  currency: v.optional(v.string()),
  isAvailable: v.optional(v.boolean()),

  // Location information
  location: v.optional(v.string()),
  country: v.optional(v.string()),
  region: v.optional(v.string()),
  city: v.optional(v.string()),
  coordinates: v.optional(
    v.object({
      lat: v.number(),
      lng: v.number(),
    })
  ),

  // Horse details
  purpose: v.optional(v.string()),
  disciplines: v.optional(v.array(v.string())),
  trainingLevel: v.optional(v.string()),
  healthStatus: v.optional(
    v.union(
      v.literal('zdrowy'),
      v.literal('chory'),
      v.literal('kontuzjowany'),
      v.literal('niejezdny'),
      v.literal('nieznany')
    )
  ),

  // Pedigree information
  father: v.optional(v.string()),
  mother: v.optional(v.string()),
  pedigree: v.optional(v.string()),
  registrationNumber: v.optional(v.string()),

  // Source and listing information
  sourceUrl: v.string(),
  sourceName: v.optional(v.string()),
  sourceListingId: v.optional(v.string()),

  // Media and descriptions
  description: v.string(),
  imageUrl: v.optional(v.string()),

  // Technical fields
  hasTUV: v.optional(v.boolean()),

  // SEO fields
  seoTitle: v.optional(v.string()),
  seoDescription: v.optional(v.string()),

  // Additional extracted data
  negotiable: v.optional(v.boolean()),
  datePosted: v.optional(v.string()),
  contactInfo: v.optional(
    v.object({
      phone: v.optional(v.string()),
      email: v.optional(v.string()),
      name: v.optional(v.string()),
    })
  ),
  features: v.optional(v.array(v.string())),
  images: v.optional(v.array(v.string())),
})

export const list = query({
  args: {
    paginationOpts: paginationOptsValidator,
    breed: v.optional(v.string()),
    breeds: v.optional(v.array(v.string())),
    genders: v.optional(v.array(v.string())),
    purposes: v.optional(v.array(v.string())),
    healthStatuses: v.optional(v.array(v.string())),
    trainingLevels: v.optional(v.array(v.string())),
    minPrice: v.optional(v.number()),
    maxPrice: v.optional(v.number()),
    minHeight: v.optional(v.number()),
    maxHeight: v.optional(v.number()),
    minAge: v.optional(v.number()),
    maxAge: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    let query = ctx.db
      .query('horses')
      .withIndex('by_available', (q) => q.eq('isAvailable', true))

    // Apply filters
    const horses = await query.collect()

    let filteredHorses = horses

    if (args.breed) {
      filteredHorses = filteredHorses.filter(
        (horse) => horse.breed === args.breed
      )
    }

    if (args.minPrice !== undefined) {
      filteredHorses = filteredHorses.filter(
        (horse) => horse.price >= args.minPrice!
      )
    }

    if (args.maxPrice !== undefined) {
      filteredHorses = filteredHorses.filter(
        (horse) => horse.price <= args.maxPrice!
      )
    }

    if (args.minHeight !== undefined) {
      filteredHorses = filteredHorses.filter(
        (horse) => horse.height && horse.height >= args.minHeight!
      )
    }

    if (args.maxHeight !== undefined) {
      filteredHorses = filteredHorses.filter(
        (horse) => horse.height && horse.height <= args.maxHeight!
      )
    }

    if (args.breeds && args.breeds.length > 0) {
      filteredHorses = filteredHorses.filter(
        (horse) => horse.breed && args.breeds!.includes(horse.breed)
      )
    }

    if (args.genders && args.genders.length > 0) {
      filteredHorses = filteredHorses.filter(
        (horse) => horse.gender && args.genders!.includes(horse.gender)
      )
    }

    if (args.purposes && args.purposes.length > 0) {
      filteredHorses = filteredHorses.filter(
        (horse) => horse.purpose && args.purposes!.includes(horse.purpose)
      )
    }

    if (args.healthStatuses && args.healthStatuses.length > 0) {
      filteredHorses = filteredHorses.filter(
        (horse) =>
          horse.healthStatus &&
          args.healthStatuses!.includes(horse.healthStatus)
      )
    }

    if (args.trainingLevels && args.trainingLevels.length > 0) {
      filteredHorses = filteredHorses.filter(
        (horse) =>
          horse.trainingLevel &&
          args.trainingLevels!.includes(horse.trainingLevel)
      )
    }

    if (args.minAge !== undefined) {
      filteredHorses = filteredHorses.filter(
        (horse) => horse.age && horse.age >= args.minAge!
      )
    }

    if (args.maxAge !== undefined) {
      filteredHorses = filteredHorses.filter(
        (horse) => horse.age && horse.age <= args.maxAge!
      )
    }

    filteredHorses.sort((a, b) => b._creationTime - a._creationTime)

    const { numItems, cursor } = args.paginationOpts
    const startIndex = cursor ? parseInt(cursor) : 0
    const endIndex = startIndex + numItems
    const page = filteredHorses.slice(startIndex, endIndex)

    const isDone = endIndex >= filteredHorses.length
    const continueCursor = isDone ? null : endIndex.toString()

    return {
      page,
      isDone,
      continueCursor,
    }
  },
})

export const getById = query({
  args: { id: v.id('horses') },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id)
  },
})

export const getImages = query({
  args: { horseId: v.id('horses') },
  returns: v.array(
    v.object({
      _id: v.id('horseImages'),
      _creationTime: v.number(),
      horseId: v.id('horses'),
      imageUrl: v.string(),
      isPrimary: v.boolean(),
      altText: v.optional(v.string()),
    })
  ),
  handler: async (ctx, args) => {
    return await ctx.db
      .query('horseImages')
      .withIndex('by_horse', (q) => q.eq('horseId', args.horseId))
      .order('asc')
      .collect()
  },
})

export const migrateExistingImages = mutation({
  args: {},
  returns: v.string(),
  handler: async (ctx) => {
    // Get all horses that have imageUrl but no entries in horseImages
    const horses = await ctx.db.query('horses').collect()
    let migratedCount = 0

    for (const horse of horses) {
      if (horse.imageUrl) {
        // Check if this horse already has images in horseImages table
        const existingImages = await ctx.db
          .query('horseImages')
          .withIndex('by_horse', (q) => q.eq('horseId', horse._id))
          .collect()

        // Only migrate if no images exist in horseImages table
        if (existingImages.length === 0) {
          await ctx.db.insert('horseImages', {
            horseId: horse._id,
            imageUrl: horse.imageUrl,
            isPrimary: true,
            altText: `${horse.name} - główne zdjęcie`,
          })
          migratedCount++
        }
      }
    }

    return `Migrated ${migratedCount} horses' images to horseImages table`
  },
})

export const getBreeds = query({
  args: {},
  handler: async (ctx) => {
    const horses = await ctx.db.query('horses').collect()
    const breeds = [...new Set(horses.map((horse) => horse.breed))]
    return breeds.sort()
  },
})

export const create = mutation({
  args: {
    name: v.string(),
    breed: v.string(),
    age: v.number(),
    height: v.number(),
    price: v.number(),
    currency: v.string(),
    description: v.string(),
    location: v.string(),
    imageUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity()
    if (!user?.email) {
      throw new Error('Must be authenticated to create a listing')
    }

    return await ctx.db.insert('horses', {
      ...args,
      ownerEmail: user.email,
      isAvailable: true,
      currency: args.currency,
      hasTUV: false,
    })
  },
})

export const getUserListings = query({
  args: {},
  handler: async (ctx) => {
    const user = await authComponent.getAuthUser(ctx)
    const userId = user?._id

    if (!userId) return []

    return await ctx.db
      .query('horses')
      .withIndex('by_owner', (q) => q.eq('ownerEmail', userId))
      .collect()
  },
})

export const saveFromScraping = mutation({
  args: {
    horseData: horseDataValidator, // Structured data from LLM with proper validation
  },
  returns: v.id('horses'),
  handler: async (ctx, args) => {
    console.log('Saving scraped horse to database:', args.horseData.name)

    // Extract source listing ID from URL
    const sourceListingId =
      args.horseData.sourceUrl?.match(/ID([^\.]+)/)?.[1] ||
      args.horseData.sourceListingId

    // Extract image URL from images array or use single imageUrl
    const imageUrl = args.horseData.images?.[0] || args.horseData.imageUrl

    // Prepare horse data for database
    const horseRecord = {
      name: args.horseData.name,
      breed: args.horseData.breed,
      age: args.horseData.age,
      height: args.horseData.height,
      gender: args.horseData.gender,
      color: args.horseData.color,
      price: args.horseData.price,
      currency: args.horseData.currency || 'PLN',
      isAvailable: args.horseData.isAvailable ?? true,
      location: args.horseData.location,
      country: args.horseData.country || 'Polska',
      region: args.horseData.region,
      city: args.horseData.city,
      coordinates: args.horseData.coordinates,
      purpose: args.horseData.purpose,
      disciplines: args.horseData.disciplines,
      trainingLevel: args.horseData.trainingLevel,
      healthStatus: args.horseData.healthStatus,
      father: args.horseData.father,
      mother: args.horseData.mother,
      pedigree: args.horseData.pedigree,
      registrationNumber: args.horseData.registrationNumber,
      sourceUrl: args.horseData.sourceUrl,
      sourceName: args.horseData.sourceName || 'OLX',
      sourceListingId: sourceListingId,
      description: args.horseData.description,
      imageUrl: imageUrl,
      hasTUV: args.horseData.hasTUV ?? false,
      seoTitle: args.horseData.seoTitle,
      seoDescription: args.horseData.seoDescription,
    }

    try {
      const horseId = await ctx.db.insert('horses', horseRecord)
      console.log('Scraped horse saved successfully with ID:', horseId)

      // Save all images to horseImages table
      const allImages = args.horseData.images || []
      if (
        args.horseData.imageUrl &&
        !allImages.includes(args.horseData.imageUrl)
      ) {
        allImages.unshift(args.horseData.imageUrl) // Add single imageUrl if not in images array
      }

      for (let i = 0; i < allImages.length; i++) {
        const imageUrl = allImages[i]
        if (imageUrl) {
          await ctx.db.insert('horseImages', {
            horseId: horseId,
            imageUrl: imageUrl,
            isPrimary: i === 0, // First image is primary
            altText: `${args.horseData.name} - zdjęcie ${i + 1}`,
          })
        }
      }

      console.log(`Saved ${allImages.length} images for horse:`, horseId)

      return horseId
    } catch (error) {
      console.error('Error saving scraped horse to database:', error)
      throw new Error(`Failed to save scraped horse to database: ${error}`)
    }
  },
})
