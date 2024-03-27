import * as db from "../../utils/database";
import {Bookmark, Resolvers} from "../../../graphql_types";
import {auth} from "firebase-admin";

export const collectionName = "bookmarks";

export const typeDef = `
  extend type Query {
    bookmarks: [Bookmark]
    bookmark(id: String!): Bookmark
    userBookmarks(userId: String!): [Bookmark]
  }

  extend type Mutation {
    addBookmark(bookmark: BookmarkInput!): Bookmark
    updateBookmark(bookmark: BookmarkInput!): Bookmark
    deleteBookmark(id: String!): Bookmark
  }

  extend type Bookmark {
    id: ID!
    userId: String!
    lessonId: String
    courseId: String
    lastUpdated: String
    createdAt: String
  }

  input BookmarkInput {
    id: ID
    userId: String!
    lessonId: String
    courseId: String
  }
`;

export const resolvers: Resolvers = {
  Query: {
    bookmarks: async () => {
      return await db.getList(collectionName) as [Bookmark];
    },
    bookmark: async (_, args) => {
      return await db.getItem(collectionName, args.id) as Bookmark;
    },
    userBookmarks: async (_, args) => {
      return await db.getList(collectionName, [
        {field: "userId", operator: "==", value: args.userId},
      ]) as [Bookmark];
    },
  },
  Mutation: {
    addBookmark: async (_, args, context) => {
      const user = await auth().verifyIdToken(context.token);
      const bookmark = args.bookmark as Bookmark;
      bookmark.userId = user.uid;
      return await db.createItem(
        collectionName,
        {
          ...bookmark,
          createdAt: db.Timestamp.now(), lastUpdated: db.Timestamp.now(),
        }
      ) as Bookmark;
    },
    updateBookmark: async (_, args) => {
      return db.setItem(
        collectionName,
        args.bookmark.id as string,
        {...args.bookmark, lastUpdated: db.Timestamp.now()},
      ) as unknown as Bookmark;
    },
  },
};
