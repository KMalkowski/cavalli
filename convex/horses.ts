import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";
import { paginationOptsValidator } from "convex/server";

export const list = query({
  args: {
    paginationOpts: paginationOptsValidator,
    breed: v.optional(v.string()),
    minPrice: v.optional(v.number()),
    maxPrice: v.optional(v.number()),
    minHeight: v.optional(v.number()),
    maxHeight: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    let query = ctx.db.query("horses").withIndex("by_available", (q) => q.eq("isAvailable", true));

    // Apply filters
    const horses = await query.collect();
    
    let filteredHorses = horses;
    
    if (args.breed) {
      filteredHorses = filteredHorses.filter(horse => horse.breed === args.breed);
    }
    
    if (args.minPrice !== undefined) {
      filteredHorses = filteredHorses.filter(horse => horse.price >= args.minPrice!);
    }
    
    if (args.maxPrice !== undefined) {
      filteredHorses = filteredHorses.filter(horse => horse.price <= args.maxPrice!);
    }
    
    if (args.minHeight !== undefined) {
      filteredHorses = filteredHorses.filter(horse => horse.height >= args.minHeight!);
    }
    
    if (args.maxHeight !== undefined) {
      filteredHorses = filteredHorses.filter(horse => horse.height <= args.maxHeight!);
    }

    // Sort by creation time (newest first)
    filteredHorses.sort((a, b) => b._creationTime - a._creationTime);

    // Manual pagination
    const { numItems, cursor } = args.paginationOpts;
    const startIndex = cursor ? parseInt(cursor) : 0;
    const endIndex = startIndex + numItems;
    const page = filteredHorses.slice(startIndex, endIndex);
    
    const isDone = endIndex >= filteredHorses.length;
    const continueCursor = isDone ? null : endIndex.toString();

    // Get owner information for each horse
    const horsesWithOwners = await Promise.all(
      page.map(async (horse) => {
        const owner = await ctx.db.get(horse.ownerId);
        return {
          ...horse,
          owner: owner ? { name: owner.name, email: owner.email } : null,
        };
      })
    );

    return {
      page: horsesWithOwners,
      isDone,
      continueCursor,
    };
  },
});

export const getById = query({
  args: { id: v.id("horses") },
  handler: async (ctx, args) => {
    const horse = await ctx.db.get(args.id);
    if (!horse) return null;

    const owner = await ctx.db.get(horse.ownerId);
    return {
      ...horse,
      owner: owner ? { name: owner.name, email: owner.email } : null,
    };
  },
});

export const getBreeds = query({
  args: {},
  handler: async (ctx) => {
    const horses = await ctx.db.query("horses").collect();
    const breeds = [...new Set(horses.map(horse => horse.breed))];
    return breeds.sort();
  },
});

export const create = mutation({
  args: {
    name: v.string(),
    breed: v.string(),
    age: v.number(),
    height: v.number(),
    price: v.number(),
    description: v.string(),
    location: v.string(),
    imageUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Must be authenticated to create a listing");
    }

    return await ctx.db.insert("horses", {
      ...args,
      ownerId: userId,
      isAvailable: true,
    });
  },
});

export const getUserListings = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return [];

    return await ctx.db
      .query("horses")
      .withIndex("by_owner", (q) => q.eq("ownerId", userId))
      .collect();
  },
});
