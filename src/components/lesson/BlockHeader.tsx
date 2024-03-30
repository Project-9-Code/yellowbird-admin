import Image from "next/image";
import Button from "../Button";
import SelectLessonType from "./SelectLessonType";
import useLessonBlocks from "../hooks/useLessonBlocks";
import { useCallback } from "react";
import { LessonBlock } from "@/graphql/graphql";
import SmallX from "@/svgs/small-x.svg";
import SelectPoints from "./SelectPoints";

export default function BlockHeader(
  { block, showPoints }:
  { block: LessonBlock, showPoints?: boolean }
) {
  const { removeLessonBlock } = useLessonBlocks(block);
  const onRemove = useCallback(() => removeLessonBlock(block), [removeLessonBlock, block]);

  return (
    <div className="flex flex-row items-center mb-4">
      <SelectLessonType block={block} />
      
      <div className="mx-4 w-[100px]">
        {showPoints && <SelectPoints block={block} />}
      </div>

      <div className="grow" />

      <Button
        buttonClassName="!w-[95px] !bg-placeholder rounded-[24px]"
        textClassName="!text-bodyText"
        onClick={onRemove}
        label={(
          <div className="flex flex-row items-center">
            <span className="text-[14px]">Remove</span>
            <Image src={SmallX} alt="Remove" className="w-[10px] h-[10px] ml-2" />
          </div>
        )}
      />
    </div>
  );
}
