import Card from "../Card";
import useFocusParam from "../hooks/useFocusParam";
import { PropsWithChildren, ReactElement } from "react";
import EmptyLessonBlock from "./EmptyLessonBlock";
import clsx from "clsx";
import { LessonBlock } from "@/requests/lesson";

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
      <div className={clsx(!isFocused && "hidden")}>
        {focusedContent}
      </div>
      <div className={clsx(isFocused && "hidden")}>
        {unfocusedContent}
      </div>
      {showEmpty && <EmptyLessonBlock />}
      {children}
    </Card>
  );
}
