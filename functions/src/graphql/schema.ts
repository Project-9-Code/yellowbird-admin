import {makeExecutableSchema} from "@graphql-tools/schema";
import merge from "lodash.merge";
import {printSchema} from "graphql";
import {typeDef as Course, resolvers as CourseResolvers} from "./models/course";
import {typeDef as Lesson, resolvers as LessonResolvers} from "./models/lesson";
import {typeDef as User, resolvers as UserResolvers} from "./models/user";

const Query = /* GraphQL */`
  type Query {
    _empty: String
  }
  type Mutation {
    _empty: String
  }
  type Course {
    lastUpdated: String
    createdAt: String
    createdBy: UserProfile
    createdById: String
    updatedBy: UserProfile
    updatedById: String
  }
  type Lesson {
    lastUpdated: String
    createdAt: String
    createdBy: UserProfile
    createdById: String
    updatedBy: UserProfile
    updatedById: String
  }
  type Bookmark {
    lastUpdated: String
    createdAt: String
    createdBy: UserProfile
    createdById: String
    updatedBy: UserProfile
    updatedById: String
  }
  type UserProfile {
    lastUpdated: String
    createdAt: String
  }
  type UserLesson {
    lastUpdated: String
    createdAt: String
  }
`;

export const schema = makeExecutableSchema({
  typeDefs: [Query, User, Course, Lesson],
  resolvers: merge(
    UserResolvers,
    CourseResolvers,
    LessonResolvers,
  ),
});

export const schemaJson = printSchema(schema);
