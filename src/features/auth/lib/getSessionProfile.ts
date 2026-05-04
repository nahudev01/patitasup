import "server-only";

import type { Profile } from "@prisma/client";
import type { User } from "@supabase/supabase-js";
import { cache } from "react";

import { getDisplayName } from "@/features/auth/lib/displayName";
import { prisma } from "@/lib/prisma";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type SessionProfile = {
  user: User;
  profile: Profile | null;
  profileName: string;
};

export const getSessionProfile = cache(async (): Promise<SessionProfile | null> => {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const profile = await prisma.profile.findUnique({
    where: { supabaseUserId: user.id },
  });

  const profileName = getDisplayName(
    profile?.displayName ?? user.user_metadata?.display_name,
    user.email,
  );

  return { user, profile, profileName };
});
