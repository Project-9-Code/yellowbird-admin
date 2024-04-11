import { toUser } from "@/utils/firebase/common";
import { authConfig } from "@/utils/firebase/server";
import { getTokens } from "next-firebase-auth-edge";
import { cookies } from "next/headers";
import { cache } from "react";

export const getUser = cache(async function getUserAPI() {
  const tokens = await getTokens(cookies(), authConfig);
  const user = tokens ? toUser(tokens) : null;
  return user;
});
