import * as db from "../../utils/database";
import {
  Resolvers, Lesson, Course, UserProfile,
} from "../../../graphql_types";
import {courseCollectionName} from "./course";
import {userCollectionName} from "./user";

export const lessonCollectionName = "lessons";

export const typeDef = /* GraphQL */`
  extend type Query {
    lessons: [Lesson]
    lesson(lessonId: String!): Lesson
  }

  extend type Mutation {
    addLesson(lesson: LessonInput!): Lesson
    bulkAddLessons(lessons: [LessonInput]!): [Lesson]
    updateLesson(lesson: LessonUpdateInput!): Lesson
    bulkUpdateLessons(lessons: [LessonUpdateInput]!): [Lesson]
    deleteLesson(lessonId: String!): String
    bulkDeleteLessons(lessonIds: [String]!): [String]
  }

  extend type Lesson {
    id: ID!
    course: Course
    courseId: String
    title: String
    description: String
    recapDescription: String
    order: Int
    authorId: String
    author: UserProfile
    tags: String
    status: LessonStatus
    blocks: [LessonBlock]
  }

  type LessonBlock {
    type: LessonBlockTypes!
    id: ID!
    description: String
    question: String
    screenContent: String
    textValue: String
    videoUrl: String
    videoText: String
    mediaUrl: String
    mediaText: String
    answer_options: [String]
    choice_answer: Boolean
    multi_choice_answer: String
    multi_select_answers: [String]
    answers: [String]
    order: Int
    points: Int
  }

  enum LessonStatus {
    DRAFT
    PUBLISHED
    ARCHIVED
  }

  enum LessonBlockTypes {
    TEXT
    MEDIA
    VIDEO
    CHOICE
    MULTI_CHOICE
    MULTI_SELECT
    INPUT
  }

  input LessonInput {
    id: ID
    courseId: String
    title: String
    description: String
    recapDescription: String
    authorId: String
    order: Int
    tags: String
    status: LessonStatus
    blocks: [LessonBlockInput]
    createdById: String
  }
  
  input LessonUpdateInput {
    id: ID!
    courseId: String
    title: String
    description: String
    recapDescription: String
    authorId: String
    order: Int
    tags: String
    status: LessonStatus
    blocks: [LessonBlockInput]
    updatedById: String
  }

  input LessonBlockInput {
    type: LessonBlockTypes!
    id: ID
    description: String
    question: String
    screenContent: String
    textValue: String
    videoUrl: String
    videoText: String
    mediaUrl: String
    mediaText: String
    answer_options: [String]
    choice_answer: Boolean
    multi_choice_answer: String
    multi_select_answers: [String]
    answers: [String]
    inputValue: String
    inputVariants: [String]
    order: Int
    points: Int
  }
`;

export const resolvers: Resolvers = {
  Lesson: {
    course: async (lesson) => {
      return (lesson.courseId) ? await db.getItem(
        courseCollectionName, lesson.courseId
      ) as Course : null;
    },
    author: async (lesson) => {
      return (lesson.authorId) ? await db.getItem(
        userCollectionName, lesson.authorId
      ) as UserProfile : null;
    },
  },
  Query: {
    lessons: async () => {
      return await db.getList(lessonCollectionName) as [Lesson];
    },
    lesson: async (_, args) => {
      return await db.getItem(lessonCollectionName, args.lessonId) as Lesson;
    },
  },
  Mutation: {
    addLesson: async (_, args) => {
      return await db.createItem(
        lessonCollectionName,
        {
          ...args.lesson,
          status: args.lesson.status ?? "DRAFT",
          createdById: args.lesson.authorId ?? "",
          createdAt: Date.now(),
          lastUpdated: Date.now(),
        }
      ) as Lesson;
    },
    updateLesson: async (_, args) => {
      return db.setItem(
        lessonCollectionName,
        args.lesson.id,
        {
          ...args.lesson,
          status: args.lesson.status ?? "DRAFT",
          lastUpdated: Date.now().toString(),
        },
      ) as unknown as Lesson;
    },
    deleteLesson: async (_, args) => {
      return db.deleteItem(lessonCollectionName, args.lessonId);
    },
    bulkUpdateLessons: async (_, args) => {
      const result = await db.updateBatch(args.lessons.map((lesson) => ({
        collection: lessonCollectionName,
        id: lesson?.id,
        data: {
          ...lesson,
          status: lesson?.status ?? "DRAFT",
          lastUpdated: Date.now(),
          createdAt: Date.now(),
        },
      } as db.BatchItem))) as Lesson[];

      return result;
    },
    bulkAddLessons: async (_, args) => {
      return await db.addBatch(args.lessons.map((lesson) => ({
        collection: lessonCollectionName,
        data: {
          ...lesson,
          status: lesson?.status ?? "DRAFT",
          lastUpdated: Date.now(),
        },
      } as db.BatchItem))) as Lesson[];
    },
    bulkDeleteLessons: async (_, args) => {
      await db.removeBatch(args.lessonIds.map((id) => ({
        collection: lessonCollectionName,
        id,
      } as db.BatchItem)));

      return args.lessonIds;
    },
  },
};
