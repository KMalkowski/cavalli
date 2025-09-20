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
    location: v.string(),
    imageUrl: v.optional(v.string()),
    ownerId: v.id("users"),
    isAvailable: v.boolean(),
  })
    .index("by_owner", ["ownerId"])
    .index("by_breed", ["breed"])
    .index("by_price", ["price"])
    .index("by_height", ["height"])
    .index("by_available", ["isAvailable"]),

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
};

export default defineSchema({
  ...authTables,
  ...applicationTables,
});
