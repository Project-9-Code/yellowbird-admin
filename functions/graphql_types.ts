import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
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
  author?: Maybe<UserProfile>;
  authorId?: Maybe<Scalars['String']['output']>;
  coverPhoto?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
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
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  lastUpdated?: Maybe<Scalars['String']['output']>;
  order?: Maybe<Scalars['Int']['output']>;
  recapDescription?: Maybe<Scalars['String']['output']>;
  status?: Maybe<LessonStatus>;
  tags?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
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

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Bookmark: ResolverTypeWrapper<Bookmark>;
  BookmarkInput: BookmarkInput;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Course: ResolverTypeWrapper<Course>;
  CourseInput: CourseInput;
  CourseUpdateInput: CourseUpdateInput;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Lesson: ResolverTypeWrapper<Lesson>;
  LessonBlock: ResolverTypeWrapper<LessonBlock>;
  LessonBlockInput: LessonBlockInput;
  LessonBlockTypes: LessonBlockTypes;
  LessonInput: LessonInput;
  LessonStatus: LessonStatus;
  LessonUpdateInput: LessonUpdateInput;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  UserProfile: ResolverTypeWrapper<UserProfile>;
  UserProfileInput: UserProfileInput;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Bookmark: Bookmark;
  BookmarkInput: BookmarkInput;
  Boolean: Scalars['Boolean']['output'];
  Course: Course;
  CourseInput: CourseInput;
  CourseUpdateInput: CourseUpdateInput;
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Lesson: Lesson;
  LessonBlock: LessonBlock;
  LessonBlockInput: LessonBlockInput;
  LessonInput: LessonInput;
  LessonUpdateInput: LessonUpdateInput;
  Mutation: {};
  Query: {};
  String: Scalars['String']['output'];
  UserProfile: UserProfile;
  UserProfileInput: UserProfileInput;
}>;

