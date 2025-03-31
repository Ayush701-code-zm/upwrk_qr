import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

// Client-side Supabase client
export const createSupabaseClient = () => createClientComponentClient();

// Server-side Supabase client
export const createSupabaseServerClient = () =>
  createServerComponentClient({ cookies });

// Get current session on server
export async function getCurrentSession() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  const {
    data: { session },
  } = await supabase.auth.getSession();
  return session;
}
