"use client";

import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export default function LogoutButton() {
  const router = useRouter();
  const signOut = useCallback(async () => {
    const superbase = createClient();
    await superbase.auth.signOut();
    router.refresh();
  }, [router]);

  return (
    <button className="bg-white rounded-md border border-red-100 px-4 py-2" type="button" onClick={signOut}>
      Logout
    </button>
  );
}
