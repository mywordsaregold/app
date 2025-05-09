
export const ROUTER_PATHS = {
  HOME: "/home",
  LOGIN: "/login",
  LOGIN_CALLBACK: "/login/callback",
}


export function completeUrl(routerPath: string): string {
  return `${window.location.origin}${routerPath}`
}
