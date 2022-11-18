import * as serviceAccount from "../../../../keys/development/development-twenti-firebase-adminsdk.json";
import * as admin from "firebase-admin";

export function initFirebaseModule() {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount as any)
    });
}
