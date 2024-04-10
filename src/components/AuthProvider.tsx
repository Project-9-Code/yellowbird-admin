"use client";
 
import * as React from "react";
import { User } from "firebase/auth";
 
export interface AuthProviderProps {
  serverUser: User | null;
  children: React.ReactNode;
}
 
export const AuthContext = React.createContext<{ user: User | null }>({ user: null });
 
export const AuthProvider: React.FunctionComponent<AuthProviderProps> = (props) => {
  return (
    <AuthContext.Provider value={{ user: props.serverUser }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
