import { Course } from "@/graphql/graphql";
import CourseCard from "./CourseCard";
import ListToolbar from "./ListToolbar";

interface CourseCardProps {
  courses?: Course[];
};

export default function CourseCardList(props: CourseCardProps) {

  return (
    <div className="flex flex-row flex-wrap grow gap-x-8 gap-y-10">
      <ListToolbar courses={props.courses} />
      {props.courses?.map((course) => <CourseCard key={course.id} course={course} />)}
    </div>
  );
}
