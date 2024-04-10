"use client";

import { onAuthStateChanged } from "@/utils/auth/client";
import { User } from "firebase/auth";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function useUserSession(initialUser: User | null) {
  // The initialUser comes from the server through a server component
  const [user, setUser] = useState<User | null>(initialUser);
  const router = useRouter();
  const pathname = usePathname();
  const searchParam = useSearchParams();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authUser => {
      setUser(authUser);
      if (!authUser) {
        const param = new URLSearchParams(`${pathname}${searchParam.toString()}`);
        router.replace(`/auth/signin?next=${param.toString()}`);
      }
    });

    return () => {
      unsubscribe();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    onAuthStateChanged(authUser => {
      if (!authUser) {
        const param = new URLSearchParams(`${pathname}${searchParam.toString()}`);
        router.replace(`/auth/signin?next=${param.toString()}`);
      }
      if (user?.email !== authUser?.email) {
        router.replace(`${pathname}${searchParam.toString()}`);
        router.refresh();
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return user;
}
