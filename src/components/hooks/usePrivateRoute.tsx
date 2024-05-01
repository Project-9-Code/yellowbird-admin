import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function usePrivateRoute() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect('/auth/signin');
  }

  return data;
}
