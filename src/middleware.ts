import { authMiddleware, redirectToLogin } from "next-firebase-auth-edge";
import { NextRequest, NextResponse } from "next/server";
import { commonAuthOptions } from "@/utils/auth/common";

const SIGNIN_ROUTE = "/auth/signin";
const AUTH_ROUTES = [SIGNIN_ROUTE, "/auth/createAccount", "/auth/resetPassword"];
const isDev = process.env.NODE_ENV === "development";
 
export async function middleware(request: NextRequest) {
  console.log(process.env)
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
    '/((?!_next|favicon.ico|__/auth|__/firebase|api|.*\\.).*)',
    '/api/login',
    '/api/logout'
  ]
}
