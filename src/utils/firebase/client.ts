import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

export const clientConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
};

// Initialize Firebase
const app = initializeApp(clientConfig);
const storage = getStorage(app);
const auth = getAuth(app);
// const analytics = getAnalytics(app);

export { app, auth, storage };

export async function uploadFileToStorage(key: string, file: Blob | Uint8Array | ArrayBuffer, contentType: string = "image/jpeg") {
  const storageRef = ref(getStorage(), key);
  return await uploadBytes(storageRef, file, { contentType });
}

export async function getFileUrl(key: string) {
  const storageRef = ref(getStorage(), key);
  return await getDownloadURL(storageRef);
}

export async function signIn(email: string, password: string) {
  const credential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  const idToken = await credential.user.getIdToken();

  // Sets authenticated browser cookies
  await fetch('/api/login', {
    headers: { Authorization: `Bearer ${idToken}` }
  });

  return credential;
}
