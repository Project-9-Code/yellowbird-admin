import Button from "@/components/Button";
import AppHeader from "@/components/Header";
import { fetchCourses } from "@/utils/api/course";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const courses = await fetchCourses();

  return (
    <main className="flex flex-col grow bg-snowGrey">
      <AppHeader />

      <div className="max-w-[1032px] mx-auto w-full mb-7">
        <div className="flex flex-row mt-12 items-center mb-7">
          <span className="font-bold text-headlineText text-3xl">
            Courses
          </span>

          <div className="flex grow" />
          
          <div className="w-[163px]">
            <Button label="Create New Course"/>
          </div>
        </div>

        <div className="flex flex-row flex-wrap grow gap-x-8 gap-y-10">
          {courses.map((course) => {
            return (
              <Link key={course.id} href="">
                <div className="w-[234px] h-[252px] flex flex-col">
                  <div className="w-[234px] h-[168px] bg-brand mb-4 rounded-md">
                    {course.coverPhoto && (
                      <Image
                        src={course.coverPhoto}
                        alt="Picture of course"
                        width={234}
                        height={168}
                        className="w-[234px] h-[168px] rounded-md"
                      />
                    )}
                  </div>

                  <span className="font-bold text-headlineText mb-1">
                    {course.name}
                  </span>

                  <span className="text-sm">
                    {course.description}
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </main>
  );
}
