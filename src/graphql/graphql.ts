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

export type Course = {
  __typename?: 'Course';
  _empty?: Maybe<Scalars['String']['output']>;
  author?: Maybe<UserProfile>;
  authorId?: Maybe<Scalars['String']['output']>;
  coverPhoto?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isSponsored?: Maybe<Scalars['Boolean']['output']>;
  lastUpdated?: Maybe<Scalars['String']['output']>;
  lessons?: Maybe<Array<Maybe<Lesson>>>;
  name?: Maybe<Scalars['String']['output']>;
  shortDescription?: Maybe<Scalars['String']['output']>;
};

export type CourseInput = {
  coverPhoto?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
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
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  lastUpdated?: Maybe<Scalars['String']['output']>;
  order?: Maybe<Scalars['Int']['output']>;
  recapDescription?: Maybe<Scalars['String']['output']>;
  tags?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type LessonBlock = {
  __typename?: 'LessonBlock';
  answer_options?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
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
  textValue?: Maybe<Scalars['String']['output']>;
  type: LessonBlockTypes;
  videoText?: Maybe<Scalars['String']['output']>;
  videoUrl?: Maybe<Scalars['String']['output']>;
};

export type LessonBlockInput = {
  answer_options?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
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
  order?: InputMaybe<Scalars['Int']['input']>;
  recapDescription?: InputMaybe<Scalars['String']['input']>;
  tags?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type LessonUpdateInput = {
  authorId?: InputMaybe<Scalars['String']['input']>;
  blocks?: InputMaybe<Array<InputMaybe<LessonBlockInput>>>;
  courseId?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  order?: InputMaybe<Scalars['Int']['input']>;
  recapDescription?: InputMaybe<Scalars['String']['input']>;
  tags?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  _empty?: Maybe<Scalars['String']['output']>;
  addCourse?: Maybe<Course>;
  addLesson?: Maybe<Lesson>;
  bulkAddCourses?: Maybe<Array<Maybe<Course>>>;
  bulkAddLessons?: Maybe<Array<Maybe<Lesson>>>;
  bulkDeleteCourses?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  bulkDeleteLessons?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  bulkUpdateCourses?: Maybe<Array<Maybe<Course>>>;
  bulkUpdateLessons?: Maybe<Array<Maybe<Lesson>>>;
  deleteCourse?: Maybe<Scalars['String']['output']>;
  deleteLesson?: Maybe<Scalars['String']['output']>;
  updateCourse?: Maybe<Course>;
  updateLesson?: Maybe<Lesson>;
  updateProfile?: Maybe<UserProfile>;
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


export type MutationDeleteCourseArgs = {
  courseId: Scalars['String']['input'];
};


export type MutationDeleteLessonArgs = {
  lessonId: Scalars['String']['input'];
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
  course?: Maybe<Course>;
  courses?: Maybe<Array<Maybe<Course>>>;
  lesson?: Maybe<Lesson>;
  lessons?: Maybe<Array<Maybe<Lesson>>>;
  user?: Maybe<UserProfile>;
  userExist?: Maybe<Scalars['Boolean']['output']>;
  users?: Maybe<Array<Maybe<UserProfile>>>;
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


export type QueryUserExistArgs = {
  email: Scalars['String']['input'];
};

export type UserProfile = {
  __typename?: 'UserProfile';
  _empty?: Maybe<Scalars['String']['output']>;
  businessName?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isEmailVerified?: Maybe<Scalars['Boolean']['output']>;
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


export type AddCourseMutation = { __typename?: 'Mutation', addCourse?: { __typename?: 'Course', id: string, name?: string | null, description?: string | null, coverPhoto?: string | null } | null };

export type GetCoursesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCoursesQuery = { __typename?: 'Query', courses?: Array<{ __typename?: 'Course', id: string, name?: string | null, description?: string | null, coverPhoto?: string | null } | null> | null };


export const AddCourseDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddCourse"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"course"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CourseInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addCourse"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"course"},"value":{"kind":"Variable","name":{"kind":"Name","value":"course"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"coverPhoto"}}]}}]}}]} as unknown as DocumentNode<AddCourseMutation, AddCourseMutationVariables>;
export const GetCoursesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCourses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"courses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"coverPhoto"}}]}}]}}]} as unknown as DocumentNode<GetCoursesQuery, GetCoursesQueryVariables>;