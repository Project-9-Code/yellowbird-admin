import {
  onAuthStateChanged as _onAuthStateChanged,
  signInWithCustomToken
} from "firebase/auth";
import { auth, app as firebaseApp, firebaseConfig } from "@/utils/firebase";
import { initializeApp } from "firebase/app";

export async function getAuthenticatedAppForUser(session?: string) {
  if (typeof window !== "undefined") {
    // client
    console.log("client: ", firebaseApp);

    return { app: firebaseApp, user: auth.currentUser?.toJSON() };
  }

  const { initializeApp: initializeAdminApp, getApps: getAdminApps } = await import("firebase-admin/app");

  const { getAuth: getAdminAuth } = await import("firebase-admin/auth");

  const { credential } = await import("firebase-admin");

  const ADMIN_APP_NAME = "firebase-frameworks";
  const adminApp =
    getAdminApps().find((it) => it.name === ADMIN_APP_NAME) ||
    initializeAdminApp({
      credential: credential.cert({
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        clientEmail: process.env.YELLOWBIRD_FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.YELLOWBIRD_FIREBASE_PRIVATE_KEY,
      }),
    }, ADMIN_APP_NAME);

  const adminAuth = getAdminAuth(adminApp);
  const noSessionReturn = { app: null, currentUser: null };


  if (!session) {
    // if no session cookie was passed, try to get from next/headers for app router
    session = await getAppRouterSession();

    if (!session) return noSessionReturn;
  }

  const decodedIdToken = await adminAuth.verifySessionCookie(session);

  const app = initializeAuthenticatedApp(decodedIdToken.uid)

  // handle revoked tokens
  const isRevoked = !(await adminAuth
    .verifySessionCookie(session, true)
    .catch((e: any) => console.error(e.message)));
  if (isRevoked) return noSessionReturn;

  // authenticate with custom token
  if (auth.currentUser?.uid !== decodedIdToken.uid) {
    // TODO(jamesdaniels) get custom claims
    const customToken = await adminAuth
      .createCustomToken(decodedIdToken.uid)
      .catch((e: any) => console.error(e.message));

    if (!customToken) return noSessionReturn;

    await signInWithCustomToken(auth, customToken);
  }
  console.log("server: ", app);
  return { app, currentUser: auth.currentUser };
}

async function getAppRouterSession() {
  // dynamically import to prevent import errors in pages router
  const { cookies } = await import("next/headers");

  try {
    return cookies().get("__session")?.value;
  } catch (error) {
    // cookies() throws when called from pages router
    return undefined;
  }
}

function initializeAuthenticatedApp(uid: string) {
  const random = Math.random().toString(36).split(".")[1];
  const appName = `authenticated-context:${uid}:${random}`;

  const app = initializeApp(firebaseConfig, appName);

  return app;
}