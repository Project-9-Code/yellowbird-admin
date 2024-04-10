"use client";

import { LessonBlock, LessonBlockTypes } from "@/graphql/graphql";
import useUrlParam from "./useUrlParam";
import { useCallback, useEffect } from "react";
import { capitalizeFirstLetter, insertAtIndex } from "@/utils/common";
import { toast } from "react-toastify";

export default function useLessonBlocks(block?: LessonBlock, defaultBlocks?: LessonBlock[]) {
  const { value, setValues } = useUrlParam("lessonBlocks", defaultBlocks?.map((block) => JSON.stringify(block)).join("$") ?? "");
  const lessonBlocks = value.split("$")
    .filter((str) => str.length > 0)
    .map((block) => JSON.parse(block) as LessonBlock);

  const setLessonBlocks = useCallback((blocks: LessonBlock[], focus?: string) => {
    const updates: [string, any][] = [["lessonBlocks", blocks.map((block) => JSON.stringify(block)).join("$")]];
    if (focus) updates.push(["focused", focus]);
    return setValues(updates);
  }, [setValues]);

  const addLessonBlock = useCallback((block: LessonBlock, index?: number, focus=false) => {
    if (!lessonBlocks.find((b) => b.id === block.id)) {
      const position = (index !== undefined) ? index : lessonBlocks.length;
      const focusBlock = (focus) ? block.id : undefined;
      toast.info(
        `${capitalizeFirstLetter(LessonBlockTypes.Text.toLowerCase())} only card added.`,
        { toastId: block.id }
      );
      return setLessonBlocks(insertAtIndex(lessonBlocks, position, block), focusBlock);
    }
  }, [lessonBlocks, setLessonBlocks]);

  const updateLessonBlock = useCallback((block: LessonBlock) => {
    setLessonBlocks(lessonBlocks.map((b) => {
      if (b.id === block.id) return { ...b, ...block };
      return b;
    }));
  }, [lessonBlocks, setLessonBlocks]);

  const removeLessonBlock = useCallback((block: LessonBlock) => {
    if (lessonBlocks.find((b) => b.id === block.id)) {
      setLessonBlocks(lessonBlocks.filter((b) => b.id !== block.id));
      toast.warn(
        `${capitalizeFirstLetter(block.type.toLowerCase())} was removed.`,
        { toastId: block.id }
      );
    }
  }, [lessonBlocks, setLessonBlocks]);

  const updateBlock = useCallback((key: string) => (value?: any) => {
    if (block) updateLessonBlock({ ...block, [key]: value } as LessonBlock);
  }, [block, updateLessonBlock]);

  useEffect(() => {
    if (defaultBlocks) setLessonBlocks(defaultBlocks);
  }, []);

  return {
    lessonBlocks,
    addLessonBlock, updateLessonBlock, removeLessonBlock, updateBlock, setLessonBlocks
  };
}
