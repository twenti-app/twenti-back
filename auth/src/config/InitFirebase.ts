import {initializeApp} from 'firebase-admin/app';

import * as serviceAccount from '../../../keys/development/development-twenti-firebase-adminsdk.json';

import {credential} from "firebase-admin";

export function initFirebase() {
    initializeApp({
        credential: credential.cert(serviceAccount as any)
    })
}