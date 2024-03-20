import * as admin from "firebase-admin";
import {Request, Response, NextFunction} from "express";
import {getDownloadURL} from "firebase-admin/storage";

const credential = admin.credential.applicationDefault();

admin.initializeApp({
  credential,
  storageBucket: "yellowbird-4e1b8.appspot.com",
});

const db = admin.firestore();
const storage = admin.storage();
const bucket = storage.bucket();
const auth = admin.auth();

/**
 * Autho
 * @param {Request} req Express request
 * @param {Response} res Express response
 * @param {NextFunction} next Express next function
 */
export async function authorizeEndpoint(
  req: Request, res: Response, next: NextFunction
): Promise<void> {
  const tokenId = req?.get?.("Authorization")?.split("Bearer ")[1] ?? "";
  try {
    await auth.verifyIdToken(tokenId);
    next();
  } catch (e) {
    res.status(404).send();
    next(e);
  }
}

/**
 * Fetch download URLs
 * @param {string[]} keys
 * @return {Promise<string[]>}
 */
export async function fetchDownloadURLs(keys: string[]): Promise<string[]> {
  const urls = await Promise.all(keys.map(async (key) => {
    if (!key || key.length === 0 || key.startsWith("http")) {
      return Promise.resolve(undefined);
    }
    return await getDownloadURL(bucket.file(key));
  }));

  return urls.filter((url) => url !== undefined) as string[];
}

export {admin, db, storage, bucket, auth};
