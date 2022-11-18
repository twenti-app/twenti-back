import * as serviceAccount from "../../../../keys/twenti-preview-adminsdk.json";
import * as admin from "firebase-admin";

export function initFirebaseModule(projectId: string) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as any),
    projectId: projectId,
  });
}
