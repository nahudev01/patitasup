import { z } from "zod";

const supabasePublicSchema = z.object({
  supabaseUrl: z
    .string()
    .min(1, "NEXT_PUBLIC_SUPABASE_URL is required (see .env.example).")
    .url("NEXT_PUBLIC_SUPABASE_URL must be a valid URL."),
  supabasePublishableKey: z
    .string()
    .min(
      1,
      "Set NEXT_PUBLIC_SUPABASE_ANON_KEY or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY (Supabase Dashboard → Project Settings → API).",
    ),
});

function trimOrEmpty(value: string | undefined): string {
  return typeof value === "string" ? value.trim() : "";
}

export function getSupabasePublicEnv() {
  const supabaseUrl = trimOrEmpty(process.env.NEXT_PUBLIC_SUPABASE_URL);
  const publishable = trimOrEmpty(process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY);
  const anon = trimOrEmpty(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  const supabasePublishableKey = publishable || anon;

  const parsed = supabasePublicSchema.safeParse({
    supabaseUrl,
    supabasePublishableKey,
  });

  if (!parsed.success) {
    const msg = parsed.error.issues.map((i) => i.message).join(" ");
    throw new Error(`Invalid Supabase environment variables. ${msg}`);
  }

  return parsed.data;
}
