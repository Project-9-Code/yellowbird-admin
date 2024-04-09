import Button from "@/components/Button";
import CourseCardList from "@/components/CourseCardList";

export default async function Home() {
  return (
    <div className="max-w-[1032px] mx-auto w-full mb-7 flex flex-col grow relative">
      <div className="flex flex-row mt-12 items-center mb-7">
        <span className="font-bold text-headlineText text-3xl">
          Courses
        </span>

        <div className="flex grow" />
        
        <Button
          label="Create New Course"
          isLink
          href="/addCourse"
          buttonClassName="!w-[163px]"
        />
      </div>

      <CourseCardList />
    </div>
  );
}
