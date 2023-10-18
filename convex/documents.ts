import { mutation, query } from "./_generated/server";
import { Id } from "./_generated/dataModel";
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

// end point for archiving a note
export const archive = mutation({
  args: { id: v.id("documents") }, // the id of the note(document) user wants to archive
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();

    // throw error if user does not exist
    if (!user) {
      throw new Error("Not authenticated");
    }

    const userId = user.subject;

    // get is used for reading single item
    // fetch the data of the id from argument
    const existingDocument = await ctx.db.get(args.id);

    if (!existingDocument) {
      throw new Error("Not found");
    }

    // check if the note belongs to the user who tried deleting
    if (existingDocument.userId !== userId) {
      throw new Error("Unauthorized");
    }

    // for deleting all the children notes
    const recursiveArchive = async (documentId: Id<"documents">) => {
      // get all the notes with the same parent documentId
      const children = await ctx.db
        .query("documents")
        .withIndex("by_user_parent", (q) =>
          // only documents with matching userId and parent documentId
          q.eq("userId", userId).eq("parentDocument", documentId)
        )
        .collect();

      // loop through the result
      for (const child of children) {
        // and set isArchived to true for every children document
        await ctx.db.patch(child._id, {
          isArchived: true,
        });

        // rerun the function since the child notes may have their own child notes
        await recursiveArchive(child._id);
      }
    };

    // update the existing document with patch method
    // set isArchived to true for the main document passed from the argument
    const document = await ctx.db.patch(args.id, {
      isArchived: true,
    });
    // call the function to handle the child notes before returning the result
    recursiveArchive(args.id);

    return document;
  },
});
