import * as admin from "firebase-admin";
import {Request, Response, NextFunction} from "express";

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

export {admin, db, storage, bucket, auth};
