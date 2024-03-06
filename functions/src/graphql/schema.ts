import {makeExecutableSchema} from "@graphql-tools/schema";
import merge from "lodash.merge";
import {printSchema} from "graphql";
import {typeDef as Course, resolvers as CourseResolvers} from "./models/course";
import {typeDef as Lesson, resolvers as LessonResolvers} from "./models/lesson";
import {typeDef as User, resolvers as UserResolvers} from "./models/user";

const Query = `
  type Query {
    _empty: String
  }
  type Mutation {
    _empty: String
  }
  type Course {
    _empty: String
  }
  type Lesson {
    _empty: String
  }
  type UserProfile {
    _empty: String
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
