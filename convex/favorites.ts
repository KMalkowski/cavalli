import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

export const getUserFavorites = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return [];

    const favorites = await ctx.db
      .query("favorites")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();

    const horses = await Promise.all(
      favorites.map(async (favorite) => {
        const horse = await ctx.db.get(favorite.horseId);
        if (!horse) return null;
        
        const owner = await ctx.db.get(horse.ownerId);
        return {
          ...horse,
          owner: owner ? { name: owner.name, email: owner.email } : null,
        };
      })
    );

    return horses.filter(Boolean);
  },
});

export const isFavorite = query({
  args: { horseId: v.id("horses") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return false;

    const favorite = await ctx.db
      .query("favorites")
      .withIndex("by_user_and_horse", (q) => 
        q.eq("userId", userId).eq("horseId", args.horseId)
      )
      .unique();

    return !!favorite;
  },
});

export const toggle = mutation({
  args: { horseId: v.id("horses") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Must be authenticated to favorite horses");
    }

    const existing = await ctx.db
      .query("favorites")
      .withIndex("by_user_and_horse", (q) => 
        q.eq("userId", userId).eq("horseId", args.horseId)
      )
      .unique();

    if (existing) {
      await ctx.db.delete(existing._id);
      return false;
    } else {
      await ctx.db.insert("favorites", {
        userId,
        horseId: args.horseId,
      });
      return true;
    }
  },
});
