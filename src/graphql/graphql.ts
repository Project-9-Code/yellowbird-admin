/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Bookmark = {
  __typename?: 'Bookmark';
  _empty?: Maybe<Scalars['String']['output']>;
  courseId?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  lastUpdated?: Maybe<Scalars['String']['output']>;
  lessonId?: Maybe<Scalars['String']['output']>;
  userId: Scalars['String']['output'];
};

export type BookmarkInput = {
  courseId?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  lessonId?: InputMaybe<Scalars['String']['input']>;
  userId: Scalars['String']['input'];
};

export type Course = {
  __typename?: 'Course';
  _empty?: Maybe<Scalars['String']['output']>;
  activeLessons?: Maybe<Scalars['Int']['output']>;
  archivedLessons?: Maybe<Scalars['Int']['output']>;
  author?: Maybe<UserProfile>;
  authorId?: Maybe<Scalars['String']['output']>;
  coverPhoto?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  createdBy?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  draftLessons?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  isSponsored?: Maybe<Scalars['Boolean']['output']>;
  lastUpdated?: Maybe<Scalars['String']['output']>;
  lessons?: Maybe<Array<Maybe<Lesson>>>;
  name?: Maybe<Scalars['String']['output']>;
  shortDescription?: Maybe<Scalars['String']['output']>;
  updatedBy?: Maybe<Scalars['String']['output']>;
};

