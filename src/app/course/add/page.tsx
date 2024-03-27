import ImageInput from "@/components/ImageInput";
import InputField from "@/components/InputField";
import TextAreaField from "@/components/TextAreaField";
import Link from "next/link";
import Button from "@/components/Button";
import { addCourse } from "@/actions/course";
import AppHeader from "@/components/Header";

export default async function AddCourse() {
  return (
    <div className="w-full h-full bg-snowGrey overflow-hidden">
      <AppHeader />
      <div className="flex flex-col grow mt-16 bg-white border-borderBg border-[1px] w-[700px] h-[500px] mx-auto rounded-2xl overflow-auto">
        <h1 className="text-headlineText text-[32px] font-bold py-6 px-10">
          Create Course
        </h1>

        <form action={addCourse} className="flex flex-col grow">
          <div className="flex flex-row px-10 grow">
            <div className="flex flex-col mr-[50px] cursor-pointer">
              <h4 className="text-[##9B9B9B] text-xs mb-1">Cover Photo</h4>

              <ImageInput id="coverPhoto" />
            </div>

            <div className="flex flex-col grow">
              <InputField
                id="name"
                label="Course Name"
                placeholder="What should we call this course?"
                containerClass="mb-5"
              />

              <TextAreaField
                id="description"
                label="Description"
                placeholder="What's the course about?"
              />
            </div>
          </div>

          <div className="bg-[#FAFAFA] px-10 py-6 flex flex-row justify-between items-center rounded-b-2xl">
            <Button
              label="Cancel"
              buttonClassName="!bg-white border-[1px] border-borderBg !w-[142px]"
              textClassName="!text-bodyText"
              showLoader={false}
              isLink
              href="/"
            />

            <Button
              label="Create Course"
              buttonClassName="!w-[142px]"
              type="submit"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
