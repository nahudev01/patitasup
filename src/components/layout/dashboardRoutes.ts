export const DASHBOARD_PATHS = ["/perfil", "/mis-publicaciones", "/solicitudes"] as const;

export function isDashboardRoute(pathname: string): boolean {
  return (DASHBOARD_PATHS as readonly string[]).includes(pathname);
}
