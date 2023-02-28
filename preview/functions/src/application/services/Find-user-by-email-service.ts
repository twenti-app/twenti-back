import * as firebase from "firebase-admin";
import {FindUserByEmailPort} from "../ports/Find-user-by-email-port";
import {decryptData} from "../../../../../keys/Encrypt";

export class FindUserByEmailService implements FindUserByEmailPort {
    private db: FirebaseFirestore.Firestore | undefined;

    async findUserByEmail(email: string): Promise<any> {
        if (!this.db) {
            this.startConfig();
        }
        try {
            const userCollection = this.db?.collection("twenti-waitlist");
            const users = await userCollection?.get();
            const result: any = [];
            await users?.forEach((doc) => {
                decryptData(doc.data()).then(d => {
                    result.push(JSON.parse(d));
                })
            });
            return result;
        } catch (error) {
            return new Promise(() => {
                return {message: error, statusCode: 400};
            });
        }
    }

    private startConfig() {
        this.db = firebase.firestore();
    }
}
