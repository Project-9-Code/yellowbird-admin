"use client";

import { getAuth, signOut } from "firebase/auth";

export default function LogoutButton() {
  return (
    <button className="" onClick={async () => await signOut(getAuth())}>
      Logout
    </button>
  );
}
