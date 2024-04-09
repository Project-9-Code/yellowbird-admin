import { authMiddleware, redirectToLogin } from "next-firebase-auth-edge";
import { NextRequest, NextResponse } from "next/server";
import { commonAuthOptions } from "@/utils/auth/common";

const SIGNIN_ROUTE = "/signin";
const AUTH_ROUTES = [SIGNIN_ROUTE, "/createAccount", "/resetPassword"];
const isDev = process.env.NODE_ENV === "development";
 
export async function middleware(request: NextRequest) {
  return authMiddleware(request, {
    ...commonAuthOptions,
    debug: isDev,
    loginPath: "/api/login",
    logoutPath: "/api/logout",
    checkRevoked: true,

    handleValidToken: async ({ token, decodedToken }, headers) => {
      return NextResponse.next({ request: { headers } });
    },

    handleInvalidToken: async (reason) => {
      console.info('Missing or malformed credentials', {reason});
 
      return redirectToLogin(request, {
        path: SIGNIN_ROUTE,
        publicPaths: AUTH_ROUTES,
      });
    },

    handleError: async (error) => {
      console.error("Unhandled authentication error", { error });
 
      return redirectToLogin(request, {
        path: SIGNIN_ROUTE,
        publicPaths: AUTH_ROUTES,
      });
    },
  });
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    {
      source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
    "/api/login", "/api/logout",
  ],
}
