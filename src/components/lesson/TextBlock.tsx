"use client";

import { LessonBlock } from "@/graphql/graphql";
import MarkdownEditor from "../MarkdownEditor";
import useLessonBlocks from "../hooks/useLessonBlocks";
import MDEditor from '@uiw/react-md-editor';
import BlockHeader from "./BlockHeader";
import BlockContainer from "./BlockContainer";
import { generateLessonBlockName } from "@/utils/common";

export default function TextBlock({ block }: { block: LessonBlock }) {
  const { updateBlock } = useLessonBlocks(block);
  const updateBlockText = updateBlock("screenContent");

  return (
    <BlockContainer
      block={block}
      isEmpty={!block.screenContent || block.screenContent === ""}
      unfocusedContent={<MDEditor.Markdown source={block.screenContent ?? ""} />}
      focusedContent={(
        <>
          <BlockHeader block={block} />
          <div className="flex flex-col">
            <h6 className="text-[12px] text-bodyText mb-1">Screen Content</h6>
            <MarkdownEditor
              name={generateLessonBlockName(block, "screenContent")}
              value={block.screenContent as string}
              onChange={updateBlockText}
            />
          </div>
        </>
      )}
    />
  );
}
