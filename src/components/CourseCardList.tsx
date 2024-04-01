import CourseCard from "./CourseCard";
import ListToolbar from "./ListToolbar";
import { fetchCourses } from "@/api/course";

export default async function CourseCardList() {
  const courses = await fetchCourses();
  return (
    <div className="flex flex-row flex-wrap grow gap-x-8 gap-y-10">
      <ListToolbar courses={courses} />
      {courses?.map((course) => <CourseCard key={course.id} course={course} />)}
    </div>
  );
}
