import {firestore} from "firebase-functions";
import {db} from "./utils/firebase";

export const aggregateCourseData = firestore
  .document("lessons/{lessonId}")
  .onWrite(async (change) => {
    const courseId = change.after.get("courseId");
    if (courseId) updateCourseData(courseId);
  });

export const onLessonDelete = firestore
  .document("lessons/{lessonId}")
  .onDelete(async (snapshot) => {
    const courseId = snapshot.get("courseId");
    if (courseId) updateCourseData(courseId);
  });

/**
 * Update course counts
 * @param {string} courseId Course ID
 */
async function updateCourseData(courseId: string) {
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
