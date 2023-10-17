import { mutation } from "./_generated/server";
import {} from "./_generated/dataModel";
import { v } from "convex/values";

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
