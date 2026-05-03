import { z } from "zod";

const publicEnvSchema = z
  .object({
    NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
    NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: z.string().min(1).optional(),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1).optional(),
  })
  .superRefine((env, ctx) => {
    if (!env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY && !env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          "Set NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY or NEXT_PUBLIC_SUPABASE_ANON_KEY.",
        path: ["NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY"],
      });
    }
  });

function formatEnvError(error: z.ZodError) {
  return error.issues.map((issue) => issue.message).join(" ");
}

export function getSupabasePublicEnv() {
  const parsed = publicEnvSchema.safeParse(process.env);

  if (!parsed.success) {
    throw new Error(`Invalid Supabase environment variables. ${formatEnvError(parsed.error)}`);
  }

  return {
    supabaseUrl: parsed.data.NEXT_PUBLIC_SUPABASE_URL,
    supabasePublishableKey:
      parsed.data.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
      parsed.data.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
      "",
  };
}