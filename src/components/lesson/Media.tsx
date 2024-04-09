"use client";

import { LessonBlock } from "@/graphql/graphql";
import MarkdownEditor from "../MarkdownEditor";
import Image from "next/image";
import useLessonBlocks from "../hooks/useLessonBlocks";
import MDEditor from '@uiw/react-md-editor';
import BlockContainer from "./BlockContainer";
import BlockHeader from "./BlockHeader";
import ImageInput from "../ImageInput";
import { useCallback, useRef, useState } from "react";
import { generateLessonBlockName } from "@/utils/common";

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
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [imageStr, setImageStr] = useState<string | undefined>(block[urlKey]);
  const onImageChange = useCallback((str: string) => setImageStr(str), []);
  const imageDisplay = imageStr || block[urlKey];

  return (
    <BlockContainer
      block={block}
      isEmpty={(!block.screenContent || block.screenContent === "") && !block[urlKey]}
      focusedContent={(
        <>
          <BlockHeader block={block} />
          <div className="flex flex-col">
            <ImageInput
              id={generateLessonBlockName(block, "mediaUrl")}
              ref={imageInputRef}
              src={imageStr}
              width={500}
              height={220}
              containerClass="w-full h-[220] my-[16px]"
              imageClass="object-contain max-h-full"
              onChange={onImageChange}
            />
  
            <h6 className="text-[12px] text-bodyText mb-1">Screen Content</h6>
            <MarkdownEditor
              value={block[textKey] as string}
              onChange={onTextChange}
              name={generateLessonBlockName(block, "screenContent")}
            />
          </div>
        </>
      )}
      unfocusedContent={(
        <div className="flex flex-col items-center">
          <div className="w-[600px] h-[300px] mb-[16px]">
            {!imageDisplay && <p className="text-center">No Photo Available</p>}
            {imageDisplay && <Image src={imageDisplay} alt="Media" width={600} height={300} className="max-h-full object-contain" />}
          </div>
          <MDEditor.Markdown source={block[textKey] ?? ""} />
        </div>
      )}
    />
  );
}
