import Image from "next/image";
import AddIcon from "@/svgs/grey-plus.svg";
import { getUser } from "@/requests/user";

export async function ProfilePic() {
  const user = await getUser();

  return (
    <label htmlFor="profilePic" className="w-[70px] h-[70px] mr-[16px] cursor-pointer">
      <div className="flex w-[70px] h-[70px] rounded-full bg-borderBg justify-center items-center">
        <Image src={user?.photoURL ?? AddIcon} width={24} height={24} alt="Profile Image" className="w-[24px] h-[24px]" />
      </div>
      <input type="file" name="profilePic" id="profilePic" className="hidden" accept="image/*" />
    </label>
  );
}
