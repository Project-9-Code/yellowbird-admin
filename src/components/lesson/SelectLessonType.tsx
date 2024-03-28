"use client";

import Image from "next/image";
import { LessonBlock, LessonBlockTypes } from "@/graphql/graphql";
import AlignLeft from "@/svgs/align-left.svg";
import Media from "@/svgs/image-icon.svg";
import Video from "@/svgs/video.svg";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { useCallback } from "react";
import useLessonBlocks from "../hooks/useLessonBlocks";
import dynamic from "next/dynamic";

const Select = dynamic(() => import("react-select"), { ssr: false });

const options = [
  { value: LessonBlockTypes.Text, label: <Label icon={AlignLeft} text="Text" /> },
  { value: LessonBlockTypes.Media, label: <Label icon={Media} text="Media" /> },
  { value: LessonBlockTypes.Video, label: <Label icon={Video} text="Video" /> },
];

export default function SelectLessonType({ onSelect, block }: { block: LessonBlock, onSelect?: (value: any) => void }) {
  const { updateLessonBlock } = useLessonBlocks();
  const selected = options.find((option) => option.value === block?.type);
  const updateBlockType = useCallback((type: string) => 
    updateLessonBlock({ ...block, type: type as LessonBlockTypes }),
    [updateLessonBlock, block]
  );
  const onChange = useCallback((type: any) => {
    updateBlockType(type.value);
    onSelect?.(type.value);
  }, [onSelect, updateBlockType]);
  return (
    <Select
      id={block.id}
      options={options}
      className="w-[215px]"
      defaultValue={options[0]}
      value={selected}
      onChange={onChange}
    />
  );
}

function Label({ icon, text }: { icon: string | StaticImport; text?: string }) {
  return (
    <div className="flex flex-row items-center">
      <Image src={icon} alt="Label Type" className="mr-[12px]" />
      <span className="text-[16px]">{text}</span>
    </div>
  );
}