export type CourseInput = {
  coverPhoto?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  isSponsored?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type CourseUpdateInput = {
  authorId?: InputMaybe<Scalars['String']['input']>;
  coverPhoto?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  isSponsored?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type Lesson = {
  __typename?: 'Lesson';
  _empty?: Maybe<Scalars['String']['output']>;
  author?: Maybe<UserProfile>;
  authorId?: Maybe<Scalars['String']['output']>;
  blocks?: Maybe<Array<Maybe<LessonBlock>>>;
  course?: Maybe<Course>;
  courseId?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  createdBy?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  lastUpdated?: Maybe<Scalars['String']['output']>;
  order?: Maybe<Scalars['Int']['output']>;
  recapDescription?: Maybe<Scalars['String']['output']>;
  status?: Maybe<LessonStatus>;
  tags?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  updatedBy?: Maybe<Scalars['String']['output']>;
};

export type LessonBlock = {
  __typename?: 'LessonBlock';
  answer_options?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  answers?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  choice_answer?: Maybe<Scalars['Boolean']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  mediaText?: Maybe<Scalars['String']['output']>;
  mediaUrl?: Maybe<Scalars['String']['output']>;
  multi_choice_answer?: Maybe<Scalars['String']['output']>;
  multi_select_answers?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  order?: Maybe<Scalars['Int']['output']>;
  points?: Maybe<Scalars['Int']['output']>;
  question?: Maybe<Scalars['String']['output']>;
  screenContent?: Maybe<Scalars['String']['output']>;
  textValue?: Maybe<Scalars['String']['output']>;
  type: LessonBlockTypes;
  videoText?: Maybe<Scalars['String']['output']>;
  videoUrl?: Maybe<Scalars['String']['output']>;
};

export type LessonBlockInput = {
  answer_options?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  answers?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  choice_answer?: InputMaybe<Scalars['Boolean']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  inputValue?: InputMaybe<Scalars['String']['input']>;
  inputVariants?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  mediaText?: InputMaybe<Scalars['String']['input']>;
  mediaUrl?: InputMaybe<Scalars['String']['input']>;
  multi_choice_answer?: InputMaybe<Scalars['String']['input']>;
  multi_select_answers?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  order?: InputMaybe<Scalars['Int']['input']>;
  points?: InputMaybe<Scalars['Int']['input']>;
  question?: InputMaybe<Scalars['String']['input']>;
  screenContent?: InputMaybe<Scalars['String']['input']>;
  textValue?: InputMaybe<Scalars['String']['input']>;
  type: LessonBlockTypes;
  videoText?: InputMaybe<Scalars['String']['input']>;
  videoUrl?: InputMaybe<Scalars['String']['input']>;
};

export enum LessonBlockTypes {
  Choice = 'CHOICE',
  Input = 'INPUT',
  Media = 'MEDIA',
  MultiChoice = 'MULTI_CHOICE',
  MultiSelect = 'MULTI_SELECT',
  Text = 'TEXT',
  Video = 'VIDEO'
}

export type LessonInput = {
  authorId?: InputMaybe<Scalars['String']['input']>;
  blocks?: InputMaybe<Array<InputMaybe<LessonBlockInput>>>;
  courseId?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  order?: InputMaybe<Scalars['Int']['input']>;
  recapDescription?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<LessonStatus>;
  tags?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export enum LessonStatus {
  Archived = 'ARCHIVED',
  Draft = 'DRAFT',
  Published = 'PUBLISHED'
}

export type LessonUpdateInput = {
  authorId?: InputMaybe<Scalars['String']['input']>;
  blocks?: InputMaybe<Array<InputMaybe<LessonBlockInput>>>;
  courseId?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  order?: InputMaybe<Scalars['Int']['input']>;
  recapDescription?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<LessonStatus>;
  tags?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  _empty?: Maybe<Scalars['String']['output']>;
  addBookmark?: Maybe<Bookmark>;
  addCourse?: Maybe<Course>;
  addLesson?: Maybe<Lesson>;
  bulkAddCourses?: Maybe<Array<Maybe<Course>>>;
  bulkAddLessons?: Maybe<Array<Maybe<Lesson>>>;
  bulkDeleteCourses?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  bulkDeleteLessons?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  bulkUpdateCourses?: Maybe<Array<Maybe<Course>>>;
  bulkUpdateLessons?: Maybe<Array<Maybe<Lesson>>>;
  deleteBookmark?: Maybe<Bookmark>;
  deleteCourse?: Maybe<Scalars['String']['output']>;
  deleteLesson?: Maybe<Scalars['String']['output']>;
  updateBookmark?: Maybe<Bookmark>;
  updateCourse?: Maybe<Course>;
  updateLesson?: Maybe<Lesson>;
  updateProfile?: Maybe<UserProfile>;
};


export type MutationAddBookmarkArgs = {
  bookmark: BookmarkInput;
};


export type MutationAddCourseArgs = {
  course: CourseInput;
};


export type MutationAddLessonArgs = {
  lesson: LessonInput;
};


export type MutationBulkAddCoursesArgs = {
  courses: Array<InputMaybe<CourseInput>>;
};


export type MutationBulkAddLessonsArgs = {
  lessons: Array<InputMaybe<LessonInput>>;
};


export type MutationBulkDeleteCoursesArgs = {
  courseIds: Array<InputMaybe<Scalars['String']['input']>>;
};


export type MutationBulkDeleteLessonsArgs = {
  lessonIds: Array<InputMaybe<Scalars['String']['input']>>;
};


export type MutationBulkUpdateCoursesArgs = {
  courses: Array<InputMaybe<CourseUpdateInput>>;
};


export type MutationBulkUpdateLessonsArgs = {
  lessons: Array<InputMaybe<LessonUpdateInput>>;
};


export type MutationDeleteBookmarkArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteCourseArgs = {
  courseId: Scalars['String']['input'];
};


export type MutationDeleteLessonArgs = {
  lessonId: Scalars['String']['input'];
};


export type MutationUpdateBookmarkArgs = {
  bookmark: BookmarkInput;
};


export type MutationUpdateCourseArgs = {
  course: CourseUpdateInput;
};


export type MutationUpdateLessonArgs = {
  lesson: LessonUpdateInput;
};


export type MutationUpdateProfileArgs = {
  user: UserProfileInput;
};

export type Query = {
  __typename?: 'Query';
  _empty?: Maybe<Scalars['String']['output']>;
  bookmark?: Maybe<Bookmark>;
  bookmarks?: Maybe<Array<Maybe<Bookmark>>>;
  course?: Maybe<Course>;
  courses?: Maybe<Array<Maybe<Course>>>;
  lesson?: Maybe<Lesson>;
  lessons?: Maybe<Array<Maybe<Lesson>>>;
  user?: Maybe<UserProfile>;
  userBookmarks?: Maybe<Array<Maybe<Bookmark>>>;
  userExist?: Maybe<Scalars['Boolean']['output']>;
  users?: Maybe<Array<Maybe<UserProfile>>>;
};


export type QueryBookmarkArgs = {
  id: Scalars['String']['input'];
};


export type QueryCourseArgs = {
  courseId: Scalars['String']['input'];
};


export type QueryLessonArgs = {
  lessonId: Scalars['String']['input'];
};


export type QueryUserArgs = {
  userId: Scalars['String']['input'];
};


export type QueryUserBookmarksArgs = {
  userId: Scalars['String']['input'];
};


export type QueryUserExistArgs = {
  email: Scalars['String']['input'];
};

export type UserProfile = {
  __typename?: 'UserProfile';
  _empty?: Maybe<Scalars['String']['output']>;
  businessName?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isEmailVerified?: Maybe<Scalars['Boolean']['output']>;
  lastUpdated?: Maybe<Scalars['String']['output']>;
  monthlyMetricsUpdates?: Maybe<Scalars['Boolean']['output']>;
  monthlyProductUpdates?: Maybe<Scalars['Boolean']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  profilePic?: Maybe<Scalars['String']['output']>;
  shortBio?: Maybe<Scalars['String']['output']>;
  website?: Maybe<Scalars['String']['output']>;
};

export type UserProfileInput = {
  businessName?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  isEmailVerified?: InputMaybe<Scalars['Boolean']['input']>;
  monthlyMetricsUpdates?: InputMaybe<Scalars['Boolean']['input']>;
  monthlyProductUpdates?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  profilePic?: InputMaybe<Scalars['String']['input']>;
  shortBio?: InputMaybe<Scalars['String']['input']>;
  website?: InputMaybe<Scalars['String']['input']>;
};

export type AddCourseMutationVariables = Exact<{
  course: CourseInput;
}>;


export type AddCourseMutation = { __typename?: 'Mutation', addCourse?: { __typename?: 'Course', id: string, name?: string | null, description?: string | null } | null };

export type MutationMutationVariables = Exact<{
  courseIds: Array<InputMaybe<Scalars['String']['input']>> | InputMaybe<Scalars['String']['input']>;
}>;


export type MutationMutation = { __typename?: 'Mutation', bulkDeleteCourses?: Array<string | null> | null };

export type AddLessonMutationVariables = Exact<{
  lesson: LessonInput;
}>;


export type AddLessonMutation = { __typename?: 'Mutation', addLesson?: { __typename?: 'Lesson', id: string } | null };

export type ArchiveLessonMutationVariables = Exact<{
  lessonId: Scalars['String']['input'];
}>;


export type ArchiveLessonMutation = { __typename?: 'Mutation', deleteLesson?: string | null };

export type UpdateLessonMutationVariables = Exact<{
  lesson: LessonUpdateInput;
}>;


export type UpdateLessonMutation = { __typename?: 'Mutation', updateLesson?: { __typename?: 'Lesson', id: string } | null };

export type DeleteLessonMutationVariables = Exact<{
  lessonId: Scalars['String']['input'];
}>;


export type DeleteLessonMutation = { __typename?: 'Mutation', deleteLesson?: string | null };

export type GetCoursesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCoursesQuery = { __typename?: 'Query', courses?: Array<{ __typename?: 'Course', id: string, name?: string | null, description?: string | null, coverPhoto?: string | null } | null> | null };

export type GetCourseQueryVariables = Exact<{
  courseId: Scalars['String']['input'];
}>;


export type GetCourseQuery = { __typename?: 'Query', course?: { __typename?: 'Course', id: string, name?: string | null, description?: string | null, coverPhoto?: string | null, archivedLessons?: number | null, activeLessons?: number | null, draftLessons?: number | null, author?: { __typename?: 'UserProfile', name?: string | null, id: string } | null, lessons?: Array<{ __typename: 'Lesson', _empty?: string | null, id: string, title?: string | null, order?: number | null, lastUpdated?: string | null, author?: { __typename?: 'UserProfile', name?: string | null, id: string } | null } | null> | null } | null };

export type GetCourseMetaQueryVariables = Exact<{
  courseId: Scalars['String']['input'];
}>;


export type GetCourseMetaQuery = { __typename?: 'Query', course?: { __typename?: 'Course', id: string, name?: string | null } | null };

export type GetLessonQueryVariables = Exact<{
  lessonId: Scalars['String']['input'];
}>;


export type GetLessonQuery = { __typename?: 'Query', lesson?: { __typename?: 'Lesson', id: string, title?: string | null, description?: string | null, tags?: string | null, recapDescription?: string | null, course?: { __typename?: 'Course', id: string, name?: string | null } | null, blocks?: Array<{ __typename?: 'LessonBlock', id: string, type: LessonBlockTypes, mediaUrl?: string | null, screenContent?: string | null, question?: string | null, answers?: Array<string | null> | null, answer_options?: Array<string | null> | null } | null> | null } | null };


export const AddCourseDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddCourse"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"course"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CourseInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addCourse"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"course"},"value":{"kind":"Variable","name":{"kind":"Name","value":"course"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode<AddCourseMutation, AddCourseMutationVariables>;
export const MutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Mutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"courseIds"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bulkDeleteCourses"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"courseIds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"courseIds"}}}]}]}}]} as unknown as DocumentNode<MutationMutation, MutationMutationVariables>;
export const AddLessonDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddLesson"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"lesson"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LessonInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addLesson"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"lesson"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lesson"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<AddLessonMutation, AddLessonMutationVariables>;
export const ArchiveLessonDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ArchiveLesson"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"lessonId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteLesson"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"lessonId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lessonId"}}}]}]}}]} as unknown as DocumentNode<ArchiveLessonMutation, ArchiveLessonMutationVariables>;
export const UpdateLessonDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateLesson"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"lesson"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LessonUpdateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateLesson"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"lesson"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lesson"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateLessonMutation, UpdateLessonMutationVariables>;
export const DeleteLessonDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteLesson"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"lessonId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteLesson"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"lessonId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lessonId"}}}]}]}}]} as unknown as DocumentNode<DeleteLessonMutation, DeleteLessonMutationVariables>;
export const GetCoursesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCourses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"courses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"coverPhoto"}}]}}]}}]} as unknown as DocumentNode<GetCoursesQuery, GetCoursesQueryVariables>;
export const GetCourseDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCourse"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"courseId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"course"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"courseId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"courseId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"coverPhoto"}},{"kind":"Field","name":{"kind":"Name","value":"archivedLessons"}},{"kind":"Field","name":{"kind":"Name","value":"activeLessons"}},{"kind":"Field","name":{"kind":"Name","value":"draftLessons"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"lessons"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"_empty"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"order"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"lastUpdated"}}]}}]}}]}}]} as unknown as DocumentNode<GetCourseQuery, GetCourseQueryVariables>;
export const GetCourseMetaDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCourseMeta"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"courseId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"course"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"courseId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"courseId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<GetCourseMetaQuery, GetCourseMetaQueryVariables>;
export const GetLessonDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetLesson"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"lessonId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lesson"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"lessonId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lessonId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"recapDescription"}},{"kind":"Field","name":{"kind":"Name","value":"course"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"blocks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"mediaUrl"}},{"kind":"Field","name":{"kind":"Name","value":"screenContent"}},{"kind":"Field","name":{"kind":"Name","value":"question"}},{"kind":"Field","name":{"kind":"Name","value":"answers"}},{"kind":"Field","name":{"kind":"Name","value":"answer_options"}}]}}]}}]}}]} as unknown as DocumentNode<GetLessonQuery, GetLessonQueryVariables>;