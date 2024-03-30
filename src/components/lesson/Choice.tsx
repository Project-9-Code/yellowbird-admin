import { LessonBlock } from "@/graphql/graphql";
import BlockContainer from "./BlockContainer";
import BlockHeader from "./BlockHeader";
import QuestionInput from "./QuestionInput";
import LessonBlockOptions from "./Option";

const options = ["True", "False"];

export default function Choice({ block }: { block: LessonBlock }) {

  return (
    <BlockContainer
      block={block}
      focusedContent={(<>
        <BlockHeader block={block} showPoints />

        <div className="flex flex-col">
          <QuestionInput block={block} />

          <LessonBlockOptions
            block={block}
            choiceType="radio"
            options={options}
            readOnly
          />
        </div>
      </>)}
      unfocusedContent={(<>
        <p className="text-[20px] mb-4">
          {block.question}
        </p>
        <LessonBlockOptions
          block={block}
          choiceType="radio"
          options={options}
          readOnly
        />
      </>)}
    />
  );
}
