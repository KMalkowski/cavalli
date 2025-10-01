import {
  query,
  mutation,
  internalQuery,
  internalMutation,
} from './_generated/server'
import { v } from 'convex/values'
import { paginationOptsValidator } from 'convex/server'
import { authComponent } from './auth'
import { Doc } from './_generated/dataModel'

// Validator for horse data from LLM scraping
const horseDataValidator = v.object({
  // Basic horse information
  type: v.union(v.literal('horse'), v.literal('something else')),
  name: v.string(),
  breed: v.optional(v.union(v.string(), v.null())),
  age: v.optional(v.union(v.number(), v.null())),
  height: v.optional(v.union(v.number(), v.null())),
  gender: v.optional(v.union(v.string(), v.null())),
  color: v.optional(v.union(v.string(), v.null())),

  // Pricing and availability
  price: v.number(),
  currency: v.optional(v.union(v.string(), v.null())),
  isAvailable: v.optional(v.union(v.boolean(), v.null())),

  // Location information
  location: v.optional(v.union(v.string(), v.null())),
  country: v.optional(v.union(v.string(), v.null())),
  region: v.optional(v.union(v.string(), v.null())),
  city: v.optional(v.union(v.string(), v.null())),
  coordinates: v.optional(
    v.union(
      v.object({
        lat: v.number(),
        lng: v.number(),
      }),
      v.null()
    )
  ),

  // Horse details
  purpose: v.optional(v.union(v.string(), v.null())),
  disciplines: v.optional(v.union(v.array(v.string()), v.null())),
  trainingLevel: v.optional(v.union(v.string(), v.null())),
  healthStatus: v.optional(v.union(v.string(), v.null())),

  // Pedigree information
  father: v.optional(v.union(v.string(), v.null())),
  mother: v.optional(v.union(v.string(), v.null())),
  pedigree: v.optional(v.union(v.string(), v.null())),
  registrationNumber: v.optional(v.union(v.string(), v.null())),

  // Source and listing information
  sourceUrl: v.string(),
  sourceName: v.optional(v.union(v.string(), v.null())),
  sourceListingId: v.optional(v.union(v.string(), v.null())),

  // Media and descriptions
  description: v.string(),
  imageUrl: v.optional(v.union(v.string(), v.null())),

  // Technical fields
  hasTUV: v.optional(v.union(v.boolean(), v.null())),

  // SEO fields
  seoTitle: v.optional(v.union(v.string(), v.null())),
  seoDescription: v.optional(v.union(v.string(), v.null())),

  // Additional extracted data
  datePosted: v.optional(v.union(v.string(), v.null())),
  contactInfo: v.optional(
    v.union(
      v.object({
        phone: v.optional(v.union(v.string(), v.null())),
        email: v.optional(v.union(v.string(), v.null())),
        name: v.optional(v.union(v.string(), v.null())),
      }),
      v.null()
    )
  ),
  features: v.optional(v.union(v.array(v.string()), v.null())),
  images: v.optional(v.union(v.array(v.string()), v.null())),
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
    let query = ctx.db.query('horses')

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

export const getBySourceUrl = internalQuery({
  args: { sourceUrl: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query('horses')
      .withIndex('by_sourceUrl', (q) => q.eq('sourceUrl', args.sourceUrl))
      .first()
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

    return await ctx.db.query('horses').collect()
  },
})

export const saveFromScraping = internalMutation({
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

    // Prepare horse data for database, filtering out null values
    const horseRecord: Omit<Doc<'horses'>, '_id' | '_creationTime'> = {
      name: args.horseData.name,
      price: args.horseData.price,
      currency: args.horseData.currency ?? 'PLN',
      isAvailable: args.horseData.isAvailable ?? true,
      country: args.horseData.country ?? 'Polska',
      sourceUrl: args.horseData.sourceUrl,
      sourceName: args.horseData.sourceName ?? 'OLX',
      description: args.horseData.description,
      hasTUV: args.horseData.hasTUV ?? false,
    }

    // Add optional fields only if they're not null
    if (args.horseData.breed !== null) horseRecord.breed = args.horseData.breed
    if (args.horseData.age !== null) horseRecord.age = args.horseData.age
    if (args.horseData.height !== null)
      horseRecord.height = args.horseData.height
    if (args.horseData.gender !== null)
      horseRecord.gender = args.horseData.gender
    if (args.horseData.color !== null) horseRecord.color = args.horseData.color
    if (args.horseData.location !== null)
      horseRecord.location = args.horseData.location
    if (args.horseData.region !== null)
      horseRecord.region = args.horseData.region
    if (args.horseData.city !== null) horseRecord.city = args.horseData.city
    if (args.horseData.coordinates !== null)
      horseRecord.coordinates = args.horseData.coordinates
    if (args.horseData.purpose !== null)
      horseRecord.purpose = args.horseData.purpose
    if (args.horseData.disciplines !== null)
      horseRecord.disciplines = args.horseData.disciplines
    if (args.horseData.trainingLevel !== null)
      horseRecord.trainingLevel = args.horseData.trainingLevel
    if (args.horseData.healthStatus !== null)
      horseRecord.healthStatus = args.horseData.healthStatus
    if (args.horseData.father !== null)
      horseRecord.father = args.horseData.father
    if (args.horseData.mother !== null)
      horseRecord.mother = args.horseData.mother
    if (args.horseData.pedigree !== null)
      horseRecord.pedigree = args.horseData.pedigree
    if (args.horseData.registrationNumber !== null)
      horseRecord.registrationNumber = args.horseData.registrationNumber
    if (sourceListingId !== null) horseRecord.sourceListingId = sourceListingId
    if (imageUrl !== null) horseRecord.imageUrl = imageUrl
    if (args.horseData.seoTitle !== null)
      horseRecord.seoTitle = args.horseData.seoTitle
    if (args.horseData.seoDescription !== null)
      horseRecord.seoDescription = args.horseData.seoDescription

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
