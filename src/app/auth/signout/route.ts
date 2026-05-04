import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";

import { createSupabaseServerClient } from "@/lib/supabase/server";

function deleteSupabaseAuthCookies(cookieStore: Awaited<ReturnType<typeof cookies>>) {
  for (const { name } of cookieStore.getAll()) {
    if (name.startsWith("sb-") && name.includes("auth")) {
      cookieStore.delete(name);
    }
  }
}

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();

  try {
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.warn("[auth/signout] signOut:", error.message);
    }
  } catch (e) {
    console.warn("[auth/signout]", e);
  }

  try {
    deleteSupabaseAuthCookies(cookieStore);
  } catch {
  }

  return NextResponse.redirect(new URL("/", request.url), { status: 303 });
}
