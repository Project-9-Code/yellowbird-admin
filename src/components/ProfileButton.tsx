"use client";

import Link from "next/link";
import { useAuth } from "./AuthProvider";

export default function ProfileButton() {
  const { user } = useAuth();

  return (
    <Link
      href="/profile"
      className="w-[40px] h-[40px] rounded-[40px] bg-brand mx-2 flex items-center justify-center"
      type="button"
    >
      <span className="text-[14px] text-displayText">
        {getName(user?.displayName)}
      </span>
    </Link>
  );
}

function getName(name?: string | null) {
  if (name) {
    const nameParts = name.split(" ");
    return (nameParts.length > 1) ?
      `${nameParts[0].charAt(0)}${nameParts[1].charAt(0)}` :
      `${nameParts[0].charAt(0)}${nameParts[0].charAt(1)}`;
  } else {
    return "N/A";
  }
}
