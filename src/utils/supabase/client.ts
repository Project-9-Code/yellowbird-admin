import { Database } from "@/database.types";
import { createBrowserClient } from "@supabase/ssr";
console.log(process.env.NEXT_PUBLIC_TEST)

export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SB_URL!,
    process.env.NEXT_PUBLIC_SB_ANON_KEY!
  )
}
