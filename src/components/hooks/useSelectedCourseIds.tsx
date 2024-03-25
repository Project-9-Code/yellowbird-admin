import { useSearchParams, usePathname } from "next/navigation";
import { useCallback } from "react";

export default function useSelectedCourseIds() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const selectedCourseIds = (searchParams.get("selectedCourses") ?? "").split(",").filter((x) => x.length > 0);

  const setSelectedCourses = useCallback((courses: string[]) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("selectedCourses", courses.join(","));
    history.replaceState(null, "", `${pathname}?${params.toString()}`);
  }, [pathname, searchParams]);

  return {
    selectedCourseIds, setSelectedCourses,
  };
}