export type BookmarkResolvers<ContextType = any, ParentType extends ResolversParentTypes['Bookmark'] = ResolversParentTypes['Bookmark']> = ResolversObject<{
  _empty?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  courseId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  lastUpdated?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lessonId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CourseResolvers<ContextType = any, ParentType extends ResolversParentTypes['Course'] = ResolversParentTypes['Course']> = ResolversObject<{
  _empty?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  author?: Resolver<Maybe<ResolversTypes['UserProfile']>, ParentType, ContextType>;
  authorId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  coverPhoto?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isSponsored?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  lastUpdated?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lessons?: Resolver<Maybe<Array<Maybe<ResolversTypes['Lesson']>>>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  shortDescription?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type LessonResolvers<ContextType = any, ParentType extends ResolversParentTypes['Lesson'] = ResolversParentTypes['Lesson']> = ResolversObject<{
  _empty?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  author?: Resolver<Maybe<ResolversTypes['UserProfile']>, ParentType, ContextType>;
  authorId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  blocks?: Resolver<Maybe<Array<Maybe<ResolversTypes['LessonBlock']>>>, ParentType, ContextType>;
  course?: Resolver<Maybe<ResolversTypes['Course']>, ParentType, ContextType>;
  courseId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  lastUpdated?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  order?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  recapDescription?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['LessonStatus']>, ParentType, ContextType>;
  tags?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type LessonBlockResolvers<ContextType = any, ParentType extends ResolversParentTypes['LessonBlock'] = ResolversParentTypes['LessonBlock']> = ResolversObject<{
  answer_options?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  answers?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  choice_answer?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  mediaText?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  mediaUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  multi_choice_answer?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  multi_select_answers?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  order?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  points?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  question?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  screenContent?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  textValue?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['LessonBlockTypes'], ParentType, ContextType>;
  videoText?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  videoUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  _empty?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  addBookmark?: Resolver<Maybe<ResolversTypes['Bookmark']>, ParentType, ContextType, RequireFields<MutationAddBookmarkArgs, 'bookmark'>>;
  addCourse?: Resolver<Maybe<ResolversTypes['Course']>, ParentType, ContextType, RequireFields<MutationAddCourseArgs, 'course'>>;
  addLesson?: Resolver<Maybe<ResolversTypes['Lesson']>, ParentType, ContextType, RequireFields<MutationAddLessonArgs, 'lesson'>>;
  bulkAddCourses?: Resolver<Maybe<Array<Maybe<ResolversTypes['Course']>>>, ParentType, ContextType, RequireFields<MutationBulkAddCoursesArgs, 'courses'>>;
  bulkAddLessons?: Resolver<Maybe<Array<Maybe<ResolversTypes['Lesson']>>>, ParentType, ContextType, RequireFields<MutationBulkAddLessonsArgs, 'lessons'>>;
  bulkDeleteCourses?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType, RequireFields<MutationBulkDeleteCoursesArgs, 'courseIds'>>;
  bulkDeleteLessons?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType, RequireFields<MutationBulkDeleteLessonsArgs, 'lessonIds'>>;
  bulkUpdateCourses?: Resolver<Maybe<Array<Maybe<ResolversTypes['Course']>>>, ParentType, ContextType, RequireFields<MutationBulkUpdateCoursesArgs, 'courses'>>;
  bulkUpdateLessons?: Resolver<Maybe<Array<Maybe<ResolversTypes['Lesson']>>>, ParentType, ContextType, RequireFields<MutationBulkUpdateLessonsArgs, 'lessons'>>;
  deleteBookmark?: Resolver<Maybe<ResolversTypes['Bookmark']>, ParentType, ContextType, RequireFields<MutationDeleteBookmarkArgs, 'id'>>;
  deleteCourse?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<MutationDeleteCourseArgs, 'courseId'>>;
  deleteLesson?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<MutationDeleteLessonArgs, 'lessonId'>>;
  updateBookmark?: Resolver<Maybe<ResolversTypes['Bookmark']>, ParentType, ContextType, RequireFields<MutationUpdateBookmarkArgs, 'bookmark'>>;
  updateCourse?: Resolver<Maybe<ResolversTypes['Course']>, ParentType, ContextType, RequireFields<MutationUpdateCourseArgs, 'course'>>;
  updateLesson?: Resolver<Maybe<ResolversTypes['Lesson']>, ParentType, ContextType, RequireFields<MutationUpdateLessonArgs, 'lesson'>>;
  updateProfile?: Resolver<Maybe<ResolversTypes['UserProfile']>, ParentType, ContextType, RequireFields<MutationUpdateProfileArgs, 'user'>>;
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  _empty?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  bookmark?: Resolver<Maybe<ResolversTypes['Bookmark']>, ParentType, ContextType, RequireFields<QueryBookmarkArgs, 'id'>>;
  bookmarks?: Resolver<Maybe<Array<Maybe<ResolversTypes['Bookmark']>>>, ParentType, ContextType>;
  course?: Resolver<Maybe<ResolversTypes['Course']>, ParentType, ContextType, RequireFields<QueryCourseArgs, 'courseId'>>;
  courses?: Resolver<Maybe<Array<Maybe<ResolversTypes['Course']>>>, ParentType, ContextType>;
  lesson?: Resolver<Maybe<ResolversTypes['Lesson']>, ParentType, ContextType, RequireFields<QueryLessonArgs, 'lessonId'>>;
  lessons?: Resolver<Maybe<Array<Maybe<ResolversTypes['Lesson']>>>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['UserProfile']>, ParentType, ContextType, RequireFields<QueryUserArgs, 'userId'>>;
  userBookmarks?: Resolver<Maybe<Array<Maybe<ResolversTypes['Bookmark']>>>, ParentType, ContextType, RequireFields<QueryUserBookmarksArgs, 'userId'>>;
  userExist?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<QueryUserExistArgs, 'email'>>;
  users?: Resolver<Maybe<Array<Maybe<ResolversTypes['UserProfile']>>>, ParentType, ContextType>;
}>;

export type UserProfileResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserProfile'] = ResolversParentTypes['UserProfile']> = ResolversObject<{
  _empty?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  businessName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isEmailVerified?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  lastUpdated?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  monthlyMetricsUpdates?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  monthlyProductUpdates?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  phone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  profilePic?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  shortBio?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  website?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  Bookmark?: BookmarkResolvers<ContextType>;
  Course?: CourseResolvers<ContextType>;
  Lesson?: LessonResolvers<ContextType>;
  LessonBlock?: LessonBlockResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  UserProfile?: UserProfileResolvers<ContextType>;
}>;

