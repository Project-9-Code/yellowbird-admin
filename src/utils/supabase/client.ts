import { Database } from "@/database.types";
import { createBrowserClient } from "@supabase/ssr";
console.log(process.env.NEXT_PUBLIC_SUPABASE_URL)

export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
