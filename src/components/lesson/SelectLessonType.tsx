"use client";

import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { useCallback } from "react";
import useLessonBlocks from "../hooks/useLessonBlocks";
import dynamic from "next/dynamic";
import AlignLeft from "@/svgs/align-left.svg";
import Media from "@/svgs/image-icon.svg";
import MultiChoice from "@/svgs/multi-choice.svg";
import Choice from "@/svgs/choice.svg";
import MultiSelect from "@/svgs/multi-select.svg";
import { LessonBlock } from "@/requests/lesson";

const Select = dynamic(() => import("react-select"), { ssr: false });

const options = [
  {
    label: "",
    options: [
      { value: "TEXT", label: <Label icon={AlignLeft} text="Text" /> },
      { value: "MEDIA", label: <Label icon={Media} text="Media" /> },
      // { value: LessonBlockTypes.Video, label: <Label icon={Video} text="Video" /> },
    ]
  },
  {
    lable:"",
    options: [
      { value: "MULTI_CHOICE", label: <Label icon={MultiChoice} text="Multiple Choice" /> },
      { value: "CHOICE", label: <Label icon={Choice} text="True or False" /> },
      { value: "MULTI_SELECT", label: <Label icon={MultiSelect} text="Multiple Select" /> },
    ]
  }
];

export default function SelectLessonType(
  { onSelect, block }:
  { block: LessonBlock, onSelect?: (value: any) => void }
) {
  const { updateBlock } = useLessonBlocks(block);
  const selected = options.find((option) => option.options.some((o) => o.value === block.type))?.options.find((o) => o.value === block.type) ?? options[0].options[0];
  const updateBlockType = updateBlock("type");
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
      classNames={{
        menuList: (state) => "border-b border-borderBg"
      }}
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
