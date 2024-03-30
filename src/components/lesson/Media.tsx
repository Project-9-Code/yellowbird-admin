import { LessonBlock } from "@/graphql/graphql";
import MarkdownEditor from "../MarkdownEditor";
import Image from "next/image";
import useLessonBlocks from "../hooks/useLessonBlocks";
import MDEditor from '@uiw/react-md-editor';
import BlockContainer from "./BlockContainer";
import BlockHeader from "./BlockHeader";
import ImageInput from "../ImageInput";
import { useCallback } from "react";

type KeyLessonBlock = LessonBlock & { [key: string]: any };

export default function MediaBlock(
  { block, urlKey="mediaUrl", textKey="screenContent" }:
  { block: KeyLessonBlock; inputLabel?: string; key?: string, urlKey?: string, textKey?: string }
) {
  const { updateBlock } = useLessonBlocks(block);
  const updateUrl =  updateBlock(urlKey);
  const updateText = updateBlock(textKey);
  const onUrlChange = useCallback((url?: string) => updateUrl(url), [updateUrl]);
  const onTextChange = useCallback((text?: string) => updateText(text), [updateText]);

  return (
    <BlockContainer
      block={block}
      focusedContent={(
        <>
          <BlockHeader block={block} />
          <div className="flex flex-col">
            <ImageInput
              width={500}
              height={220}
              containerClass="w-full h-[220] my-[16px]"
              imageClass="w-full h-full object-contain"
            />
  
            <h6 className="text-[12px] text-bodyText mb-1">Screen Content</h6>
            <MarkdownEditor
              value={block[textKey] as string}
              onChange={onTextChange}
            />
          </div>
        </>
      )}
      unfocusedContent={(
        <div className="flex flex-col items-center">
          <div className="w-[600px] h-[300px] mb-[16px]">
            {!block[urlKey] && <p className="text-center">No Photo Available</p>}
            {block[urlKey] && <Image src={block[urlKey]} alt="Media" width={600} height={300} />}
          </div>
          <MDEditor.Markdown source={block[textKey] ?? ""} />
        </div>
      )}
    />
  );
}
