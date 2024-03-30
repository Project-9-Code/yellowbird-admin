import { fetchCourses } from "@/api/course";
import Button from "@/components/Button";
import CourseCardList from "@/components/CourseCardList";
import AppHeader from "@/components/Header";

export default async function Home() {
  const courses = await fetchCourses();

  return (
    <div className="w-full h-full flex flex-col">
      <AppHeader />
      <div className="max-w-[1032px] mx-auto w-full mb-7 flex flex-col grow relative">
        <div className="flex flex-row mt-12 items-center mb-7">
          <span className="font-bold text-headlineText text-3xl">
            Courses
          </span>

          <div className="flex grow" />
          
          <Button
            label="Create New Course"
            isLink
            href="/course/add"
            buttonClassName="!w-[163px]"
          />
        </div>

        <CourseCardList courses={courses} />
      </div>
    </div>
  );
}
