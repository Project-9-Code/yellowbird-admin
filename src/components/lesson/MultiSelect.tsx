import { useCallback, useMemo } from "react";
import useLessonBlocks from "../hooks/useLessonBlocks";
import BlockContainer, { LessonBlock } from "./BlockContainer";
import BlockHeader from "./BlockHeader";
import AddIcon from "@/svgs/plus.svg";
import Image from "next/image";
import Button from "../Button";
import QuestionInput from "./QuestionInput";
import LessonBlockOptions from "./Option";
import { generateLessonBlockName } from "@/utils/common";

export default function MultiChoice({ block, multiple }: { block: LessonBlock, multiple?: boolean }) {
  const options = useMemo(() => block.answer_options as string[] ?? [], [block.answer_options]);
  const { updateBlock } = useLessonBlocks(block);

  const addOption = useCallback(() => {
    updateBlock("answer_options")([...options, ""]);
  }, [options, updateBlock]);

  return (
    <BlockContainer
      block={block}
      focusedContent={(<>
        <BlockHeader block={block} showPoints />

        <div className="flex flex-col">
          <QuestionInput block={block} name={generateLessonBlockName(block, "question")} />

          <div className="flex flex-col">
            <LessonBlockOptions
              block={block}
              options={options}
              multiple={multiple}
            />

            <Button buttonClassName="flex flex-row items-center !w-fit px-0 bg-transparent" onClick={addOption}>
              <Image src={AddIcon} alt="Add" className="mr-2" />
              <span className="text-[16px]">
                {`Add ${(options?.length > 0) ? "another" : "an"} option`}
              </span>
            </Button>
          </div>
        </div>
      </>)}
      unfocusedContent={(<>
        <p className="text-[20px] mb-4">
          {block.question}
        </p>

        <LessonBlockOptions block={block} options={options} multiple readOnly />
      </>)}
    />
  );
}
