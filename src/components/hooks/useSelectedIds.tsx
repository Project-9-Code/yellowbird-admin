import { useSearchParams, usePathname } from "next/navigation";
import { useCallback } from "react";

export default function useSelectedIds(key="selectedCourses") {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const selectedIds = (searchParams.get(key) ?? "").split(",").filter((x) => x.length > 0);

  const isAllSelected = useCallback((ids: string[]) => selectedIds.length === ids.length, [selectedIds.length]);

  const setSelectedIds = useCallback((courses: string[]) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, courses.join(","));
    history.replaceState(null, "", `${pathname}?${params.toString()}`);
  }, [pathname, searchParams, key]);

  const toggleAllIds = useCallback((ids: string[]) => {
    const allIdsSelected = selectedIds.length === ids.length;
    setSelectedIds(allIdsSelected ? [] : ids);
  }, [selectedIds.length, setSelectedIds]);

  const toggleId = useCallback((id: string) => {
    setSelectedIds(selectedIds.includes(id) ? selectedIds.filter((key) => key !== id) : [...selectedIds, id])
  }, [selectedIds, setSelectedIds]);

  return { selectedIds, setSelectedIds, toggleId, toggleAllIds, isAllSelected };
}
