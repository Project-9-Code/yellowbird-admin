"use client";

import { auth } from "@/utils/firebase/client";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export default function LogoutButton() {
  const router = useRouter();
  const signOut = useCallback(async () => {
    await auth.signOut();
    await fetch("/api/logout");
    router.refresh();
  }, [router]);

  return (
    <button className="bg-white rounded-md border border-red-100 px-4 py-2" type="button" onClick={signOut}>
      Logout
    </button>
  );
}
