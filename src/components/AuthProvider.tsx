"use client";
 
import * as React from "react";
import { User } from "firebase/auth";
import { AuthContext } from "@/utils/auth/client";
import useUserSession from "./hooks/useUserSession";
 
export interface AuthProviderProps {
  serverUser: User | null;
  children: React.ReactNode;
}
 
export const AuthProvider: React.FunctionComponent<AuthProviderProps> = (props) => {
  const user = useUserSession(props.serverUser);
  return (
    <AuthContext.Provider value={{ user }}>
      {props.children}
    </AuthContext.Provider>
  );
};
