"use client";

import { auth } from "@/utils/firebase/client";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export default function LogoutButton() {
  const router = useRouter();
  const signOut = useCallback(async () => {
    await auth.signOut();
    router.refresh();
  }, [router]);

  return (
    <button className="" type="button" onClick={signOut}>
      Logout
    </button>
  );
}
