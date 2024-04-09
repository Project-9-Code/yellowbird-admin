import { UserInfo } from "firebase/auth";

export interface User extends UserInfo {
  emailVerified: boolean;
}

export const commonAuthOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY as string,
  cookieName: "yellowbird-auth-session"
};