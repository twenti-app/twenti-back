import {PreviewRegistrationPort} from "../ports/Preview-registration.port";
import * as firebase from "firebase-admin";
import {PreviewRegistrationModel} from "../../models/Preview-registration-model";
import * as crypto from "crypto";
import {encryptData} from "../../../../../keys/Encrypt";

export class PreviewRegistrationService implements PreviewRegistrationPort {
    private db: FirebaseFirestore.Firestore | undefined;

    async previewRegistration(data: PreviewRegistrationModel): Promise<any> {
        if (!this.db) {
            this.startConfig();
        }
        try {
            const uuid = crypto.randomUUID();
            const userCollection = this.db?.collection("twenti-preview");
            const user = userCollection?.doc(uuid);
            const enc = new TextEncoder();
            const saveData = await encryptData(enc.encode(JSON.stringify(data)));
            // Object.keys(data).forEach(key =>{
            //     // @ts-ignore
            //     data[key] = encryptData(enc.encode(data[key]));
            // })
            // @ts-ignore
            await user.set(saveData);
            return {message: "Success Request", statusCode: 200};
        } catch (error) {
            return {message: error, statusCode: 400};
        }
    }

    private startConfig() {
        this.db = firebase.firestore();
    }
}
