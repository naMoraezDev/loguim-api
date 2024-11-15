import {
  FIREBASE_CREDENTIAL,
} from "./firebase-admin.config";
import firebaseAdmin from "firebase-admin";

if (!firebaseAdmin.apps.length) {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert({
      projectId: FIREBASE_CREDENTIAL.projectId,
      privateKey: FIREBASE_CREDENTIAL.privateKey,
      clientEmail: FIREBASE_CREDENTIAL.clientEmail,
    })
  });
}

export { firebaseAdmin };
