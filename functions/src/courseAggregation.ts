import {firestore} from "firebase-functions";
import {db} from "./utils/firebase";

export const aggregateCourseData = firestore
  .document("lessons/{lessonId}")
  .onWrite(async (change) => {
    const courseId = change.after.get("courseId");

    if (courseId) {
      // Get all lessons for the course
      const lessons = await db
        .collection("lessons")
        .where("courseId", "==", courseId).get();

      // Aggregate data
      const activeLessons = lessons.docs
        .filter((lesson) => lesson.get("status") === "PUBLISHED").length;
      const archivedLessons = lessons.docs
        .filter((lesson) => lesson.get("status") === "ARCHIVED").length;
      const draftLessons = lessons.docs
        .filter((lesson) => lesson.get("status") === "DRAFT").length;

      const data = {activeLessons, archivedLessons, draftLessons};

      // Update course with aggregated data
      await db.collection("courses").doc(courseId).update(data);
    }
  });
