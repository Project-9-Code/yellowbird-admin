"use client";

import { Course } from "@/graphql/graphql";
import CourseCard from "./CourseCard";
import { useState } from "react";
import ListToolbar from "./ListToolbar";

interface CourseCardProps {
  courses?: Course[];
};

export default function CourseCardList(props: CourseCardProps) {
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);

  return (
    <div className="flex flex-row flex-wrap grow gap-x-8 gap-y-10 relative">
      <ListToolbar />
      {props.courses?.map((course: Course) => (
        <CourseCard
          key={course.id}
          course={course}
          selected={selectedCourses.includes(course.id)}
          showCheckbox={selectedCourses.length > 0}
          onSelect={(selected) => (selected && !selectedCourses.includes(course.id)) ? setSelectedCourses([...selectedCourses, course.id]) : setSelectedCourses(selectedCourses.filter((id) => id !== course.id))}
        />
      ))}
    </div>
  );
}
