import { LessonBlock } from "@/graphql/graphql";
import Card from "../Card";
import useFocusParam from "../hooks/useFocusParam";
import { PropsWithChildren, ReactElement } from "react";
import EmptyLessonBlock from "./EmptyLessonBlock";

export { type LessonBlock };

export default function BlockContainer(
  { block, children, focusedContent, unfocusedContent, disableDrag, isEmpty }:
  PropsWithChildren<{
    block: LessonBlock;
    focusedContent?: ReactElement;
    unfocusedContent?: ReactElement;
    disableDrag?: boolean;
    isEmpty?: boolean;
  }>
) {
  const { isFocused, enableFocus } = useFocusParam(block.id);
  const showEmpty = isEmpty && !isFocused;
  return (
    <Card
      id={block.id}
      className="flex flex-col my-[14px]"
      focused={isFocused}
      disableDrag={disableDrag}
      onClick={enableFocus}
    >
      {isFocused && focusedContent}
      {!isFocused && unfocusedContent}
      {showEmpty && <EmptyLessonBlock />}
      {children}
    </Card>
  );
}
