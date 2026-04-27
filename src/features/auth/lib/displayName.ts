export function getDisplayName(name: string | null | undefined, email?: string | null) {
  const trimmedName = name?.trim();

  if (trimmedName) {
    return trimmedName;
  }

  const emailPrefix = email?.split("@")[0]?.trim();

  if (emailPrefix) {
    return emailPrefix;
  }

  return "PatitasUp";
}