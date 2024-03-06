"use client";
 
import * as React from "react";
import { getAuth, onIdTokenChanged, User as FirebaseUser } from "firebase/auth";
import { filterStandardClaims } from "next-firebase-auth-edge/lib/auth/claims";
import { User } from "@/utils/auth/common";
import { AuthContext } from "@/utils/auth/client";
import "@/utils/firebase";
import { useRouter, useSearchParams } from "next/navigation";
 
export interface AuthProviderProps {
  serverUser: User | null;
  children: React.ReactNode;
}
 
export const AuthProvider: React.FunctionComponent<AuthProviderProps> = (props) => {
  const [user, setUser] = React.useState(props.serverUser);
  const searchParams = useSearchParams();
  const router = useRouter();
 
  const handleIdTokenChanged =  React.useCallback(async (firebaseUser: FirebaseUser | null) => {
    if (firebaseUser) {
      const idTokenResult = await firebaseUser.getIdTokenResult();
 
      // Sets authenticated user cookies
      await fetch("/api/login", {
        headers: { Authorization: `Bearer ${idTokenResult.token}` },
      });
 
      setUser({
        ...user,
        customClaims: filterStandardClaims(idTokenResult.claims),
      } as User);

      router.replace(searchParams.get("redirect") ?? "/");
      return;
    }
 
    // Removes authenticated user cookies
    await fetch("/api/logout");
 
    setUser(null);
  }, [user, searchParams, router]);
 
  React.useEffect(() => {
    return onIdTokenChanged(getAuth(), handleIdTokenChanged);
  }, []);
 
  return (
    <AuthContext.Provider value={{ user }}>
      {props.children}
    </AuthContext.Provider>
  );
};
