export function getSafeRedirectPath(candidate: string | null | undefined, fallback = "/perfil") {
  if (!candidate || !candidate.startsWith("/") || candidate.startsWith("//")) {
    return fallback;
  }

  return candidate;
}