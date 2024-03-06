import { getTokens } from "next-firebase-auth-edge";
import { cookies } from "next/headers";
import { commonAuthOptions, toUser } from "./common";

export async function getUser() {
  const tokens =  await getTokens(cookies(), commonAuthOptions);
  return (tokens) ? toUser(tokens) : null;
}
