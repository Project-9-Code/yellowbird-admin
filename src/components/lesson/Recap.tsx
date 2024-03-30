"use client";

import { useCallback } from "react";
import Card from "../Card";
import Title from "../Title";
import useFocusParam from "../hooks/useFocusParam";
import useUrlParam from "../hooks/useUrlParam";
import MarkdownEditor from "../MarkdownEditor";
import MDEditor from '@uiw/react-md-editor';

export default function LessonRecap() {
  const { isFocused, enableFocus } = useFocusParam("recap");
  const { value, setValue } = useUrlParam("recap", "");
  const onChange = useCallback((value?: string) => setValue(value), [setValue]);

  return (
    <Card className="flex flex-col mt-[12px] mb-8" focused={isFocused} onClick={enableFocus} disableDrag>
      <Title title="Lesson Recap" />
      <h6 className="text-textBody text-[20px] mb-[16px]">A quick review of what was learned</h6>
      
      {isFocused && <MarkdownEditor value={value} onChange={onChange}/>}

      {!isFocused && value && <MDEditor.Markdown source={value} />}

      {!isFocused && !value && (
        <div className="mt-[10px]">
          <span className="text-[20px] text-disabledText">
            Nothing has been added yet...
          </span>
        </div>
      )}
    </Card>
  );
}
