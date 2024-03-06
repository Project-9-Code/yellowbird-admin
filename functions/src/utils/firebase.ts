import * as admin from "firebase-admin";
import {Request, Response, NextFunction} from "express";

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});

const db = admin.firestore();

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
    await admin.auth().verifyIdToken(tokenId);
    next();
  } catch (e) {
    res.status(404).send();
    next(e);
  }
}

export {admin, db};
