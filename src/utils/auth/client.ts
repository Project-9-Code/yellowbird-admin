import { NextOrObserver, User, onAuthStateChanged as _onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { createContext, useContext } from "react";
import { auth } from "../firebase";
 
export interface AuthContextValue {
  user: User | null;
}
 
export const AuthContext = createContext<AuthContextValue>({
  user: null,
});
 
export const useAuth = () => useContext(AuthContext);

export function onAuthStateChanged(cb: NextOrObserver<User>) {
  return _onAuthStateChanged(auth, cb);
}

export async function signIn(email: string, password: string) {
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error("Error signing in:", error);
  }
}

export async function signOut() {
  try {
    return await auth.signOut();
  } catch (error) {
    console.error("Error signing out:", error);
  }
}
