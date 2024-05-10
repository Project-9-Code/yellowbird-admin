"use client";

import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFormStatus } from "react-dom";
import { toast } from "react-toastify";

export default function SubmitCourseButton() {
  const router = useRouter();
  const { pending, data } = useFormStatus();

  useEffect(() => {
    if (data) {
      toast.success("Course created successfully", { icon: () => null });
      router.push("/course");
    }
  }, [data, router]);

  return (
    <Button
      label="Create Course"
      buttonClassName="!w-[142px]"
      type="submit"
      loading={pending}
    />
  );
}
