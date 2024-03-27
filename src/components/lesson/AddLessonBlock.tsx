import Image from "next/image";
import Plus from "@/svgs/grey-plus.svg";
import useUrlParam from "../hooks/useUrlParam";
import { useCallback } from "react";

export default function AddLessonBlock() {
  const { value, setValue } = useUrlParam("showAddLessonBlock", "false");
  const showAddLessonBlock = value === "true";
  const onMouseEnter = useCallback(() => setValue("true"), [setValue]);
  const onMouseLeave = useCallback(() => setValue("false"), [setValue]);

  return (
    <div
      className="w-full max-w-[680px] min-h-6 flex flex-row items-center mb-1"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {showAddLessonBlock && (
        <>
          <hr className="grow" />
          <Image src={Plus} alt="Add Lesson" className="w-6 h-6 cursor-pointer" />
          <hr className="grow" />
        </>
      )}
    </div>
  );
}
