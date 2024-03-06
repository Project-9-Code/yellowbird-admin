import * as db from "../../utils/database";
import {Resolvers, UserProfile} from "../../../graphql_types";
import {auth} from "firebase-admin";

export const userCollectionName = "users";

export const typeDef = `
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
  }
`;

export const resolvers: Resolvers = {
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
