import { fetchCourses } from "@/api/course";
import Button from "@/components/Button";
import CourseCardList from "@/components/CourseCardList";
import AppHeader from "@/components/Header";
import Link from "next/link";

export default async function Home() {
  const courses = await fetchCourses();

  return (
    <main className="flex flex-col grow bg-snowGrey">
      <AppHeader />

      <div className="max-w-[1032px] mx-auto w-full mb-7 flex flex-col grow relative">
        <div className="flex flex-row mt-12 items-center mb-7">
          <span className="font-bold text-headlineText text-3xl">
            Courses
          </span>

          <div className="flex grow" />
          
          <Link href="course/add" className="w-[163px]">
            <Button label="Create New Course"/>
          </Link>
        </div>
        
        <CourseCardList courses={courses} />
      </div>
    </main>
  );
}
