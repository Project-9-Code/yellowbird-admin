import * as db from "../../utils/database";
import {Course, Lesson, Resolvers, UserProfile} from "../../../graphql_types";
import {auth} from "firebase-admin";

export const userCollectionName = "users";

export const typeDef = /* GraphQL */`
  extend type Query {
    users: [UserProfile]
    user(userId: String!): UserProfile
    userExist(email: String!): Boolean
  }

  extend type Mutation {
    updateProfile(user: UserProfileInput!): UserProfile
  }

  extend type UserProfile {
    id: ID!
    name: String
    email: String
    isEmailVerified: Boolean
    profilePic: String
    shortBio: String
    phone: String
    businessName: String
    website: String
    monthlyProductUpdates: Boolean
    monthlyMetricsUpdates: Boolean
    courseBookmarks: [Course]
    courseBookmarkIds: [String]
    lessonBookmarks: [Lesson]
    lessonBookmarkIds: [String]
  }

  input UserProfileInput {
    id: ID!
    name: String
    profilePic: String
    email: String
    isEmailVerified: Boolean
    shortBio: String
    phone: String
    businessName: String
    website: String
    monthlyProductUpdates: Boolean
    monthlyMetricsUpdates: Boolean
    courseBookmarkIds: [String]
    lessonBookmarkIds: [String]
  }
`;

export const resolvers: Resolvers = {
  UserProfile: {
    courseBookmarks: async (parent) => {
      return await db.getList("courses", [{
        field: "id",
        operator: "in",
        value: parent.courseBookmarkIds as string[],
      }]) as [Course];
    },
    lessonBookmarks: async (parent) => {
      return await db.getList("lessons", [{
        field: "id",
        operator: "in",
        value: parent.lessonBookmarkIds as string[],
      }]) as [Lesson];
    },
  },
  Query: {
    users: async () => {
      return await db.getList(userCollectionName) as [UserProfile];
    },
    user: async (_, args) => {
      return await db.getItem(userCollectionName, args.userId) as UserProfile;
    },
    userExist: async (_, args) => {
      try {
        const user = await auth().getUserByEmail(args.email);
        const profile =
          await db.getItem(userCollectionName, user.uid) as UserProfile;
        return !!profile;
      } catch (e) {
        return false;
      }
    },
  },
  Mutation: {
    updateProfile: async (_, args) => {
      return db.setItem(
        userCollectionName,
        args.user.id,
        args.user
      ) as unknown as UserProfile;
    },
  },
};
