import { UserInfo } from "firebase/auth";
import { Tokens } from "next-firebase-auth-edge";
import { Claims, filterStandardClaims } from "next-firebase-auth-edge/lib/auth/claims";

export interface User extends UserInfo {
  emailVerified: boolean;
  customClaims: Claims;
}

export function toUser({ decodedToken }: Tokens): User {
  const {
    uid,
    email,
    picture: photoURL,
    email_verified: emailVerified,
    phone_number: phoneNumber,
    name: displayName,
    source_sign_in_provider: signInProvider,
  } = decodedToken;
 
  const customClaims = filterStandardClaims(decodedToken);
 
  return {
    uid,
    email: email ?? null,
    displayName: displayName ?? null,
    photoURL: photoURL ?? null,
    phoneNumber: phoneNumber ?? null,
    emailVerified: emailVerified ?? false,
    providerId: signInProvider,
    customClaims,
  };
};

export const commonAuthOptions = {
  apiKey: process.env.FIREBASE_API_KEY as string,
  cookieName: "__session",
  cookieSignatureKeys: [
    process.env.FIREBASE_COOKIE_SECRET_CURRENT as string,
    process.env.FIREBASE_COOKIE_SECRET_PREVIOUS as string,
  ],
  cookieSerializeOptions: {
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Set this to true on HTTPS environments
    sameSite: "lax" as const,
    maxAge: 12 * 60 * 60 * 24, // twelve days
  },
  serviceAccount: {
    projectId: process.env.FIREBASE_PROJECT_ID as string,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL as string,
    privateKey: process.env.FIREBASE_PRIVATE_KEY as string,
  },
};
