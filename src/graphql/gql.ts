/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n    mutation AddCourse($course: CourseInput!) {\n      addCourse(course: $course) {\n        id\n        name\n        description\n      }\n    }\n  ": types.AddCourseDocument,
    "\n    mutation Mutation($courseIds: [String]!) {\n      bulkDeleteCourses(courseIds: $courseIds)\n    }\n  ": types.MutationDocument,
    "\n    query GetCourses {\n      courses {\n        id\n        name\n        description\n        coverPhoto\n      }\n    }\n  ": types.GetCoursesDocument,
    "\n    query GetCourse($courseId: String!) {\n      course(courseId: $courseId) {\n        id\n        name\n        description\n        coverPhoto\n        lessons {\n          __typename\n          _empty\n          id\n          title\n          order\n          author {\n            name\n            id\n          }\n        }\n      }\n    }\n  ": types.GetCourseDocument,
    "\n    query GetCourseMeta($courseId: String!) {\n      course(courseId: $courseId) {\n        id\n        name\n      }\n    }\n  ": types.GetCourseMetaDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation AddCourse($course: CourseInput!) {\n      addCourse(course: $course) {\n        id\n        name\n        description\n      }\n    }\n  "): (typeof documents)["\n    mutation AddCourse($course: CourseInput!) {\n      addCourse(course: $course) {\n        id\n        name\n        description\n      }\n    }\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation Mutation($courseIds: [String]!) {\n      bulkDeleteCourses(courseIds: $courseIds)\n    }\n  "): (typeof documents)["\n    mutation Mutation($courseIds: [String]!) {\n      bulkDeleteCourses(courseIds: $courseIds)\n    }\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query GetCourses {\n      courses {\n        id\n        name\n        description\n        coverPhoto\n      }\n    }\n  "): (typeof documents)["\n    query GetCourses {\n      courses {\n        id\n        name\n        description\n        coverPhoto\n      }\n    }\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query GetCourse($courseId: String!) {\n      course(courseId: $courseId) {\n        id\n        name\n        description\n        coverPhoto\n        lessons {\n          __typename\n          _empty\n          id\n          title\n          order\n          author {\n            name\n            id\n          }\n        }\n      }\n    }\n  "): (typeof documents)["\n    query GetCourse($courseId: String!) {\n      course(courseId: $courseId) {\n        id\n        name\n        description\n        coverPhoto\n        lessons {\n          __typename\n          _empty\n          id\n          title\n          order\n          author {\n            name\n            id\n          }\n        }\n      }\n    }\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query GetCourseMeta($courseId: String!) {\n      course(courseId: $courseId) {\n        id\n        name\n      }\n    }\n  "): (typeof documents)["\n    query GetCourseMeta($courseId: String!) {\n      course(courseId: $courseId) {\n        id\n        name\n      }\n    }\n  "];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;