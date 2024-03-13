"use client";

import Image from "next/image";
import UploadImage from "@/../public/svgs/uploadImage.svg";
import { ChangeEvent, useCallback, useRef, useState } from "react";

interface ImageInputProps {
  id?: string;
  onChange?: (file: string) => void;
}

export default function ImageInput(props: ImageInputProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState<string | undefined>();
  const ref = useRef<HTMLInputElement | null>(null);
  const onFileChange = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64Str = e.target?.result as string;
        setImage(base64Str);
        props.onChange?.(base64Str);
        if (ref.current) {
          ref.current.type = "text";
          ref.current.value = base64Str;
        }
      };
      reader.readAsDataURL(file);
    }
  }, []);

  return (
    <label
      htmlFor={props.id}
      className="flex flex-col justify-center items-center w-56 h-56 rounded-lg border-[1px] border-[#DDD] cursor-pointer"
    >
      {(image) ? (
        <Image src={image} alt="Picture of course" width={220} height={220} className="rounded-lg" />
      ) : (
        <>
          <Image src={UploadImage} alt="Upload Image" className="mb-2.5" />

          <span className="text-actionLink text-base font-bold mb-4">
            Upload Image
          </span>

          <span className="w-[180px] text-[#9B9B9B] text-sm text-center">
            Recommended size: 500x500 JPG, PNG. Max size: 2MB
          </span>
        </>
      )}

      <input
        ref={ref}
        type="file"
        id={props.id}
        name={props.id}
        className="absolute left-[-1000px]"
        accept="image/*"
        onChange={onFileChange}
      />
    </label>
  );
}
