import { createClient } from "@/lib/supabase/client";

export type AppRouterForSignOut = {
  replace: (href: string) => void;
  refresh: () => void;
};

export async function signOutFromBrowser(
  router: AppRouterForSignOut,
  onBefore?: () => void,
): Promise<void> {
  onBefore?.();

  try {
    await fetch("/auth/signout", {
      method: "POST",
      credentials: "same-origin",
      redirect: "manual",
    });
  } catch (e) {
    console.warn("[logout] POST /auth/signout", e);
  }

  try {
    const { error } = await createClient().auth.signOut();
    if (error) {
      console.warn("[logout] client signOut", error.message);
    }
  } catch (e) {
    console.warn("[logout] client signOut", e);
  }

  router.replace("/");
  router.refresh();
}
