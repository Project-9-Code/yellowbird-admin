"use client";

import Image from "next/image";
import UploadImage from "@/svgs/uploadImage.svg";
import { ChangeEvent, useCallback, useState } from "react";
import clsx from "clsx";

interface ImageInputProps {
  id?: string;
  containerClass?: string;
  imageClass?: string;
  width?: number;
  height?: number;
  onChange?: (file: string) => void;
}

export default function ImageInput(props: ImageInputProps) {
  const [image, setImage] = useState<string | undefined>();
  const { containerClass, onChange, width=220, height=220, imageClass } = props;
  const onFileChange = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64Str = e.target?.result as string;
        setImage(base64Str);
        onChange?.(base64Str);
      };
      reader.readAsDataURL(file);
    }
  }, [onChange]);

  return (
    <label
      htmlFor={props.id}
      className={clsx(containerClass, "flex flex-col justify-center items-center w-56 h-56 rounded-lg border-[1px] border-[#DDD] cursor-pointer")}
    >
      {(image) ? (
        <Image src={image} alt="Picture of course" width={width} height={height} className={clsx(imageClass, "rounded-lg")} />
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
