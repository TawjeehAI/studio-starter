import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

/**
 * Returns the signed-in employee's email, or "" if not signed in / not configured.
 * Used to mint the Masar widget token for the current user.
 *
 * The agent may expand auth (roles, protected routes) as the client's system
 * grows, but this helper must keep returning the current user's email so Masar
 * feedback stays attributed correctly.
 */
export async function getCurrentUserEmail(): Promise<string> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
  if (!url || !anon) return "";

  const cookieStore = await cookies();
  const supabase = createServerClient(url, anon, {
    cookies: {
      getAll: () => cookieStore.getAll(),
      setAll: () => {
        /* read-only in Server Components */
      }
    }
  });

  const { data } = await supabase.auth.getUser();
  return data.user?.email ?? "";
}
