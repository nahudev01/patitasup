import "server-only";

import { prisma } from "@/lib/prisma";

type SyncAuthProfileInput = {
  userId: string;
  email: string;
  displayName: string;
};

export async function syncAuthProfile({ userId, email, displayName }: SyncAuthProfileInput) {
  const normalizedEmail = email.trim().toLowerCase();

  return prisma.profile.upsert({
    where: {
      supabaseUserId: userId,
    },
    update: {
      email: normalizedEmail,
      displayName,
    },
    create: {
      supabaseUserId: userId,
      email: normalizedEmail,
      displayName,
    },
  });
}