import { LessonBlock } from "@/graphql/graphql";
import InputField from "../InputField";
import { ChangeEvent, useCallback } from "react";
import useLessonBlocks from "../hooks/useLessonBlocks";

export default function QuestionInput({ block }: { block: LessonBlock }) {
  const { updateBlock } = useLessonBlocks(block);
  const updateQuestion = updateBlock("question");

  const onQuestionChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    updateQuestion(e.target.value);
  }, [updateQuestion]);

  return (
    <InputField
      label="Question"
      placeholder="Ask your question here..."
      containerClass="mb-4"
      defaultValue={block.question as string}
      onChange={onQuestionChange}
    />
  );
}
