import {initializeApp} from 'firebase-admin/app';
import {initializeApp as f} from 'firebase/app';

import * as serviceAccount from '../../../keys/development/development-twenti-firebase-adminsdk.json';

import {credential} from "firebase-admin";
import {apiKey, projectId} from "../../../keys/development/firebaseKeys";

export function firebaseConfig() {
    initializeApp({
        credential: credential.cert(serviceAccount as any),
        projectId: projectId,
    })
    f({
        projectId: projectId,
        apiKey: apiKey
    })
}