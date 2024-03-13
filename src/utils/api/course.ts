import { Course, CourseInput } from "@/graphql/graphql";
import { getClient } from "../apolloClient";
import { gql } from "@apollo/client";

const client = getClient();

export const fetchCourses = async function fetchCoursesAPI() {
  const { data } = await client.query({
    query: gql`
      query GetCourses {
        courses {
          id
          name
          description
          coverPhoto
        }
      }
    `,
    context: {
      fetchOptions: {
        next: { revalidate: 1 },
      },
    },
  });

  if (data) {
    return ([...data.courses] as Course[]).sort(function sortCourses(a: Course, b: Course) {
      const nA = (a.name ?? "").toLowerCase();
      const nB = (b.name ?? "").toLowerCase();
    
      if (nA < nB) return -1;
      else if (nA > nB) return 1;
      return 0;
    });
  }

  return [] as Course[];
};

export const addCourse = async function addCourseAPI(course: CourseInput) {
  const { data } = await client.mutate({
    mutation: gql`
      mutation AddCourse($course: CourseInput!) {
        addCourse(course: $course) {
          id
          name
          description
          coverPhoto
        }
      }
    `,
    variables: { course }
  });
  
  return data as Course;
};
