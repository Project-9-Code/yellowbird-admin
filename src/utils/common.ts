import { LessonBlock } from "@/requests/lesson";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function insertAtIndex(arr: any[]=[], index=0, item: any) {
  if (index < 0 || index > arr.length) {
    // Index out of bounds, return the original array
    return arr;
  }
  return arr.slice(0, index).concat(item, arr.slice(index));
}

export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function generateLessonBlockName(block: LessonBlock, key: string) {
  return `lessonBlock:${block.id}:${block.type}:${key}`;
}
