"use client";
import MarkdownEditor from "../MarkdownEditor";
import useLessonBlocks from "../hooks/useLessonBlocks";
import MDEditor from '@uiw/react-md-editor';
import BlockHeader from "./BlockHeader";
import BlockContainer from "./BlockContainer";
import { generateLessonBlockName } from "@/utils/common";
import { LessonBlock } from "@/requests/lesson";

export default function TextBlock({ block }: { block: LessonBlock }) {
  const { updateBlock } = useLessonBlocks(block);
  const updateBlockText = updateBlock("screen_content");

  return (
    <BlockContainer
      block={block}
      isEmpty={!block.screen_content || block.screen_content === ""}
      unfocusedContent={<MDEditor.Markdown source={block.screen_content ?? ""} />}
      focusedContent={(
        <>
          <BlockHeader block={block} />
          <div className="flex flex-col">
            <h6 className="text-[12px] text-bodyText mb-1">Screen Content</h6>
            <MarkdownEditor
              name={generateLessonBlockName(block, "screen_content")}
              value={block.screen_content as string}
              onChange={updateBlockText}
            />
          </div>
        </>
      )}
    />
  );
}
