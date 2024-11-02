import dotenv from 'dotenv';
dotenv.config();
import admin from 'firebase-admin';
import ServiceAccount from '../firebase-service-account.json';

admin.initializeApp({
    credential: admin.credential.cert(ServiceAccount as admin.ServiceAccount),
    databaseURL: "https://gyft-ff7b6.firebaseio.com",
})


export { admin }