"use client";

import { useCallback } from "react";
import useLessonBlocks from "../hooks/useLessonBlocks";
import dynamic from "next/dynamic";
import { generateLessonBlockName } from "@/utils/common";
import { LessonBlock } from "@/requests/lesson";

const Select = dynamic(() => import("react-select"), { ssr: false });

const options = Array(10).fill(0).map((_, i) => ({
  value: i + 1, label: `${i + 1} pt${i === 0 ? "" : "s"}`,
}));

export default function SelectPoints({ onSelect, block }: { block: LessonBlock, onSelect?: (value: any) => void }) {
  const { updateBlock } = useLessonBlocks(block);
  const selected = options.find((option) => option.value === block.points) ?? options[0];
  const updateBlockPoints = updateBlock("points");
  const onChange = useCallback((type: any) => {
    updateBlockPoints(type.value);
    onSelect?.(type.value);
  }, [onSelect, updateBlockPoints]);

  return (
    <Select
      id={block.id}
      name={generateLessonBlockName(block, "points")}
      options={options}
      className="w-[215px]"
      defaultValue={selected}
      onChange={onChange}
      classNames={{
        container: () =>"w-full",
      }}
    />
  );
}
