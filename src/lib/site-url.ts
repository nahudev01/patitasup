import "server-only";

import { headers } from "next/headers";

export async function getAbsoluteUrl(pathname = "/") {
  const headerStore = await headers();
  const origin = headerStore.get("origin");

  if (origin) {
    return new URL(pathname, origin).toString();
  }

  const forwardedHost = headerStore.get("x-forwarded-host");
  const forwardedProto = headerStore.get("x-forwarded-proto") ?? "https";

  if (forwardedHost) {
    return `${forwardedProto}://${forwardedHost}${pathname}`;
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  return new URL(pathname, siteUrl).toString();
}