import { Tables } from "@/database.types";
import { createClient } from "@/utils/supabase/server";
import { cache } from "react";

export type User = Tables<"profiles">;
export const getUser = cache(async function getUserAPI() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { data, error } = await supabase.from("profiles").select("*").eq("id", user?.user_metadata?.sub)?.maybeSingle<User>();
  if (error) throw error;
  return data;
});
