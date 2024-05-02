"use client";

import { Tables } from "@/database.types";
import Link from "next/link";

export default function ProfileButton(props: { user: Tables<"profiles"> | null }) {
  const { user } = props;
  return (
    <Link
      href="/profile"
      className="w-[40px] h-[40px] rounded-[40px] bg-brand mx-2 flex items-center justify-center"
      type="button"
    >
      <span className="text-[14px] text-displayText">
        {getName(user?.full_name)}
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
