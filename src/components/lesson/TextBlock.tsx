import { LessonBlock, LessonBlockTypes } from "@/graphql/graphql";
import Button from "../Button";
import Card from "../Card";
import MarkdownEditor from "../MarkdownEditor";
import SmallX from "@/svgs/small-x.svg";
import Image from "next/image";
import useLessonBlocks from "../hooks/useLessonBlocks";
import { useCallback } from "react";
import useFocusParam from "../hooks/useFocusParam";
import MDEditor from '@uiw/react-md-editor';
import SelectLessonType from "./SelectLessonType";

export default function TextBlock({ block }: { block: LessonBlock }) {
  const { isFocused, enableFocus } = useFocusParam(block.id);
  const { updateLessonBlock, removeLessonBlock } = useLessonBlocks();
  const onRemove = useCallback(() => removeLessonBlock(block), [removeLessonBlock, block]);
  const updateBlockText = useCallback((text = "") => 
    updateLessonBlock({ ...block, textValue: text }),
    [updateLessonBlock, block]
  );

  return (
    <Card className="flex flex-col my-[14px]" focused={isFocused} onClick={enableFocus}>
      {isFocused && (
        <>
          <div className="flex flex-row items-center justify-between mb-1">
            <SelectLessonType block={block} />

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

          <div className="flex flex-col">
            <h6 className="text-[12px] text-bodyText mb-1">Screen Content</h6>
            <MarkdownEditor value={block.textValue as string} onChange={updateBlockText} />
          </div>
        </>
      )}

      {!isFocused && <MDEditor.Markdown source={block.textValue ?? ""} />}
    </Card>
  );
}
