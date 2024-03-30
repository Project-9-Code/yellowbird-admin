import { LessonBlock } from "@/graphql/graphql";
import Card from "../Card";
import useFocusParam from "../hooks/useFocusParam";
import { PropsWithChildren, ReactElement } from "react";

export { type LessonBlock };

export default function BlockContainer(
  { block, children, focusedContent, unfocusedContent, disableDrag }:
  PropsWithChildren<{
    block: LessonBlock;
    focusedContent?: ReactElement,
    unfocusedContent?: ReactElement,
    disableDrag?: boolean
  }>
) {
  const { isFocused, enableFocus } = useFocusParam(block.id);
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
      {children}
    </Card>
  );
}
