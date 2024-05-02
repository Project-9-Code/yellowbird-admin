import { Tables } from "@/database.types";
import { createClient } from "@/utils/supabase/server";
import { cache } from "react";

export type User = Tables<"profiles">;
export const getUser = async function getUserAPI() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { data } = await supabase.from("profiles").select("*").eq("id", user?.user_metadata?.sub)?.single<User>();
  return data;
};
