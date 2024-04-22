import * as db from "../../utils/database";
import {Resolvers, Course, Lesson, UserProfile} from "../../../graphql_types";
import {lessonCollectionName} from "./lesson";
import {userCollectionName} from "./user";
import {bucket} from "../../utils/firebase";
import {getDownloadURL} from "firebase-admin/storage";

export const courseCollectionName = "courses";

export const typeDef = /* GraphQL */`
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
    activeLessons: Int
    archivedLessons: Int
    draftLessons: Int
  }

  input CourseInput {
    id: ID
    name: String
    description: String
    isSponsored: Boolean
    coverPhoto: String
    createdById: String
  }
  
  input CourseUpdateInput {
    id: ID!
    name: String
    description: String
    isSponsored: Boolean
    coverPhoto: String
    authorId: String
    updatedById: String
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
      const courses = await db.getList(courseCollectionName) as [Course];
      return courses;
    },
    course: async (_, args) => {
      const course = await db.getItem(
        courseCollectionName, args.courseId
      ) as Course;

      if (
        course.coverPhoto &&
        course.coverPhoto.length > 0 &&
        !course.coverPhoto.startsWith("http")
      ) {
        course.coverPhoto = await getDownloadURL(
          bucket.file(course.coverPhoto)
        );
      }

      return course;
    },
  },
  Mutation: {
    addCourse: async (_, args) => {
      const timestamp = Date.now();
      const data = {
        ...args.course,
        lastUpdated: timestamp,
        createdAt: timestamp,
      };
      return await db.createItem(courseCollectionName, data) as Course;
    },
    updateCourse: async (_, args) => {
      const data = {
        ...args.course,
        lastUpdated: Date.now(),
      };
      return db.setItem(
        courseCollectionName,
        args.course.id,
        data,
      ) as unknown as Course;
    },
    deleteCourse: async (_, args) => {
      await bucket.deleteFiles({prefix: `public/course/${args.courseId}`});
      return db.deleteItem(courseCollectionName, args.courseId);
    },
    bulkAddCourses: async (_, args) => {
      const timestamp = Date.now();
      return await db.addBatch(args.courses.map((course) => ({
        collection: courseCollectionName,
        data: {...course, createdAt: timestamp, lastUpdated: timestamp},
      } as db.BatchItem))) as Course[];
    },
    bulkUpdateCourses: async (_, args) => {
      return await db.updateBatch(args.courses.map((course) => ({
        collection: courseCollectionName,
        data: {...course, lastUpdated: Date.now()},
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
