import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

export const getOrCreateConversation = mutation({
  args: { 
    horseId: v.id("horses"),
    otherUserId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Must be authenticated to start a conversation");
    }

    // Check if conversation already exists
    const conversations = await ctx.db
      .query("conversations")
      .withIndex("by_horse", (q) => q.eq("horseId", args.horseId))
      .collect();

    const existingConversation = conversations.find(conv => 
      (conv.participantIds.includes(userId) && conv.participantIds.includes(args.otherUserId))
    );

    if (existingConversation) {
      return existingConversation._id;
    }

    // Create new conversation
    return await ctx.db.insert("conversations", {
      participantIds: [userId, args.otherUserId],
      horseId: args.horseId,
    });
  },
});

export const getUserConversations = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return [];

    const allConversations = await ctx.db.query("conversations").collect();
    const conversations = allConversations.filter(conv => 
      conv.participantIds.includes(userId)
    );

    const conversationsWithDetails = await Promise.all(
      conversations.map(async (conversation) => {
        const horse = await ctx.db.get(conversation.horseId);
        const otherUserId = conversation.participantIds.find(id => id !== userId);
        const otherUser = otherUserId ? await ctx.db.get(otherUserId) : null;
        
        const lastMessage = await ctx.db
          .query("messages")
          .withIndex("by_conversation", (q) => q.eq("conversationId", conversation._id))
          .order("desc")
          .first();

        return {
          ...conversation,
          horse,
          otherUser,
          lastMessage,
        };
      })
    );

    return conversationsWithDetails.sort((a, b) => 
      (b.lastMessage?._creationTime || b._creationTime) - 
      (a.lastMessage?._creationTime || a._creationTime)
    );
  },
});

export const getMessages = query({
  args: { conversationId: v.id("conversations") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return [];

    // Verify user is part of this conversation
    const conversation = await ctx.db.get(args.conversationId);
    if (!conversation || !conversation.participantIds.includes(userId)) {
      throw new Error("Not authorized to view this conversation");
    }

    const messages = await ctx.db
      .query("messages")
      .withIndex("by_conversation", (q) => q.eq("conversationId", args.conversationId))
      .order("asc")
      .collect();

    const messagesWithSenders = await Promise.all(
      messages.map(async (message) => {
        const sender = await ctx.db.get(message.senderId);
        return {
          ...message,
          sender,
        };
      })
    );

    return messagesWithSenders;
  },
});

export const sendMessage = mutation({
  args: {
    conversationId: v.id("conversations"),
    content: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Must be authenticated to send messages");
    }

    // Verify user is part of this conversation
    const conversation = await ctx.db.get(args.conversationId);
    if (!conversation || !conversation.participantIds.includes(userId)) {
      throw new Error("Not authorized to send messages in this conversation");
    }

    const timestamp = Date.now();

    // Insert message
    await ctx.db.insert("messages", {
      conversationId: args.conversationId,
      senderId: userId,
      content: args.content,
      timestamp,
    });

    // Update conversation's last message time
    await ctx.db.patch(args.conversationId, {
      lastMessageTime: timestamp,
    });
  },
});
