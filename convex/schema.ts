import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'
import { authTables } from '@convex-dev/auth/server'

const applicationTables = {
  horses: defineTable({
    name: v.string(),
    breed: v.optional(v.string()),
    age: v.optional(v.number()),
    height: v.optional(v.number()),
    gender: v.optional(v.string()),
    color: v.optional(v.string()),
    sourceUrl: v.optional(v.string()),
    sourceName: v.optional(v.string()),
    purpose: v.optional(v.string()),
    price: v.number(),
    currency: v.string(),
    description: v.string(),
    imageUrl: v.optional(v.string()),
    ownerEmail: v.optional(v.string()),
    isAvailable: v.boolean(),
    hasTUV: v.boolean(),
    sourceListingId: v.optional(v.string()),
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
    father: v.optional(v.string()),
    mother: v.optional(v.string()),
    pedigree: v.optional(v.string()),
    registrationNumber: v.optional(v.string()),
    seoTitle: v.optional(v.string()),
    seoDescription: v.optional(v.string()),
  })
    .index('by_owner', ['ownerEmail'])
    .index('by_breed', ['breed'])
    .index('by_price', ['price'])
    .index('by_height', ['height'])
    .index('by_available', ['isAvailable'])
    .index('by_region', ['region'])
    .index('by_city', ['city'])
    .index('by_breed_and_price', ['breed', 'price'])
    .index('by_source', ['sourceName'])
    .searchIndex('search_description', {
      searchField: 'description',
      filterFields: ['breed', 'region', 'isAvailable'],
    }),

  favorites: defineTable({
    userId: v.id('user'),
    horseId: v.id('horses'),
  })
    .index('by_user', ['userId'])
    .index('by_horse', ['horseId'])
    .index('by_user_and_horse', ['userId', 'horseId']),

  conversations: defineTable({
    participantIds: v.array(v.id('user')),
    horseId: v.id('horses'),
    lastMessageTime: v.optional(v.number()),
  }).index('by_horse', ['horseId']),

  messages: defineTable({
    conversationId: v.id('conversations'),
    senderId: v.id('user'),
    content: v.string(),
    timestamp: v.number(),
  })
    .index('by_conversation', ['conversationId'])
    .index('by_sender', ['senderId']),

  scrapingSources: defineTable({
    name: v.string(),
    baseUrl: v.string(),
    isActive: v.boolean(),
    scrapeFrequency: v.number(),
    lastScrapedAt: v.optional(v.number()),
    totalListings: v.number(),
  }).index('by_active', ['isActive']),

  horseImages: defineTable({
    horseId: v.id('horses'),
    imageUrl: v.string(),
    isPrimary: v.boolean(),
    altText: v.optional(v.string()),
  }).index('by_horse', ['horseId']),

  searchAnalytics: defineTable({
    query: v.string(),
    filters: v.record(v.string(), v.any()),
    resultCount: v.number(),
    timestamp: v.number(),
    userId: v.optional(v.id('user')),
  })
    .index('by_query', ['query'])
    .index('by_timestamp', ['timestamp']),
}

export default defineSchema({
  ...authTables,
  ...applicationTables,
})
