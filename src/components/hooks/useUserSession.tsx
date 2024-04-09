"use client";

import { onAuthStateChanged } from "@/utils/auth/client";
import { User } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function useUserSession(initialUser: User | null) {
  // The initialUser comes from the server through a server component
  const [user, setUser] = useState<User | null>(initialUser);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authUser => {
      setUser(authUser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    onAuthStateChanged(authUser => {
      if (user === undefined) return;
      if (user?.email !== authUser?.email) {
        router.refresh();
      }
    });
  }, [user, router]);

  return user;
}
