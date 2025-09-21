import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

const applicationTables = {
  horses: defineTable({
    name: v.string(),
    breed: v.string(),
    age: v.number(),
    height: v.number(),
    gender: v.string(),
    color: v.string(),
    sourceUrl: v.optional(v.string()),
    sourceName: v.optional(v.string()),
    purpose: v.string(),
    price: v.number(),
    currency: v.string(),
    description: v.string(),
    imageUrl: v.optional(v.string()),
    ownerId: v.id("users"),
    isAvailable: v.boolean(),
    hasTUV: v.boolean(),
    sourceListingId: v.optional(v.string()),
    scrapedAt: v.number(),
    lastSeenAt: v.number(),
    scrapeStatus: v.union(
      v.literal("active"),
      v.literal("expired"),
      v.literal("removed"),
      v.literal("sold"),
    ),
    location: v.string(),
    country: v.string(),
    region: v.string(),
    city: v.string(),
    coordinates: v.optional(
      v.object({
        lat: v.number(),
        lng: v.number(),
      }),
    ),
    disciplines: v.optional(v.array(v.string())),
    trainingLevel: v.optional(v.string()),
    healthStatus: v.optional(
      v.union(
        v.literal("healthy"),
        v.literal("injured"),
        v.literal("unrideable"),
        v.literal("unknown"),
      ),
    ),
    father: v.optional(v.string()),
    mother: v.optional(v.string()),
    pedigree: v.optional(v.string()),
    registrationNumber: v.optional(v.string()),
    seoTitle: v.optional(v.string()),
    seoDescription: v.optional(v.string()),
  })
    .index("by_owner", ["ownerId"])
    .index("by_breed", ["breed"])
    .index("by_price", ["price"])
    .index("by_height", ["height"])
    .index("by_available", ["isAvailable"])
    .index("by_scrape_status", ["scrapeStatus"])
    .index("by_region", ["region"])
    .index("by_city", ["city"])
    .index("by_breed_and_price", ["breed", "price"])
    .index("by_source", ["sourceName"])
    .searchIndex("search_description", {
      searchField: "description",
      filterFields: ["breed", "region", "isAvailable"],
    }),

  favorites: defineTable({
    userId: v.id("users"),
    horseId: v.id("horses"),
  })
    .index("by_user", ["userId"])
    .index("by_horse", ["horseId"])
    .index("by_user_and_horse", ["userId", "horseId"]),

  conversations: defineTable({
    participantIds: v.array(v.id("users")),
    horseId: v.id("horses"),
    lastMessageTime: v.optional(v.number()),
  }).index("by_horse", ["horseId"]),

  messages: defineTable({
    conversationId: v.id("conversations"),
    senderId: v.id("users"),
    content: v.string(),
    timestamp: v.number(),
  })
    .index("by_conversation", ["conversationId"])
    .index("by_sender", ["senderId"]),

  scrapingSources: defineTable({
    name: v.string(),
    baseUrl: v.string(),
    isActive: v.boolean(),
    scrapeFrequency: v.number(),
    lastScrapedAt: v.optional(v.number()),
    totalListings: v.number(),
  }).index("by_active", ["isActive"]),

  horseImages: defineTable({
    horseId: v.id("horses"),
    storageId: v.id("_storage"),
    isPrimary: v.boolean(),
    altText: v.optional(v.string()),
  }).index("by_horse", ["horseId"]),

  searchAnalytics: defineTable({
    query: v.string(),
    filters: v.record(v.string(), v.any()),
    resultCount: v.number(),
    timestamp: v.number(),
    userId: v.optional(v.id("users")),
  })
    .index("by_query", ["query"])
    .index("by_timestamp", ["timestamp"]),
};

export default defineSchema({
  ...authTables,
  ...applicationTables,
});
