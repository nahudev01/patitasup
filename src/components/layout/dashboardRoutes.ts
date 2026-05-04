export const DASHBOARD_NAV_ITEMS = [
  { label: "Mi perfil", href: "/perfil" },
  { label: "Mis publicaciones", href: "/mis-publicaciones" },
  { label: "Solicitudes", href: "/solicitudes" },
] as const;

export const DASHBOARD_PATHS = DASHBOARD_NAV_ITEMS.map((item) => item.href);

export const DASHBOARD_HOME_HREF = DASHBOARD_NAV_ITEMS[0].href;

export function isDashboardRoute(pathname: string): boolean {
  return DASHBOARD_PATHS.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}
