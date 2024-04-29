import { relations } from "drizzle-orm";
import { json, pgTable, text, uuid, time, integer } from "drizzle-orm/pg-core";

export const user = pgTable('user', {
  id: uuid('id').primaryKey(),
  name: text('name'),
  organization: text('organization'),
  email: text('email').unique(),
  phone: text('phone'),
  avatar_url: text('avatar_url'),
  createdAt: time('created_at', { withTimezone: true }).default('now()'),
  updatedAt: time('updated_at', { withTimezone: true }).default('now()'),
});

export const course = pgTable('course', {
  id: uuid('id').primaryKey(),
  title: text('title'),
  description: text('description'),
  activeLessons: integer('active_lessons'),
  archivedLessons: integer('archived_lessons'),
  draftLessons: integer('draft_lessons'),
  coverPhotoUrl: text('cover_photo_url'),
  createdAt: time('created_at', { withTimezone: true }).default('now()'),
  updatedAt: time('updated_at', { withTimezone: true }).default('now()'),
  createdBy: uuid('created_by').references(() => user.id),
  lastUpdatedBy: uuid('last_updated_by').references(() => user.id),
});

export const lesson = pgTable('lesson', {
  id: uuid('id').primaryKey(),
  title: text('title'),
  description: text('description'),
  courseId: uuid('course_id'),
  order: integer('order'),
  tags: json('tags').$type<string[]>(),
  author: uuid('author'),
  blocks: json('blocks').$type<{
    id: string;
    type: string;
    screenContent?: string;
    question?: string;
    answer_options?: string[];
    answers?: string[];
    mediaUrl?: string;
    points?: number;
  }[]>(),
  createdAt: time('created_at', { withTimezone: true }).default('now()'),
  updatedAt: time('updated_at', { withTimezone: true }).default('now()'),
  createdBy: uuid('created_by').references(() => user.id),
  lastUpdatedBy: uuid('last_updated_by').references(() => user.id),
});

export const bookmark = pgTable('bookmark', {
  id: uuid('id').primaryKey(),
  userId: uuid('user_id'),
  courseId: uuid('course_id'),
  lessonId: uuid('lesson_id'),
  completed: text('completed'),
  progress: text('progress'),
  startedAt: text('started_at'),
  completedAt: text('completed_at'),
  updatedAt: time('updated_at', { withTimezone: true }),
  createdAt: time('created_at', { withTimezone: true }),
});

export const userRelations = relations(user, ({ many, one }) => ({
  bookmarks: many(bookmark),
}));

export const courseRelations = relations(course, ({ many, one }) => ({
  lessons: many(lesson),
  createdBy: one(user, {
    fields: [course.createdBy],
    references: [user.id],
    relationName: 'createdBy',
  }),
  lastUpdatedBy: one(user, {
    fields: [course.lastUpdatedBy],
    references: [user.id],
    relationName: 'lastUpdatedBy',
  }),
}));

export const lessonRelations = relations(lesson, ({ one }) => ({
  course: one(course, {
    fields: [lesson.courseId],
    references: [course.id],
  }),
  author: one(user, {
    fields: [lesson.author],
    references: [user.id],
    relationName: 'author',
  }),
  createdBy: one(user, {
    fields: [lesson.createdBy],
    references: [user.id],
    relationName: 'createdBy',
  }),
  lastUpdatedBy: one(user, {
    fields: [lesson.lastUpdatedBy],
    references: [user.id],
    relationName: 'lastUpdatedBy',
  }),
}));

export const bookmarkRelations = relations(bookmark, ({ one }) => ({
  user: one(user, {
    fields: [bookmark.userId],
    references: [user.id],
  }),
  course: one(course, {
    fields: [bookmark.courseId],
    references: [course.id],
  }),
  lesson: one(lesson, {
    fields: [bookmark.lessonId],
    references: [lesson.id],
  }),
}));
