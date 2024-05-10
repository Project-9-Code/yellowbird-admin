"use client";

import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useCallback } from "react";


export default function LogoutButton() {
  const router = useRouter();
  const signOut = useCallback(async () => {
    const superbase = createClient();
    const { error } = await superbase.auth.signOut();
    if (!error) return router.refresh();
    else console.error(error);
  }, [router]);

  return (
    <button className="bg-white rounded-md border border-red-100 px-4 py-2" type="button" onClick={signOut}>
      Logout
    </button>
  );
}
