import { fetchCourse } from "@/api/course";
import Button from "@/components/Button";
import Image from "next/image";
import BackSvg from "@/svgs/arrow-left.svg";
import EmptyBox from "@/images/EmptyBox.png";
import CourseLessonList from "@/components/CourseLessonList";
import { Lesson } from "@/graphql/graphql";

interface CourseDetailProps {
  params: { id: string };
}

export default async function CourseDetail(props: CourseDetailProps) {
  const course = await fetchCourse(props.params.id);
  const lessons = (course.lessons ?? []) as Lesson[];
  const hasLessons = lessons.length > 0;

  return (
    <div className="max-w-[1032px] mx-auto w-full mb-7 flex flex-col grow relative">
      <div className="mt-12 flex flex-row items-center justify-between mb-7">
        <Button
          href="/"
          buttonClassName="w-[160px] bg-white border-[1px] py-2 px-3 flex flex-row items-center justify-between rounded-[6px]"
          textClassName="!text-black"
          isLink
          label={(
            <div className="flex flex-row py-1 items-center justify-between">
              <Image src={BackSvg} alt="Go Back" className="mr-2" />
              <span>
                Back to Courses
              </span>
            </div>
          )}
        />

        <Button
          label="New Lesson"
          isLink
          buttonClassName="w-[116px]"
        />
      </div>

      <div className="flex flex-row grow">
        <div className="flex flex-col bg-white w-[296px] rounded-[8px] mr-[55px] border-borderBg p-5 items-center">
          <div className="flex flex-col items-center bg-brand rounded-[6px] w-[180px] h-[180px] mb-4">
            {course.coverPhoto && (
              <Image src={course.coverPhoto} alt="Course Cover" width={180} height={180} className="rounded-[6px] w-[180px] h-[180px]"/>
            )}
          </div>

          <div className="flex flex-col mb-9 w-full">
            <div className="flex flex-row items-center justify-between">
              <span className="text-[24px] font-bold text-headlineText">
                {course.name}
              </span>

              <Button
                isLink 
                label="Edit" 
                buttonClassName="w-[55px] h-[28px] rounded-[24px] bg-white border border-grey" 
                textClassName="!text-black !text-[12px]" 
              />
            </div>

            <span className="font-[14px]">
              {course.description}
            </span>
          </div>
        </div>

        <div className="flex flex-col grow items-center mt-4">
          {(!course.lessons || course.lessons.length === 0) ? (
            <div className="flex flex-col items-center">
              <Image src={EmptyBox} alt="No lessons" />
              <span className="text-textBody font-bold text-[30px]">
                Nothing to see here!
              </span>
              <span className="mb-8">
                There aren&apos;t any lessons that have been added to this course. You can be the first!
              </span>
              <Button
                isLink
                label="Create New Lesson"
                buttonClassName="w-[160px]"
              />
            </div>
          ) : <CourseLessonList lessons={lessons} />}

          {hasLessons && (
            <div />
          )}
        </div>
      </div>
    </div>
  );
}
