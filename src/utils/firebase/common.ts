import { User as AuthUser } from "firebase/auth";
import { Tokens } from "next-firebase-auth-edge";
import { filterStandardClaims } from 'next-firebase-auth-edge/lib/auth/claims';

export interface User extends AuthUser {
  customClaims?: Record<string, any>;
}

export const toUser = ({decodedToken}: Tokens): User => {
  const {
    uid,
    email,
    picture: photoURL,
    email_verified: emailVerified,
    phone_number: phoneNumber,
    name: displayName,
    source_sign_in_provider: signInProvider
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
    customClaims
  } as User;
};
