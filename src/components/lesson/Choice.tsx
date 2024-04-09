import { LessonBlock } from "@/graphql/graphql";
import BlockContainer from "./BlockContainer";
import BlockHeader from "./BlockHeader";
import QuestionInput from "./QuestionInput";
import LessonBlockOptions from "./Option";
import { generateLessonBlockName } from "@/utils/common";

const options = ["True", "False"];

export default function Choice({ block }: { block: LessonBlock }) {
  return (
    <BlockContainer
      block={block}
      focusedContent={(<>
        <BlockHeader block={block} showPoints />

        <div className="flex flex-col">
          <QuestionInput block={block} name={generateLessonBlockName(block, "question")} />

          <LessonBlockOptions
            block={block}
            options={options}
          />
        </div>
      </>)}
      unfocusedContent={(<>
        <p className="text-[20px] mb-4">
          {block.question}
        </p>
        <LessonBlockOptions
          block={block}
          options={options}
          readOnly
        />
      </>)}
    />
  );
}
