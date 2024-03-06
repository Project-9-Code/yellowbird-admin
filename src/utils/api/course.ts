import { cache } from "react";
import { Course } from "@/graphql/graphql";
import { getClient } from "../apolloClient";
import { gql } from "@apollo/client";

const client = getClient();

export const fetchCourses = cache(async function fetchCoursesAPI() {
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
    `
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
});