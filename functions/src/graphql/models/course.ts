import * as db from "../../utils/database";
import {Resolvers, Course, Lesson, UserProfile} from "../../../graphql_types";
import {lessonCollectionName} from "./lesson";
import {userCollectionName} from "./user";

export const courseCollectionName = "courses";

export const typeDef = `
  extend type Query {
    courses: [Course]
    course(courseId: String!): Course
  }

  extend type Mutation {
    addCourse(course: CourseInput!): Course
    updateCourse(course: CourseUpdateInput!): Course
    deleteCourse(courseId: String!): String
    bulkAddCourses(courses: [CourseInput]!): [Course]
    bulkUpdateCourses(courses: [CourseUpdateInput]!): [Course]
    bulkDeleteCourses(courseIds: [String]!): [String]
  }

  extend type Course {
    id: ID!
    name: String
    description: String
    shortDescription: String
    isSponsored: Boolean
    lessons: [Lesson]
    coverPhoto: String
    authorId: String
    author: UserProfile
    lastUpdated: String
  }

  input CourseInput {
    name: String
    description: String
    isSponsored: Boolean
    coverPhoto: String
  }
  
  input CourseUpdateInput {
    id: ID!
    name: String
    description: String
    isSponsored: Boolean
    coverPhoto: String
    authorId: String
  }
`;

export const resolvers: Resolvers = {
  Course: {
    lessons: async (course) => {
      return await db.getList(
        lessonCollectionName,
        [{field: "courseId", operator: "==", value: course.id}]
      ) as [Lesson];
    },
    author: async (course) => {
      return (course.authorId) ? await db.getItem(
        userCollectionName, course.authorId
      ) as UserProfile : null;
    },
  },
  Query: {
    courses: async () => {
      return await db.getList(courseCollectionName) as [Course];
    },
    course: async (_, args) => {
      return await db.getItem(courseCollectionName, args.courseId) as Course;
    },
  },
  Mutation: {
    addCourse: async (_, args) => {
      return await db.createItem(courseCollectionName, args.course) as Course;
    },
    updateCourse: async (_, args) => {
      return db.setItem(
        courseCollectionName,
        args.course.id,
        args.course
      ) as unknown as Course;
    },
    deleteCourse: async (_, args) => {
      return db.deleteItem(courseCollectionName, args.courseId);
    },
    bulkAddCourses: async (_, args) => {
      return await db.addBatch(args.courses.map((course) => ({
        collection: courseCollectionName,
        data: course,
      } as db.BatchItem))) as Course[];
    },
    bulkUpdateCourses: async (_, args) => {
      return await db.updateBatch(args.courses.map((course) => ({
        collection: courseCollectionName,
        data: course,
      } as db.BatchItem))) as Course[];
    },
    bulkDeleteCourses: async (_, args) => {
      await db.removeBatch(args.courseIds.map((id) => ({
        collection: courseCollectionName,
        id,
      } as db.BatchItem)));

      return args.courseIds;
    },
  },
};
