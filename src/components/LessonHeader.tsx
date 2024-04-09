"use client";

import Image from "next/image";
import Button from "./Button";
import CloseX from "@/svgs/closeX.svg";
import Folder from "@/svgs/folder.svg";
import { Course, Lesson, LessonBlock } from "@/graphql/graphql";
import { useRouter, useSearchParams } from "next/navigation";
import LessonInfoOverlay from "./LessonInfoOverlay";
import { useAuth } from "@/utils/auth/client";
import useLessonBlocks from "./hooks/useLessonBlocks";
import { useFormStatus } from "react-dom";
import { useCallback, useEffect } from "react";
import { toast } from "react-toastify";

export default function LessonHeader({ course, lesson }: { course?: Course, lesson?: Lesson }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const courseId = course?.id ?? lesson?.course?.id ?? searchParams.get("courseId");
  const lessonTitle = lesson?.title ?? searchParams.get("title") ?? "";
  const lastUpdated = lesson?.lastUpdated ?? searchParams.get("lastUpdated");
  const { user } = useAuth();
  const { lessonBlocks } = useLessonBlocks(undefined, lesson?.blocks as LessonBlock[]);
  const { pending, data } = useFormStatus();
  const onClose = useCallback(() => router.push(`/course/${courseId}`), [courseId, router]);

  useEffect(() => {
    if (data) {
      toast.success("Lesson created successfully");
      router.push(`/lesson/${data.get("id")}`);
    }
  }, [data, router]);

  return (
    <div className="flex flex-row items-center bg-white shadow-[0_1px_0_0_rgba(0,0,0,0.10)] sticky top-0">
      <Button
        buttonClassName="!w-[60px] !h-[72px] flex items-center justify-center bg-transparent"
        onClick={onClose}
      >
        <Image src={CloseX} alt="Close" className="text-bodyText"/>
      </Button>

      <div className="flex flex-row items-center shadow-[-1px_0_0_0_rgba(0,0,0,0.05)] h-full">
        <Image src={Folder} alt="Folder" className="ml-[15px] mr-[10px]" />
        <span className="mr-[10px]">{course?.name}</span>
        <span className="mr-[10px]">/</span>
        <span className="text-disabledText">
          {lessonTitle.length > 0 ? lessonTitle : "Untitled"}
        </span>
      </div>

      <div className="flex grow h-full" />

      <div className="flex flex-row items-center mr-[56px]">
        <LessonInfoOverlay
          lesson={{
            title: lessonTitle,
            course: { name: course?.name },
            author: { name: user?.displayName },
            blocks: lessonBlocks,
            lastUpdated: lastUpdated,
          } as Lesson}
        />
        <Button
          label="Submit Lesson"
          type="submit"
          buttonClassName="!w-[130px] !h-[40px]"
          preventDefault={false}
          loading={pending}
        />
      </div>
    </div>
  );
}
