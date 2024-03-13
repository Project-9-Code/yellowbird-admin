"use client";

import Button from "@/components/Button";
import ErrorContainer from "@/components/ErrorContainer";
import ImageInput from "@/components/ImageInput";
import InputField from "@/components/InputField";
import TextAreaField from "@/components/TextAreaField";
import { gql, useMutation } from "@apollo/client";
import { getStorage, uploadString, ref } from "firebase/storage";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

const ADD_COURSE = gql`
  mutation AddCourse($course: CourseInput!) {
    addCourse(course: $course) {
      id
      name
      description
      coverPhoto
    }
  }
`;

export default function AddCourseForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [coverPhoto, setCoverPhoto] = useState<string | undefined>();
  const [addCourse, { loading, error }] = useMutation(ADD_COURSE);
  const onNameChange = useCallback((e: ChangeEvent<HTMLInputElement>) => setName(e.target.value), []);
  const onDescChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value), []);
  const router = useRouter();

  const onSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    let key;

    if (coverPhoto) {
      // Upload cover photo to S3
      key = `public/courseCovers/${uuid()}`;
      await uploadString(ref(getStorage(), key), coverPhoto, "data_url");
    }

    await addCourse({
      variables: {
        course: { name, description, coverPhoto: key }
      }
    });
    router.push("/");
  }, [addCourse, coverPhoto, description, name, router]);

  return (
    <>
      <form onSubmit={onSubmit} className="flex flex-col grow">
        <div className="flex flex-row px-10 grow">
          <div className="flex flex-col mr-[50px] cursor-pointer">
            <h4 className="text-[##9B9B9B] text-xs mb-1">Cover Photo</h4>

            <ImageInput id="coverPhoto" onChange={(coverPhoto) => setCoverPhoto(coverPhoto)} />
          </div>

          <div className="flex flex-col grow">
            <InputField
              id="name"
              label="Course Name"
              placeholder="What should we call this course?"
              containerClass="mb-5"
              value={name}
              onChange={onNameChange}
            />

            <TextAreaField
              id="description"
              label="Description"
              placeholder="What's the course about?"
              value={description}
              onChange={onDescChange}
            />
          </div>
        </div>

        <div className="bg-[#FAFAFA] px-10 py-6 flex flex-row justify-between items-center rounded-b-2xl">
          <Link href="../" className="w-[78px]">
            <Button label="Cancel" buttonClassName="!bg-white border-[1px] border-borderBg" textClassName="!text-bodyText" />
          </Link>

          <Button
            loading={loading}
            label="Create Course"
            buttonClassName="!w-[142px]"
            type="submit"
          />
        </div>
      </form>

      {error && (<ErrorContainer>{error.message}</ErrorContainer>)}
    </>
  );
}
