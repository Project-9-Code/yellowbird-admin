"use client";

import Image from "next/image";
import { useAuth } from "./AuthProvider";
import AddIcon from "@/svgs/grey-plus.svg";

export function ProfilePic() {
  const { user } = useAuth();
  return (
    <label htmlFor="profilePic" className="w-[70px] h-[70px] mr-[16px] cursor-pointer">
      <div className="flex w-[70px] h-[70px] rounded-full bg-borderBg justify-center items-center">
        <Image src={user?.photoURL ?? AddIcon} width={24} height={24} alt="Profile Image" className="w-[24px] h-[24px]" />
      </div>
      <input type="file" name="profilePic" id="profilePic" className="hidden" accept="image/*" />
    </label>
  );
}
