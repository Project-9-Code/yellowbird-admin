import { gql } from "@/graphql";
import { Lesson } from "@/graphql/graphql";
import { GRAPHQL_API_URL } from "@/utils/common";
import request from "graphql-request";
import { cache } from "react";

export const fetchLesson = cache(async function fetchLessonApi(id: string) {
  const data = await request(GRAPHQL_API_URL, gql(/* GraphQL */`
    query GetLesson($lessonId: String!) {
      lesson(lessonId: $lessonId) {
        id
        title
        description
        tags
        recapDescription
        course {
          id
          name
        }
        blocks {
          id
          type
          mediaUrl
          screenContent
          question
          points
          answers
          answer_options
        }
      }
    }
  `), { lessonId: id });

  return data.lesson as Lesson;
});