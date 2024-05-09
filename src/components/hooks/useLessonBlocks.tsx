"use client";

import useUrlParam from "./useUrlParam";
import { useCallback, useEffect } from "react";
import { capitalizeFirstLetter, insertAtIndex } from "@/utils/common";
import { toast } from "react-toastify";
import { v4 as uuid } from "uuid";
import { LessonBlock } from "@/requests/lesson";

export default function useLessonBlocks(block?: LessonBlock, defaultBlocks?: LessonBlock[]) {
  const { value, setValues } = useUrlParam("lessonBlocks", defaultBlocks?.map((block) => JSON.stringify(block)).join("$") ?? "");
  const lessonBlocks = value.split("$")
    .filter((str) => str.length > 0)
    .map((block) => {
      try {
        return JSON.parse(block) as LessonBlock
      } catch (e) {
        return { id: uuid(),  type: "TEXT", screen_content: "Could not load block content" } as unknown as LessonBlock;
      }
    });

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
        `Text only card added.`,
        { toastId: block.id, icon: () => null }
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
      toast.error(
        `${capitalizeFirstLetter(block.block_type.toLowerCase())} was removed.`,
        { toastId: block.id, icon: () => null }
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
