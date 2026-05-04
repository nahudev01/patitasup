import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

import { DASHBOARD_HOME_HREF, isDashboardRoute } from "@/components/layout/dashboardRoutes";
import { getSupabasePublicEnv } from "@/lib/env";

const AUTH_ROUTES = new Set(["/login", "/register"]);

function withForwardedCookies(baseResponse: NextResponse, redirectResponse: NextResponse) {
  baseResponse.cookies.getAll().forEach((cookie) => {
    redirectResponse.cookies.set(cookie.name, cookie.value, cookie);
  });

  return redirectResponse;
}

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });
  const { supabaseUrl, supabasePublishableKey } = getSupabasePublicEnv();

  const supabase = createServerClient(supabaseUrl, supabasePublishableKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => {
          request.cookies.set(name, value);
        });

        response = NextResponse.next({ request });

        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options);
        });
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user && isDashboardRoute(request.nextUrl.pathname)) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/login";
    redirectUrl.search = "";
    redirectUrl.searchParams.set(
      "next",
      `${request.nextUrl.pathname}${request.nextUrl.search}`,
    );

    return withForwardedCookies(response, NextResponse.redirect(redirectUrl));
  }

  if (user && AUTH_ROUTES.has(request.nextUrl.pathname)) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = DASHBOARD_HOME_HREF;
    redirectUrl.search = "";

    return withForwardedCookies(response, NextResponse.redirect(redirectUrl));
  }

  return response;
}