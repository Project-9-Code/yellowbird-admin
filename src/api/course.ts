import { gql } from "@/graphql";
import { Course } from "@/graphql/graphql";
import { GRAPHQL_API_URL } from "@/utils/common";
import request from "graphql-request";
import { cache } from "react";

export const fetchCourses = cache(async function fetchCoursesAPI() {
  const data = await request(GRAPHQL_API_URL, gql(/* GraphQL */`
    query GetCourses {
      courses {
        id
        name
        description
        coverPhoto
      }
    }
  `));

  if (data.courses) {
    // Sort courses by name
    return ([...data.courses] as Course[]).sort(function sortCourses(a, b) {
      const nA = (a?.name ?? "").toLowerCase();
      const nB = (b?.name ?? "").toLowerCase();
    
      if (nA < nB) return -1;
      else if (nA > nB) return 1;
      return 0;
    });
  }

  return [] as Course[];
});

export const fetchCourse = cache(async function fetchCourseAPI(id: string) {
  const data = await request(GRAPHQL_API_URL, gql(/* GraphQL */`
    query GetCourse($courseId: String!) {
      course(courseId: $courseId) {
        id
        name
        description
        coverPhoto
        lessons {
          id
          title
          order
          author {
            name
            id
          }
        }
      }
    }
  `), { courseId: id });

  return data.course as Course;
});
