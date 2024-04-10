import { getTokens } from "next-firebase-auth-edge";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { toUser } from "./common";

export const serverConfig = {
  useSecureCookies: process.env.USE_SECURE_COOKIES === "true",
  firebaseApiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  serviceAccount: process.env.YELLOWBIRD_FIREBASE_PRIVATE_KEY ? {
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
    clientEmail: process.env.YELLOWBIRD_FIREBASE_CLIENT_EMAIL!,
    privateKey: process.env.YELLOWBIRD_FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n")!,
  } : undefined,
};

export const authConfig = {
  apiKey: serverConfig.firebaseApiKey,
  cookieName: "__session",
  cookieSignatureKeys: ["secret1", "secret2"],
  cookieSerializeOptions: {
    path: "/",
    httpOnly: true,
    secure: serverConfig.useSecureCookies, // Set this to true on HTTPS environments
    sameSite: "lax" as const,
    maxAge: 12 * 60 * 60 * 24, // twelve days
  },
  serviceAccount: serverConfig.serviceAccount,
};

export async function getUser(cookies: ReadonlyRequestCookies) {
  const tokens = await getTokens(cookies, authConfig);
  const user = tokens ? toUser(tokens) : null;
  return user;
}
