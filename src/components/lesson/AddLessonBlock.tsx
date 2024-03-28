"use client";

import Image from "next/image";
import Plus from "@/svgs/grey-plus.svg";
import { useCallback, useRef, useState } from "react";
import { LessonBlockTypes } from "@/graphql/graphql";
import { v4 as uuid } from "uuid";
import useLessonBlocks from "../hooks/useLessonBlocks";

export default function AddLessonBlock() {
  const { addLessonBlock } = useLessonBlocks();
  const ref = useRef(false);
  const [showAddLessonBlock, setShowAddLessonBlock] = useState(false);

  const onMouseEnter = useCallback(() => setShowAddLessonBlock(true), []);
  const onMouseLeave = useCallback(() => setShowAddLessonBlock(false), []);

  const onClick = useCallback(() => {
    addLessonBlock({
      id: uuid(),
      type: LessonBlockTypes.Text,
      textValue: "",
    }, true);
  }, [addLessonBlock]);

  return (
    <div
      className="w-full max-w-[680px] min-h-6 flex flex-row items-center mb-1"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {showAddLessonBlock && (
        <>
          <hr className="grow" />
          <Image
            src={Plus}
            alt="Add Lesson"
            className="w-6 h-6 cursor-pointer"
            onClick={onClick}
          />
          <hr className="grow" />
        </>
      )}
    </div>
  );
}
