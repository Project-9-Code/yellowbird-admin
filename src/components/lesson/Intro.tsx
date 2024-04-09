"use client";

import { Course, Lesson } from "@/graphql/graphql";
import Card from "../Card";
import InputField from "../InputField";
import TextAreaField from "../TextAreaField";
import Title from "../Title";
import useUrlParam from "../hooks/useUrlParam";
import useFocusParam from "../hooks/useFocusParam";
import clsx from "clsx";

export default function LessonIntro({ course, lesson }: { course?: Course, lesson?: Lesson }) {
  const { isFocused, enableFocus } = useFocusParam("intro", "intro");
  const { value: title, setValueOnChange: setTitle } = useUrlParam("title", lesson?.title || "");
  const { value: description, setValueOnChange: setDescription } = useUrlParam("description", lesson?.description || "");
  const { value: tags, setValueOnChange: setTags } = useUrlParam("tags", lesson?.tags || "");

  return (
    <Card focused={isFocused} onClick={enableFocus} className="mb-4 mt-6" disableDrag>
      <div className={clsx(!isFocused && "hidden")}>
        <Title title="Lesson Intro" className="mb-[28px]" />

        <div className="flex flex-row justify-between mb-[16px]">
          <InputField
            id="title"
            label="Lesson Name*"
            containerClass="w-[300px]"
            placeholder="Debit Cards, Bitcoin, e.g."
            defaultValue={title}
            onChange={setTitle()}
            required
          />

          <InputField
            id="courseName"
            label="Parent Course*"
            containerClass="w-[300px]"
            value={course?.name as string}
            disabled={course?.name !== undefined}
          />
        </div>

        <TextAreaField
          id="description"
          label="Description*"
          containerClass="w-full mb-[16px]"
          defaultValue={description}
          onChange={setDescription()}
        />

        <InputField
          id="tags"
          label="Tags"
          containerClass="w-full mb-[24px]"
          placeholder="Add up to 3 tags, separated by commas"
          defaultValue={tags}
          onChange={setTags()}
        />
      </div>

      {!isFocused && (<>
        <Title title={title || "Untitled"} className="mb-[8px]" />
        <p className="text-[20px] text-bodyText">{description}</p>
      </>)}
    </Card>
  );
}
