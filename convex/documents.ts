import { mutation, query } from "./_generated/server";
import {} from "./_generated/dataModel";
import { v } from "convex/values";

// API end point for fetching documents
export const getDocument = query({
  args: { parentDocument: v.optional(v.id("documents")) },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity(); //returns an object with user details

    // throw error if user does not exist
    if (!user) {
      throw new Error("Not authenticated");
    }
    const userId = user.subject;
    // using the index created in schema
    // all of the documents in the table ordered by the current user and id of parent document if it exists
    // filter out documents that have been archived
    const documents = await ctx.db
      .query("documents")
      .withIndex("by_user_parent", (q) =>
        q.eq("userId", userId).eq("parentDocument", args.parentDocument)
      )
      .filter((q) => q.eq(q.field("isArchived"), false))
      .order("desc")
      .collect();

    return documents;
  },
});

export const create = mutation({
  // declare and validate arguments
  args: {
    title: v.string(),
    parentDocument: v.optional(v.id("documents")),
  },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity(); //returns an object with user details

    // throw error if user does not exist
    if (!user) {
      throw new Error("Not authenticated");
    }

    const userId = user.subject;

    // insert in the document table with value from arguments and other required fields
    const document = await ctx.db.insert("documents", {
      title: args.title,
      parentDocument: args.parentDocument,
      userId,
      isArchived: false,
      isPublished: false,
    });

    return document;
  },
});
