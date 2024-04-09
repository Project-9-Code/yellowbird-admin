import Link from "next/link";
import Button from "./Button";
import ProfileButton from "./ProfileButton";

export default function AppHeader() {
  return (
    <div className="flex flex-row items-center bg-white px-8 py-2.5 shadow-[0_1px_0_0_rgba(0,0,0,0.10)]">
      <Link href="/" className="flex flex-row items-center">
        <div className="w-[55px] h-[55px] rounded-[100px] bg-brand mr-4">
        </div>

        <span className="weight font-bold text-base text-displayText mr-10">
          Incubator
        </span>
      </Link>

      <div className="grow" />

      <ProfileButton />
    </div>
  );
}